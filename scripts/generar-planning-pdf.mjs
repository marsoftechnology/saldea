// Genera el Planning de Saldea de mayo a diciembre 2026
// Salida: C:/Users/carlo/Desktop/Planning-Saldea-2026.pdf

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'node:fs'

// ===== ESTILO =====
const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN_X = 50
const MARGIN_TOP = 60
const MARGIN_BOTTOM = 60

const COL_NEGRO = rgb(0.1, 0.1, 0.1)
const COL_GRIS = rgb(0.45, 0.45, 0.45)
const COL_GRIS_TENUE = rgb(0.75, 0.75, 0.75)
const COL_AZUL = rgb(0.024, 0.522, 0.78)
const COL_AZUL_CLARO = rgb(0.4, 0.7, 0.95)
const COL_VERDE = rgb(0.15, 0.5, 0.15)
const COL_VERDE_SUAVE = rgb(0.92, 0.97, 0.92)
const COL_NARANJA = rgb(0.85, 0.45, 0.1)
const COL_NARANJA_SUAVE = rgb(1.0, 0.95, 0.88)
const COL_ROJO = rgb(0.75, 0.15, 0.15)
const COL_FONDO = rgb(0.97, 0.97, 0.98)

const doc = await PDFDocument.create()
doc.setTitle('Planning Saldea · Mayo-Diciembre 2026')
doc.setAuthor('Marsof Technology')
doc.setSubject('Roadmap de captación y desarrollo - division TU vs CLAUDE')

const fontReg = await doc.embedFont(StandardFonts.Helvetica)
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
const fontItalic = await doc.embedFont(StandardFonts.HelveticaOblique)
const fontMono = await doc.embedFont(StandardFonts.Courier)

let page = doc.addPage([PAGE_W, PAGE_H])
let y = PAGE_H - MARGIN_TOP
let pageNum = 1

// Sanitizar caracteres no WinAnsi
const REEMPLAZOS = [
  [/→/g, '->'], [/←/g, '<-'], [/↳/g, ' '], [/▲/g, '^'], [/▼/g, 'v'],
  [/✓/g, '[ok]'], [/✅/g, '[OK]'], [/❌/g, '[X]'], [/⚠️/g, '[!]'], [/⚠/g, '[!]'],
  [/⚡/g, '*'], [/⏸/g, '[pause]'], [/⭐/g, '*'],
  [/🟢|🟡|🔵|🔴|🟠|🟣/g, '*'],
  [/[\u{1F300}-\u{1FAFF}]/gu, ''], [/[\u{2700}-\u{27BF}]/gu, ''], [/[\u{2600}-\u{26FF}]/gu, ''],
  [/–/g, '-'], [/—/g, '--'], [/…/g, '...'],
  [/'|'/g, "'"], [/"|"/g, '"'], [/«|»/g, '"'],
]
function sanitize(s) {
  if (typeof s !== 'string') s = String(s)
  for (const [re, rep] of REEMPLAZOS) s = s.replace(re, rep)
  s = s.replace(/[^\x00-\xFF]/g, '')
  return s.replace(/  +/g, ' ')
}

function nuevaPagina() {
  page.drawText(sanitize(`Planning Saldea 2026 · pag. ${pageNum}`), {
    x: MARGIN_X, y: 30, size: 8, font: fontReg, color: COL_GRIS,
  })
  page.drawLine({
    start: { x: MARGIN_X, y: 45 }, end: { x: PAGE_W - MARGIN_X, y: 45 },
    thickness: 0.5, color: COL_GRIS_TENUE,
  })
  page = doc.addPage([PAGE_W, PAGE_H])
  pageNum++
  y = PAGE_H - MARGIN_TOP
}

function checkSpace(necesario) {
  if (y - necesario < MARGIN_BOTTOM + 30) nuevaPagina()
}

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
      } else { actual = test }
    }
    if (actual) lineas.push(actual)
  }
  return lineas
}

function drawTexto(texto, opciones = {}) {
  const { size = 10, font = fontReg, color = COL_NEGRO, indent = 0, spacing = 1.4 } = opciones
  const maxAncho = PAGE_W - MARGIN_X * 2 - indent
  const lineas = wrap(texto, font, size, maxAncho)
  for (const linea of lineas) {
    checkSpace(size * spacing)
    page.drawText(sanitize(linea), { x: MARGIN_X + indent, y, size, font, color })
    y -= size * spacing
  }
}

function drawH1(texto, color = COL_AZUL) {
  checkSpace(70)
  y -= 8
  page.drawRectangle({
    x: MARGIN_X - 10, y: y - 28,
    width: PAGE_W - MARGIN_X * 2 + 20, height: 36,
    color,
  })
  page.drawText(sanitize(texto), { x: MARGIN_X, y: y - 20, size: 18, font: fontBold, color: rgb(1, 1, 1) })
  y -= 50
}

function drawH2(texto, color = COL_AZUL) {
  checkSpace(40)
  y -= 6
  page.drawText(sanitize(texto), { x: MARGIN_X, y, size: 14, font: fontBold, color })
  y -= 18
  page.drawLine({
    start: { x: MARGIN_X, y: y + 4 }, end: { x: PAGE_W - MARGIN_X, y: y + 4 },
    thickness: 0.6, color,
  })
  y -= 8
}

function drawH3(texto) {
  checkSpace(28)
  y -= 4
  page.drawText(sanitize(texto), { x: MARGIN_X, y, size: 11, font: fontBold, color: COL_NEGRO })
  y -= 16
}

function drawParrafo(texto, color = COL_NEGRO) {
  drawTexto(texto, { size: 10, color, spacing: 1.45 })
  y -= 4
}

function drawBullet(texto, color = COL_AZUL) {
  checkSpace(13)
  page.drawText('-', { x: MARGIN_X + 4, y, size: 10, font: fontBold, color })
  drawTexto(texto, { size: 9.5, indent: 14, spacing: 1.4 })
  y -= 1
}

function drawCheckbox(texto, indent = 0) {
  checkSpace(13)
  page.drawRectangle({
    x: MARGIN_X + 2 + indent, y: y - 2, width: 8, height: 8,
    borderColor: COL_AZUL, borderWidth: 0.8,
  })
  drawTexto(texto, { size: 9.5, indent: 16 + indent, spacing: 1.4 })
  y -= 1
}

