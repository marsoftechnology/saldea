import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function generarPDFFactura(params: {
  numero: string
  importe: number
  fechaVencimiento: string
  descripcion?: string | null
  clienteNombre: string
  clienteEmpresa?: string | null
  clienteEmail: string
  emisor: string
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage([595, 842])
  const { width, height } = page.getSize()

  const regular = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)

  const verde = rgb(0.059, 0.714, 0.443)
  const negro = rgb(0.1, 0.1, 0.1)
  const gris = rgb(0.5, 0.5, 0.5)
  const grisClaro = rgb(0.93, 0.93, 0.93)
  const blanco = rgb(1, 1, 1)

  page.drawRectangle({ x: 0, y: height - 110, width, height: 110, color: rgb(0.96, 0.99, 0.97) })
  page.drawText(params.emisor, { x: 50, y: height - 46, size: 20, font: bold, color: verde })
  page.drawText('FACTURA', { x: width - 180, y: height - 46, size: 20, font: bold, color: negro })
  page.drawText(`Nº ${params.numero}`, { x: width - 180, y: height - 68, size: 12, font: regular, color: gris })

  page.drawLine({ start: { x: 50, y: height - 120 }, end: { x: width - 50, y: height - 120 }, thickness: 1, color: grisClaro })

  page.drawText('FACTURADO A:', { x: 50, y: height - 150, size: 8, font: bold, color: gris })
  page.drawText(params.clienteNombre, { x: 50, y: height - 168, size: 13, font: bold, color: negro })
  let cy = height - 186
  if (params.clienteEmpresa) {
    page.drawText(params.clienteEmpresa, { x: 50, y: cy, size: 11, font: regular, color: gris })
    cy -= 16
  }
  page.drawText(params.clienteEmail, { x: 50, y: cy, size: 10, font: regular, color: gris })

  const fechaEmision = new Date().toLocaleDateString('es-ES')
  const fechaVenc = new Date(params.fechaVencimiento).toLocaleDateString('es-ES')
  page.drawText('FECHA EMISIÓN:', { x: width - 200, y: height - 150, size: 8, font: bold, color: gris })
  page.drawText(fechaEmision, { x: width - 200, y: height - 168, size: 12, font: regular, color: negro })
  page.drawText('VENCIMIENTO:', { x: width - 200, y: height - 198, size: 8, font: bold, color: gris })
  page.drawText(fechaVenc, { x: width - 200, y: height - 216, size: 12, font: bold, color: rgb(0.8, 0.1, 0.1) })

  const tableTop = height - 290
  page.drawRectangle({ x: 50, y: tableTop, width: width - 100, height: 28, color: verde })
  page.drawText('DESCRIPCIÓN', { x: 65, y: tableTop + 9, size: 9, font: bold, color: blanco })
  page.drawText('IMPORTE', { x: width - 140, y: tableTop + 9, size: 9, font: bold, color: blanco })

  page.drawRectangle({ x: 50, y: tableTop - 40, width: width - 100, height: 40, color: rgb(0.98, 0.98, 0.98) })
  const desc = (params.descripcion || `Servicios — Factura ${params.numero}`).substring(0, 65)
  page.drawText(desc, { x: 65, y: tableTop - 25, size: 10, font: regular, color: negro })

  const importeStr = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(params.importe)
  page.drawText(importeStr, { x: width - 140, y: tableTop - 25, size: 11, font: bold, color: negro })

  page.drawRectangle({ x: width - 205, y: tableTop - 112, width: 155, height: 48, color: verde })
  page.drawText('TOTAL A PAGAR', { x: width - 198, y: tableTop - 84, size: 8, font: bold, color: blanco })
  page.drawText(importeStr, { x: width - 198, y: tableTop - 102, size: 16, font: bold, color: blanco })

  page.drawLine({ start: { x: 50, y: 70 }, end: { x: width - 50, y: 70 }, thickness: 1, color: grisClaro })
  page.drawText('Generado automáticamente por Saldea (marsof.es) · Cobro automático de facturas', { x: 50, y: 52, size: 8, font: regular, color: gris })

  return doc.save()
}

