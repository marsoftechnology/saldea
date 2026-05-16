// Genera un PDF técnico con el resumen completo de Saldea / Marsof
// Salida: C:/Users/carlo/Downloads/Saldea-Marsof-Resumen-Tecnico.pdf
// Uso: node scripts/generar-resumen-pdf.mjs

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'node:fs'

// ===== ESTILO =====
const PAGE_W = 595.28 // A4
const PAGE_H = 841.89
const MARGIN_X = 50
const MARGIN_TOP = 60
const MARGIN_BOTTOM = 60
const COL_NEGRO = rgb(0.1, 0.1, 0.1)
const COL_GRIS = rgb(0.45, 0.45, 0.45)
const COL_GRIS_TENUE = rgb(0.75, 0.75, 0.75)
const COL_AZUL = rgb(0.024, 0.522, 0.78)
const COL_VERDE = rgb(0.15, 0.5, 0.15)
const COL_NARANJA = rgb(0.85, 0.45, 0.1)
const COL_FONDO = rgb(0.97, 0.97, 0.98)

// ===== DOCUMENTO =====
const doc = await PDFDocument.create()
doc.setTitle('Saldea by Marsof — Resumen técnico')
doc.setAuthor('Marsof Technology')
doc.setSubject('Documentación técnica de la plataforma')
doc.setCreator('Carlos Gálvez (Claude Code)')

const fontReg = await doc.embedFont(StandardFonts.Helvetica)
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique)
const fontMono = await doc.embedFont(StandardFonts.Courier)

let page = doc.addPage([PAGE_W, PAGE_H])
let y = PAGE_H - MARGIN_TOP
let pageNum = 1

function nuevaPagina() {
  // Pie de página actual antes de cambiar
  page.drawText(`Saldea by Marsof · Resumen técnico · pág. ${pageNum}`, {
    x: MARGIN_X,
    y: 30,
    size: 8,
    font: fontReg,
    color: COL_GRIS,
  })
  page.drawLine({
    start: { x: MARGIN_X, y: 45 },
    end: { x: PAGE_W - MARGIN_X, y: 45 },
    thickness: 0.5,
    color: COL_GRIS_TENUE,
  })

  page = doc.addPage([PAGE_W, PAGE_H])
  pageNum++
  y = PAGE_H - MARGIN_TOP
}

function checkSpace(necesario) {
  if (y - necesario < MARGIN_BOTTOM + 30) nuevaPagina()
}

// Sanitiza caracteres que WinAnsi no soporta (emojis, flechas Unicode, etc.)
// Reemplazos por equivalentes ASCII o quita lo que no se pueda.
const REEMPLAZOS = [
  [/→/g, '->'],
  [/←/g, '<-'],
  [/↳/g, ' '],
  [/▲/g, '^'],
  [/▼/g, 'v'],
  [/✓/g, '[ok]'],
  [/✅/g, '[OK]'],
  [/❌/g, '[X]'],
  [/⚠️/g, '[!]'],
  [/⚠/g, '[!]'],
  [/⚡/g, '*'],
  [/⏸/g, '[pause]'],
  [/🟢|🟡|🔵|🔴|🟠/g, '*'],
  [/💼|💰|💳|💸|📄|📋|📈|📊|📜|📧|📬|📨|🤝|🔁|🔐|🔧|🛠️|🚀|🎯|🎉|🆕|👥|👋|🧪|🏛️|🏢|🏖️|🥇|🥈|🥉|🟣|🟤|🌐|⚖️|📞|📅|✉️|✏️/g, ''],
  [/[\u{1F300}-\u{1FAFF}]/gu, ''],   // resto de emojis y pictogramas
  [/[\u{2700}-\u{27BF}]/gu, ''],     // dingbats
  [/[\u{2600}-\u{26FF}]/gu, ''],     // símbolos varios
  [/&/g, '&'],
  [/–/g, '-'],
  [/—/g, '--'],
  [/…/g, '...'],
  [/'|'/g, "'"],
  [/"|"/g, '"'],
  [/«|»/g, '"'],
]
function sanitize(s) {
  if (typeof s !== 'string') s = String(s)
  for (const [re, rep] of REEMPLAZOS) s = s.replace(re, rep)
  // Quitar cualquier carácter no ASCII extendido (>0xFF) que se nos haya escapado
  s = s.replace(/[^\x00-\xFF]/g, '')
  // Doble espacio por limpieza
  return s.replace(/\s+/g, ' ').trim() === '' ? '' : s.replace(/  +/g, ' ')
}

// Word wrapping
function wrap(texto, font, size, maxAncho) {
  texto = sanitize(texto)
  const lineas = []
  for (const parrafo of texto.split('\n')) {
    if (parrafo === '') { lineas.push(''); continue }
    const palabras = parrafo.split(' ')
    let actual = ''
    for (const palabra of palabras) {
      const test = actual ? actual + ' ' + palabra : palabra
      const ancho = font.widthOfTextAtSize(test, size)
      if (ancho > maxAncho && actual) {
        lineas.push(actual)
        actual = palabra
      } else {
        actual = test
      }
    }
    if (actual) lineas.push(actual)
  }
  return lineas
}

function drawTexto(texto, opciones = {}) {
  const {
    size = 10,
    font = fontReg,
    color = COL_NEGRO,
    indent = 0,
    spacing = 1.4,
    maxAncho = PAGE_W - MARGIN_X * 2 - indent,
  } = opciones
  const lineas = wrap(texto, font, size, maxAncho)
  for (const linea of lineas) {
    checkSpace(size * spacing)
    page.drawText(sanitize(linea), {
      x: MARGIN_X + indent,
      y,
      size,
      font,
      color,
    })
    y -= size * spacing
  }
}

function drawH1(texto) {
  checkSpace(70)
  y -= 10
  // Rectángulo de fondo
  page.drawRectangle({
    x: MARGIN_X - 10,
    y: y - 28,
    width: PAGE_W - MARGIN_X * 2 + 20,
    height: 36,
    color: COL_AZUL,
  })
  page.drawText(sanitize(texto), {
    x: MARGIN_X,
    y: y - 20,
    size: 18,
    font: fontBold,
    color: rgb(1, 1, 1),
  })
  y -= 50
}