function drawCode(texto) {
  const lineas = texto.split('\n')
  const padding = 8
  const lineHeight = 11
  const altura = lineas.length * lineHeight + padding * 2
  checkSpace(altura + 5)
  page.drawRectangle({
    x: MARGIN_X, y: y - altura + padding,
    width: PAGE_W - MARGIN_X * 2, height: altura,
    color: COL_FONDO, borderColor: COL_GRIS_TENUE, borderWidth: 0.5,
  })
  let cy = y - padding
  for (const linea of lineas) {
    cy -= lineHeight
    page.drawText(sanitize(linea), {
      x: MARGIN_X + padding, y: cy + lineHeight - 2,
      size: 8.5, font: fontMono, color: COL_NEGRO,
    })
  }
  y -= altura + 4
}

function drawTabla(headers, rows, anchos) {
  const totalAncho = PAGE_W - MARGIN_X * 2
  const cols = anchos.map(a => a * totalAncho)
  const rowH = 14
  checkSpace(rowH * (rows.length + 1) + 4)

  page.drawRectangle({ x: MARGIN_X, y: y - rowH + 3, width: totalAncho, height: rowH, color: COL_AZUL })
  let cx = MARGIN_X + 4
  headers.forEach((h, i) => {
    page.drawText(sanitize(h), { x: cx, y: y - 8, size: 9, font: fontBold, color: rgb(1, 1, 1) })
    cx += cols[i]
  })
  y -= rowH
  for (const row of rows) {
    checkSpace(rowH)
    cx = MARGIN_X + 4
    row.forEach((cell, i) => {
      const lineas = wrap(String(cell), fontReg, 8.5, cols[i] - 8)
      page.drawText(sanitize(lineas[0] ?? ''), {
        x: cx, y: y - 7, size: 8.5, font: fontReg, color: COL_NEGRO,
      })
      cx += cols[i]
    })
    page.drawLine({
      start: { x: MARGIN_X, y: y - rowH + 3 }, end: { x: MARGIN_X + totalAncho, y: y - rowH + 3 },
      thickness: 0.3, color: COL_GRIS_TENUE,
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
    x: MARGIN_X, y: y - altura + 8, width: 3, height: altura - 4, color,
  })
  drawTexto(texto, { size: 9, indent: indent + 4, color: COL_GRIS, spacing: 1.35 })
  y -= 3
}

// === NUEVO: tabla TU vs CLAUDE en dos columnas ===
function drawTuVsClaude(tuItems, claudeItems) {
  const totalAncho = PAGE_W - MARGIN_X * 2
  const colW = (totalAncho - 10) / 2 // 5px gap entre columnas
  const padding = 8
  const headerH = 22
  const lineH = 12

  // Calcular altura necesaria
  const tuLineas = tuItems.flatMap(t => wrap(t, fontReg, 9, colW - padding * 2 - 12))
  const claudeLineas = claudeItems.flatMap(t => wrap(t, fontReg, 9, colW - padding * 2 - 12))
  const tuAltura = headerH + tuItems.length * 6 + tuLineas.length * lineH + padding * 2
  const claudeAltura = headerH + claudeItems.length * 6 + claudeLineas.length * lineH + padding * 2
  const altura = Math.max(tuAltura, claudeAltura) + 10

  checkSpace(altura + 8)
  const yTop = y

  // === Columna TU (izquierda, naranja) ===
  const xTu = MARGIN_X
  page.drawRectangle({
    x: xTu, y: yTop - altura, width: colW, height: altura,
    color: COL_NARANJA_SUAVE, borderColor: COL_NARANJA, borderWidth: 0.8,
  })
  // Header
  page.drawRectangle({
    x: xTu, y: yTop - headerH, width: colW, height: headerH,
    color: COL_NARANJA,
  })
  page.drawText('TU (no delegable)', {
    x: xTu + padding, y: yTop - 15,
    size: 11, font: fontBold, color: rgb(1, 1, 1),
  })

  // Items TU
  let cy = yTop - headerH - padding - 2
  for (const item of tuItems) {
    const lineas = wrap(item, fontReg, 9, colW - padding * 2 - 12)
    // Checkbox
    page.drawRectangle({
      x: xTu + padding, y: cy - 8, width: 7, height: 7,
      borderColor: COL_NARANJA, borderWidth: 0.8,
    })
    let first = true
    for (const linea of lineas) {
      page.drawText(sanitize(linea), {
        x: xTu + padding + 12, y: cy - 7,
        size: 9, font: fontReg, color: COL_NEGRO,
      })
      cy -= lineH
      first = false
    }
    cy -= 4
  }

  // === Columna CLAUDE (derecha, verde) ===
  const xClaude = MARGIN_X + colW + 10
  page.drawRectangle({
    x: xClaude, y: yTop - altura, width: colW, height: altura,
    color: COL_VERDE_SUAVE, borderColor: COL_VERDE, borderWidth: 0.8,
  })
  page.drawRectangle({
    x: xClaude, y: yTop - headerH, width: colW, height: headerH,
    color: COL_VERDE,
  })
  page.drawText('CLAUDE (diselo y lo hace)', {
    x: xClaude + padding, y: yTop - 15,
    size: 11, font: fontBold, color: rgb(1, 1, 1),
  })

  cy = yTop - headerH - padding - 2
  for (const item of claudeItems) {
    const lineas = wrap(item, fontReg, 9, colW - padding * 2 - 12)
    // Marca verde (flecha)
    page.drawText('>', {
      x: xClaude + padding, y: cy - 7,
      size: 10, font: fontBold, color: COL_VERDE,
    })
    for (const linea of lineas) {
      page.drawText(sanitize(linea), {
        x: xClaude + padding + 12, y: cy - 7,
        size: 9, font: fontReg, color: COL_NEGRO,
      })
      cy -= lineH
    }
    cy -= 4
  }

  y = yTop - altura - 8
}

// ============================================================
// PORTADA
// ============================================================
page.drawRectangle({ x: 0, y: PAGE_H - 280, width: PAGE_W, height: 280, color: COL_AZUL })
page.drawText('PLANNING SALDEA', { x: MARGIN_X, y: PAGE_H - 100, size: 32, font: fontBold, color: rgb(1, 1, 1) })
page.drawText('Mayo - Diciembre 2026', { x: MARGIN_X, y: PAGE_H - 135, size: 20, font: fontReg, color: rgb(0.85, 0.95, 1) })
page.drawText('Hoja de ruta con division clara: TU vs CLAUDE', { x: MARGIN_X, y: PAGE_H - 180, size: 13, font: fontItalic, color: rgb(1, 1, 1) })
page.drawText('Cada mes sabes exactamente que haces tu y que delegas en mi', { x: MARGIN_X, y: PAGE_H - 200, size: 13, font: fontItalic, color: rgb(1, 1, 1) })

page.drawText('Carlos Galvez · Marsof Technology', { x: MARGIN_X, y: PAGE_H - 245, size: 11, font: fontReg, color: rgb(0.85, 0.95, 1) })
page.drawText('Generado el 16 de mayo de 2026', { x: MARGIN_X, y: PAGE_H - 262, size: 9, font: fontReg, color: rgb(0.7, 0.85, 0.95) })

y = PAGE_H - 320
drawH2('Como usar este documento', COL_NEGRO)
drawParrafo('Cada mes tiene un solo cuadro que importa: una tabla de dos columnas con TU (lo que NO puedes delegar) y CLAUDE (lo que me pides y lo hago yo). Asi siempre sabes a quien le toca cada cosa.')

y -= 6
// Mini ejemplo visual
drawTuVsClaude(
  ['Llamar por telefono a un lead caliente y cerrar la venta.', 'Hablar con un usuario para entender por que se va.'],
  ['Buscar 30 leads nuevos en una provincia con email publico.', 'Redactar un email de outreach personalizado para cada uno.']
)

drawParrafo('Las casillas naranjas son TUS tareas: marca cuando las completes. Las flechas verdes son ordenes que me das: abre el chat y pegame la frase entre comillas que aparece en cada mes.')

y -= 6
drawNota('Filosofia del plan: VALIDAR antes de escalar. Mejor 3 usuarios pagando que entiendes profundamente, que 100 emails fingiendo que estas creciendo. No te dejes llevar por las metricas de vanidad.', COL_VERDE)

// ============================================================
// RESUMEN EJECUTIVO
// ============================================================
nuevaPagina()
drawH1('Resumen ejecutivo')

drawH2('Estado actual (16 de mayo de 2026)')
drawBullet('App Saldea: VIVA en marsof.es. Cero usuarios reales todavia.')
drawBullet('Stripe Connect aprobado en modo LIVE. Listo para cobrar.')
drawBullet('Resend con dominio verificado (envio EU).')
drawBullet('Panel admin propio en marsof.es/admin para ver tus ingresos.')
drawBullet('Sentry para detectar errores antes que el usuario.')
drawBullet('Tu cuenta personal LIMPIA, lista para usarse como cualquier usuario.')

drawH2('Reparto general de responsabilidades')
drawTuVsClaude(
  [
    'Hablar con clientes: llamadas, WhatsApp, videocalls.',
    'Tomar decisiones de precio, posicionamiento y producto.',
    'Negociar con clientes grandes (plan Despacho).',
    'Mandar emails desde tu Gmail (revisar antes de enviar).',
    'Asistir a reuniones, eventos, networking.',
    'Llevar el Google Sheet de leads (actualizar estados).',
  ],
  [
    'Buscar leads en internet con email publico.',
    'Redactar borradores de emails de outreach personalizados.',
    'Escribir posts de blog, landings, copy de la web.',
    'Cambios de codigo: nuevas features, fixes, ajustes UI.',
    'Configurar Stripe, codigos de descuento, planes.',
    'Generar informes, casos de exito, dashboards.',
    'Responder dudas sobre objeciones, estrategia, marketing.',
  ]
)

drawH2('Objetivos del periodo (8 meses)')
drawTabla(
  ['Periodo', 'Meta usuarios', 'Meta MRR', 'Foco'],
  [
    ['Mayo-Junio', '5 beta', '0-150 EUR', 'Validacion, primeros casos'],
    ['Julio', '8 beta', '300 EUR', 'Push pre-vacaciones'],
    ['Agosto', '8 beta', '300 EUR', 'PAUSA, mantener felices a los actuales'],
    ['Septiembre', '15-20 pago', '700-1000 EUR', 'Lanzamiento real, contenido, outreach'],
    ['Oct-Nov', '25-35 pago', '1200-1700 EUR', 'Escalar canales que funcionen'],
    ['Diciembre', '30-40 pago', '1500-2000 EUR', 'Cierre, oferta black friday'],
  ],
  [0.18, 0.18, 0.18, 0.46]
)

drawNota('Si al llegar a septiembre tienes 5+ usuarios usando Saldea ACTIVAMENTE y al menos 2 PAGANDO, la validacion esta hecha. Lo demas es escalar lo que ya funciona.', COL_VERDE)

drawH2('Reglas de oro de los proximos 7 meses')
drawBullet('Nunca prometas funcionalidades que no existen para cerrar a un cliente.')
drawBullet('Cada usuario nuevo lo llamas TU PERSONALMENTE en los primeros 7 dias.')
drawBullet('Apunta TODO lo que te digan los usuarios. Eso vale oro.')
drawBullet('No te obsesiones con el codigo. El producto YA es bueno. Lo que falta es DISTRIBUCION.')
drawBullet('Si llegas a 10 pagando, tienes negocio. Si llegas a 50, ya puedes vivir de esto.')

// ============================================================
// MAYO (16-31)
// ============================================================
nuevaPagina()
drawH1('Mayo 2026 - segunda quincena')

drawH2('Objetivo del mes')
drawParrafo('Conseguir tus PRIMEROS 3 USUARIOS BETA gratis (o con descuento fundador 29 EUR/mes para siempre). No importa que paguen ahora: importa que USEN Saldea y te den feedback honesto.')

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Mandar 10 WhatsApps a tu red personal con la presentacion.',
    'Hacer 5 llamadas/videollamadas de 10 min a interesados.',
    'Llamar PERSONALMENTE a cada usuario nuevo en su primera semana.',
    'Anotar en libreta TODAS las objeciones que te digan.',
    'Crear el Google Sheet "Leads Saldea" y mantenerlo al dia.',
    'Revisar y enviar los borradores que te prepare Claude.',
  ],
  [
    'Buscar 30 gestorias de Huelva y Sevilla con email publico.',
    'Redactar borradores de email personalizados en tu Gmail.',
    'Preparar respuesta tipo a las objeciones que se repitan.',
    'Si detectas un bug urgente, te lo arreglo en codigo.',
    'Hacer pequenos ajustes de copy en la home si hace falta.',
  ]
)

