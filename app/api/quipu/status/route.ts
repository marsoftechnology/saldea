import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// GET /api/quipu/status — estado de la conexión Quipu
export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('configuraciones_usuario')
    .select('quipu_api_token, quipu_last_sync')
    .eq('org_id', org.org_id)
    .maybeSingle()

  const connected = !!(data?.quipu_api_token)

  return NextResponse.json({
    connected,
    lastSync: data?.quipu_last_sync ?? null,
  })
}
