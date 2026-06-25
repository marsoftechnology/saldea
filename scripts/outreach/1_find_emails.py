"""
1_find_emails.py — Encuentra email + website de cada gestoría.

Para cada gestoría en gestorias.csv que NO tenga email:
  1. Si no tiene website, busca en DuckDuckGo "<nombre> gestoría email contacto"
  2. Fetch el website (homepage + /contacto + /contact)
  3. Extrae el primer email válido con regex (ignora info-no-reply, abuse@, etc.)
  4. Actualiza el CSV in-place

Uso:
    python 1_find_emails.py            # procesa solo filas sin email
    python 1_find_emails.py --all      # re-procesa todas (sobrescribe)
    python 1_find_emails.py --limit 5  # solo las primeras 5 sin email
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse, urljoin, quote_plus

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).parent
CSV_PATH = ROOT / "gestorias.csv"

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
HEADERS = {"User-Agent": UA, "Accept-Language": "es-ES,es;q=0.9,en;q=0.8"}

EMAIL_RE = re.compile(
    r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}",
)

# Emails que descartamos (no son contactos reales)
BLOCKLIST = (
    "noreply", "no-reply", "no.reply", "donotreply",
    "abuse@", "postmaster@", "webmaster@", "hostmaster@",
    "wordpress@", "wp@", "sentry@", "@sentry",
    "example.com", "example.es", "tu-email", "tuemail",
    "ejemplo@", "demo@", "test@",
    ".png", ".jpg", ".jpeg", ".gif", ".webp",  # falsos positivos del regex en filenames
    "@2x.", "@3x.",
    "sentry.io", "wixpress", "wix.com", ".cloudfront", ".sentry",
    "u003e", "u003c",
)


def is_real_email(email: str) -> bool:
    e = email.lower()
    if any(bad in e for bad in BLOCKLIST):
        return False
    # debe tener dominio con TLD plausible
    if not re.search(r"\.[a-z]{2,6}$", e):
        return False
    return True


def fetch(url: str, timeout: int = 12) -> str | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        if r.status_code == 200 and r.text:
            return r.text
    except requests.RequestException:
        pass
    return None


SKIP_DOMAINS = (
    # redes sociales
    "google.", "facebook.", "linkedin.", "instagram.", "twitter.", "x.com",
    "youtube.", "tiktok.", "pinterest.", "yelp.", "tripadvisor.",
    # buscadores y enciclopedias
    "duckduckgo.", "bing.", "wikipedia.", "startpage",
    # directorios de empresas / agregadores
    "amarillas.", "paginasamarillas.", "expansion.", "einforma.",
    "infoempresa.", "axesor.", "elempresario.", "ranker.", "trustpilot.",
    "infocif", "infoautonomos.", "empresia.", "empresite.",
    "informacion-empresas", "guia-empresas", "empresascancen", "datoscif",
    "rankia.", "anibal.com", "boe.es", "agenciatributaria.", "redaccionmedica.",
    "gestorias.es", "gestorias.com", "gestoriasaldea", "directorio",
    "asesorias.com", "asesorias.org", "asesorlex.",
    # SaaS / directorios que listan gestorías
    "holded.", "anfix.", "sage.com", "asesorlex", "factufacil",
    "iberinform", "informa.es", "dipublico", "empresasenred",
    # marketplaces y reviews
    "milanuncios.", "vibbo.", "wallapop.", "trovit.",
)


def find_website_via_startpage(name: str, city: str) -> str | None:
    """Busca el sitio web oficial usando Startpage (proxy de Google sin bloqueo)."""
    q = f"{name} {city} gestoria"
    url = f"https://www.startpage.com/sp/search?query={quote_plus(q)}"
    html = fetch(url)
    if not html:
        return None
    soup = BeautifulSoup(html, "lxml")
    for a in soup.select("a.result-link")[:10]:
        href = a.get("href", "")
        if not href.startswith("http"):
            continue
        host = urlparse(href).netloc.lower()
        if any(s in host for s in SKIP_DOMAINS):
            continue
        return href
    return None


def extract_emails_from_html(html: str) -> list[str]:
    if not html:
        return []
    # decodificar entidades comunes que ocultan emails (mailto:carlos%40)
    text = html.replace("[at]", "@").replace(" at ", "@").replace("(at)", "@")
    text = text.replace("%40", "@")
    candidates = set(EMAIL_RE.findall(text))
    # también mirar atributos href mailto:
    soup = BeautifulSoup(html, "lxml")
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.lower().startswith("mailto:"):
            email = href.split(":", 1)[1].split("?")[0].strip()
            candidates.add(email)
    return [e for e in candidates if is_real_email(e)]


def find_email_on_website(base_url: str) -> tuple[str | None, str | None]:
    """Busca email en homepage y páginas típicas de contacto. Devuelve (email, url_donde_se_encontro)."""
    if not base_url:
        return None, None
    paths_to_try = ["", "/contacto", "/contact", "/contactar", "/contactanos",
                    "/contacto.html", "/contacto.php", "/aviso-legal", "/avisolegal",
                    "/legal", "/quienes-somos"]

    for path in paths_to_try:
        url = urljoin(base_url, path) if path else base_url
        html = fetch(url)
        if not html:
            continue
        emails = extract_emails_from_html(html)
        if emails:
            # preferir info@dominio o contacto@dominio sobre otros
            host = urlparse(base_url).netloc.replace("www.", "")
            same_domain = [e for e in emails if host and host in e.lower()]
            if same_domain:
                # priorizar info@/contacto@/hola@
                for prefix in ("info@", "contacto@", "hola@", "administracion@", "gestoria@", "asesoria@"):
                    for e in same_domain:
                        if e.lower().startswith(prefix):
                            return e, url
                return same_domain[0], url
            return emails[0], url
        time.sleep(0.4)
    return None, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Re-procesar todas las filas")
    parser.add_argument("--limit", type=int, default=None, help="Procesar solo N filas")
    parser.add_argument("--delay", type=float, default=1.2, help="Segundos entre gestorías")
    args = parser.parse_args()

    if not CSV_PATH.exists():
        sys.exit(f"No encuentro {CSV_PATH}")

    # leer
    with CSV_PATH.open(encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = list(reader.fieldnames or [])
    # eliminar campo None (cuando un row tiene más comas que cabeceras)
    for r in rows:
        r.pop(None, None)

    procesadas = 0
    encontradas = 0
    for i, row in enumerate(rows, start=1):
        if args.limit and procesadas >= args.limit:
            break
        if row.get("email") and not args.all:
            continue

        name = row["name"]
        city = row.get("city", "")
        print(f"\n[{i}/{len(rows)}] {name} ({city})")

        website = row.get("website") or ""
        if not website:
            print("  Buscando website en Startpage...")
            website = find_website_via_startpage(name, city) or ""
            if website:
                print(f"  -> {website}")
                row["website"] = website
            else:
                print("  -> sin website encontrado")

        if website:
            print("  Buscando email en el sitio...")
            email, source_url = find_email_on_website(website)
            if email:
                print(f"  EMAIL: {email}  (en {source_url})")
                row["email"] = email
                if source_url and source_url != website:
                    row["notes"] = f"email en {source_url}"
                encontradas += 1
            else:
                print("  -> sin email visible en web")
                row["notes"] = "no email en web - probar formulario o tel"

        procesadas += 1
        time.sleep(args.delay)

    # escribir con QUOTE_ALL para evitar problemas con comas/comillas en URLs
    with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(rows)

    print(f"\n--- Resumen ---")
    print(f"Procesadas: {procesadas}")
    print(f"Emails encontrados: {encontradas}")
    print(f"CSV actualizado: {CSV_PATH}")


if __name__ == "__main__":
    main()