drawH2('Tu plan semana a semana')

drawH3('Semana 19-25 mayo (TU haces)')
drawCheckbox('Mandar WhatsApp a 10 personas de tu red personal.')
drawCheckbox('Mandar 15 emails a gestorias de Huelva (lista en anexo).')
drawCheckbox('Crear el Google Sheet "Leads Saldea".')
drawCheckbox('Hacer 5 llamadas de presentacion (10 min) a interesados.')

drawH3('Semana 26-31 mayo (TU haces)')
drawCheckbox('Seguimiento a los emails sin contestar.')
drawCheckbox('Mandar 15 emails mas a asesorias de Sevilla.')
drawCheckbox('Si tienes 1+ usuario activo: llamarlo y preguntarle por su experiencia.')
drawCheckbox('Apuntar objeciones recurrentes en la libreta.')

drawH2('Frases para pedirme cosas')

drawH3('Si necesitas mas leads')
drawCode(`"Claude, busca 20 [tipo de empresas] de [zona]
con email publico de contacto."`)

drawH3('Si las objeciones se repiten')
drawCode(`"Claude, en los emails me dicen que '[objecion concreta]'.
Como deberia responder? Y como adapto la web
para anticiparme a esa objecion?"`)

drawH3('Si necesitas mejorar algo del producto')
drawCode(`"Claude, [Usuario X] me dijo que le gustaria poder
[funcionalidad]. Es facil de hacer? Cuanto tardarias?"`)

