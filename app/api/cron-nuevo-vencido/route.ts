import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarEmail } from '@/lib/resend'
import { generarMensajeRecordatorio } from '@/lib/anthropic'
import { formatearEuros, formatearFecha } from '@/lib/utils'

/**
 * GET /api/cron-nuevo-vencido
 *
 * Mini-cron que corre cada 2 horas. Detecta facturas que:
 *   - están vencidas (fecha_vencimiento <= hoy)
 *   - fueron creadas hace menos de 4 horas
 *   - tienen recordatorios_enviados = 0
 *
 * Para esas facturas envía el PRIMER recordatorio de inmediato, sin esperar
 * al cron diario de las 9h UTC. Así, quien importa facturas ya vencidas
 * desde Quipu / Anfix / Holded / manualmente recibe el primer contacto
 * en cuestión de minutos, no al día siguiente.
 */
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
  const hace4Horas = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()

  // Facturas recién creadas, ya vencidas y sin ningún recordatorio enviado
  const { data: facturas } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(*)')
    .in('estado', ['pendiente', 'vencida'])
    .lte('fecha_vencimiento', hoy)
    .eq('recordatorios_enviados', 0)
    .gte('created_at', hace4Horas)
    .or(`pausada_hasta.is.null,pausada_hasta.lte.${hoy}`)
    .limit(100)

  if (!facturas || facturas.length === 0) {
    return NextResponse.json({ procesadas: 0 })
  }

  let enviados = 0
  let errores = 0

  // Cache de config de org para evitar consultas repetidas
  const configCache = new Map<string, {
    nombre_empresa: string | null
    logo_url: string | null
    color_primario: string | null
    idioma: string | null
    firma: string | null
    plan: string
    resend_api_key: string | null
    email_from_dominio: string | null
    email_from_nombre: string | null
  }>()

  async function getConfig(orgId: string) {
    if (configCache.has(orgId)) return configCache.get(orgId)!
    const { data } = await supabase
      .from('configuraciones_usuario')
      .select('nombre_empresa, logo_url, color_primario, idioma, firma, plan, resend_api_key, email_from_dominio, email_from_nombre')
      .eq('org_id', orgId)
      .maybeSingle()
    const cfg = {
      nombre_empresa: data?.nombre_empresa ?? null,
      logo_url: data?.logo_url ?? null,
      color_primario: data?.color_primario ?? null,
      idioma: data?.idioma ?? 'es',
      firma: data?.firma ?? null,
      plan: data?.plan ?? 'free',
      resend_api_key: data?.resend_api_key ?? null,
      email_from_dominio: data?.email_from_dominio ?? null,
      email_from_nombre: data?.email_from_nombre ?? null,
    }
    configCache.set(orgId, cfg)
    return cfg
  }

  for (const factura of facturas) {
    const cliente = factura.cliente
    if (!cliente?.email) continue  // Sin email no podemos enviar

    try {
      const cfg = await getConfig(factura.org_id)

      // Generar mensaje con IA (mismo helper que el cron principal)
      let asunto: string
      let cuerpo: string
      try {
        const resultado = await generarMensajeRecordatorio({
          nombreCliente: cliente.nombre,
          empresa: cliente.empresa ?? null,
          nombreEmpresa: cfg.nombre_empresa ?? '',
          numeroFactura: factura.numero,
          importe: Number(factura.importe),
          diasVencida: Math.max(0, Math.floor((Date.now() - new Date(factura.fecha_vencimiento).getTime()) / 86_400_000)),
          tono: 'amigable',   // Primer contacto siempre cordial
          idioma: (cfg.idioma as 'es' | 'ca' | 'en' | 'pt') ?? 'es',
          tieneLinkPago: !!(factura.link_pago),
        })
        asunto = resultado.asunto
        cuerpo = resultado.cuerpo
      } catch {
        // Fallback si la IA falla: texto genérico
        asunto = `Factura ${factura.numero} pendiente de pago – ${formatearEuros(Number(factura.importe))}`
        cuerpo = `Hola ${cliente.nombre},\n\nTe recordamos que tienes pendiente la factura ${factura.numero} por importe de ${formatearEuros(Number(factura.importe))}, con fecha de vencimiento el ${formatearFecha(factura.fecha_vencimiento)}.\n\nPor favor, procede con el pago a la mayor brevedad posible.\n\nMuchas gracias.`
      }

      const enviado = await enviarEmail({
        para: cliente.email,
        asunto,
        cuerpo,
        nombreEmpresa: cfg.nombre_empresa,
        facturaId: factura.id,
        logoUrl: cfg.logo_url,
        colorPrimario: cfg.color_primario,
        idioma: cfg.idioma as 'es' | 'ca' | 'en' | 'pt',
        linkPago: factura.link_pago ?? null,
        resendApiKey: cfg.resend_api_key,
        fromAddress: cfg.email_from_dominio
          ? `${cfg.email_from_nombre ?? cfg.nombre_empresa ?? 'Cobros'} <cobros@${cfg.email_from_dominio}>`
          : null,
      })

      if (enviado) {
        // Incrementar contador y registrar en logs
        await Promise.all([
          supabase
            .from('facturas')
            .update({ recordatorios_enviados: 1 })
            .eq('id', factura.id),
          supabase
            .from('logs_email')
            .insert({
              factura_id: factura.id,
              org_id: factura.org_id,
              para: cliente.email,
              asunto,
              enviado_at: new Date().toISOString(),
            }),
        ])
        enviados++
      }
    } catch (err) {
      console.error(`cron-nuevo-vencido: error factura ${factura.id}:`, err)
      errores++
    }
  }

  return NextResponse.json({
    procesadas: facturas.length,
    enviados,
    errores,
  })
}
