import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role === 'readonly') return NextResponse.json({ error: 'Tu rol no permite editar' }, { status: 403 })

    const supabase = await createServerSupabaseClient()
    const body = await req.json()
    const path = body?.pdf_propio_path

    // Validar: o es null, o es string que empieza por user.id/ (defensa: usuario no puede apuntar a PDF ajeno)
    let valor: string | null = null
    if (typeof path === 'string' && path.trim()) {
      const limpio = path.trim()
      if (!limpio.startsWith(`${org.user_id}/`)) {
        return NextResponse.json({ error: 'Ruta no autorizada' }, { status: 403 })
      }
      if (limpio.length > 500) {
        return NextResponse.json({ error: 'Ruta demasiado larga' }, { status: 400 })
      }
      valor = limpio
    }

    const { error } = await supabase
      .from('facturas')
      .update({ pdf_propio_path: valor })
      .eq('id', id)
      .eq('org_id', org.org_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error en PATCH /api/facturas/[id]/pdf-propio:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
