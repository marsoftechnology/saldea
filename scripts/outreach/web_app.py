"""
web_app.py — Interfaz web local para todo el sistema Marsof Outreach.

Lanza un servidor Flask en localhost:8765 y abre el navegador automáticamente.
Tabs:
  - Buscar: scrapea emails de una ciudad
  - Emails: tabla con todos los emails recogidos
  - Borradores: crea borradores en Zoho via API
  - Plantilla: edita el template del email

Uso:
    python web_app.py
"""
from __future__ import annotations

import csv
import importlib.util
import json
import os
import sys
import threading
import time
import webbrowser
from datetime import datetime
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_from_directory

# importar módulos del proyecto
ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT))


def _load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


fbe = _load_module("fbe", ROOT / "find_business_emails.py")
fe = _load_module("fe", ROOT / "1_find_emails.py")
api_drafts = _load_module("api_drafts", ROOT / "3_api_drafts.py")

CSV_GESTORIAS = ROOT / "gestorias.csv"
TEMPLATE_PATH = ROOT / "template.txt"
ENV_PATH = ROOT / ".env"
SENT_PATH = ROOT / "sent_emails.json"

app = Flask(__name__, static_folder=None)


# --- Cache de credenciales Zoho (evita 2 calls extra por draft) ------------
_zoho_cache = {"token": None, "token_expires_at": 0, "account_id": None}
_zoho_lock = threading.Lock()


def get_zoho_token_cached() -> str:
    """Devuelve access_token, refrescándolo solo si está expirado."""
    with _zoho_lock:
        now = time.time()
        if _zoho_cache["token"] and now < _zoho_cache["token_expires_at"]:
            return _zoho_cache["token"]
        token = api_drafts.get_access_token()
        _zoho_cache["token"] = token
        _zoho_cache["token_expires_at"] = now + 3000  # 50 min (en realidad dura 1h)
        return token


def get_zoho_account_id_cached() -> str:
    with _zoho_lock:
        if _zoho_cache["account_id"]:
            return _zoho_cache["account_id"]
    token = get_zoho_token_cached()
    aid = api_drafts.get_account_id(token)
    with _zoho_lock:
        _zoho_cache["account_id"] = aid
    return aid


# --- Estado de envíos (persistido en sent_emails.json) ----------------------
_sent_lock = threading.Lock()


