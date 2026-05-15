import { NextRequest, NextResponse } from 'next/server'
import { loginAdmin } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = typeof body?.username === 'string' ? body.username : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!username || !password) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 400 })
    }

    const ok = await loginAdmin(username, password)
    if (!ok) {
      // Pequeño retardo anti-brute-force (no es rate limit real, pero ralentiza)
      await new Promise(r => setTimeout(r, 600))
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Admin login error:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