drawH2('Metricas a final de mes (31 de mayo)')
drawTabla(
  ['Metrica', 'Objetivo', 'Como medir'],
  [
    ['Emails enviados', '40-50', 'Tu Google Sheet'],
    ['Respuestas', '3-7', 'Tu Google Sheet'],
    ['Llamadas hechas', '3-5', 'Tu Google Sheet'],
    ['Cuentas creadas en Saldea', '3-5', 'marsof.es/admin'],
    ['Usuarios usando activamente', '1-3', 'marsof.es/admin'],
  ],
  [0.4, 0.2, 0.4]
)

// ============================================================
// JUNIO
// ============================================================
nuevaPagina()
drawH1('Junio 2026')

drawH2('Objetivo del mes')
drawParrafo('Pasar de 3 a 8 USUARIOS BETA. Tener al menos 2 PAGANDO. Recoger primer testimonio escrito.')

drawNota('Junio es buen mes: las gestorias terminan campana de Renta el 30 de junio y empiezan a respirar. Aprovecha la segunda quincena (16-30) para meter cana.', COL_VERDE)

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Mandar 20-30 emails/semana los martes y miercoles.',
    'Llamada de 30 min con cada usuario nuevo en su primera semana.',
    'Pedir testimonio escrito a usuarios activos (en persona o WA).',
    'Demo personalizada por Google Meet si alguien lo pide (15 min).',
    'Preguntar a beta gratis: "Cuanto pagarias por esto?"',
    'Revisar y enviar lo que Claude te prepare.',
  ],
  [
    'Buscar mas leads cada vez que se te acabe la tanda.',
    'Redactar borradores de outreach y de seguimiento.',
    'Una vez tengas testimonio, lo monto en la home de marsof.es.',
    'Preparar email automatico de aviso de agosto para usuarios.',
    'Arreglar bugs y feedback recurrente en el codigo.',
    'Escribir 1 post de LinkedIn semanal con tu tono.',
  ]
)

drawH2('Tu plan del mes (TU haces)')
drawCheckbox('20-30 emails nuevos por semana, martes y miercoles 10:00-11:30.')
drawCheckbox('Seguimiento a los que no contestaron en mayo.')
drawCheckbox('LinkedIn: publica 1 post a la semana sobre cobros, morosidad o gestoria.')
drawCheckbox('A los usuarios activos: pide UN testimonio escrito de 3 lineas.')
drawCheckbox('Llamada de 30 min con cada usuario nuevo en su primera semana.')
drawCheckbox('Pregunta sobre precio a beta gratis y a pagadores.')
drawCheckbox('Apunta TODAS las respuestas sobre precio. Decision: septiembre.')

drawH2('Frases para pedirme cosas')

drawH3('Para sacar testimonios en la home')
drawCode(`"Claude, [Usuario] me ha dado este testimonio:
'[testimonio textual]'. Anadelo a la landing de marsof.es
con foto/logo. Elegante y creible, no marketinero."`)

drawH3('Si detectas feedback recurrente')
drawCode(`"Claude, 3 usuarios me han dicho que [problema X].
Echa un ojo al codigo y dime que opciones tenemos
para arreglarlo."`)

drawH3('Para preparar agosto')
drawCode(`"Claude, ayudame a redactar un email automatico que
salga el 1 de agosto avisando a usuarios que en agosto
estoy de vacaciones pero la app sigue funcionando."`)

drawH2('Metricas a final de mes (30 de junio)')
drawTabla(
  ['Metrica', 'Objetivo'],
  [
    ['Total emails enviados (acumulado)', '100-150'],
    ['Usuarios registrados', '8-10'],
    ['Usuarios usando (>3 facturas)', '4-6'],
    ['Pagando', '2-3'],
    ['MRR', '100-150 EUR'],
    ['Testimonios escritos conseguidos', '1-2'],
  ],
  [0.6, 0.4]
)

// ============================================================
// JULIO
// ============================================================
nuevaPagina()
drawH1('Julio 2026')

drawH2('Objetivo del mes')
drawParrafo('Llegar a 8 usuarios usando activamente ANTES de las vacaciones. Cerrar negociaciones pendientes. Preparar TODO el material para el LANZAMIENTO REAL de septiembre.')

drawNota('Primera quincena (1-15 julio): ultima ola fuerte antes de agosto. Segunda quincena (16-31): producir contenido, dejar todo listo para septiembre.', COL_NARANJA)

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Llamar a los 5 leads mas calientes que tengas.',
    'Mandar emails de cierre con promo "ultima del verano".',
    'Si alguien dice "lo veo en septiembre" -> agendar LA cita YA.',
    'Revisar los posts y la landing /gestorias antes de publicar.',
    'Decidir el angulo de comunicacion para septiembre.',
  ],
  [
    'Escribir 5-8 posts de blog y publicarlos en marsof.es/blog.',
    'Disenar y publicar la landing marsof.es/gestorias.',
    'Programar los posts en LinkedIn para septiembre.',
    'Grabar el guion para una demo de 5 min (tu la grabas en video).',
    'Preparar lista de 100+ leads para atacar en septiembre.',
    'Optimizar la home con feedback recogido en junio.',
  ]
)

drawH2('Tu plan - Primera quincena (1-15 julio)')
drawCheckbox('Manda 30-40 emails de cierre a interesados sin convertir.')
drawCheckbox('Promo "ultima del verano": 50% descuento primer mes hasta el 15.')
drawCheckbox('Llama por telefono a los 5 leads mas calientes.')