def load_sent() -> dict[str, dict]:
    """Estructura: { 'email@ejemplo.com': { 'sent_at': ISO8601, 'nombre': '...' } }"""
    if not SENT_PATH.exists():
        return {}
    try:
        return json.loads(SENT_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_sent(data: dict[str, dict]) -> None:
    SENT_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


# Estados posibles del envío
STATUS_DRAFTED = "drafted"       # Borrador creado en Zoho
STATUS_SENT = "sent"             # Tú lo enviaste manualmente desde Zoho
STATUS_REPLIED_YES = "replied_yes"   # Respondió, interesado
STATUS_REPLIED_NO = "replied_no"     # Respondió, no interesado
STATUS_NO_REPLY = "no_reply"     # Sin respuesta tras X días

STATUS_LABELS = {
    STATUS_DRAFTED: "Borrador creado",
    STATUS_SENT: "Enviado",
    STATUS_REPLIED_YES: "Respondió — interesado",
    STATUS_REPLIED_NO: "Respondió — no interesado",
    STATUS_NO_REPLY: "Sin respuesta",
}


def mark_sent(email: str, nombre: str | None = None) -> None:
    """Marca el primer paso: borrador creado en Zoho."""
    with _sent_lock:
        data = load_sent()
        existing = data.get(email.lower(), {})
        data[email.lower()] = {
            "sent_at": existing.get("sent_at") or datetime.now().isoformat(timespec="seconds"),
            "nombre": nombre or existing.get("nombre", ""),
            "status": existing.get("status") or STATUS_DRAFTED,
            "status_at": existing.get("status_at") or datetime.now().isoformat(timespec="seconds"),
            "notes": existing.get("notes", ""),
        }
        save_sent(data)


def unmark_sent(email: str) -> None:
    with _sent_lock:
        data = load_sent()
        data.pop(email.lower(), None)
        save_sent(data)


def set_status(email: str, status: str, notes: str | None = None) -> None:
    if status not in STATUS_LABELS:
        raise ValueError(f"Estado inválido: {status}")
    with _sent_lock:
        data = load_sent()
        rec = data.get(email.lower(), {})
        rec["status"] = status
        rec["status_at"] = datetime.now().isoformat(timespec="seconds")
        if notes is not None:
            rec["notes"] = notes
        # asegurar campos mínimos
        rec.setdefault("sent_at", datetime.now().isoformat(timespec="seconds"))
        rec.setdefault("nombre", "")
        data[email.lower()] = rec
        save_sent(data)

# --- Estado global del scraper en background -------------------------------
_scrape_state: dict[str, Any] = {
    "running": False,
    "ciudad": None,
    "sector_actual": None,
    "sector_idx": 0,
    "sector_total": 0,
    "emails_encontrados": 0,
    "log": [],
    "csv_path": None,
    "started_at": None,
    "finished_at": None,
}
_scrape_lock = threading.Lock()


def _scrape_log(line: str) -> None:
    with _scrape_lock:
        _scrape_state["log"].append(line)
        if len(_scrape_state["log"]) > 500:
            _scrape_state["log"] = _scrape_state["log"][-500:]


def _scrape_worker(ciudad: str, sectores: int, limite_por_sector: int):
    import re
    from urllib.parse import urlparse

    with _scrape_lock:
        _scrape_state.update(
            running=True, ciudad=ciudad, sector_actual=None, sector_idx=0,
            sector_total=min(sectores, len(fbe.SECTORES)),
            emails_encontrados=0, log=[], csv_path=None,
            started_at=datetime.now().isoformat(timespec="seconds"),
            finished_at=None,
        )

    fecha = datetime.now().strftime("%Y-%m-%d")
    slug = re.sub(r"[^a-z0-9]+", "_", ciudad.lower()).strip("_")
    output = ROOT / f"emails_{slug}_{fecha}.csv"

    seen_websites: set[str] = set()
    seen_emails: set[str] = set()
    results: list[dict] = []

    sectores_a_usar = fbe.SECTORES[:sectores]
    _scrape_log(f"Iniciando: {len(sectores_a_usar)} sectores x {limite_por_sector} webs/sector en '{ciudad}'")

    for si, sector in enumerate(sectores_a_usar, 1):
        with _scrape_lock:
            _scrape_state["sector_idx"] = si
            _scrape_state["sector_actual"] = sector

        query = f"{sector} {ciudad}"
        _scrape_log(f"[{si:02d}/{len(sectores_a_usar)}] {query}")

        try:
            urls = fbe.search_startpage(query, limit=limite_por_sector)
        except Exception as e:
            _scrape_log(f"   error search: {e}")
            urls = []

        if not urls:
            _scrape_log("   sin resultados")
            time.sleep(1.5)
            continue

        nuevos = 0
        for url in urls:
            host = urlparse(url).netloc.lower()
            if host in seen_websites:
                continue
            seen_websites.add(host)

            try:
                home_html = fbe.fetch(url)
                if not home_html:
                    continue
                emails = fbe.extract_emails(home_html)
                chosen = None
                if emails:
                    chosen = emails[0]
                    for prefix in ("info@", "contacto@", "hola@", "admin@", "administracion@"):
                        for e in emails:
                            if e.lower().startswith(prefix):
                                chosen = e
                                break
                        if chosen.lower().startswith(prefix):
                            break
                else:
                    em, _ = fbe.find_email_on_website(url)
                    chosen = em

                if not chosen or chosen.lower() in seen_emails:
                    continue
                seen_emails.add(chosen.lower())

                name = fbe.extract_business_name(home_html, host)
                results.append({
                    "email": chosen, "nombre": name, "sector": sector,
                    "website": url, "ciudad": ciudad, "fecha": fecha,
                })
                nuevos += 1
                with _scrape_lock:
                    _scrape_state["emails_encontrados"] = len(results)
                _scrape_log(f"   OK {chosen} ({name[:50]})")
            except Exception as e:
                _scrape_log(f"   err {host[:30]}: {e}")
            time.sleep(0.7)

        # guardar progreso
        try:
            with output.open("w", encoding="utf-8", newline="") as f:
                writer = csv.DictWriter(
                    f,
                    fieldnames=["email", "nombre", "sector", "website", "ciudad", "fecha"],
                    quoting=csv.QUOTE_ALL,
                )
                writer.writeheader()
                writer.writerows(results)
        except Exception as e:
            _scrape_log(f"   error guardando CSV: {e}")

        _scrape_log(f"   sector +{nuevos} nuevos. Total: {len(results)}")
        time.sleep(1.0)

    with _scrape_lock:
        _scrape_state["running"] = False
        _scrape_state["csv_path"] = str(output)
        _scrape_state["finished_at"] = datetime.now().isoformat(timespec="seconds")
    _scrape_log(f"FINALIZADO. Total {len(results)} emails en {output.name}")


# --- API endpoints ----------------------------------------------------------

@app.route("/")
def index():
    from flask import Response
    resp = Response(INDEX_HTML, mimetype="text/html")
    resp.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    resp.headers["Pragma"] = "no-cache"
    resp.headers["Expires"] = "0"
    return resp


@app.after_request
def add_no_cache(response):
    # Evita cache para todos los endpoints (es app local)
    if request.path.startswith("/api/") or request.path == "/":
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    return response


@app.route("/api/stats")
def api_stats():
    csv_files = list(ROOT.glob("emails_*.csv"))
    total_emails = 0
    by_city: dict[str, int] = {}
    for p in csv_files:
        try:
            with p.open(encoding="utf-8", newline="") as f:
                rows = list(csv.DictReader(f))
            total_emails += len(rows)
            for r in rows:
                c = (r.get("ciudad") or "?").strip()
                by_city[c] = by_city.get(c, 0) + 1
        except Exception:
            pass

    # contar borradores
    gestorias_total = 0
    gestorias_drafted = 0
    if CSV_GESTORIAS.exists():
        with CSV_GESTORIAS.open(encoding="utf-8", newline="") as f:
            for r in csv.DictReader(f):
                gestorias_total += 1
                if (r.get("status") or "").strip() == "drafted":
                    gestorias_drafted += 1

    sent_count = len(load_sent())
    return jsonify(dict(
        total_emails=total_emails,
        by_city=by_city,
        csv_count=len(csv_files),
        gestorias_total=gestorias_total,
        gestorias_drafted=gestorias_drafted,
        sent_count=sent_count,
    ))


@app.route("/api/scrape", methods=["POST"])
def api_scrape():
    if _scrape_state["running"]:
        return jsonify(dict(ok=False, error="Ya hay un scraper en marcha")), 409
    data = request.get_json(silent=True) or {}
    ciudad = (data.get("ciudad") or "").strip()
    if not ciudad:
        return jsonify(dict(ok=False, error="Falta ciudad")), 400
    sectores = int(data.get("sectores") or len(fbe.SECTORES))
    limite = int(data.get("limite") or 10)
    th = threading.Thread(target=_scrape_worker, args=(ciudad, sectores, limite), daemon=True)
    th.start()
    return jsonify(dict(ok=True))


@app.route("/api/scrape/status")
def api_scrape_status():
    with _scrape_lock:
        s = dict(_scrape_state)
    s["log"] = s["log"][-30:]  # últimas 30 líneas
    return jsonify(s)


@app.route("/api/emails")
def api_emails():
    ciudad_filter = (request.args.get("ciudad") or "").strip().lower()
    sector_filter = (request.args.get("sector") or "").strip().lower()
    sent_map = load_sent()
    all_rows = []
    seen_emails = set()  # deduplicar entre CSVs
    for p in sorted(ROOT.glob("emails_*.csv")):
        try:
            with p.open(encoding="utf-8", newline="") as f:
                for r in csv.DictReader(f):
                    r["_file"] = p.name
                    email_lc = (r.get("email") or "").strip().lower()
                    if not email_lc or email_lc in seen_emails:
                        continue
                    seen_emails.add(email_lc)
                    if ciudad_filter and ciudad_filter not in (r.get("ciudad") or "").lower():
                        continue
                    if sector_filter and sector_filter not in (r.get("sector") or "").lower():
                        continue
                    sent_info = sent_map.get(email_lc)
                    r["sent"] = bool(sent_info)
                    r["sent_at"] = sent_info["sent_at"] if sent_info else None
                    r["status"] = sent_info.get("status") if sent_info else None
                    r["status_at"] = sent_info.get("status_at") if sent_info else None
                    r["notes"] = sent_info.get("notes") if sent_info else None
                    all_rows.append(r)
        except Exception:
            pass
    return jsonify(all_rows)


@app.route("/api/sent", methods=["POST"])
def api_sent_post():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    nombre = (data.get("nombre") or "").strip()
    action = (data.get("action") or "mark").strip()
    if not email:
        return jsonify(dict(ok=False, error="Falta email")), 400
    if action == "mark":
        mark_sent(email, nombre)
    elif action == "unmark":
        unmark_sent(email)
    else:
        return jsonify(dict(ok=False, error="action debe ser 'mark' o 'unmark'")), 400
    return jsonify(dict(ok=True))


@app.route("/api/sent")
def api_sent_get():
    return jsonify(load_sent())


@app.route("/api/status", methods=["POST"])
def api_status_post():
    """Cambiar el estado de un envío."""
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    status = (data.get("status") or "").strip()
    notes = data.get("notes")
    if not email:
        return jsonify(dict(ok=False, error="Falta email")), 400
    if status not in STATUS_LABELS:
        return jsonify(dict(ok=False, error=f"Estado inválido. Válidos: {list(STATUS_LABELS.keys())}")), 400
    try:
        set_status(email, status, notes)
        return jsonify(dict(ok=True))
    except Exception as e:
        return jsonify(dict(ok=False, error=str(e))), 500


@app.route("/api/tracking")
def api_tracking():
    """Devuelve solo los emails con borrador/enviados, con estado y nombre."""
    sent_map = load_sent()
    # Auto-marcar como "sin respuesta" los que llevan >7 días en estado "sent"
    seven_days_ago = datetime.now().timestamp() - 7 * 24 * 3600
    rows = []
    for email_lc, info in sent_map.items():
        status = info.get("status") or STATUS_DRAFTED
        status_at = info.get("status_at") or info.get("sent_at")
        # heurística: si lleva enviado >7 días sin marca, sugerir "no_reply"
        suggest_no_reply = False
        if status == STATUS_SENT and status_at:
            try:
                ts = datetime.fromisoformat(status_at).timestamp()
                if ts < seven_days_ago:
                    suggest_no_reply = True
            except Exception:
                pass
        rows.append({
            "email": email_lc,
            "nombre": info.get("nombre", ""),
            "sent_at": info.get("sent_at"),
            "status": status,
            "status_at": status_at,
            "status_label": STATUS_LABELS.get(status, status),
            "notes": info.get("notes", ""),
            "suggest_no_reply": suggest_no_reply,
        })
    # ordenar por status_at desc
    rows.sort(key=lambda r: r.get("status_at") or "", reverse=True)

    # contadores
    counts = {k: 0 for k in STATUS_LABELS}
    for r in rows:
        counts[r["status"]] = counts.get(r["status"], 0) + 1

    return jsonify(dict(rows=rows, counts=counts, labels=STATUS_LABELS))


@app.route("/api/template", methods=["GET", "POST"])
def api_template():
    if request.method == "POST":
        data = request.get_json(silent=True) or {}
        new = data.get("content", "")
        if not new.strip():
            return jsonify(dict(ok=False, error="Vacío")), 400
        TEMPLATE_PATH.write_text(new, encoding="utf-8")
        return jsonify(dict(ok=True))
    return jsonify(dict(content=TEMPLATE_PATH.read_text(encoding="utf-8")))


@app.route("/api/zoho/draft", methods=["POST"])
def api_zoho_draft():
    """Crear un borrador en Zoho para un email concreto."""
    data = request.get_json(silent=True) or {}
    email_to = (data.get("email") or "").strip()
    name = (data.get("nombre") or "").strip()
    if not email_to:
        return jsonify(dict(ok=False, error="Falta email")), 400

    try:
        subject_tpl, body_tpl = api_drafts.load_template()
        row_like = {"name": name, "email": email_to, "city": data.get("ciudad", "")}
        subject = api_drafts.personalize(subject_tpl, {"NAME": name, "name": name, "CITY": row_like["city"]})
        body = api_drafts.personalize(body_tpl, {"NAME": name, "name": name, "CITY": row_like["city"]})

        token = get_zoho_token_cached()
        account_id = get_zoho_account_id_cached()
        try:
            api_drafts.create_draft(token, account_id, email_to, subject, body)
        except Exception as e:
            # Si el token cacheado falló por expirar, lo invalidamos y reintentamos 1 vez
            if "401" in str(e) or "Unauthorized" in str(e) or "expired" in str(e).lower():
                with _zoho_lock:
                    _zoho_cache["token"] = None
                token = get_zoho_token_cached()
                api_drafts.create_draft(token, account_id, email_to, subject, body)
            else:
                raise
        # marcar automáticamente como enviado (en realidad: borrador creado)
        mark_sent(email_to, name)
        return jsonify(dict(ok=True, subject=subject))
    except Exception as e:
        return jsonify(dict(ok=False, error=str(e))), 500


@app.route("/api/sectores")
def api_sectores():
    return jsonify(fbe.SECTORES)


@app.route("/favicon.ico")
def favicon():
    return ("", 204)


# --- HTML SPA ---------------------------------------------------------------

INDEX_HTML = r"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Marsof Outreach</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  :root {
    --bg: #07070a;
    --bg-elev: #0f0f14;
    --bg-card: #131319;
    --bg-card-hover: #181820;
    --border: #1f1f28;
    --border-strong: #2a2a36;
    --fg: #f4f4f5;
    --fg-soft: #d4d4d8;
    --muted: #a1a1aa;
    --dim: #71717a;
    --faint: #52525b;

    --brand: #6366f1;        /* indigo */
    --brand-2: #8b5cf6;       /* violet */
    --brand-glow: rgba(99,102,241,0.18);
    --sky: #38bdf8;
    --ok: #10b981;
    --ok-glow: rgba(16,185,129,0.15);
    --warn: #f59e0b;
    --err: #ef4444;
    --err-glow: rgba(239,68,68,0.15);

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.5);
    --shadow-md: 0 4px 14px rgba(0,0,0,0.4);
    --shadow-lg: 0 20px 40px -10px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.3);
    --shadow-brand: 0 8px 28px -6px var(--brand-glow);
  }

  html, body { height: 100%; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--bg);
    color: var(--fg);
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }
  /* fondo decorativo */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background:
      radial-gradient(circle at 0% 0%, rgba(99,102,241,0.06), transparent 40%),
      radial-gradient(circle at 100% 0%, rgba(139,92,246,0.05), transparent 40%);
    pointer-events: none;
    z-index: 0;
  }

  /* LAYOUT principal */
  .app {
    position: relative; z-index: 1;
    display: grid;
    grid-template-columns: 248px 1fr;
    height: 100vh;
    overflow: hidden;
  }

  /* SIDEBAR */
  aside {
    background: rgba(10,10,15,0.6);
    backdrop-filter: blur(20px);
    border-right: 1px solid var(--border);
    padding: 24px 18px;
    display: flex; flex-direction: column;
    overflow-y: auto;
  }
  .brand {
    display: flex; align-items: center; gap: 11px;
    padding: 4px 8px; margin-bottom: 28px;
  }
  .brand-logo {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--brand), var(--brand-2));
    border-radius: 9px;
    display: grid; place-items: center;
    box-shadow: var(--shadow-brand);
    color: white; font-weight: 800; font-size: 17px;
  }
  .brand-name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
  .brand-sub { font-size: 11px; color: var(--dim); margin-top: -1px; }

  .nav-label {
    font-size: 10.5px; font-weight: 600;
    color: var(--faint); text-transform: uppercase; letter-spacing: 0.1em;
    padding: 0 12px; margin: 18px 0 8px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 11px;
    padding: 9px 12px;
    border-radius: 8px;
    color: var(--muted);
    cursor: pointer;
    font-size: 13.5px; font-weight: 500;
    transition: all 0.15s;
    margin-bottom: 2px;
    user-select: none;
  }
  .nav-item:hover { background: var(--bg-card); color: var(--fg-soft); }
  .nav-item.active {
    background: linear-gradient(90deg, var(--brand-glow), transparent);
    color: var(--fg);
    box-shadow: inset 2px 0 0 var(--brand);
  }
  .nav-item.active .icon { color: var(--brand); }
  .nav-item .icon { width: 18px; height: 18px; flex-shrink: 0; color: currentColor; }
  .nav-item .count {
    margin-left: auto;
    background: var(--bg-card); color: var(--muted);
    padding: 1px 8px; border-radius: 10px;
    font-size: 11px; font-weight: 600;
  }
  .nav-item.active .count { background: var(--brand-glow); color: var(--brand); }

  .sidebar-footer {
    margin-top: auto;
    padding: 14px 12px;
    border-top: 1px solid var(--border);
    font-size: 11.5px; color: var(--dim);
    display: flex; align-items: center; gap: 8px;
  }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 8px var(--ok); }

  /* CONTENT AREA */
  main {
    overflow-y: auto;
    padding: 28px 36px 80px;
  }
  .top-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 26px;
    gap: 16px;
  }
  .page-title { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
  .page-sub { color: var(--muted); margin-top: 4px; font-size: 13.5px; }

  /* PANELS */
  .panel { display: none; animation: fadeIn 0.3s ease; }
  .panel.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  /* STAT CARDS */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 26px;
  }
  .stat {
    background: linear-gradient(160deg, var(--bg-card) 0%, var(--bg-elev) 100%);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px 22px;
    position: relative; overflow: hidden;
    transition: all 0.2s;
  }
  .stat:hover { border-color: var(--border-strong); transform: translateY(-2px); }
  .stat::before {
    content: ''; position: absolute; top: 0; right: 0;
    width: 80px; height: 80px;
    background: var(--brand-glow); border-radius: 50%;
    filter: blur(40px); opacity: 0.7;
  }
  .stat-icon {
    width: 36px; height: 36px;
    background: rgba(99,102,241,0.12); border-radius: 9px;
    display: grid; place-items: center; color: var(--brand);
    margin-bottom: 16px;
  }
  .stat-icon.green { background: var(--ok-glow); color: var(--ok); }
  .stat-icon.violet { background: rgba(139,92,246,0.12); color: var(--brand-2); }
  .stat-icon.sky { background: rgba(56,189,248,0.12); color: var(--sky); }
  .stat-value { font-size: 32px; font-weight: 700; line-height: 1; letter-spacing: -0.02em; }
  .stat-value small { font-size: 14px; color: var(--muted); font-weight: 500; margin-left: 4px; }
  .stat-label { color: var(--muted); font-size: 12.5px; margin-top: 8px; font-weight: 500; }

  /* CARDS */
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 18px;
    box-shadow: var(--shadow-sm);
  }
  .card-head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 18px;
  }
  .card-title { font-size: 15px; font-weight: 600; margin: 0; }
  .card-sub { color: var(--muted); font-size: 13px; }

  /* FORM */
  .form-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 12px;
    align-items: end;
  }
  .field { display: flex; flex-direction: column; gap: 7px; min-width: 100px; }
  .field label {
    font-size: 11.5px; color: var(--muted);
    font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
  }
  input, select, textarea {
    background: var(--bg-elev);
    border: 1px solid var(--border-strong);
    color: var(--fg);
    padding: 11px 14px;
    border-radius: 9px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: all 0.15s;
    width: 100%;
  }
  input:focus, select:focus, textarea:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px var(--brand-glow);
  }
  input::placeholder { color: var(--faint); }
  textarea {
    resize: vertical; min-height: 280px;
    font-family: 'JetBrains Mono', ui-monospace, "Cascadia Code", monospace;
    font-size: 13px; line-height: 1.6;
  }

  /* BUTTONS */
  .btn {
    background: linear-gradient(180deg, var(--brand) 0%, #5558e6 100%);
    color: white;
    border: none;
    padding: 11px 20px;
    border-radius: 9px;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    display: inline-flex; align-items: center; gap: 8px;
    box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.1);
    font-family: inherit;
    white-space: nowrap;
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md), var(--shadow-brand);
  }
  .btn:active:not(:disabled) { transform: translateY(0); }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn.ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border-strong);
    box-shadow: none;
  }
  .btn.ghost:hover:not(:disabled) {
    color: var(--fg); border-color: var(--dim);
    background: var(--bg-card-hover);
    box-shadow: var(--shadow-sm);
  }
  .btn.small { padding: 6px 12px; font-size: 12px; border-radius: 7px; }
  .btn.ok { background: linear-gradient(180deg, var(--ok) 0%, #059669 100%); }
  .btn.err { background: linear-gradient(180deg, var(--err) 0%, #dc2626 100%); }
  .btn .icon { width: 16px; height: 16px; }

  /* PROGRESS */
  .progress {
    height: 10px;
    background: var(--bg-elev);
    border-radius: 6px;
    overflow: hidden;
    margin: 12px 0;
    position: relative;
  }
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--brand), var(--sky));
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    width: 0%;
    border-radius: 6px;
    position: relative; overflow: hidden;
  }
  .progress-bar::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

  /* LOG */
  .log {
    background: #04040a;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    max-height: 280px;
    overflow-y: auto;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.7;
    white-space: pre-wrap;
  }
  .log::-webkit-scrollbar { width: 8px; }
  .log::-webkit-scrollbar-track { background: transparent; }
  .log::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 4px; }
  .log .ok-line { color: var(--ok); }
  .log .err-line { color: var(--err); }
  .log .header-line { color: var(--brand); font-weight: 600; }

  /* TABLE */
  .table-wrap {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px;
    overflow: hidden; box-shadow: var(--shadow-sm);
  }
  .table-scroll { max-height: calc(100vh - 320px); overflow-y: auto; overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th {
    text-align: left; padding: 12px 16px;
    font-weight: 600; color: var(--muted);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; background: var(--bg-card); z-index: 2;
    font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em;
  }
  td { padding: 12px 16px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg-card-hover); }
  tr.sent-row td { background: rgba(16,185,129,0.05); }
  tr.sent-row:hover td { background: rgba(16,185,129,0.08); }
  tr.sent-row .business-name { color: var(--muted); }
  tr.sent-row td.email-cell { color: var(--muted); }
  .sent-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--ok-glow); color: var(--ok);
    padding: 4px 10px; border-radius: 7px; font-size: 11.5px; font-weight: 500;
    border: 1px solid rgba(16,185,129,0.25);
  }
  .sent-badge .icon { width: 12px; height: 12px; }
  td.business {
    display: flex; align-items: center; gap: 12px;
    max-width: 320px;
  }
  .avatar {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 9px;
    display: grid; place-items: center;
    background: linear-gradient(135deg, var(--brand), var(--brand-2));
    color: white; font-weight: 700; font-size: 14px;
  }
  .business-info { min-width: 0; }
  .business-name {
    font-weight: 500; color: var(--fg);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .business-meta { font-size: 11.5px; color: var(--dim); }
  td.email-cell {
    font-family: 'JetBrains Mono', monospace;
    color: var(--sky); font-size: 12.5px;
  }
  td.web a { color: var(--muted); text-decoration: none; font-size: 12px; }
  td.web a:hover { color: var(--sky); }

  .pill {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 11px;
    font-size: 11px;
    font-weight: 500;
    background: var(--bg-elev);
    color: var(--muted);
    border: 1px solid var(--border);
  }
  .pill.sent { background: var(--ok-glow); color: var(--ok); border-color: rgba(16,185,129,0.3); }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-strong);
    padding: 14px 20px;
    border-radius: 11px;
    font-size: 14px;
    box-shadow: var(--shadow-lg);
    display: flex; align-items: center; gap: 12px;
    transform: translateY(100px); opacity: 0;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
    max-width: 380px;
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.ok { border-color: var(--ok); }
  .toast.ok::before { content: '✓'; color: var(--ok); font-weight: 700; font-size: 18px; }
  .toast.err { border-color: var(--err); }
  .toast.err::before { content: '!'; color: var(--err); font-weight: 700; font-size: 18px; }

  /* FILTERS */
  .filter-bar {
    display: flex; gap: 10px; margin-bottom: 18px;
    align-items: center; flex-wrap: wrap;
  }
  .filter-bar .search-input {
    flex: 1; min-width: 240px; position: relative;
  }
  .filter-bar .search-input input { padding-left: 38px; }
  .filter-bar .search-input .icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    width: 16px; height: 16px; color: var(--dim);
  }
  .filter-bar select { width: auto; min-width: 160px; }

  .badge {
    background: var(--bg-elev);
    border: 1px solid var(--border);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    color: var(--muted);
  }
  .badge.brand { background: var(--brand-glow); color: var(--brand); border-color: rgba(99,102,241,0.3); }

  .empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--dim);
  }
  .empty .icon { width: 48px; height: 48px; color: var(--faint); margin: 0 auto 12px; display: block; }
  .empty h3 { color: var(--muted); margin: 8px 0 4px; font-size: 16px; }
  .empty p { font-size: 13.5px; margin: 0; }

  /* MISC */
  code { background: var(--bg-elev); padding: 2px 7px; border-radius: 5px;
         font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--sky); }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 5px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--dim); }

  /* FUNNEL */
  .funnel {
    display: flex; gap: 12px; align-items: stretch; flex-wrap: wrap;
    margin-bottom: 18px;
  }
  .funnel-item {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px 20px;
    display: flex; align-items: center; gap: 14px;
    flex: 1; min-width: 180px;
    cursor: pointer; transition: all 0.15s;
  }
  .funnel-item:hover { border-color: var(--border-strong); transform: translateY(-2px); }
  .funnel-item.active { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-glow); }
  .funnel-item.secondary { flex: 0.7; opacity: 0.85; }
  .funnel-icon {
    width: 38px; height: 38px; border-radius: 9px;
    display: grid; place-items: center; flex-shrink: 0;
  }
  .funnel-value { font-size: 22px; font-weight: 700; line-height: 1; }
  .funnel-label { font-size: 11.5px; color: var(--muted); margin-top: 4px; font-weight: 500; }
  .funnel-arrow { display: grid; place-items: center; color: var(--faint); font-size: 22px; }
  @media (max-width: 1200px) {
    .funnel-arrow { display: none; }
  }

  /* Status pills */
  .status-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 11px; border-radius: 14px;
    font-size: 12px; font-weight: 500;
    border: 1px solid transparent;
  }
  .status-pill.drafted { background: rgba(56,189,248,0.12); color: var(--sky); border-color: rgba(56,189,248,0.25); }
  .status-pill.sent { background: rgba(139,92,246,0.12); color: var(--brand-2); border-color: rgba(139,92,246,0.25); }
  .status-pill.replied_yes { background: rgba(16,185,129,0.12); color: var(--ok); border-color: rgba(16,185,129,0.25); }
  .status-pill.replied_no { background: rgba(239,68,68,0.12); color: var(--err); border-color: rgba(239,68,68,0.25); }
  .status-pill.no_reply { background: rgba(245,158,11,0.12); color: var(--warn); border-color: rgba(245,158,11,0.25); }
  .status-pill .dot-inner { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* Action buttons row */
  .status-actions { display: flex; gap: 5px; flex-wrap: wrap; }
  .status-actions .btn {
    padding: 5px 10px; font-size: 11.5px; border-radius: 6px;
    box-shadow: none; background: var(--bg-elev); color: var(--muted);
    border: 1px solid var(--border-strong);
  }
  .status-actions .btn:hover:not(:disabled) {
    color: var(--fg); border-color: var(--dim); transform: none;
    box-shadow: var(--shadow-sm);
  }
  .status-actions .btn.set-sent:hover { color: var(--brand-2); border-color: var(--brand-2); }
  .status-actions .btn.set-yes:hover { color: var(--ok); border-color: var(--ok); }
  .status-actions .btn.set-no:hover { color: var(--err); border-color: var(--err); }
  .status-actions .btn.set-noreply:hover { color: var(--warn); border-color: var(--warn); }

  /* CITIES CHART (dashboard) */
  .chart-list { display: flex; flex-direction: column; gap: 10px; }
  .chart-row { display: flex; align-items: center; gap: 12px; }
  .chart-row .label { width: 140px; font-size: 13px; color: var(--fg-soft); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chart-row .bar-wrap { flex: 1; height: 22px; background: var(--bg-elev); border-radius: 6px; overflow: hidden; }
  .chart-row .bar {
    height: 100%; background: linear-gradient(90deg, var(--brand), var(--brand-2));
    border-radius: 6px;
    display: flex; align-items: center; padding-left: 10px;
    color: white; font-weight: 600; font-size: 12px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .chart-row .count-tail { width: 50px; text-align: right; color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; }
</style>
</head>
<body>

<div class="app">

  <!-- ============= SIDEBAR ============= -->
  <aside>
    <div class="brand">
      <div class="brand-logo">M</div>
      <div>
        <div class="brand-name">Marsof</div>
        <div class="brand-sub">Outreach Engine</div>
      </div>
    </div>

    <div class="nav-label">Principal</div>
    <div class="nav-item active" data-tab="dashboard">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      Dashboard
    </div>
    <div class="nav-item" data-tab="buscar">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Buscar emails
    </div>
    <div class="nav-item" data-tab="emails">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      Base de datos
      <span class="count" id="nav-count-emails">0</span>
    </div>
    <div class="nav-item" data-tab="seguimiento">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>
      Seguimiento
      <span class="count" id="nav-count-tracking">0</span>
    </div>

    <div class="nav-label">Configuración</div>
    <div class="nav-item" data-tab="plantilla">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      Plantilla email
    </div>

    <div class="sidebar-footer">
      <span class="dot"></span>
      <span>Servidor activo · localhost:8765</span>
    </div>
  </aside>

  <!-- ============= MAIN ============= -->
  <main>

    <!-- ----- DASHBOARD ----- -->
    <div class="panel active" id="panel-dashboard">
      <div class="top-row">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-sub">Resumen de tu outreach a pymes y autónomos.</p>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="stat-value" id="stat-emails">0</div>
          <div class="stat-label">Emails recopilados</div>
        </div>
        <div class="stat">
          <div class="stat-icon violet">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="stat-value" id="stat-cities">0</div>
          <div class="stat-label">Ciudades exploradas</div>
        </div>
        <div class="stat">
          <div class="stat-icon green">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="stat-value" id="stat-sent">0</div>
          <div class="stat-label">Enviados / borradores</div>
        </div>
        <div class="stat">
          <div class="stat-icon sky">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
          <div class="stat-value" id="stat-csv-count">0</div>
          <div class="stat-label">Campañas creadas</div>
        </div>
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <div class="card-title">Distribución por ciudad</div>
            <div class="card-sub">Cuántos emails has encontrado en cada zona</div>
          </div>
        </div>
        <div class="chart-list" id="cityChart"></div>
      </div>
    </div>

    <!-- ----- BUSCAR ----- -->
    <div class="panel" id="panel-buscar">
      <div class="top-row">
        <div>
          <h1 class="page-title">Buscar emails de una ciudad</h1>
          <p class="page-sub">El programa busca emails de pymes y autónomos atravesando 51 sectores. Tarda ~30 minutos por ciudad.</p>
        </div>
      </div>

      <div class="card">
        <div class="form-row">
          <div class="field">
            <label>Ciudad o zona</label>
            <input id="inCiudad" placeholder="Ej: Huelva, Sevilla, Cádiz y pueblos…">
          </div>
          <div class="field">
            <label>Sectores</label>
            <input id="inSectores" type="number" value="51" min="1" max="51">
          </div>
          <div class="field">
            <label>Webs por sector</label>
            <input id="inLimite" type="number" value="10" min="3" max="20">
          </div>
          <button class="btn" id="btnScrape">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Empezar
          </button>
        </div>
      </div>

      <div class="card" id="scrapeStatus" style="display:none">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;gap:20px">
          <div>
            <div style="font-size:11.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;font-weight:600">En curso</div>
            <div style="font-size:17px;font-weight:600;margin-top:6px" id="scrapeCiudad"></div>
            <div style="font-size:13px;color:var(--muted);margin-top:3px" id="scrapeProgress"></div>
          </div>
          <div style="text-align:right">
            <div style="font-size:34px;font-weight:700;color:var(--ok);line-height:1" id="scrapeCount">0</div>
            <div style="font-size:11.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-top:4px">emails</div>
          </div>
        </div>
        <div class="progress"><div class="progress-bar" id="scrapeBar"></div></div>
        <div class="log" id="scrapeLog"></div>
      </div>
    </div>

    <!-- ----- EMAILS ----- -->
    <div class="panel" id="panel-emails">
      <div class="top-row">
        <div>
          <h1 class="page-title">Base de datos</h1>
          <p class="page-sub">Todos los emails encontrados, con filtros. Click "Crear borrador" envía a tu Zoho.</p>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-input">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="inFilterText" placeholder="Buscar por nombre, email o sector…">
        </div>
        <select id="inFilterCiudad"><option value="">Todas las ciudades</option></select>
        <select id="inFilterSector"><option value="">Todos los sectores</option></select>
        <select id="inFilterEstado">
          <option value="">Todos los estados</option>
          <option value="pending">Solo pendientes</option>
          <option value="sent">Solo enviados</option>
        </select>
        <span class="badge brand" id="filterCount">0 resultados</span>
      </div>

      <div class="table-wrap">
        <div class="table-scroll">
          <table id="tblEmails">
            <thead>
              <tr><th style="width:50px">Negocio</th><th>Email</th><th>Sector</th><th>Ciudad</th><th>Web</th><th style="width:180px;text-align:right">Acción</th></tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ----- SEGUIMIENTO ----- -->
    <div class="panel" id="panel-seguimiento">
      <div class="top-row">
        <div>
          <h1 class="page-title">Seguimiento de envíos</h1>
          <p class="page-sub">Estado de cada gestoría a la que has creado borrador. Cuando envíes desde Zoho, márcalo como "Enviado". Si responden, marca si están interesados o no.</p>
        </div>
      </div>

      <!-- Funnel de estados -->
      <div class="funnel">
        <div class="funnel-item" data-status="drafted" onclick="filterTracking('drafted')">
          <div class="funnel-icon" style="background:rgba(56,189,248,0.12);color:var(--sky)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <div>
            <div class="funnel-value" id="fnl-drafted">0</div>
            <div class="funnel-label">Borradores pendientes</div>
          </div>
        </div>
        <div class="funnel-arrow">→</div>
        <div class="funnel-item" data-status="sent" onclick="filterTracking('sent')">
          <div class="funnel-icon" style="background:rgba(139,92,246,0.12);color:var(--brand-2)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
          <div>
            <div class="funnel-value" id="fnl-sent">0</div>
            <div class="funnel-label">Enviados</div>
          </div>
        </div>
        <div class="funnel-arrow">→</div>
        <div class="funnel-item" data-status="replied_yes" onclick="filterTracking('replied_yes')">
          <div class="funnel-icon" style="background:rgba(16,185,129,0.12);color:var(--ok)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div class="funnel-value" id="fnl-replied_yes">0</div>
            <div class="funnel-label">Interesados</div>
          </div>
        </div>
        <div class="funnel-item secondary" data-status="replied_no" onclick="filterTracking('replied_no')">
          <div class="funnel-icon" style="background:rgba(239,68,68,0.12);color:var(--err)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <div>
            <div class="funnel-value" id="fnl-replied_no">0</div>
            <div class="funnel-label">No interesados</div>
          </div>
        </div>
        <div class="funnel-item secondary" data-status="no_reply" onclick="filterTracking('no_reply')">
          <div class="funnel-icon" style="background:rgba(245,158,11,0.12);color:var(--warn)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <div class="funnel-value" id="fnl-no_reply">0</div>
            <div class="funnel-label">Sin respuesta</div>
          </div>
        </div>
      </div>

      <div class="filter-bar" style="margin-top:18px">
        <div class="search-input">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="trkFilterText" placeholder="Buscar negocio o email…">
        </div>
        <select id="trkFilterStatus">
          <option value="">Todos los estados</option>
        </select>
        <span class="badge brand" id="trkCount">0</span>
      </div>

      <div class="table-wrap">
        <div class="table-scroll">
          <table id="tblTracking">
            <thead>
              <tr><th>Negocio</th><th>Email</th><th>Estado actual</th><th>Cambiar a</th></tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ----- PLANTILLA ----- -->
    <div class="panel" id="panel-plantilla">
      <div class="top-row">
        <div>
          <h1 class="page-title">Plantilla del email</h1>
          <p class="page-sub">Edita el asunto y el cuerpo. Usa <code>{NAME}</code> para meter el nombre del negocio. El separador <code>---</code> entre asunto y cuerpo es obligatorio.</p>
        </div>
      </div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px">
            <span class="dot" id="tplStatusDot"></span>
            <span id="tplStatusText">Cargando…</span>
          </div>
          <div style="font-size:12px;color:var(--dim)">Auto-guardado · 1 s de inactividad</div>
        </div>
        <textarea id="tplArea" style="min-height: 460px" placeholder="SUBJECT: tu asunto&#10;---&#10;&#10;Cuerpo del email aquí…"></textarea>
      </div>
    </div>

  </main>
</div>

<div class="toast" id="toast"></div>

<script>
// ----- Tabs/Nav -----
document.querySelectorAll('.nav-item').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('panel-' + t.dataset.tab).classList.add('active');
    if (t.dataset.tab === 'emails') loadEmails();
    if (t.dataset.tab === 'plantilla') loadTpl();
    if (t.dataset.tab === 'dashboard') refreshStats();
    if (t.dataset.tab === 'seguimiento') loadTracking();
  });
});

