import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const notas = typeof body?.notas === 'string' ? body.notas : null

    // Limitar tamaño para evitar abusos
    const notasLimpias = notas && notas.length > 5000 ? notas.slice(0, 5000) : notas

    const { error } = await supabase
      .from('facturas')
      .update({ notas_internas: notasLimpias })
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error en PATCH /api/facturas/[id]/notas:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
