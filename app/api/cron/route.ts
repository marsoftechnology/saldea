import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generarMensajeRecordatorio } from '@/lib/anthropic'
import { enviarEmail } from '@/lib/resend'
import { enviarWhatsApp } from '@/lib/twilio'
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

  // Si es fin de semana o festivo, filtrar por preferencias de la org (configuraciones_usuario)
  let orgIdsPermitidas: string[] | null = null
  if (esFinDeSemana || esFestivo) {
    let query = supabase.from('configuraciones_usuario').select('org_id')
    if (esFinDeSemana) query = query.eq('enviar_fin_semana', true)
    if (esFestivo) query = query.eq('evitar_festivos', false)
    const { data: configs } = await query
    orgIdsPermitidas = (configs ?? []).map(c => c.org_id).filter(Boolean) as string[]
    if (orgIdsPermitidas.length === 0) {
      return NextResponse.json({
        procesadas: 0,
        enviados: 0,
        motivo: esFinDeSemana ? 'fin de semana sin orgs permitidas' : 'festivo nacional sin orgs permitidas',
      })
    }
  }

  let query = supabase
    .from('facturas')
    .select('*, cliente:clientes(*), recordatorios(*)')
    .in('estado', ['pendiente', 'vencida', 'parcialmente_cobrada'])
    .lte('fecha_vencimiento', hoy)
    .or(`pausada_hasta.is.null,pausada_hasta.lte.${hoy}`)

  if (orgIdsPermitidas) {
    query = query.in('org_id', orgIdsPermitidas)
  }

  const { data: facturasPendientes } = await query

  if (!facturasPendientes || facturasPendientes.length === 0) {
    return NextResponse.json({ procesadas: 0 })
  }

  let enviados = 0
  let omitidosPorLimite = 0

  // Cache de configuración + plan por org para no re-consultar
  const configCache = new Map<string, { max_emails_mes: number; plan: Plan }>()
  async function getOrgConfig(orgId: string): Promise<{ max_emails_mes: number; plan: Plan }> {
    if (configCache.has(orgId)) return configCache.get(orgId)!
    const { data } = await supabase
      .from('configuraciones_usuario')
      .select('max_emails_mes, plan')
      .eq('org_id', orgId)
      .maybeSingle()
    const cfg = {
      max_emails_mes: data?.max_emails_mes ?? 5,
      plan: (data?.plan === 'pro' ? 'pro' : 'free') as Plan,
    }
    configCache.set(orgId, cfg)
    return cfg
  }

  // Cache de nombre de org para evitar re-consultar en cada iteración
  const orgNombreCache = new Map<string, string>()
  async function getOrgNombre(orgId: string): Promise<string> {
    if (orgNombreCache.has(orgId)) return orgNombreCache.get(orgId)!
    const { data } = await supabase.from('organizations').select('name').eq('id', orgId).maybeSingle()
    const nombre = data?.name || 'Tu empresa'
    orgNombreCache.set(orgId, nombre)
    return nombre
  }

  // Cache de config completa por org (plantillas, firma, logo, etc.)
  type OrgFullConfig = Record<string, string | null>
  const orgFullConfigCache = new Map<string, OrgFullConfig | null>()
  async function getOrgFullConfig(orgId: string): Promise<OrgFullConfig | null> {
    if (orgFullConfigCache.has(orgId)) return orgFullConfigCache.get(orgId)!
    const { data } = await supabase
      .from('configuraciones_usuario')
      .select(`plantilla_amigable, plantilla_firme, plantilla_formal, plantilla_extremo, firma, logo_url, color_primario, idioma, ofrecer_pago_plazos_dia, variar_textos, recargo_mora_activo, recargo_mora_pct, recargo_mora_dia, descuento_pronto_pago_pct, descuento_pronto_pago_dias`)
      .eq('org_id', orgId)
      .maybeSingle()
    orgFullConfigCache.set(orgId, data as OrgFullConfig | null)
    return data as OrgFullConfig | null
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

  // Cache de emails GLOBALES por org este mes (para plan Free)
  const emailsOrgMes = new Map<string, number>()
  async function emailsOrgEsteMes(orgId: string): Promise<number> {
    if (emailsOrgMes.has(orgId)) return emailsOrgMes.get(orgId)!
    const { count } = await supabase
      .from('logs_email')
      .select('*', { count: 'exact', head: true })
      .eq('org_id', orgId)
      .eq('estado', 'enviado')
      .gte('enviado_at', inicioMesISO)
    const n = count ?? 0
    emailsOrgMes.set(orgId, n)
    return n
  }
  let omitidosFreeTopeMensual = 0
  let tonosForzadosFree = 0

  for (const factura of facturasPendientes) {
    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null; pausar_recordatorios?: boolean | null; telefono?: string | null; whatsapp_opt_in_at?: string | null }
    // Si el cliente tiene los recordatorios pausados, saltar
    if (cliente?.pausar_recordatorios) continue
    const dias = diasVencida(factura.fecha_vencimiento)
    const recordatorios = (factura.recordatorios ?? []) as Array<{ dias_offset: number; enviado: boolean; tono: string; id: string }>

    const pendiente = recordatorios.find(r => !r.enviado && dias >= r.dias_offset)
    if (!pendiente) continue

    // Comprobar plan de la org
    const { max_emails_mes: maxMes, plan: planUsuario } = await getOrgConfig(factura.org_id)

    // Free: tope global de 30 emails/mes
    if (planUsuario === 'free') {
      const enviadosOrg = await emailsOrgEsteMes(factura.org_id)
      if (enviadosOrg >= LIMITES_FREE.emailsMes) {
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
      // Nombre de empresa: nombre de la org (cacheado)
      const nombreEmpresa = await getOrgNombre(factura.org_id)

      // Plan Free → forzamos siempre tono amigable (sin escalado)
      let tonoFinal = pendiente.tono as 'amigable' | 'firme' | 'formal' | 'extremo'
      if (planUsuario === 'free' && tonoFinal !== 'amigable') {
        tonoFinal = 'amigable'
        tonosForzadosFree++
      }

      // Decidir canal aquí (antes de generar el mensaje) para ajustar el prompt
      const usarWhatsApp =
        tonoFinal === 'formal' &&
        !!cliente.whatsapp_opt_in_at &&
        !!cliente.telefono

      const configMap = await getOrgFullConfig(factura.org_id)
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
          // En WhatsApp no hay botón renderizado: se añade el link crudo después
          tieneLinkPago: !usarWhatsApp && !!factura.link_pago,
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

      let enviado = false
      let waSid: string | undefined
      // Cuerpo real enviado por WhatsApp (incluye link de pago como texto plano)
      let cuerpoEnviadoWA = ''

      if (usarWhatsApp) {
        // Añadir el link de pago directamente al cuerpo del WhatsApp (no hay botón HTML)
        cuerpoEnviadoWA = factura.link_pago
          ? `${nombreEmpresa}:\n\n${cuerpo}\n\n💳 Pagar ahora: ${factura.link_pago}`
          : `${nombreEmpresa}:\n\n${cuerpo}`
        const waResult = await enviarWhatsApp({
          para: cliente.telefono!,
          cuerpo: cuerpoEnviadoWA,
          facturaId: factura.id,
        })
        enviado = waResult.enviado
        waSid = waResult.messageSid
        // Fallback a email si WhatsApp falla
        if (!enviado) {
          enviado = await enviarEmail({ para: cliente.email, asunto, cuerpo, facturaId: factura.id, adjuntos, logoUrl, colorPrimario, idioma: idiomaUsuario, nombreEmpresa, linkPago: factura.link_pago ?? null })
        }
      } else {
        enviado = await enviarEmail({ para: cliente.email, asunto, cuerpo, facturaId: factura.id, adjuntos, logoUrl, colorPrimario, idioma: idiomaUsuario, nombreEmpresa, linkPago: factura.link_pago ?? null })
      }

      if (enviado) {
        await Promise.all([
          // Log según canal: WhatsApp → mensajes_whatsapp, Email → logs_email
          usarWhatsApp && waSid
            ? supabase.from('mensajes_whatsapp').insert({
                factura_id: factura.id,
                recordatorio_id: pendiente.id,
                cliente_id: factura.cliente_id,
                org_id: factura.org_id,
                twilio_message_sid: waSid,
                to_number: cliente.telefono!,
                cuerpo: cuerpoEnviadoWA || cuerpo,
                tono: tonoFinal,
                estado: 'enviado',
              })
            : supabase.from('logs_email').insert({
                factura_id: factura.id,
                cliente_id: factura.cliente_id,
                org_id: factura.org_id,
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
        // Actualizar contadores de email solo si se usó email (no WhatsApp)
        if (!(usarWhatsApp && waSid)) {
          emailsClienteMes.set(factura.cliente_id, (emailsClienteMes.get(factura.cliente_id) ?? 0) + 1)
          emailsOrgMes.set(factura.org_id, (emailsOrgMes.get(factura.org_id) ?? 0) + 1)
        }
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
