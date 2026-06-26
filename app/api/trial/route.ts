import { NextResponse } from 'next/server'
import { getActiveOrg } from '@/lib/auth-org'
import { createServiceRoleClient } from '@/lib/supabase-service'

export const TRIAL_DAYS = 30

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'no_auth' }, { status: 401 })

  const admin = createServiceRoleClient()

  const [{ data: orgData }, { data: config }] = await Promise.all([
    admin.from('organizations').select('created_at').eq('id', org.org_id).maybeSingle(),
    admin.from('configuraciones_usuario').select('plan').eq('org_id', org.org_id).maybeSingle(),
  ])

  const rawPlan = config?.plan
  const plan: 'free' | 'pro' | 'max' = rawPlan === 'max' ? 'max' : rawPlan === 'pro' ? 'pro' : 'free'

  // Si ya es Pro o Max, no hay trial que gestionar
  if (plan === 'pro' || plan === 'max') {
    return NextResponse.json({ plan, trialExpired: false, trialDaysRemaining: null })
  }

  if (!orgData?.created_at) {
    return NextResponse.json({ plan, trialExpired: true, trialDaysRemaining: 0 })
  }
  const trialStart = new Date(orgData.created_at)
  const trialExpiresAt = new Date(trialStart.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000)
  const now = new Date()
  const msRemaining = trialExpiresAt.getTime() - now.getTime()
  const trialDaysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)))
  const trialExpired = now >= trialExpiresAt

  return NextResponse.json({
    plan,
    trialExpired,
    trialDaysRemaining,
    trialExpiresAt: trialExpiresAt.toISOString(),
  })
}
