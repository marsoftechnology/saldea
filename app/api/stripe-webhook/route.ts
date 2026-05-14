import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

async function setPlan(userId: string, plan: 'free' | 'pro') {
  const supabase = getSupabase()
  // Upsert: si no existe configuracion_usuario la creamos con el plan correcto.
  await supabase
    .from('configuraciones_usuario')
    .upsert({ user_id: userId, plan }, { onConflict: 'user_id' })
  console.log(`[stripe-webhook] user ${userId} → plan=${plan}`)
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET no configurada')
    return NextResponse.json({ error: 'webhook no configurado' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'falta signature' }, { status: 400 })

  const body = await req.text()
  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    console.error('Stripe webhook signature inválida:', err)
    return NextResponse.json({ error: 'signature inválida' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id ?? session.metadata?.user_id
        if (userId && session.payment_status === 'paid') {
          await setPlan(userId, 'pro')
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userId = (sub.metadata as any)?.user_id
        if (!userId) break
        // Activo si está active o trialing. Si no, vuelve a free.
        const activo = sub.status === 'active' || sub.status === 'trialing'
        await setPlan(userId, activo ? 'pro' : 'free')
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userId = (sub.metadata as any)?.user_id
        if (userId) await setPlan(userId, 'free')
        break
      }
      default:
        // No hacemos nada con el resto de eventos.
        break
    }
  } catch (err) {
    console.error('Error procesando webhook:', err)
    return NextResponse.json({ error: 'error procesando' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