function drawH2(texto) {
  checkSpace(40)
  y -= 6
  page.drawText(sanitize(texto), { x: MARGIN_X, y, size: 14, font: fontBold, color: COL_AZUL })
  y -= 18
  page.drawLine({
    start: { x: MARGIN_X, y: y + 4 },
    end: { x: PAGE_W - MARGIN_X, y: y + 4 },
    thickness: 0.6,
    color: COL_AZUL,
  })
  y -= 8
}

function drawH3(texto) {
  checkSpace(28)
  y -= 4
  page.drawText(sanitize(texto), { x: MARGIN_X, y, size: 11, font: fontBold, color: COL_NEGRO })
  y -= 16
}

function drawParrafo(texto) {
  drawTexto(texto, { size: 10, color: COL_NEGRO, spacing: 1.45 })
  y -= 4
}

function drawBullet(texto) {
  const indent = 14
  checkSpace(13)
  page.drawText('•', { x: MARGIN_X + 2, y, size: 10, font: fontBold, color: COL_AZUL })
  drawTexto(texto, { size: 9.5, indent, spacing: 1.4 })
  y -= 1
}

function drawCode(texto) {
  const lineas = texto.split('\n')
  const padding = 8
  const lineHeight = 11
  const altura = lineas.length * lineHeight + padding * 2
  checkSpace(altura + 5)
  page.drawRectangle({
    x: MARGIN_X,
    y: y - altura + padding,
    width: PAGE_W - MARGIN_X * 2,
    height: altura,
    color: COL_FONDO,
    borderColor: COL_GRIS_TENUE,
    borderWidth: 0.5,
  })
  let cy = y - padding
  for (const linea of lineas) {
    cy -= lineHeight
    page.drawText(sanitize(linea), {
      x: MARGIN_X + padding,
      y: cy + lineHeight - 2,
      size: 8.5,
      font: fontMono,
      color: COL_NEGRO,
    })
  }
  y -= altura + 4
}

function drawTabla(headers, rows, anchos) {
  const totalAncho = PAGE_W - MARGIN_X * 2
  const cols = anchos.map(a => a * totalAncho)
  const rowH = 14
  checkSpace(rowH * (rows.length + 1) + 4)

  // Header
  page.drawRectangle({ x: MARGIN_X, y: y - rowH + 3, width: totalAncho, height: rowH, color: COL_AZUL })
  let cx = MARGIN_X + 4
  headers.forEach((h, i) => {
    page.drawText(h, { x: cx, y: y - 8, size: 9, font: fontBold, color: rgb(1, 1, 1) })
    cx += cols[i]
  })
  y -= rowH
  // Rows
  for (const row of rows) {
    checkSpace(rowH)
    cx = MARGIN_X + 4
    row.forEach((cell, i) => {
      // Wrap cell if needed
      const lineas = wrap(String(cell), fontReg, 8.5, cols[i] - 8)
      page.drawText(lineas[0] ?? '', { x: cx, y: y - 7, size: 8.5, font: fontReg, color: COL_NEGRO })
      cx += cols[i]
    })
    page.drawLine({
      start: { x: MARGIN_X, y: y - rowH + 3 },
      end: { x: MARGIN_X + totalAncho, y: y - rowH + 3 },
      thickness: 0.3,
      color: COL_GRIS_TENUE,
    })
    y -= rowH
  }
  y -= 4
}

function drawNota(texto, color = COL_NARANJA) {
  const indent = 10
  const altura = wrap(texto, fontReg, 9, PAGE_W - MARGIN_X * 2 - indent - 6).length * 12 + 12
  checkSpace(altura)
  page.drawRectangle({
    x: MARGIN_X,
    y: y - altura + 8,
    width: 3,
    height: altura - 4,
    color,
  })
  drawTexto(texto, { size: 9, indent: indent + 4, color: COL_GRIS, spacing: 1.35 })
  y -= 3
}

// ============================================================
// PORTADA
// ============================================================
page.drawRectangle({ x: 0, y: PAGE_H - 240, width: PAGE_W, height: 240, color: COL_AZUL })
page.drawText('SALDEA', { x: MARGIN_X, y: PAGE_H - 120, size: 42, font: fontBold, color: rgb(1, 1, 1) })
page.drawText('by Marsof Technology', { x: MARGIN_X, y: PAGE_H - 148, size: 14, font: fontReg, color: rgb(0.85, 0.95, 1) })
page.drawText('Resumen técnico de la plataforma', { x: MARGIN_X, y: PAGE_H - 195, size: 16, font: fontReg, color: rgb(1, 1, 1) })
page.drawText('Cobro automático de facturas con IA · SaaS multi-tenant en producción', {
  x: MARGIN_X,
  y: PAGE_H - 215,
  size: 11,
  font: fontItalic,
  color: rgb(0.85, 0.95, 1),
})

y = PAGE_H - 290
drawH3('Documento para desarrolladores')
drawParrafo('Este documento describe la arquitectura, stack, funcionalidades y servicios externos de Saldea. Está pensado para que cualquier persona técnica entienda el sistema, sepa por dónde tocar y conozca el estado actual de cada pieza.')

y -= 8
drawTabla(
  ['Campo', 'Valor'],
  [
    ['Producto', 'Saldea — primera app de Marsof'],
    ['Dominio', 'https://marsof.es / https://www.marsof.es'],
    ['Repositorio', 'github.com/carlos90inversiones/saldea'],
    ['Stack', 'Next.js 16 (App Router · Turbopack), TypeScript, Tailwind 4'],
    ['Hosting', 'Vercel (region iad1)'],
    ['BD', 'Supabase PostgreSQL + Auth + Storage'],
    ['Pagos', 'Stripe + Stripe Connect (modo live, aprobado)'],
    ['Emails', 'Resend (dominio marsof.es verified, region EU)'],
    ['IA', 'Anthropic Claude Sonnet 4.6'],
    ['Errores', 'Sentry (org marsof-technology, region DE)'],
    ['Fecha', new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })],
  ],
  [0.25, 0.75]
)

y -= 4
drawNota('Documento generado automáticamente a partir del código real del proyecto. Refleja el estado en el momento de la generación.', COL_VERDE)

nuevaPagina()

// ============================================================
// 1. RESUMEN EJECUTIVO
// ============================================================
drawH1('1. Qué es Saldea')

