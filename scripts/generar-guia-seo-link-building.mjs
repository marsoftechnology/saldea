// Genera guia SEO + Link Building en PDF al escritorio
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { writeFileSync } from 'node:fs'

const PAGE_W = 595.28
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

const doc = await PDFDocument.create()
doc.setTitle('Guia SEO Link Building Saldea')
doc.setAuthor('Marsof')

const fontReg = await doc.embedFont(StandardFonts.Helvetica)
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
const fontMono = await doc.embedFont(StandardFonts.Courier)

let page = doc.addPage([PAGE_W, PAGE_H])
let y = PAGE_H - MARGIN_TOP
let pageNum = 1

const REEMPLAZOS = [
  [/→/g, '->'], [/✅|✓/g, '[ok]'], [/❌/g, '[X]'], [/⚠/g, '[!]'],
  [/[\u{1F300}-\u{1FAFF}]/gu, ''], [/[\u{2600}-\u{27BF}]/gu, ''],
  [/–/g, '-'], [/—/g, '--'], [/…/g, '...'], [/'|'/g, "'"], [/"|"/g, '"'],
]
function s(t) {
  if (typeof t !== 'string') t = String(t)
  for (const [r, x] of REEMPLAZOS) t = t.replace(r, x)
  t = t.replace(/[^\x00-\xFF]/g, '')
  return t.replace(/  +/g, ' ')
}

function nuevaPag() {
  page.drawText(s(`Saldea SEO pag.${pageNum}`), { x: MARGIN_X, y: 30, size: 8, font: fontReg, color: COL_GRIS })
  page.drawLine({ start: { x: MARGIN_X, y: 45 }, end: { x: PAGE_W - MARGIN_X, y: 45 }, thickness: 0.5, color: COL_GRIS_TENUE })
  page = doc.addPage([PAGE_W, PAGE_H])
  pageNum++
  y = PAGE_H - MARGIN_TOP
}

function check(n) { if (y - n < MARGIN_BOTTOM + 30) nuevaPag() }

function wrap(t, f, sz, maxA) {
  t = s(t)
  const lin = []
  for (const p of t.split('\n')) {
    if (p === '') { lin.push(''); continue }
    const pal = p.split(' ')
    let act = ''
    for (const pa of pal) {
      const tst = act ? act + ' ' + pa : pa
      if (f.widthOfTextAtSize(tst, sz) > maxA && act) { lin.push(act); act = pa }
      else act = tst
    }
    if (act) lin.push(act)
  }
  return lin
}

function H1(t, c = COL_AZUL) {
  check(70); y -= 8
  page.drawRectangle({ x: MARGIN_X - 10, y: y - 28, width: PAGE_W - MARGIN_X * 2 + 20, height: 36, color: c })
  page.drawText(s(t), { x: MARGIN_X, y: y - 20, size: 18, font: fontBold, color: rgb(1, 1, 1) })
  y -= 50
}

function H2(t, c = COL_AZUL) {
  check(40); y -= 6
  page.drawText(s(t), { x: MARGIN_X, y, size: 14, font: fontBold, color: c })
  y -= 18
  page.drawLine({ start: { x: MARGIN_X, y: y + 4 }, end: { x: PAGE_W - MARGIN_X, y: y + 4 }, thickness: 0.6, color: c })
  y -= 8
}

function H3(t) {
  check(28); y -= 4
  page.drawText(s(t), { x: MARGIN_X, y, size: 11, font: fontBold, color: COL_NEGRO })
  y -= 16
}

function par(t) {
  const lin = wrap(t, fontReg, 10, PAGE_W - MARGIN_X * 2)
  for (const l of lin) { check(14); page.drawText(s(l), { x: MARGIN_X, y, size: 10, font: fontReg, color: COL_NEGRO }); y -= 14 }
  y -= 4
}

function bull(t) {
  check(13)
  page.drawText('-', { x: MARGIN_X + 4, y, size: 10, font: fontBold, color: COL_AZUL })
  const lin = wrap(t, fontReg, 9.5, PAGE_W - MARGIN_X * 2 - 14)
  let first = true
  for (const l of lin) {
    if (!first) check(13)
    page.drawText(s(l), { x: MARGIN_X + 14, y, size: 9.5, font: fontReg, color: COL_NEGRO })
    y -= 13
    first = false
  }
  y -= 1
}

