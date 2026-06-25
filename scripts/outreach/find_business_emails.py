"""
find_business_emails.py — Scraper generico de emails de negocios/autonomos por ciudad.

Para cada sector hardcoded (50+ sectores tipicos de pymes/autonomos):
  1. Busca en Startpage "{sector} {ciudad}"
  2. Recoge top 10 webs reales (descarta directorios)
  3. Visita cada web y extrae el email de contacto
  4. Dedupe por email y por dominio
  5. Guarda en CSV: email, nombre, sector, web, ciudad

Uso:
    python find_business_emails.py --ciudad "Huelva"
    python find_business_emails.py --ciudad "Sevilla" --sectores 30
    python find_business_emails.py --ciudad "Cadiz" --solo-sector "restaurante"
    python find_business_emails.py --ciudad "Malaga" --resume    # reanudar tras interrupcion

Tiempo aprox: 15-30 min por ciudad. Resultado: 200-800 emails unicos.
"""
from __future__ import annotations

import argparse
import csv
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse, urljoin, quote_plus
from datetime import datetime

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).parent

# Lista de sectores tipicos de autonomos y pymes
SECTORES = [
    # profesional
    "gestoria", "asesoria fiscal", "asesoria laboral", "abogado", "notaria", "arquitecto",
    "ingeniero", "consultora", "agencia marketing", "agencia inmobiliaria",
    # hosteleria y comercio
    "restaurante", "cafeteria", "bar de tapas", "panaderia", "pasteleria", "heladeria",
    "tienda de ropa", "zapateria", "tienda muebles", "ferreteria", "floristeria",
    "joyeria", "tienda regalos", "supermercado", "fruteria", "carniceria", "pescaderia",
    # automocion
    "taller mecanico", "concesionario", "chapa y pintura", "neumaticos", "autoescuela",
    # construccion y oficios
    "fontanero", "electricista", "carpinteria", "cerrajeria", "pintor", "albanil",
    "constructora", "reformas", "climatizacion",
    # salud y belleza
    "peluqueria", "barberia", "centro estetica", "clinica dental", "fisioterapia",
    "clinica veterinaria", "optica", "farmacia", "psicologo",
    # servicios
    "imprenta", "tintoreria", "lavanderia", "limpieza", "academia ingles",
    "guarderia", "tienda informatica", "tienda telefonia movil",
    "transporte", "mensajeria", "mudanzas",
]

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
HEADERS = {"User-Agent": UA, "Accept-Language": "es-ES,es;q=0.9", "Accept": "text/html,application/xhtml+xml"}

EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")

BLOCKLIST_EMAIL_HINTS = (
    "noreply", "no-reply", "no.reply", "donotreply",
    "abuse@", "postmaster@", "webmaster@", "hostmaster@",
    "wordpress@", "wp@", "sentry@", "@sentry",
    "example.com", "example.es", "tu-email", "tuemail",
    "ejemplo@", "demo@", "test@", "u003e", "u003c",
    "@2x.", "@3x.", ".png", ".jpg", ".jpeg", ".gif", ".webp",
    "sentry.io", "wixpress", "wix.com", ".cloudfront",
    # ROT13 (ofuscación común): .com → .pbz, .es → .rf
    ".pbz", ".rf", ".bet", ".arg",
)

SKIP_DOMAINS = (
    "google.", "facebook.", "linkedin.", "instagram.", "twitter.", "x.com",
    "youtube.", "tiktok.", "pinterest.", "yelp.", "tripadvisor.",
    "duckduckgo.", "bing.", "wikipedia.", "startpage.",
    "amarillas.", "paginasamarillas.", "expansion.", "einforma.",
    "infoempresa.", "axesor.", "elempresario.", "ranker.", "trustpilot.",
    "infocif", "infoautonomos.", "empresia.", "empresite.",
    "informacion-empresas", "guia-empresas", "empresascancen", "datoscif",
    "rankia.", "anibal.com", "boe.es", "agenciatributaria.", "redaccionmedica.",
    "gestorias.es", "gestorias.com", "directorio", "asesorias.com",
    "asesorlex.", "holded.", "milanuncios.", "vibbo.", "wallapop.",
    "trovit.", "iberinform.", "informa.es", "dipublico.", "empresasenred.",
    "qdq.com", "qdqmedia", "11870.", "elgremio.", "habitissimo.",
    "manomano.", "bbvauni.", "amazon.", "ebay.",
    "rincondelvago.", "blogspot.", "wordpress.com", "wixsite.",
    "negocios10.", "businesspages.", "europagedirectory.", "europages.",
)


