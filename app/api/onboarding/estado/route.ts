import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

/**
 * GET /api/onboarding/estado
 * Devuelve si el usuario ha completado el onboarding.
 * Si no existe fila de config (usuario nuevo), devuelve completado = false.
 */
export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ completado: true }) // Sin sesión → no redirigir

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('configuraciones_usuario')
    .select('onboarding_completado')
    .eq('org_id', org.org_id)
    .maybeSingle()

  // Si no existe fila → usuario nuevo → mostrar onboarding
  // Si existe pero onboarding_completado = true (DEFAULT para usuarios previos) → no mostrar
  const completado = data ? (data.onboarding_completado ?? true) : false

  return NextResponse.json({ completado })
}
