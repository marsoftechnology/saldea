import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { recalcularEstadoFactura } from '@/lib/pagos'

export async function GET(req: NextRequest) {
  const facturaId = req.nextUrl.searchParams.get('id')
  if (!facturaId) return NextResponse.redirect(new URL('/', req.url))

  try {
    const supabase = createServiceRoleClient()

    const { data: factura, error } = await supabase
      .from('facturas')
      .select('id, estado, numero, importe, user_id, org_id')
      .eq('id', facturaId)
      .single()

    if (error || !factura) {
      return NextResponse.redirect(new URL('/cobrado?error=1', req.url))
    }

    if (factura.estado === 'cobrada') {
      return NextResponse.redirect(new URL(`/cobrado?ya=1&num=${factura.numero}`, req.url))
    }

    // Calcular cuánto se ha pagado ya y registrar el restante
    const { data: pagosPrevios } = await supabase
      .from('pagos')
      .select('importe')
      .eq('factura_id', facturaId)

    const yaPagado = (pagosPrevios ?? []).reduce((s, p) => s + Number(p.importe), 0)
    const pendiente = Math.max(0, Number(factura.importe) - yaPagado)

    if (pendiente > 0) {
      await supabase.from('pagos').insert({
        factura_id: facturaId,
        user_id: factura.user_id,
        org_id: factura.org_id,
        importe: Math.round(pendiente * 100) / 100,
        metodo: 'otro',
        notas: 'Confirmado por el cliente desde el email',
      })
    }

    await recalcularEstadoFactura(supabase, facturaId)

    return NextResponse.redirect(new URL(`/cobrado?num=${factura.numero}&importe=${factura.importe}`, req.url))
  } catch {
    return NextResponse.redirect(new URL('/cobrado?error=1', req.url))
  }
}
