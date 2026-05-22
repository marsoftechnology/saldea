/**
 * Rate limiter en memoria — sencillo, sin dependencias externas.
 *
 * Para una sola instancia de Vercel funciona perfecto. Si en el futuro
 * Saldea escala a múltiples instancias, conviene migrar a Upstash Redis
 * (drop-in replacement con el mismo API).
 *
 * Uso:
 *   const limited = checkRateLimit({ key: org.org_id, ventana: '1h', max: 10 })
 *   if (limited) return NextResponse.json({ error: '...' }, { status: 429 })
 */

type Ventana = '1m' | '5m' | '1h' | '1d'

const VENTANAS_MS: Record<Ventana, number> = {
  '1m': 60_000,
  '5m': 5 * 60_000,
  '1h': 60 * 60_000,
  '1d': 24 * 60 * 60_000,
}

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

// Limpieza periódica (cada 5 min) para evitar memory leaks
let cleanupTimer: NodeJS.Timeout | null = null
function ensureCleanup() {
  if (cleanupTimer) return
  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k)
    }
  }, 5 * 60_000)
  // Evita bloquear el process en Node
  cleanupTimer.unref?.()
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number  // unix ms
  retryAfter?: number // segundos hasta poder reintentar
}

/**
 * Comprueba y consume 1 unidad de un bucket de rate limit.
 * @returns RateLimitResult con .allowed=false si se ha excedido el límite
 */
export function checkRateLimit({
  key,
  ventana,
  max,
}: {
  key: string
  ventana: Ventana
  max: number
}): RateLimitResult {
  ensureCleanup()
  const now = Date.now()
  const ventanaMs = VENTANAS_MS[ventana]
  const fullKey = `${ventana}:${key}`

  const existing = buckets.get(fullKey)

  if (!existing || existing.resetAt < now) {
    // Primera petición o ventana expirada
    buckets.set(fullKey, { count: 1, resetAt: now + ventanaMs })
    return { allowed: true, remaining: max - 1, resetAt: now + ventanaMs }
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  existing.count += 1
  return { allowed: true, remaining: max - existing.count, resetAt: existing.resetAt }
}

/**
 * Devuelve un identificador de cliente útil para rate limit basado en IP.
 * En Vercel/Next.js, headers.get('x-forwarded-for') da la IP real.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}
