import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { randomUUID } from 'crypto'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

export async function GET(req: NextRequest) {
  const clientId = process.env.STRIPE_CONNECT_CLIENT_ID
  if (!clientId) {
    return NextResponse.redirect(new URL('/ajustes?stripe_error=not_configured', req.url))
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  // Token CSRF: UUID aleatorio guardado en cookie para validar en el callback
  const state = randomUUID()

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'read_write',
    redirect_uri: `${APP_URL}/api/stripe-connect/callback`,
    state,
    'stripe_user[country]': 'ES',
    'stripe_user[email]': user.email ?? '',
  })

  const res = NextResponse.redirect(`https://connect.stripe.com/oauth/authorize?${params.toString()}`)
  res.cookies.set('stripe_connect_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600, // 10 minutos
    path: '/',
  })
  return res
}
