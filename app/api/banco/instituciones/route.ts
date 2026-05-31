import { NextRequest } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { seDisponible } from '@/lib/saltedge'

const H = { 'Content-Type': 'application/json' }

/**
 * GET /api/banco/instituciones
 * Salt Edge muestra su propio selector de banco en el widget.
 * Este endpoint simplemente confirma que la integración está activa.
 */
export async function GET(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })

  if (!seDisponible()) {
    return new Response(
      JSON.stringify({
        error: 'Conciliación bancaria no configurada. Añade SALTEDGE_APP_ID y SALTEDGE_SECRET en las variables de entorno.',
      }),
      { status: 503, headers: H }
    )
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: H })
}
