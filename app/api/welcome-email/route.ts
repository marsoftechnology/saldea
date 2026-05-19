import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export const runtime = 'nodejs'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

/**
 * Envía un email de bienvenida cuando un usuario se registra.
 * Se llama desde la página /registro inmediatamente después del signUp.
 * Sólo envía si hay sesión activa (el usuario está recién creado y autenticado).
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[welcome-email] RESEND_API_KEY no configurada')
      return NextResponse.json({ ok: false, error: 'no_api_key' }, { status: 200 })
    }

    // El cliente envía nombre y empresa opcionales. El email lo sacamos del usuario autenticado.
    const body = await req.json().catch(() => ({})) as { nombre?: string; empresa?: string }
    const nombre = (body.nombre ?? '').trim().slice(0, 60)
    const empresa = (body.empresa ?? '').trim().slice(0, 80)

    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) {
      return NextResponse.json({ ok: false, error: 'no_user' }, { status: 401 })
    }

    const saludo = nombre ? `Hola ${nombre},` : 'Hola,'
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 32px 24px; border-radius: 12px; color: white; margin-bottom: 24px;">
          <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">
            Bienvenido a Saldea ${nombre ? '· ' + nombre : ''}
          </h1>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            Tu trial gratuito de 1 mes ya está activo
          </p>
        </div>

        <p style="font-size: 15px; line-height: 1.6;">${saludo}</p>

        <p style="font-size: 15px; line-height: 1.6;">
          Gracias por probar Saldea${empresa ? ` para <strong>${empresa.replace(/[<>"']/g, '')}</strong>` : ''}.
          Saldea persigue tus facturas por ti, las 24h del día, escribiendo emails personalizados con IA
          hasta que tus clientes pagan.
        </p>

        <h2 style="font-size: 17px; margin-top: 32px; margin-bottom: 12px; color: #0f172a;">Por dónde empezar</h2>
        <ol style="font-size: 15px; line-height: 1.7; padding-left: 20px;">
          <li><strong>Importa tus facturas pendientes</strong> desde un CSV o súbelas una a una.</li>
          <li><strong>Define el tono</strong> de los recordatorios en Ajustes (amigable / firme / contundente).</li>
          <li><strong>Activa los recordatorios automáticos</strong> y olvídate de perseguir cobros.</li>
        </ol>

        <div style="margin: 32px 0; text-align: center;">
          <a href="${APP_URL}/dashboard"
             style="display: inline-block; background-color: #0284c7; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">
            Ir a mi dashboard
          </a>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          Si tienes cualquier duda, simplemente responde a este email. Lo lee una persona, no un bot.
        </p>

        <hr style="margin: 32px 0 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">
          Saldea es un producto de Marsof Technology · Niebla, Huelva (España)<br/>
          ¿No te has registrado? Ignora este email.
        </p>
      </div>
    `

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Saldea <hola@marsof.es>',
      to: user.email,
      replyTo: 'carlosgc@marsof.es',
      subject: '¡Bienvenido a Saldea! · Empieza aquí',
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[welcome-email] error:', error)
    // Nunca fallar el flow de registro por un email
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
