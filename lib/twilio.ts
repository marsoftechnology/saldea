import twilio from 'twilio'

// Número del sandbox de Twilio. En producción, sustituir por el número real aprobado.
// Sandbox: whatsapp:+14155238886
// Producción: whatsapp:+34XXXXXXXXX (cuando Meta apruebe el número de Saldea)
const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886'

function getClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  if (!sid || !token) throw new Error('Twilio credentials not configured')
  return twilio(sid, token)
}

export async function enviarWhatsApp(params: {
  para: string          // número del deudor, p.ej. "+34612345678"
  cuerpo: string        // texto del mensaje (generado por IA)
  facturaId?: string    // para logs
}): Promise<{ enviado: boolean; messageSid?: string }> {
  try {
    const { para, cuerpo } = params

    // Normalizar número: asegurar que tiene prefijo whatsapp:
    const to = para.startsWith('whatsapp:') ? para : `whatsapp:${para}`

    // WhatsApp tiene límite de ~4096 chars; truncar con seguridad
    const body = cuerpo.substring(0, 1600)

    const client = getClient()
    const msg = await client.messages.create({
      from: WHATSAPP_FROM,
      to,
      body,
      statusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp-status`,
    })

    return { enviado: true, messageSid: msg.sid }
  } catch (error) {
    console.error('[twilio] Error enviando WhatsApp:', error)
    return { enviado: false }
  }
}

/**
 * Valida que una petición POST entrante proviene realmente de Twilio.
 * Debe llamarse en los endpoints whatsapp-inbound y whatsapp-status.
 */
export function validarFirmaTwilio(params: {
  signature: string
  url: string
  body: Record<string, string>
}): boolean {
  const token = process.env.TWILIO_AUTH_TOKEN
  if (!token) return false
  return twilio.validateRequest(token, params.signature, params.url, params.body)
}
