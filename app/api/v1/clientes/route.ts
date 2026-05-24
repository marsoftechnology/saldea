import { NextRequest } from 'next/server'
import { validateApiKey } from '@/lib/api-key-auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { createServiceRoleClient } from '@/lib/supabase-service'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

// GET /api/v1/clientes — devuelve clientes de la org autenticada con la API key
export async function GET(req: NextRequest) {
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

  const { searchParams } = req.nextUrl
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200)
  const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0)

  const supabase = createServiceRoleClient()

  const { data, error, count } = await supabase
    .from('clientes')
    .select('id, nombre, email, empresa, created_at')
    .eq('org_id', auth.orgId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Error al obtener clientes' }),
      { status: 500, headers: JSON_HEADERS }
    )
  }

  return new Response(
    JSON.stringify({ clientes: data ?? [], total: count, limit, offset }),
    { status: 200, headers: JSON_HEADERS }
  )
}
