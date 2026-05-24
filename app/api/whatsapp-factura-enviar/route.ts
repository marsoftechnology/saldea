import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { enviarWhatsApp } from '@/lib/twilio'
import { formatearEuros, formatearFecha } from '@/lib/utils'

/**
 * Envía la factura al cliente por WhatsApp (Twilio).
 * Se puede llamar al crear la factura o desde el detalle de la misma.
 *
 * Requisitos:
 *   - El cliente debe tener teléfono + whatsapp_opt_in_at
 */
export async function POST(req: NextRequest) {
  // Autenticar usuario
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'no_auth' }, { status: 401 })

  const body = await req.json()
  const facturaId: string | undefined = body.facturaId
  if (!facturaId) return NextResponse.json({ error: 'facturaId_required' }, { status: 400 })

  // Obtener factura + cliente (RLS garantiza que el usuario tiene acceso)
  const { data: factura } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(*)')
    .eq('id', facturaId)
    .maybeSingle()

  if (!factura) return NextResponse.json({ error: 'factura_not_found' }, { status: 404 })

  const cliente = factura.cliente as {
    id: string
    nombre: string
    telefono: string | null
    whatsapp_opt_in_at: string | null
  }

  if (!cliente?.telefono) {
    return NextResponse.json({ error: 'no_phone', mensaje: 'El cliente no tiene teléfono guardado.' }, { status: 400 })
  }
  if (!cliente?.whatsapp_opt_in_at) {
    return NextResponse.json({ error: 'no_optin', mensaje: 'El cliente no tiene activados los recordatorios por WhatsApp.' }, { status: 400 })
  }

  // Obtener nombre de la org
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: orgData } = await admin
    .from('organizations')
    .select('name')
    .eq('id', factura.org_id)
    .maybeSingle()

  const nombreEmpresa = orgData?.name || 'Tu proveedor'
  const nombrePila = cliente.nombre.split(' ')[0]

  // Construir mensaje de notificación de factura
  const importeStr = formatearEuros(Number(factura.importe))
  const fechaStr = formatearFecha(factura.fecha_vencimiento)

  let cuerpo = `${nombreEmpresa}:\n\nHola ${nombrePila}, te enviamos la factura ${factura.numero} por importe de ${importeStr} con vencimiento el ${fechaStr}.`

  if (factura.descripcion) {
    cuerpo += `\n\n${factura.descripcion}`
  }

  if (factura.link_pago) {
    cuerpo += `\n\n💳 Pagar ahora: ${factura.link_pago}`
  } else {
    cuerpo += '\n\nSi tienes alguna pregunta no dudes en contactarnos.'
  }

  // Enviar por Twilio
  const { enviado, messageSid } = await enviarWhatsApp({
    para: cliente.telefono,
    cuerpo,
    facturaId: factura.id,
  })

  if (!enviado) {
    return NextResponse.json({ error: 'send_failed', mensaje: 'No se pudo enviar el mensaje. Comprueba las credenciales de Twilio.' }, { status: 500 })
  }

  // Registrar en mensajes_whatsapp
  await admin.from('mensajes_whatsapp').insert({
    factura_id: factura.id,
    cliente_id: cliente.id,
    org_id: factura.org_id,
    twilio_message_sid: messageSid,
    to_number: cliente.telefono,
    cuerpo,
    tono: 'formal',
    estado: 'enviado',
  })

  return NextResponse.json({ ok: true, messageSid })
}
