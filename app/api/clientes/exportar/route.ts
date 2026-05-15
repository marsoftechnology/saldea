import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generarCSV, csvResponse } from '@/lib/csv'

function isoHoy(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { data: clientes, error } = await supabase
    .from('clientes')
    .select('id, nombre, email, empresa, telefono, created_at')
    .eq('user_id', user.id)
    .order('nombre')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Para cada cliente, agregamos métricas de sus facturas
  const { data: facturasAll } = await supabase
    .from('facturas')
    .select('cliente_id, importe, estado')
    .eq('user_id', user.id)

  const facturasPorCliente = new Map<string, { cobrado: number; pendiente: number; total: number }>()
  for (const f of facturasAll ?? []) {
    const acc = facturasPorCliente.get(f.cliente_id) ?? { cobrado: 0, pendiente: 0, total: 0 }
    const importe = Number(f.importe)
    acc.total += 1
    if (f.estado === 'cobrada') acc.cobrado += importe
    else if (f.estado !== 'cancelada') acc.pendiente += importe
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
