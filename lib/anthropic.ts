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
  tono: 'amigable' | 'firme' | 'formal' | 'extremo'
  nombreEmpresa: string
  idioma?: 'es' | 'ca' | 'en' | 'pt'
  ofrecerPagoPlazos?: boolean
  variarTextos?: boolean
  recargoMoraPct?: number
  descuentoProntoPagoPct?: number
  descuentoProntoPagoDias?: number
}): Promise<{ asunto: string; cuerpo: string }> {
  const { nombreCliente, empresa, numeroFactura, importe, diasVencida, tono, nombreEmpresa, idioma = 'es', ofrecerPagoPlazos = false, variarTextos = false, recargoMoraPct = 0, descuentoProntoPagoPct = 0, descuentoProntoPagoDias = 7 } = params

  const idiomaInstruccion = {
    es: 'El email debe estar completamente en español y ser apropiado para el mercado español.',
    ca: 'L\'email ha d\'estar completament en català i ser apropiat per al mercat català (Catalunya, Illes Balears, País Valencià).',
    en: 'The email must be entirely in professional English, suitable for international business.',
    pt: 'O email deve estar completamente em português (de Portugal) e ser apropriado para o mercado português.',
  }[idioma]

  const instruccionesTono = {
    amigable: 'Usa un tono amable y comprensivo. Asume que puede ser un olvido. Sé cercano pero profesional.',
    firme: 'Usa un tono firme y directo. Deja claro que la situación requiere atención inmediata. Mantén la profesionalidad.',
    formal: 'Usa un tono muy formal y serio. Menciona que se tomarán medidas legales si no se resuelve. Sé conciso y contundente.',
    extremo: 'Tono extremo y duro, sin contemplaciones. Este es el ÚLTIMO aviso amistoso antes de iniciar acciones legales. Da plazo máximo de 7 días naturales para regularizar el pago. Avisa explícitamente: (1) que se procederá a reclamación judicial sin más avisos, (2) que los costes legales y de procurador serán a cargo del deudor, (3) que se podrá inscribir al deudor en registros de morosos (ASNEF, RAI). Sin saludos cordiales, conciso, duro y profesional. Nada de empatía. Asunto en mayúsculas.',
  }

  const prompt = `Eres el asistente de cobros de "${nombreEmpresa}", una empresa española.

Escribe un email de reclamación de pago con los siguientes datos:
- Cliente: ${nombreCliente}${empresa ? ` (${empresa})` : ''}
- Número de factura: ${numeroFactura}
- Importe: ${importe.toFixed(2)}€
- Días vencida: ${diasVencida} días

Instrucciones de tono: ${instruccionesTono[tono]}
${ofrecerPagoPlazos ? '\nDado que la factura lleva varios días impagada, incluye en el email una propuesta CLARA de fraccionar el pago en plazos (2-3 cuotas mensuales) si el cliente lo necesita. Que se note que es una opción flexible para facilitar el cobro, no una concesión por debilidad.\n' : ''}
${variarTextos ? '\nVARÍA el vocabulario, las fórmulas de inicio y cierre, la estructura de párrafos y los giros respecto a un email estándar. No uses frases hechas obvias del cobro automatizado ("Le recordamos que...", "Esperamos su pronto pago..."). Que suene a alguien escribiendo a mano, no a una plantilla.\n' : ''}
${recargoMoraPct > 0 ? `\nInforma al cliente de que su factura está siendo objeto de un recargo del ${recargoMoraPct}% por mora (es decir, ${(importe * recargoMoraPct / 100).toFixed(2)}€ adicionales sobre el importe original). Menciónalo claramente para que entienda la urgencia.\n` : ''}
${descuentoProntoPagoPct > 0 ? `\nOFRECE un descuento por pronto pago: si el cliente abona la factura en los próximos ${descuentoProntoPagoDias} días desde HOY, se beneficiará de un ${descuentoProntoPagoPct}% de descuento (ahorraría ${(importe * descuentoProntoPagoPct / 100).toFixed(2)}€). Preséntalo como un incentivo positivo, no como una amenaza.\n` : ''}
${idiomaInstruccion}
Devuelve SOLO un JSON con este formato exacto, sin texto adicional:
{"asunto": "...", "cuerpo": "..."}`

  const respuesta = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const texto = respuesta.content[0].type === 'text' ? respuesta.content[0].text : ''
  const limpio = texto.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
  return JSON.parse(limpio)
}

export type CategoriaRespuesta = 'pago_confirmado' | 'disputa' | 'vacaciones' | 'pidiendo_plazos' | 'otro'

export async function clasificarRespuestaCliente(params: {
  emailDe: string
  asunto: string
  cuerpo: string
  numeroFactura: string
  importeEuros: number
  diasVencida: number
}): Promise<{
  categoria: CategoriaRespuesta
  confianza: 'alta' | 'media' | 'baja'
  vacacionesHasta: string | null
  resumen: string
}> {
  const prompt = `Eres un asistente que clasifica respuestas de clientes a recordatorios de cobro.

Contexto de la factura impagada:
- Factura: ${params.numeroFactura}
- Importe: ${params.importeEuros.toFixed(2)}€
- Días vencida: ${params.diasVencida}

Email del cliente recibido (RESPUESTA al recordatorio):
- De: ${params.emailDe}
- Asunto: ${params.asunto}
- Cuerpo:
${params.cuerpo.substring(0, 3000)}

Clasifica este email en UNA de estas categorías:
1. "pago_confirmado": el cliente dice que YA HA PAGADO (ej: "ya te he transferido", "ya está hecho", "lo pagué la semana pasada"). NO cuenta si dice "voy a pagar" o "pagaré pronto".
2. "pidiendo_plazos": el cliente pide fraccionar el pago o pagar más tarde (ej: "¿puedo pagar en 2 meses?", "estoy mal de liquidez").
3. "disputa": el cliente discute la factura, no está de acuerdo, dice que no debe nada, que el servicio no fue como esperaba, etc.
4. "vacaciones": es un auto-reply de "estoy fuera/vacaciones/out of office". Suele venir de un sistema automático.
5. "otro": cualquier otra cosa (preguntas, confusión, mensajes irrelevantes).

Si la categoría es "vacaciones" y puedes extraer una fecha de fin de las vacaciones (ej: "volveré el 15 de agosto"), inclúyela en formato YYYY-MM-DD. Si no, null.

Devuelve SOLO un JSON con este formato exacto:
{"categoria": "...", "confianza": "alta|media|baja", "vacacionesHasta": "YYYY-MM-DD"|null, "resumen": "frase corta describiendo el contenido"}`

  const respuesta = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  })

  // Buscar el primer bloque de texto entre todos los content blocks
  const textBlock = (respuesta.content ?? []).find(c => c.type === 'text') as { type: 'text', text: string } | undefined
  const texto = textBlock?.text ?? ''
  const limpio = texto.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()

  try {
    return JSON.parse(limpio)
  } catch {
    console.error('Clasificación: JSON inválido. stop_reason:', respuesta.stop_reason, 'content types:', respuesta.content?.map(c => c.type), 'texto:', texto.substring(0, 500))
    return {
      categoria: 'otro' as CategoriaRespuesta,
      confianza: 'baja' as const,
      vacacionesHasta: null,
      resumen: 'No se pudo clasificar automáticamente. Revisa el email manualmente.',
    }
  }
}
