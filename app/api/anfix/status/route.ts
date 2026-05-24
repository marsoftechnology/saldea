import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// GET /api/anfix/status — estado de la conexión Anfix
export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('configuraciones_usuario')
    .select('anfix_api_key, anfix_last_sync')
    .eq('org_id', org.org_id)
    .maybeSingle()

  const connected = !!(data?.anfix_api_key)

  return NextResponse.json({
    connected,
    lastSync: data?.anfix_last_sync ?? null,
  })
}
