import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validarFirmaTwilio, enviarWhatsApp } from '@/lib/twilio'
import { clasificarRespuestaCliente, type CategoriaRespuesta } from '@/lib/anthropic'
import { diasVencida } from '@/lib/utils'
import { getUserPlan } from '@/lib/plan'

/**
 * Recibe mensajes entrantes de WhatsApp desde Twilio.
 * Cuando un deudor responde al número de Saldea, Twilio hace POST aquí.
 *
 * Twilio envía form-urlencoded con campos:
 *   From (whatsapp:+34...), To (whatsapp:+14155...), Body, MessageSid, etc.
 */
export async function POST(req: NextRequest) {
  // Parsear el form body
  const formData = await req.formData()
  const params: Record<string, string> = {}
  formData.forEach((value, key) => { params[key] = String(value) })

  // Validar firma Twilio
  // Construir la URL exacta que Twilio usó para firmar: proto + host + path
  const signature = req.headers.get('x-twilio-signature') ?? ''
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  const host = req.headers.get('host') ?? (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/^https?:\/\//, '')
  const url = `${proto}://${host}/api/whatsapp-inbound`
  if (!validarFirmaTwilio({ signature, url, body: params })) {
    console.warn('[whatsapp-inbound] Firma inválida', { url, signaturePresent: !!signature })
    return NextResponse.json({ error: 'Firma inválida' }, { status: 403 })
  }

  const fromRaw = params['From'] ?? ''   // e.g. "whatsapp:+34612345678"
  const body = params['Body'] ?? ''
  const messageSid = params['MessageSid'] ?? ''

  if (!fromRaw || !body) {
    return NextResponse.json({ ok: true, motivo: 'campos vacíos' })
  }

  // Extraer número de teléfono sin prefijo whatsapp:
  const telefono = fromRaw.replace(/^whatsapp:/, '')

  console.log('[whatsapp-inbound] FROM:', telefono, '| SID:', messageSid, '| BODY_LEN:', body.length)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Buscar el cliente por número de teléfono
  const { data: cliente } = await supabase
    .from('clientes')
    .select('id, org_id, nombre')
    .or(`telefono.eq.${telefono},telefono.eq.${telefono.replace('+', '')}`)
    .maybeSingle()

  if (!cliente) {
    console.log('[whatsapp-inbound] Cliente no encontrado para teléfono:', telefono)
    return NextResponse.json({ ok: true, motivo: 'cliente no encontrado' })
  }

  // Factura más reciente pendiente del cliente
  const { data: factura } = await supabase
    .from('facturas')
    .select('id, user_id, org_id, cliente_id, numero, importe, fecha_vencimiento, estado')
    .eq('cliente_id', cliente.id)
    .eq('org_id', cliente.org_id)
    .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada'])
    .order('fecha_vencimiento', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!factura) {
    console.log('[whatsapp-inbound] No hay factura pendiente para cliente:', cliente.id)
    return NextResponse.json({ ok: true, motivo: 'sin factura pendiente' })
  }

  // Marcar el mensaje whatsapp como respondido
  await supabase
    .from('mensajes_whatsapp')
    .update({ respondido_at: new Date().toISOString() })
    .eq('cliente_id', cliente.id)
    .eq('factura_id', factura.id)
    .is('respondido_at', null)
    .order('enviado_at', { ascending: false })
    .limit(1)

  // Plan Free: guardar sin clasificar
  const planUsuario = await getUserPlan(factura.user_id, supabase)
  if (planUsuario === 'free') {
    await supabase.from('respuestas_clientes').insert({
      factura_id: factura.id,
      cliente_id: factura.cliente_id,
      user_id: factura.user_id,
      org_id: factura.org_id,
      email_de: telefono,
      asunto: 'Respuesta WhatsApp',
      cuerpo: body,
      categoria: 'otro',
      confianza: 'baja',
      resumen: 'Respuesta WhatsApp recibida. Detección automática solo disponible en plan Pro.',
      canal: 'whatsapp',
    })
    return NextResponse.json({ ok: true, facturaId: factura.id, categoria: 'otro', motivo: 'plan_free' })
  }

  // Plan Pro: clasificar con Claude (reutiliza la misma función que email-inbound)
  let clasificacion: {
    categoria: CategoriaRespuesta
    confianza: 'alta' | 'media' | 'baja'
    vacacionesHasta: string | null
    resumen: string
  }
  try {
    clasificacion = await clasificarRespuestaCliente({
      emailDe: telefono,
      asunto: 'Respuesta WhatsApp',
      cuerpo: body,
      numeroFactura: factura.numero,
      importeEuros: Number(factura.importe),
      diasVencida: diasVencida(factura.fecha_vencimiento),
    })
  } catch (e) {
    console.error('[whatsapp-inbound] Error clasificando respuesta:', e)
    return NextResponse.json({ ok: false, error: 'classification_failed' }, { status: 500 })
  }

  // Calcular pausa según categoría (misma lógica que email-inbound)
  const hoy = new Date()
  let pausarHasta: Date | null = null
  let notas: string = clasificacion.resumen

  switch (clasificacion.categoria) {
    case 'pago_confirmado':
      pausarHasta = new Date(hoy.getTime() + 7 * 24 * 3600 * 1000)
      notas = `🟢 PAGO CONFIRMADO por WhatsApp. Verifica en tu cuenta bancaria. — ${clasificacion.resumen}`
      break
    case 'disputa':
      pausarHasta = new Date(hoy.getTime() + 30 * 24 * 3600 * 1000)
      notas = `🟡 DISPUTA vía WhatsApp. Pausado 30 días. — ${clasificacion.resumen}`
      break
    case 'vacaciones': {
      const hastaStr = clasificacion.vacacionesHasta
      if (hastaStr && /^\d{4}-\d{2}-\d{2}$/.test(hastaStr)) {
        pausarHasta = new Date(hastaStr + 'T00:00:00Z')
      } else {
        pausarHasta = new Date(hoy.getTime() + 14 * 24 * 3600 * 1000)
      }
      notas = `🏖️ Vacaciones (WhatsApp). Pausado hasta ${pausarHasta.toISOString().split('T')[0]}. — ${clasificacion.resumen}`
      break
    }
    case 'pidiendo_plazos':
      pausarHasta = new Date(hoy.getTime() + 5 * 24 * 3600 * 1000)
      notas = `💳 Pide plazos vía WhatsApp. Pausado 5 días. — ${clasificacion.resumen}`
      break
    case 'otro':
    default:
      pausarHasta = new Date(hoy.getTime() + 3 * 24 * 3600 * 1000)
      notas = `📱 Respondió por WhatsApp. Pausado 3 días. — ${clasificacion.resumen}`
      break
  }

  // Auto-reply: confirmación automática al deudor según categoría
  const autoReplies: Record<string, string> = {
    pago_confirmado: '✅ Hemos recibido tu confirmación. Verificaremos el pago y no recibirás más recordatorios por esta factura. ¡Gracias!',
    disputa: '📋 Hemos recibido tu mensaje. Alguien de nuestro equipo se pondrá en contacto contigo para resolverlo. Mientras tanto, pausamos los recordatorios.',
    vacaciones: '🏖️ Entendido, reanudaremos el contacto cuando vuelvas. ¡Que descanses!',
    pidiendo_plazos: '💳 Hemos recibido tu solicitud. Nuestro equipo te contactará en breve para acordar un plan de pago.',
    otro: '📩 Hemos recibido tu mensaje. Gracias por responder.',
  }
  const replyText = autoReplies[clasificacion.categoria] ?? autoReplies.otro

  await Promise.all([
    supabase.from('respuestas_clientes').insert({
      factura_id: factura.id,
      cliente_id: factura.cliente_id,
      user_id: factura.user_id,
      org_id: factura.org_id,
      email_de: telefono,
      asunto: 'Respuesta WhatsApp',
      cuerpo: body,
      categoria: clasificacion.categoria,
      confianza: clasificacion.confianza,
      resumen: clasificacion.resumen,
      canal: 'whatsapp',
    }),
    pausarHasta
      ? supabase.from('facturas').update({
          pausada_hasta: pausarHasta.toISOString().split('T')[0],
          notas_internas: notas,
        }).eq('id', factura.id)
      : Promise.resolve(),
    // Enviar confirmación automática al deudor (fire-and-forget, no bloquea)
    enviarWhatsApp({ para: telefono, cuerpo: replyText }).catch(e =>
      console.error('[whatsapp-inbound] auto-reply failed:', e)
    ),
  ])

  return NextResponse.json({
    ok: true,
    facturaId: factura.id,
    categoria: clasificacion.categoria,
    pausarHasta: pausarHasta?.toISOString().split('T')[0] ?? null,
  })
}
