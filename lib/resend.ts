import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://cobrate.vercel.app'

const T = {
  es: { boton: '✓ Ya he pagado esta factura', botonNota: 'Al hacer clic confirmas que has realizado el pago', footer: 'Este email ha sido enviado automáticamente por Saldea · marsof.es' },
  ca: { boton: '✓ Ja he pagat aquesta factura', botonNota: 'En fer clic confirmes que has realitzat el pagament', footer: 'Aquest correu ha estat enviat automàticament per Saldea · marsof.es' },
  en: { boton: '✓ I have already paid this invoice', botonNota: 'By clicking you confirm that the payment has been made', footer: 'This email was sent automatically by Saldea · marsof.es' },
  pt: { boton: '✓ Já paguei esta fatura', botonNota: 'Ao clicar confirma que efetuou o pagamento', footer: 'Este email foi enviado automaticamente por Saldea · marsof.es' },
} as const

type Idioma = keyof typeof T

export async function enviarEmail(params: {
  para: string
  asunto: string
  cuerpo: string
  desde?: string
  nombreEmpresa?: string | null
  facturaId?: string
  logoUrl?: string | null
  colorPrimario?: string | null
  idioma?: Idioma | null
  adjuntos?: Array<{ nombre: string; contenido: Uint8Array | Buffer; tipo?: string }>
}): Promise<boolean> {
  try {
    const { para, asunto, cuerpo, desde, nombreEmpresa, facturaId, logoUrl, colorPrimario, idioma, adjuntos } = params
    const color = colorPrimario && /^#[0-9a-fA-F]{6}$/.test(colorPrimario) ? colorPrimario : '#059669'
    const i = (idioma && idioma in T ? idioma : 'es') as Idioma
    const t = T[i]

    const botonPago = facturaId ? `
      <div style="margin: 32px 0; text-align: center;">
        <a href="${APP_URL}/api/cobrado?id=${facturaId}"
           style="display: inline-block; background-color: ${color}; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
          ${t.boton}
        </a>
        <p style="color: #999; font-size: 11px; margin-top: 8px;">${t.botonNota}</p>
      </div>
    ` : ''

    const logoHTML = logoUrl ? `
      <div style="margin-bottom: 24px;">
        <img src="${logoUrl}" alt="Logo" style="max-height: 80px; max-width: 200px;" />
      </div>
    ` : ''

    // Sanitiza el nombre de empresa para que sea válido como display name en From
    const nombreLimpio = (nombreEmpresa ?? '').replace(/["<>]/g, '').trim().slice(0, 60)
    const fromDefault = nombreLimpio
      ? `${nombreLimpio} <cobros@marsof.es>`
      : 'Saldea <cobros@marsof.es>'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      from: desde ?? fromDefault,
      to: para,
      subject: asunto,
      reply_to: facturaId ? `cobros+${facturaId}@marsof.es` : undefined,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${logoHTML}
          ${cuerpo.replace(/\n/g, '<br/>')}
          ${botonPago}
          <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            ${t.footer}
          </p>
        </div>
      `,
    }

    if (adjuntos && adjuntos.length > 0) {
      payload.attachments = adjuntos.map(a => ({
        filename: a.nombre,
        content: Buffer.from(a.contenido),
        type: a.tipo ?? 'application/pdf',
      }))
    }

    await getResend().emails.send(payload)
    return true
  } catch (error) {
    console.error('Error enviando email:', error)
    return false
  }
}
