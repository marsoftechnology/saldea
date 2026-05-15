import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

function esUrlValida(s: string): boolean {
  try {
    const u = new URL(s)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

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
    const link = body?.link_pago

    let valor: string | null = null
    if (typeof link === 'string' && link.trim()) {
      const limpio = link.trim()
      if (!esUrlValida(limpio)) {
        return NextResponse.json({ error: 'URL no válida' }, { status: 400 })
      }
      if (limpio.length > 2000) {
        return NextResponse.json({ error: 'URL demasiado larga' }, { status: 400 })
      }
      valor = limpio
    }

    const { error } = await supabase
      .from('facturas')
      .update({ link_pago: valor })
      .eq('id', id)
      .eq('org_id', org.org_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error en PATCH /api/facturas/[id]/link-pago:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
