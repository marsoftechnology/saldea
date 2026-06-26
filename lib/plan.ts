import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type Plan = 'free' | 'pro' | 'max'

export const LIMITES_FREE = {
  facturasActivas: 3,
  clientes: 10,
  emailsMes: 30,
  tonoUnico: 'amigable' as const,
  miembrosEquipo: 1, // Free: solo el owner. Para invitar a otros hay que subir a Pro.
} as const

export const LIMITES_PRO = {
  miembrosEquipo: 10, // Pro: hasta 10 miembros incluidos.
} as const

export const LIMITES_MAX = {
  miembrosEquipo: 25, // Max: hasta 25 miembros + burofax + dominio propio.
  // burofax: pago por uso — 6€/ud vía Stripe + lleida.net, sin límite mensual.
} as const

let _serviceClient: SupabaseClient | null = null
function getServiceClient(): SupabaseClient {
  return (_serviceClient ??= createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  ))
}

const TRIAL_DAYS = 30

async function isOrgInTrial(orgId: string, client: SupabaseClient): Promise<boolean> {
  const { data } = await client
    .from('organizations')
    .select('created_at')
    .eq('id', orgId)
    .maybeSingle()
  if (!data?.created_at) return false
  const trialEnd = new Date(new Date(data.created_at).getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000)
  return new Date() < trialEnd
}

/** Devuelve el plan del usuario. Free dentro del trial de 30 días equivale a Max. */
export async function getUserPlan(userId: string, supabase?: SupabaseClient): Promise<Plan> {
  const client = supabase ?? getServiceClient()
  const { data } = await client
    .from('configuraciones_usuario')
    .select('plan, org_id')
    .eq('user_id', userId)
    .maybeSingle()
  if (data?.plan === 'max') return 'max'
  if (data?.plan === 'pro') return 'pro'
  if (data?.org_id && await isOrgInTrial(data.org_id, client)) return 'max'
  return 'free'
}

/** Devuelve el plan de la organización. Free dentro del trial de 30 días equivale a Max. */
export async function getOrgPlan(orgId: string, supabase?: SupabaseClient): Promise<Plan> {
  const client = supabase ?? getServiceClient()
  const { data } = await client
    .from('configuraciones_usuario')
    .select('plan')
    .eq('org_id', orgId)
    .maybeSingle()
  if (data?.plan === 'max') return 'max'
  if (data?.plan === 'pro') return 'pro'
  if (await isOrgInTrial(orgId, client)) return 'max'
  return 'free'
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
  if (plan === 'max') return LIMITES_MAX.miembrosEquipo
  return plan === 'pro' ? LIMITES_PRO.miembrosEquipo : LIMITES_FREE.miembrosEquipo
}

/** Cuántos emails ha mandado esta org este mes. */
export async function emailsEnviadosEsteMes(orgId: string, supabase?: SupabaseClient): Promise<number> {
  const client = supabase ?? getServiceClient()
  const primerDia = new Date()
  primerDia.setUTCDate(1)
  primerDia.setUTCHours(0, 0, 0, 0)

  const { count } = await client
    .from('logs_email')
    .select('*', { count: 'exact', head: true })
    .eq('org_id', orgId)
    .eq('estado', 'enviado')
    .gte('enviado_at', primerDia.toISOString())
  return count ?? 0
}
