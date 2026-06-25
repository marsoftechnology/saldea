"""
buscar_nuevas_gestorias.py
Busca emails de gestorías y asesorías en las principales ciudades de España.
Excluye los emails ya existentes en la lista actual de Zoho (Gestorías Huelva - Saldea).
"""
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

CIUDADES = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Málaga",
    "Bilbao",
    "Zaragoza",
    "Murcia",
    "Alicante",
    "Valladolid",
]

SECTORES = ["gestoria", "asesoria fiscal", "asesoria laboral", "asesoria contable"]

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
HEADERS = {"User-Agent": UA, "Accept-Language": "es-ES,es;q=0.9", "Accept": "text/html,application/xhtml+xml"}
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")

BLOCKLIST = (
    "noreply", "no-reply", "no.reply", "donotreply",
    "abuse@", "postmaster@", "webmaster@", "hostmaster@",
    "wordpress@", "wp@", "sentry@", "@sentry",
    "example.com", "example.es", "tu-email", "demo@", "test@",
    ".png", ".jpg", ".jpeg", ".gif", "@2x.", "@3x.",
    "sentry.io", "wixpress", "wix.com", ".cloudfront",
    "u003e", "u003c",
)

SKIP_DOMAINS = (
    "google.", "facebook.", "linkedin.", "instagram.", "twitter.", "x.com",
    "youtube.", "tiktok.", "yelp.", "tripadvisor.", "duckduckgo.", "bing.",
    "wikipedia.", "startpage.", "amarillas.", "paginasamarillas.", "expansion.",
    "einforma.", "infoempresa.", "axesor.", "infocif", "infoautonomos.",
    "empresia.", "empresite.", "gestorias.es", "gestorias.com", "directorio",
    "asesorias.com", "asesorlex.", "holded.", "milanuncios.", "wallapop.",
    "iberinform.", "informa.es", "qdq.com", "11870.", "elgremio.", "habitissimo.",
    "amazon.", "ebay.", "blogspot.", "wordpress.com", "wixsite.",
    "agenciatributaria.", "boe.es", "seg-social.", "minhafp.",
    "aeat.es", "map.es", "minhac.es",
)


def is_real_email(email: str) -> bool:
    e = email.lower().strip()
    if any(bad in e for bad in BLOCKLIST):
        return False
    if not re.search(r"\.[a-z]{2,6}$", e):
        return False
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


def search_startpage(query: str, limit: int = 10) -> list[str]:
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


def extract_name(html: str, fallback: str) -> str:
    if not html:
        return fallback
    try:
        soup = BeautifulSoup(html, "lxml")
        for attr in [("property", "og:site_name"), ("property", "og:title")]:
            tag = soup.find("meta", attrs={attr[0]: attr[1]})
            if tag and tag.get("content"):
                return tag["content"].strip()[:80]
        if soup.title and soup.title.string:
            t = soup.title.string.strip()
            for sep in (" | ", " - ", " · ", " — "):
                if sep in t:
                    t = t.split(sep)[0]
            return t.strip()[:80]
    except Exception:
        pass
    return fallback


def find_email_on_site(base_url: str) -> tuple[str | None, str | None]:
    paths = ["", "/contacto", "/contact", "/contactar", "/aviso-legal", "/quienes-somos"]
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
            for prefix in ("info@", "contacto@", "hola@", "admin@", "gestoria@", "asesoria@"):
                for e in (same or emails):
                    if e.lower().startswith(prefix):
                        chosen = e
                        break
                if chosen:
                    break
            if not chosen:
                chosen = (same or emails)[0]
            return chosen, url
        time.sleep(0.3)
    return None, None


def load_existing_emails() -> set[str]:
    """Carga todos los emails ya conocidos para no duplicar."""
    known = set()
    for csv_file in ROOT.glob("emails_*.csv"):
        try:
            with csv_file.open(encoding="utf-8", newline="") as f:
                for row in csv.DictReader(f):
                    if row.get("email"):
                        known.add(row["email"].lower())
        except Exception:
            pass
    if (ROOT / "gestorias.csv").exists():
        with (ROOT / "gestorias.csv").open(encoding="utf-8", newline="") as f:
            for row in csv.DictReader(f):
                if row.get("email"):
                    known.add(row["email"].lower())
    print(f"[info] {len(known)} emails ya existentes — se excluirán duplicados")
    return known


def main():
    fecha = datetime.now().strftime("%Y-%m-%d")
    output = ROOT / f"gestorias_nuevas_{fecha}.csv"

    existing = load_existing_emails()
    seen_websites: set[str] = set()
    seen_emails: set[str] = set(existing)
    results: list[dict] = []

    TARGET = 350  # buscamos algo más de 299 para tener margen

    fieldnames = ["email", "nombre", "sector", "website", "ciudad", "fecha"]
    with output.open("w", encoding="utf-8", newline="") as f:
        csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL).writeheader()

    print(f"\n{'='*60}")
    print(f"BUSCANDO NUEVAS GESTORÍAS — TARGET: {TARGET} contactos")
    print(f"Output: {output}")
    print(f"{'='*60}\n")

    for ciudad in CIUDADES:
        if len(results) >= TARGET:
            print(f"\n✓ TARGET alcanzado ({len(results)} contactos). Parando.")
            break

        print(f"\n--- {ciudad} ---")
        for sector in SECTORES:
            if len(results) >= TARGET:
                break

            query = f"{sector} {ciudad}"
            print(f"  [{len(results):>3} total] buscando: {query}")
            urls = search_startpage(query, limit=10)
            if not urls:
                time.sleep(1.5)
                continue

            for url in urls:
                if len(results) >= TARGET:
                    break
                host = urlparse(url).netloc.lower()
                if host in seen_websites:
                    continue
                seen_websites.add(host)

                try:
                    home_html = fetch(url)
                    if not home_html:
                        continue

                    emails = extract_emails(home_html)
                    if not emails:
                        em, _ = find_email_on_site(url)
                        if not em:
                            continue
                        chosen = em
                    else:
                        chosen = emails[0]
                        for prefix in ("info@", "contacto@", "hola@", "gestoria@", "asesoria@"):
                            for e in emails:
                                if e.lower().startswith(prefix):
                                    chosen = e
                                    break
                            if chosen.lower().startswith(prefix):
                                break

                    if chosen.lower() in seen_emails:
                        continue
                    seen_emails.add(chosen.lower())

                    name = extract_name(home_html, host)
                    row = {
                        "email": chosen,
                        "nombre": name,
                        "sector": sector,
                        "website": url,
                        "ciudad": ciudad,
                        "fecha": fecha,
                    }
                    results.append(row)
                    print(f"    ✓ {chosen}  ({name[:45]})")

                except Exception as e:
                    pass
                time.sleep(0.7)

            time.sleep(1.5)

    # Guardar todo de una vez al final
    with open(str(output), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(results)

    print(f"\n{'='*60}")
    print(f"TOTAL NUEVOS CONTACTOS: {len(results)}")
    print(f"CSV guardado: {output}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
