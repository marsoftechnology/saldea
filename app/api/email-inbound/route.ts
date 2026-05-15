import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { clasificarRespuestaCliente, type CategoriaRespuesta } from '@/lib/anthropic'
import { diasVencida } from '@/lib/utils'
import { getUserPlan } from '@/lib/plan'

export async function POST(req: NextRequest) {
  // Autenticación: solo Cloudflare Email Worker debe poder llamar
  const auth = req.headers.get('x-saldea-secret')
  if (auth !== process.env.EMAIL_INBOUND_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json() as {
    from?: string
    to?: string
    subject?: string
    body?: string
  }

  if (!body.from || !body.subject || !body.body) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  console.log('[email-inbound] FROM:', body.from, '| TO:', body.to, '| SUBJECT:', body.subject, '| BODY_LEN:', body.body?.length, '| BODY_HEAD:', body.body?.substring(0, 200))

  // Extraer factura_id del recipient (formato: cobros+<uuid>@marsof.es)
  let facturaId: string | null = null
  const matchTo = body.to?.match(/cobros\+([a-f0-9-]+)@/i)
  if (matchTo) facturaId = matchTo[1]
  // Fallback: extraer del subject (formato "Re: ... factura 2026-001")
  // (los recordatorios incluyen el numero, no el id — necesitará match contra DB)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  let factura: { id: string; user_id: string; org_id: string; cliente_id: string; numero: string; importe: number; fecha_vencimiento: string; estado: string } | null = null

  if (facturaId) {
    const { data } = await supabase
      .from('facturas')
      .select('id, user_id, org_id, cliente_id, numero, importe, fecha_vencimiento, estado')
      .eq('id', facturaId)
      .maybeSingle()
    factura = data
  }

  // Fallback: buscar la factura más reciente pendiente del cliente que envía
  if (!factura) {
    const { data: cliente } = await supabase
      .from('clientes')
      .select('id, org_id')
      .ilike('email', body.from)
      .maybeSingle()

    if (cliente) {
      const { data } = await supabase
        .from('facturas')
        .select('id, user_id, org_id, cliente_id, numero, importe, fecha_vencimiento, estado')
        .eq('cliente_id', cliente.id)
        .eq('org_id', cliente.org_id)
        .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada'])
        .order('fecha_vencimiento', { ascending: false })
        .limit(1)
        .maybeSingle()
      factura = data
    }
  }

  if (!factura) {
    return NextResponse.json({ ok: true, motivo: 'factura no encontrada — email guardado para revisión' })
  }

  // El plan Free no incluye detección de respuestas: guardamos la respuesta como "otro"
  // sin pasarla por IA y sin aplicar pausas automáticas. El usuario debe revisar manualmente.
  const planUsuario = await getUserPlan(factura.user_id, supabase)
  if (planUsuario === 'free') {
    await supabase.from('respuestas_clientes').insert({
      factura_id: factura.id,
      cliente_id: factura.cliente_id,
      user_id: factura.user_id,
      org_id: factura.org_id,
      email_de: body.from,
      asunto: body.subject,
      cuerpo: body.body,
      categoria: 'otro',
      confianza: 'baja',
      resumen: 'Respuesta recibida del cliente. Detección automática solo disponible en plan Pro.',
    })
    return NextResponse.json({
      ok: true,
      facturaId: factura.id,
      categoria: 'otro',
      motivo: 'plan_free_sin_clasificacion',
    })
  }

  // Plan Pro: clasificar con Claude
  let clasificacion: {
    categoria: CategoriaRespuesta
    confianza: 'alta' | 'media' | 'baja'
    vacacionesHasta: string | null
    resumen: string
  }
  try {
    clasificacion = await clasificarRespuestaCliente({
      emailDe: body.from,
      asunto: body.subject,
      cuerpo: body.body,
      numeroFactura: factura.numero,
      importeEuros: Number(factura.importe),
      diasVencida: diasVencida(factura.fecha_vencimiento),
    })
  } catch (e) {
    console.error('Error clasificando respuesta:', e)
    return NextResponse.json({ ok: false, error: 'classification_failed' }, { status: 500 })
  }

  // Acción según categoría
  const hoy = new Date()
  let pausarHasta: Date | null = null
  let nuevoEstado: string | null = null
  let notas: string = clasificacion.resumen

  switch (clasificacion.categoria) {
    case 'pago_confirmado':
      // No marcamos directamente como cobrada (necesita confirmación humana)
      // Pero pausamos 7 días para no acosar mientras el usuario verifica
      pausarHasta = new Date(hoy.getTime() + 7 * 24 * 3600 * 1000)
      notas = `🟢 PAGO CONFIRMADO por el cliente. Verifica en tu cuenta bancaria y marca como cobrada manualmente. — ${clasificacion.resumen}`
      break
    case 'disputa':
      pausarHasta = new Date(hoy.getTime() + 30 * 24 * 3600 * 1000)
      notas = `🟡 DISPUTA del cliente. Recordatorios pausados 30 días, contacta tú con él. — ${clasificacion.resumen}`
      break
    case 'vacaciones': {
      const hastaStr = clasificacion.vacacionesHasta
      if (hastaStr && /^\d{4}-\d{2}-\d{2}$/.test(hastaStr)) {
        pausarHasta = new Date(hastaStr + 'T00:00:00Z')
      } else {
        pausarHasta = new Date(hoy.getTime() + 14 * 24 * 3600 * 1000)
      }
      notas = `🏖️ Cliente de vacaciones. Pausado hasta ${pausarHasta.toISOString().split('T')[0]}. — ${clasificacion.resumen}`
      break
    }
    case 'pidiendo_plazos':
      pausarHasta = new Date(hoy.getTime() + 5 * 24 * 3600 * 1000)
      notas = `💳 El cliente pide fraccionamiento o más tiempo. Pausado 5 días — responde tú con la propuesta. — ${clasificacion.resumen}`
      break
    case 'otro':
    default:
      pausarHasta = new Date(hoy.getTime() + 3 * 24 * 3600 * 1000)
      notas = `📬 Cliente respondió. Pausado 3 días — revisa qué dice. — ${clasificacion.resumen}`
      break
  }

  // Guardar la respuesta y aplicar pausa
  await Promise.all([
    supabase.from('respuestas_clientes').insert({
      factura_id: factura.id,
      cliente_id: factura.cliente_id,
      user_id: factura.user_id,
      org_id: factura.org_id,
      email_de: body.from,
      asunto: body.subject,
      cuerpo: body.body,
      categoria: clasificacion.categoria,
      confianza: clasificacion.confianza,
      resumen: clasificacion.resumen,
    }),
    pausarHasta
      ? supabase.from('facturas').update({
          pausada_hasta: pausarHasta.toISOString().split('T')[0],
          notas_internas: notas,
        }).eq('id', factura.id)
      : Promise.resolve(),
    nuevoEstado
      ? supabase.from('facturas').update({ estado: nuevoEstado }).eq('id', factura.id)
      : Promise.resolve(),
  ])

  return NextResponse.json({
    ok: true,
    facturaId: factura.id,
    categoria: clasificacion.categoria,
    pausarHasta: pausarHasta?.toISOString().split('T')[0] ?? null,
  })
}
