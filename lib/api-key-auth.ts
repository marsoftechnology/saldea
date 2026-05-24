/**
 * Validación de API Keys para los endpoints públicos v1.
 * Compatible con Edge runtime (usa crypto.subtle para SHA-256).
 */

import type { NextRequest } from 'next/server'
import { createServiceRoleClient } from './supabase-service'

export interface ApiKeyResult {
  valid: boolean
  orgId?: string
  keyId?: string
}

/**
 * Calcula el SHA-256 de un string y lo devuelve como hex.
 * Usa crypto.subtle para ser compatible con Edge runtime.
 */
async function sha256Hex(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Valida el header Authorization: Bearer <token>.
 * Busca la key en la tabla api_keys por hash SHA-256.
 * Si es válida, actualiza last_used_at y devuelve { valid: true, orgId, keyId }.
 */
export async function validateApiKey(req: NextRequest): Promise<ApiKeyResult> {
  const authHeader = req.headers.get('authorization') ?? req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false }
  }

  const token = authHeader.slice(7).trim()
  if (!token || !token.startsWith('sk_live_')) {
    return { valid: false }
  }

  const hash = await sha256Hex(token)

  const supabase = createServiceRoleClient()
  const { data: apiKey } = await supabase
    .from('api_keys')
    .select('id, org_id, active')
    .eq('key_hash', hash)
    .maybeSingle()

  if (!apiKey || !apiKey.active) {
    return { valid: false }
  }

  // Actualizar last_used_at sin bloquear la respuesta
  supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', apiKey.id)
    .then(() => {})

  return {
    valid: true,
    orgId: apiKey.org_id as string,
    keyId: apiKey.id as string,
  }
}
