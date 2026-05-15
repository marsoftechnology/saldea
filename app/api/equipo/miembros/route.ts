import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getOrgPlan, limiteMiembrosOrg } from '@/lib/plan'

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  // Usamos service role para poder leer auth.users (email + nombre) de los miembros
  const admin = createServiceRoleClient()

  const { data: miembros } = await admin
    .from('org_members')
    .select('id, user_id, role, created_at')
    .eq('org_id', org.org_id)
    .order('created_at', { ascending: true })

  if (!miembros) return NextResponse.json({ miembros: [] })

  // Enriquecer con email + nombre desde auth.users
  const enriquecidos = await Promise.all(
    miembros.map(async (m) => {
      try {
        const { data: { user } } = await admin.auth.admin.getUserById(m.user_id)
        return {
          id: m.id,
          user_id: m.user_id,
          role: m.role,
          created_at: m.created_at,
          email: user?.email ?? '—',
          nombre: (user?.user_metadata?.nombre as string | undefined) ?? null,
          esTuYo: m.user_id === org.user_id,
        }
      } catch {
        return {
          id: m.id,
          user_id: m.user_id,
          role: m.role,
          created_at: m.created_at,
          email: '—',
          nombre: null,
          esTuYo: m.user_id === org.user_id,
        }
      }
    })
  )

  // Invitaciones pendientes
  const { data: invitaciones } = await admin
    .from('org_invites')
    .select('id, email, role, created_at, expires_at, accepted_at')
    .eq('org_id', org.org_id)
    .is('accepted_at', null)
    .order('created_at', { ascending: false })

  // Plan + límite de asientos
  const plan = await getOrgPlan(org.org_id, admin)
  const limite = limiteMiembrosOrg(plan)
  const usados = enriquecidos.length + (invitaciones?.length ?? 0)

  return NextResponse.json({
    miembros: enriquecidos,
    invitaciones: invitaciones ?? [],
    miRol: org.role,
    plan,
    limite,
    usados,
  })
}
