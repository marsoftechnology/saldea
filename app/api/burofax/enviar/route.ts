import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'
import { enviarEmail } from '@/lib/resend'
import { formatearEuros, formatearFecha } from '@/lib/utils'
import { LIMITES_MAX } from '@/lib/plan'

export async function POST(req: NextRequest) {
  try {
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite esta acción' }, { status: 403 })

    const supabase = await createServerSupabaseClient()

    // Verificar plan Max
    const { data: cfg } = await supabase
      .from('configuraciones_usuario')
      .select('plan, resend_api_key, email_from_dominio, email_from_nombre')
      .eq('org_id', org.org_id)
      .maybeSingle()

    if (cfg?.plan !== 'max') {
      return NextResponse.json({
        error: 'El burofax automático es exclusivo del plan Max.',
        codigo: 'PLAN_INSUFICIENTE',
      }, { status: 403 })
    }

    const { facturaId } = await req.json()
    if (!facturaId) return NextResponse.json({ error: 'facturaId requerido' }, { status: 400 })

    // Obtener factura con cliente y org
    const { data: factura } = await supabase
      .from('facturas')
      .select('*, cliente:clientes(*)')
      .eq('id', facturaId)
      .eq('org_id', org.org_id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
    if (factura.estado === 'cobrada' || factura.estado === 'cancelada') {
      return NextResponse.json({ error: 'No se puede enviar burofax a una factura cobrada o cancelada' }, { status: 400 })
    }

    // Comprobar límite mensual (3 burofax/mes incluidos en Max)
    const mesActual = new Date().toISOString().slice(0, 7) // YYYY-MM
    const { count: burofaxesMes } = await supabase
      .from('burofaxes')
      .select('id', { count: 'exact', head: true })
      .eq('org_id', org.org_id)
      .eq('mes', mesActual)
      .eq('estado', 'enviado')

    const usados = burofaxesMes ?? 0
    const limite = LIMITES_MAX.burofaxMes

    // Si supera el límite gratuito, se cobra 6€ por unidad (informamos pero no bloqueamos)
    // Para MVP: bloqueamos hasta implementar cobro de extras
    if (usados >= limite) {
      return NextResponse.json({
        error: `Has usado ${usados}/${limite} burofax gratuitos este mes. Los adicionales cuestan 6€/ud. Contáctanos en hola@marsof.es para activarlos.`,
        codigo: 'LIMITE_BUROFAX_MES',
        usados,
        limite,
      }, { status: 403 })
    }

    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null }

    // Nombre de la org emisora
    const { data: orgData } = await supabase
      .from('organizations')
      .select('name')
      .eq('id', org.org_id)
      .maybeSingle()
    const nombreEmpresa = orgData?.name || 'Tu empresa'

    // Construir la carta de burofax formal
    const fechaHoy = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
    const importeFormateado = formatearEuros(Number(factura.importe))
    const vencimientoFormateado = formatearFecha(factura.fecha_vencimiento)
    const diasVencida = Math.max(0, Math.floor((Date.now() - new Date(factura.fecha_vencimiento).getTime()) / (1000 * 60 * 60 * 24)))

    const asunto = `REQUERIMIENTO DE PAGO — Factura ${factura.numero} — ${nombreEmpresa}`

    const cuerpo = `${fechaHoy}

REQUERIMIENTO FEHACIENTE DE PAGO

De: ${nombreEmpresa}
Para: ${cliente.nombre}${cliente.empresa ? ` (${cliente.empresa})` : ''}

Estimado/a ${cliente.nombre},

Por medio del presente escrito, y de conformidad con lo establecido en la legislación vigente, le REQUIERO FORMALMENTE el pago de la deuda pendiente que se detalla a continuación:

  FACTURA N.º: ${factura.numero}
  IMPORTE:     ${importeFormateado}
  VENCIMIENTO: ${vencimientoFormateado}
  DÍAS IMPAGO: ${diasVencida} días${factura.descripcion ? `\n  CONCEPTO:   ${factura.descripcion}` : ''}

A pesar de los recordatorios previos remitidos, la citada factura continúa sin ser abonada. Le concedo un plazo de SIETE (7) DÍAS HÁBILES desde la recepción del presente requerimiento para proceder al pago íntegro de la cantidad adeudada.

En caso de no hacerse efectivo el pago en dicho plazo, me reservo el derecho a:

  1. Iniciar reclamación judicial por la vía del procedimiento monitorio (art. 812 LEC).
  2. Reclamar intereses de demora al tipo legal vigente más dos puntos porcentuales (art. 7 Ley 3/2004).
  3. Exigir el resarcimiento de los gastos y costas derivados del proceso judicial.
  4. Comunicar la deuda a los registros de morosos habilitados legalmente (ASNEF, RAI).

Sin otro particular, quedo a la espera de su respuesta en el plazo indicado.

Atentamente,

${nombreEmpresa}

---
Este requerimiento ha sido generado y enviado por Saldea (marsof.es) en nombre de ${nombreEmpresa}.
Fecha y hora de envío: ${new Date().toISOString()}`

    // Enviar email de burofax (con custom domain si está configurado)
    const resendApiKey = cfg?.resend_api_key ?? null
    const emailFromDominio = cfg?.email_from_dominio ?? null
    const emailFromNombre = cfg?.email_from_nombre ?? null
    const fromAddress = emailFromDominio
      ? `${emailFromNombre ? emailFromNombre.replace(/["<>]/g, '').trim() : nombreEmpresa} <${emailFromDominio}>`
      : null

    const enviado = await enviarEmail({
      para: cliente.email,
      asunto,
      cuerpo,
      nombreEmpresa,
      facturaId: factura.id,
      resendApiKey,
      fromAddress,
    })

    if (!enviado) {
      return NextResponse.json({ error: 'No se pudo enviar el burofax. Inténtalo de nuevo.' }, { status: 500 })
    }

    // Registrar en tabla burofaxes
    const { error: insertErr } = await supabase.from('burofaxes').insert({
      org_id: org.org_id,
      factura_id: factura.id,
      mes: mesActual,
      estado: 'enviado',
      destinatario_nombre: cliente.nombre,
      destinatario_email: cliente.email,
      importe: factura.importe,
      numero_factura: factura.numero,
    })

    if (insertErr) {
      console.error('Error registrando burofax:', insertErr)
      // No revertimos el envío, solo logueamos
    }

    // Marcar factura con fecha de burofax
    await supabase
      .from('facturas')
      .update({ burofax_enviado_at: new Date().toISOString() })
      .eq('id', factura.id)

    return NextResponse.json({
      ok: true,
      usados: usados + 1,
      limite,
      mesActual,
    })
  } catch (error) {
    console.error('Error en burofax/enviar:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
