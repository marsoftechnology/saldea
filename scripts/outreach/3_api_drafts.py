"""
3_api_drafts.py — Crea borradores en Zoho Mail via REST API (OAuth).

Pipeline:
  1. Refresca el access_token usando el refresh_token
  2. Obtiene el accountId (si no está en .env, lo busca via API)
  3. Para cada gestoría del CSV con email y status != "drafted":
        POST /api/accounts/{accountId}/messages   (mode=draft)
        marca status = "drafted"
  4. Tú abres Zoho Mail > Borradores y revisas/envías

Uso:
    python 3_api_drafts.py              # crea los pendientes
    python 3_api_drafts.py --dry-run    # muestra qué haría
    python 3_api_drafts.py --limit 3    # solo 3
    python 3_api_drafts.py --force      # re-crear aunque ya estén drafted
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import sys
import time
from pathlib import Path

import requests
from dotenv import load_dotenv

ROOT = Path(__file__).parent
CSV_PATH = ROOT / "gestorias.csv"
TEMPLATE_PATH = ROOT / "template.txt"

load_dotenv(ROOT / ".env")

CLIENT_ID = os.getenv("ZOHO_CLIENT_ID")
CLIENT_SECRET = os.getenv("ZOHO_CLIENT_SECRET")
REFRESH_TOKEN = os.getenv("ZOHO_REFRESH_TOKEN")
API_BASE = os.getenv("ZOHO_API_BASE", "https://mail.zoho.eu").rstrip("/")
ACCOUNTS_BASE = os.getenv("ZOHO_ACCOUNTS_BASE", "https://accounts.zoho.eu").rstrip("/")
ACCOUNT_ID = os.getenv("ZOHO_ACCOUNT_ID", "").strip()
FROM_EMAIL = os.getenv("ZOHO_EMAIL", "carlosgc@marsof.es")


def need(name: str, val: str | None) -> str:
    if not val:
        sys.exit(f"Falta {name} en .env. Mira .env.example.")
    return val


def get_access_token() -> str:
    """Intercambia el refresh_token por un access_token nuevo (válido 1h)."""
    r = requests.post(
        f"{ACCOUNTS_BASE}/oauth/v2/token",
        data={
            "grant_type": "refresh_token",
            "client_id": need("ZOHO_CLIENT_ID", CLIENT_ID),
            "client_secret": need("ZOHO_CLIENT_SECRET", CLIENT_SECRET),
            "refresh_token": need("ZOHO_REFRESH_TOKEN", REFRESH_TOKEN),
        },
        timeout=20,
    )
    r.raise_for_status()
    data = r.json()
    if "access_token" not in data:
        sys.exit(f"Zoho no devolvió access_token: {data}")
    return data["access_token"]


def auth_headers(token: str) -> dict:
    return {
        "Authorization": f"Zoho-oauthtoken {token}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


def get_account_id(token: str) -> str:
    if ACCOUNT_ID:
        return ACCOUNT_ID
    r = requests.get(f"{API_BASE}/api/accounts", headers=auth_headers(token), timeout=20)
    r.raise_for_status()
    data = r.json().get("data") or []
    if not data:
        sys.exit("No se encontraron cuentas en Zoho Mail")
    # filtrar la principal
    for acc in data:
        if acc.get("primaryEmailAddress") == FROM_EMAIL:
            return str(acc["accountId"])
    return str(data[0]["accountId"])


def load_template() -> tuple[str, str]:
    raw = TEMPLATE_PATH.read_text(encoding="utf-8")
    subject = ""
    body_lines = []
    in_body = False
    has_subject_marker = False
    has_separator = False
    for ln in raw.splitlines():
        if not in_body and ln.startswith("SUBJECT:"):
            subject = ln[len("SUBJECT:"):].strip()
            has_subject_marker = True
            continue
        if ln.strip() == "---":
            in_body = True
            has_separator = True
            continue
        if in_body:
            body_lines.append(ln)

    # Modo tolerante: si no hay marcadores, todo el archivo es el body
    if not has_subject_marker and not has_separator:
        subject = "Sobre Saldea — automatizar el cobro de facturas"
        body = raw.strip()
    else:
        body = "\n".join(body_lines).lstrip("\n")

    if not subject:
        subject = "Sobre Saldea — automatizar el cobro de facturas"
    if not body.strip():
        # último fallback: usar todo el archivo como body
        body = raw.strip() or "[plantilla vacía]"
    return subject, body


def personalize(template: str, row: dict) -> str:
    out = template
    for k, v in row.items():
        if k:
            out = out.replace("{" + k.upper() + "}", v or "")
    return out


def text_to_html(text: str) -> str:
    """Convierte texto plano a HTML simple para Zoho (preserva saltos de línea)."""
    import html
    esc = html.escape(text)
    return "<div>" + esc.replace("\n", "<br>") + "</div>"


def create_draft(token: str, account_id: str, to_email: str, subject: str, body_text: str) -> dict:
    """Crea un borrador en la carpeta Drafts via API REST de Zoho Mail."""
    url = f"{API_BASE}/api/accounts/{account_id}/messages"
    payload = {
        "fromAddress": FROM_EMAIL,
        "toAddress": to_email,
        "subject": subject,
        "content": text_to_html(body_text),
        "mailFormat": "html",
        "mode": "draft",
    }
    r = requests.post(url, headers=auth_headers(token), data=json.dumps(payload), timeout=20)
    try:
        data = r.json()
    except Exception:
        r.raise_for_status()
        return {}
    if r.status_code >= 400 or (data.get("status", {}).get("code") not in (200, 201)):
        raise RuntimeError(f"HTTP {r.status_code} {data}")
    return data


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    subject_tpl, body_tpl = load_template()

    with CSV_PATH.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
        fieldnames = list(rows[0].keys()) if rows else []
    for r in rows:
        r.pop(None, None)

    if not args.dry_run:
        print("Refrescando access_token...")
        token = get_access_token()
        print("Obteniendo accountId...")
        account_id = get_account_id(token)
        print(f"  accountId: {account_id}")
    else:
        token = ""
        account_id = "(dry-run)"

    creados = 0
    saltados = 0
    errores = 0
    for i, row in enumerate(rows, 1):
        if args.limit and creados >= args.limit:
            break
        email_to = (row.get("email") or "").strip()
        status = (row.get("status") or "").strip()
        if not email_to:
            saltados += 1
            continue
        if status == "drafted" and not args.force:
            saltados += 1
            continue

        subject = personalize(subject_tpl, row)
        body = personalize(body_tpl, row)

        print(f"[{i:02d}/{len(rows)}] {row['name'][:38]:38} -> {email_to}")
        if args.dry_run:
            print(f"        subject: {subject}")
            creados += 1
            continue

        try:
            create_draft(token, account_id, email_to, subject, body)
            row["status"] = "drafted"
            creados += 1
            time.sleep(0.4)  # respetar rate limit
        except Exception as e:
            print(f"        ERROR: {e}")
            errores += 1

    if not args.dry_run and fieldnames:
        with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
            writer.writeheader()
            writer.writerows(rows)

    print("\n--- Resumen ---")
    print(f"Borradores creados: {creados}")
    print(f"Saltadas: {saltados}")
    print(f"Errores: {errores}")
    if creados and not args.dry_run:
        print("\nAbre Zoho Mail > Borradores y revisa/envia 8/dia maximo.")


if __name__ == "__main__":
    main()
