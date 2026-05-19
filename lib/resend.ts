import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

const T = {
  es: { boton: '✓ Ya he pagado esta factura', botonNota: 'Al hacer clic confirmas que has realizado el pago', botonPagar: '💳 Pagar ahora', botonPagarNota: 'Te lleva al sistema de pago seguro del emisor', footer: 'Este email ha sido enviado automáticamente por Saldea · marsof.es' },
  ca: { boton: '✓ Ja he pagat aquesta factura', botonNota: 'En fer clic confirmes que has realitzat el pagament', botonPagar: '💳 Pagar ara', botonPagarNota: 'Et porta al sistema de pagament segur de l\'emissor', footer: 'Aquest correu ha estat enviat automàticament per Saldea · marsof.es' },
  en: { boton: '✓ I have already paid this invoice', botonNota: 'By clicking you confirm that the payment has been made', botonPagar: '💳 Pay now', botonPagarNota: 'Takes you to the issuer\'s secure payment system', footer: 'This email was sent automatically by Saldea · marsof.es' },
  pt: { boton: '✓ Já paguei esta fatura', botonNota: 'Ao clicar confirma que efetuou o pagamento', botonPagar: '💳 Pagar agora', botonPagarNota: 'Leva-o ao sistema de pagamento seguro do emissor', footer: 'Este email foi enviado automaticamente por Saldea · marsof.es' },
} as const

type Idioma = keyof typeof T

function escaparHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

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
  linkPago?: string | null
}): Promise<boolean> {
  try {
    const { para, asunto, cuerpo, desde, nombreEmpresa, facturaId, logoUrl, colorPrimario, idioma, adjuntos, linkPago } = params
    const color = colorPrimario && /^#[0-9a-fA-F]{6}$/.test(colorPrimario) ? colorPrimario : '#0284c7'
    const i = (idioma && idioma in T ? idioma : 'es') as Idioma
    const t = T[i]

    // Validar link de pago en server (defensa en profundidad)
    let linkPagoValido: string | null = null
    if (linkPago) {
      try {
        const u = new URL(linkPago)
        if (u.protocol === 'http:' || u.protocol === 'https:') linkPagoValido = linkPago
      } catch { /* link inválido, ignorar */ }
    }

    const botonPagar = linkPagoValido ? `
      <div style="margin: 32px 0; text-align: center;">
        <a href="${escaparHtml(linkPagoValido)}"
           style="display: inline-block; background-color: ${color}; color: white; padding: 16px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 2px 8px rgba(2,132,199,0.25);">
          ${t.botonPagar}
        </a>
        <p style="color: #999; font-size: 11px; margin-top: 8px;">${t.botonPagarNota}</p>
      </div>
    ` : ''

    const botonPago = facturaId ? `
      <div style="margin: ${linkPagoValido ? '8px' : '32px'} 0; text-align: center;">
        <a href="${APP_URL}/api/cobrado?id=${facturaId}"
           style="display: inline-block; ${linkPagoValido ? 'background-color: transparent; color: #666; border: 1px solid #ccc;' : `background-color: ${color}; color: white;`} padding: ${linkPagoValido ? '10px 24px' : '14px 32px'}; border-radius: 8px; text-decoration: none; font-weight: ${linkPagoValido ? 'normal' : 'bold'}; font-size: ${linkPagoValido ? '13px' : '15px'};">
          ${t.boton}
        </a>
        ${linkPagoValido ? '' : `<p style="color: #999; font-size: 11px; margin-top: 8px;">${t.botonNota}</p>`}
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
      replyTo: facturaId ? `cobros+${facturaId}@marsof.es` : undefined,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${logoHTML}
          ${cuerpo.replace(/\n/g, '<br/>')}
          ${botonPagar}
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
