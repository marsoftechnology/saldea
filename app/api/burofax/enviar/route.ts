import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'
import { generarPDFBurofax } from '@/lib/pdf'
import { enviarBurofaxLleida } from '@/lib/lleida'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as Parameters<typeof Stripe>[1]['apiVersion'] })
}

export async function POST(req: NextRequest) {
  try {
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const supabase = await createServerSupabaseClient()

    const { data: cfg } = await supabase
      .from('configuraciones_usuario')
      .select('plan')
      .eq('org_id', org.org_id)
      .maybeSingle()

    if (cfg?.plan !== 'max') {
      return NextResponse.json({ error: 'El burofax es exclusivo del plan Max.', codigo: 'PLAN_INSUFICIENTE' }, { status: 403 })
    }

    const { facturaId, checkoutSessionId } = await req.json()
    if (!facturaId || !checkoutSessionId) {
      return NextResponse.json({ error: 'facturaId y checkoutSessionId requeridos' }, { status: 400 })
    }

    // Verificar que el pago de Stripe está completado y corresponde a esta factura
    const stripe = getStripe()
    let stripeSession: Stripe.Checkout.Session

    try {
      stripeSession = await stripe.checkout.sessions.retrieve(checkoutSessionId)
    } catch {
      return NextResponse.json({ error: 'Sesión de pago no válida' }, { status: 400 })
    }

    if (stripeSession.payment_status !== 'paid') {
      return NextResponse.json({ error: 'El pago no se ha completado', codigo: 'PAGO_INCOMPLETO' }, { status: 402 })
    }

    if (stripeSession.metadata?.factura_id !== facturaId || stripeSession.metadata?.org_id !== org.org_id) {
      return NextResponse.json({ error: 'La sesión de pago no corresponde a esta factura' }, { status: 400 })
    }

    const stripePaymentIntentId = stripeSession.payment_intent as string

    // Evitar doble envío si ya existe un burofax con este payment intent
    const { count: yaExiste } = await supabase
      .from('burofaxes')
      .select('id', { count: 'exact', head: true })
      .eq('stripe_charge_id', stripePaymentIntentId)

    if ((yaExiste ?? 0) > 0) {
      return NextResponse.json({ ok: true, mensaje: 'El burofax ya fue enviado' })
    }

    // Obtener factura con cliente
    const { data: factura } = await supabase
      .from('facturas')
      .select('*, cliente:clientes(*)')
      .eq('id', facturaId)
      .eq('org_id', org.org_id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })

    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null; telefono?: string | null }

    const { data: orgData } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', org.org_id)
      .maybeSingle()
    const nombreEmpresa = orgData?.name || 'Tu empresa'

    const diasVencida = Math.max(0, Math.floor(
      (Date.now() - new Date(factura.fecha_vencimiento).getTime()) / (1000 * 60 * 60 * 24)
    ))

    // Generar PDF del burofax
    const pdfBytes = await generarPDFBurofax({
      numeroFactura: factura.numero,
      importe: Number(factura.importe),
      fechaVencimiento: factura.fecha_vencimiento,
      diasVencida,
      clienteNombre: cliente.nombre,
      clienteEmpresa: cliente.empresa,
      clienteEmail: cliente.email,
      emisor: nombreEmpresa,
      descripcion: factura.descripcion,
    })

    // Enviar burofax vía lleida.net
    const contractId = `BURO-${factura.numero}-${stripePaymentIntentId.slice(-6)}`
    const requestId = `saldea-${org.org_id.slice(0, 8)}-${stripePaymentIntentId.slice(-8)}`
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64')

    let lleidaOk = false
    let lleidaRequestId: string | undefined

    try {
      const [nombre, ...apellidoArr] = cliente.nombre.split(' ')
      const res = await enviarBurofaxLleida({
        recipient: {
          email: cliente.email,
          name: nombre,
          ...(apellidoArr.length > 0 && { surname: apellidoArr.join(' ') }),
          ...(cliente.telefono ? { phone: cliente.telefono } : {}),
        },
        pdfBase64,
        contractId,
        requestId,
      })

      if (res.code === '200') {
        lleidaOk = true
        lleidaRequestId = requestId
      } else {
        console.error('lleida.net error:', res)
      }
    } catch (lleidaErr) {
      console.error('lleida.net excepción:', lleidaErr)
    }

    // Registrar en Supabase (independientemente del resultado de lleida)
    const mesActual = new Date().toISOString().slice(0, 7)

    await supabase.from('burofaxes').insert({
      org_id: org.org_id,
      factura_id: factura.id,
      mes: mesActual,
      estado: lleidaOk ? 'enviado' : 'error',
      destinatario_nombre: cliente.nombre,
      destinatario_email: cliente.email,
      importe: factura.importe,
      numero_factura: factura.numero,
      lleida_request_id: lleidaRequestId ?? null,
      stripe_charge_id: stripePaymentIntentId,
      coste_usuario_cents: 600,
      coste_saldea_cents: 300,
    })

    await supabase
      .from('facturas')
      .update({ burofax_enviado_at: new Date().toISOString() })
      .eq('id', factura.id)

    if (!lleidaOk) {
      return NextResponse.json({
        ok: false,
        error: 'El pago de 6€ se realizó pero hubo un error al enviar el burofax. Contacta con soporte en carlosgc@marsof.es.',
        codigo: 'ERROR_LLEIDA',
      }, { status: 500 })
    }

    return NextResponse.json({ ok: true, contractId, requestId: lleidaRequestId })
  } catch (error) {
    console.error('Error en burofax/enviar:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
