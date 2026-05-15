import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getActiveOrg } from '@/lib/auth-org'

export async function POST(req: NextRequest) {
  void req
  try {
    const org = await getActiveOrg()
    if (!org) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    if (org.role !== 'owner') return NextResponse.json({ error: 'Solo el owner puede desconectar Stripe' }, { status: 403 })
    const supabase = await createServerSupabaseClient()

    const { data: config } = await supabase
      .from('configuraciones_usuario')
      .select('stripe_connect_account_id')
      .eq('org_id', org.org_id)
      .maybeSingle()

    const accountId = config?.stripe_connect_account_id

    // Revocar autorización OAuth en Stripe (idempotente — si ya no existe no pasa nada)
    if (accountId && process.env.STRIPE_SECRET_KEY) {
      try {
        const formData = new URLSearchParams({
          client_secret: process.env.STRIPE_SECRET_KEY,
          stripe_user_id: accountId,
        })
        await fetch('https://connect.stripe.com/oauth/deauthorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData,
        })
      } catch (e) {
        // Si falla la revocación, igual desvinculamos en nuestra BD
        console.error('Stripe deauthorize falló (continuamos):', e)
      }
    }

    await supabase
      .from('configuraciones_usuario')
      .update({
        stripe_connect_account_id: null,
        stripe_connect_charges_enabled: false,
        stripe_connect_country: null,
        stripe_connect_connected_at: null,
      })
      .eq('org_id', org.org_id)

    // Quitar Payment Links de Stripe en facturas de la org (la cuenta ya no funciona)
    await supabase
      .from('facturas')
      .update({ link_pago: null })
      .eq('org_id', org.org_id)
      .like('link_pago', 'https://buy.stripe.com/%')

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error en disconnect:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
