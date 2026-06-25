"""
2_create_dashboard.py — Dashboard HTML con los 20 emails listos para enviar.

Como el hash `#compose?to=...` de Zoho NO procesa query params, el flujo es:
  1. Pulsas "Preparar envío" en una tarjeta
  2. Se copia el cuerpo al portapapeles
  3. Se abre Zoho compose en nueva pestaña
  4. En Zoho: pegas el TO, asunto y body (con botones de copia individuales)

Uso:
    python 2_create_dashboard.py
    # abre outreach-dashboard.html
"""
from __future__ import annotations

import csv
import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).parent
CSV_PATH = ROOT / "gestorias.csv"
TEMPLATE_PATH = ROOT / "template.txt"
OUTPUT = ROOT / "outreach-dashboard.html"

ZOHO_FROM = "carlosgc@marsof.es"
ZOHO_COMPOSE_URL = "https://mail.zoho.eu/zm/#mail/compose"


def load_template() -> tuple[str, str]:
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
    return subject, "\n".join(body_lines).lstrip("\n")


def personalize(template: str, row: dict) -> str:
    out = template
    for k, v in row.items():
        if k:
            out = out.replace("{" + k.upper() + "}", v or "")
    return out


def main():
    if not CSV_PATH.exists():
        sys.exit(f"Falta {CSV_PATH}")

    subject_tpl, body_tpl = load_template()

    with CSV_PATH.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    rows = [r for r in rows if (r.get("email") or "").strip()]

    # Construir array JSON con datos para JS
    items = []
    for i, r in enumerate(rows, 1):
        items.append({
            "idx": i,
            "name": r["name"],
            "city": r.get("city", ""),
            "email": r["email"].strip(),
            "subject": personalize(subject_tpl, r),
            "body": personalize(body_tpl, r),
        })

    items_json = json.dumps(items, ensure_ascii=False)

    grouped = {}
    for it in items:
        grouped.setdefault(it["city"], 0)
        grouped[it["city"]] += 1
    summary_chips = " · ".join(f"{c}: {n}" for c, n in grouped.items())

    html_doc = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Outreach gestorias - Marsof</title>
