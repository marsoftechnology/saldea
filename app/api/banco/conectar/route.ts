import { NextRequest } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getActiveOrg } from '@/lib/get-active-org'
import { gcDisponible, crearRequisicion } from '@/lib/gocardless'

const H = { 'Content-Type': 'application/json' }

export async function POST(req: NextRequest) {
  const supabase = await createServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })

  if (!gcDisponible()) {
    return new Response(JSON.stringify({ error: 'Conciliación bancaria no configurada' }), { status: 503, headers: H })
  }

  const body = await req.json().catch(() => ({}))
  const { institution_id } = body
  if (!institution_id) {
    return new Response(JSON.stringify({ error: 'institution_id requerido' }), { status: 400, headers: H })
  }

  const orgId = await getActiveOrg(supabase, user.id)
  if (!orgId) return new Response(JSON.stringify({ error: 'Org no encontrada' }), { status: 400, headers: H })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.marsof.es'
  const redirectUrl = `${appUrl}/api/banco/callback`
  const reference = `${orgId}-${Date.now()}`

  try {
    const requisicion = await crearRequisicion({ institutionId: institution_id, redirectUrl, reference })

    // Guardamos la requisición en la base de datos
    const admin = createServiceRoleClient()
    const { error } = await admin.from('banco_conexiones').insert({
      org_id: orgId,
      requisition_id: requisicion.id,
      institution_id,
      status: 'pendiente',
    })

    if (error) {
      console.error('[banco/conectar] DB insert error:', error)
      return new Response(JSON.stringify({ error: 'Error al guardar conexión' }), { status: 500, headers: H })
    }

    return new Response(JSON.stringify({ link: requisicion.link }), { status: 200, headers: H })
  } catch (err) {
    console.error('[banco/conectar]', err)
    return new Response(JSON.stringify({ error: 'Error al crear conexión con el banco' }), { status: 500, headers: H })
  }
}
