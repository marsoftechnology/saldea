import { NextRequest, NextResponse } from 'next/server'
import { requireOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'

/**
 * Genera bytes aleatorios como string hex usando crypto del runtime de Node/Edge.
 */
function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sha256Hex(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// GET /api/api-keys — lista las keys de la org activa (sin devolver el hash)
export async function GET() {
  const orgOrError = await requireOrg(['owner'])
  if ('error' in orgOrError) return orgOrError.error

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('api_keys')
    .select('id, name, key_prefix, created_at, last_used_at, active')
    .eq('org_id', orgOrError.org_id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ keys: data ?? [] })
}

// POST /api/api-keys — genera una nueva key
export async function POST(req: NextRequest) {
  const orgOrError = await requireOrg(['owner'])
  if ('error' in orgOrError) return orgOrError.error

  let name: string
  try {
    const body = await req.json()
    name = (body?.name ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  if (!name) return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
  if (name.length > 80) return NextResponse.json({ error: 'El nombre es demasiado largo' }, { status: 400 })

  const rawKey = `sk_live_${randomHex(32)}`
  const keyHash = await sha256Hex(rawKey)
  const keyPrefix = rawKey.slice(0, 16) // "sk_live_" + 8 chars

  const serviceClient = createServiceRoleClient()
  const { data, error } = await serviceClient
    .from('api_keys')
    .insert({
      org_id: orgOrError.org_id,
      name,
      key_prefix: keyPrefix,
      key_hash: keyHash,
      active: true,
    })
    .select('id, name, key_prefix, created_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Devuelve la key completa UNA SOLA VEZ — no se puede recuperar después
  return NextResponse.json({
    key: rawKey,
    id: data.id,
    name: data.name,
    key_prefix: data.key_prefix,
    created_at: data.created_at,
    warning: 'Guarda esta key ahora. No podrás verla de nuevo.',
  })
}
