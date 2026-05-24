import { createServiceRoleClient } from '@/lib/supabase-service'
import Link from 'next/link'

function formatearEuros(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function fechaCorta(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-ES')
}

export default async function AdminOrganizacionesPage() {
  const supabase = createServiceRoleClient()

  const { data: orgs } = await supabase
    .from('organizations')
    .select('id, name, owner_id, created_at, onboarding_completado_at')
    .order('created_at', { ascending: false })

  if (!orgs || orgs.length === 0) {
    return (
      <div className="p-8 max-w-5xl">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">🏛️ Organizaciones</h1>
        <p className="text-zinc-500 mt-4">No hay organizaciones aún.</p>
      </div>
    )
  }

  // Resolver datos por org en paralelo
  const orgIds = orgs.map(o => o.id)
  const [{ data: members }, { data: configs }, { data: facturas }, { data: pagos }] = await Promise.all([
    supabase.from('org_members').select('org_id, role').in('org_id', orgIds),
    supabase.from('configuraciones_usuario').select('org_id, plan, stripe_connect_account_id, stripe_connect_charges_enabled').in('org_id', orgIds),
    supabase.from('facturas').select('org_id, estado').in('org_id', orgIds),
    supabase.from('pagos').select('org_id, importe').in('org_id', orgIds),
  ])

  const ownerIds = Array.from(new Set(orgs.map(o => o.owner_id)))
  const ownersByid = new Map<string, string>()
  for (const uid of ownerIds) {
    try {
      const { data } = await supabase.auth.admin.getUserById(uid)
      if (data?.user?.email) ownersByid.set(uid, data.user.email)
    } catch { /* ignore */ }
  }

  const miembrosPorOrg = new Map<string, number>()
  for (const m of members ?? []) {
    miembrosPorOrg.set(m.org_id, (miembrosPorOrg.get(m.org_id) ?? 0) + 1)
  }
  const planPorOrg = new Map<string, { plan: string; stripeConectado: boolean }>()
  for (const c of configs ?? []) {
    planPorOrg.set(c.org_id, {
      plan: c.plan ?? 'free',
      stripeConectado: !!c.stripe_connect_account_id && !!c.stripe_connect_charges_enabled,
    })
  }
  const facturasPorOrg = new Map<string, { total: number; activas: number; cobradas: number }>()
  for (const f of facturas ?? []) {
    const cur = facturasPorOrg.get(f.org_id) ?? { total: 0, activas: 0, cobradas: 0 }
    cur.total += 1
    if (f.estado === 'cobrada') cur.cobradas += 1
    else if (f.estado !== 'cancelada') cur.activas += 1
    facturasPorOrg.set(f.org_id, cur)
  }
  const pagadoPorOrg = new Map<string, number>()
  for (const p of pagos ?? []) {
    pagadoPorOrg.set(p.org_id, (pagadoPorOrg.get(p.org_id) ?? 0) + Number(p.importe))
  }

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">🏛️ Organizaciones ({orgs.length})</h1>
        <p className="text-zinc-400 text-sm mt-1">Todas las cuentas activas · todos los productos</p>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="text-left px-4 py-3">Organización</th>
                <th className="text-left px-4 py-3">Propietario</th>
                <th className="text-left px-4 py-3">Plan</th>
                <th className="text-left px-4 py-3">Stripe</th>
                <th className="text-left px-4 py-3">Miembros</th>
                <th className="text-left px-4 py-3">Facturas</th>
                <th className="text-left px-4 py-3">Cobrado</th>
                <th className="text-left px-4 py-3">Onboarding</th>
                <th className="text-left px-4 py-3">Creada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orgs.map(o => {
                const planInfo = planPorOrg.get(o.id)
                const plan = planInfo?.plan ?? 'free'
                const facts = facturasPorOrg.get(o.id) ?? { total: 0, activas: 0, cobradas: 0 }
                return (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-100 font-medium">{o.name}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs font-mono">{ownersByid.get(o.owner_id) ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                        plan === 'pro' ? 'bg-sky-500/20 text-sky-300' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {planInfo?.stripeConectado
                        ? <span className="text-emerald-300">✓ conectado</span>
                        : <span className="text-zinc-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{miembrosPorOrg.get(o.id) ?? 0}</td>
                    <td className="px-4 py-3 text-zinc-300 text-xs">
                      {facts.total} <span className="text-zinc-600">({facts.activas} act · {facts.cobradas} cob)</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-300 text-xs">{formatearEuros(pagadoPorOrg.get(o.id) ?? 0)}</td>
                    <td className="px-4 py-3 text-xs">
                      {o.onboarding_completado_at
                        ? <span className="text-emerald-300">✓</span>
                        : <span className="text-amber-300">pendiente</span>}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">{fechaCorta(o.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