function check_(t) {
  check(13)
  page.drawRectangle({ x: MARGIN_X + 2, y: y - 2, width: 8, height: 8, borderColor: COL_AZUL, borderWidth: 0.8 })
  const lin = wrap(t, fontReg, 9.5, PAGE_W - MARGIN_X * 2 - 16)
  let first = true
  for (const l of lin) {
    if (!first) check(13)
    page.drawText(s(l), { x: MARGIN_X + 16, y, size: 9.5, font: fontReg, color: COL_NEGRO })
    y -= 13
    first = false
  }
  y -= 1
}

function code(t) {
  const lin = t.split('\n')
  const pad = 8, lh = 11
  const alt = lin.length * lh + pad * 2
  check(alt + 5)
  page.drawRectangle({ x: MARGIN_X, y: y - alt + pad, width: PAGE_W - MARGIN_X * 2, height: alt, color: COL_FONDO, borderColor: COL_GRIS_TENUE, borderWidth: 0.5 })
  let cy = y - pad
  for (const l of lin) {
    cy -= lh
    page.drawText(s(l), { x: MARGIN_X + pad, y: cy + lh - 2, size: 8.5, font: fontMono, color: COL_NEGRO })
  }
  y -= alt + 4
}

function nota(t, c = COL_VERDE) {
  const ind = 10
  const alt = wrap(t, fontReg, 9, PAGE_W - MARGIN_X * 2 - ind - 6).length * 12 + 12
  check(alt)
  page.drawRectangle({ x: MARGIN_X, y: y - alt + 8, width: 3, height: alt - 4, color: c })
  const lin = wrap(t, fontReg, 9, PAGE_W - MARGIN_X * 2 - ind - 6)
  for (const l of lin) { check(12); page.drawText(s(l), { x: MARGIN_X + ind + 4, y, size: 9, font: fontReg, color: COL_GRIS }); y -= 12 }
  y -= 3
}

// =================== PORTADA ===================
page.drawRectangle({ x: 0, y: PAGE_H - 260, width: PAGE_W, height: 260, color: COL_AZUL })
page.drawText('GUIA SEO + LINK BUILDING', { x: MARGIN_X, y: PAGE_H - 100, size: 26, font: fontBold, color: rgb(1, 1, 1) })
page.drawText('Saldea - Como hacer que Google te encuentre', { x: MARGIN_X, y: PAGE_H - 140, size: 14, font: fontReg, color: rgb(0.85, 0.95, 1) })
page.drawText('Plan de accion sin gastar 1 euro', { x: MARGIN_X, y: PAGE_H - 170, size: 12, font: fontReg, color: rgb(0.85, 0.95, 1) })
page.drawText('Carlos Galvez - Marsof Technology - 16 mayo 2026', { x: MARGIN_X, y: PAGE_H - 220, size: 10, font: fontReg, color: rgb(0.85, 0.95, 1) })

y = PAGE_H - 300

H2('Que es esto')
par('Este PDF es el plan completo de SEO y link building para Saldea, organizado por semanas. Todo lo tecnico ya lo hice yo (Claude). Aqui estan SOLO las acciones que tienes que hacer tu manualmente.')
par('Tiempo estimado: 30-45 minutos a la semana durante 3 meses. Resultado esperado: marsof.es en top 10 de Google para 20-30 keywords de cobros antes de octubre.')

// =================== SEMANA 1 ===================
nuevaPag()
H1('Semana 1 - Configuracion base')

H2('Lunes - Google Search Console y Bing')
check_('Google Search Console - ya hecho (esta semana)')
check_('Bing Webmaster Tools: ve a bing.com/webmasters, login con Google, anade marsof.es, importa propiedades de Google Search Console. 5 min.')
nota('Bing es ~7% del trafico de busqueda en Espana. Gratis y se tarda 5 min.')

