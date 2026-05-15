import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { data: config } = await supabase
      .from('configuraciones_usuario')
      .select('stripe_connect_account_id, stripe_connect_charges_enabled, stripe_connect_country, stripe_connect_connected_at')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!config?.stripe_connect_account_id) {
      return NextResponse.json({ connected: false })
    }

    // Refrescar el estado real desde Stripe (charges_enabled puede haber cambiado)
    let chargesEnabled = config.stripe_connect_charges_enabled ?? false
    let requiresAction = false
    let detailsSubmitted = true
    try {
      const stripe = getStripe()
      const account = await stripe.accounts.retrieve(config.stripe_connect_account_id)
      chargesEnabled = account.charges_enabled ?? false
      detailsSubmitted = account.details_submitted ?? false
      requiresAction =
        !!(account.requirements?.currently_due?.length ?? 0) ||
        !!(account.requirements?.past_due?.length ?? 0)

      // Sincronizar charges_enabled si cambió en Stripe
      if (chargesEnabled !== (config.stripe_connect_charges_enabled ?? false)) {
        await supabase
          .from('configuraciones_usuario')
          .update({ stripe_connect_charges_enabled: chargesEnabled })
          .eq('user_id', user.id)
      }
    } catch (e) {
      console.error('Error consultando estado de cuenta Stripe Connect:', e)
    }

    return NextResponse.json({
      connected: true,
      accountId: config.stripe_connect_account_id,
      chargesEnabled,
      detailsSubmitted,
      requiresAction,
      country: config.stripe_connect_country,
      connectedAt: config.stripe_connect_connected_at,
    })
  } catch (e) {
    console.error('Error en stripe-connect status:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
