import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'

// GET con ?token=xxx → devuelve info de la invitación (para mostrarla en la página de aceptar)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Falta token' }, { status: 400 })

  const admin = createServiceRoleClient()
  const { data: invite } = await admin
    .from('org_invites')
    .select('id, org_id, email, role, expires_at, accepted_at')
    .eq('token', token)
    .maybeSingle()

  if (!invite) return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 })
  if (invite.accepted_at) return NextResponse.json({ error: 'La invitación ya ha sido aceptada' }, { status: 400 })
  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: 'La invitación ha caducado' }, { status: 400 })
  }

  const { data: org } = await admin
    .from('organizations')
    .select('name')
    .eq('id', invite.org_id)
    .maybeSingle()

  return NextResponse.json({
    email: invite.email,
    role: invite.role,
    nombreOrg: org?.name ?? 'la cuenta',
    expira: invite.expires_at,
  })
}

// POST con { token } → acepta la invitación (requiere sesión)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const token = body?.token
  if (typeof token !== 'string') return NextResponse.json({ error: 'Falta token' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Debes iniciar sesión primero' }, { status: 401 })

  const admin = createServiceRoleClient()
  const { data: invite } = await admin
    .from('org_invites')
    .select('id, org_id, email, role, expires_at, accepted_at')
    .eq('token', token)
    .maybeSingle()

  if (!invite) return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 })
  if (invite.accepted_at) return NextResponse.json({ error: 'La invitación ya ha sido aceptada' }, { status: 400 })
  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: 'La invitación ha caducado' }, { status: 400 })
  }
  if (user.email?.toLowerCase() !== invite.email.toLowerCase()) {
    return NextResponse.json({
      error: `La invitación es para ${invite.email}, pero estás logueado como ${user.email}. Cierra sesión e inicia con la otra cuenta.`,
    }, { status: 403 })
  }

  // ¿Ya es miembro de esta org?
  const { data: yaEs } = await admin
    .from('org_members')
    .select('id')
    .eq('org_id', invite.org_id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!yaEs) {
    const { error: errIns } = await admin.from('org_members').insert({
      org_id: invite.org_id,
      user_id: user.id,
      role: invite.role,
    })
    if (errIns) {
      console.error('Error añadiendo miembro:', errIns)
      return NextResponse.json({ error: 'No se pudo unir a la organización' }, { status: 500 })
    }
  }

  // Marcar la invitación como aceptada
  await admin
    .from('org_invites')
    .update({ accepted_at: new Date().toISOString() })
    .eq('id', invite.id)

  return NextResponse.json({ ok: true, orgId: invite.org_id })
}
