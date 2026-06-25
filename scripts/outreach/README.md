# Outreach a gestorías — sistema automatizado de generación de borradores

Pipeline para captar el primer cliente B2B de Saldea sin quemar el dominio.

## Qué hace

1. **`1_find_emails.py`** — para cada gestoría del CSV, busca su website en DuckDuckGo y extrae el email de contacto de su web.
2. **`2_create_drafts.py`** — para cada gestoría con email, crea un BORRADOR personalizado en tu Zoho Mail (`carlosgc@marsof.es`). No envía nada. Tú revisas y envías 1 a 1.

> Nota: este script **NO envía emails automáticamente**. Crear borradores te deja control humano (puedes editar, descartar o enviar manualmente). Esto evita banearte el dominio en la primera semana de vida.

## Setup (5 min, primera vez)

```powershell
cd "C:\Users\carlo\Desktop\Nueva carpeta\cobrate\scripts\outreach"

# 1. Instalar dependencias
python -m pip install -r requirements.txt

# 2. Generar app-password en Zoho:
#    https://accounts.zoho.eu/home#security/app_passwords
#    Crea uno llamado "outreach-script", copia el password de 16 caracteres

# 3. Copiar config y rellenar
copy .env.example .env
notepad .env
# pega el password en ZOHO_APP_PASSWORD
```

## Uso normal

```powershell
# Paso 1: buscar emails de las 24 gestorías del CSV
python 1_find_emails.py
# tarda ~3 min. Revisa gestorias.csv para ver cuántos emails encontró.

# Paso 1b (opcional): si quedaron sin email, abre el CSV y los rellenas a mano

# Paso 2: dry-run para ver qué borradores creará (sin tocar Zoho)
python 2_create_drafts.py --dry-run

# Paso 3: crear borradores en Zoho (los que tengan email)
python 2_create_drafts.py

# Solo los 5 primeros (testing):
python 2_create_drafts.py --limit 5
```

Después abre **Zoho Mail > Borradores**, revisa cada uno, edita lo que veas raro, y dale a Enviar manualmente. Recomendado **8-10 envíos al día**, no más, para no quemar el dominio nuevo.

## CSV — campos

| campo | qué es |
|---|---|
| `name` | Nombre comercial de la gestoría |
| `city` | Ciudad |
| `maps_url` | URL de Google Maps (de referencia) |
| `website` | Web oficial (autocompletado por script 1) |
| `email` | Email de contacto (autocompletado por script 1) |
| `notes` | Anotaciones libres |
| `status` | `""` = pendiente, `drafted` = borrador ya creado en Zoho |

## Añadir más gestorías

Edita `gestorias.csv` directamente. Solo necesitas rellenar `name` y `city`; el script 1 hace el resto.

## Template del email

`template.txt`. Formato:

```
SUBJECT: Una idea desde Niebla para {NAME}
---
Hola,
...cuerpo del email...
```

Placeholders `{NAME}` / `{CITY}` / `{EMAIL}` se reemplazan por el valor del CSV.

## Riesgos y avisos legales

- **RGPD**: cold email a empresas en España está permitido por interés legítimo siempre que (a) haya identificación del remitente, (b) el destinatario pueda darse de baja, (c) sea proporcional. Las plantillas cumplen (a) y (c). Si te denuncian, ofrece baja inmediata y borra de tu lista.
- **Reputación de dominio**: enviar >15 cold emails/día con un dominio de <1 mes garantiza acabar en spam. Por eso este sistema crea borradores y te obliga a enviarlos manualmente con ritmo.
- **No incluye seguimiento (follow-ups)**. Si quieres añadir follow-ups, lo construimos como `3_followups.py` cuando tengas datos del primer envío.

## Roadmap futuro

- [ ] `0_scrape_maps.py` — scrapear Google Maps por ciudad para ampliar lista (requiere Playwright)
- [ ] `3_followups.py` — recordatorio a los 3 días para los que no respondieron
- [ ] Tracking de aperturas con píxel (requiere dominio aparte para no quemar el principal)
