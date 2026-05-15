// Utilidades simples para generar CSV en memoria.
// Sigue RFC 4180: separador coma, comillas dobles para escapar, doblar las comillas internas.

function escapar(valor: unknown): string {
  if (valor === null || valor === undefined) return ''
  const s = String(valor)
  // Si contiene coma, salto de línea o comilla → envolver en comillas y duplicar las internas
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export function generarCSV(filas: Array<Record<string, unknown>>, columnas?: string[]): string {
  if (filas.length === 0) return ''
  const cols = columnas ?? Object.keys(filas[0])
  const cabecera = cols.map(escapar).join(',')
  const cuerpo = filas.map(fila => cols.map(c => escapar(fila[c])).join(',')).join('\r\n')
  // BOM UTF-8 para que Excel detecte la codificación correctamente
  return '﻿' + cabecera + '\r\n' + cuerpo
}

export function csvResponse(csv: string, nombre: string): Response {
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${nombre}"`,
      'Cache-Control': 'no-store',
    },
  })
}
