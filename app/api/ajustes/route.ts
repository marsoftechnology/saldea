import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { nombre, empresa } = await req.json()

    if (!nombre?.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
    }

    const { error } = await supabase.auth.updateUser({
      data: { nombre: nombre.trim(), empresa: empresa?.trim() || '' },
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error en ajustes:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
