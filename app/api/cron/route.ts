import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generarMensajeRecordatorio } from '@/lib/anthropic'
import { enviarEmail } from '@/lib/resend'
import { diasVencida } from '@/lib/utils'

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

  const { data: facturasPendientes } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(*), recordatorios(*)')
    .in('estado', ['pendiente', 'vencida'])
    .lte('fecha_vencimiento', hoy)

  if (!facturasPendientes || facturasPendientes.length === 0) {
    return NextResponse.json({ procesadas: 0 })
  }

  let enviados = 0

  for (const factura of facturasPendientes) {
    const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null }
    const dias = diasVencida(factura.fecha_vencimiento)
    const recordatorios = (factura.recordatorios ?? []) as Array<{ dias_offset: number; enviado: boolean; tono: string; id: string }>

    const pendiente = recordatorios.find(r => !r.enviado && dias >= r.dias_offset)
    if (!pendiente) continue

    try {
      const { data: userData } = await supabase.auth.admin.getUserById(factura.user_id)
      const nombreEmpresa = userData.user?.user_metadata?.empresa || userData.user?.user_metadata?.nombre || 'Tu empresa'

      const { asunto, cuerpo } = await generarMensajeRecordatorio({
        nombreCliente: cliente.nombre,
        empresa: cliente.empresa,
        numeroFactura: factura.numero,
        importe: factura.importe,
        diasVencida: dias,
        tono: pendiente.tono as 'amigable' | 'firme' | 'formal',
        nombreEmpresa,
      })

      const enviado = await enviarEmail({ para: cliente.email, asunto, cuerpo })

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
          supabase.from('facturas').update({ estado: 'vencida' }).eq('id', factura.id),
        ])
        enviados++
      }
    } catch (e) {
      console.error(`Error procesando factura ${factura.id}:`, e)
    }
  }

  return NextResponse.json({ procesadas: facturasPendientes.length, enviados })
}
