import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validarFirmaTwilio } from '@/lib/twilio'

/**
 * Recibe callbacks de estado de Twilio:
 * sent → delivered → read | failed | undelivered
 *
 * Twilio envía form-urlencoded con campos:
 *   MessageSid, MessageStatus, To, From, etc.
 */
export async function POST(req: NextRequest) {
  // Parsear el form body
  const formData = await req.formData()
  const params: Record<string, string> = {}
  formData.forEach((value, key) => { params[key] = String(value) })

  // Validar firma Twilio
  const signature = req.headers.get('x-twilio-signature') ?? ''
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp-status`
  if (!validarFirmaTwilio({ signature, url, body: params })) {
    console.warn('[whatsapp-status] Firma inválida')
    return NextResponse.json({ error: 'Firma inválida' }, { status: 403 })
  }

  const { MessageSid, MessageStatus } = params
  if (!MessageSid || !MessageStatus) {
    return NextResponse.json({ ok: true }) // ignorar callbacks incompletos
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const ahora = new Date().toISOString()
  const updates: Record<string, string> = { estado: MessageStatus }

  if (MessageStatus === 'delivered') updates.entregado_at = ahora
  if (MessageStatus === 'read') updates.leido_at = ahora
  if (MessageStatus === 'failed' || MessageStatus === 'undelivered') {
    updates.estado = 'fallido'
  }

  await supabase
    .from('mensajes_whatsapp')
    .update(updates)
    .eq('twilio_message_sid', MessageSid)

  return NextResponse.json({ ok: true })
}
