import { NextRequest, NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { validarApiKeyHolded } from '@/lib/holded'

export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  let apiKey: string
  try {
    const body = await req.json()
    apiKey = body?.apiKey?.trim()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  if (!apiKey) return NextResponse.json({ error: 'La API Key es obligatoria' }, { status: 400 })

  // Validar que la key funciona antes de guardarla
  const validacion = await validarApiKeyHolded(apiKey)
  if (!validacion.ok) {
    return NextResponse.json({ error: validacion.error || 'API Key inválida' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('configuraciones_usuario')
    .upsert(
      {
        org_id: org.org_id,
        holded_api_key: apiKey,
        holded_connected_at: new Date().toISOString(),
      },
      { onConflict: 'org_id' },
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
