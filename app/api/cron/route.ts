import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generarMensajeRecordatorio } from '@/lib/anthropic'
import { enviarEmail } from '@/lib/resend'
import { generarPDFFactura } from '@/lib/pdf'
import { diasVencida, formatearEuros, formatearFecha } from '@/lib/utils'
import { renderizarPlantilla, esFestivoNacionalES } from '@/lib/recordatorios'
import { LIMITES_FREE, type Plan } from '@/lib/plan'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const hoy = new Date().toISOString().split('T')[0]

  // Detectar si hoy es fin de semana en hora España
  const diaSemanaES = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
  }).format(new Date())
  const esFinDeSemana = diaSemanaES === 'Sat' || diaSemanaES === 'Sun'
  const esFestivo = esFestivoNacionalES(new Date())

  // Si es fin de semana o festivo, filtrar por preferencias del usuario
  let userIdsPermitidos: string[] | null = null
  if (esFinDeSemana || esFestivo) {
    let query = supabase.from('configuraciones_usuario').select('user_id')
    if (esFinDeSemana) query = query.eq('enviar_fin_semana', true)
    if (esFestivo) query = query.eq('evitar_festivos', false)
    const { data: configs } = await query
    userIdsPermitidos = (configs ?? []).map(c => c.user_id)
    if (userIdsPermitidos.length === 0) {
      return NextResponse.json({
        procesadas: 0,
        enviados: 0,
        motivo: esFinDeSemana ? 'fin de semana sin usuarios permitidos' : 'festivo nacional sin usuarios permitidos',
      })
    }
  }

  let query = supabase
    .from('facturas')
    .select('*, cliente:clientes(*), recordatorios(*)')
    .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada'])
    .lte('fecha_vencimiento', hoy)
    .or(`pausada_hasta.is.null,pausada_hasta.lte.${hoy}`)

  if (userIdsPermitidos) {
    query = query.in('user_id', userIdsPermitidos)
  }

  const { data: facturasPendientes } = await query

  if (!facturasPendientes || facturasPendientes.length === 0) {
    return NextResponse.json({ procesadas: 0 })
  }

  let enviados = 0
  let omitidosPorLimite = 0

  // Cache de configuración + plan por usuario para no re-consultar
  const configCache = new Map<string, { max_emails_mes: number; plan: Plan }>()
  async function getUserConfig(userId: string): Promise<{ max_emails_mes: number; plan: Plan }> {
    if (configCache.has(userId)) return configCache.get(userId)!
    const { data } = await supabase
      .from('configuraciones_usuario')
      .select('max_emails_mes, plan')
      .eq('user_id', userId)
      .maybeSingle()
    const cfg = {
      max_emails_mes: data?.max_emails_mes ?? 5,
      plan: (data?.plan === 'pro' ? 'pro' : 'free') as Plan,
    }
    configCache.set(userId, cfg)
    return cfg
  }

  const primerDiaMes = new Date()
  primerDiaMes.setUTCDate(1)
  primerDiaMes.setUTCHours(0, 0, 0, 0)
  const inicioMesISO = primerDiaMes.toISOString()

  // Cache de emails enviados por cliente este mes
  const emailsClienteMes = new Map<string, number>()
  async function emailsEnviadosEsteMes(clienteId: string): Promise<number> {
    if (emailsClienteMes.has(clienteId)) return emailsClienteMes.get(clienteId)!
    const { count } = await supabase
      .from('logs_email')
      .select('*', { count: 'exact', head: true })
      .eq('cliente_id', clienteId)
      .eq('estado', 'enviado')
      .gte('enviado_at', inicioMesISO)
    const n = count ?? 0
    emailsClienteMes.set(clienteId, n)
    return n
  }

  // Cache de emails GLOBALES por usuario este mes (para plan Free)
  const emailsUsuarioMes = new Map<string, number>()
  async function emailsUsuarioEsteMes(userId: string): Promise<number> {
    if (emailsUsuarioMes.has(userId)) return emailsUsuarioMes.get(userId)!
    const { data: facturasUser } = await supabase
      .from('facturas')
      .select('id')
      .eq('user_id', userId)
    const ids = (facturasUser ?? []).map(f => f.id)
    if (ids.length === 0) {
      emailsUsuarioMes.set(userId, 0)
      return 0
    }
    const { count } = await supabase
      .from('logs_email')
      .select('*', { count: 'exact', head: true })
      .in('factura_id', ids)
      .eq('estado', 'enviado')
      .gte('enviado_at', inicioMesISO)
    const n = count ?? 0
    emailsUsuarioMes.set(userId, n)
    return n
  }
  let omitidosFreeTopeMensual = 0
  let tonosForzadosFree = 0

  for (const factura of facturasPendientes) {
    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null; pausar_recordatorios?: boolean | null }
    // Si el cliente tiene los recordatorios pausados, saltar
    if (cliente?.pausar_recordatorios) continue
    const dias = diasVencida(factura.fecha_vencimiento)
    const recordatorios = (factura.recordatorios ?? []) as Array<{ dias_offset: number; enviado: boolean; tono: string; id: string }>

    const pendiente = recordatorios.find(r => !r.enviado && dias >= r.dias_offset)
    if (!pendiente) continue

    // Comprobar plan del usuario
    const { max_emails_mes: maxMes, plan: planUsuario } = await getUserConfig(factura.user_id)

    // Free: tope global de 30 emails/mes
    if (planUsuario === 'free') {
      const enviadosUsuario = await emailsUsuarioEsteMes(factura.user_id)
      if (enviadosUsuario >= LIMITES_FREE.emailsMes) {
        omitidosFreeTopeMensual++
        continue
      }
    }

    // Tope mensual por cliente (config del usuario, distinto del límite Free global)
    const enviadosCliente = await emailsEnviadosEsteMes(factura.cliente_id)
    if (enviadosCliente >= maxMes) {
      omitidosPorLimite++
      continue
    }

    try {
      const { data: userData } = await supabase.auth.admin.getUserById(factura.user_id)
      const nombreEmpresa = userData.user?.user_metadata?.empresa || userData.user?.user_metadata?.nombre || 'Tu empresa'

      // Plan Free → forzamos siempre tono amigable (sin escalado)
      let tonoFinal = pendiente.tono as 'amigable' | 'firme' | 'formal' | 'extremo'
      if (planUsuario === 'free' && tonoFinal !== 'amigable') {
        tonoFinal = 'amigable'
        tonosForzadosFree++
      }

      const { data: config } = await supabase
        .from('configuraciones_usuario')
        .select(`plantilla_${tonoFinal}, firma, logo_url, color_primario, idioma, ofrecer_pago_plazos_dia, variar_textos, recargo_mora_activo, recargo_mora_pct, recargo_mora_dia, descuento_pronto_pago_pct, descuento_pronto_pago_dias`)
        .eq('user_id', factura.user_id)
        .maybeSingle()

      const configMap = config as Record<string, string | null> | null
      const plantillaUsuario = configMap?.[`plantilla_${tonoFinal}`]?.trim()
      const firmaUsuario = configMap?.firma?.trim()
      const logoUrl = configMap?.logo_url ?? null
      const colorPrimario = configMap?.color_primario ?? null
      const idiomaUsuario = (configMap?.idioma ?? 'es') as 'es'|'ca'|'en'|'pt'
      const umbralPlazos = configMap?.ofrecer_pago_plazos_dia ? parseInt(String(configMap.ofrecer_pago_plazos_dia), 10) : 0
      const ofrecerPagoPlazos = umbralPlazos > 0 && dias >= umbralPlazos
      const variarTextos = configMap?.variar_textos === 'true' || (configMap?.variar_textos as unknown) === true
      const recargoActivo = configMap?.recargo_mora_activo === 'true' || (configMap?.recargo_mora_activo as unknown) === true
      const recargoDia = Number(configMap?.recargo_mora_dia ?? 30)
      const aplicarRecargo = recargoActivo && dias >= recargoDia
      const recargoMoraPct = aplicarRecargo ? Number(configMap?.recargo_mora_pct ?? 0) : 0
      const descuentoProntoPagoPct = Number(configMap?.descuento_pronto_pago_pct ?? 0)
      const descuentoProntoPagoDias = Number(configMap?.descuento_pronto_pago_dias ?? 7)

      // Calcular pagos previos para informar a la IA del importe pendiente
      const { data: pagosFactura } = await supabase
        .from('pagos')
        .select('importe')
        .eq('factura_id', factura.id)
      const importePagado = (pagosFactura ?? []).reduce((s: number, p: { importe: number }) => s + Number(p.importe), 0)

      // Si ya está totalmente pagada (caso raro: cron tarda en correr), saltamos
      if (importePagado + 0.005 >= Number(factura.importe)) {
        continue
      }

      let asunto: string
      let cuerpo: string

      if (plantillaUsuario) {
        const rendered = renderizarPlantilla(plantillaUsuario, {
          cliente: cliente.nombre,
          empresa: cliente.empresa ?? '',
          factura: factura.numero,
          importe: formatearEuros(Number(factura.importe)),
          vencimiento: formatearFecha(factura.fecha_vencimiento),
          dias_vencida: dias,
          empresa_emisor: nombreEmpresa,
        })
        asunto = rendered.asunto
        cuerpo = rendered.cuerpo
      } else {
        const gen = await generarMensajeRecordatorio({
          nombreCliente: cliente.nombre,
          empresa: cliente.empresa,
          numeroFactura: factura.numero,
          importe: factura.importe,
          diasVencida: dias,
          tono: tonoFinal,
          nombreEmpresa,
          idioma: idiomaUsuario,
          ofrecerPagoPlazos,
          variarTextos,
          recargoMoraPct,
          descuentoProntoPagoPct,
          descuentoProntoPagoDias,
          tieneLinkPago: !!factura.link_pago,
          importePagado,
        })
        asunto = gen.asunto
        cuerpo = gen.cuerpo
      }

      if (firmaUsuario) {
        cuerpo = cuerpo.trimEnd() + '\n\n---\n' + firmaUsuario
      }

      let adjuntos: Array<{ nombre: string; contenido: Uint8Array }> = []

      // Si el usuario subió un PDF propio, usarlo
      if (factura.pdf_propio_path) {
        try {
          const { data: pdfFile, error: dlErr } = await supabase
            .storage
            .from('facturas-pdf')
            .download(factura.pdf_propio_path)
          if (dlErr || !pdfFile) throw dlErr ?? new Error('no data')
          const buffer = new Uint8Array(await pdfFile.arrayBuffer())
          adjuntos = [{ nombre: `Factura-${factura.numero}.pdf`, contenido: buffer }]
        } catch (dlErr) {
          console.error(`PDF propio no disponible para factura ${factura.id}, usando autogen:`, dlErr)
        }
      }

      // Fallback: generar PDF automático
      if (adjuntos.length === 0) {
        try {
          const pdfBytes = await generarPDFFactura({
            numero: factura.numero,
            importe: factura.importe,
            fechaVencimiento: factura.fecha_vencimiento,
            descripcion: factura.descripcion,
            clienteNombre: cliente.nombre,
            clienteEmpresa: cliente.empresa,
            clienteEmail: cliente.email,
            emisor: nombreEmpresa,
          })
          adjuntos = [{ nombre: `Factura-${factura.numero}.pdf`, contenido: pdfBytes }]
        } catch (pdfErr) {
          console.error(`PDF generation failed for factura ${factura.id}:`, pdfErr)
        }
      }

      const enviado = await enviarEmail({ para: cliente.email, asunto, cuerpo, facturaId: factura.id, adjuntos, logoUrl, colorPrimario, idioma: idiomaUsuario, nombreEmpresa, linkPago: factura.link_pago ?? null })

      if (enviado) {
        await Promise.all([
          supabase.from('logs_email').insert({
            factura_id: factura.id,
            cliente_id: factura.cliente_id,
            asunto,
            cuerpo,
            estado: 'enviado',
          }),
          supabase.from('recordatorios')
            .update({ enviado: true, enviado_at: new Date().toISOString(), mensaje_preview: cuerpo.substring(0, 200) })
            .eq('id', pendiente.id),
          // Solo forzamos 'vencida' si no hay pagos parciales ni está cobrada
          factura.estado !== 'cobrada' && factura.estado !== 'parcialmente_cobrada'
            ? supabase.from('facturas').update({ estado: 'vencida' }).eq('id', factura.id)
            : Promise.resolve(),
        ])
        enviados++
        // Actualizar contadores en caché (acabamos de enviar uno)
        emailsClienteMes.set(factura.cliente_id, (emailsClienteMes.get(factura.cliente_id) ?? 0) + 1)
        emailsUsuarioMes.set(factura.user_id, (emailsUsuarioMes.get(factura.user_id) ?? 0) + 1)
      }
    } catch (e) {
      console.error(`Error procesando factura ${factura.id}:`, e)
    }
  }

  return NextResponse.json({
    procesadas: facturasPendientes.length,
    enviados,
    omitidosPorLimite,
    omitidosFreeTopeMensual,
    tonosForzadosFree,
  })
}
