import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const error = req.nextUrl.searchParams.get('error')
  const errorDescription = req.nextUrl.searchParams.get('error_description')

  if (error) {
    const msg = encodeURIComponent(errorDescription || error)
    return NextResponse.redirect(new URL(`/ajustes?stripe_error=${msg}`, req.url))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/ajustes?stripe_error=missing_params', req.url))
  }

  // Validar el state contra el cookie (anti-CSRF)
  const expectedState = req.cookies.get('stripe_connect_state')?.value
  if (!expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL('/ajustes?stripe_error=invalid_state', req.url))
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', req.url))

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return NextResponse.redirect(new URL('/ajustes?stripe_error=not_configured', req.url))
  }

  try {
    // Intercambiar el código por el stripe_user_id (account ID)
    const formData = new URLSearchParams({
      client_secret: secret,
      code,
      grant_type: 'authorization_code',
    })

    const tokenRes = await fetch('https://connect.stripe.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })

    const tokenData = await tokenRes.json()
    if (!tokenData.stripe_user_id) {
      console.error('Stripe Connect token exchange falló:', tokenData)
      const msg = encodeURIComponent(tokenData.error_description ?? 'token_exchange_failed')
      return NextResponse.redirect(new URL(`/ajustes?stripe_error=${msg}`, req.url))
    }

    const stripeAccountId = tokenData.stripe_user_id as string

    // Recuperar detalles para reflejar el estado (charges_enabled, país)
    const stripe = getStripe()
    const account = await stripe.accounts.retrieve(stripeAccountId)

    await supabase
      .from('configuraciones_usuario')
      .upsert(
        {
          user_id: user.id,
          stripe_connect_account_id: stripeAccountId,
          stripe_connect_charges_enabled: account.charges_enabled ?? false,
          stripe_connect_country: account.country ?? null,
          stripe_connect_connected_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )

    const res = NextResponse.redirect(new URL('/ajustes?stripe_connected=1#stripe-connect', req.url))
    res.cookies.delete('stripe_connect_state')
    return res
  } catch (e) {
    console.error('Error en stripe-connect callback:', e)
    return NextResponse.redirect(new URL('/ajustes?stripe_error=internal_error', req.url))
  }
}
