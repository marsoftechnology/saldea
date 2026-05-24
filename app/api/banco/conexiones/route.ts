import { NextRequest } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase-server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getActiveOrg } from '@/lib/get-active-org'

const H = { 'Content-Type': 'application/json' }

export async function GET(req: NextRequest) {
  const supabase = await createServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })

  const orgId = await getActiveOrg(supabase, user.id)
  if (!orgId) return new Response(JSON.stringify({ conexiones: [] }), { status: 200, headers: H })

  const admin = createServiceRoleClient()
  const { data } = await admin
    .from('banco_conexiones')
    .select('*')
    .eq('org_id', orgId)
    .neq('status', 'revocada')
    .order('created_at', { ascending: false })

  return new Response(JSON.stringify({ conexiones: data ?? [] }), { status: 200, headers: H })
}
