import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { obtenerRequisicion } from '@/lib/gocardless'

/**
 * GoCardless redirige aquí tras la autenticación bancaria del usuario.
 * URL: /api/banco/callback?ref=<reference>
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const ref = searchParams.get('ref')
  const error = searchParams.get('error')

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.marsof.es'

  if (error) {
    return NextResponse.redirect(`${appUrl}/banco?error=banco_rechazado`)
  }

  if (!ref) {
    return NextResponse.redirect(`${appUrl}/banco?error=referencia_invalida`)
  }

  const admin = createServiceRoleClient()

  // Buscamos la conexión por referencia (formato orgId-timestamp)
  const orgId = ref.split('-').slice(0, 5).join('-') // uuid tiene 5 segmentos
  const { data: conexion, error: dbErr } = await admin
    .from('banco_conexiones')
    .select('*')
    .eq('org_id', orgId)
    .eq('status', 'pendiente')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (dbErr || !conexion) {
    console.error('[banco/callback] conexión no encontrada para ref:', ref, dbErr)
    return NextResponse.redirect(`${appUrl}/banco?error=conexion_no_encontrada`)
  }

  try {
    // Consultamos el estado real de la requisición en GoCardless
    const requisicion = await obtenerRequisicion(conexion.requisition_id)

    if (requisicion.status === 'LN' || requisicion.status === 'GA') {
      // Acceso concedido — guardamos los account IDs
      await admin
        .from('banco_conexiones')
        .update({
          status: 'activa',
          account_ids: requisicion.accounts,
          updated_at: new Date().toISOString(),
        })
        .eq('id', conexion.id)

      return NextResponse.redirect(`${appUrl}/banco?exito=banco_conectado`)
    }

    if (requisicion.status === 'RJ' || requisicion.status === 'ER') {
      await admin
        .from('banco_conexiones')
        .update({ status: 'error' })
        .eq('id', conexion.id)
      return NextResponse.redirect(`${appUrl}/banco?error=banco_rechazado`)
    }

    // Cualquier otro estado — redirigimos con estado pendiente
    return NextResponse.redirect(`${appUrl}/banco?info=pendiente`)
  } catch (err) {
    console.error('[banco/callback] error GoCardless:', err)
    return NextResponse.redirect(`${appUrl}/banco?error=error_conexion`)
  }
}
