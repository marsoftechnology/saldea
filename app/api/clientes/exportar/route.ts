import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generarCSV, csvResponse } from '@/lib/csv'
import { getActiveOrg } from '@/lib/auth-org'

function isoHoy(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data: clientes, error } = await supabase
    .from('clientes')
    .select('id, nombre, email, empresa, telefono, created_at')
    .eq('org_id', org.org_id)
    .order('nombre')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Para cada cliente, agregamos métricas de sus facturas — usando pagos reales
  const { data: facturasAll } = await supabase
    .from('facturas')
    .select('id, cliente_id, importe, estado')
    .eq('org_id', org.org_id)

  // Pagos reales por factura
  const { data: pagosAll } = await supabase
    .from('pagos')
    .select('factura_id, importe')
    .eq('org_id', org.org_id)
  const pagadoPorFactura = new Map<string, number>()
  for (const p of pagosAll ?? []) {
    pagadoPorFactura.set(p.factura_id, (pagadoPorFactura.get(p.factura_id) ?? 0) + Number(p.importe))
  }

  const facturasPorCliente = new Map<string, { cobrado: number; pendiente: number; total: number }>()
  for (const f of facturasAll ?? []) {
    const acc = facturasPorCliente.get(f.cliente_id) ?? { cobrado: 0, pendiente: 0, total: 0 }
    const importe = Number(f.importe)
    const pagado = pagadoPorFactura.get(f.id) ?? 0
    acc.total += 1
    acc.cobrado += pagado
    if (f.estado !== 'cancelada') {
      acc.pendiente += Math.max(0, importe - pagado)
    }
    facturasPorCliente.set(f.cliente_id, acc)
  }

  const filas = (clientes ?? []).map(c => {
    const stats = facturasPorCliente.get(c.id) ?? { cobrado: 0, pendiente: 0, total: 0 }
    return {
      nombre: c.nombre,
      empresa: c.empresa ?? '',
      email: c.email,
      telefono: c.telefono ?? '',
      facturas_totales: stats.total,
      cobrado_eur: stats.cobrado.toFixed(2).replace('.', ','),
      pendiente_eur: stats.pendiente.toFixed(2).replace('.', ','),
      cliente_desde: c.created_at?.slice(0, 10) ?? '',
    }
  })

  const csv = generarCSV(filas)
  return csvResponse(csv, `saldea_clientes_${isoHoy()}.csv`)
}