export async function generarPDFBurofax(params: {
  numeroFactura: string
  importe: number
  fechaVencimiento: string
  diasVencida: number
  clienteNombre: string
  clienteEmpresa: string | null
  clienteEmail: string
  emisor: string
  descripcion?: string | null
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const page = doc.addPage([595, 842])
  const { width, height } = page.getSize()

  const regular = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)

  const negro = rgb(0.1, 0.1, 0.1)
  const gris = rgb(0.45, 0.45, 0.45)
  const grisClaro = rgb(0.93, 0.93, 0.93)
  const rojo = rgb(0.75, 0.1, 0.1)
  const rojoBg = rgb(0.99, 0.96, 0.96)
  const blanco = rgb(1, 1, 1)

  const fechaHoy = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
  const importeStr = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(params.importe)
  const vencimientoStr = new Date(params.fechaVencimiento).toLocaleDateString('es-ES')

  // Cabecera roja
  page.drawRectangle({ x: 0, y: height - 90, width, height: 90, color: rojo })
  page.drawText('BUROFAX ELECTRÓNICO', { x: 50, y: height - 38, size: 18, font: bold, color: blanco })
  page.drawText('REQUERIMIENTO FEHACIENTE DE PAGO', { x: 50, y: height - 60, size: 10, font: regular, color: rgb(1, 0.8, 0.8) })
  page.drawText(fechaHoy, { x: width - 200, y: height - 44, size: 10, font: regular, color: blanco })

  let y = height - 120

  // Remitente / Destinatario
  page.drawText('REMITENTE', { x: 50, y, size: 8, font: bold, color: gris })
  page.drawText('DESTINATARIO', { x: 310, y, size: 8, font: bold, color: gris })
  y -= 16

  page.drawText(params.emisor, { x: 50, y, size: 11, font: bold, color: negro })
  page.drawText(params.clienteNombre, { x: 310, y, size: 11, font: bold, color: negro })
  y -= 14

  if (params.clienteEmpresa) {
    page.drawText(params.clienteEmpresa, { x: 310, y, size: 10, font: regular, color: gris })
    y -= 14
  }
  page.drawText(params.clienteEmail, { x: 310, y, size: 9, font: regular, color: gris })
  y -= 30

  // Separador
  page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }, thickness: 0.5, color: grisClaro })
  y -= 24

  // Cuerpo de la carta
  const saludo = `Estimado/a ${params.clienteNombre},`
  page.drawText(saludo, { x: 50, y, size: 11, font: bold, color: negro })
  y -= 20

  const intro1 = 'Por medio del presente burofax electrónico, y de conformidad con la legislación vigente, le REQUIERO'
  const intro2 = 'FORMALMENTE el pago de la cantidad adeudada que se detalla a continuación:'
  page.drawText(intro1, { x: 50, y, size: 10, font: regular, color: negro })
  y -= 14
  page.drawText(intro2, { x: 50, y, size: 10, font: regular, color: negro })
  y -= 28

  // Caja de deuda
  page.drawRectangle({ x: 50, y: y - 82, width: width - 100, height: 92, color: rojoBg, borderColor: rojo, borderWidth: 0.8 })

  page.drawText('Factura n.º:', { x: 70, y: y - 14, size: 9, font: bold, color: gris })
  page.drawText(params.numeroFactura, { x: 200, y: y - 14, size: 10, font: bold, color: negro })

  if (params.descripcion) {
    page.drawText('Concepto:', { x: 70, y: y - 30, size: 9, font: bold, color: gris })
    page.drawText(params.descripcion.substring(0, 55), { x: 200, y: y - 30, size: 10, font: regular, color: negro })
  }

  page.drawText('Vencimiento:', { x: 70, y: y - 46, size: 9, font: bold, color: gris })
  page.drawText(vencimientoStr, { x: 200, y: y - 46, size: 10, font: regular, color: negro })

  page.drawText('Días impago:', { x: 70, y: y - 62, size: 9, font: bold, color: gris })
  page.drawText(`${params.diasVencida} días`, { x: 200, y: y - 62, size: 10, font: bold, color: rojo })

  page.drawText('IMPORTE RECLAMADO:', { x: width - 280, y: y - 14, size: 9, font: bold, color: gris })
  page.drawText(importeStr, { x: width - 280, y: y - 34, size: 22, font: bold, color: rojo })

  y -= 110

  // Plazo y consecuencias
  const plazo1 = 'Le concedo un plazo de SIETE (7) DÍAS HÁBILES desde la recepción del presente burofax para'
  const plazo2 = 'proceder al pago íntegro de la cantidad adeudada. En caso contrario, me reservo el derecho a:'
  page.drawText(plazo1, { x: 50, y, size: 10, font: regular, color: negro })
  y -= 14
  page.drawText(plazo2, { x: 50, y, size: 10, font: regular, color: negro })
  y -= 22

  const consecuencias = [
    '1.  Iniciar reclamación judicial por procedimiento monitorio (art. 812 LEC).',
    '2.  Reclamar intereses de demora al tipo legal vigente (Ley 3/2004 de morosidad comercial).',
    '3.  Exigir el resarcimiento de las costas y gastos judiciales al deudor.',
    '4.  Comunicar la deuda a los ficheros de solvencia (ASNEF, RAI) legalmente habilitados.',
  ]
  for (const c of consecuencias) {
    page.drawText(c, { x: 70, y, size: 10, font: regular, color: rojo })
    y -= 16
  }
  y -= 14

  page.drawText('Sin otro particular, quedo a la espera de su respuesta en el plazo indicado.', { x: 50, y, size: 10, font: regular, color: negro })
  y -= 30
  page.drawText('Atentamente,', { x: 50, y, size: 10, font: regular, color: negro })
  y -= 18
  page.drawText(params.emisor, { x: 50, y, size: 13, font: bold, color: negro })

  // Footer
  page.drawLine({ start: { x: 50, y: 55 }, end: { x: width - 50, y: 55 }, thickness: 0.5, color: grisClaro })
  page.drawText(
    `Burofax electrónico certificado enviado mediante Saldea (marsof.es) con validez legal · ${new Date().toISOString()}`,
    { x: 50, y: 38, size: 7.5, font: regular, color: gris }
  )

  return doc.save()
}
