import Anthropic from '@anthropic-ai/sdk'

function getAnthropic() {
  const apiKey = process.env.CLAUDE_KEY || process.env.ANTHROPIC_API_KEY
  return new Anthropic({ apiKey })
}

export async function generarMensajeRecordatorio(params: {
  nombreCliente: string
  empresa: string | null
  numeroFactura: string
  importe: number
  diasVencida: number
  tono: 'amigable' | 'firme' | 'formal'
  nombreEmpresa: string
}): Promise<{ asunto: string; cuerpo: string }> {
  const { nombreCliente, empresa, numeroFactura, importe, diasVencida, tono, nombreEmpresa } = params

  const instruccionesTono = {
    amigable: 'Usa un tono amable y comprensivo. Asume que puede ser un olvido. Sé cercano pero profesional.',
    firme: 'Usa un tono firme y directo. Deja claro que la situación requiere atención inmediata. Mantén la profesionalidad.',
    formal: 'Usa un tono muy formal y serio. Menciona que se tomarán medidas legales si no se resuelve. Sé conciso y contundente.',
  }

  const prompt = `Eres el asistente de cobros de "${nombreEmpresa}", una empresa española.

Escribe un email de reclamación de pago con los siguientes datos:
- Cliente: ${nombreCliente}${empresa ? ` (${empresa})` : ''}
- Número de factura: ${numeroFactura}
- Importe: ${importe.toFixed(2)}€
- Días vencida: ${diasVencida} días

Instrucciones de tono: ${instruccionesTono[tono]}

El email debe estar completamente en español y ser apropiado para el mercado español.
Devuelve SOLO un JSON con este formato exacto, sin texto adicional:
{"asunto": "...", "cuerpo": "..."}`

  const respuesta = await getAnthropic().messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const texto = respuesta.content[0].type === 'text' ? respuesta.content[0].text : ''
  const limpio = texto.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
  return JSON.parse(limpio)
}
