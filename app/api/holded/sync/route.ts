import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { sincronizarDesdeHolded } from '@/lib/holded'

export async function POST() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (org.role === 'readonly') return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

  const supabase = await createServerSupabaseClient()

  // Obtener API key guardada
  const { data: config } = await supabase
    .from('configuraciones_usuario')
    .select('holded_api_key')
    .eq('org_id', org.org_id)
    .maybeSingle()

  if (!config?.holded_api_key) {
    return NextResponse.json({ error: 'Holded no está conectado' }, { status: 400 })
  }

  // Usar service role para poder insertar con org_id sin restricciones RLS
  const serviceClient = createServiceRoleClient()

  const resultado = await sincronizarDesdeHolded(config.holded_api_key, org.org_id, serviceClient)

  // Actualizar timestamp de última sincronización
  await supabase
    .from('configuraciones_usuario')
    .update({ holded_last_sync: new Date().toISOString() })
    .eq('org_id', org.org_id)

  return NextResponse.json({ ok: true, resultado })
}