drawH2('Tu plan - Segunda quincena (16-31 julio)')
drawCheckbox('Revisa y publica los posts de blog que Claude te prepare.')
drawCheckbox('Aprueba la landing /gestorias antes de hacerla publica.')
drawCheckbox('Graba un video corto (5 min) "como funciona Saldea". Loom o pantalla movil.')
drawCheckbox('Aprueba la lista de leads de septiembre que Claude te genere.')

drawH2('Frases para pedirme cosas')

drawH3('Para los posts del blog')
drawCode(`"Claude, escribeme un articulo de blog de 800 palabras
en espanol, tono cercano pero profesional, para marsof.es
sobre el tema: '[tema concreto]'. Incluye referencias a la
Ley 3/2004 donde toque. Publicalo en marsof.es/blog."`)

drawH3('Para la landing de gestorias')
drawCode(`"Claude, creame la pagina marsof.es/gestorias con copy
100% orientado a gestorias: hero claro, 3 problemas que
resolvemos, testimonios, precio claro, CTA registro."`)

drawH3('Para preparar la lista de septiembre')
drawCode(`"Claude, busca 50 gestorias y asesorias de
[provincia/region] con email publico. Dame tabla con
nombre, email, web y tamano aproximado."`)

drawH2('Metricas a final de mes (31 de julio)')
drawTabla(
  ['Metrica', 'Objetivo'],
  [
    ['Usuarios registrados', '12-15'],
    ['Pagando', '4-6'],
    ['MRR', '200-300 EUR'],
    ['Posts de blog publicados', '5-8'],
    ['Landing /gestorias publicada', 'Si'],
    ['Demos en video grabadas', '1+'],
    ['Lista de leads para septiembre', '100+'],
  ],
  [0.6, 0.4]
)

// ============================================================
// AGOSTO
// ============================================================
nuevaPagina()
drawH1('Agosto 2026 - PAUSA', COL_ROJO)

drawH2('Objetivo del mes')
drawParrafo('CERO outreach comercial. ESPANA ESTA DE VACACIONES. Cualquier email que mandes en agosto va al limbo. Aprovecha para descansar, recargar pilas y mantener felices a los usuarios actuales.')

drawNota('Si mandas emails frios en agosto, la entregabilidad se hunde y manchas tu reputacion de envio. Salta agosto entero. No hay excepciones.', COL_ROJO)

drawH2('Reparto del mes (minimo, es vacaciones)')
drawTuVsClaude(
  [
    'Atender a los usuarios actuales si te escriben (sin presion).',
    'Revisar el panel admin marsof.es/admin una vez por semana.',
    'Si te llega aviso de Sentry, abrir el chat y pedirme arreglarlo.',
    'Descansar de verdad. Esto es lo mas importante del mes.',
  ],
  [
    'Mandar el email automatico de aviso el 1 de agosto.',
    'Estar disponible si te llega un error urgente que arreglar.',
    'Si me pides "como va todo?", reviso Sentry y usuarios y te resumo.',
  ]
)

drawH2('Lo unico que SI debes hacer')
drawCheckbox('El 1 de agosto: comprobar que el email automatico salio bien.')
drawCheckbox('Revisar panel admin marsof.es/admin una vez por semana.')
drawCheckbox('Si llega un error grave a Sentry, abrir Claude y pedirme arreglarlo.')
drawCheckbox('Atender soporte a los usuarios actuales (sin presion).')

drawH2('Tareas opcionales (si tienes ganas)')
drawCheckbox('Anota ideas para 2027.')
drawCheckbox('Lee un libro sobre SaaS: "The Mom Test" de Rob Fitzpatrick, "Traction" de Gabriel Weinberg.')
drawCheckbox('Si tienes 5+ usuarios pagando: planifica demos en vivo para septiembre.')

drawH2('Frase tipo para esos dias')
drawCode(`"Claude, soy yo (Carlos). Solo entro a comprobar
que todo va bien. Hay errores recientes en Sentry?
Hay usuarios nuevos? Si hay algo urgente dime, si no
te dejo descansar tambien."`)

drawH2('Metricas a final de mes (31 de agosto)')
drawParrafo('Esto NO es un mes de medir, es un mes de respirar. Los numeros que te importan son: que tus usuarios actuales sigan activos y felices, y que no haya errores graves en Sentry.')

// ============================================================
// SEPTIEMBRE
// ============================================================
nuevaPagina()
drawH1('Septiembre 2026 - LANZAMIENTO REAL', COL_VERDE)

drawH2('Objetivo del mes')
drawParrafo('Este es TU MES DORADO. Vuelta al cole de las empresas. Las gestorias miran herramientas nuevas. Pasa de 6 a 15-20 usuarios PAGANDO. MRR 700-1000 EUR.')

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Llamar y cerrar a los 5 leads mas calientes (cita septiembre).',
    'Hacer las 4 demos en vivo de los martes (anuncialas en LinkedIn).',
    'Si haces Product Hunt: dar la cara, contestar comentarios.',
    'Llamar uno por uno a los usuarios nuevos.',
    'Decision final: que canal funcionona mejor.',
  ],
  [
    'Lanzar los 100+ emails preparados en julio (20-25/dia).',
    'Si lanzas Product Hunt: prepararte titulo, copy, primer comentario, lista de 30 contactos para upvote.',
    'Reactivar conversaciones de los "lo veo en septiembre" de julio (borradores).',
    'Ajustar copy de la home si el feedback te lo pide.',
    'Pedir y publicar 2-3 testimonios mas en la web.',
  ]
)

drawH2('Tu plan semana a semana (TU haces)')

drawH3('Semana 1 (1-7 septiembre) - calentamiento')
drawCheckbox('Revisa y envia los 100+ emails preparados (Claude te los dejo listos).')
drawCheckbox('Publica el primer post de blog en LinkedIn el martes 1.')
drawCheckbox('Reactiva conversaciones con los "lo veo en septiembre" de julio.')

drawH3('Semana 2 (8-14 septiembre) - empuje')
drawCheckbox('Demos en vivo: anuncialas en LinkedIn. 4 demos en total durante el mes.')
drawCheckbox('Si tienes 5+ usuarios pagando: lanza en PRODUCT HUNT un martes.')
drawCheckbox('Publica 2 posts mas de blog (Claude los redacta).')

drawH3('Semana 3-4 (15-30 septiembre) - escalado')
drawCheckbox('Si Product Hunt funciono, dobla el outreach.')
drawCheckbox('Considera Instantly.ai (~37 EUR/mes) para escalar cold emails.')
drawCheckbox('Cierra los 5 leads mas calientes con llamadas personales.')
drawCheckbox('Pide a 2-3 usuarios mas su testimonio para anadirlos a la web.')