def is_real_email(email: str) -> bool:
    e = email.lower().strip()
    if any(bad in e for bad in BLOCKLIST_EMAIL_HINTS):
        return False
    if not re.search(r"\.[a-z]{2,6}$", e):
        return False
    # tiene que tener algun sentido (no super corto)
    if len(e) < 6 or "@" not in e:
        return False
    return True


def fetch(url: str, timeout: int = 10) -> str | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        if r.status_code == 200:
            return r.text
    except Exception:
        pass
    return None


def search_startpage(query: str, limit: int = 12) -> list[str]:
    url = f"https://www.startpage.com/sp/search?query={quote_plus(query)}"
    html = fetch(url, timeout=15)
    if not html:
        return []
    soup = BeautifulSoup(html, "lxml")
    results = []
    for a in soup.select("a.result-link")[:25]:
        href = a.get("href", "")
        if not href.startswith("http"):
            continue
        host = urlparse(href).netloc.lower()
        if any(s in host for s in SKIP_DOMAINS):
            continue
        # filtrar paths que claramente no son la home (review de articulos, etc.)
        path = urlparse(href).path
        if any(seg in path.lower() for seg in ("/blog/", "/articulo", "/noticias/", "/review")):
            continue
        results.append(href)
        if len(results) >= limit:
            break
    return results


def extract_emails(html: str) -> list[str]:
    if not html:
        return []
    text = html.replace("[at]", "@").replace(" at ", "@").replace("(at)", "@").replace("%40", "@")
    cands = set(EMAIL_RE.findall(text))
    try:
        soup = BeautifulSoup(html, "lxml")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if href.lower().startswith("mailto:"):
                em = href.split(":", 1)[1].split("?")[0].strip()
                cands.add(em)
    except Exception:
        pass
    return [e for e in cands if is_real_email(e)]


def extract_business_name(html: str, fallback_host: str) -> str:
    """Intenta sacar el nombre del negocio del <title> o meta og:title."""
    if not html:
        return fallback_host
    try:
        soup = BeautifulSoup(html, "lxml")
        og = soup.find("meta", attrs={"property": "og:site_name"})
        if og and og.get("content"):
            return og["content"].strip()[:80]
        og = soup.find("meta", attrs={"property": "og:title"})
        if og and og.get("content"):
            return og["content"].strip()[:80]
        if soup.title and soup.title.string:
            t = soup.title.string.strip()
            # cortar separadores comunes
            for sep in (" | ", " - ", " · ", " — "):
                if sep in t:
                    t = t.split(sep)[0]
            return t.strip()[:80]
    except Exception:
        pass
    return fallback_host


