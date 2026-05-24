import { NextRequest } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getActiveOrg } from '@/lib/auth-org'

const H = { 'Content-Type': 'application/json' }

export async function GET(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return new Response(JSON.stringify({ conexiones: [] }), { status: 200, headers: H })
  const orgId = org.org_id

  const admin = createServiceRoleClient()
  const { data } = await admin
    .from('banco_conexiones')
    .select('*')
    .eq('org_id', orgId)
    .neq('status', 'revocada')
    .order('created_at', { ascending: false })

  return new Response(JSON.stringify({ conexiones: data ?? [] }), { status: 200, headers: H })
}