drawH2('Frases para pedirme cosas')

drawH3('Si haces Product Hunt')
drawCode(`"Claude, voy a lanzar Saldea en Product Hunt el martes
[fecha]. Preparame: titulo, descripcion, primer comentario
para arrancar conversacion, y lista de 30 contactos para
pedirles upvote el dia D."`)

drawH3('Para ajustar la landing tras feedback')
drawCode(`"Claude, los usuarios nuevos me dicen que la home no
es clara en [aspecto X]. Reescribe el hero y la primera
seccion con un angulo mejor."`)

drawH2('Metricas a final de mes (30 de septiembre)')
drawTabla(
  ['Metrica', 'Objetivo'],
  [
    ['Total usuarios registrados', '40-60'],
    ['Pagando', '15-20'],
    ['MRR', '700-1000 EUR'],
    ['Posts blog publicados', '8-10'],
    ['Demos en vivo realizadas', '4'],
    ['Lanzamiento Product Hunt', 'Si/No (no obligatorio)'],
  ],
  [0.6, 0.4]
)

// ============================================================
// OCTUBRE
// ============================================================
nuevaPagina()
drawH1('Octubre 2026 - escalar lo que funciona', COL_VERDE)

drawH2('Objetivo del mes')
drawParrafo('Identificar QUE CANAL funcionona mejor (cold email, LinkedIn, SEO, referidos) y DUPLICAR esfuerzos. Pasar a 25-30 usuarios pagando, MRR 1200-1500 EUR.')

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Sentarte 30 min con tu Google Sheet y decidir el canal estrella.',
    'Decision: contratar Instantly.ai si el canal es cold email.',
    'Llamadas de 30 min a CADA usuario pagador (entender que les engancha).',
    'Personalmente activar referidos avisando a usuarios uno por uno.',
  ],
  [
    'Activar el email inbound en codigo + Cloudflare.',
    'Anadir sistema de referidos a la app (codigo unico, 1 mes gratis).',
    'Si SEO es tu canal: 2 posts de blog por semana optimizados.',
    'Anadir cuestionario in-app "que feature te falta?".',
    'Mantener flujo de leads constante (Claude busca, tu revisas).',
  ]
)

drawH2('Tu plan del mes (TU haces)')

drawH3('Decision estrategica (primer dia del mes)')
drawCheckbox('Balance del Google Sheet: de donde vienen los usuarios que pagan?')
drawCheckbox('Decide tus 3 canales TOP del mes. Ignora los demas.')

drawH3('Segun tu canal estrella')
drawBullet('Cold email -> contrata Instantly.ai o Smartlead. 200-500 emails/dia.')
drawBullet('LinkedIn -> 3 posts/semana, 10 comentarios/dia, 50 conexiones/semana.')
drawBullet('Boca a boca -> programa referidos: 1 mes gratis para ambos.')
drawBullet('SEO -> 2 posts/semana optimizados (Claude los escribe).')

drawH3('Producto')
drawCheckbox('Pide a Claude que active email inbound y configure Cloudflare.')
drawCheckbox('Pide a Claude el sistema de referidos.')
drawCheckbox('Si tienes 20+ usuarios: cuestionario in-app "que feature te falta?"')

drawH2('Frases para pedirme cosas')

drawH3('Activar email inbound')
drawCode(`"Claude, activame el email inbound. Configura
Cloudflare con la ruta que vaya a /api/email-inbound.
Hazme un PDF con los pasos si necesito hacer algo yo."`)

drawH3('Sistema de referidos')
drawCode(`"Claude, anademe un sistema de referidos a Saldea:
cada usuario genera un codigo unico, al registrarse con
ese codigo ambos consiguen 1 mes gratis."`)

drawH3('SEO content')
drawCode(`"Claude, escribe 4 posts de blog optimizados para
'modelo email reclamacion factura', 'como reclamar deuda
autonomo', 'ley 3/2004 morosidad', 'recordatorio impago'.
Publicalos en marsof.es/blog."`)

drawH2('Metricas a final de mes (31 de octubre)')
drawTabla(
  ['Metrica', 'Objetivo'],
  [
    ['Usuarios pagando', '25-30'],
    ['MRR', '1200-1500 EUR'],
    ['Canal estrella identificado', 'Si'],
    ['Sistema referidos activo', 'Si'],
    ['Cancelaciones (churn) acumuladas', '<3'],
  ],
  [0.6, 0.4]
)

// ============================================================
// NOVIEMBRE
// ============================================================
nuevaPagina()
drawH1('Noviembre 2026 - profundizar', COL_VERDE)

drawH2('Objetivo del mes')
drawParrafo('Llegar a 30-35 usuarios pagando. MRR 1500-1700 EUR. Empezar plan DESPACHO (99 EUR/mes para gestorias grandes con multi-usuario ilimitado).')

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Llamada 30 min a CADA pagador: "renovarias el ano que viene?"',
    'Demo personal del plan Despacho a 2 gestorias grandes.',
    'Hacer el webinar / charla online en directo (30 min + Q&A).',
    'Negociar un guest post en blogs de Anfix, Infoautonomos...',
    'Aprobar la promo Black Friday antes de que Claude la lance.',
  ],
  [
    'Crear plan Despacho (99 EUR) en Stripe y en la web.',
    'Crear codigo de descuento BLACK30 en Stripe.',
    'Escribir el caso de exito de tu mejor usuario.',
    'Generar banner Black Friday para la home.',
    'Redactar email a leads no convertidos con la promo.',
  ]
)

drawH2('Tu plan del mes (TU haces)')

drawH3('Outreach y conversion')
drawCheckbox('Si tu canal estrella es cold email: 400-500 emails/dia.')
drawCheckbox('Llamada de 30 min a CADA usuario pagador.')
drawCheckbox('Si tienes 2+ gestorias grandes: demo del "plan despacho".')

drawH3('Marketing')
drawCheckbox('Webinar / charla online: "Como recuperar facturas impagadas en 2027".')
drawCheckbox('Pide a Claude un caso de exito detallado de tu mejor usuario.')
drawCheckbox('Negocia un guest post en blogs/podcasts de fiscalidad.')

drawH3('Black Friday (27 noviembre)')
drawCheckbox('Pide a Claude el codigo BLACK30 (30% descuento, 25-30 nov).')
drawCheckbox('Manda email a tus leads no convertidos con la promo.')

drawH2('Frases para pedirme cosas')

