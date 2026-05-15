import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { Resend } from 'resend'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'

const ROLES_VALIDOS = ['admin', 'member', 'readonly']
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

function generarToken(): string {
  return randomBytes(24).toString('hex')
}

export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role !== 'owner' && org.role !== 'admin') {
    return NextResponse.json({ error: 'Solo owner/admin pueden invitar miembros' }, { status: 403 })
  }

  const body = await req.json()
  const emailRaw = body?.email
  const rol = body?.role

  if (typeof emailRaw !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw.trim())) {
    return NextResponse.json({ error: 'Email no válido' }, { status: 400 })
  }
  if (!ROLES_VALIDOS.includes(rol)) {
    return NextResponse.json({ error: 'Rol no válido' }, { status: 400 })
  }

  const email = emailRaw.trim().toLowerCase()
  const supabase = await createServerSupabaseClient()
  const admin = createServiceRoleClient()

  // Verificar que ese email no está ya en la org (vía service role para poder consultar auth.users)
  // Primero ver si hay un usuario con ese email
  const { data: { users: usuariosTodos } } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })
  const usuarioExistente = usuariosTodos?.find(u => u.email?.toLowerCase() === email)

  if (usuarioExistente) {
    const { data: yaEsMiembro } = await admin
      .from('org_members')
      .select('id')
      .eq('org_id', org.org_id)
      .eq('user_id', usuarioExistente.id)
      .maybeSingle()
    if (yaEsMiembro) {
      return NextResponse.json({ error: 'Esta persona ya es miembro del equipo' }, { status: 400 })
    }
  }

  // Quitar invitaciones pendientes con el mismo email para evitar duplicados
  await supabase
    .from('org_invites')
    .delete()
    .eq('org_id', org.org_id)
    .ilike('email', email)
    .is('accepted_at', null)

  const token = generarToken()
  const expiraEn = new Date()
  expiraEn.setDate(expiraEn.getDate() + 7) // 7 días de validez

  const { data: invite, error } = await supabase
    .from('org_invites')
    .insert({
      org_id: org.org_id,
      email,
      role: rol,
      token,
      invited_by: org.user_id,
      expires_at: expiraEn.toISOString(),
    })
    .select()
    .single()

  if (error || !invite) {
    console.error('Error creando invite:', error)
    return NextResponse.json({ error: 'No se pudo crear la invitación' }, { status: 500 })
  }

  // Enviar email de invitación
  const { data: orgData } = await admin
    .from('organizations')
    .select('name')
    .eq('id', org.org_id)
    .maybeSingle()
  const nombreOrg = orgData?.name ?? 'la cuenta'

  const aceptarUrl = `${APP_URL}/aceptar-invitacion?token=${encodeURIComponent(token)}`
  const emailEnviado = await enviarInvitacion({
    para: email,
    nombreOrg,
    rol,
    invitanteEmail: org.user.email ?? null,
    urlAceptar: aceptarUrl,
  })

  return NextResponse.json({
    ok: true,
    invitacionId: invite.id,
    emailEnviado,
  })
}

async function enviarInvitacion(params: {
  para: string
  nombreOrg: string
  rol: string
  invitanteEmail: string | null
  urlAceptar: string
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada, no se envía email de invitación')
    return false
  }

  const etiquetaRol = params.rol === 'admin' ? 'Administrador'
    : params.rol === 'member' ? 'Miembro'
    : 'Solo lectura'

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Saldea <equipo@marsof.es>',
      to: params.para,
      subject: `Te han invitado a colaborar en ${params.nombreOrg} (Saldea)`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #0284c7;">🎉 Te han invitado a Saldea</h2>
  <p>${params.invitanteEmail ? `<strong>${params.invitanteEmail}</strong> te ha invitado` : 'Te han invitado'} a colaborar en <strong>${params.nombreOrg}</strong> como <strong>${etiquetaRol}</strong>.</p>
  <p>Saldea es la herramienta de cobros automáticos: gestionarás clientes, facturas y recordatorios junto al resto del equipo.</p>
  <div style="margin: 32px 0; text-align: center;">
    <a href="${params.urlAceptar}" style="display:inline-block; background-color:#0284c7; color:white; padding:14px 32px; border-radius:8px; text-decoration:none; font-weight:bold;">
      Aceptar invitación
    </a>
  </div>
  <p style="color:#666; font-size: 13px;">Si no esperabas esta invitación, simplemente ignora este mensaje. La invitación caducará en 7 días.</p>
  <hr style="margin-top: 40px; border:none; border-top:1px solid #eee;" />
  <p style="color:#999; font-size:12px;">Saldea · marsof.es</p>
</div>
      `,
    })
    return true
  } catch (e) {
    console.error('Error enviando email de invitación:', e)
    return false
  }
}

// Endpoint para borrar una invitación pendiente
export async function DELETE(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role !== 'owner' && org.role !== 'admin') {
    return NextResponse.json({ error: 'Solo owner/admin' }, { status: 403 })
  }

  const url = new URL(req.url)
  const inviteId = url.searchParams.get('id')
  if (!inviteId) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('org_invites')
    .delete()
    .eq('id', inviteId)
    .eq('org_id', org.org_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