function toast(msg, type='ok') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ----- Stats -----
async function refreshStats() {
  try {
    const r = await fetch('/api/stats').then(r => {
      if (!r.ok) throw new Error('stats fail');
      return r.json();
    });
    document.getElementById('stat-emails').textContent = r.total_emails || 0;
    document.getElementById('stat-cities').textContent = Object.keys(r.by_city || {}).length;
    document.getElementById('stat-sent').textContent = r.sent_count || 0;
    document.getElementById('stat-csv-count').textContent = r.csv_count || 0;
    document.getElementById('nav-count-emails').textContent = r.total_emails || 0;

    // chart
    const entries = Object.entries(r.by_city || {}).sort((a,b)=>b[1]-a[1]);
    const max = Math.max(...entries.map(e => e[1]), 1);
    const chart = document.getElementById('cityChart');
    if (entries.length === 0) {
      chart.innerHTML = '<div class="empty" style="padding:30px"><p>Lanza una búsqueda para ver datos aquí</p></div>';
    } else {
      chart.innerHTML = entries.map(([city, count]) => {
        const pct = (count / max * 100).toFixed(0);
        return `<div class="chart-row">
          <div class="label">${escapeHtml(city)}</div>
          <div class="bar-wrap"><div class="bar" style="width:${pct}%">${count >= 5 ? count : ''}</div></div>
          <div class="count-tail">${count}</div>
        </div>`;
      }).join('');
    }
  } catch (e) { console.error(e); }
}
refreshStats();
setInterval(refreshStats, 10000);

