import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json() as { endpoint?: string }
  if (!body.endpoint) return NextResponse.json({ error: 'Falta endpoint' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  await supabase
    .from('push_subscriptions')
    .delete()
    .eq('org_id', org.org_id)
    .eq('user_id', org.user_id)
    .eq('endpoint', body.endpoint)

  return NextResponse.json({ ok: true })
}
