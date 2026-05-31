import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { obtenerConexion, obtenerCuentas } from '@/lib/saltedge'

/**
 * Salt Edge redirige aquí tras la autorización bancaria del usuario.
 * URL: /api/banco/callback?org_id=<orgId>&connection_id=<id>
 *   o: /api/banco/callback?org_id=<orgId>&error=<code>
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const orgId = searchParams.get('org_id')
  const connectionId = searchParams.get('connection_id')
  const errorCode = searchParams.get('error')

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.marsof.es'

  if (!orgId) {
    return NextResponse.redirect(`${appUrl}/banco?error=referencia_invalida`)
  }

  if (errorCode) {
    return NextResponse.redirect(`${appUrl}/banco?error=banco_rechazado`)
  }

  if (!connectionId) {
    return NextResponse.redirect(`${appUrl}/banco?info=pendiente`)
  }

  const admin = createServiceRoleClient()

  try {
    // Verificamos el estado real de la conexión en Salt Edge
    const conexionSE = await obtenerConexion(connectionId)

    if (conexionSE.status === 'active') {
      // Obtenemos las cuentas de la conexión
      const cuentas = await obtenerCuentas(connectionId)
      const accountIds = cuentas.map(c => c.id)

      // Actualizamos el registro pendiente de esta organización
      await admin
        .from('banco_conexiones')
        .update({
          requisition_id: connectionId,         // reutilizamos esta columna para el connection_id
          institution_id: conexionSE.provider_name ?? conexionSE.provider_code ?? 'saltedge',
          status: 'activa',
          account_ids: accountIds,
          updated_at: new Date().toISOString(),
        })
        .eq('org_id', orgId)
        .eq('status', 'pendiente')

      return NextResponse.redirect(`${appUrl}/banco?exito=banco_conectado`)
    }

    if (conexionSE.status === 'inactive' || conexionSE.status === 'disabled') {
      await admin
        .from('banco_conexiones')
        .update({ status: 'error' })
        .eq('org_id', orgId)
        .eq('status', 'pendiente')
      return NextResponse.redirect(`${appUrl}/banco?error=banco_rechazado`)
    }

    // Estado desconocido o deleted
    return NextResponse.redirect(`${appUrl}/banco?info=pendiente`)
  } catch (err) {
    console.error('[banco/callback] error Salt Edge:', err)
    return NextResponse.redirect(`${appUrl}/banco?error=error_conexion`)
  }
}