def find_email_on_website(base_url: str) -> tuple[str | None, str | None]:
    paths = ["", "/contacto", "/contact", "/contactar", "/contactanos",
             "/contacto.html", "/aviso-legal", "/avisolegal", "/legal",
             "/quienes-somos", "/sobre-nosotros", "/empresa"]
    for path in paths:
        url = urljoin(base_url, path) if path else base_url
        html = fetch(url)
        if not html:
            continue
        emails = extract_emails(html)
        if emails:
            host = urlparse(base_url).netloc.replace("www.", "")
            same = [e for e in emails if host and host.lower() in e.lower()]
            chosen = None
            for prefix in ("info@", "contacto@", "hola@", "administracion@", "admin@", "comercial@", "ventas@"):
                for e in (same or emails):
                    if e.lower().startswith(prefix):
                        chosen = e
                        break
                if chosen:
                    break
            if not chosen:
                chosen = (same or emails)[0]
            return chosen, url
        time.sleep(0.2)
    return None, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--ciudad", required=True, help='Ciudad/zona, ej: "Huelva", "Sevilla", "Huelva y pueblos"')
    parser.add_argument("--sectores", type=int, default=len(SECTORES), help="Limitar a N primeros sectores")
    parser.add_argument("--solo-sector", default=None, help="Solo buscar este sector (ignora la lista)")
    parser.add_argument("--limite-por-sector", type=int, default=10, help="Webs candidatas por sector")
    parser.add_argument("--delay-search", type=float, default=1.5)
    parser.add_argument("--delay-fetch", type=float, default=0.7)
    parser.add_argument("--resume", action="store_true", help="Reanudar; no reprocesar webs ya visitadas")
    args = parser.parse_args()

    ciudad_slug = re.sub(r"[^a-z0-9]+", "_", args.ciudad.lower()).strip("_")
    fecha = datetime.now().strftime("%Y-%m-%d")
    output = ROOT / f"emails_{ciudad_slug}_{fecha}.csv"

    # cargar progreso previo si --resume
    seen_websites: set[str] = set()
    seen_emails: set[str] = set()
    rows_existentes: list[dict] = []
    if args.resume and output.exists():
        with output.open(encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                rows_existentes.append(row)
                if row.get("website"):
                    seen_websites.add(urlparse(row["website"]).netloc.lower())
                if row.get("email"):
                    seen_emails.add(row["email"].lower())
        print(f"Reanudando: {len(rows_existentes)} emails ya recogidos")

    sectores_a_usar = [args.solo_sector] if args.solo_sector else SECTORES[:args.sectores]

    results = list(rows_existentes)
    total_sectores = len(sectores_a_usar)
    print(f"\nBuscando en {total_sectores} sectores x {args.limite_por_sector} webs/sector")
    print(f"Output: {output}\n")

    for si, sector in enumerate(sectores_a_usar, 1):
        query = f"{sector} {args.ciudad}"
        print(f"[{si:02d}/{total_sectores}] {query}")

        urls = search_startpage(query, limit=args.limite_por_sector)
        if not urls:
            print(f"    sin resultados")
            time.sleep(args.delay_search)
            continue

        nuevos = 0
        for url in urls:
            host = urlparse(url).netloc.lower()
            if host in seen_websites:
                continue
            seen_websites.add(host)

            try:
                # primero fetch homepage para tener HTML y poder sacar nombre
                home_html = fetch(url)
                if not home_html:
                    continue
                # email
                emails = extract_emails(home_html)
                if not emails:
                    # probar paginas de contacto
                    em, src_url = find_email_on_website(url)
                    if not em:
                        continue
                    chosen = em
                else:
                    # priorizar info@, contacto@
                    chosen = emails[0]
                    for prefix in ("info@", "contacto@", "hola@", "admin@", "administracion@"):
                        for e in emails:
                            if e.lower().startswith(prefix):
                                chosen = e
                                break
                        if chosen.lower().startswith(prefix):
                            break

                if chosen.lower() in seen_emails:
                    continue
                seen_emails.add(chosen.lower())

                name = extract_business_name(home_html, host)
                results.append({
                    "email": chosen,
                    "nombre": name,
                    "sector": sector,
                    "website": url,
                    "ciudad": args.ciudad,
                    "fecha": fecha,
                })
                nuevos += 1
                print(f"    OK  {chosen}  ({name[:40]})")
            except Exception as e:
                print(f"    err {host}: {e}")
            time.sleep(args.delay_fetch)

        # guardar progreso cada sector
        with output.open("w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=["email", "nombre", "sector", "website", "ciudad", "fecha"],
                                     quoting=csv.QUOTE_ALL)
            writer.writeheader()
            writer.writerows(results)

        print(f"    sector: +{nuevos} nuevos. Total: {len(results)}")
        time.sleep(args.delay_search)

    print(f"\n--- RESUMEN ---")
    print(f"Emails totales encontrados: {len(results)}")
    print(f"CSV: {output}")
    print(f"\nAbrir con Excel:  start \"\" \"{output}\"")


if __name__ == "__main__":
    main()
