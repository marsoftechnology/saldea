# Guía de despliegue de Saldea a Vercel

Esta guía te lleva de "código en tu PC" a "SaaS funcionando 24/7 en internet" en aproximadamente 30 minutos.

---

## Antes de empezar

Necesitas tener cuentas (gratis) en:
- **GitHub** — https://github.com (donde subiremos el código)
- **Vercel** — https://vercel.com (donde se ejecuta el SaaS)

Ya tienes cuentas en:
- Supabase ✅
- Anthropic (Claude) ✅
- Resend ✅

---

## Paso 1: Crear repositorio en GitHub

1. Entra en https://github.com y haz login
2. Click en el botón verde **"New"** (arriba a la izquierda) o ve a https://github.com/new
3. Rellena:
   - **Repository name**: `saldea`
   - **Description**: "SaaS para cobrar facturas con IA"
   - **Visibility**: **Private** (importante, para que tu código no sea público)
   - NO marques "Add a README", "Add .gitignore", ni "Choose a license" (ya tenemos todo)
4. Click **"Create repository"**
5. Verás una pantalla con instrucciones. **Copia la URL** del repo (algo como `https://github.com/tuusuario/saldea.git`)

---

## Paso 2: Subir el código a GitHub

Abre **PowerShell** y ejecuta estos comandos (sustituyendo `URL_DEL_REPO` por la URL que copiaste):

```powershell
cd "C:\Users\carlo\Desktop\Nueva carpeta\cobrate"
git remote add origin URL_DEL_REPO
git push -u origin main
```

GitHub te pedirá login. Usa **tu usuario** y como contraseña usa un **Personal Access Token** (no tu contraseña normal). Para crear el token:

1. GitHub → tu foto arriba derecha → **Settings**
2. Abajo del menú lateral → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
4. Note: "Saldea deploy", Expiration: 90 días, marca `repo`
5. Click "Generate token" y **COPIA el token** (solo se ve una vez)
6. Úsalo como contraseña al hacer `git push`

---

## Paso 3: Desplegar en Vercel

1. Entra en https://vercel.com y haz login (recomendado: con GitHub para conectar todo automáticamente)
2. En el dashboard, click **"Add New..."** → **"Project"**
3. Vercel listará tus repos de GitHub. Busca **`saldea`** y click **"Import"**
4. Verás una pantalla de configuración:
   - **Project Name**: `saldea` (déjalo así)
   - **Framework Preset**: Next.js (se autodetecta)
   - **Root Directory**: deja como está
   - **Build settings**: deja como está
5. **IMPORTANTE — Environment Variables**: expande esa sección y añade todas estas variables (cópialas tal cual del `.env.local` local):

```
NEXT_PUBLIC_SUPABASE_URL = https://fqrlagpreazuuuwravbi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_UlzpRkv54ugTVI-JCNl0ZA_ZlQkeaNM
SUPABASE_SERVICE_ROLE_KEY = sb_secret_YdxxQBBCc8cnQVUzFFiZHg_N7of4uZh
CLAUDE_KEY = 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
RESEND_API_KEY = re_WGAnjhqD_34kMSuG8rgxnWy9ZVVdx9WW4
CRON_SECRET = tBc8NEbqnUsLjyNZ1Xlpynv4J562KmBKgUWeDDrk
```

6. Click **"Deploy"**

Vercel tarda 2-3 minutos en compilar y desplegar.

---

## Paso 4: Configurar URLs en Supabase

Cuando Vercel termine, te da una URL del tipo `https://saldea-xxx.vercel.app`. Necesitas autorizarla en Supabase.

1. Ve a https://supabase.com/dashboard/project/fqrlagpreazuuuwravbi
2. Sidebar izquierda → **Authentication** → **URL Configuration**
3. En **Site URL** pon: `https://saldea-xxx.vercel.app` (la URL real de Vercel)
4. En **Redirect URLs** añade:
   - `https://saldea-xxx.vercel.app/**`
5. Guarda los cambios

---

## Paso 5: Probar que todo funciona

1. Abre `https://saldea-xxx.vercel.app` en una pestaña
2. Regístrate con un email
3. Crea un cliente y una factura
4. Pulsa "Enviar recordatorio ahora"
5. Verifica que el email llega

---

## Paso 6: Verificar que el cron automático funciona

Vercel ejecutará `/api/cron` todos los días a las 9:00 AM UTC (10:00/11:00 hora española).

Para verificar:
1. Vercel → tu proyecto → **Cron Jobs** (menú lateral)
2. Verás `/api/cron` listado con su última ejecución
3. Puedes click en **"Run"** para probarlo manualmente

---

## Limitación importante de Resend (la misma que en local)

El remitente `onboarding@resend.dev` solo envía a tu propio email. Para enviar a clientes reales necesitas:

1. **Comprar un dominio** (~10€/año):
   - https://porkbun.com (recomendado)
   - https://namecheap.com
2. **Verificarlo en Resend**:
   - Resend → Domains → Add Domain → sigue las instrucciones DNS
3. **Cambiar el remitente** en `lib/resend.ts` línea 14:
   - De: `'Saldea <onboarding@resend.dev>'`
   - A: `'Saldea <noreply@tudominio.com>'`
4. Commit y push, Vercel redespliega solo

---

## Costes mensuales en cloud

Mientras tengas pocos usuarios y poco tráfico, **todo gratis**:

| Servicio | Plan | Coste |
|---|---|---|
| Vercel | Hobby | 0€ |
| Supabase | Free | 0€ (500MB BD, 50.000 usuarios) |
| Resend | Free | 0€ (3.000 emails/mes) |
| Anthropic | Pay as you go | ~0,001€ por email generado |
| Dominio (opcional) | - | ~10€/año |

Cuando crezcas pagarás por consumo, pero hasta entonces no gastas nada.