// ----- Scrape -----
let scrapePollTimer = null;
document.getElementById('btnScrape').addEventListener('click', async () => {
  const ciudad = document.getElementById('inCiudad').value.trim();
  if (!ciudad) { toast('Escribe una ciudad', 'err'); return; }
  const sectores = parseInt(document.getElementById('inSectores').value) || 51;
  const limite = parseInt(document.getElementById('inLimite').value) || 10;

  const r = await fetch('/api/scrape', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ciudad, sectores, limite}),
  }).then(r => r.json());

  if (!r.ok) { toast(r.error || 'Error', 'err'); return; }
  document.getElementById('scrapeStatus').style.display = 'block';
  pollScrape();
});

async function pollScrape() {
  try {
    const s = await fetch('/api/scrape/status').then(r => {
      if (!r.ok) throw new Error('status fail');
      return r.json();
    });
    document.getElementById('scrapeCiudad').textContent = s.ciudad ? `Buscando en ${s.ciudad}` : '';
    document.getElementById('scrapeProgress').textContent =
      s.sector_total ? `Sector ${s.sector_idx} de ${s.sector_total} · ${s.sector_actual || '...'}` : 'Iniciando...';
    document.getElementById('scrapeCount').textContent = s.emails_encontrados || 0;
    const pct = s.sector_total ? (s.sector_idx / s.sector_total * 100) : 0;
    document.getElementById('scrapeBar').style.width = pct + '%';

    const logEl = document.getElementById('scrapeLog');
    logEl.innerHTML = (s.log || []).map(line => {
      let cls = '';
      if (line.includes('OK ')) cls = 'ok-line';
      else if (line.includes('err ') || line.toLowerCase().includes('error')) cls = 'err-line';
      else if (line.startsWith('[')) cls = 'header-line';
      return `<div class="${cls}">${escapeHtml(line)}</div>`;
    }).join('');
    logEl.scrollTop = logEl.scrollHeight;

    if (s.running) {
      scrapePollTimer = setTimeout(pollScrape, 1500);
    } else if (s.finished_at) {
      toast(`Finalizado: ${s.emails_encontrados} emails`, 'ok');
      refreshStats();
    }
  } catch (e) { console.error(e); }
}

