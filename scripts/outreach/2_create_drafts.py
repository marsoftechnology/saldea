"""
2_create_drafts.py — Crea borradores en Zoho Mail (via IMAP) personalizados por gestoría.

Para cada fila del CSV que tenga email pero status != "drafted":
  1. Construye email personalizado a partir de template.txt
  2. Lo guarda como BORRADOR en Zoho (carpeta Drafts) via IMAP APPEND
  3. Marca status = "drafted" para no duplicar al re-ejecutar

Tú luego abres Zoho → Borradores → revisas y envías 1 a 1.

Requisitos:
  - .env con ZOHO_EMAIL + ZOHO_APP_PASSWORD (NO el password normal, app-specific)
  - Generar app password: https://accounts.zoho.eu/home#security/app_passwords

Uso:
    python 2_create_drafts.py            # crea borradores para gestorías nuevas
    python 2_create_drafts.py --dry-run  # imprime lo que haría, sin crear nada
    python 2_create_drafts.py --limit 3  # solo los 3 primeros
"""
from __future__ import annotations

import argparse
import csv
import imaplib
import os
import sys
import time
from datetime import datetime, timezone
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    sys.exit("Falta dependencia: pip install python-dotenv")

ROOT = Path(__file__).parent
CSV_PATH = ROOT / "gestorias.csv"
TEMPLATE_PATH = ROOT / "template.txt"

load_dotenv(ROOT / ".env")

ZOHO_EMAIL = os.getenv("ZOHO_EMAIL")
ZOHO_APP_PW = os.getenv("ZOHO_APP_PASSWORD")
ZOHO_HOST = os.getenv("ZOHO_IMAP_HOST", "imap.zoho.eu")
ZOHO_PORT = int(os.getenv("ZOHO_IMAP_PORT", "993"))


def load_template() -> tuple[str, str]:
    """Devuelve (subject_template, body_template)."""
    raw = TEMPLATE_PATH.read_text(encoding="utf-8")
    lines = raw.splitlines()
    subject = ""
    body_lines = []
    in_body = False
    for ln in lines:
        if not in_body and ln.startswith("SUBJECT:"):
            subject = ln[len("SUBJECT:"):].strip()
            continue
        if ln.strip() == "---":
            in_body = True
            continue
        if in_body:
            body_lines.append(ln)
    body = "\n".join(body_lines).lstrip("\n")
    if not subject or not body:
        sys.exit("template.txt está mal: necesita SUBJECT: y separador ---")
    return subject, body


def personalize(template: str, row: dict) -> str:
    """Reemplaza {NAME}, {CITY}, etc."""
    out = template
    for k, v in row.items():
        out = out.replace("{" + k.upper() + "}", v or "")
    return out


def build_message(to_email: str, subject: str, body: str) -> bytes:
    msg = EmailMessage()
    msg["From"] = ZOHO_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain="marsof.es")
    msg.set_content(body)
    return msg.as_bytes()


def find_drafts_folder(imap: imaplib.IMAP4_SSL) -> str:
    """Zoho EU suele tener 'Drafts' o 'Borradores'."""
    typ, data = imap.list()
    if typ != "OK":
        return "Drafts"
    candidates = []
    for raw in data:
        line = raw.decode(errors="ignore")
        # ej: (\HasNoChildren \Drafts) "/" "Borradores"
        if "\\Drafts" in line:
            # extraer último token entre comillas
            parts = line.rsplit('"', 2)
            if len(parts) >= 2:
                return parts[-2]
        if '"Drafts"' in line or '"Borradores"' in line:
            parts = line.rsplit('"', 2)
            if len(parts) >= 2:
                candidates.append(parts[-2])
    return candidates[0] if candidates else "Drafts"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--force", action="store_true", help="Re-crear aunque ya esté drafted")
    args = parser.parse_args()

    if not args.dry_run and (not ZOHO_EMAIL or not ZOHO_APP_PW):
        sys.exit("Configura .env (ver .env.example)")

    subject_tpl, body_tpl = load_template()

    with CSV_PATH.open(encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = reader.fieldnames

    if not args.dry_run:
        print(f"Conectando a {ZOHO_HOST}:{ZOHO_PORT} como {ZOHO_EMAIL}...")
        imap = imaplib.IMAP4_SSL(ZOHO_HOST, ZOHO_PORT)
        imap.login(ZOHO_EMAIL, ZOHO_APP_PW)
        drafts = find_drafts_folder(imap)
        print(f"Carpeta de borradores: {drafts}")
    else:
        imap = None
        drafts = "Drafts"

    creados = 0
    saltados = 0
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
        msg_bytes = build_message(email_to, subject, body)

        print(f"[{i}/{len(rows)}] {row['name']:40} -> {email_to}")
        print(f"   subject: {subject}")

        if args.dry_run:
            creados += 1
            continue

        date_str = imaplib.Time2Internaldate(time.time())
        typ, resp = imap.append(drafts, "\\Draft", date_str, msg_bytes)
        if typ != "OK":
            print(f"   ERROR APPEND: {typ} {resp}")
            continue
        row["status"] = "drafted"
        creados += 1
        time.sleep(0.3)

    if imap:
        imap.logout()

    # guardar status
    if not args.dry_run:
        with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    print(f"\n--- Resumen ---")
    print(f"Borradores creados: {creados}")
    print(f"Saltadas (sin email o ya drafted): {saltados}")
    if creados and not args.dry_run:
        print(f"\nAhora abre Zoho > Borradores y revisa antes de enviar.")
        print(f"Recomendado: máximo 8-10 envíos al día para no quemar el dominio.")


if __name__ == "__main__":
    main()
