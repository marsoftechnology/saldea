import { createServiceRoleClient } from '@/lib/supabase-service'
import Link from 'next/link'

function fechaCorta(iso: string | undefined | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
}

export default async function AdminUsuariosPage() {
  const supabase = createServiceRoleClient()

  // Listar todos los usuarios (paginado por seguridad por si hay miles)
  const { data } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })
  const usuarios = data?.users ?? []

  // Para cada usuario buscar sus orgs (como miembro) y datos básicos
  const userIds = usuarios.map(u => u.id)
  const { data: members } = userIds.length > 0
    ? await supabase
        .from('org_members')
        .select('user_id, role, org_id, org:organizations(name)')
        .in('user_id', userIds)
    : { data: [] }

  // Supabase devuelve org como objeto (relación to-one) o array según pestañas — normalizamos
  type Member = { user_id: string; role: string; org_id: string; nombreOrg: string }
  const orgsPorUsuario = new Map<string, Member[]>()
  for (const raw of (members ?? []) as unknown as Array<{ user_id: string; role: string; org_id: string; org: { name?: string } | { name?: string }[] | null }>) {
    const orgObj = Array.isArray(raw.org) ? raw.org[0] : raw.org
    const member: Member = {
      user_id: raw.user_id,
      role: raw.role,
      org_id: raw.org_id,
      nombreOrg: orgObj?.name ?? '—',
    }
    const arr = orgsPorUsuario.get(member.user_id) ?? []
    arr.push(member)
    orgsPorUsuario.set(member.user_id, arr)
  }

  // Plan por usuario (desde configuraciones_usuario)
  const { data: configs } = userIds.length > 0
    ? await supabase
        .from('configuraciones_usuario')
        .select('user_id, plan, stripe_customer_id')
        .in('user_id', userIds)
    : { data: [] }
  const planPorUsuario = new Map<string, { plan: string; stripeCustomer: string | null }>()
  for (const c of configs ?? []) {
    planPorUsuario.set(c.user_id, { plan: c.plan ?? 'free', stripeCustomer: c.stripe_customer_id ?? null })
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/admin/saldea" className="text-xs text-zinc-500 hover:text-zinc-300">← Saldea</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">👥 Usuarios ({usuarios.length})</h1>
        <p className="text-zinc-400 text-sm mt-1">Todos los usuarios registrados en Saldea</p>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Nombre</th>
                <th className="text-left px-4 py-3">Plan</th>
                <th className="text-left px-4 py-3">Organizaciones</th>
                <th className="text-left px-4 py-3">Registro</th>
                <th className="text-left px-4 py-3">Último login</th>
                <th className="text-left px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usuarios.map(u => {
                const orgs = orgsPorUsuario.get(u.id) ?? []
                const planInfo = planPorUsuario.get(u.id)
                const plan = planInfo?.plan ?? 'free'
                const nombre = (u.user_metadata?.nombre as string | undefined) ?? '—'
                const confirmado = !!u.email_confirmed_at
                return (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-100 font-mono text-xs">{u.email}</td>
                    <td className="px-4 py-3 text-zinc-300">{nombre}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                        plan === 'pro' ? 'bg-sky-500/20 text-sky-300' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">
                      {orgs.length === 0 ? '—' : orgs.map(m => (
                        <div key={m.org_id}>
                          {m.nombreOrg} <span className="text-zinc-600">({m.role})</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">{fechaCorta(u.created_at)}</td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">{fechaCorta(u.last_sign_in_at)}</td>
                    <td className="px-4 py-3">
                      {confirmado ? (
                        <span className="text-[10px] text-emerald-300">✓ confirmado</span>
                      ) : (
                        <span className="text-[10px] text-amber-300">⏳ sin confirmar</span>
                      )}
                    </td>
                  </tr>
                )
              })}
              {usuarios.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-zinc-500">No hay usuarios aún.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
