import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarPushAOrg } from '@/lib/push'

// Endpoint interno — solo llamable con el secret correcto (desde crons y otras rutas API)
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-saldea-secret')
  if (secret !== process.env.PUSH_INTERNAL_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json() as {
    org_id?: string
    title?: string
    body?: string
    url?: string
  }

  if (!body.org_id || !body.title || !body.body) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const result = await enviarPushAOrg(body.org_id, {
    title: body.title,
    body: body.body,
    url: body.url,
  }, supabase)

  return NextResponse.json({ ok: true, ...result })
}
