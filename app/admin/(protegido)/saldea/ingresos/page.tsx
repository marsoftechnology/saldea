import { createServiceRoleClient } from '@/lib/supabase-service'
import Link from 'next/link'

function formatearEuros(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

export default async function AdminIngresosPage() {
  const supabase = createServiceRoleClient()

  // Suscripciones Pro (los ingresos REALES de Marsof)
  const { data: pros } = await supabase
    .from('configuraciones_usuario')
    .select('user_id, org_id, plan, stripe_customer_id, stripe_subscription_id, updated_at')
    .eq('plan', 'pro')

  const orgIds = (pros ?? []).map(p => p.org_id).filter(Boolean) as string[]
  const { data: orgs } = orgIds.length > 0
    ? await supabase.from('organizations').select('id, name, owner_id, created_at').in('id', orgIds)
    : { data: [] }
  const orgByid = new Map<string, { name: string; owner_id: string; created_at: string }>()
  for (const o of orgs ?? []) orgByid.set(o.id, o)

  // Resolver email del owner
  const ownerIds = Array.from(new Set((orgs ?? []).map(o => o.owner_id)))
  const emailByUser = new Map<string, string>()
  for (const uid of ownerIds) {
    try {
      const { data } = await supabase.auth.admin.getUserById(uid)
      if (data?.user?.email) emailByUser.set(uid, data.user.email)
    } catch { /* */ }
  }

  // Suposición: 49€/mes plan Pro mensual. (No tenemos columna interval persistida, así que estimamos.)
  const PRECIO_MES = 49
  const mrr = (pros ?? []).length * PRECIO_MES
  const arrEstimado = mrr * 12

  // Volumen procesado por Saldea = SUM(pagos) — esto es lo que cobran NUESTROS usuarios a sus clientes
  // (NO son ingresos de Marsof, pero da idea del uso)
  const { data: pagos } = await supabase.from('pagos').select('importe')
  const volumenProcesado = (pagos ?? []).reduce((s, p) => s + Number(p.importe), 0)

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/admin/saldea" className="text-xs text-zinc-500 hover:text-zinc-300">← Saldea</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">💰 Ingresos</h1>
        <p className="text-zinc-400 text-sm mt-1">Métricas financieras de Marsof + actividad de los usuarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-sky-500/20 to-sky-500/5 border border-sky-500/30 rounded-xl p-5">
          <p className="text-[10px] text-sky-300 uppercase tracking-wider mb-1 font-semibold">MRR estimado</p>
          <p className="text-3xl font-bold text-zinc-100">{formatearEuros(mrr)}</p>
          <p className="text-xs text-zinc-400 mt-1">{pros?.length ?? 0} suscripción{(pros?.length ?? 0) === 1 ? '' : 'es'} Pro × {PRECIO_MES}€/mes</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">ARR estimado</p>
          <p className="text-3xl font-bold text-zinc-100">{formatearEuros(arrEstimado)}</p>
          <p className="text-xs text-zinc-500 mt-1">MRR × 12</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Volumen procesado por usuarios</p>
          <p className="text-3xl font-bold text-zinc-100">{formatearEuros(volumenProcesado)}</p>
          <p className="text-xs text-zinc-500 mt-1">Total cobrado por todas las orgs a sus clientes (no es ingreso de Marsof)</p>
        </div>
      </div>

      {/* Lista de suscriptores Pro */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-sm font-semibold text-zinc-100">📋 Suscriptores Pro</h2>
        </div>
        {(pros ?? []).length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">Aún no hay suscriptores Pro.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="text-left px-4 py-3">Organización</th>
                  <th className="text-left px-4 py-3">Propietario</th>
                  <th className="text-left px-4 py-3">Stripe Customer</th>
                  <th className="text-left px-4 py-3">Stripe Subscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(pros ?? []).map((p, i) => {
                  const o = p.org_id ? orgByid.get(p.org_id) : null
                  const email = o ? emailByUser.get(o.owner_id) : '—'
                  return (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-zinc-100">{o?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{email ?? '—'}</td>
                      <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{p.stripe_customer_id ?? '—'}</td>
                      <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{p.stripe_subscription_id ?? '—'}</td>
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
