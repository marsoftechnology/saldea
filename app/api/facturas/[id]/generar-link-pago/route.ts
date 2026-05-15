import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite editar' }, { status: 403 })
    const supabase = await createServerSupabaseClient()

    // Cuenta de Stripe Connect de la org (la mantiene el owner)
    const { data: config } = await supabase
      .from('configuraciones_usuario')
      .select('stripe_connect_account_id, stripe_connect_charges_enabled')
      .eq('org_id', org.org_id)
      .maybeSingle()

    if (!config?.stripe_connect_account_id) {
      return NextResponse.json(
        { error: 'Conecta tu Stripe primero desde Ajustes' },
        { status: 400 }
      )
    }
    if (!config.stripe_connect_charges_enabled) {
      return NextResponse.json(
        { error: 'Tu cuenta de Stripe aún no está habilitada para cobros. Completa la configuración en tu Stripe Dashboard.' },
        { status: 400 }
      )
    }

    // Factura
    const { data: factura } = await supabase
      .from('facturas')
      .select('*, cliente:clientes(*)')
      .eq('id', id)
      .eq('org_id', org.org_id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })

    if (factura.estado === 'cobrada') {
      return NextResponse.json({ error: 'La factura ya está cobrada' }, { status: 400 })
    }

    const importeCentimos = Math.round(Number(factura.importe) * 100)
    if (importeCentimos < 50) {
      return NextResponse.json({ error: 'Importe mínimo 0,50 €' }, { status: 400 })
    }

    const stripe = getStripe()

    // Crear Payment Link en la cuenta conectada del usuario
    const link = await stripe.paymentLinks.create(
      {
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Factura ${factura.numero}`,
                description: factura.descripcion?.slice(0, 200) || `Pago de factura ${factura.numero}`,
              },
              unit_amount: importeCentimos,
            },
            quantity: 1,
          },
        ],
        metadata: {
          factura_id: factura.id,
          org_id: org.org_id,
          user_id: org.user_id,
          numero_factura: factura.numero,
        },
        payment_intent_data: {
          metadata: {
            factura_id: factura.id,
            org_id: org.org_id,
            user_id: org.user_id,
            numero_factura: factura.numero,
          },
          description: `Factura ${factura.numero}`,
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${APP_URL}/cobrado?num=${encodeURIComponent(factura.numero)}&importe=${factura.importe}`,
          },
        },
      },
      {
        stripeAccount: config.stripe_connect_account_id,
      }
    )

    // Guardar en la factura
    const { error: errUpdate } = await supabase
      .from('facturas')
      .update({ link_pago: link.url })
      .eq('id', factura.id)
      .eq('org_id', org.org_id)

    if (errUpdate) {
      console.error('Error guardando link_pago:', errUpdate)
      return NextResponse.json({ error: 'Link creado en Stripe pero no se pudo guardar' }, { status: 500 })
    }

    return NextResponse.json({ url: link.url, id: link.id })
  } catch (e) {
    console.error('Error generando Stripe Payment Link:', e)
    const msg = e instanceof Error ? e.message : 'Error interno'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