fetch('/api/scrape/status').then(r => r.json()).then(s => {
  if (s.running) {
    document.getElementById('scrapeStatus').style.display = 'block';
    pollScrape();
  }
});

// ----- Emails -----
let allEmails = [];
async function loadEmails() {
  const data = await fetch('/api/emails').then(r => r.json());
  allEmails = data;
  populateFilters(data);
  renderEmails();
}

function populateFilters(data) {
  const ciudades = [...new Set(data.map(r => r.ciudad).filter(Boolean))].sort();
  const sectores = [...new Set(data.map(r => r.sector).filter(Boolean))].sort();
  const selC = document.getElementById('inFilterCiudad');
  const selS = document.getElementById('inFilterSector');
  const curC = selC.value, curS = selS.value;
  selC.innerHTML = '<option value="">Todas las ciudades</option>' + ciudades.map(c => `<option ${c===curC?'selected':''}>${escapeHtml(c)}</option>`).join('');
  selS.innerHTML = '<option value="">Todos los sectores</option>' + sectores.map(s => `<option ${s===curS?'selected':''}>${escapeHtml(s)}</option>`).join('');
}

function initial(name) {
  return (name || '?').trim().charAt(0).toUpperCase();
}
function hueFromString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

function formatSentDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    const isToday = d.toDateString() === today.toDateString();
    const isYesterday = d.toDateString() === yesterday.toDateString();
    const hm = d.toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'});
    if (isToday) return `hoy ${hm}`;
    if (isYesterday) return `ayer ${hm}`;
    return d.toLocaleDateString('es-ES', {day:'2-digit', month:'short'}) + ' ' + hm;
  } catch { return iso; }
}

