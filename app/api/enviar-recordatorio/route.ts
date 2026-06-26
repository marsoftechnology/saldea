import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generarMensajeRecordatorio } from '@/lib/anthropic'
import { enviarEmail } from '@/lib/resend'
import { generarPDFFactura } from '@/lib/pdf'
import { diasVencida, formatearEuros, formatearFecha } from '@/lib/utils'
import { renderizarPlantilla } from '@/lib/recordatorios'
import { getActiveOrg } from '@/lib/auth-org'
import { getOrgPlan, LIMITES_FREE } from '@/lib/plan'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    // Auth primero: el parsing del body no debe enmascarar un 401
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite enviar recordatorios' }, { status: 403 })

    // Rate limit anti-abuso: máx 30 envíos por org por hora
    const rl = await checkRateLimit({ key: org.org_id, ventana: '1h', max: 30 })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Has hecho demasiados envíos esta hora. Inténtalo en ${Math.ceil((rl.retryAfter ?? 60) / 60)} min.` },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
      )
    }

    // Parsear body con manejo de error explícito
    let facturaId: string, tono: string
    try {
      const body = await req.json()
      facturaId = body?.facturaId
      tono = body?.tono
    } catch {
      return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 })
    }
    if (!facturaId) return NextResponse.json({ error: 'facturaId requerido' }, { status: 400 })
    const TONOS_VALIDOS = ['amigable', 'firme', 'formal', 'extremo']
    if (tono && !TONOS_VALIDOS.includes(tono)) {
      return NextResponse.json({ error: 'Tono inválido' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const user = org.user

    const { data: factura } = await supabase
      .from('facturas')
      .select('*, cliente:clientes(*)')
      .eq('id', facturaId)
      .eq('org_id', org.org_id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })

    // Tope de emails mensuales para plan Free
    const planOrg = await getOrgPlan(org.org_id, supabase)
    if (planOrg === 'free') {
      const primerDia = new Date()
      primerDia.setUTCDate(1)
      primerDia.setUTCHours(0, 0, 0, 0)
      const { count } = await supabase
        .from('logs_email')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', org.org_id)
        .eq('estado', 'enviado')
        .gte('enviado_at', primerDia.toISOString())
      if ((count ?? 0) >= LIMITES_FREE.emailsMes) {
        return NextResponse.json({
          error: `Has alcanzado el límite de ${LIMITES_FREE.emailsMes} emails/mes del plan gratuito. Sube a Pro para envíos ilimitados.`,
          codigo: 'LIMITE_EMAILS_MES',
        }, { status: 403 })
      }
    }

    // Calcular importe ya pagado (parcial o total) — la IA mencionará el pendiente
    const { data: pagosFactura } = await supabase
      .from('pagos')
      .select('importe')
      .eq('factura_id', facturaId)
    const importePagado = (pagosFactura ?? []).reduce((s, p) => s + Number(p.importe), 0)

    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null; idioma?: string | null }

    // Nombre de empresa: nombre de la org (fallback al user_metadata para compatibilidad)
    const { data: orgData } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', org.org_id)
      .maybeSingle()
    const nombreEmpresa = orgData?.name || user.user_metadata?.empresa || user.user_metadata?.nombre || 'Tu empresa'
    const dias = diasVencida(factura.fecha_vencimiento)

    const { data: config } = await supabase
      .from('configuraciones_usuario')
      .select('plantilla_amigable, plantilla_firme, plantilla_formal, plantilla_extremo, firma, logo_url, color_primario, idioma, ofrecer_pago_plazos_dia, variar_textos, recargo_mora_activo, recargo_mora_pct, recargo_mora_dia, descuento_pronto_pago_pct, descuento_pronto_pago_dias, resend_api_key, email_from_dominio, email_from_nombre, iban, titular_cuenta, claude_api_key')
      .eq('org_id', org.org_id)
      .maybeSingle()

    const tonoFinal = tono as 'amigable' | 'firme' | 'formal' | 'extremo'
    const plantillaCampo = `plantilla_${tonoFinal}` as 'plantilla_amigable' | 'plantilla_firme' | 'plantilla_formal' | 'plantilla_extremo'
    const plantillaUsuario = config?.[plantillaCampo]?.trim()

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
      const umbralPlazos = config?.ofrecer_pago_plazos_dia ?? 0
      const ofrecerPagoPlazos = umbralPlazos > 0 && dias >= umbralPlazos
      const recargoActivo = config?.recargo_mora_activo === true && dias >= (config?.recargo_mora_dia ?? 30)
      const gen = await generarMensajeRecordatorio({
        nombreCliente: cliente.nombre,
        empresa: cliente.empresa,
        numeroFactura: factura.numero,
        importe: factura.importe,
        diasVencida: dias,
        tono: tonoFinal,
        nombreEmpresa,
        idioma: (cliente.idioma ?? config?.idioma ?? 'es') as 'es'|'ca'|'en'|'pt',
        ofrecerPagoPlazos,
        variarTextos: config?.variar_textos === true,
        recargoMoraPct: recargoActivo ? Number(config?.recargo_mora_pct ?? 0) : 0,
        descuentoProntoPagoPct: Number(config?.descuento_pronto_pago_pct ?? 0),
        descuentoProntoPagoDias: Number(config?.descuento_pronto_pago_dias ?? 7),
        tieneLinkPago: !!factura.link_pago,
        importePagado,
        claudeApiKey: config?.claude_api_key ?? null,
      })
      asunto = gen.asunto
      cuerpo = gen.cuerpo
    }

    const firmaUsuario = config?.firma?.trim()
    if (firmaUsuario) {
      cuerpo = cuerpo.trimEnd() + '\n\n---\n' + firmaUsuario
    }

    let adjuntos: Array<{ nombre: string; contenido: Uint8Array }> = []

    // 1) Intentar usar el PDF que subió el usuario
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
        console.error('No se pudo leer PDF propio, usando autogenerado:', dlErr)
      }
    }

    // 2) Fallback: generar PDF automático
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
        console.error('PDF generation failed, sending email without attachment:', pdfErr)
      }
    }

    // Plan Max: custom Resend key + from address
    const resendApiKey = config?.resend_api_key ?? null
    const emailFromDominio = config?.email_from_dominio ?? null
    const emailFromNombre = config?.email_from_nombre ?? null
    const fromAddress = emailFromDominio
      ? `${emailFromNombre ? emailFromNombre.replace(/["<>]/g, '').trim() : nombreEmpresa} <${emailFromDominio}>`
      : null

    const enviado = await enviarEmail({ para: cliente.email, asunto, cuerpo, facturaId, adjuntos, logoUrl: config?.logo_url, colorPrimario: config?.color_primario, idioma: (cliente.idioma ?? config?.idioma ?? 'es') as 'es'|'ca'|'en'|'pt', nombreEmpresa, linkPago: factura.link_pago ?? null, iban: config?.iban ?? null, titularCuenta: config?.titular_cuenta ?? null, numeroFactura: factura.numero, resendApiKey, fromAddress })

    if (enviado) {
      await Promise.all([
        supabase.from('logs_email').insert({
          factura_id: facturaId,
          cliente_id: factura.cliente_id,
          org_id: org.org_id,
          asunto,
          cuerpo,
          estado: 'enviado',
        }),
        supabase.from('recordatorios')
          .update({ enviado: true, enviado_at: new Date().toISOString(), mensaje_preview: cuerpo.substring(0, 200) })
          .eq('factura_id', facturaId)
          .eq('tono', tono)
          .eq('enviado', false),
        // Solo forzamos 'vencida' si la factura no está cobrada ni parcialmente_cobrada
        dias > 0 && factura.estado !== 'cobrada' && factura.estado !== 'parcialmente_cobrada'
          ? supabase.from('facturas').update({ estado: 'vencida' }).eq('id', facturaId)
          : Promise.resolve(),
      ])
    }

    return NextResponse.json({ ok: enviado, asunto, cuerpo })
  } catch (error) {
    console.error('Error en enviar-recordatorio:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
