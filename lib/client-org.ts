// Helper client-side para obtener la org activa del usuario.
// Útil en client components que necesitan insertar org_id.

import { createClient } from './supabase'

export async function getActiveOrgIdClient(): Promise<string | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: memberships } = await supabase
    .from('org_members')
    .select('org_id')
    .eq('user_id', user.id)
    .limit(1)

  return memberships?.[0]?.org_id ?? null
}