drawH3('Codigo de Black Friday')
drawCode(`"Claude, crea en Stripe un codigo BLACK30 que aplique
30% en primera renovacion (anual o mensual). Valido
del 25 al 30 de noviembre 2026. Hazme banner para
la home avisando."`)

drawH3('Plan Despacho')
drawCode(`"Claude, anade un tercer plan 'Despacho' a 99 EUR/mes
/ 990 EUR/ano con: miembros ilimitados, soporte
prioritario, onboarding personalizado. Ponlo en la
pagina /saldea y crealo en Stripe."`)

drawH3('Caso de exito')
drawCode(`"Claude, [Usuario] de [empresa] ha recuperado [X EUR]
usando Saldea en [Y meses]. Escribeme caso de exito de
500 palabras formato 'historia' (antes - durante -
despues - resultado) y publicalo en marsof.es/casos-exito/[slug]."`)

drawH2('Metricas a final de mes (30 de noviembre)')
drawTabla(
  ['Metrica', 'Objetivo'],
  [
    ['Usuarios pagando', '30-35'],
    ['MRR', '1500-1700 EUR'],
    ['Casos de exito publicados', '2-3'],
    ['Plan Despacho contratado (al menos uno)', 'Si/No'],
    ['Conversiones Black Friday', '5-10'],
  ],
  [0.6, 0.4]
)

// ============================================================
// DICIEMBRE
// ============================================================
nuevaPagina()
drawH1('Diciembre 2026 - cierre y planificacion 2027', COL_AZUL)

drawH2('Objetivo del mes')
drawParrafo('Cerrar el ano con 35-40 usuarios pagando, MRR 1700-2000 EUR. Mas importante: tener clara la HOJA DE RUTA 2027 (que mejorar, que canales doblar, si contratar a alguien).')

drawH2('Reparto del mes')
drawTuVsClaude(
  [
    'Ultima ola de outreach: 100-150 emails con angulo "Empieza 2027".',
    'Email personal a cada usuario actual con resumen del 2026.',
    'Cita con tu asesor fiscal: presentar facturas Marsof, revisar IRPF/IVA.',
    'Decision: subir precio? Contratar a alguien? Internacional?',
    'Definir los 3 GRANDES OBJETIVOS de 2027.',
  ],
  [
    'Crear codigo NAVIDAD2026 en Stripe (2 meses gratis plan anual).',
    'Generar dashboard interno de cierre de ano: ingresos, churn, MRR.',
    'Redactar el resumen del 2026 para mandar a tus usuarios.',
    'Generar planning trimestral para 2027 cuando me lo pidas.',
    'Pausar outreach automatico del 22 dic al 7 ene.',
  ]
)

drawH2('Tu plan - Primera quincena')
drawCheckbox('Ultima ola de outreach hasta el 15 de diciembre.')
drawCheckbox('Promo navidad: 2 meses gratis al contratar plan anual.')
drawCheckbox('Email a TODOS tus usuarios con resumen del 2026.')

drawH2('Tu plan - Segunda quincena (vacaciones)')
drawCheckbox('Pausa el outreach del 22 diciembre al 7 enero.')
drawCheckbox('Hacer balance: ingresos vs costes (Stripe + Supabase + Vercel + Resend + Claude + Sentry).')
drawCheckbox('Cita con tu asesor fiscal.')
drawCheckbox('Define los 3 GRANDES OBJETIVOS para 2027.')

drawH2('Decisiones estrategicas que tomar')
drawBullet('Subir precio? Si tienes 35+ pagando sin quejas, sube de 49 a 59 EUR/mes para nuevos.')
drawBullet('Contratar a alguien? Si MRR > 2000 EUR, plantearte community manager o cierre comercial.')
drawBullet('Internacional? Probar Mexico o Argentina en Q1 2027?')
drawBullet('App nueva en Marsof? Si Saldea va bien, identifica el siguiente dolor.')

drawH2('Frases para pedirme cosas')

drawH3('Resumen del ano')
drawCode(`"Claude, hazme un dashboard interno en /admin con:
ingresos por mes 2026, evolucion usuarios, top 5
canales de adquisicion, churn rate, ticket medio,
MRR vs ARR. Exportable a PDF."`)

drawH3('Promo de navidad')
drawCode(`"Claude, crea promo navidad en Stripe: codigo
NAVIDAD2026 da 2 meses gratis en plan anual. Banner
en home y email a la lista de leads."`)

drawH3('Planificar 2027')
drawCode(`"Claude, basandote en lo que ha pasado este 2026,
generame un planning trimestral para 2027: Q1, Q2,
Q3, Q4. Realista, sin promesas exageradas. PDF al
escritorio."`)

drawH2('Metricas a final de ano (31 de diciembre)')
drawTabla(
  ['Metrica', 'Objetivo realista', 'Si va MUY bien'],
  [
    ['Usuarios pagando', '35-40', '60+'],
    ['MRR', '1700-2000 EUR', '3000+ EUR'],
    ['Ingresos acumulados ano', '8000-12000 EUR', '15000+ EUR'],
    ['Plan Despacho contratados', '1-2', '5+'],
    ['Tasa cancelacion mensual', '<5%', '<3%'],
    ['Tu salario hipotetico', '500-800 EUR/mes', '1500+ EUR/mes'],
  ],
  [0.3, 0.35, 0.35]
)

drawNota('Si llegas a fin de ano con MRR 1500 EUR/mes (18000 EUR/ano) Saldea esta VALIDADA. A partir de ahi, el siguiente nivel (vivir de ello) es escalar canales. La parte dificil es esa primera validacion.', COL_VERDE)

// ============================================================
// LISTA DE LEADS INICIAL
// ============================================================
nuevaPagina()
drawH1('Anexo - Lista de leads para arrancar')

drawParrafo('Lista de gestorias y asesorias reales en Andalucia para empezar tu outreach esta semana. Datos publicos extraidos de sus webs.')

drawH2('Gestorias - Huelva')
drawTabla(
  ['Empresa', 'Email', 'Tipo'],
  [
    ['Gestoria Espinosa Villaran', 'contacto@gestoriaespinosavillaran.es', 'Gestoria'],
    ['Ainte Gestoria', 'info@aintegestoria.es', 'Gestoria fiscal'],
    ['You Asesoria Huelva', 'info@youasesoria.com', 'Asesoria multi'],
    ['Taller de Finanzas', 'contabilidad@tallerdefinanzas.com', 'Asesoria'],
    ['Asesorias Huelva', 'info@asesorias-huelva.es', 'Asesoria'],
    ['Gestoria Ruben Maria', '(via web)', 'Gestoria fiscal'],
    ['Gestoria GEA3B', '(via web)', 'Gestoria multi'],
  ],
  [0.4, 0.4, 0.2]
)