function renderEmails() {
  const text = document.getElementById('inFilterText').value.toLowerCase();
  const ciudad = document.getElementById('inFilterCiudad').value;
  const sector = document.getElementById('inFilterSector').value;
  const estado = document.getElementById('inFilterEstado').value;
  const rows = allEmails.filter(r => {
    if (ciudad && r.ciudad !== ciudad) return false;
    if (sector && r.sector !== sector) return false;
    if (estado === 'pending' && r.sent) return false;
    if (estado === 'sent' && !r.sent) return false;
    if (text) {
      const hay = ((r.email||'')+' '+(r.nombre||'')+' '+(r.sector||'')).toLowerCase();
      if (!hay.includes(text)) return false;
    }
    return true;
  });
  // ordenar: pendientes primero, enviados al final (por fecha desc)
  rows.sort((a, b) => {
    if (a.sent !== b.sent) return a.sent ? 1 : -1;
    if (a.sent && b.sent) return (b.sent_at || '').localeCompare(a.sent_at || '');
    return 0;
  });

  const sentCount = rows.filter(r => r.sent).length;
  const pendingCount = rows.length - sentCount;
  document.getElementById('filterCount').textContent =
    `${pendingCount} pendiente${pendingCount===1?'':'s'} · ${sentCount} enviado${sentCount===1?'':'s'}`;

  const tbody = document.querySelector('#tblEmails tbody');
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <h3>Sin resultados</h3><p>Prueba a quitar filtros o lanza una nueva búsqueda.</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map((r, i) => {
    const hue = hueFromString(r.nombre || r.email);
    const avatarStyle = `background: linear-gradient(135deg, hsl(${hue},65%,55%), hsl(${(hue+30)%360},65%,45%))`;
    const webHost = (r.website||'').replace(/^https?:\/\//,'').replace(/\/$/,'').slice(0,30);
    const rowCls = r.sent ? 'sent-row' : '';
    const actionCell = r.sent
      ? `<div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end">
           <span class="sent-badge">
             <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
             ${escapeHtml(formatSentDate(r.sent_at))}
           </span>
           <button class="btn ghost small" onclick='unmarkSent(${JSON.stringify(r).replace(/'/g,"&#39;")}, this)' style="padding:2px 8px;font-size:10.5px">deshacer</button>
         </div>`
      : `<button class="btn small" onclick='makeDraft(${JSON.stringify(r).replace(/'/g,"&#39;")}, this)'>Crear borrador</button>`;
    return `
      <tr class="${rowCls}" data-email="${escapeAttr(r.email)}">
        <td>
          <div class="avatar" title="${escapeAttr(r.nombre||'')}" style="${avatarStyle}">${escapeHtml(initial(r.nombre))}</div>
        </td>
        <td>
          <div class="business-name">${escapeHtml(r.nombre||'(sin nombre)')}</div>
          <div class="email-cell" style="margin-top:3px">${escapeHtml(r.email)}</div>
        </td>
        <td><span class="pill">${escapeHtml(r.sector||'')}</span></td>
        <td style="color:var(--muted)">${escapeHtml(r.ciudad||'')}</td>
        <td class="web"><a href="${escapeAttr(r.website||'#')}" target="_blank">${escapeHtml(webHost)}</a></td>
        <td style="text-align:right">${actionCell}</td>
      </tr>
    `;
  }).join('');
}

['inFilterText', 'inFilterCiudad', 'inFilterSector', 'inFilterEstado'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderEmails);
  document.getElementById(id).addEventListener('change', renderEmails);
});