drawParrafo('Saldea es una herramienta SaaS para autónomos, gestorías y pymes españolas que automatiza el cobro de facturas impagadas mediante recordatorios escritos por IA. El usuario sube sus facturas (manualmente o por CSV), y Saldea envía emails escalonados al deudor en distintos tonos según los días de retraso, hasta que paga.')

drawH3('Diferenciador clave')
drawBullet('Los recordatorios los escribe Claude Sonnet 4.6 con el contexto exacto de cada factura (importe, días de retraso, abonos parciales, tono según preferencias).')
drawBullet('Integración con Stripe Connect: el deudor puede pagar al instante con un botón "Pagar ahora" y la factura se marca como cobrada sola.')
drawBullet('Multi-tenant: cada usuario tiene su organización, con roles y miembros. Una gestoría puede dar acceso a su equipo.')
drawBullet('Detección por IA de respuestas del cliente (pago confirmado, disputa, vacaciones, fraccionamiento) y pausa automática de recordatorios.')

drawH3('Modelo de negocio')
drawBullet('Plan Free: 3 facturas activas, 10 clientes, 30 emails/mes, 1 miembro, tono único.')
drawBullet('Plan Pro Mensual: 49 €/mes con 30 días gratis (requiere tarjeta).')
drawBullet('Plan Pro Anual: 499 €/año, sin trial, cobro al instante.')
drawBullet('Sin comisión sobre los cobros que los usuarios procesan vía Stripe Connect. Saldea solo cobra la suscripción.')

drawH2('1.1. Marsof Technology')
drawParrafo('Marsof Technology es la empresa que opera Saldea. La arquitectura del panel admin está preparada para acoger futuras apps bajo el mismo paraguas (cada app tendría su propia sección de métricas dentro de marsof.es/admin).')
drawBullet('Titular: Carlos Gálvez Carrillo · NIF 49080222Q · Niebla (Huelva).')
drawBullet('Dominio principal: marsof.es.')
drawBullet('Cuentas operativas: Stripe (con Connect aprobado), Resend (dominio verificado), Vercel, Supabase, Sentry, Anthropic.')

// ============================================================
// 2. STACK TÉCNICO
// ============================================================
nuevaPagina()
drawH1('2. Stack técnico')

drawH2('2.1. Frontend + backend (mismo runtime)')
drawTabla(
  ['Tecnología', 'Uso'],
  [
    ['Next.js 16.2.6 (App Router · Turbopack)', 'Framework completo: server components, route handlers, edge runtime, cron'],
    ['React 19 (incluido en Next 16)', 'Componentes UI'],
    ['TypeScript', 'Tipado estricto en todo el código'],
    ['Tailwind CSS 4 (vía @tailwindcss/postcss)', 'Estilos. Tema dark por defecto + light vía CSS vars'],
    ['pdf-lib', 'Generación de PDFs de factura'],
    ['papaparse', 'Parseo de CSV en importación'],
    ['bcryptjs', 'Hash de la password del admin'],
  ],
  [0.35, 0.65]
)

drawH2('2.2. Servicios externos')
drawTabla(
  ['Servicio', 'Función', 'Plan / Estado'],
  [
    ['Supabase', 'PostgreSQL + Auth + Storage + RLS', 'Pro (EU)'],
    ['Vercel', 'Hosting + crons + edge', 'Pro'],
    ['Stripe', 'Suscripciones Saldea Pro', 'Live'],
    ['Stripe Connect', 'Cobros de los usuarios a sus deudores', 'Live · plataforma aprobada'],
    ['Resend', 'Envío de emails transaccionales', 'Free, dominio marsof.es verified'],
    ['Anthropic Claude', 'Generación + clasificación de emails', 'API estándar'],
    ['Sentry', 'Error tracking + performance', 'Developer (5k errores/mes)'],
  ],
  [0.2, 0.5, 0.3]
)

drawH2('2.3. Variables de entorno necesarias')
drawCode(`# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Stripe (suscripción Saldea Pro)
STRIPE_SECRET_KEY
STRIPE_PRICE_ID                # plan mensual
STRIPE_PRICE_ID_ANNUAL         # plan anual
STRIPE_WEBHOOK_SECRET

# Stripe Connect (cobros de los usuarios)
STRIPE_CONNECT_CLIENT_ID
STRIPE_CONNECT_WEBHOOK_SECRET

# Emails (Resend)
RESEND_API_KEY

# IA (Claude)
CLAUDE_KEY                     # o ANTHROPIC_API_KEY

# Cron jobs
CRON_SECRET

# Panel admin (solo Marsof)
ADMIN_USERNAME
ADMIN_PASSWORD_HASH            # bcrypt hash
ADMIN_SESSION_SECRET           # 48 bytes hex para HMAC

# Sentry
NEXT_PUBLIC_SENTRY_DSN
# SENTRY_AUTH_TOKEN            # opcional, para subir source maps

# General
NEXT_PUBLIC_APP_URL`)

// ============================================================
// 3. ARQUITECTURA MULTI-TENANT
// ============================================================
nuevaPagina()
drawH1('3. Arquitectura multi-tenant')

drawParrafo('Saldea es multi-tenant a nivel de organización. Un usuario puede ser miembro de varias orgs (con roles distintos en cada una) y cambiar entre ellas con un selector en el sidebar. Toda la separación se hace a nivel PostgreSQL con Row Level Security — no se filtra por código de aplicación, lo cual da una garantía adicional de aislamiento.')

drawH2('3.1. Roles')
drawTabla(
  ['Rol', 'Permisos'],
  [
    ['Owner', 'Control total · contrata plan · conecta Stripe · borra cuenta'],
    ['Admin', 'Invita miembros · cambia config · todas las operaciones de cobro'],
    ['Member', 'Crea/edita facturas y clientes · envía recordatorios · registra pagos'],
    ['Readonly', 'Solo consulta. No puede editar nada (gateado en server y RLS)'],
  ],
  [0.18, 0.82]
)

drawH2('3.2. Flujo de invitación')
drawBullet('Owner / admin va a /equipo → introduce email + rol.')
drawBullet('Backend genera token (crypto.randomBytes 24 bytes hex), expira 7 días.')
drawBullet('Resend envía email con link a /aceptar-invitacion?token=xxx.')
drawBullet('El invitado abre el link → si no tiene cuenta, ve opciones registrarse/login con next= para volver.')
drawBullet('Tras login, verifica que email coincide → crea fila en org_members.')

