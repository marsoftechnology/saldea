import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { recalcularEstadoFactura } from '@/lib/pagos'
import { getActiveOrg } from '@/lib/auth-org'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; pagoId: string }> }
) {
  try {
    const { id: facturaId, pagoId } = await params
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite editar' }, { status: 403 })
    const supabase = await createServerSupabaseClient()

    // Verificar que el pago existe y pertenece a la org y a la factura
    const { data: pago } = await supabase
      .from('pagos')
      .select('id, factura_id')
      .eq('id', pagoId)
      .eq('org_id', org.org_id)
      .eq('factura_id', facturaId)
      .maybeSingle()
    if (!pago) return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 })

    const { error } = await supabase.from('pagos').delete().eq('id', pagoId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const nuevoEstado = await recalcularEstadoFactura(supabase, facturaId)

    return NextResponse.json({ ok: true, nuevoEstado })
  } catch (e) {
    console.error('Error en DELETE /api/facturas/[id]/pagos/[pagoId]:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
