import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'
import Stripe from 'stripe'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.marsof.es'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as Parameters<typeof Stripe>[1]['apiVersion'] })
}

export async function POST(req: NextRequest) {
  try {
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite esta acción' }, { status: 403 })

    const supabase = await createServerSupabaseClient()

    const { data: cfg } = await supabase
      .from('configuraciones_usuario')
      .select('plan, stripe_customer_id')
      .eq('org_id', org.org_id)
      .maybeSingle()

    if (cfg?.plan !== 'max') {
      return NextResponse.json({ error: 'El burofax es exclusivo del plan Max.', codigo: 'PLAN_INSUFICIENTE' }, { status: 403 })
    }

    const { facturaId } = await req.json()
    if (!facturaId) return NextResponse.json({ error: 'facturaId requerido' }, { status: 400 })

    const { data: factura } = await supabase
      .from('facturas')
      .select('numero, estado, cliente:clientes(nombre, email)')
      .eq('id', facturaId)
      .eq('org_id', org.org_id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
    if (factura.estado === 'cobrada' || factura.estado === 'cancelada') {
      return NextResponse.json({ error: 'No se puede enviar burofax a una factura cobrada o cancelada' }, { status: 400 })
    }

    const cliente = factura.cliente as { nombre: string; email: string }
    const stripe = getStripe()

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: 600,
          product_data: {
            name: 'Burofax electrónico',
            description: `Factura ${factura.numero} — ${cliente.nombre}`,
          },
        },
        quantity: 1,
      }],
      success_url: `${APP_URL}/facturas/${facturaId}?buro_session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/facturas/${facturaId}`,
      metadata: {
        factura_id: facturaId,
        org_id: org.org_id,
        tipo: 'burofax',
      },
    }

    if (cfg?.stripe_customer_id) {
      sessionParams.customer = cfg.stripe_customer_id
    } else {
      sessionParams.customer_creation = 'always'
      sessionParams.customer_email = cliente.email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error en burofax/checkout:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
