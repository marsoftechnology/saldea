// Autenticación del panel de administración (marsof.es/admin).
// Es independiente de Supabase Auth: usa una credencial única (usuario+contraseña)
// almacenada en env vars como hash bcrypt + cookie firmada con HMAC.

import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'
import bcrypt from 'bcryptjs'

const COOKIE_NAME = 'marsof_admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 // 24h

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET
  if (!s) throw new Error('ADMIN_SESSION_SECRET no configurado')
  return s
}

function hmacSign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex')
}

/**
 * Genera un token de sesión firmado: `${expiraEnMs}.${hmac}`
 */
function crearToken(): string {
  const exp = Date.now() + MAX_AGE_SECONDS * 1000
  const payload = String(exp)
  const sig = hmacSign(payload)
  return `${payload}.${sig}`
}

/**
 * Verifica un token: comprueba la firma HMAC y que no haya caducado.
 */
function tokenValido(token: string | undefined): boolean {
  if (!token || typeof token !== 'string') return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig) return false

  const sigEsperada = hmacSign(exp)
  const a = Buffer.from(sig, 'hex')
  const b = Buffer.from(sigEsperada, 'hex')
  if (a.length !== b.length) return false
  if (!timingSafeEqual(a, b)) return false

  const expMs = Number(exp)
  if (!Number.isFinite(expMs)) return false
  return Date.now() < expMs
}

/**
 * Verifica las credenciales y, si son correctas, guarda la cookie firmada.
 * Devuelve true si OK, false si no.
 */
export async function loginAdmin(usernameInput: string, passwordInput: string): Promise<boolean> {
  const usernameOk = process.env.ADMIN_USERNAME
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!usernameOk || !hash) {
    console.error('Admin auth: ADMIN_USERNAME o ADMIN_PASSWORD_HASH no configurados')
    return false
  }

  // Comparar usuario en tiempo constante
  const a = Buffer.from(usernameInput || '')
  const b = Buffer.from(usernameOk)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false

  // Comparar password con bcrypt
  const ok = await bcrypt.compare(passwordInput || '', hash)
  if (!ok) return false

  const token = crearToken()
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_SECONDS,
    path: '/admin',
  })
  return true
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

/**
 * Devuelve true si la request tiene una cookie admin válida.
 * Úsalo en server components y API routes.
 */
export async function adminSesionActiva(): Promise<boolean> {
  const store = await cookies()
  const valor = store.get(COOKIE_NAME)?.value
  return tokenValido(valor)
}
