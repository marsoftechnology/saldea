import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getActiveOrg } from '@/lib/auth-org'

export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 })

  let key: string
  try {
    const body = await req.json()
    key = typeof body.key === 'string' ? body.key.trim() : ''
  } catch {
    return NextResponse.json({ ok: false, error: 'Body inválido' }, { status: 400 })
  }

  if (!key || !key.startsWith('sk-ant-')) {
    return NextResponse.json({ ok: false, error: 'La clave debe empezar por sk-ant-' })
  }

  try {
    const client = new Anthropic({ apiKey: key })
    await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1,
      messages: [{ role: 'user', content: 'hi' }],
    })
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const e = err as { status?: number }
    if (e?.status === 401) {
      return NextResponse.json({ ok: false, error: 'API Key incorrecta. Cópiala de nuevo desde console.anthropic.com.' })
    }
    // Otros errores (sin créditos, sobrecarga...) — la clave es formalmente válida, dejamos pasar
    return NextResponse.json({ ok: true })
  }
}
