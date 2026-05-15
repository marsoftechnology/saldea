import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getActiveOrg } from '@/lib/auth-org'

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

    // Intervalo (mes/año). Por defecto mes (compatible con llamadas viejas).
    let interval: 'mes' | 'anio' = 'mes'
    try {
      const body = await req.json().catch(() => ({}))
      if (body?.interval === 'anio' || body?.interval === 'year') interval = 'anio'
    } catch {}

    const stripe = getStripe()
    const priceMensual = process.env.STRIPE_PRICE_ID
    const priceAnual = process.env.STRIPE_PRICE_ID_ANNUAL
    if (!priceMensual) throw new Error('STRIPE_PRICE_ID no configurada')

    const priceId = interval === 'anio' && priceAnual ? priceAnual : priceMensual

    // Solo el plan mensual lleva trial de 7 días. El anual va directo al cobro
    // (asumimos que el usuario ya conoce el producto si compra un año entero).
    const subscriptionData: Record<string, unknown> = {
      metadata: { user_id: user.id, org_id: org.org_id, interval },
    }
    if (interval === 'mes') {
      subscriptionData.trial_period_days = 7
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await (stripe.checkout.sessions.create as any)({
      ui_mode: 'embedded',
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      // Identificación del usuario+org para el webhook /api/stripe-webhook
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: { user_id: user.id, org_id: org.org_id, interval },
      subscription_data: subscriptionData,
      // Forzar captura de tarjeta aunque sea trial (en mensual)
      payment_method_collection: 'always',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'}/pago-completado?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Error al iniciar el pago' }, { status: 500 })
  }
}
