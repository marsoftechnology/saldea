import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { seDisponible, obtenerTransacciones } from '@/lib/saltedge'

/**
 * GET /api/banco/cron-sync
 * Sincroniza automáticamente las transacciones bancarias de todos los orgs
 * con conexiones activas y concilia con facturas pendientes.
 * Protegido por CRON_SECRET (llamado por Vercel Cron Jobs cada 4h).
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (!seDisponible()) {
    return NextResponse.json({ message: 'Salt Edge no configurado, saltando' }, { status: 200 })
  }

  const admin = createServiceRoleClient()

  // Obtener todas las conexiones activas de todos los orgs
  const { data: conexiones, error } = await admin
    .from('banco_conexiones')
    .select('*')
    .eq('status', 'activa')

  if (error) {
    console.error('[cron-banco] error cargando conexiones:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!conexiones?.length) {
    return NextResponse.json({ message: 'Sin conexiones activas', orgs: 0, nuevas: 0, conciliadas: 0 })
  }

  let totalNuevas = 0
  let totalConciliadas = 0
  const orgsProcessed = new Set<string>()

  for (const conexion of conexiones) {
    const orgId = conexion.org_id
    orgsProcessed.add(orgId)

    for (const accountId of (conexion.account_ids ?? [])) {
      try {
        const transacciones = await obtenerTransacciones(accountId)

        for (const tx of transacciones) {
          if (tx.status !== 'posted') continue
          if (tx.amount <= 0) continue

          const amount = tx.amount
          const remittance = tx.description ?? ''
          const bookingDate = tx.made_on

          const { data: inserted, error: insErr } = await admin
            .from('banco_transacciones')
            .upsert({
              org_id: orgId,
              conexion_id: conexion.id,
              account_id: accountId,
              transaction_id: tx.id,
              booking_date: bookingDate,
              amount,
              currency: tx.currency_code,
              creditor_name: tx.extra?.payee ?? null,
              debtor_name: tx.extra?.payer ?? null,
              remittance_info: remittance,
              raw: tx,
            }, { onConflict: 'account_id,transaction_id', ignoreDuplicates: true })
            .select('id, conciliada')
            .maybeSingle()

          if (!insErr && inserted && !inserted.conciliada) {
            totalNuevas++

            const { data: facturas } = await admin
              .from('facturas')
              .select('id, numero, importe')
              .eq('org_id', orgId)
              .in('estado', ['pendiente', 'vencida'])
              .gte('importe', amount - 1)
              .lte('importe', amount + 1)
              .order('fecha_vencimiento', { ascending: true })
              .limit(5)

            if (facturas?.length) {
              let facturaMatch = facturas.find(f =>
                remittance.includes(f.numero ?? '') && (f.numero ?? '').length > 3
              )
              if (!facturaMatch) facturaMatch = facturas.find(f => Math.abs(f.importe - amount) < 0.01)
              if (!facturaMatch) facturaMatch = facturas[0]

              if (facturaMatch) {
                await admin
                  .from('banco_transacciones')
                  .update({ factura_id: facturaMatch.id, conciliada: true })
                  .eq('id', inserted.id)

                await admin
                  .from('facturas')
                  .update({ estado: 'cobrada' })
                  .eq('id', facturaMatch.id)

                await admin.from('pagos').insert({
                  factura_id: facturaMatch.id,
                  importe: amount,
                  fecha_pago: bookingDate,
                  metodo: 'transferencia',
                  notas: `Conciliación automática · ${remittance}`.trim().slice(0, 255),
                })

                totalConciliadas++
              }
            }
          }
        }

        await admin
          .from('banco_conexiones')
          .update({ last_sync_at: new Date().toISOString() })
          .eq('id', conexion.id)

      } catch (err) {
        console.error(`[cron-banco] error cuenta ${accountId}:`, err)
      }
    }
  }

  console.log(`[cron-banco] orgs=${orgsProcessed.size} nuevas=${totalNuevas} conciliadas=${totalConciliadas}`)
  return NextResponse.json({
    message: 'Sincronización completada',
    orgs: orgsProcessed.size,
    nuevas: totalNuevas,
    conciliadas: totalConciliadas,
  })
}
