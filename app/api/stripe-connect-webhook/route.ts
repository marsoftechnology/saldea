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

async function registrarPagoStripe(params: {
  facturaId: string
  importeCentimos: number | null
  referencia: string
  fuente: string
}) {
  const { facturaId, importeCentimos, referencia, fuente } = params
  const supabase = getSupabase()
  const { data: factura } = await supabase
    .from('facturas')
    .select('id, estado, numero, importe, user_id, org_id, cliente_id')
    .eq('id', facturaId)
    .maybeSingle()

  if (!factura) {
    console.log(`[connect-webhook] factura ${facturaId} no encontrada (origen: ${fuente})`)
    return
  }
  if (factura.estado === 'cobrada') {
    console.log(`[connect-webhook] factura ${factura.numero} ya estaba cobrada — skip`)
    return
  }

  // Si ya hay un pago con esta referencia, no duplicar (idempotencia)
  const { data: pagoExistente } = await supabase
    .from('pagos')
    .select('id')
    .eq('factura_id', facturaId)
    .eq('referencia', referencia)
    .maybeSingle()
  if (pagoExistente) {
    console.log(`[connect-webhook] pago ${referencia} ya existe — skip`)
    return
  }

  // Importe: si Stripe nos da el importe usamos ese, si no el pendiente de la factura
  let importe: number
  if (importeCentimos && importeCentimos > 0) {
    importe = importeCentimos / 100
  } else {
    const { data: pagosPrevios } = await supabase
      .from('pagos')
      .select('importe')
      .eq('factura_id', facturaId)
    const yaPagado = (pagosPrevios ?? []).reduce((s, p) => s + Number(p.importe), 0)
    importe = Math.max(0, Number(factura.importe) - yaPagado)
  }
  if (importe <= 0) {
    console.log(`[connect-webhook] importe 0 para factura ${factura.numero} — skip`)
    return
  }

  await supabase.from('pagos').insert({
    factura_id: facturaId,
    user_id: factura.user_id,
    org_id: factura.org_id,
    importe: Math.round(importe * 100) / 100,
    metodo: 'stripe',
    referencia,
    notas: `Auto-cobrada vía Stripe (${fuente})`,
  })

  // Recalcular estado (puede ser cobrada o parcialmente_cobrada si Stripe trae menos del total)
  const { recalcularEstadoFactura } = await import('@/lib/pagos')
  await recalcularEstadoFactura(supabase, facturaId)

  // Log en el historial de la factura
  await supabase.from('logs_email').insert({
    factura_id: facturaId,
    cliente_id: factura.cliente_id,
    org_id: factura.org_id,
    asunto: '💳 Pago recibido vía Stripe',
    cuerpo: `Stripe ha confirmado un pago de ${importe.toFixed(2)}€ para la factura ${factura.numero}. Ref: ${referencia}. (Origen: ${fuente})`,
    estado: 'enviado',
  })

  console.log(`[connect-webhook] pago ${importe}€ registrado para factura ${factura.numero} (ref ${referencia}, origen ${fuente})`)
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET
  if (!secret) {
    console.error('STRIPE_CONNECT_WEBHOOK_SECRET no configurada')
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
    console.error('Stripe Connect webhook signature inválida:', err)
    return NextResponse.json({ error: 'signature inválida' }, { status: 400 })
  }

  try {
    switch (event.type) {
      // Cuando el cliente termina el Checkout Session creado por un Payment Link
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const facturaId = session.metadata?.factura_id
        if (facturaId && session.payment_status === 'paid') {
          await registrarPagoStripe({
            facturaId,
            importeCentimos: session.amount_total ?? null,
            referencia: session.id,
            fuente: 'checkout.session.completed',
          })
        }
        break
      }

      // Backup: payment_intent.succeeded (por si llega antes que checkout.session.completed)
      case 'payment_intent.succeeded': {
        const intent = event.data.object as Stripe.PaymentIntent
        const facturaId = intent.metadata?.factura_id
        if (facturaId) {
          await registrarPagoStripe({
            facturaId,
            importeCentimos: intent.amount_received ?? intent.amount ?? null,
            referencia: intent.id,
            fuente: 'payment_intent.succeeded',
          })
        }
        break
      }

      // El usuario actualiza su cuenta (puede cambiar charges_enabled)
      case 'account.updated': {
        const account = event.data.object as Stripe.Account
        const supabase = getSupabase()
        await supabase
          .from('configuraciones_usuario')
          .update({ stripe_connect_charges_enabled: account.charges_enabled ?? false })
          .eq('stripe_connect_account_id', account.id)
        break
      }

      // El usuario revoca el acceso desde su Stripe
      case 'account.application.deauthorized': {
        const supabase = getSupabase()
        // El event payload trae el account_id en event.account
        const accountId = event.account
        if (accountId) {
          await supabase
            .from('configuraciones_usuario')
            .update({
              stripe_connect_account_id: null,
              stripe_connect_charges_enabled: false,
              stripe_connect_country: null,
              stripe_connect_connected_at: null,
            })
            .eq('stripe_connect_account_id', accountId)
        }
        break
      }

      default:
        // Ignoramos el resto silenciosamente
        break
    }
  } catch (err) {
    console.error('Error procesando connect webhook:', err)
    return NextResponse.json({ error: 'error procesando' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
