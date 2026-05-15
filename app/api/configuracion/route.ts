import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('configuraciones_usuario')
    .select('*')
    .eq('org_id', org.org_id)
    .maybeSingle()

  return NextResponse.json({ configuracion: data })
}

export async function PATCH(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  // Solo owners y admins pueden cambiar la config de la org
  if (org.role !== 'owner' && org.role !== 'admin') {
    return NextResponse.json({ error: 'Solo owner/admin pueden cambiar la configuración' }, { status: 403 })
  }
  const supabase = await createServerSupabaseClient()

  const body = await req.json()

  const campos: Record<string, unknown> = {}
  if (typeof body.max_recordatorios === 'number') {
    if (body.max_recordatorios < 1 || body.max_recordatorios > 10) {
      return NextResponse.json({ error: 'max_recordatorios debe estar entre 1 y 10' }, { status: 400 })
    }
    campos.max_recordatorios = body.max_recordatorios
  }
  if (typeof body.patron_dias === 'string') {
    if (!['agresivo','normal','suave','personalizado'].includes(body.patron_dias)) {
      return NextResponse.json({ error: 'patron_dias inválido' }, { status: 400 })
    }
    campos.patron_dias = body.patron_dias
  }
  if (Array.isArray(body.dias_personalizados)) {
    const nums = body.dias_personalizados.filter((n: unknown) => typeof n === 'number' && n > 0)
    campos.dias_personalizados = nums.length > 0 ? nums : [3, 10, 20]
  }
  if (typeof body.dias_gracia === 'number') {
    if (body.dias_gracia < 0 || body.dias_gracia > 7) {
      return NextResponse.json({ error: 'dias_gracia debe estar entre 0 y 7' }, { status: 400 })
    }
    campos.dias_gracia = body.dias_gracia
  }
  if (typeof body.enviar_fin_semana === 'boolean') {
    campos.enviar_fin_semana = body.enviar_fin_semana
  }
  if (typeof body.max_emails_mes === 'number') {
    if (body.max_emails_mes < 1 || body.max_emails_mes > 10) {
      return NextResponse.json({ error: 'max_emails_mes debe estar entre 1 y 10' }, { status: 400 })
    }
    campos.max_emails_mes = body.max_emails_mes
  }
  if (typeof body.tono_preset === 'string') {
    if (!['cordial','firme','contundente','extremo','personalizado'].includes(body.tono_preset)) {
      return NextResponse.json({ error: 'tono_preset inválido' }, { status: 400 })
    }
    campos.tono_preset = body.tono_preset
  }
  for (const t of ['amigable','firme','formal','extremo'] as const) {
    const key = `plantilla_${t}` as const
    if (key in body) {
      const v = body[key]
      campos[key] = typeof v === 'string' && v.trim() ? v : null
    }
  }
  if ('firma' in body) {
    const v = body.firma
    campos.firma = typeof v === 'string' && v.trim() ? v.trim() : null
  }
  if ('logo_url' in body) {
    const v = body.logo_url
    campos.logo_url = typeof v === 'string' && v.trim() ? v.trim() : null
  }
  if (typeof body.color_primario === 'string') {
    const hex = body.color_primario.trim()
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
      return NextResponse.json({ error: 'color_primario debe ser hexadecimal #RRGGBB' }, { status: 400 })
    }
    campos.color_primario = hex
  }
  if (typeof body.idioma === 'string') {
    if (!['es','ca','en','pt'].includes(body.idioma)) {
      return NextResponse.json({ error: 'idioma inválido' }, { status: 400 })
    }
    campos.idioma = body.idioma
  }
  if (typeof body.evitar_festivos === 'boolean') {
    campos.evitar_festivos = body.evitar_festivos
  }
  if (typeof body.ofrecer_pago_plazos_dia === 'number') {
    if (body.ofrecer_pago_plazos_dia < 0 || body.ofrecer_pago_plazos_dia > 90) {
      return NextResponse.json({ error: 'ofrecer_pago_plazos_dia debe estar entre 0 y 90' }, { status: 400 })
    }
    campos.ofrecer_pago_plazos_dia = body.ofrecer_pago_plazos_dia
  }
  if (typeof body.variar_textos === 'boolean') {
    campos.variar_textos = body.variar_textos
  }
  if (typeof body.recargo_mora_activo === 'boolean') {
    campos.recargo_mora_activo = body.recargo_mora_activo
  }
  if (typeof body.recargo_mora_pct === 'number') {
    if (body.recargo_mora_pct < 0 || body.recargo_mora_pct > 50) {
      return NextResponse.json({ error: 'recargo_mora_pct debe estar entre 0 y 50' }, { status: 400 })
    }
    campos.recargo_mora_pct = body.recargo_mora_pct
  }
  if (typeof body.recargo_mora_dia === 'number') {
    if (body.recargo_mora_dia < 1 || body.recargo_mora_dia > 365) {
      return NextResponse.json({ error: 'recargo_mora_dia debe estar entre 1 y 365' }, { status: 400 })
    }
    campos.recargo_mora_dia = body.recargo_mora_dia
  }
  if (typeof body.descuento_pronto_pago_pct === 'number') {
    if (body.descuento_pronto_pago_pct < 0 || body.descuento_pronto_pago_pct > 20) {
      return NextResponse.json({ error: 'descuento_pronto_pago_pct debe estar entre 0 y 20' }, { status: 400 })
    }
    campos.descuento_pronto_pago_pct = body.descuento_pronto_pago_pct
  }
  if (typeof body.descuento_pronto_pago_dias === 'number') {
    if (body.descuento_pronto_pago_dias < 1 || body.descuento_pronto_pago_dias > 30) {
      return NextResponse.json({ error: 'descuento_pronto_pago_dias debe estar entre 1 y 30' }, { status: 400 })
    }
    campos.descuento_pronto_pago_dias = body.descuento_pronto_pago_dias
  }
  if (typeof body.resumen_diario === 'boolean') campos.resumen_diario = body.resumen_diario
  if (typeof body.resumen_semanal === 'boolean') campos.resumen_semanal = body.resumen_semanal
  if (typeof body.modo_vacaciones === 'boolean') campos.modo_vacaciones = body.modo_vacaciones
  if (typeof body.modo_vacaciones_hasta === 'string') {
    if (body.modo_vacaciones_hasta === '') {
      campos.modo_vacaciones_hasta = null
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(body.modo_vacaciones_hasta)) {
      campos.modo_vacaciones_hasta = body.modo_vacaciones_hasta
    } else {
      return NextResponse.json({ error: 'modo_vacaciones_hasta debe ser YYYY-MM-DD' }, { status: 400 })
    }
  }
  if (typeof body.aprender_historial === 'boolean') campos.aprender_historial = body.aprender_historial

  if (Object.keys(campos).length === 0) {
    return NextResponse.json({ error: 'No hay cambios que guardar' }, { status: 400 })
  }

  campos.updated_at = new Date().toISOString()

  const { error } = await supabase
    .from('configuraciones_usuario')
    .upsert({ user_id: org.user_id, org_id: org.org_id, ...campos }, { onConflict: 'user_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
