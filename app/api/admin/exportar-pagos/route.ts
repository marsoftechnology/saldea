import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminSesionActiva } from '@/lib/admin-auth'
import { generarCSV, csvResponse } from '@/lib/csv'
import { unixSeg } from '@/lib/admin-stripe'

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

function isoHoy(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET(req: Request) {
  const ok = await adminSesionActiva()
  if (!ok) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const url = new URL(req.url)
  const desdeStr = url.searchParams.get('desde')
  const hastaStr = url.searchParams.get('hasta')

  const stripe = getStripe()

  const params: Stripe.BalanceTransactionListParams = { limit: 100, type: 'charge' }
  if (desdeStr || hastaStr) {
    params.created = {}
    if (desdeStr) params.created.gte = unixSeg(new Date(desdeStr))
    if (hastaStr) {
      const fin = new Date(hastaStr)
      fin.setUTCDate(fin.getUTCDate() + 1)
      params.created.lt = unixSeg(fin)
    }
  }

  const filas: Array<Record<string, unknown>> = []
  let consultados = 0
  for await (const tx of stripe.balanceTransactions.list(params)) {
    if (tx.type !== 'charge') continue
    let chargeId = ''
    let descripcion = ''
    let email = ''
    if (typeof tx.source === 'string') {
      chargeId = tx.source
    } else if (tx.source && tx.source.object === 'charge') {
      const ch = tx.source as Stripe.Charge
      chargeId = ch.id
      descripcion = ch.description ?? ''
      email = ch.billing_details?.email ?? ''
    }
    const fecha = new Date(tx.created * 1000)
    filas.push({
      fecha: fecha.toISOString().slice(0, 10),
      hora: fecha.toISOString().slice(11, 19),
      bruto_eur: (tx.amount / 100).toFixed(2).replace('.', ','),
      comision_eur: (tx.fee / 100).toFixed(2).replace('.', ','),
      neto_eur: (tx.net / 100).toFixed(2).replace('.', ','),
      divisa: tx.currency.toUpperCase(),
      email_cliente: email,
      descripcion,
      charge_id: chargeId,
      balance_transaction_id: tx.id,
    })
    consultados++
    if (consultados >= 5000) break
  }

  const csv = generarCSV(filas)
  return csvResponse(csv, `marsof_pagos_${desdeStr ?? 'inicio'}_${hastaStr ?? isoHoy()}.csv`)
}
