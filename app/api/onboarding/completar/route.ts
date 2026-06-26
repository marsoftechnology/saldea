import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

/**
 * POST /api/onboarding/completar
 * Marca el onboarding como completado para la org activa.
 * Solo puede llamarse una vez por org (idempotente).
 */
export async function POST() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()

  const now = new Date().toISOString()

  const { error } = await supabase
    .from('configuraciones_usuario')
    .upsert(
      { user_id: org.user_id, org_id: org.org_id, onboarding_completado: true, updated_at: now },
      { onConflict: 'org_id' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Marcar la org como onboarding completado (lo que lee el dashboard)
  await supabase
    .from('organizations')
    .update({ onboarding_completado_at: now })
    .eq('id', org.org_id)

  return NextResponse.json({ ok: true })
}
