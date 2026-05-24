import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/api-key-auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { createServiceRoleClient } from '@/lib/supabase-service'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

// GET /api/v1/facturas/:id — detalle de factura incluyendo pagos
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const auth = await validateApiKey(req)
  if (!auth.valid || !auth.orgId || !auth.keyId) {
    return new Response(
      JSON.stringify({ error: 'API key inválida o revocada' }),
      { status: 401, headers: JSON_HEADERS }
    )
  }

  const rl = checkRateLimit({ key: auth.keyId, ventana: '1h', max: 1000 })
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({ error: 'Rate limit excedido. Intenta de nuevo más tarde.' }),
      {
        status: 429,
        headers: {
          ...JSON_HEADERS,
          'Retry-After': String(rl.retryAfter ?? 60),
          'X-RateLimit-Reset': String(rl.resetAt),
        },
      }
    )
  }

  const supabase = createServiceRoleClient()

  const { data: factura, error } = await supabase
    .from('facturas')
    .select(`
      id, numero, importe, estado, fecha_vencimiento, descripcion, created_at,
      pagos ( id, importe, fecha_pago, metodo, created_at )
    `)
    .eq('id', id)
    .eq('org_id', auth.orgId)
    .maybeSingle()

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Error al obtener la factura' }),
      { status: 500, headers: JSON_HEADERS }
    )
  }

  if (!factura) {
    return new Response(
      JSON.stringify({ error: 'Factura no encontrada' }),
      { status: 404, headers: JSON_HEADERS }
    )
  }

  return new Response(
    JSON.stringify({ factura }),
    { status: 200, headers: JSON_HEADERS }
  )
}
