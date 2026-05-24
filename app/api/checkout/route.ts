import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getActiveOrg } from '@/lib/auth-org'
import { TRIAL_DAYS } from '@/app/api/trial/route'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

export async function POST(req: NextRequest) {
  try {
    const org = await getActiveOrg()
    if (!org) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    if (org.role !== 'owner') {
      return NextResponse.json({ error: 'Solo el owner puede contratar el plan' }, { status: 403 })
    }
    const user = org.user

    // Intervalo + planTipo. Por defecto mes / pro (compatible con llamadas viejas).
    let interval: 'mes' | 'anio' = 'mes'
    let planTipo: 'pro' | 'max' = 'pro'
    try {
      const body = await req.json().catch(() => ({}))
      if (body?.interval === 'anio' || body?.interval === 'year') interval = 'anio'
      if (body?.planTipo === 'max') planTipo = 'max'
    } catch {}

    const stripe = getStripe()

    // Seleccionar el Price ID correcto según plan + intervalo
    let priceId: string | undefined
    if (planTipo === 'max') {
      priceId = interval === 'anio'
        ? (process.env.STRIPE_MAX_PRICE_ID_ANNUAL ?? process.env.STRIPE_MAX_PRICE_ID)
        : process.env.STRIPE_MAX_PRICE_ID
    } else {
      priceId = interval === 'anio'
        ? (process.env.STRIPE_PRICE_ID_ANNUAL ?? process.env.STRIPE_PRICE_ID)
        : process.env.STRIPE_PRICE_ID
    }
    if (!priceId) throw new Error(`Price ID no configurado para plan ${planTipo} / ${interval}`)

    // Solo el plan mensual Pro lleva trial. Max y anual van directo al cobro.
    const subscriptionData: Record<string, unknown> = {
      metadata: { user_id: user.id, org_id: org.org_id, interval, planTipo },
    }
    if (interval === 'mes' && planTipo === 'pro') {
      subscriptionData.trial_period_days = TRIAL_DAYS
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await (stripe.checkout.sessions.create as any)({
      ui_mode: 'embedded_page',
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      // Identificación del usuario+org para el webhook /api/stripe-webhook
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: { user_id: user.id, org_id: org.org_id, interval, planTipo },
      subscription_data: subscriptionData,
      // Forzar captura de tarjeta aunque sea trial
      payment_method_collection: 'always',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.marsof.es'}/pago-completado?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Error al iniciar el pago' }, { status: 500 })
  }
}
