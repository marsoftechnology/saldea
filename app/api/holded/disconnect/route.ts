import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('configuraciones_usuario')
    .update({
      holded_api_key: null,
      holded_connected_at: null,
      holded_last_sync: null,
    })
    .eq('org_id', org.org_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
