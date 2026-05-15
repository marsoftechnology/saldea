import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function GET() {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = await createServerSupabaseClient()
  const [{ data: orgRow }, { data: config }, { count: facturas }, { count: clientes }, { count: miembros }] = await Promise.all([
    supabase.from('organizations').select('name, onboarding_completado_at').eq('id', org.org_id).maybeSingle(),
    supabase.from('configuraciones_usuario').select('firma, stripe_connect_account_id').eq('org_id', org.org_id).maybeSingle(),
    supabase.from('facturas').select('id', { count: 'exact', head: true }).eq('org_id', org.org_id),
    supabase.from('clientes').select('id', { count: 'exact', head: true }).eq('org_id', org.org_id),
    supabase.from('org_members').select('id', { count: 'exact', head: true }).eq('org_id', org.org_id),
  ])

  return NextResponse.json({
    nombreOrg: orgRow?.name ?? '',
    completado: !!orgRow?.onboarding_completado_at,
    firma: config?.firma ?? '',
    stripeConectado: !!config?.stripe_connect_account_id,
    contadores: {
      facturas: facturas ?? 0,
      clientes: clientes ?? 0,
      miembros: miembros ?? 1,
    },
    rol: org.role,
  })
}

export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const supabase = await createServerSupabaseClient()

  // Actualizar nombre de la org si lo cambió
  if (typeof body?.nombreOrg === 'string') {
    const nombre = body.nombreOrg.trim()
    if (nombre && nombre.length <= 80) {
      await supabase.from('organizations').update({ name: nombre }).eq('id', org.org_id)
    }
  }

  // Actualizar firma de email si la cambió
  if (typeof body?.firma === 'string') {
    const firma = body.firma.trim().slice(0, 1000) || null
    await supabase
      .from('configuraciones_usuario')
      .upsert(
        { user_id: org.user_id, org_id: org.org_id, firma },
        { onConflict: 'user_id' }
      )
  }

  // Marcar onboarding como completado (a menos que se pida explícitamente lo contrario)
  if (body?.marcarCompletado !== false) {
    await supabase
      .from('organizations')
      .update({ onboarding_completado_at: new Date().toISOString() })
      .eq('id', org.org_id)
  }

  return NextResponse.json({ ok: true })
}
