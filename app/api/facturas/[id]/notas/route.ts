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
    const notas = typeof body?.notas === 'string' ? body.notas : null
    const notasLimpias = notas && notas.length > 5000 ? notas.slice(0, 5000) : notas

    const { error } = await supabase
      .from('facturas')
      .update({ notas_internas: notasLimpias })
      .eq('id', id)
      .eq('org_id', org.org_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error en PATCH /api/facturas/[id]/notas:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