drawH2('Asesorias fiscales - Sevilla')
drawTabla(
  ['Empresa', 'Email', 'Tipo'],
  [
    ['Cano Ruiz Asesores', 'asesoria@canoruiz.com', 'Asesoria fiscal'],
    ['Ruiz Prieto Asesores', 'eruizprieto@ruizprietoasesores.es', 'Asesoria pymes'],
    ['Asesoria Carmen Rodriguez', 'info@asesoriacarmenrodriguez.com', 'Laboral+fiscal'],
    ['GVV Asesores', '(via formulario web)', 'Asesoria'],
    ['Asesores del Aljarafe', '(via web)', 'Asesoria fiscal'],
    ['Medalva', '(via formulario)', 'Asesoria pymes'],
  ],
  [0.4, 0.4, 0.2]
)

drawNota('Esta lista es solo el punto de partida. Pidele a Claude que te encuentre 30-40 mas en cada provincia que quieras atacar.', COL_VERDE)

drawH2('Frase para pedirme mas leads')
drawCode(`"Claude, encuentrame 30 gestorias y asesorias de
[provincia] con su email de contacto publico. Tabla
con: nombre, email, tipo (gestoria/asesoria/laboral),
tamano aproximado."`)

drawH2('Como llevar el seguimiento (TU lo mantienes)')
drawCode(`Google Sheet con columnas:
- Nombre empresa
- Persona contacto (si la sabes)
- Email
- Provincia / Tipo
- Fecha 1er email
- Fecha 2o email (followup)
- Estado [Sin respuesta / Interesado / Demo / Cliente / No]
- Notas (cualquier cosa que te diga)

Revisa este sheet TODOS los viernes.
Es lo unico que separa un emprendedor en serio
de uno que mancha emails al azar.`)

// ============================================================
// CONSEJOS FINALES
// ============================================================
nuevaPagina()
drawH1('Consejos finales que valen mas que el resto del PDF', COL_VERDE)

drawH2('1. La regla de la magnifica obsesion')
drawParrafo('Tus primeros 10 usuarios son lo mas importante. Habla con ellos COMO SI FUERAN AMIGOS. WhatsApp, llamadas, cafe si vives en la misma ciudad. ESTO NO LO PUEDO HACER YO. Es 100% tuyo.')

drawH2('2. Cuanto vale tu tiempo')
drawParrafo('Si te pasas 2 horas optimizando un detalle del codigo en vez de mandar 10 emails de outreach, has elegido mal. Codigo Saldea YA esta hecho (y si hay algo que mejorar, me lo pides a mi). Cliente Saldea NO esta hecho.')

drawH2('3. Lo que YO no puedo hacer por ti')
drawBullet('Hablar por telefono con tus clientes (mi voz suena rara y no tengo intuicion humana).')
drawBullet('Mandar emails desde TU Gmail sin tu revision (riesgo de spam y de suspension).')
drawBullet('Asistir a reuniones presenciales o videocalls.')
drawBullet('Tomar la decision final de subir/bajar precio (es tuya, no mia).')
drawBullet('Cerrar una negociacion comercial dificil.')

drawH2('4. Lo que SI puedo hacer por ti (no dudes en pedirme)')
drawBullet('Buscar leads, redactar borradores, escribir copy.')
drawBullet('Cambiar codigo: features, bugs, ajustes de UI, integraciones.')
drawBullet('Configurar Stripe, Cloudflare, Resend, Sentry, Vercel.')
drawBullet('Generar informes, dashboards, casos de exito en PDF.')
drawBullet('Responder dudas estrategicas con criterio.')

drawH2('5. Si no funciona algo, no es porque "la idea sea mala"')
drawParrafo('Las ideas no son malas: SON MAL DISTRIBUIDAS. Si en septiembre solo tienes 5 usuarios pagando, no es que Saldea sea malo. Es que no has llegado a la gente correcta. CAMBIA el mensaje, NO el producto.')

drawH2('6. La regla del 80/20 del fundador SaaS')
drawParrafo('80% del tiempo: venta + customer success (hablar con usuarios, mandar emails, hacer demos). 20% del tiempo: producto (delegar a Claude). Esto se invierte solo cuando tienes 100+ usuarios pagando.')

drawH2('Lo que NO debes hacer estos 7 meses')
drawBullet('Anadir features que nadie te ha pedido.')
drawBullet('Redisenar la home cada semana.')
drawBullet('Comparar Saldea con Holded o ChatGPT cada dia.')
drawBullet('Bajar el precio porque "no te compran" sin investigar por que.')
drawBullet('Trabajar 12 horas el primer mes y quemarte. Esto es maraton.')
drawBullet('Contratar a alguien antes de tener 30+ usuarios pagando.')

drawH2('Una ultima cosa')
drawParrafo('Cuando te frustres (y te frustraras), recuerda que YA HAS HECHO lo mas dificil: el producto existe, esta vivo, funciona, y tu Stripe esta listo para cobrar dinero real. La mayoria de gente que dice "voy a montar una app" NUNCA llega a este punto.')
drawParrafo('Llegar a 0 clientes con la app construida es 80% del trabajo. Lo que viene ahora es repetir el mismo dia: 20 emails al dia (tu envias los que yo te redacto), 5 conversaciones a la semana, 1 mejora puntual cada quincena. Suena aburrido. Es lo que separa los productos que ganan dinero de los que no.')

drawParrafo(' ', COL_NEGRO)
drawNota('Buena suerte. A por todas. -- Tu hacia delante con la gente. Yo a tu lado con el codigo.', COL_AZUL)

// Pie de pagina final
page.drawText(sanitize(`Planning Saldea 2026 · pag. ${pageNum}`), {
  x: MARGIN_X, y: 30, size: 8, font: fontReg, color: COL_GRIS,
})
page.drawLine({
  start: { x: MARGIN_X, y: 45 }, end: { x: PAGE_W - MARGIN_X, y: 45 },
  thickness: 0.5, color: COL_GRIS_TENUE,
})

const bytes = await doc.save()
const outPath = 'C:/Users/carlo/Desktop/Planning-Saldea-2026.pdf'
writeFileSync(outPath, bytes)
console.log('PDF generado:', outPath)
console.log('Tamano:', (bytes.length / 1024).toFixed(1), 'KB')
console.log('Paginas:', doc.getPageCount())