drawH2('3.3. Límite de miembros por plan')
drawBullet('Free: 1 miembro (solo el owner).')
drawBullet('Pro: 10 miembros (las invitaciones pendientes cuentan al cupo).')
drawBullet('Server + UI gatean por separado (defensa en profundidad).')

// ============================================================
// 4. SCHEMA DE BD
// ============================================================
nuevaPagina()
drawH1('4. Schema de base de datos')

drawParrafo('Todo en PostgreSQL gestionado por Supabase. Las tablas más relevantes:')

drawH2('4.1. Tablas principales')

drawH3('organizations')
drawCode(`id uuid PK
name text not null
owner_id uuid → auth.users
onboarding_completado_at timestamptz
created_at timestamptz`)

drawH3('org_members')
drawCode(`id uuid PK
org_id uuid → organizations
user_id uuid → auth.users
role text [owner|admin|member|readonly]
unique(org_id, user_id)`)

drawH3('org_invites')
drawCode(`id uuid PK · org_id · email · role · token (unique)
invited_by uuid · expires_at · accepted_at
index lower(email)`)

drawH3('clientes')
drawCode(`id uuid PK · user_id (creator) · org_id (scope)
nombre · email · telefono · empresa
+ overrides por cliente: max_recordatorios_override,
  patron_dias_override, dias_gracia_override,
  tono_preset_override, pausar_recordatorios,
  notas_cliente`)

drawH3('facturas')
drawCode(`id uuid PK · user_id · org_id · cliente_id
numero · importe · fecha_vencimiento
estado [pendiente|vencida|parcialmente_cobrada|cobrada|cancelada]
descripcion · notas_internas
link_pago text       # URL del Payment Link (Stripe Connect, Bizum, etc.)
pdf_propio_path text # path en Supabase Storage
pausada_hasta date
+ overrides: max_recordatorios, patron_dias, dias_personalizados[],
  dias_gracia, tono_preset`)

drawH3('pagos')
drawCode(`id uuid PK · factura_id · user_id · org_id
importe numeric (> 0) · fecha date
metodo [transferencia|bizum|tarjeta|efectivo|stripe|paypal|otro]
referencia text · notas text · created_at`)

drawH3('recordatorios · logs_email · respuestas_clientes · configuraciones_usuario')
drawParrafo('Resto de tablas operativas. configuraciones_usuario guarda plan, plantillas de email, firma, conexión Stripe Connect, preferencias de cron, etc. (una fila por owner de org).')

drawH2('4.2. Row Level Security (RLS)')
drawParrafo('Toda tabla con datos de usuario tiene RLS habilitado. Las policies usan helpers SQL SECURITY DEFINER:')
drawCode(`-- helper: orgs a las que pertenece el usuario actual
create function user_org_ids() returns setof uuid
language sql security definer stable as $$
  select org_id from org_members where user_id = auth.uid()
$$;

-- policy típica de tabla de datos
create policy "miembros gestionan facturas" on facturas
  for all
  using  (org_id in (select user_org_ids()))
  with check (org_id in (select user_org_ids()));`)

drawNota('El cron y los webhooks usan service_role (skip RLS). El cliente y server components autenticados van por RLS — un miembro nunca puede leer datos de una org a la que no pertenezca, aunque cambie el código del frontend.', COL_VERDE)

drawH2('4.3. Storage')
drawParrafo('Bucket facturas-pdf (no público) con RLS:')
drawCode(`-- path = {org_id}/{factura_id}.pdf
-- política: el primer "directorio" debe ser una org del usuario
bucket_id = 'facturas-pdf'
and (storage.foldername(name))[1]::uuid in (select user_org_ids())`)
drawParrafo('Cualquier miembro de la org puede subir, ver, reemplazar y eliminar el PDF de una factura de su org. La firma de URLs (createSignedUrl) se usa para descargar.')

// ============================================================
// 5. RUTAS Y ESTRUCTURA
// ============================================================
nuevaPagina()
drawH1('5. Estructura del código')

drawH2('5.1. App Router')
drawCode(`app/
├ (auth)/                       # login, registro, recuperar password
├ (dashboard)/                  # rutas autenticadas del usuario
│   ├ layout.tsx                # sidebar + OrgSwitcher + ThemeToggle
│   ├ dashboard/page.tsx        # KPIs · redirige a /bienvenida si onboarding pendiente
│   ├ facturas/                 # listado, nueva, detalle [id]
│   ├ clientes/                 # listado, nuevo, detalle, editar
│   ├ analytics/page.tsx        # informes
│   ├ ajustes/page.tsx          # config + Stripe Connect section
│   ├ equipo/page.tsx           # invitar / gestionar miembros
│   ├ importar/page.tsx         # CSV (Plan Pro)
│   └ bienvenida/page.tsx       # wizard de onboarding (3 pasos)
├ admin/                        # panel privado solo para Carlos (Marsof)
│   ├ login/page.tsx
│   └ (protegido)/
│       ├ layout.tsx            # valida cookie HMAC + sidebar admin
│       ├ page.tsx              # resumen financiero global multi-app
│       └ saldea/
│           ├ page.tsx          # overview financiero Saldea
│           ├ ingresos/         # tabla pagos + export CSV
│           ├ suscripciones/    # suscripciones activas + trials
│           ├ usuarios/         # tabla usuarios (operativo)
│           ├ organizaciones/   # tabla orgs (operativo)
│           └ facturas/         # facturas de clientes (operativo)
├ aceptar-invitacion/page.tsx   # pública con token
├ legal/                        # privacidad / términos / cookies
├ blog/                         # SEO
├ saldea/page.tsx               # landing
├ api/                          # ver sección 6
└ globals.css                   # tema dark/light con CSS vars`)

