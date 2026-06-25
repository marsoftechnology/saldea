import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'

// GET /api/portal/[token] — devuelve datos públicos del portal del cliente
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  // Validar formato UUID
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!UUID_RE.test(token)) {
    return NextResponse.json({ error: 'Portal no encontrado' }, { status: 404 })
  }

  const supabase = createServiceRoleClient()

  // Buscar cliente por portal_token
  const { data: cliente } = await supabase
    .from('clientes')
    .select('id, nombre, empresa, email, org_id')
    .eq('portal_token', token)
    .maybeSingle()

  if (!cliente) {
    return NextResponse.json({ error: 'Portal no encontrado' }, { status: 404 })
  }

  // Obtener facturas pendientes / vencidas / parcialmente cobradas
  const { data: facturas } = await supabase
    .from('facturas')
    .select('id, numero, importe, estado, fecha_vencimiento, descripcion, link_pago, created_at')
    .eq('cliente_id', cliente.id)
    .eq('org_id', cliente.org_id)
    .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada'])
    .order('fecha_vencimiento', { ascending: true })

  // Pagos realizados para calcular pendiente real
  const facturaIds = (facturas ?? []).map(f => f.id)
  const { data: pagos } = facturaIds.length > 0
    ? await supabase
        .from('pagos')
        .select('factura_id, importe')
        .in('factura_id', facturaIds)
    : { data: [] as Array<{ factura_id: string; importe: number }> }

  const pagosPorFactura = new Map<string, number>()
  for (const p of pagos ?? []) {
    pagosPorFactura.set(p.factura_id, (pagosPorFactura.get(p.factura_id) ?? 0) + Number(p.importe))
  }

  const facturasConPendiente = (facturas ?? []).map(f => ({
    ...f,
    pagado: pagosPorFactura.get(f.id) ?? 0,
    pendiente: Math.max(0, Number(f.importe) - (pagosPorFactura.get(f.id) ?? 0)),
  }))

  // Info de la org (nombre empresa + logo)
  const { data: cfg } = await supabase
    .from('configuraciones_usuario')
    .select('nombre_empresa, logo_url, color_primario, iban, titular_cuenta')
    .eq('org_id', cliente.org_id)
    .maybeSingle()

  return NextResponse.json({
    cliente: {
      nombre: cliente.nombre,
      empresa: cliente.empresa ?? null,
    },
    org: {
      nombreEmpresa: cfg?.nombre_empresa ?? null,
      logoUrl: cfg?.logo_url ?? null,
      colorPrimario: cfg?.color_primario ?? '#0284c7',
      iban: cfg?.iban ?? null,
      titularCuenta: cfg?.titular_cuenta ?? null,
    },
    facturas: facturasConPendiente,
    totalPendiente: facturasConPendiente.reduce((s, f) => s + f.pendiente, 0),
  })
}
