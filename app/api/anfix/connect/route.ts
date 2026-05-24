import { NextRequest, NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// Valida la API key llamando a la API de Anfix
async function validarKeyAnfix(apiKey: string): Promise<{ ok: boolean; error?: string }> {
  try {
    // Anfix REST API – endpoint de validación: GET /api/invoices (primera página)
    // Si el endpoint cambia, actualiza la URL aquí
    const res = await fetch('https://api.anfix.com/api/invoices?page=1&per_page=1', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
    })
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: 'API key inválida o sin permisos. Comprueba la clave en Anfix.' }
    }
    if (!res.ok) {
      return { ok: false, error: `Error al conectar con Anfix (${res.status}). Verifica que la API key es correcta.` }
    }
    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return { ok: false, error: `No se pudo conectar con Anfix: ${msg}` }
  }
}

// POST /api/anfix/connect — guarda y valida la API key de Anfix
export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  let apiKey: string
  try {
    const body = await req.json()
    apiKey = (body?.apiKey ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  if (!apiKey) return NextResponse.json({ error: 'La API key es obligatoria' }, { status: 400 })

  const validacion = await validarKeyAnfix(apiKey)
  if (!validacion.ok) {
    return NextResponse.json({ error: validacion.error || 'API key inválida' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('configuraciones_usuario')
    .upsert(
      {
        org_id: org.org_id,
        anfix_api_key: apiKey,
      },
      { onConflict: 'org_id' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
