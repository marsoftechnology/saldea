import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generarMensajeRecordatorio } from '@/lib/anthropic'
import { enviarEmail } from '@/lib/resend'
import { diasVencida } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { facturaId, tono } = await req.json()

    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { data: factura } = await supabase
      .from('facturas')
      .select('*, cliente:clientes(*)')
      .eq('id', facturaId)
      .eq('user_id', user.id)
      .single()

    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })

    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null }
    const nombreEmpresa = user.user_metadata?.empresa || user.user_metadata?.nombre || 'Tu empresa'
    const dias = diasVencida(factura.fecha_vencimiento)

    const { asunto, cuerpo } = await generarMensajeRecordatorio({
      nombreCliente: cliente.nombre,
      empresa: cliente.empresa,
      numeroFactura: factura.numero,
      importe: factura.importe,
      diasVencida: dias,
      tono,
      nombreEmpresa,
    })

    const enviado = await enviarEmail({ para: cliente.email, asunto, cuerpo })

    if (enviado) {
      await Promise.all([
        supabase.from('logs_email').insert({
          factura_id: facturaId,
          cliente_id: factura.cliente_id,
          asunto,
          cuerpo,
          estado: 'enviado',
        }),
        supabase.from('recordatorios')
          .update({ enviado: true, enviado_at: new Date().toISOString(), mensaje_preview: cuerpo.substring(0, 200) })
          .eq('factura_id', facturaId)
          .eq('tono', tono)
          .eq('enviado', false),
        dias > 0
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
