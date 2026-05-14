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
