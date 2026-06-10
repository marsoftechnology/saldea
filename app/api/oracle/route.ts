import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

type OracleRequest = {
  message?: string
  context?: string
}

function getApiKey() {
  return process.env.CLAUDE_KEY || process.env.ANTHROPIC_API_KEY || ''
}

function buildDemoAnswer(message: string) {
  return `ORACLE está funcionando en modo demo.

Pregunta recibida:
"${message}"

Análisis inicial:
SALDEA debería priorizar los cobros según tres factores principales:

1. Importe pendiente
Cuanto mayor sea el importe, mayor impacto tiene recuperar ese cobro.

2. Días de vencimiento
Una factura vencida hace 30, 60 o 90 días necesita una estrategia más firme que una factura recién vencida.

3. Relación con el cliente
No se debe usar el mismo tono con un cliente habitual que con uno conflictivo o que ya ha ignorado varios avisos.

Siguiente acción recomendada:
Revisar las facturas vencidas, ordenar por importe y antigüedad, y enviar un primer recordatorio personalizado. Si el cliente ya recibió avisos previos, escalar el tono de amable a firme.

Nota:
Esta respuesta es simulada porque todavía no hay una clave Claude configurada en el entorno local.`
}

function buildOraclePrompt(message: string, context?: string) {
  return `Eres ORACLE, el módulo inteligente de SALDEA.

SALDEA es un sistema B2B para autónomos, gestorías y pymes que ayuda a gestionar facturas vencidas, automatizar recordatorios de cobro, redactar comunicaciones profesionales y priorizar acciones para recuperar pagos pendientes.

Tu función:
- Analizar situaciones de cobro.
- Priorizar facturas o clientes según riesgo.
- Proponer siguientes pasos.
- Redactar mensajes de email o WhatsApp.
- Ayudar a recuperar pagos sin dañar innecesariamente la relación comercial.
- Ser claro, práctico y prudente.

Reglas:
- Responde siempre en español.
- No inventes datos que no aparezcan en el contexto.
- Si faltan datos, dilo claramente.
- No prometas resultados legales.
- No des asesoramiento jurídico cerrado; recomienda validar con un profesional si hay reclamación judicial, burofax o medidas legales.
- Mantén un tono profesional, directo y útil.
- Si el usuario pide un mensaje, redacta el mensaje listo para usar.
- Si el usuario pide estrategia, responde con pasos ordenados.
- Si el usuario pregunta qué priorizar, explica el criterio.

Contexto adicional disponible:
${context?.trim() || 'No se ha proporcionado contexto adicional.'}

Pregunta del usuario:
${message}

Responde como ORACLE de SALDEA.`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as OracleRequest | null
    const message = body?.message?.trim()
    const context = body?.context?.trim()

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Falta la pregunta para ORACLE.',
        },
        { status: 400 }
      )
    }

    const apiKey = getApiKey()

    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        mode: 'demo',
        answer: buildDemoAnswer(message),
      })
    }

    const anthropic = new Anthropic({ apiKey })

    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-6',
      max_tokens: 1200,
      temperature: 0.4,
      messages: [
        {
          role: 'user',
          content: buildOraclePrompt(message, context),
        },
      ],
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    const answer = textBlock && textBlock.type === 'text'
      ? textBlock.text
      : 'ORACLE no ha podido generar una respuesta válida.'

    return NextResponse.json({
      ok: true,
      mode: 'claude',
      answer,
    })
  } catch (error) {
    console.error('ORACLE error:', error)

    return NextResponse.json(
      {
        ok: false,
        error: 'Error interno consultando ORACLE.',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: 'ORACLE',
    description: 'Módulo inteligente de SALDEA para análisis y estrategia de cobros.',
    endpoint: '/api/oracle',
    methods: ['GET', 'POST'],
  })
}
