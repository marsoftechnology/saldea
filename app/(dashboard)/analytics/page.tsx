import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AnalyticsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: facturas } = await supabase
    .from('facturas')
    .select('id, numero, importe, estado, fecha_vencimiento, created_at, cliente:clientes(nombre, empresa)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const facturaIds = facturas?.map(f => f.id) ?? []

  const { data: logs } = facturaIds.length > 0
    ? await supabase.from('logs_email').select('id, asunto, enviado_at, factura_id').in('factura_id', facturaIds).order('enviado_at', { ascending: false }).limit(15)
    : { data: [] }

  const todas = facturas ?? []

  const cobradas = todas.filter(f => f.estado === 'cobrada')
  const pendientes = todas.filter(f => f.estado === 'pendiente')
  const vencidas = todas.filter(f => f.estado === 'vencida')

  const importeTotal = todas.reduce((s, f) => s + f.importe, 0)
  const importeCobrado = cobradas.reduce((s, f) => s + f.importe, 0)
  const importePendiente = pendientes.reduce((s, f) => s + f.importe, 0)
  const importeVencido = vencidas.reduce((s, f) => s + f.importe, 0)

  const tasaCobro = todas.length > 0 ? Math.round((cobradas.length / todas.length) * 100) : 0
  const tasaImporte = importeTotal > 0 ? Math.round((importeCobrado / importeTotal) * 100) : 0

  // Clientes con deuda pendiente
  const deudaPorCliente: Record<string, { nombre: string; empresa: string | null; importe: number; facturas: number }> = {}
  vencidas.concat(pendientes).forEach(f => {
    const c = f.cliente as unknown as { nombre: string; empresa: string | null }
    const key = c?.nombre ?? 'Desconocido'
    if (!deudaPorCliente[key]) deudaPorCliente[key] = { nombre: key, empresa: c?.empresa ?? null, importe: 0, facturas: 0 }
    deudaPorCliente[key].importe += f.importe
    deudaPorCliente[key].facturas += 1
  })
  const topDeudores = Object.values(deudaPorCliente).sort((a, b) => b.importe - a.importe).slice(0, 5)

  const estados = [
    { label: 'Cobradas', count: cobradas.length, importe: importeCobrado, color: 'bg-emerald-500/100', textColor: 'text-emerald-300' },
    { label: 'Pendientes', count: pendientes.length, importe: importePendiente, color: 'bg-yellow-400', textColor: 'text-amber-300' },
    { label: 'Vencidas', count: vencidas.length, importe: importeVencido, color: 'bg-red-400', textColor: 'text-rose-300' },
  ]

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Informes y análisis</h1>
        <p className="text-zinc-400 text-sm mt-1">Vista completa de tu actividad de cobros</p>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 border border-white/5 shadow-sm">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Total facturado</p>
          <p className="text-xl font-bold text-zinc-100">{formatearEuros(importeTotal)}</p>
          <p className="text-xs text-zinc-500 mt-1">{todas.length} facturas</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 border border-white/5 shadow-sm">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Cobrado</p>
          <p className="text-xl font-bold text-emerald-400">{formatearEuros(importeCobrado)}</p>
          <p className="text-xs text-zinc-500 mt-1">{cobradas.length} facturas</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 border border-white/5 shadow-sm">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Pendiente</p>
          <p className="text-xl font-bold text-amber-300">{formatearEuros(importePendiente + importeVencido)}</p>
          <p className="text-xs text-zinc-500 mt-1">{pendientes.length + vencidas.length} facturas</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 border border-white/5 shadow-sm">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Recordatorios</p>
          <p className="text-xl font-bold text-zinc-100">{logs?.length ?? 0}</p>
          <p className="text-xs text-zinc-500 mt-1">emails enviados</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Tasa de cobro */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <h2 className="font-semibold text-zinc-100 mb-4">Tasa de cobro</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-400">Por número de facturas</span>
                <span className="font-semibold text-zinc-100">{tasaCobro}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500/100 rounded-full transition-all" style={{ width: `${tasaCobro}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-400">Por importe</span>
                <span className="font-semibold text-zinc-100">{tasaImporte}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${tasaImporte}%` }} />
              </div>
            </div>
          </div>

          {/* Distribución */}
          <div className="mt-6 space-y-3">
            {estados.map(e => (
              <div key={e.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${e.color}`} />
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{e.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-zinc-100">{formatearEuros(e.importe)}</span>
                    <span className="text-xs text-zinc-500 ml-2">({e.count})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top deudores */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <h2 className="font-semibold text-zinc-100 mb-4">Clientes con deuda pendiente</h2>
          {topDeudores.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🎉</p>
              <p className="text-sm text-zinc-400">¡Sin deudas pendientes!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topDeudores.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{d.nombre}</p>
                    {d.empresa && <p className="text-xs text-zinc-500">{d.empresa}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-rose-400">{formatearEuros(d.importe)}</p>
                    <p className="text-xs text-zinc-500">{d.facturas} factura{d.facturas !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Historial de recordatorios */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-semibold text-zinc-100">Últimos recordatorios enviados</h2>
          <span className="text-xs text-zinc-500">{logs?.length ?? 0} en total</span>
        </div>
        {logs && logs.length > 0 ? (
          <div className="divide-y divide-white/5">
            {logs.map(log => {
              const factura = todas.find(f => f.id === log.factura_id)
              const cliente = factura?.cliente as { nombre: string; empresa: string | null } | undefined
              return (
                <div key={log.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-sm">✉️</div>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">{log.asunto}</p>
                      <p className="text-xs text-zinc-500">{cliente?.nombre ?? '—'}{factura ? ` · Factura ${factura.numero}` : ''}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-zinc-500">{formatearFecha(log.enviado_at)}</p>
                    {factura && (
                      <Link href={`/facturas/${factura.id}`} className="text-xs text-emerald-400 hover:underline">
                        Ver factura →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-500 text-sm">Aún no has enviado ningún recordatorio</p>
          </div>
        )}
      </div>

      {/* Tabla todas las facturas */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl mt-6">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-semibold text-zinc-100">Todas las facturas</h2>
          <Link href="/facturas" className="text-sm text-emerald-400 hover:underline">Gestionar →</Link>
        </div>
        {todas.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-zinc-500 text-sm">Sin facturas aún</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/30">
                <tr>
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium uppercase tracking-wide">Cliente</th>
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium uppercase tracking-wide">Factura</th>
                  <th className="text-left p-4 text-xs text-zinc-500 font-medium uppercase tracking-wide">Vencimiento</th>
                  <th className="text-right p-4 text-xs text-zinc-500 font-medium uppercase tracking-wide">Importe</th>
                  <th className="text-center p-4 text-xs text-zinc-500 font-medium uppercase tracking-wide">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {todas.map(f => {
                  const c = f.cliente as unknown as { nombre: string; empresa: string | null } | undefined
                  return (
                    <tr key={f.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-zinc-100">{c?.nombre ?? '—'}</p>
                        {c?.empresa && <p className="text-xs text-zinc-500">{c.empresa}</p>}
                      </td>
                      <td className="p-4 text-zinc-400">{f.numero}</td>
                      <td className="p-4 text-zinc-400">{formatearFecha(f.fecha_vencimiento)}</td>
                      <td className="p-4 text-right font-semibold text-zinc-100">{formatearEuros(f.importe)}</td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${colorEstado(f.estado)}`}>
                          {etiquetaEstado(f.estado)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