drawH2('5.2. Librerías propias (lib/)')
drawTabla(
  ['Archivo', 'Función'],
  [
    ['anthropic.ts', 'generarMensajeRecordatorio + clasificarRespuestaCliente'],
    ['auth-org.ts', 'getActiveOrg, requireOrg, setActiveOrgCookie, crearOrgPorDefecto'],
    ['admin-auth.ts', 'loginAdmin / adminSesionActiva (bcrypt + HMAC cookie)'],
    ['admin-stripe.ts', 'sumaIngresos, ingresosPorMes, suscripcionesActivas, calcularMRR'],
    ['csv.ts', 'generarCSV / csvResponse (RFC 4180 + BOM UTF-8)'],
    ['pagos.ts', 'recalcularEstadoFactura según SUM(pagos)'],
    ['pdf.ts', 'generarPDFFactura (auto-generado si el user no sube uno)'],
    ['plan.ts', 'getOrgPlan, limiteMiembrosOrg, contarAsientosOrg'],
    ['recordatorios.ts', 'computar días, parsear, calcular escalado de tono'],
    ['resend.ts', 'enviarEmail con HTML, botón pago, signatures multiidioma'],
    ['supabase-server.ts', 'cliente Supabase autenticado server-side'],
    ['supabase-service.ts', 'cliente service-role (cron, webhooks)'],
    ['supabase.ts', 'cliente browser (RLS aplica)'],
    ['client-org.ts', 'getActiveOrgIdClient (forms)'],
    ['whatsapp.ts', 'normalizarTelefono + generarLinkWhatsapp (wa.me)'],
    ['utils.ts', 'formatearEuros, formatearFecha, diasVencida, colorEstado…'],
  ],
  [0.25, 0.75]
)

// ============================================================
// 6. ENDPOINTS API
// ============================================================
nuevaPagina()
drawH1('6. Endpoints API')

drawH2('6.1. CRUD de la app')
drawTabla(
  ['Endpoint', 'Verbos', 'Función'],
  [
    ['/api/configuracion', 'GET PATCH', 'Config de la org (gated por rol)'],
    ['/api/facturas/[id]/notas', 'PATCH', 'Notas internas de la factura'],
    ['/api/facturas/[id]/link-pago', 'PATCH', 'URL de pago manual'],
    ['/api/facturas/[id]/pdf-propio', 'PATCH', 'Vincular PDF de Storage'],
    ['/api/facturas/[id]/pagos', 'POST', 'Registrar pago (parcial o total)'],
    ['/api/facturas/[id]/pagos/[pagoId]', 'DELETE', 'Borrar pago, recalcular estado'],
    ['/api/facturas/[id]/generar-link-pago', 'POST', 'Crea Stripe Payment Link via Connect'],
    ['/api/facturas/exportar', 'GET', 'CSV de facturas'],
    ['/api/clientes/exportar', 'GET', 'CSV de clientes con totales'],
    ['/api/clientes/[id]/preferencias', 'PATCH', 'Overrides del cliente'],
    ['/api/enviar-recordatorio', 'POST', 'Manda email manual (IA + Resend)'],
    ['/api/importar', 'POST', 'Importación masiva CSV (Pro)'],
    ['/api/onboarding', 'GET POST', 'Estado wizard + marcar completado'],
  ],
  [0.4, 0.15, 0.45]
)

drawH2('6.2. Equipo y multi-org')
drawTabla(
  ['Endpoint', 'Función'],
  [
    ['/api/equipo/miembros', 'Lista de miembros + invitaciones + plan/asientos'],
    ['/api/equipo/miembros/[id]', 'PATCH (rol) · DELETE (expulsar)'],
    ['/api/equipo/invitar', 'POST crear invitación + email · DELETE cancelar'],
    ['/api/equipo/aceptar-invitacion', 'GET info · POST aceptar'],
    ['/api/me/orgs', 'GET listar · POST cambiar activa · PUT crear nueva'],
  ],
  [0.4, 0.6]
)

drawH2('6.3. Stripe Connect')
drawTabla(
  ['Endpoint', 'Función'],
  [
    ['/api/stripe-connect/start', 'OAuth start (genera state + cookie CSRF)'],
    ['/api/stripe-connect/callback', 'Intercambia code → guarda stripe_user_id'],
    ['/api/stripe-connect/disconnect', 'Revoca + limpia (solo owner)'],
    ['/api/stripe-connect/status', 'Estado actual (charges_enabled, country…)'],
    ['/api/stripe-connect-webhook', 'Recibe pagos → marca factura como cobrada'],
  ],
  [0.4, 0.6]
)

drawH2('6.4. Sistema (admin / crons / webhooks)')
drawTabla(
  ['Endpoint', 'Trigger', 'Función'],
  [
    ['/api/cron', 'Vercel cron 09:00 UTC', 'Envía recordatorios automáticos vencidos'],
    ['/api/cron-resumen', 'Vercel cron 07:00 UTC', 'Resumen diario/semanal por email'],
    ['/api/stripe-webhook', 'Stripe', 'Suscripción Pro: alta/baja/update'],
    ['/api/email-inbound', 'Resend/Cloudflare', 'Respuestas de clientes (código listo, pendiente activar)'],
    ['/api/cobrado', 'GET (botón email)', 'Cliente confirma pago manual'],
    ['/api/checkout', 'POST', 'Inicia Stripe Checkout suscripción Pro'],
    ['/api/stripe-portal', 'POST', 'Stripe Customer Portal'],
    ['/api/welcome-email', 'POST', 'Email bienvenida al signup'],
    ['/api/admin/login', 'POST', 'Login admin (bcrypt + cookie HMAC)'],
    ['/api/admin/logout', 'POST', 'Borra cookie admin'],
    ['/api/admin/exportar-pagos', 'GET', 'CSV de pagos reales desde Stripe'],
    ['/api/admin/sentry-test', 'GET', 'Forzar errores para testear Sentry'],
  ],
  [0.32, 0.22, 0.46]
)

// ============================================================
// 7. RECORDATORIOS CON IA
// ============================================================
nuevaPagina()
drawH1('7. Recordatorios con IA')

drawH2('7.1. Generación de mensajes')
drawParrafo('lib/anthropic.ts → generarMensajeRecordatorio() construye un prompt con el contexto de la factura y se lo pasa a Claude Sonnet 4.6. La IA devuelve un JSON {asunto, cuerpo} en el idioma configurado (es, ca, en, pt).')

drawH3('Variables que recibe la IA')
drawBullet('Nombre del cliente y empresa.')
drawBullet('Número de factura e importe.')
drawBullet('Días de vencimiento (negativo si aún no vence).')
drawBullet('Tono solicitado: amigable, firme, formal, extremo.')
drawBullet('Nombre de la empresa emisora (org.name).')
drawBullet('Si la IA debe ofrecer fraccionamiento (config umbral).')
drawBullet('Si debe mencionar recargo por mora (% configurable a partir de día X).')
drawBullet('Si debe ofrecer descuento por pronto pago (% y plazo).')
drawBullet('Si la factura tiene Payment Link (entonces no dice "haz transferencia", menciona el botón).')
drawBullet('Importe ya pagado (para pagos parciales: agradece el abono y reclama solo el resto).')

