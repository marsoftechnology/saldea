import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const mesActual = new Date().toISOString().slice(0, 7)

  const { count } = await supabase
    .from('burofaxes')
    .select('id', { count: 'exact', head: true })
    .eq('org_id', org.org_id)
    .eq('mes', mesActual)
    .eq('estado', 'enviado')

  return NextResponse.json({ usados: count ?? 0, mes: mesActual })
}
