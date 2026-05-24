/**
 * Rate limiter respaldado por Upstash Redis (funciona en Vercel serverless
 * con múltiples instancias). Si UPSTASH_REDIS_REST_URL no está configurado,
 * cae al contador en memoria — útil en desarrollo local.
 *
 * Setup en producción:
 *   1. Crear una base en Upstash (upstash.com) → Redis
 *   2. Añadir UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN en Vercel
 *
 * Uso (igual que antes, solo añadir await):
 *   const rl = await checkRateLimit({ key: org_id, ventana: '1h', max: 30 })
 *   if (!rl.allowed) return NextResponse.json({ error: '...' }, { status: 429 })
 */

import { Redis } from '@upstash/redis'

type Ventana = '1m' | '5m' | '1h' | '1d'

const VENTANAS_MS: Record<Ventana, number> = {
  '1m': 60_000,
  '5m': 5 * 60_000,
  '1h': 60 * 60_000,
  '1d': 24 * 60 * 60_000,
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number    // unix ms
  retryAfter?: number // segundos hasta poder reintentar
}

// ─── Upstash Redis ────────────────────────────────────────────────────────────

let _redis: Redis | null = null

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  if (!_redis) {
    _redis = Redis.fromEnv()
  }
  return _redis
}

async function checkRateLimitRedis({
  key,
  ventana,
  max,
}: {
  key: string
  ventana: Ventana
  max: number
}): Promise<RateLimitResult> {
  const redis = getRedis()!
  const now = Date.now()
  const ventanaMs = VENTANAS_MS[ventana]
  const redisKey = `saldea:rl:${ventana}:${key}`

  // INCR atómico: crea la clave si no existe (empieza en 0 y devuelve 1)
  const count = await redis.incr(redisKey)

  // Solo en la primera petición de la ventana establecemos el TTL
  if (count === 1) {
    await redis.pexpire(redisKey, ventanaMs)
  }

  if (count > max) {
    // Tiempo restante hasta que expire la ventana
    const ttlMs = await redis.pttl(redisKey)
    const espera = ttlMs > 0 ? ttlMs : ventanaMs
    return {
      allowed: false,
      remaining: 0,
      resetAt: now + espera,
      retryAfter: Math.ceil(espera / 1000),
    }
  }

  return {
    allowed: true,
    remaining: max - count,
    resetAt: now + ventanaMs,
  }
}

// ─── Fallback en memoria (desarrollo local / sin Upstash) ─────────────────────

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

let cleanupTimer: ReturnType<typeof setInterval> | null = null
function ensureCleanup() {
  if (cleanupTimer) return
  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k)
    }
  }, 5 * 60_000)
  cleanupTimer.unref?.()
}

function checkRateLimitMemory({
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

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Comprueba y consume 1 unidad de un bucket de rate limit.
 * Usa Upstash Redis si está configurado; en caso contrario, memoria local.
 */
export async function checkRateLimit({
  key,
  ventana,
  max,
}: {
  key: string
  ventana: Ventana
  max: number
}): Promise<RateLimitResult> {
  if (getRedis()) {
    try {
      return await checkRateLimitRedis({ key, ventana, max })
    } catch (err) {
      // Si Redis falla, no bloqueamos el tráfico — caemos a memoria
      console.error('[rate-limit] Redis error, usando memoria:', err)
    }
  }
  return checkRateLimitMemory({ key, ventana, max })
}

/**
 * Devuelve un identificador de cliente útil para rate limit basado en IP.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}
