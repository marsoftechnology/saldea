import { NextRequest } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase-service'
import { getActiveOrg } from '@/lib/auth-org'
import { gcDisponible, obtenerTransacciones } from '@/lib/gocardless'

const H = { 'Content-Type': 'application/json' }

/**
 * POST /api/banco/sync
 * Sincroniza transacciones de todas las conexiones activas del org
 * y las cruza con facturas pendientes (conciliación automática).
 */
export async function POST(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })
  const orgId = org.org_id

  if (!gcDisponible()) {
    return new Response(JSON.stringify({ error: 'GoCardless no configurado' }), { status: 503, headers: H })
  }

  const admin = createServiceRoleClient()

  // Cargamos conexiones activas
  const { data: conexiones } = await admin
    .from('banco_conexiones')
    .select('*')
    .eq('org_id', orgId)
    .eq('status', 'activa')

  if (!conexiones?.length) {
    return new Response(JSON.stringify({ message: 'Sin conexiones activas', nuevas: 0, conciliadas: 0 }), { status: 200, headers: H })
  }

  let totalNuevas = 0
  let totalConciliadas = 0

  for (const conexion of conexiones) {
    for (const accountId of (conexion.account_ids ?? [])) {
      try {
        const { transactions } = await obtenerTransacciones(accountId)
        const booked = transactions.booked ?? []

        for (const tx of booked) {
          const txId = tx.transactionId ?? tx.internalTransactionId ?? `${tx.bookingDate}-${tx.transactionAmount.amount}`
          const amount = parseFloat(tx.transactionAmount.amount)

          // Solo importes positivos (cobros) son relevantes para conciliación
          if (amount <= 0) continue

          const remittance = tx.remittanceInformationUnstructured ?? tx.remittanceInformationStructured ?? ''

          // Insertar o ignorar si ya existe
          const { data: inserted, error: insErr } = await admin
            .from('banco_transacciones')
            .upsert({
              org_id: orgId,
              conexion_id: conexion.id,
              account_id: accountId,
              transaction_id: txId,
              booking_date: tx.bookingDate,
              amount,
              currency: tx.transactionAmount.currency,
              creditor_name: tx.creditorName,
              debtor_name: tx.debtorName,
              remittance_info: remittance,
              raw: tx,
            }, { onConflict: 'account_id,transaction_id', ignoreDuplicates: true })
            .select('id, conciliada')
            .maybeSingle()

          if (!insErr && inserted && !inserted.conciliada) {
            totalNuevas++

            // ── Conciliación automática ──────────────────────────────────────
            // Buscamos facturas pendientes con importe coincidente (±1€ de diferencia)
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
              // Intentamos afinar la coincidencia buscando el número de factura en la remittance info
              let facturaMatch = facturas.find(f =>
                remittance.includes(f.numero ?? '') && (f.numero ?? '').length > 3
              )
              // Si no hay coincidencia por número, tomamos la más antigua con importe coincidente exacto
              if (!facturaMatch) {
                facturaMatch = facturas.find(f => Math.abs(f.importe - amount) < 0.01)
              }
              // Último recurso: la más próxima en importe
              if (!facturaMatch) {
                facturaMatch = facturas[0]
              }

              if (facturaMatch) {
                // Marcamos la transacción como conciliada
                await admin
                  .from('banco_transacciones')
                  .update({ factura_id: facturaMatch.id, conciliada: true })
                  .eq('id', inserted.id)

                // Marcamos la factura como cobrada
                await admin
                  .from('facturas')
                  .update({ estado: 'cobrada' })
                  .eq('id', facturaMatch.id)

                // Registramos el pago
                await admin.from('pagos').insert({
                  factura_id: facturaMatch.id,
                  importe: amount,
                  fecha_pago: tx.bookingDate,
                  metodo: 'transferencia',
                  notas: `Conciliación automática · ${remittance}`.trim().slice(0, 255),
                })

                totalConciliadas++
              }
            }
          }
        }

        // Actualizar last_sync_at de la conexión
        await admin
          .from('banco_conexiones')
          .update({ last_sync_at: new Date().toISOString() })
          .eq('id', conexion.id)

      } catch (err) {
        console.error(`[banco/sync] error cuenta ${accountId}:`, err)
      }
    }
  }

  return new Response(
    JSON.stringify({ message: 'Sincronización completada', nuevas: totalNuevas, conciliadas: totalConciliadas }),
    { status: 200, headers: H }
  )
}

/** DELETE /api/banco/sync — desconecta (revoca) una conexión bancaria */
export async function DELETE(req: NextRequest) {
  const org = await getActiveOrg()
  if (!org) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401, headers: H })
  const orgId = org.org_id

  const { conexion_id } = await req.json().catch(() => ({}))
  if (!conexion_id) return new Response(JSON.stringify({ error: 'conexion_id requerido' }), { status: 400, headers: H })

  const admin = createServiceRoleClient()
  await admin
    .from('banco_conexiones')
    .update({ status: 'revocada' })
    .eq('id', conexion_id)
    .eq('org_id', orgId)

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: H })
}
