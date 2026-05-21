import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('configuraciones_usuario')
    .select('holded_api_key, holded_connected_at, holded_last_sync')
    .eq('org_id', org.org_id)
    .maybeSingle()

  const conectado = !!data?.holded_api_key

  return NextResponse.json({
    connected: conectado,
    connectedAt: data?.holded_connected_at ?? null,
    lastSync: data?.holded_last_sync ?? null,
  })
}