H2('Martes - Google Business Profile')
par('Crea tu perfil de empresa en Google (antes Google My Business). Aparece en busquedas locales y en Maps.')
check_('Ve a business.google.com')
check_('Anade "Marsof Technology" como nombre')
check_('Categoria: "Empresa de software" o "Servicios informaticos"')
check_('Direccion: Cartaya (Huelva). Si no quieres mostrarla, marca "presto servicios sin sede"')
check_('Web: https://www.marsof.es')
check_('Telefono y email de contacto')
check_('Verificacion: por carta postal (tarda 7-14 dias)')
nota('Esto te da resultado destacado cuando busquen "Marsof Saldea" o cuando busquen empresas de software en Huelva.')

H2('Miercoles - LinkedIn empresa')
par('Crea pagina de empresa de Marsof Technology en LinkedIn.')
check_('Ve a linkedin.com/company/setup/new')
check_('Nombre: Marsof Technology')
check_('Web: marsof.es')
check_('Sector: Software / Internet')
check_('Tamano: 1 empleado')
check_('Logo y banner: usa los de marsof.es')
check_('Descripcion: copia y pega el primer parrafo de marsof.es/saldea')
nota('LinkedIn cuenta como link de calidad alta para Google.')

H2('Jueves - X (Twitter) empresa')
check_('Crea cuenta @saldea_app o @marsof_es en x.com')
check_('Bio: "IA que persigue tus facturas impagadas. 1 mes gratis. marsof.es"')
check_('Web: https://marsof.es')
check_('Sigue a 50 cuentas de gestores, autonomos, asesorias fiscales')

// =================== SEMANA 2 ===================
nuevaPag()
H1('Semana 2 - Directorios SaaS y de productos')

par('Estos directorios son enlaces de autoridad que mejoran tu SEO Y traen trafico real. Casi todos son gratis.')

H2('Directorios gratis prioritarios')

H3('1. Product Hunt')
par('La principal plataforma de lanzamiento de productos. Mejor lanzar cuando tengas 5+ usuarios.')
check_('Crea cuenta en producthunt.com')
check_('Por ahora solo: completa tu perfil personal y empieza a comentar productos de otros. Te conocen.')
nota('Cuando estes listo (septiembre), me pides ayuda para preparar el lanzamiento. Importante.')

H3('2. AppSumo')
check_('Crea cuenta en appsumo.com como sumo-ling')
check_('Marca interes en la categoria "Productivity" y "Sales"')
par('Si vendes un lifetime deal aqui puedes hacer un boost importante. Lo veremos en Q4.')

H3('3. SaaSHub')
check_('Crea cuenta y anade Saldea en saashub.com')
check_('Categoria: Accounts Receivable / Invoice Management')

H3('4. AlternativeTo')
check_('Anade Saldea como alternativa a Chaser, Holded, Quipu en alternativeto.net')

H3('5. Capterra (Espana)')
check_('Crea perfil de vendor en capterra.es')
check_('Categoria: Software de cobranzas')
par('Es propiedad de Gartner. Mucho trafico de compradores B2B.')

H3('6. G2')
check_('Igual que Capterra pero internacional: g2.com')

H3('7. Software Suggest')
check_('softwaresuggest.com - listado gratis')

H3('8. Crozdesk')
check_('crozdesk.com - listado gratis')

H3('9. SoftDoit (Espana)')
check_('softdoit.com - 100% Espana')

H3('10. Comparasoftware')
check_('comparasoftware.com - LATAM y Espana')

H2('Directorios genericos (para enlace de calidad)')
check_('SaaSworthy - saasworthy.com')
check_('GetApp - getapp.es')
check_('Slashdot - slashdot.org/submission')
check_('TrustPilot - trustpilot.com (para que clientes futuros dejen reviews)')

// =================== SEMANA 3 ===================
nuevaPag()
H1('Semana 3 - Foros y comunidades')

par('Comentar en foros y comunidades de tu nicho es 100% gratis y genera trafico de calidad. NO spam. Aporta valor primero.')

H2('Foros y comunidades clave')

