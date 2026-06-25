import Anthropic from '@anthropic-ai/sdk'

function getAnthropic(clientKey?: string | null) {
  const apiKey = clientKey || process.env.CLAUDE_KEY || process.env.ANTHROPIC_API_KEY
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
  tieneLinkPago?: boolean
  importePagado?: number
  claudeApiKey?: string | null
}): Promise<{ asunto: string; cuerpo: string }> {
  const { nombreCliente, empresa, numeroFactura, importe, diasVencida, tono, nombreEmpresa, idioma = 'es', ofrecerPagoPlazos = false, variarTextos = false, recargoMoraPct = 0, descuentoProntoPagoPct = 0, descuentoProntoPagoDias = 7, tieneLinkPago = false, importePagado = 0, claudeApiKey } = params

  const pendiente = Math.max(0, importe - importePagado)
  const hayPagoParcial = importePagado > 0.005 && pendiente > 0.005

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

  const estadoFactura = diasVencida < 0
    ? `la factura TODAVÍA NO está vencida: vence en ${Math.abs(diasVencida)} días`
    : diasVencida === 0
    ? 'la factura vence HOY'
    : `la factura lleva ${diasVencida} días VENCIDA (impagada)`

  const instruccionesTonoAjustado = diasVencida < 0
    ? 'Usa un tono amable y preventivo. La factura todavía no está vencida: recuérdale al cliente que el pago se acerca. Sé cercano, profesional y positivo. NO uses palabras como "vencida", "impagada", "urgente", "reclamación" ni nada similar.'
    : instruccionesTono[tono]

  const datosImporte = hayPagoParcial
    ? `- Importe total de la factura: ${importe.toFixed(2)}€
- Importe YA PAGADO: ${importePagado.toFixed(2)}€ (PAGO PARCIAL recibido)
- Importe PENDIENTE de cobro: ${pendiente.toFixed(2)}€ (este es el saldo a reclamar)`
    : `- Importe: ${importe.toFixed(2)}€`

  const instruccionPagoParcial = hayPagoParcial
    ? '\nIMPORTANTE: El cliente ya ha realizado un PAGO PARCIAL. AGRADÉCELE el abono recibido y centra la reclamación SOLO en el importe pendiente. Sé claro: "Tras tu pago de X€, queda pendiente Y€". No reclames el total original.\n'
    : ''

  const prompt = `Eres el asistente de cobros de "${nombreEmpresa}", una empresa española.

Escribe un email relacionado con el pago de la siguiente factura:
- Cliente: ${nombreCliente}${empresa ? ` (${empresa})` : ''}
- Número de factura: ${numeroFactura}
${datosImporte}
- Estado: ${estadoFactura}
${instruccionPagoParcial}
Instrucciones de tono: ${instruccionesTonoAjustado}
${ofrecerPagoPlazos ? '\nDado que la factura lleva varios días impagada, incluye en el email una propuesta CLARA de fraccionar el pago en plazos (2-3 cuotas mensuales) si el cliente lo necesita. Que se note que es una opción flexible para facilitar el cobro, no una concesión por debilidad.\n' : ''}
${variarTextos ? '\nVARÍA el vocabulario, las fórmulas de inicio y cierre, la estructura de párrafos y los giros respecto a un email estándar. No uses frases hechas obvias del cobro automatizado ("Le recordamos que...", "Esperamos su pronto pago..."). Que suene a alguien escribiendo a mano, no a una plantilla.\n' : ''}
${recargoMoraPct > 0 && diasVencida > 0 ? `\nInforma al cliente de los intereses de demora legales acumulados según la Ley 3/2004 de Morosidad Comercial. Datos exactos a incluir en el email:\n- Intereses legales (tipo BCE+8 puntos = 12,5% anual, 2026): ${(importe * 0.125 * diasVencida / 365).toFixed(2)}€\n- Indemnización fija por costes de cobro (art. 6 Ley 3/2004): 40,00€\n- TOTAL adicional que ya se debe por encima de la factura: ${(importe * 0.125 * diasVencida / 365 + 40).toFixed(2)}€\n- La deuda crece ${(importe * 0.125 / 365).toFixed(2)}€ cada día adicional de retraso.\nMenciónalo de forma clara y contundente para que entienda que el importe a pagar crece con el tiempo. Cita la Ley 3/2004 expresamente.\n` : recargoMoraPct > 0 ? `\nInforma al cliente de que su factura está siendo objeto de un recargo del ${recargoMoraPct}% por mora (es decir, ${(importe * recargoMoraPct / 100).toFixed(2)}€ adicionales sobre el importe original). Menciónalo claramente para que entienda la urgencia.\n` : ''}
${descuentoProntoPagoPct > 0 ? `\nOFRECE un descuento por pronto pago: si el cliente abona la factura en los próximos ${descuentoProntoPagoDias} días desde HOY, se beneficiará de un ${descuentoProntoPagoPct}% de descuento (ahorraría ${(importe * descuentoProntoPagoPct / 100).toFixed(2)}€). Preséntalo como un incentivo positivo, no como una amenaza.\n` : ''}
${tieneLinkPago ? '\nIMPORTANTE: Al final de este email aparecerá automáticamente un botón "Pagar ahora" con un enlace de pago online. NO incluyas ninguna URL ni instrucciones de transferencia bancaria. Menciona simplemente que puede pagar al instante haciendo clic en el botón que verá a continuación. Una sola frase basta.\n' : ''}
${idiomaInstruccion}
Devuelve SOLO un JSON con este formato exacto, sin texto adicional:
{"asunto": "...", "cuerpo": "..."}`

  const respuesta = await getAnthropic(claudeApiKey).messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    tools: [{
      name: 'email_recordatorio',
      description: 'Genera el email de recordatorio de cobro con asunto y cuerpo',
      input_schema: {
        type: 'object' as const,
        properties: {
          asunto: { type: 'string', description: 'Asunto del email' },
          cuerpo: { type: 'string', description: 'Cuerpo del email en texto plano, con saltos de línea reales' },
        },
        required: ['asunto', 'cuerpo'],
      },
    }],
    tool_choice: { type: 'tool', name: 'email_recordatorio' },
    messages: [{ role: 'user', content: prompt }],
  })

  const toolUse = respuesta.content.find(c => c.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') throw new Error('No tool_use response from Claude')
  return toolUse.input as { asunto: string; cuerpo: string }
}

export type CategoriaRespuesta = 'pago_confirmado' | 'disputa' | 'vacaciones' | 'pidiendo_plazos' | 'otro'

export async function clasificarRespuestaCliente(params: {
  emailDe: string
  asunto: string
  cuerpo: string
  numeroFactura: string
  importeEuros: number
  diasVencida: number
  claudeApiKey?: string | null
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

  const respuesta = await getAnthropic(params.claudeApiKey).messages.create({
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
