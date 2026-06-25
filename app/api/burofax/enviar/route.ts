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
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite esta acción' }, { status: 403 })

    const supabase = await createServerSupabaseClient()

    // Verificar plan Max y obtener config
    const { data: cfg } = await supabase
      .from('configuraciones_usuario')
      .select('plan, stripe_customer_id')
      .eq('org_id', org.org_id)
      .maybeSingle()

    if (cfg?.plan !== 'max') {
      return NextResponse.json({ error: 'El burofax es exclusivo del plan Max.', codigo: 'PLAN_INSUFICIENTE' }, { status: 403 })
    }

    if (!cfg?.stripe_customer_id) {
      return NextResponse.json({
        error: 'No hay tarjeta de pago registrada. Ve a Ajustes → Plan para actualizar tu método de pago.',
        codigo: 'SIN_METODO_PAGO',
      }, { status: 402 })
    }

    const { facturaId } = await req.json()
    if (!facturaId) return NextResponse.json({ error: 'facturaId requerido' }, { status: 400 })

    // Obtener factura con cliente
    const { data: factura } = await supabase
      .from('facturas')
      .select('*, cliente:clientes(*)')
      .eq('id', facturaId)
      .eq('org_id', org.org_id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
    if (factura.estado === 'cobrada' || factura.estado === 'cancelada') {
      return NextResponse.json({ error: 'No se puede enviar burofax a una factura cobrada o cancelada' }, { status: 400 })
    }

    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null; telefono?: string | null }

    // Nombre de la org emisora
    const { data: orgData } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', org.org_id)
      .maybeSingle()
    const nombreEmpresa = orgData?.name || 'Tu empresa'

    const diasVencida = Math.max(0, Math.floor(
      (Date.now() - new Date(factura.fecha_vencimiento).getTime()) / (1000 * 60 * 60 * 24)
    ))

    // 1. Generar PDF del burofax
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

    // 2. Cobrar 6€ al cliente vía Stripe (off-session)
    const stripe = getStripe()
    let stripeChargeId: string

    try {
      const stripeCustomer = await stripe.customers.retrieve(cfg.stripe_customer_id) as Stripe.Customer
      let pmId = stripeCustomer.invoice_settings?.default_payment_method as string | null

      if (!pmId) {
        const subs = await stripe.subscriptions.list({ customer: cfg.stripe_customer_id, limit: 1, status: 'active' })
        pmId = subs.data[0]?.default_payment_method as string | null
      }
      if (!pmId) {
        const pms = await stripe.paymentMethods.list({ customer: cfg.stripe_customer_id, type: 'card', limit: 1 })
        pmId = pms.data[0]?.id ?? null
      }

      if (!pmId) {
        return NextResponse.json({
          error: 'No hay método de pago guardado. Ve a Ajustes → Plan y actualiza tu tarjeta.',
          codigo: 'SIN_METODO_PAGO',
        }, { status: 402 })
      }

      const pi = await stripe.paymentIntents.create({
        amount: 600,
        currency: 'eur',
        customer: cfg.stripe_customer_id,
        payment_method: pmId,
        off_session: true,
        confirm: true,
        description: `Burofax electrónico — Factura ${factura.numero} — ${nombreEmpresa}`,
        metadata: { factura_id: factura.id, org_id: org.org_id, tipo: 'burofax' },
      })

      stripeChargeId = pi.id
    } catch (stripeErr: unknown) {
      console.error('Stripe error al cobrar burofax:', stripeErr)
      const msg = (stripeErr as { message?: string })?.message ?? 'Error de tarjeta'
      return NextResponse.json({
        error: `No se pudo procesar el pago de 6€: ${msg}. Revisa tu método de pago en Ajustes.`,
        codigo: 'ERROR_PAGO',
      }, { status: 402 })
    }

    // 3. Enviar burofax vía lleida.net
    const contractId = `BURO-${factura.numero}-${Date.now()}`
    const requestId = `saldea-${org.org_id.slice(0, 8)}-${Date.now()}`
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

    // 4. Registrar en Supabase (independientemente del resultado de lleida)
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
      stripe_charge_id: stripeChargeId,
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
