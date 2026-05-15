// Helpers de autenticación + organización
// Resuelve la "org activa" del usuario y sus permisos.

import { cookies } from 'next/headers'
import { createServerSupabaseClient } from './supabase-server'
import { createServiceRoleClient } from './supabase-service'
import type { SupabaseClient, User } from '@supabase/supabase-js'

export type Rol = 'owner' | 'admin' | 'member' | 'readonly'

export interface OrgActiva {
  org_id: string
  user_id: string
  role: Rol
  user: User
}

const COOKIE_ORG = 'saldea_active_org'

/**
 * Resuelve la org activa del usuario actual.
 * Si tiene varias, prefiere la guardada en cookie; si no, la primera.
 * Si no tiene ninguna, crea una por defecto (caso de usuarios pre-multi-user o nuevos signups).
 * Devuelve null si no hay sesión.
 */
export async function getActiveOrg(): Promise<OrgActiva | null> {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Buscar memberships del usuario
  const { data: members } = await supabase
    .from('org_members')
    .select('org_id, role')
    .eq('user_id', user.id)

  let memberships = members ?? []

  // Si el usuario aún no tiene ninguna org → crearle una por defecto (pre/post-migración)
  if (memberships.length === 0) {
    const orgCreada = await crearOrgPorDefecto(user)
    if (orgCreada) memberships = [{ org_id: orgCreada, role: 'owner' }]
    else return null
  }

  // Si hay varias, mira la cookie para saber cuál está activa
  let activa: { org_id: string; role: string } = memberships[0]
  if (memberships.length > 1) {
    const cookieStore = await cookies()
    const cookieValue = cookieStore.get(COOKIE_ORG)?.value
    if (cookieValue) {
      const fromCookie = memberships.find(m => m.org_id === cookieValue)
      if (fromCookie) activa = fromCookie
    }
  }

  return {
    org_id: activa.org_id,
    user_id: user.id,
    role: activa.role as Rol,
    user,
  }
}

/**
 * Igual que getActiveOrg pero lanza 401 si no hay sesión y 403 si el rol no está permitido.
 * Útil en API routes: `const org = await requireOrg(['owner', 'admin'])`.
 */
export async function requireOrg(rolesPermitidos?: Rol[]): Promise<OrgActiva | { error: Response }> {
  const org = await getActiveOrg()
  if (!org) {
    return {
      error: new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    }
  }
  if (rolesPermitidos && !rolesPermitidos.includes(org.role)) {
    return {
      error: new Response(JSON.stringify({ error: `Tu rol (${org.role}) no permite esta acción` }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }),
    }
  }
  return org
}

/**
 * Crea una organización por defecto para un usuario que aún no tiene ninguna.
 * Usa el service role client porque puede que el usuario aún no tenga RLS para crear orgs.
 */
async function crearOrgPorDefecto(user: User): Promise<string | null> {
  try {
    const adminClient = createServiceRoleClient()
    const nombre =
      (user.user_metadata?.empresa as string | undefined) ||
      (user.user_metadata?.nombre as string | undefined) ||
      user.email ||
      'Mi empresa'

    const { data: org, error: errOrg } = await adminClient
      .from('organizations')
      .insert({ name: nombre, owner_id: user.id })
      .select('id')
      .single()
    if (errOrg || !org) {
      console.error('Error creando org por defecto:', errOrg)
      return null
    }

    await adminClient.from('org_members').insert({
      org_id: org.id,
      user_id: user.id,
      role: 'owner',
    })

    // Si hay configuracion_usuario, asociarla a esta org
    await adminClient
      .from('configuraciones_usuario')
      .update({ org_id: org.id })
      .eq('user_id', user.id)
      .is('org_id', null)

    return org.id
  } catch (e) {
    console.error('crearOrgPorDefecto excepción:', e)
    return null
  }
}

/**
 * Cambia la organización activa del usuario (guardando en cookie).
 * Solo aplica si el usuario es realmente miembro de esa org.
 */
export async function setActiveOrgCookie(orgId: string): Promise<void> {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data: pertenece } = await supabase
    .from('org_members')
    .select('org_id')
    .eq('user_id', user.id)
    .eq('org_id', orgId)
    .maybeSingle()
  if (!pertenece) return
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_ORG, orgId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365, // 1 año
    path: '/',
  })
}

/**
 * Para el cron y otros endpoints sistema: obtener la org de una factura/cliente.
 * No requiere sesión, asume contexto privilegiado (service role).
 */
export async function getOrgIdDeFactura(supabase: SupabaseClient, facturaId: string): Promise<string | null> {
  const { data } = await supabase
    .from('facturas')
    .select('org_id')
    .eq('id', facturaId)
    .maybeSingle()
  return (data?.org_id as string | undefined) ?? null
}
