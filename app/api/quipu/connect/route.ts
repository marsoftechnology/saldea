import { NextRequest, NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// Valida el token llamando a la API de Quipu
async function validarTokenQuipu(accessToken: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('https://getquipu.com/api/invoices?page=1&page_size=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    })
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: 'Token inválido o sin permisos. Comprueba el token en Quipu.' }
    }
    if (!res.ok) {
      return { ok: false, error: `Error al conectar con Quipu (${res.status})` }
    }
    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return { ok: false, error: `No se pudo conectar con Quipu: ${msg}` }
  }
}

// POST /api/quipu/connect — guarda y valida el token de Quipu
export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  let accessToken: string
  try {
    const body = await req.json()
    accessToken = (body?.accessToken ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  if (!accessToken) return NextResponse.json({ error: 'El token es obligatorio' }, { status: 400 })

  const validacion = await validarTokenQuipu(accessToken)
  if (!validacion.ok) {
    return NextResponse.json({ error: validacion.error || 'Token inválido' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('configuraciones_usuario')
    .upsert(
      {
        org_id: org.org_id,
        quipu_api_token: accessToken,
      },
      { onConflict: 'org_id' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
