import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/api-key-auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { createServiceRoleClient } from '@/lib/supabase-service'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

// GET /api/v1/facturas — devuelve facturas de la org autenticada con la API key
export async function GET(req: NextRequest) {
  // Validar API key
  const auth = await validateApiKey(req)
  if (!auth.valid || !auth.orgId || !auth.keyId) {
    return new Response(
      JSON.stringify({ error: 'API key inválida o revocada' }),
      { status: 401, headers: JSON_HEADERS }
    )
  }

  // Rate limit: 1000 llamadas por hora por key
  const rl = await checkRateLimit({ key: auth.keyId, ventana: '1h', max: 1000 })
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

  // Parsear query params
  const { searchParams } = req.nextUrl
  const estado = searchParams.get('estado') // pendiente | cobrada | vencida | ...
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200)
  const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0)

  const supabase = createServiceRoleClient()

  let query = supabase
    .from('facturas')
    .select('id, numero, importe, estado, fecha_vencimiento, descripcion, created_at')
    .eq('org_id', auth.orgId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (estado) {
    query = query.eq('estado', estado)
  }

  const { data, error, count } = await query

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Error al obtener facturas' }),
      { status: 500, headers: JSON_HEADERS }
    )
  }

  return new Response(
    JSON.stringify({ facturas: data ?? [], total: count, limit, offset }),
    { status: 200, headers: JSON_HEADERS }
  )
}
