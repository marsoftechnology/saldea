import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json() as { endpoint?: string; p256dh?: string; auth?: string }
  if (!body.endpoint || !body.p256dh || !body.auth) {
    return NextResponse.json({ error: 'Faltan campos de suscripción' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('push_subscriptions')
    .upsert(
      {
        org_id: org.org_id,
        user_id: org.user_id,
        endpoint: body.endpoint,
        p256dh: body.p256dh,
        auth: body.auth,
      },
      { onConflict: 'org_id,user_id,endpoint' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
