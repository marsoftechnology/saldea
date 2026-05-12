import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function enviarEmail(params: {
  para: string
  asunto: string
  cuerpo: string
  desde?: string
}): Promise<boolean> {
  try {
    const { para, asunto, cuerpo, desde } = params

    await getResend().emails.send({
      from: desde ?? 'Numio <onboarding@resend.dev>',
      to: para,
      subject: asunto,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          ${cuerpo.replace(/\n/g, '<br/>')}
          <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Este email ha sido enviado automáticamente por Numio.
          </p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error('Error enviando email:', error)
    return false
  }
}
