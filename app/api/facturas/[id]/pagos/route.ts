import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { recalcularEstadoFactura } from '@/lib/pagos'

const METODOS_VALIDOS = ['transferencia', 'tarjeta', 'efectivo', 'bizum', 'stripe', 'paypal', 'otro']

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: facturaId } = await params
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const importeRaw = Number(body?.importe)
    if (!Number.isFinite(importeRaw) || importeRaw <= 0) {
      return NextResponse.json({ error: 'Importe inválido (debe ser > 0)' }, { status: 400 })
    }
    const importe = Math.round(importeRaw * 100) / 100 // redondeo a 2 decimales

    const fecha = typeof body?.fecha === 'string' && body.fecha ? body.fecha : new Date().toISOString().slice(0, 10)
    const metodo = typeof body?.metodo === 'string' && METODOS_VALIDOS.includes(body.metodo) ? body.metodo : null
    const referencia = typeof body?.referencia === 'string' ? body.referencia.trim().slice(0, 200) || null : null
    const notas = typeof body?.notas === 'string' ? body.notas.trim().slice(0, 1000) || null : null

    // Validar que la factura existe y pertenece al usuario
    const { data: factura } = await supabase
      .from('facturas')
      .select('id, importe, estado')
      .eq('id', facturaId)
      .eq('user_id', user.id)
      .maybeSingle()
    if (!factura) return NextResponse.json({ error: 'Factura no encontrada' }, { status: 404 })
    if (factura.estado === 'cancelada') {
      return NextResponse.json({ error: 'La factura está cancelada' }, { status: 400 })
    }

    // Crear el pago
    const { data: pago, error } = await supabase
      .from('pagos')
      .insert({
        factura_id: facturaId,
        user_id: user.id,
        importe,
        fecha,
        metodo,
        referencia,
        notas,
      })
      .select()
      .single()

    if (error || !pago) {
      console.error('Error creando pago:', error)
      return NextResponse.json({ error: 'Error guardando el pago' }, { status: 500 })
    }

    const nuevoEstado = await recalcularEstadoFactura(supabase, facturaId)

    return NextResponse.json({ pago, nuevoEstado })
  } catch (e) {
    console.error('Error en POST /api/facturas/[id]/pagos:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
