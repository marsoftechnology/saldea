// Lógica compartida de pagos parciales.
// Una factura puede tener varios pagos; el estado se calcula a partir de:
//   - SUM(pagos.importe)  vs  factura.importe

import type { SupabaseClient } from '@supabase/supabase-js'

const TOLERANCIA_CENTIMOS = 0.005 // por redondeos de coma flotante

export type ResumenPagos = {
  pagado: number
  pendiente: number
  estadoFinal: 'pendiente' | 'parcialmente_cobrada' | 'cobrada'
}

export function resumirPagos(importeFactura: number, totalPagado: number): ResumenPagos {
  const pendiente = Math.max(0, importeFactura - totalPagado)
  let estadoFinal: ResumenPagos['estadoFinal']
  if (totalPagado <= TOLERANCIA_CENTIMOS) estadoFinal = 'pendiente'
  else if (totalPagado + TOLERANCIA_CENTIMOS >= importeFactura) estadoFinal = 'cobrada'
  else estadoFinal = 'parcialmente_cobrada'
  return { pagado: totalPagado, pendiente, estadoFinal }
}

/**
 * Recalcula el estado de una factura según los pagos registrados y lo guarda.
 * Si la factura está 'cancelada' no se toca. Si está 'vencida' y la suma no llega
 * al total, mantenemos 'vencida' (no 'pendiente') ya que la fecha de vencimiento ya pasó.
 * Devuelve el nuevo estado.
 */
export async function recalcularEstadoFactura(
  supabase: SupabaseClient,
  facturaId: string
): Promise<string | null> {
  const { data: factura } = await supabase
    .from('facturas')
    .select('id, importe, estado, fecha_vencimiento')
    .eq('id', facturaId)
    .maybeSingle()

  if (!factura) return null
  if (factura.estado === 'cancelada') return factura.estado

  const { data: pagos } = await supabase
    .from('pagos')
    .select('importe')
    .eq('factura_id', facturaId)

  const totalPagado = (pagos ?? []).reduce((s, p) => s + Number(p.importe), 0)
  const importeFactura = Number(factura.importe)
  const resumen = resumirPagos(importeFactura, totalPagado)

  // Si está pagada totalmente → cobrada
  // Si está parcialmente pagada → parcialmente_cobrada
  // Si no hay pagos → respetar vencida si la fecha ya pasó, si no pendiente
  let nuevoEstado: string
  if (resumen.estadoFinal === 'cobrada') {
    nuevoEstado = 'cobrada'
  } else if (resumen.estadoFinal === 'parcialmente_cobrada') {
    nuevoEstado = 'parcialmente_cobrada'
  } else {
    // Sin pagos: respetar vencida/pendiente según fecha
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaVenc = new Date(factura.fecha_vencimiento)
    fechaVenc.setHours(0, 0, 0, 0)
    nuevoEstado = fechaVenc < hoy ? 'vencida' : 'pendiente'
  }

  if (nuevoEstado !== factura.estado) {
    await supabase.from('facturas').update({ estado: nuevoEstado }).eq('id', facturaId)
  }
  return nuevoEstado
}