drawH2('7.2. Escalado de tono según patrón')
drawParrafo('lib/recordatorios.ts → calcularTonos() reparte días entre los recordatorios según el patrón elegido por el usuario:')
drawTabla(
  ['Patrón', 'Días típicos (en %)'],
  [
    ['Agresivo', '3, 7, 14, 21, 30...'],
    ['Normal', '7, 15, 30, 45, 60...'],
    ['Suave', '10, 25, 45, 75, 105...'],
    ['Personalizado', 'el usuario define los días concretos'],
  ],
  [0.2, 0.8]
)

drawH2('7.3. Detección de respuestas (email inbound)')
drawParrafo('El endpoint /api/email-inbound recibe el email de respuesta del cliente (cuando responde a un recordatorio) y se lo pasa a Claude para clasificarlo:')
drawTabla(
  ['Categoría', 'Acción automática'],
  [
    ['pago_confirmado', 'Pausa 7 días. Marca para revisión humana.'],
    ['disputa', 'Pausa 30 días. Notifica al usuario.'],
    ['vacaciones', 'Pausa hasta la fecha que extrae la IA (o 14 días).'],
    ['pidiendo_plazos', 'Pausa 5 días. Sugiere responder con propuesta.'],
    ['otro', 'Pausa 3 días para revisión manual.'],
  ],
  [0.25, 0.75]
)

drawNota('Plan Free guarda la respuesta sin clasificar (revisión manual). Plan Pro pasa por Claude. Código listo en /api/email-inbound — falta activar el receiving de emails (Cloudflare Email Routing o Resend Inbound) y mapearlo al webhook.', COL_NARANJA)

// ============================================================
// 8. STRIPE CONNECT (COBROS)
// ============================================================
nuevaPagina()
drawH1('8. Stripe Connect — cobros automáticos')

drawParrafo('La integración con Stripe Connect permite que el usuario conecte su propia cuenta de Stripe y que sus clientes paguen las facturas al instante con tarjeta a través de un botón "Pagar ahora" en el email. Cuando llega el pago, Saldea marca la factura como cobrada automáticamente.')

drawH2('8.1. Flujo')
drawBullet('Owner va a Ajustes → "Conectar Stripe" → redirige a OAuth de Stripe.')
drawBullet('Stripe pide autorización con la cuenta del usuario (o la crea si es nueva).')
drawBullet('Callback recibe el code → se intercambia por stripe_user_id (acct_...) y se guarda en configuraciones_usuario.')
drawBullet('En cada factura aparece un botón "⚡ Generar link de pago con Stripe": llama a /api/facturas/[id]/generar-link-pago.')
drawBullet('El endpoint crea un Stripe Payment Link en la cuenta conectada (stripe.paymentLinks.create con stripeAccount header).')
drawBullet('Se guarda la URL en facturas.link_pago. La IA detecta que existe y deja de pedir transferencia.')
drawBullet('Cliente paga → Stripe procesa el dinero en la cuenta del usuario (Saldea nunca lo toca).')
drawBullet('Stripe envía evento checkout.session.completed al webhook → Saldea registra un pago en la tabla pagos con metodo=\'stripe\' → recalcularEstadoFactura → cobrada.')

drawH2('8.2. Tipo de Connect usado')
drawTabla(
  ['Característica', 'Configuración'],
  [
    ['Tipo de cuenta', 'Standard (los usuarios traen su propio Stripe)'],
    ['Flujo de fondos', 'Direct charges (Stripe → usuario)'],
    ['Comisión Saldea', '0% (solo cobramos suscripción)'],
    ['Comisión Stripe', '~1.4% + 0.25€ (no la modificamos)'],
    ['Onboarding', 'Stripe-hosted OAuth'],
    ['Estado plataforma', 'Live · aprobada por Stripe'],
  ],
  [0.3, 0.7]
)

drawH2('8.3. Webhook events')
drawCode(`checkout.session.completed       → registra pago + marca cobrada
payment_intent.succeeded         → fallback (idempotente)
account.updated                  → refresca charges_enabled
account.application.deauthorized → limpia conexión si el user revoca`)

drawNota('Idempotencia: el webhook comprueba si ya existe un pago con la misma referencia (payment_intent_id o session_id) antes de insertar uno nuevo. Stripe puede reenviar eventos.', COL_VERDE)

// ============================================================
// 9. PANEL ADMIN
// ============================================================
nuevaPagina()
drawH1('9. Panel admin (marsof.es/admin)')

drawParrafo('Panel privado solo para Carlos como dueño de Marsof. No es accesible para usuarios de Saldea. Está oculto del sitemap, robots.txt y tiene meta noindex/nofollow.')

drawH2('9.1. Autenticación')
drawBullet('No usa Supabase Auth (es un sistema aparte).')
drawBullet('Credenciales en env vars: ADMIN_USERNAME + ADMIN_PASSWORD_HASH (bcrypt).')
drawBullet('Cookie marsof_admin_session firmada con HMAC-SHA256 (ADMIN_SESSION_SECRET), expira 24h.')
drawBullet('Comparaciones timing-safe (crypto.timingSafeEqual).')
drawBullet('Retardo 600ms en login fallido para ralentizar brute-force.')

drawH2('9.2. Estructura')
drawTabla(
  ['Ruta', 'Contenido'],
  [
    ['/admin', 'Resumen financiero global · KPIs · gráfico mensual · eventos recientes · desglose por app'],
    ['/admin/saldea', 'KPIs Saldea: este mes, año, lifetime, MRR, ARR, bruto vs neto, mezcla mensual/anual'],
    ['/admin/saldea/ingresos', 'Tabla detallada de pagos reales con bruto/comisión/neto · filtros de fecha · export CSV'],
    ['/admin/saldea/suscripciones', 'Lista de subs activas/trial/past_due con estado, plan, próximo cobro'],
    ['/admin/saldea/usuarios', 'Tabla usuarios (operativo, secundario)'],
    ['/admin/saldea/organizaciones', 'Tabla orgs con métricas (operativo)'],
    ['/admin/saldea/facturas', 'Últimas 500 facturas de todos los usuarios (operativo)'],
  ],
  [0.32, 0.68]
)

