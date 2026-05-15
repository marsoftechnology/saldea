import { NextRequest, NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const ROLES_VALIDOS = ['admin', 'member', 'readonly']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  const { memberId } = await params
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role !== 'owner' && org.role !== 'admin') {
    return NextResponse.json({ error: 'Solo owner/admin pueden cambiar roles' }, { status: 403 })
  }

  const supabase = await createServerSupabaseClient()

  // Verificar que el miembro pertenece a la org del usuario
  const { data: miembro } = await supabase
    .from('org_members')
    .select('id, user_id, role, org_id')
    .eq('id', memberId)
    .eq('org_id', org.org_id)
    .maybeSingle()
  if (!miembro) return NextResponse.json({ error: 'Miembro no encontrado' }, { status: 404 })

  // No se puede cambiar el rol del owner
  if (miembro.role === 'owner') {
    return NextResponse.json({ error: 'No se puede cambiar el rol del owner' }, { status: 400 })
  }

  const body = await req.json()
  const nuevoRol = body?.role
  if (!ROLES_VALIDOS.includes(nuevoRol)) {
    return NextResponse.json({ error: 'Rol no válido' }, { status: 400 })
  }

  const { error } = await supabase
    .from('org_members')
    .update({ role: nuevoRol })
    .eq('id', memberId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  void req
  const { memberId } = await params
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role !== 'owner' && org.role !== 'admin') {
    return NextResponse.json({ error: 'Solo owner/admin pueden eliminar miembros' }, { status: 403 })
  }

  const supabase = await createServerSupabaseClient()

  const { data: miembro } = await supabase
    .from('org_members')
    .select('id, role, user_id, org_id')
    .eq('id', memberId)
    .eq('org_id', org.org_id)
    .maybeSingle()
  if (!miembro) return NextResponse.json({ error: 'Miembro no encontrado' }, { status: 404 })

  if (miembro.role === 'owner') {
    return NextResponse.json({ error: 'No se puede eliminar al owner' }, { status: 400 })
  }
  if (miembro.user_id === org.user_id) {
    return NextResponse.json({ error: 'No te puedes eliminar a ti mismo desde aquí' }, { status: 400 })
  }

  const { error } = await supabase
    .from('org_members')
    .delete()
    .eq('id', memberId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
