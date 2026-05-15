import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getActiveOrg, setActiveOrgCookie } from '@/lib/auth-org'

const COOKIE_ORG = 'saldea_active_org'

// GET → lista todas las orgs del usuario actual + cuál es la activa
export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  // Membresías del usuario
  const { data: members } = await supabase
    .from('org_members')
    .select('org_id, role, org:organizations(id, name, owner_id)')
    .eq('user_id', user.id)

  const orgs = (members ?? [])
    .map(m => {
      const o = m.org as unknown as { id: string; name: string; owner_id: string } | null
      if (!o) return null
      return {
        id: o.id,
        name: o.name,
        role: m.role as 'owner' | 'admin' | 'member' | 'readonly',
        es_owner: o.owner_id === user.id,
      }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.name.localeCompare(b.name))

  // Cuál es la activa
  const active = await getActiveOrg()

  return NextResponse.json({
    orgs,
    activeOrgId: active?.org_id ?? null,
  })
}

// POST { orgId } → cambia la org activa
export async function POST(req: NextRequest) {
  const body = await req.json()
  const orgId = body?.orgId
  if (typeof orgId !== 'string') return NextResponse.json({ error: 'Falta orgId' }, { status: 400 })

  // setActiveOrgCookie ya valida que el usuario es miembro de esa org
  await setActiveOrgCookie(orgId)

  // Comprobar si el cambio funcionó
  const cookieStore = await cookies()
  const valor = cookieStore.get(COOKIE_ORG)?.value
  if (valor !== orgId) {
    return NextResponse.json({ error: 'No perteneces a esa organización' }, { status: 403 })
  }
  return NextResponse.json({ ok: true })
}

// PUT { name } → crea una nueva organización con el usuario actual como owner
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const nombre = typeof body?.name === 'string' ? body.name.trim() : ''
  if (!nombre) return NextResponse.json({ error: 'Falta nombre' }, { status: 400 })
  if (nombre.length > 80) return NextResponse.json({ error: 'Nombre demasiado largo' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  // Usamos service role para insertar (RLS en organizations requiere ser miembro para SELECT)
  const admin = createServiceRoleClient()
  const { data: org, error } = await admin
    .from('organizations')
    .insert({ name: nombre, owner_id: user.id })
    .select('id')
    .single()

  if (error || !org) {
    console.error('Error creando org:', error)
    return NextResponse.json({ error: 'No se pudo crear la organización' }, { status: 500 })
  }

  // Añadir al usuario como owner
  await admin.from('org_members').insert({
    org_id: org.id,
    user_id: user.id,
    role: 'owner',
  })

  // Cambiar la org activa a la nueva
  await setActiveOrgCookie(org.id)

  return NextResponse.json({ ok: true, orgId: org.id })
}
