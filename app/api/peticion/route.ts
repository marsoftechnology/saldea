import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const H = { 'Content-Type': 'application/json' }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, gestoria, email, telefono, numClientes, tarea, horas, software } = body

    if (!nombre || !gestoria || !email || !numClientes || !tarea) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400, headers: H })
    }

    const softwareStr = Array.isArray(software) && software.length > 0
      ? software.join(', ')
      : 'No especificado'

    const horasStr = horas || 'No especificado'
    const telefonoStr = telefono || 'No proporcionado'

    // ── 1. WhatsApp via CallMeBot ─────────────────────────────────────
    const callmebotKey = process.env.CALLMEBOT_API_KEY
    if (callmebotKey) {
      try {
        const mensaje = `🔔 *Nueva petición en marsof.es*\n\n👤 *${nombre}* — ${gestoria}\n📧 ${email}\n📞 ${telefonoStr}\n👥 Clientes: ${numClientes}\n🕒 Horas/semana: ${horasStr}\n💻 Software: ${softwareStr}\n\n📝 *Tarea:*\n${tarea.substring(0, 300)}${tarea.length > 300 ? '...' : ''}`
        const encoded = encodeURIComponent(mensaje)
        await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=34614341126&text=${encoded}&apikey=${callmebotKey}`,
          { method: 'GET' }
        )
      } catch (e) {
        console.error('[peticion] CallMeBot error:', e)
      }
    } else {
      console.warn('[peticion] CALLMEBOT_API_KEY no configurada — WhatsApp omitido')
    }

    // ── 2. Email backup via Resend ────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: 'Saldea <cobros@marsof.es>',
          to: 'carlosgc@marsof.es',
          subject: `Nueva petición: ${gestoria} — ${nombre}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f11; color: #e4e4e7;">
              <h2 style="color: #38bdf8; margin-bottom: 20px;">🔔 Nueva petición de marsof.es</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #a1a1aa; width: 140px;">Nombre</td><td style="padding: 8px 0; color: #f4f4f5;"><strong>${nombre}</strong></td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Gestoría</td><td style="padding: 8px 0; color: #f4f4f5;">${gestoria}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Email</td><td style="padding: 8px 0; color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Teléfono</td><td style="padding: 8px 0; color: #f4f4f5;">${telefonoStr}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Clientes</td><td style="padding: 8px 0; color: #f4f4f5;">${numClientes}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Horas/semana</td><td style="padding: 8px 0; color: #f4f4f5;">${horasStr}</td></tr>
                <tr><td style="padding: 8px 0; color: #a1a1aa;">Software</td><td style="padding: 8px 0; color: #f4f4f5;">${softwareStr}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #18181b; border-radius: 8px; border-left: 3px solid #38bdf8;">
                <p style="color: #a1a1aa; font-size: 12px; margin: 0 0 8px;">TAREA REPETITIVA</p>
                <p style="color: #f4f4f5; margin: 0; line-height: 1.6;">${tarea.replace(/\n/g, '<br/>')}</p>
              </div>
              <p style="color: #52525b; font-size: 12px; margin-top: 24px;">Enviado desde marsof.es/peticiones</p>
            </div>
          `,
        })
      } catch (e) {
        console.error('[peticion] Resend error:', e)
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: H })
  } catch (err) {
    console.error('[peticion] error:', err)
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500, headers: H })
  }
}
