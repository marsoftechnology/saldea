import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { recalcularEstadoFactura } from '@/lib/pagos'
import { verificarTokenCobrado } from '@/lib/cobrado-token'

export async function GET(req: NextRequest) {
  const facturaId = req.nextUrl.searchParams.get('id')
  if (!facturaId) return NextResponse.redirect(new URL('/', req.url))

  // Verificar token HMAC para evitar que cualquiera marque facturas como pagadas
  const token = req.nextUrl.searchParams.get('t')
  if (!verificarTokenCobrado(facturaId, token)) {
    return NextResponse.redirect(new URL('/cobrado?error=token', req.url))
  }

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

    // Idempotencia: si ya hay un pago de confirmación del cliente, no duplicar
    const NOTAS_CONFIRM = 'Confirmado por el cliente desde el email'
    const { data: pagosPrevios } = await supabase
      .from('pagos')
      .select('importe, notas')
      .eq('factura_id', facturaId)

    const yaConfirmado = pagosPrevios?.some(p => p.notas === NOTAS_CONFIRM)
    if (!yaConfirmado) {
      const yaPagado = (pagosPrevios ?? []).reduce((s, p) => s + Number(p.importe), 0)
      const pendiente = Math.max(0, Number(factura.importe) - yaPagado)

      if (pendiente > 0) {
        await supabase.from('pagos').insert({
          factura_id: facturaId,
          user_id: factura.user_id,
          org_id: factura.org_id,
          importe: Math.round(pendiente * 100) / 100,
          metodo: 'otro',
          notas: NOTAS_CONFIRM,
        })
      }
    }

    await recalcularEstadoFactura(supabase, facturaId)

    return NextResponse.redirect(new URL(
      `/cobrado?num=${encodeURIComponent(factura.numero)}&importe=${encodeURIComponent(String(factura.importe))}`,
      req.url
    ))
  } catch {
    return NextResponse.redirect(new URL('/cobrado?error=1', req.url))
  }
}
