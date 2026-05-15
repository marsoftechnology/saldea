import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type Plan = 'free' | 'pro'

export const LIMITES_FREE = {
  facturasActivas: 3,
  clientes: 10,
  emailsMes: 30,
  tonoUnico: 'amigable' as const,
  miembrosEquipo: 1, // Free: solo el owner. Para invitar a otros hay que subir a Pro.
} as const

export const LIMITES_PRO = {
  miembrosEquipo: 10, // Pro: hasta 10 miembros incluidos. Más allá → pedir custom plan.
} as const

function getServiceClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/** Devuelve el plan del usuario. Si no tiene fila en configuraciones_usuario asume 'free'. */
export async function getUserPlan(userId: string, supabase?: SupabaseClient): Promise<Plan> {
  const client = supabase ?? getServiceClient()
  const { data } = await client
    .from('configuraciones_usuario')
    .select('plan')
    .eq('user_id', userId)
    .maybeSingle()
  return (data?.plan === 'pro' ? 'pro' : 'free')
}

/** Devuelve el plan de la organización (heredado de su owner). */
export async function getOrgPlan(orgId: string, supabase?: SupabaseClient): Promise<Plan> {
  const client = supabase ?? getServiceClient()
  const { data } = await client
    .from('configuraciones_usuario')
    .select('plan')
    .eq('org_id', orgId)
    .maybeSingle()
  return (data?.plan === 'pro' ? 'pro' : 'free')
}

/** Cuenta el total de miembros activos + invitaciones pendientes (cuentan ya hacia el límite). */
export async function contarAsientosOrg(orgId: string, supabase?: SupabaseClient): Promise<{ miembros: number; invitacionesPendientes: number; total: number }> {
  const client = supabase ?? getServiceClient()
  const [{ count: miembros }, { count: invitaciones }] = await Promise.all([
    client.from('org_members').select('*', { count: 'exact', head: true }).eq('org_id', orgId),
    client.from('org_invites').select('*', { count: 'exact', head: true }).eq('org_id', orgId).is('accepted_at', null).gt('expires_at', new Date().toISOString()),
  ])
  const m = miembros ?? 0
  const i = invitaciones ?? 0
  return { miembros: m, invitacionesPendientes: i, total: m + i }
}

/** Límite de miembros (miembros + invitaciones pendientes) según el plan de la org. */
export function limiteMiembrosOrg(plan: Plan): number {
  return plan === 'pro' ? LIMITES_PRO.miembrosEquipo : LIMITES_FREE.miembrosEquipo
}

/** Cuántos emails ha mandado este mes el usuario (sumando todas sus facturas). */
export async function emailsEnviadosEsteMes(userId: string, supabase?: SupabaseClient): Promise<number> {
  const client = supabase ?? getServiceClient()
  const primerDia = new Date()
  primerDia.setUTCDate(1)
  primerDia.setUTCHours(0, 0, 0, 0)

  // logs_email no tiene user_id, así que filtramos por las facturas del usuario.
  const { data: facturas } = await client
    .from('facturas')
    .select('id')
    .eq('user_id', userId)
  const ids = (facturas ?? []).map(f => f.id)
  if (ids.length === 0) return 0

  const { count } = await client
    .from('logs_email')
    .select('*', { count: 'exact', head: true })
    .in('factura_id', ids)
    .eq('estado', 'enviado')
    .gte('enviado_at', primerDia.toISOString())
  return count ?? 0
}
