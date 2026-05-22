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
    .select('id, importe, estado, fecha_vencimiento, fecha_cobro')
    .eq('id', facturaId)
    .maybeSingle()

  if (!factura) return null
  if (factura.estado === 'cancelada') return factura.estado

  const { data: pagos } = await supabase
    .from('pagos')
    .select('importe, fecha, created_at')
    .eq('factura_id', facturaId)
    .order('fecha', { ascending: false })

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

  // ── Mantener fecha_cobro coherente ──
  // Al pasar a 'cobrada' guardamos la fecha del pago que la completó.
  // Si baja de 'cobrada' a otro estado (ej: usuario elimina un pago), la limpiamos.
  const cambioEstado = nuevoEstado !== factura.estado
  const update: Record<string, unknown> = {}

  if (cambioEstado) update.estado = nuevoEstado

  if (nuevoEstado === 'cobrada' && !factura.fecha_cobro) {
    // Usar la fecha del último pago (la que completó la factura)
    const ultimoPago = pagos?.[0]
    const fechaCobro = ultimoPago?.fecha
      ? new Date(ultimoPago.fecha).toISOString()
      : ultimoPago?.created_at ?? new Date().toISOString()
    update.fecha_cobro = fechaCobro
  } else if (nuevoEstado !== 'cobrada' && factura.fecha_cobro) {
    update.fecha_cobro = null
  }

  if (Object.keys(update).length > 0) {
    await supabase.from('facturas').update(update).eq('id', facturaId)
  }

  return nuevoEstado
}