H3('Reddit')
bull('r/Autonomos - autonomos espanoles, muy activo')
bull('r/Spain - generalista pero util a veces')
bull('r/empresas - menos activo, ojo')
bull('r/saas - en ingles, util para Saldea como producto')
par('Regla de oro: 9 comentarios utiles ANTES de mencionar Saldea. Si no, banean.')

H3('Forocoches')
par('Si, parece broma pero en el subforo de Autonomos y empresas hay autonomos preguntando sobre cobros. Comenta como persona, no como vendedor.')

H3('LinkedIn (grupos)')
bull('Asesores Fiscales y Tributarios Espana')
bull('Gestores Administrativos de Espana')
bull('Autonomos y emprendedores Espana')

H3('Facebook (grupos)')
bull('Autonomos Espana')
bull('Asesorias y Gestorias - Profesionales')
bull('Mujeres autonomas')

H3('Quora')
par('Responde a preguntas como: "como reclamar una factura impagada", "cuanto es el interes de demora"...')
par('Linka a tus articulos del blog cuando aporten contexto util.')

H3('Indie Hackers')
check_('Crea cuenta en indiehackers.com')
check_('Comparte tu journey: "Estoy lanzando Saldea, una IA que persigue cobros..."')
par('Es comunidad de fundadores. Te dara feedback y posibles primeros usuarios.')

H2('Plan semanal de foros (30 min/semana)')
check_('Lunes: 3 comentarios utiles en Reddit (sin link)')
check_('Miercoles: 1 respuesta detallada en Quora (con link a articulo del blog)')
check_('Viernes: 1 post propio en LinkedIn o Indie Hackers')

// =================== SEMANA 4 ===================
nuevaPag()
H1('Semana 4 - Guest posts y prensa')

par('Conseguir que otras webs publiquen un articulo tuyo con un link a marsof.es es ORO para SEO. Esto se llama "guest posting".')

H2('Webs donde mandar guest posts')

H3('Blogs de fiscalidad y autonomos')
bull('infoautonomos.com - principal blog para autonomos en Espana')
bull('anfix.com/blog - software contable')
bull('quipu.com/blog')
bull('holded.com/blog')
bull('asesorlex.com')
bull('xn--gestoradministrativo-ekc.es')

H3('Como contactarlos')
par('Manda un email asi al editor (busca su email en LinkedIn o en la pagina "contacto" de su web):')
code(`Asunto: Idea para articulo invitado - "[titulo]"

Hola [nombre],

Leo vuestro blog desde hace tiempo y me parece muy util
para autonomos.

Soy Carlos Galvez, fundador de Saldea (marsof.es), una
herramienta SaaS de automatizacion de cobros. Me gustaria
contribuir con un articulo invitado para vuestros lectores.

Tres ideas concretas que aportarian valor:
1. "Como cobrar una factura impagada sin acabar en juicio"
2. "Calcular intereses de demora paso a paso (con plantilla)"
3. "Errores tipicos al reclamar a un moroso"

Si alguno te encaja, te lo redacto en 3-4 dias. Tendre
1 unico enlace en bio firmando como fundador de Saldea.

Gracias por leer este email!
Carlos`)

H2('Medios y prensa local')

par('Estos medios te dan autoridad y un enlace muy potente.')
bull('huelvainformacion.es - prensa local Huelva')
bull('elindependientedegranada.es')
bull('diariodesevilla.es - "Negocios" o "Emprendedores"')
bull('emprendedores.es')
bull('xataka.com - tecnologia, solo cuando tengas tractie')
bull('genbeta.com - software')

H3('Como contactarlos')
code(`Asunto: Nota de prensa - Saldea, primer SaaS espanol con
IA para cobros automaticos

Hola [periodista],

Soy Carlos Galvez, fundador de Marsof Technology.

Acabamos de lanzar Saldea, una herramienta que automatiza
el cobro de facturas impagadas usando IA. Es la primera
solucion en Espana que escala el tono del recordatorio
automaticamente y detecta respuestas de clientes con IA.

Datos:
- 1 mes de prueba gratis
- 49 EUR/mes despues
- Cumple Ley 3/2004 y RGPD
- Disponible en marsof.es

Si te encaja, te paso entrevista de 20 min, datos del
producto y un caso de uso real. Tambien tengo capturas
y video demo si los necesitas.

Gracias!
Carlos Galvez
fundador@marsof.es
+34 [tu telefono]`)

