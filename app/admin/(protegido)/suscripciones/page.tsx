import Link from 'next/link'
import { suscripcionesActivas } from '@/lib/admin-stripe'

function formatEuros(centimos: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(centimos / 100)
}

function fechaCorta(unix: number | null): string {
  if (!unix) return '—'
  return new Date(unix * 1000).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

function ETIQUETA_ESTADO(estado: string): { texto: string; color: string } {
  switch (estado) {
    case 'active': return { texto: 'Activa', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
    case 'trialing': return { texto: 'En trial', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' }
    case 'past_due': return { texto: 'Impago', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
    case 'canceled': return { texto: 'Cancelada', color: 'bg-zinc-700 text-zinc-400 border-white/10' }
    case 'unpaid': return { texto: 'Sin pagar', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
    case 'incomplete': return { texto: 'Incompleta', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' }
    default: return { texto: estado, color: 'bg-zinc-800 text-zinc-400 border-white/10' }
  }
}

export default async function AdminSuscripcionesPage() {
  const subs = await suscripcionesActivas()

  // Ordenar: trials primero, luego active, luego past_due, por fecha alta
  subs.sort((a, b) => {
    const orden = { trialing: 0, active: 1, past_due: 2 } as Record<string, number>
    const oa = orden[a.estado] ?? 3
    const ob = orden[b.estado] ?? 3
    if (oa !== ob) return oa - ob
    return b.altaUnix - a.altaUnix
  })

  const totalMensual = subs.filter(s => s.intervalo === 'month').reduce((s, x) => s + x.precioCentimos, 0)
  const totalAnual = subs.filter(s => s.intervalo === 'year').reduce((s, x) => s + x.precioCentimos, 0)

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">🔁 Suscripciones</h1>
        <p className="text-zinc-400 text-sm mt-1">Todas las suscripciones activas, en trial e impagas · todos los productos</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card label="Total activas" valor={String(subs.filter(s => s.estado === 'active' || s.estado === 'trialing').length)} />
        <Card label="En trial" valor={String(subs.filter(s => s.estado === 'trialing').length)} />
        <Card label="Mensuales" valor={`${subs.filter(s => s.intervalo === 'month').length} · ${formatEuros(totalMensual)}/mes`} />
        <Card label="Anuales" valor={`${subs.filter(s => s.intervalo === 'year').length} · ${formatEuros(totalAnual)}/año`} />
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        {subs.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">No hay suscripciones aún.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="text-left px-4 py-3">Cliente</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3">Plan</th>
                  <th className="text-right px-4 py-3">Precio</th>
                  <th className="text-left px-4 py-3">Alta</th>
                  <th className="text-left px-4 py-3">Próx. cobro</th>
                  <th className="text-left px-4 py-3">Notas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subs.map(s => {
                  const etiqueta = ETIQUETA_ESTADO(s.estado)
                  return (
                    <tr key={s.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-zinc-200 text-xs font-mono">{s.customerEmail ?? s.customerId}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${etiqueta.color}`}>
                          {etiqueta.texto}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-300 text-xs">{s.intervalo === 'year' ? 'Anual' : s.intervalo === 'month' ? 'Mensual' : s.intervalo}</td>
                      <td className="px-4 py-3 text-zinc-100 text-right">{formatEuros(s.precioCentimos)}</td>
                      <td className="px-4 py-3 text-zinc-500 text-xs">{fechaCorta(s.altaUnix)}</td>
                      <td className="px-4 py-3 text-zinc-500 text-xs">{fechaCorta(s.proximaRenovacionUnix)}</td>
                      <td className="px-4 py-3 text-xs">
                        {s.cancelaAlFinal && <span className="text-amber-300">⚠ Cancela al final del periodo</span>}
                        {s.trialFin && s.estado === 'trialing' && <span className="text-sky-300">Trial hasta {fechaCorta(s.trialFin)}</span>}
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

function Card({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-zinc-100">{valor}</p>
    </div>
  )
}
