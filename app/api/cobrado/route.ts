import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'

export async function GET(req: NextRequest) {
  const facturaId = req.nextUrl.searchParams.get('id')
  if (!facturaId) return NextResponse.redirect(new URL('/', req.url))

  try {
    const supabase = createServiceRoleClient()

    const { data: factura, error } = await supabase
      .from('facturas')
      .select('id, estado, numero, importe')
      .eq('id', facturaId)
      .single()

    if (error || !factura) {
      return NextResponse.redirect(new URL('/cobrado?error=1', req.url))
    }

    if (factura.estado === 'cobrada') {
      return NextResponse.redirect(new URL(`/cobrado?ya=1&num=${factura.numero}`, req.url))
    }

    await supabase
      .from('facturas')
      .update({ estado: 'cobrada' })
      .eq('id', facturaId)

    return NextResponse.redirect(new URL(`/cobrado?num=${factura.numero}&importe=${factura.importe}`, req.url))
  } catch {
    return NextResponse.redirect(new URL('/cobrado?error=1', req.url))
  }
}