drawH2('9.3. Fuente de datos financieros')
drawParrafo('Las páginas financieras consultan la API de Stripe en vivo (balance.retrieve, charges.list, balanceTransactions.list, subscriptions.list, events.list) — NO usan la BD de Supabase. Esto garantiza que los números coinciden con lo que Stripe tiene cobrado realmente, sin depender de que ningún webhook haya llegado bien.')

drawH2('9.4. Multi-app ready')
drawParrafo('La estructura /admin/{app}/* permite añadir futuras apps de Marsof sin reescribir el panel. Cuando lances la siguiente app, basta con duplicar la carpeta /admin/(protegido)/saldea/ y adaptar los queries.')

// ============================================================
// 10. CRONS Y AUTOMATIZACIONES
// ============================================================
nuevaPagina()
drawH1('10. Crons y automatizaciones')

drawH2('10.1. Configuración (vercel.json)')
drawCode(`{
  "crons": [
    { "path": "/api/cron",         "schedule": "0 9 * * *" },
    { "path": "/api/cron-resumen", "schedule": "0 7 * * *" }
  ]
}`)

drawH2('10.2. /api/cron — recordatorios automáticos')
drawBullet('Se ejecuta diariamente a las 09:00 UTC (10:00-11:00 España según horario).')
drawBullet('Auth: header Authorization: Bearer <CRON_SECRET>.')
drawBullet('Si es fin de semana / festivo, filtra por orgs que tengan enviar_fin_semana o que NO evitar_festivos.')
drawBullet('Busca facturas no cobradas con fecha de vencimiento ≤ hoy y pausada_hasta vencida.')
drawBullet('Para cada factura: si el cliente.pausar_recordatorios → skip.')
drawBullet('Calcula días vencida → busca recordatorio configurado → si no enviado y dias >= offset → enviar.')
drawBullet('Gates de plan Free: máx 30 emails/mes/org · siempre tono amigable.')
drawBullet('Lee importePagado (sum pagos) y se lo pasa a Claude (para pagos parciales).')
drawBullet('Genera mensaje con Claude → adjunta PDF (subido por user o auto-generado) → envía con Resend.')
drawBullet('Inserta en logs_email, marca recordatorio como enviado, actualiza estado a vencida si procede.')

drawH2('10.3. /api/cron-resumen — resumen diario/semanal')
drawBullet('Se ejecuta diariamente a las 07:00 UTC.')
drawBullet('Filtra orgs con resumen_diario=true OR (resumen_semanal=true AND es lunes).')
drawBullet('Excluye orgs en modo_vacaciones activo.')
drawBullet('Envía email al owner con stats: emails enviados, facturas cobradas/pendientes/vencidas, respuestas recibidas.')

// ============================================================
// 11. WEBHOOKS
// ============================================================
drawH1('11. Webhooks')

drawH2('11.1. /api/stripe-webhook (suscripción Pro)')
drawParrafo('Eventos para gestionar el plan del usuario:')
drawCode(`checkout.session.completed         → plan='pro' + customer_id + subscription_id
customer.subscription.created/updated → plan='pro' si active|trialing
customer.subscription.deleted         → plan='free'`)

drawH2('11.2. /api/stripe-connect-webhook (cobros)')
drawParrafo('Eventos de las cuentas conectadas — los cobros reales que reciben los usuarios:')
drawCode(`checkout.session.completed         → registra pago + factura cobrada
payment_intent.succeeded           → fallback idempotente
account.updated                    → actualiza charges_enabled
account.application.deauthorized   → limpia conexión Stripe Connect`)

drawH2('11.3. /api/email-inbound (futuro)')
drawParrafo('Endpoint listo para recibir respuestas de clientes. La IA las clasifica y aplica la acción (pausar, marcar disputa, etc.). Pendiente: configurar el receiving en Cloudflare Email Routing o Resend Inbound y apuntar a este endpoint.')

// ============================================================
// 12. ERROR TRACKING (SENTRY)
// ============================================================
nuevaPagina()
drawH1('12. Error tracking (Sentry)')

drawH2('12.1. Archivos de configuración')
drawTabla(
  ['Archivo', 'Función'],
  [
    ['instrumentation.ts', 'Init Sentry para Node + Edge runtime + onRequestError'],
    ['instrumentation-client.ts', 'Init Sentry en navegador + Replay solo en error'],
    ['app/global-error.tsx', 'Captura errores del árbol React no manejados'],
    ['next.config.ts (withSentryConfig)', 'Source maps + tunnel /monitoring (esquiva adblockers)'],
  ],
  [0.4, 0.6]
)

drawH2('12.2. Configuración aplicada')
drawBullet('Region DE (Frankfurt) → datos en UE, RGPD-friendly.')
drawBullet('Sample rate errores: 100%.'),
drawBullet('Sample rate trazas: 10% (suficiente para detectar lentitud).')
drawBullet('Replay session: 0% en sesiones normales, 100% cuando hay error.')
drawBullet('ignoreErrors: NEXT_REDIRECT, NEXT_NOT_FOUND, ResizeObserver, errores de extensiones (chrome-extension://...), fallos de red.')
drawBullet('denyUrls: /aceptar-invitacion?token= (para que tokens nunca aparezcan en breadcrumbs).')
drawBullet('Tunnel /monitoring: requests a Sentry van por nuestro dominio → adblockers no las tumban.')
drawBullet('Release vinculado a VERCEL_GIT_COMMIT_SHA → saber qué deploy rompió las cosas.')

drawH2('12.3. Alerta por email')
drawParrafo('Sentry crea automáticamente una regla "Send a notification for high priority issues" — cuando aparece un error nuevo high priority, llega email al correo de la cuenta Sentry (info@marsof.es).')

// ============================================================
// 13. LEGAL & SEGURIDAD
// ============================================================
nuevaPagina()
drawH1('13. Legal y seguridad')