async function unmarkSent(r, btn) {
  if (!confirm(`¿Marcar "${r.nombre || r.email}" como NO enviado de nuevo?`)) return;
  try {
    await fetch('/api/sent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: r.email, action: 'unmark'}),
    });
    toast('Marcado como pendiente', 'ok');
    await loadEmails();  // recarga lista
  } catch (e) {
    toast('Error al deshacer: ' + e.message, 'err');
  }
}

async function makeDraft(r, btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<span style="display:inline-block;animation:spin 0.8s linear infinite;width:12px;height:12px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%"></span> Creando';
  btn.disabled = true;
  try {
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 30000); // 30s timeout
    const res = await fetch('/api/zoho/draft', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: r.email, nombre: r.nombre, ciudad: r.ciudad}),
      signal: ctrl.signal,
    }).then(x => { clearTimeout(timeoutId); return x.json(); });
    if (res.ok) {
      toast(`Borrador creado para ${r.nombre || r.email}`, 'ok');
      // Recargar la lista para que se marque como enviado
      await loadEmails();
      refreshStats();
    } else {
      btn.innerHTML = 'Error';
      btn.className = 'btn small err';
      toast(res.error || 'Error al crear borrador', 'err');
      setTimeout(() => { btn.innerHTML = orig; btn.className = 'btn small'; btn.disabled = false; }, 4000);
    }
  } catch (e) {
    btn.innerHTML = orig; btn.disabled = false;
    toast('Error al crear borrador: ' + e.message, 'err');
  }
}

// keyframes for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(styleSheet);

// ============ SEGUIMIENTO ============
let trackingData = { rows: [], counts: {}, labels: {} };
let trackingFilter = '';

