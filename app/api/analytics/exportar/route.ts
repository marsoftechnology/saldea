import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()

  const { data: facturas } = await supabase
    .from('facturas')
    .select('id, numero, importe, estado, fecha_vencimiento, descripcion, created_at, fecha_cobro, cliente:clientes(nombre, email, empresa)')
    .eq('org_id', org.org_id)
    .order('created_at', { ascending: false })

  const { data: pagos } = await supabase
    .from('pagos')
    .select('factura_id, importe')
    .eq('org_id', org.org_id)

  const pagosPorFactura = new Map<string, number>()
  for (const p of pagos ?? []) {
    pagosPorFactura.set(p.factura_id, (pagosPorFactura.get(p.factura_id) ?? 0) + Number(p.importe))
  }

  const { data: logs } = await supabase
    .from('logs_email')
    .select('factura_id')
    .eq('org_id', org.org_id)

  const logsPorFactura = new Map<string, number>()
  for (const l of logs ?? []) {
    logsPorFactura.set(l.factura_id, (logsPorFactura.get(l.factura_id) ?? 0) + 1)
  }

  // Construir CSV
  const cabecera = [
    'Numero', 'Cliente', 'Empresa', 'Email', 'Importe (€)', 'Pagado (€)', 'Pendiente (€)',
    'Estado', 'Vencimiento', 'Fecha cobro', 'Recordatorios enviados', 'Descripcion', 'Creada',
  ]

  const filas = (facturas ?? []).map(f => {
    const cliente = f.cliente as unknown as { nombre: string; email: string; empresa: string | null } | null
    const pagado = pagosPorFactura.get(f.id) ?? 0
    const importe = Number(f.importe)
    const pendiente = Math.max(0, importe - pagado)
    const recordatorios = logsPorFactura.get(f.id) ?? 0

    return [
      f.numero,
      cliente?.nombre ?? '',
      cliente?.empresa ?? '',
      cliente?.email ?? '',
      importe.toFixed(2),
      pagado.toFixed(2),
      pendiente.toFixed(2),
      f.estado,
      f.fecha_vencimiento,
      f.fecha_cobro ?? '',
      recordatorios,
      (f.descripcion ?? '').replace(/[",\n\r]/g, ' '),
      f.created_at?.split('T')[0] ?? '',
    ]
  })

  const csv = [cabecera, ...filas]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n')

  const fecha = new Date().toISOString().split('T')[0]
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="saldea-facturas-${fecha}.csv"`,
    },
  })
}