// =================== MES 2 ===================
nuevaPag()
H1('Meses 2-3 - Escalar lo que funciona')

H2('Acciones recurrentes (cada semana)')
check_('Lunes: comentar 5 posts en LinkedIn de tu nicho')
check_('Martes: pedir a Claude 1 articulo nuevo de blog')
check_('Miercoles: 1 post propio en LinkedIn')
check_('Jueves: revisar Google Search Console (clicks, impresiones, posicion)')
check_('Viernes: 1 guest post pitched o nuevo directorio')

H2('Que mirar en Google Search Console (15 min/semana)')
bull('Total impresiones - debe crecer cada semana')
bull('Total clicks - debe crecer despues de mes 2')
bull('Posicion media - bajar significa mejor')
bull('Top queries - palabras por las que apareces')
bull('Top pages - paginas que mas trafico atraen')

nota('No esperes resultados antes de 6-8 semanas. Google es lento pero seguro.')

H2('Senales de que va bien')
bull('Mes 1: 50-200 impresiones diarias en Google Search Console')
bull('Mes 2: 500-2000 impresiones diarias, primeros clicks reales')
bull('Mes 3: 2000-5000 impresiones, 10-50 clicks/dia, primeros registros')
bull('Mes 4-6: 5000-15000 impresiones, 100-500 clicks/dia, conversion real')

H2('Si NO va bien (alerta)')
bull('Mes 2 sin impresiones: revisa que el sitemap se este indexando')
bull('Mes 3 con impresiones pero 0 clicks: el titulo y description no atraen')
bull('Mes 4 con clicks pero 0 registros: la home y /saldea no convierten')

// =================== ATAJOS ===================
nuevaPag()
H1('Atajos que multiplican tu SEO', COL_VERDE)

H2('1. Pide reviews en G2/Capterra a tus primeros usuarios')
par('Cuando tengas 3+ usuarios usando Saldea, pideles que dejen una review en G2 o Capterra. Cada review es link de calidad alta.')

H2('2. Aparece en podcasts')
par('Manda email a podcasts de emprendedores: Itnig, Inkemia, Indie Maker en Espanol, El Tomahawk. 30 min de podcast = backlink + 50-500 oyentes potenciales.')

H2('3. Reescribe tus articulos en LinkedIn (texto largo)')
par('Cada articulo de tu blog hazlo articulo nativo de LinkedIn. Tarda 5 min, multiplica tu alcance x 5.')

H2('4. Wikipedia (avanzado)')
par('Si Marsof aparece en 2-3 medios serios, puedes crear un articulo en Wikipedia en espanol. Enlace de PageRank altisimo. Cuidado: hay que respetar las normas o lo borran.')

H2('5. Newsletter')
par('Crea una mini-newsletter mensual con tus 3 mejores articulos del mes. La envias a usuarios y a quien se suscriba. Cada email es un "toque" de marca.')

H2('Resumen ejecutivo')
nota('Si haces 30-45 min/semana de las tareas de este PDF durante 3 meses, marsof.es estara en el top 10 de Google para 20-30 keywords antes de octubre. Sin pagar 1 euro a nadie.', COL_VERDE)

par(' ')
par('Tu hacia delante con la gente y los foros.')
par('Yo a tu lado con el codigo, el blog y los analisis.')

page.drawText(s(`Saldea SEO pag.${pageNum}`), { x: MARGIN_X, y: 30, size: 8, font: fontReg, color: COL_GRIS })
page.drawLine({ start: { x: MARGIN_X, y: 45 }, end: { x: PAGE_W - MARGIN_X, y: 45 }, thickness: 0.5, color: COL_GRIS_TENUE })

const bytes = await doc.save()
writeFileSync('C:/Users/carlo/Desktop/Guia-SEO-Saldea.pdf', bytes)
console.log('PDF generado:', 'C:/Users/carlo/Desktop/Guia-SEO-Saldea.pdf')
console.log('Paginas:', doc.getPageCount())
