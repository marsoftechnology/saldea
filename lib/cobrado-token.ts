/**
 * Genera y verifica tokens HMAC para el endpoint /api/cobrado.
 * Los links de "He pagado" en los emails incluyen este token para evitar
 * que cualquier persona en internet marque una factura como cobrada
 * conociendo solo su UUID.
 *
 * Token = HMAC-SHA256(facturaId, PUSH_INTERNAL_SECRET) en hex (64 chars)
 */

import { createHmac, timingSafeEqual } from 'crypto'

function getSecret(): string {
  const s = process.env.PUSH_INTERNAL_SECRET
  if (!s) throw new Error('PUSH_INTERNAL_SECRET no configurado')
  return s
}

export function generarTokenCobrado(facturaId: string): string {
  return createHmac('sha256', getSecret()).update(facturaId).digest('hex')
}

export function verificarTokenCobrado(
  facturaId: string,
  token: string | null | undefined,
): boolean {
  if (!token || token.length !== 64) return false
  try {
    const expected = createHmac('sha256', getSecret()).update(facturaId).digest('hex')
    const a = Buffer.from(token, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
