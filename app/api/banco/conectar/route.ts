import { NextRequest } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getActiveOrg } from '@/lib/auth-org'
import { seDisponible, crearSesionConexion } from '@/lib/saltedge'

const H = { 'Content-Type': 'application/json' }

/**
 * POST /api/banco/conectar
 * Crea una sesión Salt Edge y devuelve la URL del widget de conexión bancaria.
 * El usuario es redirigido al widget de Salt Edge (selector de banco integrado).
 * Tras autorizar, Salt Edge redirige a /api/banco/callback?connection_id=xxx&org_id=xxx
 */
export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })
  const orgId = org.org_id

  if (!seDisponible()) {
    return new Response(JSON.stringify({ error: 'Conciliación bancaria no configurada' }), { status: 503, headers: H })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.marsof.es'
  // Incluimos org_id en el return_to para identificar la organización en el callback
  const returnToUrl = `${appUrl}/api/banco/callback?org_id=${orgId}`

  try {
    const connectUrl = await crearSesionConexion(orgId, returnToUrl)

    // Guardamos un registro pendiente (connection_id llegará en el callback)
    const admin = createServiceRoleClient()
    await admin.from('banco_conexiones').insert({
      org_id: orgId,
      requisition_id: `pending-${Date.now()}`, // placeholder hasta recibir connection_id
      institution_id: 'saltedge',
      status: 'pendiente',
    })

    return new Response(JSON.stringify({ link: connectUrl }), { status: 200, headers: H })
  } catch (err) {
    console.error('[banco/conectar]', err)
    return new Response(JSON.stringify({ error: 'Error al crear conexión bancaria' }), { status: 500, headers: H })
  }
}
