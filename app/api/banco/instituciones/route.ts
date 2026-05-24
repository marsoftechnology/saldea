import { NextRequest } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/get-active-org'
import { gcDisponible, listarInstituciones } from '@/lib/gocardless'

const H = { 'Content-Type': 'application/json' }

export async function GET(req: NextRequest) {
  const supabase = await createServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })

  if (!gcDisponible()) {
    return new Response(
      JSON.stringify({ error: 'Conciliación bancaria no configurada. Añade GOCARDLESS_SECRET_ID y GOCARDLESS_SECRET_KEY.' }),
      { status: 503, headers: H }
    )
  }

  try {
    const instituciones = await listarInstituciones('ES')
    // Filtramos para devolver solo los campos necesarios
    const lista = instituciones.map(i => ({
      id: i.id,
      name: i.name,
      bic: i.bic,
      logo: i.logo,
    }))
    return new Response(JSON.stringify({ instituciones: lista }), { status: 200, headers: H })
  } catch (err) {
    console.error('[banco/instituciones]', err)
    return new Response(JSON.stringify({ error: 'Error al obtener bancos' }), { status: 500, headers: H })
  }
}