async function loadTracking() {
  try {
    const r = await fetch('/api/tracking').then(x => x.json());
    trackingData = r;
    document.getElementById('nav-count-tracking').textContent = r.rows.length;
    // counts en funnel
    ['drafted','sent','replied_yes','replied_no','no_reply'].forEach(k => {
      const el = document.getElementById('fnl-' + k);
      if (el) el.textContent = r.counts[k] || 0;
    });
    // populate select
    const sel = document.getElementById('trkFilterStatus');
    const curr = sel.value;
    sel.innerHTML = '<option value="">Todos los estados</option>' +
      Object.entries(r.labels).map(([k, lbl]) =>
        `<option value="${k}" ${k===curr?'selected':''}>${escapeHtml(lbl)} (${r.counts[k]||0})</option>`
      ).join('');
    renderTracking();
  } catch (e) { console.error(e); }
}

function filterTracking(status) {
  document.getElementById('trkFilterStatus').value = status;
  document.querySelectorAll('.funnel-item').forEach(it => it.classList.remove('active'));
  const card = document.querySelector(`.funnel-item[data-status="${status}"]`);
  if (card) card.classList.add('active');
  // ir a la pestaña si no estamos
  const nav = document.querySelector('.nav-item[data-tab="seguimiento"]');
  if (nav && !nav.classList.contains('active')) nav.click();
  renderTracking();
}

function renderTracking() {
  const text = (document.getElementById('trkFilterText').value || '').toLowerCase();
  const status = document.getElementById('trkFilterStatus').value;
  let rows = trackingData.rows || [];
  if (status) rows = rows.filter(r => r.status === status);
  if (text) rows = rows.filter(r => ((r.email||'')+' '+(r.nombre||'')).toLowerCase().includes(text));

  document.getElementById('trkCount').textContent =
    `${rows.length} contacto${rows.length===1?'':'s'}`;

  const tbody = document.querySelector('#tblTracking tbody');
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4"><div class="empty">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>
      <h3>Nada que mostrar</h3>
      <p>Crea borradores desde "Base de datos" y aparecerán aquí.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(r => {
    const hue = hueFromString(r.nombre || r.email);
    const avatarStyle = `background: linear-gradient(135deg, hsl(${hue},65%,55%), hsl(${(hue+30)%360},65%,45%))`;
    const lbl = trackingData.labels[r.status] || r.status;
    return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            <div class="avatar" style="${avatarStyle}">${escapeHtml(initial(r.nombre))}</div>
            <div>
              <div class="business-name">${escapeHtml(r.nombre || '(sin nombre)')}</div>
              <div class="business-meta">${escapeHtml(formatSentDate(r.status_at))}</div>
            </div>
          </div>
        </td>
        <td class="email-cell">${escapeHtml(r.email)}</td>
        <td><span class="status-pill ${r.status}"><span class="dot-inner"></span>${escapeHtml(lbl)}</span></td>
        <td>
          <div class="status-actions">
            ${r.status !== 'sent' ? `<button class="btn set-sent" onclick="setStatus('${escapeAttr(r.email)}','sent')">Enviado</button>` : ''}
            ${r.status !== 'replied_yes' ? `<button class="btn set-yes" onclick="setStatus('${escapeAttr(r.email)}','replied_yes')">✓ Interesado</button>` : ''}
            ${r.status !== 'replied_no' ? `<button class="btn set-no" onclick="setStatus('${escapeAttr(r.email)}','replied_no')">✗ No interesado</button>` : ''}
            ${r.status !== 'no_reply' ? `<button class="btn set-noreply" onclick="setStatus('${escapeAttr(r.email)}','no_reply')">Sin respuesta</button>` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function setStatus(email, status) {
  try {
    const r = await fetch('/api/status', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, status}),
    }).then(x => x.json());
    if (r.ok) {
      toast(`Estado actualizado: ${trackingData.labels[status]}`, 'ok');
      await loadTracking();
      refreshStats();
    } else {
      toast('Error: ' + (r.error || 'desconocido'), 'err');
    }
  } catch (e) {
    toast('Error al cambiar estado: ' + e.message, 'err');
  }
}

['trkFilterText', 'trkFilterStatus'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderTracking);
  document.getElementById(id).addEventListener('change', () => {
    document.querySelectorAll('.funnel-item').forEach(it => it.classList.remove('active'));
    const v = document.getElementById('trkFilterStatus').value;
    if (v) {
      const card = document.querySelector(`.funnel-item[data-status="${v}"]`);
      if (card) card.classList.add('active');
    }
    renderTracking();
  });
});

// ----- Plantilla con auto-guardado -----
let tplDebounce = null;
let tplDirty = false;
const tplArea = document.getElementById('tplArea');
const tplDot = document.getElementById('tplStatusDot');
const tplText = document.getElementById('tplStatusText');

function setTplStatus(state, label) {
  // state: 'loading' | 'saved' | 'dirty' | 'saving' | 'error'
  const colors = {
    loading: { c: 'var(--muted)', s: 'none' },
    saved:   { c: 'var(--ok)',    s: '0 0 8px var(--ok)' },
    dirty:   { c: 'var(--warn)',  s: '0 0 8px var(--warn)' },
    saving:  { c: 'var(--sky)',   s: '0 0 8px var(--sky)' },
    error:   { c: 'var(--err)',   s: '0 0 8px var(--err)' },
  };
  const v = colors[state] || colors.loading;
  tplDot.style.background = v.c;
  tplDot.style.boxShadow = v.s;
  tplText.textContent = label;
}

async function loadTpl() {
  setTplStatus('loading', 'Cargando plantilla…');
  try {
    const r = await fetch('/api/template').then(r => r.json());
    tplArea.value = r.content;
    tplDirty = false;
    setTplStatus('saved', 'Guardado · plantilla actual');
  } catch (e) {
    setTplStatus('error', 'Error al cargar');
  }
}

async function saveTpl() {
  const content = tplArea.value;
  if (!content.trim()) {
    setTplStatus('error', 'La plantilla no puede estar vacía');
    return;
  }
  setTplStatus('saving', 'Guardando…');
  try {
    const res = await fetch('/api/template', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content}),
    }).then(r => r.json());
    if (res.ok) {
      tplDirty = false;
      const t = new Date().toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit', second:'2-digit'});
      setTplStatus('saved', `Guardado a las ${t}`);
    } else {
      setTplStatus('error', res.error || 'Error al guardar');
    }
  } catch (e) {
    setTplStatus('error', e.message);
  }
}

tplArea.addEventListener('input', () => {
  tplDirty = true;
  setTplStatus('dirty', 'Cambios sin guardar…');
  if (tplDebounce) clearTimeout(tplDebounce);
  tplDebounce = setTimeout(saveTpl, 1000);
});

// Ctrl+S guarda inmediato
tplArea.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    if (tplDebounce) { clearTimeout(tplDebounce); tplDebounce = null; }
    saveTpl();
  }
});

// Aviso si intenta cerrar con cambios sin guardar
window.addEventListener('beforeunload', (e) => {
  if (tplDirty) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// ----- Utils -----
function escapeHtml(s) {
  return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s) {
  return String(s||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// preload
loadEmails();
loadTracking();

</script>
</body>
</html>
"""


if __name__ == "__main__":
    port = 8765
    url = f"http://127.0.0.1:{port}"
    # abrir navegador 1.2s después de arrancar el server
    threading.Timer(1.2, lambda: webbrowser.open(url)).start()
    print(f"\n  Marsof Outreach Web --> {url}\n")
    app.run(host="127.0.0.1", port=port, debug=False, use_reloader=False, threaded=True)