<style>
  * {{ box-sizing: border-box; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: #0a0a0b; color: #e4e4e7; max-width: 1100px; margin: 0 auto; padding: 28px 22px; }}
  h1 {{ font-size: 26px; margin: 0 0 4px; }}
  .sub {{ color: #a1a1aa; margin-bottom: 8px; font-size: 14px; }}
  .summary {{ background: #18181b; padding: 14px 18px; border-radius: 10px; margin-bottom: 22px;
              border-left: 3px solid #0ea5e9; font-size: 14px; }}
  .progress {{ height: 6px; background: #27272a; border-radius: 3px; overflow: hidden; margin-top: 12px; }}
  .progress-bar {{ height: 100%; background: #10b981; transition: width 0.3s; width: 0%; }}
  .stats {{ display: flex; gap: 18px; margin-top: 10px; font-size: 13px; color: #a1a1aa; }}
  .reset {{ margin-left: auto; font-size: 11px; color: #71717a; background: none; border: 1px solid #3f3f46;
            padding: 4px 10px; border-radius: 6px; cursor: pointer; }}
  .reset:hover {{ color: #fafafa; }}

  .howto {{ background: #082f49; border: 1px solid #075985; padding: 14px 18px; border-radius: 10px;
            margin-bottom: 22px; font-size: 13.5px; line-height: 1.6; }}
  .howto strong {{ color: #7dd3fc; }}
  .howto ol {{ margin: 6px 0 0 18px; padding: 0; }}

  .warning {{ background: #422006; border: 1px solid #ca8a04; color: #fef3c7;
               padding: 12px 18px; border-radius: 10px; margin-bottom: 18px; font-size: 13.5px; }}

  .card {{ background: #18181b; border: 1px solid #27272a; border-radius: 12px;
            padding: 16px 18px; margin-bottom: 10px; transition: all 0.2s; }}
  .card.sent {{ opacity: 0.5; border-color: #10b981; background: #052e1d; }}
  .card.sent .name::after {{ content: " · ✓ enviado"; color: #10b981; font-weight: normal; font-size: 13px; }}
  .card.expanded {{ background: #18181b !important; opacity: 1 !important; }}
  .head {{ display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }}
  .num {{ font-size: 11px; color: #71717a; font-variant-numeric: tabular-nums; }}
  .name {{ font-size: 16px; font-weight: 600; color: #fafafa; }}
  .meta {{ font-size: 12.5px; color: #a1a1aa; }}
  .meta a {{ color: #38bdf8; text-decoration: none; }}
  .btn {{ display: inline-block; padding: 7px 13px; border-radius: 7px; font-size: 13px; font-weight: 500;
          text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; white-space: nowrap; }}
  .btn.primary {{ background: #0ea5e9; color: #0a0a0b; }}
  .btn.primary:hover {{ background: #38bdf8; }}
  .btn.ghost {{ background: transparent; color: #a1a1aa; border-color: #3f3f46; font-size: 12px; padding: 5px 9px; }}
  .btn.ghost:hover {{ color: #fafafa; border-color: #71717a; }}
  .btn.small {{ font-size: 11px; padding: 3px 8px; }}

  .detail {{ display: none; margin-top: 14px; padding-top: 14px; border-top: 1px solid #27272a; }}
  .card.open .detail {{ display: block; }}
  .field {{ margin-bottom: 12px; }}
  .label {{ font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;
            margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }}
  .value-box {{ background: #0a0a0b; padding: 10px 12px; border-radius: 6px; border: 1px solid #27272a;
                font-family: ui-monospace, "Cascadia Code", monospace; font-size: 12.5px; color: #d4d4d8;
                white-space: pre-wrap; max-height: 280px; overflow-y: auto; line-height: 1.5;
                cursor: pointer; transition: border-color 0.15s; }}
  .value-box:hover {{ border-color: #3f3f46; }}
  .value-box.copied {{ border-color: #10b981; }}
  .copyhint {{ color: #10b981; font-size: 10.5px; opacity: 0; transition: opacity 0.15s; }}
  .copyhint.show {{ opacity: 1; }}
  .footer-actions {{ display: flex; gap: 8px; align-items: center; margin-top: 4px; }}
</style>
</head>
<body>
  <h1>Outreach gestorías</h1>
  <p class="sub">Marsof Technology · primer cliente B2B · desde {ZOHO_FROM}</p>

  <div class="summary">
    <strong>{len(items)}</strong> gestorías listas · {summary_chips}
    <div class="stats">
      <span><b id="sentCount">0</b> enviadas</span>
      <span><b>{len(items)}</b> total</span>
      <button class="reset" onclick="resetAll()">reset progreso</button>
    </div>
    <div class="progress"><div class="progress-bar" id="pBar"></div></div>
  </div>

  <div class="howto">
    <strong>Cómo usar (3 pasos por email)</strong>
    <ol>
      <li>Click <strong>"Preparar envío"</strong> en una tarjeta — se abre Zoho compose y el cuerpo se copia al portapapeles automáticamente.</li>
      <li>En Zoho: pega el <strong>email</strong> en "Para" (botón copia abajo), pega el <strong>asunto</strong> en "Asunto", el <strong>cuerpo</strong> ya está copiado → Ctrl+V en el cuerpo.</li>
      <li>Revisa, personaliza 1 frase, envía. Vuelve aquí y marca como enviado.</li>
    </ol>
  </div>

  <div class="warning">
    ⚠️ <strong>Máximo 8 envíos al día.</strong> Tu dominio tiene &lt;1 mes, 24 emails idénticos te marcan spam.
    <strong>Personaliza 1 frase por email</strong> (cita algo de su web o cambia el saludo).
  </div>

  <div id="cards"></div>

<script>
const DATA = {items_json};
const KEY = 'outreach-sent-v2';
const ZOHO_COMPOSE = "{ZOHO_COMPOSE_URL}";

function getSent() {{ try {{ return JSON.parse(localStorage.getItem(KEY) || '[]'); }} catch {{ return []; }} }}
function setSent(arr) {{ localStorage.setItem(KEY, JSON.stringify(arr)); render(); }}
function markSent(idx) {{
  const s = getSent();
  if (!s.includes(idx)) s.push(idx);
  setSent(s);
}}
function unmark(idx) {{
  setSent(getSent().filter(x => x !== idx));
}}
function resetAll() {{ if (confirm('Reset todas?')) setSent([]); }}

async function copyText(text, el) {{
  try {{
    await navigator.clipboard.writeText(text);
    if (el) {{
      el.classList.add('copied');
      const hint = el.parentElement.querySelector('.copyhint');
      if (hint) hint.classList.add('show');
      setTimeout(() => {{
        el.classList.remove('copied');
        if (hint) hint.classList.remove('show');
      }}, 1500);
    }}
    return true;
  }} catch (e) {{
    alert('No pude copiar al portapapeles: ' + e.message);
    return false;
  }}
}}

async function prepararEnvio(idx) {{
  const item = DATA.find(x => x.idx === idx);
  if (!item) return;
  // 1. copiar el body al portapapeles
  await navigator.clipboard.writeText(item.body);
  // 2. abrir Zoho compose (vacío) en nueva pestaña
  window.open(ZOHO_COMPOSE, '_blank');
  // 3. expandir la tarjeta para mostrar los campos copiables
  const card = document.querySelector(`.card[data-idx="${{idx}}"]`);
  if (card) card.classList.add('open');
}}

function toggleCard(idx) {{
  const card = document.querySelector(`.card[data-idx="${{idx}}"]`);
  if (card) card.classList.toggle('open');
}}

function render() {{
  const sent = getSent();
  const container = document.getElementById('cards');
  container.innerHTML = DATA.map(it => {{
    const isSent = sent.includes(it.idx);
    return `
      <div class="card ${{isSent ? 'sent' : ''}}" data-idx="${{it.idx}}">
        <div class="head">
          <div>
            <div class="num">#${{String(it.idx).padStart(2,'0')}}</div>
            <div class="name">${{escapeHtml(it.name)}}</div>
            <div class="meta">${{escapeHtml(it.city)}} · ${{escapeHtml(it.email)}}</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <button class="btn ghost small" onclick="toggleCard(${{it.idx}})">ver detalles</button>
            <button class="btn primary" onclick="prepararEnvio(${{it.idx}})">Preparar envío →</button>
            ${{isSent
              ? `<button class="btn ghost small" onclick="unmark(${{it.idx}})">deshacer</button>`
              : `<button class="btn ghost small" onclick="markSent(${{it.idx}})">marcar enviado</button>`}}
          </div>
        </div>

        <div class="detail">
          <div class="field">
            <div class="label">
              Para
              <span class="copyhint">✓ copiado</span>
            </div>
            <div class="value-box" onclick="copyText('${{escapeAttr(it.email)}}', this)">${{escapeHtml(it.email)}}</div>
          </div>
          <div class="field">
            <div class="label">
              Asunto
              <span class="copyhint">✓ copiado</span>
            </div>
            <div class="value-box" onclick="copyText(this.dataset.value, this)" data-value="${{escapeAttr(it.subject)}}">${{escapeHtml(it.subject)}}</div>
          </div>
          <div class="field">
            <div class="label">
              Cuerpo del email (ya está copiado al pulsar "Preparar envío", o haz click aquí)
              <span class="copyhint">✓ copiado</span>
            </div>
            <div class="value-box" onclick="copyText(this.dataset.value, this)" data-value="${{escapeAttr(it.body)}}">${{escapeHtml(it.body)}}</div>
          </div>
        </div>
      </div>
    `;
  }}).join('');

  document.getElementById('sentCount').textContent = sent.length;
  document.getElementById('pBar').style.width = (sent.length / DATA.length * 100) + '%';
}}

function escapeHtml(s) {{
  return String(s).replace(/[&<>"']/g, c => ({{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}}[c]));
}}
function escapeAttr(s) {{
  return String(s).replace(/'/g, "&#39;").replace(/"/g, '&quot;').replace(/\\n/g, '&#10;');
}}

render();
</script>
</body>
</html>
"""
    OUTPUT.write_text(html_doc, encoding="utf-8")
    print(f"Generado: {OUTPUT}")
    print(f"Tarjetas: {len(items)}")


if __name__ == "__main__":
    main()
