import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

/**
 * Crea una sesión del Stripe Customer Portal para el usuario actual.
 * El portal permite al usuario:
 * - Ver y gestionar su suscripción
 * - Actualizar método de pago
 * - Cancelar la suscripción
 * - Descargar facturas y recibos
 */
export async function POST() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Recuperar el stripe_customer_id de este usuario
    const { data: config } = await supabase
      .from('configuraciones_usuario')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle()

    const customerId = config?.stripe_customer_id
    if (!customerId) {
      return NextResponse.json({
        error: 'No tienes una suscripción activa. Primero debes suscribirte al plan Pro.',
        codigo: 'NO_CUSTOMER',
      }, { status: 400 })
    }

    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'}/ajustes`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe portal error:', error)
    const msg = error instanceof Error ? error.message : 'unknown'
    // Si el portal no está configurado en Stripe, devolver mensaje claro
    if (msg.includes('configuration') || msg.includes('portal')) {
      return NextResponse.json({
        error: 'El portal del cliente aún no está configurado. Contacta con soporte.',
        codigo: 'PORTAL_NOT_CONFIGURED',
      }, { status: 500 })
    }
    return NextResponse.json({ error: 'Error al abrir el portal de cliente' }, { status: 500 })
  }
}