drawH2('13.1. RGPD')
drawBullet('Política de Privacidad y Términos actualizadas con todos los servicios externos (DPAs firmados con Supabase, Vercel, Stripe, Resend, Anthropic, Sentry, Cloudflare).')
drawBullet('Saldea es ENCARGADO del tratamiento de los datos de los clientes que el usuario sube. Usuario es RESPONSABLE.')
drawBullet('Stripe Connect: deja claro que el usuario acepta los términos de Stripe Connected Account al conectar su cuenta.')
drawBullet('Multi-usuario: el owner es responsable de las acciones de sus miembros.')
drawBullet('WhatsApp: aclarado que es deep link (wa.me) y NO transmite datos a Meta.')

drawH2('13.2. Aislamiento del admin')
drawBullet('robots.txt: Disallow /admin y todas las rutas privadas.')
drawBullet('Sitemap.xml NO incluye /admin.')
drawBullet('Metadata noindex/nofollow en /admin/(protegido)/layout.tsx.')
drawBullet('0 enlaces visibles a /admin desde rutas accesibles por usuarios.')
drawBullet('Sistema de auth admin completamente separado de Supabase Auth.')

drawH2('13.3. Webhooks firmados')
drawBullet('Stripe webhook valida la firma con STRIPE_WEBHOOK_SECRET vía stripe.webhooks.constructEvent.')
drawBullet('Stripe Connect webhook valida con STRIPE_CONNECT_WEBHOOK_SECRET.')
drawBullet('Crons validan Authorization: Bearer <CRON_SECRET>.')
drawBullet('Invitaciones: token de 24 bytes hex generado con crypto.randomBytes, expira 7 días.')

drawH2('13.4. Storage privado')
drawBullet('Bucket facturas-pdf no público.')
drawBullet('RLS comprueba que la primera carpeta del path sea una org del usuario.')
drawBullet('Acceso a archivos vía URLs firmadas (createSignedUrl, expiran en 60s).')

// ============================================================
// 14. ESTADO Y PENDIENTES
// ============================================================
drawH1('14. Estado actual y pendientes')

drawH2('14.1. ✅ Vivo y funcionando')
drawBullet('Saldea desplegado en marsof.es con todas las funcionalidades.')
drawBullet('Stripe Connect en modo live (aprobado por Stripe).')
drawBullet('Stripe Saldea Pro (suscripción) live.')
drawBullet('Crons activos en Vercel.')
drawBullet('Resend con dominio verificado, region EU.')
drawBullet('Sentry conectado y capturando errores end-to-end.')
drawBullet('Panel admin marsof.es/admin.')
drawBullet('Modo claro/oscuro.')
drawBullet('Multi-usuario completo con roles, invitaciones, switcher de orgs.')
drawBullet('Onboarding wizard.')
drawBullet('Legal RGPD-compliant.')
drawBullet('Cuenta del owner limpia, lista para producción real.')

drawH2('14.2. 🟡 Código listo, pendiente activar')
drawBullet('/api/email-inbound: detección de respuestas por IA. Falta configurar receiving de emails (Cloudflare Email Routing o Resend Inbound) y mapear a este endpoint.')
drawBullet('Source maps en Sentry: subir SENTRY_AUTH_TOKEN a Vercel para que los stack traces sean contra código TypeScript original. Opcional pero útil.')

drawH2('14.3. 🔵 Etiquetadas "próximamente"')
drawBullet('Burofax automático al día X (requiere proveedor externo tipo Lleida.net, con coste 10-25€/envío).')
drawBullet('Vía judicial (preparar expediente para monitorio). Requiere trabajo legal, no solo código.')

drawH2('14.4. ⚡ Ideas futuras')
drawBullet('Open Banking (Tink/GoCardless): detectar automáticamente cobros bancarios.')
drawBullet('Recordatorios reales por WhatsApp Business API (ahora es deep link manual).')
drawBullet('Integración con Holded/Billin para importar facturas automáticamente.')
drawBullet('App móvil React Native (la web es responsive pero no nativa).')

nuevaPagina()
drawH1('15. Cómo arrancar en local')

drawCode(`# 1. Clonar
git clone git@github.com:carlos90inversiones/saldea.git
cd saldea

# 2. Dependencias
npm install

# 3. Variables de entorno
cp .env.local.example .env.local
# Rellenar las variables (ver sección 2.3)
# Mínimo para dev: Supabase + Anthropic + Resend

# 4. BD
# Las migraciones SQL están en supabase-*.sql del raíz
# Aplicar en orden o usar Supabase Migrations

# 5. Dev server (Turbopack)
npm run dev

# 6. Build producción
npm run build && npm run start`)

drawH2('15.1. Estructura de migraciones SQL')
drawCode(`supabase-schema.sql               # tablas base
supabase-configuracion.sql        # configuraciones_usuario
supabase-stripe-customer.sql      # stripe_*_id columns
supabase-respuestas-pausada.sql   # respuestas_clientes + pausada_hasta
supabase-plan-enforcement.sql     # triggers de límites Free
supabase-mejoras-cobro.sql        # link_pago, pdf_propio_path
# + migraciones aplicadas vía Management API en sesión:
#   - Tabla pagos + estado parcialmente_cobrada
#   - Multi-tenant: organizations, org_members, org_invites
#   - org_id en todas las tablas + helpers SQL
#   - Storage RLS por org_id`)

drawH2('15.2. Repos relacionados')
drawBullet('Repo principal: github.com/carlos90inversiones/saldea.')
drawBullet('Vercel project: cobrate (alias marsof.es).')
drawBullet('Supabase project: fqrlagpreazuuuwravbi.')
drawBullet('Stripe account: Marsof Technology (Connect platform: live).')

// Pie de página final
page.drawText(`Saldea by Marsof · Resumen técnico · pág. ${pageNum}`, {
  x: MARGIN_X,
  y: 30,
  size: 8,
  font: fontReg,
  color: COL_GRIS,
})
page.drawLine({
  start: { x: MARGIN_X, y: 45 },
  end: { x: PAGE_W - MARGIN_X, y: 45 },
  thickness: 0.5,
  color: COL_GRIS_TENUE,
})

// Guardar
const bytes = await doc.save()
const outPath = 'C:/Users/carlo/Downloads/Saldea-Marsof-Resumen-Tecnico.pdf'
writeFileSync(outPath, bytes)
console.log('✓ PDF generado:', outPath)
console.log('  Tamaño:', (bytes.length / 1024).toFixed(1), 'KB')
console.log('  Páginas:', doc.getPageCount())
