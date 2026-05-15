import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { LIMITES_FREE } from '@/lib/plan'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: todasFacturas } = await supabase
    .from('facturas').select('id, importe, estado').eq('user_id', user.id)

  const facturaIds = todasFacturas?.map(f => f.id) ?? []

  // Pagos del usuario para calcular cobrado real (incluye parciales)
  const { data: pagosUser } = await supabase
    .from('pagos')
    .select('factura_id, importe')
    .eq('user_id', user.id)
  const pagosPorFactura = new Map<string, number>()
  for (const p of pagosUser ?? []) {
    pagosPorFactura.set(p.factura_id, (pagosPorFactura.get(p.factura_id) ?? 0) + Number(p.importe))
  }
  const totalPagado = Array.from(pagosPorFactura.values()).reduce((s, v) => s + v, 0)

  const [{ data: facturas }, { data: clientes }, { count: logsCount }, { data: configPlan }] = await Promise.all([
    supabase.from('facturas').select('*, cliente:clientes(nombre, empresa)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('clientes').select('id').eq('user_id', user.id),
    facturaIds.length > 0
      ? supabase.from('logs_email').select('id', { count: 'exact', head: true }).in('factura_id', facturaIds)
      : Promise.resolve({ count: 0, data: null, error: null }),
    supabase.from('configuraciones_usuario').select('plan').eq('user_id', user.id).maybeSingle(),
  ])

  const plan = (configPlan?.plan === 'pro' ? 'pro' : 'free') as 'free' | 'pro'
  const facturasActivas = (todasFacturas ?? []).filter(f => f.estado === 'pendiente' || f.estado === 'vencida').length
  const numClientes = clientes?.length ?? 0
  const cercaDelLimite = plan === 'free' && (
    facturasActivas >= LIMITES_FREE.facturasActivas - 1 ||
    numClientes >= LIMITES_FREE.clientes - 1
  )

  const todas = todasFacturas ?? []
  // Total pendiente = suma de (importe - pagado) de facturas no cobradas y no canceladas
  const totalPendiente = todas
    .filter(f => f.estado !== 'cobrada' && f.estado !== 'cancelada')
    .reduce((acc, f) => acc + Math.max(0, Number(f.importe) - (pagosPorFactura.get(f.id) ?? 0)), 0)
  // Cobrado = suma real de pagos (incluye parciales)
  const totalCobrado = totalPagado
  const facturasVencidas = todas.filter(f => f.estado === 'vencida').length
  // Tasa de cobro: facturas con algún pago (cobradas + parciales) / total
  const facturasConPago = todas.filter(f => f.estado === 'cobrada' || f.estado === 'parcialmente_cobrada').length
  const tasaCobro = todas.length > 0 ? Math.round((facturasConPago / todas.length) * 100) : 0

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Panel de control</h1>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              plan === 'pro'
                ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                : 'bg-zinc-800/60 text-zinc-400 border border-white/10'
            }`}>
              Plan {plan}
            </span>
          </div>
          <p className="text-zinc-500 text-sm mt-1">Resumen de tus cobros · {numClientes} clientes · {todas.length} facturas</p>
        </div>
        {plan === 'free' && (
          <Link
            href="/ajustes#plan"
            className="text-sm font-bold text-zinc-900 bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded-lg transition-colors shadow-lg shadow-sky-500/20"
          >
            Subir a Pro · 49€/mes →
          </Link>
        )}
      </div>

      {cercaDelLimite && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <span className="text-amber-400 text-lg mt-0.5">⚠️</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-200">Estás cerca del límite del plan Free</p>
            <p className="text-xs text-amber-300/80 mt-1">
              {facturasActivas}/{LIMITES_FREE.facturasActivas} facturas activas · {numClientes}/{LIMITES_FREE.clientes} clientes ·
              {' '}máx. {LIMITES_FREE.emailsMes} emails/mes. Sube a Pro para quitarlos todos.
            </p>
          </div>
          <Link
            href="/ajustes#plan"
            className="text-xs font-bold text-amber-100 bg-amber-500/20 hover:bg-amber-500/30 px-3 py-2 rounded-lg whitespace-nowrap border border-amber-500/30"
          >
            Subir a Pro
          </Link>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Por cobrar</p>
          <p className="text-2xl font-bold text-white">{formatearEuros(totalPendiente)}</p>
          <p className="text-xs text-zinc-500 mt-1">{facturasVencidas} vencidas</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:border-sky-500/30 transition-colors">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Cobrado</p>
          <p className="text-2xl font-bold text-sky-400">{formatearEuros(totalCobrado)}</p>
          <p className="text-xs text-zinc-500 mt-1">{todas.filter(f => f.estado === 'cobrada').length} facturas</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Tasa de cobro</p>
          <p className="text-2xl font-bold text-white">{tasaCobro}%</p>
          <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full" style={{ width: `${tasaCobro}%` }} />
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">Recordatorios</p>
          <p className="text-2xl font-bold text-white">{logsCount ?? 0}</p>
          <p className="text-xs text-zinc-500 mt-1">emails automáticos</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <Link href="/facturas/nueva" className="bg-sky-500 text-zinc-900 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20">
          + Nueva factura
        </Link>
        <Link href="/clientes/nuevo" className="bg-white/[0.05] border border-white/10 text-zinc-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 transition-colors">
          + Nuevo cliente
        </Link>
      </div>

      {/* Últimas facturas */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-semibold text-white">Últimas facturas</h2>
          <Link href="/facturas" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">Ver todas →</Link>
        </div>

        {facturas && facturas.length > 0 ? (
          <div className="divide-y divide-white/5">
            {facturas.map(factura => (
              <Link key={factura.id} href={`/facturas/${factura.id}`} className="flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors">
                <div>
                  <p className="text-sm font-medium text-zinc-100">{(factura.cliente as { nombre: string })?.nombre}</p>
                  <p className="text-xs text-zinc-500">Factura {factura.numero} · Vence {formatearFecha(factura.fecha_vencimiento)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-zinc-100">{formatearEuros(factura.importe)}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${colorEstado(factura.estado)}`}>
                    {etiquetaEstado(factura.estado)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-500 text-sm mb-4">Aún no tienes facturas</p>
            <Link href="/facturas/nueva" className="text-sky-400 text-sm font-medium hover:underline">
              Crear tu primera factura →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
