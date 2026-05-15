// Helpers para el panel admin de Marsof: agregaciones financieras consultando Stripe.
// La BD de Supabase puede estar desincronizada si algún webhook falla, así que
// para datos financieros tiramos siempre de la API oficial de Stripe.

import Stripe from 'stripe'

let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  _stripe = new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
  return _stripe
}

export interface Periodo {
  inicio: Date
  fin: Date
}

export function periodoMes(year: number, mes0a11: number): Periodo {
  const inicio = new Date(Date.UTC(year, mes0a11, 1, 0, 0, 0))
  const fin = new Date(Date.UTC(year, mes0a11 + 1, 1, 0, 0, 0))
  return { inicio, fin }
}

export function periodoAno(year: number): Periodo {
  return { inicio: new Date(Date.UTC(year, 0, 1)), fin: new Date(Date.UTC(year + 1, 0, 1)) }
}

export function unixSeg(d: Date): number {
  return Math.floor(d.getTime() / 1000)
}

/**
 * Suma todos los charges exitosos (no refunded) en un periodo.
 * Pagina hasta 1000 charges por seguridad.
 */
export async function sumaIngresos(periodo?: Periodo): Promise<{
  brutoCentimos: number
  netoCentimos: number
  comisionCentimos: number
  numPagos: number
  divisas: Set<string>
}> {
  const stripe = getStripe()
  const params: Stripe.BalanceTransactionListParams = {
    limit: 100,
    type: 'charge',
  }
  if (periodo) {
    params.created = { gte: unixSeg(periodo.inicio), lt: unixSeg(periodo.fin) }
  }

  let bruto = 0
  let neto = 0
  let comision = 0
  let num = 0
  const divisas = new Set<string>()

  for await (const tx of stripe.balanceTransactions.list(params)) {
    if (tx.type !== 'charge') continue
    bruto += tx.amount
    neto += tx.net
    comision += tx.fee
    num++
    divisas.add(tx.currency.toUpperCase())
    if (num >= 1000) break
  }

  return { brutoCentimos: bruto, netoCentimos: neto, comisionCentimos: comision, numPagos: num, divisas }
}

/**
 * Devuelve ingresos brutos agrupados por mes (últimos N meses, incluyendo el actual).
 */
export async function ingresosPorMes(meses: number = 12): Promise<Array<{ year: number; mes: number; bruto: number; neto: number; label: string }>> {
  const stripe = getStripe()
  const hoy = new Date()
  const desde = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - (meses - 1), 1))

  const buckets: Map<string, { year: number; mes: number; bruto: number; neto: number }> = new Map()
  // Inicializar todos los meses a 0
  for (let i = 0; i < meses; i++) {
    const d = new Date(Date.UTC(desde.getUTCFullYear(), desde.getUTCMonth() + i, 1))
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`
    buckets.set(key, { year: d.getUTCFullYear(), mes: d.getUTCMonth(), bruto: 0, neto: 0 })
  }

  let consultados = 0
  for await (const tx of stripe.balanceTransactions.list({
    limit: 100,
    type: 'charge',
    created: { gte: unixSeg(desde) },
  })) {
    if (tx.type !== 'charge') continue
    const d = new Date(tx.created * 1000)
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`
    const bucket = buckets.get(key)
    if (bucket) {
      bucket.bruto += tx.amount
      bucket.neto += tx.net
    }
    consultados++
    if (consultados >= 5000) break
  }

  const nombresMes = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return Array.from(buckets.values()).map(b => ({
    ...b,
    label: `${nombresMes[b.mes]} ${String(b.year).slice(2)}`,
  }))
}

/**
 * Suscripciones activas con detalle de precio e intervalo.
 */
export interface SuscripcionResumen {
  id: string
  customerId: string
  customerEmail: string | null
  estado: Stripe.Subscription.Status
  intervalo: 'month' | 'year' | 'week' | 'day'
  precioCentimos: number
  divisa: string
  altaUnix: number
  proximaRenovacionUnix: number | null
  trialFin: number | null
  cancelaAlFinal: boolean
}

export async function suscripcionesActivas(): Promise<SuscripcionResumen[]> {
  const stripe = getStripe()
  const resultado: SuscripcionResumen[] = []

  for await (const sub of stripe.subscriptions.list({ limit: 100, status: 'all', expand: ['data.customer'] })) {
    // Solo nos interesan activas, trial o canceladas-pero-aún-pagando
    if (!['active', 'trialing', 'past_due'].includes(sub.status)) continue

    const item = sub.items.data[0]
    if (!item) continue
    const price = item.price
    const recurring = price.recurring
    if (!recurring) continue

    // Stripe types: customer can be string | Stripe.Customer | DeletedCustomer
    let email: string | null = null
    if (sub.customer && typeof sub.customer !== 'string' && 'email' in sub.customer) {
      email = (sub.customer as Stripe.Customer).email ?? null
    }

    // En SDK reciente, current_period_end está en items.data[i] o en el root
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subAny = sub as any
    const proximaRenov: number | null = subAny.current_period_end
      ?? item.current_period_end
      ?? null

    resultado.push({
      id: sub.id,
      customerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
      customerEmail: email,
      estado: sub.status,
      intervalo: recurring.interval,
      precioCentimos: price.unit_amount ?? 0,
      divisa: price.currency.toUpperCase(),
      altaUnix: sub.start_date,
      proximaRenovacionUnix: proximaRenov,
      trialFin: sub.trial_end ?? null,
      cancelaAlFinal: sub.cancel_at_period_end ?? false,
    })
  }

  return resultado
}

/**
 * MRR calculado a partir de suscripciones activas: las anuales se normalizan a /12.
 */
export function calcularMRR(subs: SuscripcionResumen[]): number {
  let mrr = 0
  for (const s of subs) {
    if (s.estado !== 'active' && s.estado !== 'trialing') continue
    if (s.intervalo === 'month') mrr += s.precioCentimos
    else if (s.intervalo === 'year') mrr += s.precioCentimos / 12
    else if (s.intervalo === 'week') mrr += s.precioCentimos * (52 / 12)
    else if (s.intervalo === 'day') mrr += s.precioCentimos * 30
  }
  return mrr
}

/**
 * Eventos recientes relevantes (altas, cambios, bajas, cargos).
 */
export interface EventoTimeline {
  id: string
  tipo: 'alta' | 'baja' | 'pago' | 'cambio'
  fecha: Date
  descripcion: string
  importeCentimos: number | null
  divisa: string | null
  raw: string
}

export async function eventosRecientes(limite: number = 25): Promise<EventoTimeline[]> {
  const stripe = getStripe()
  const tipos: Stripe.Event.Type[] = [
    'customer.subscription.created',
    'customer.subscription.deleted',
    'customer.subscription.updated',
    'charge.succeeded',
    'charge.refunded',
  ]
  const resultado: EventoTimeline[] = []
  for await (const ev of stripe.events.list({ limit: limite, types: tipos })) {
    let tipo: EventoTimeline['tipo'] = 'cambio'
    let descripcion = ''
    let importe: number | null = null
    let divisa: string | null = null

    if (ev.type === 'customer.subscription.created') {
      tipo = 'alta'
      const sub = ev.data.object as Stripe.Subscription
      const price = sub.items.data[0]?.price
      const intervalo = price?.recurring?.interval ?? 'mes'
      const amt = price?.unit_amount ?? 0
      divisa = (price?.currency ?? 'eur').toUpperCase()
      importe = amt
      descripcion = `Nueva suscripción ${intervalo === 'year' ? 'anual' : 'mensual'} (${(amt / 100).toFixed(2)} ${divisa})`
    } else if (ev.type === 'customer.subscription.deleted') {
      tipo = 'baja'
      descripcion = 'Suscripción cancelada'
    } else if (ev.type === 'customer.subscription.updated') {
      const sub = ev.data.object as Stripe.Subscription
      if (sub.cancel_at_period_end) {
        tipo = 'cambio'
        descripcion = 'Marcada para cancelar al final del periodo'
      } else {
        tipo = 'cambio'
        descripcion = 'Suscripción modificada'
      }
    } else if (ev.type === 'charge.succeeded') {
      tipo = 'pago'
      const ch = ev.data.object as Stripe.Charge
      importe = ch.amount
      divisa = ch.currency.toUpperCase()
      descripcion = `Cobro de ${(ch.amount / 100).toFixed(2)} ${divisa}`
    } else if (ev.type === 'charge.refunded') {
      tipo = 'cambio'
      const ch = ev.data.object as Stripe.Charge
      importe = -(ch.amount_refunded ?? 0)
      divisa = ch.currency.toUpperCase()
      descripcion = `Reembolso de ${(ch.amount_refunded / 100).toFixed(2)} ${divisa}`
    }

    resultado.push({
      id: ev.id,
      tipo,
      fecha: new Date(ev.created * 1000),
      descripcion,
      importeCentimos: importe,
      divisa,
      raw: ev.type,
    })
  }
  return resultado
}

/**
 * Balance actual de Stripe (lo que tienes ahora mismo + lo que está en tránsito).
 */
export async function obtenerBalance(): Promise<{ disponibleCentimos: number; pendienteCentimos: number; divisa: string }> {
  const stripe = getStripe()
  const balance = await stripe.balance.retrieve()
  const disp = balance.available[0]
  const pend = balance.pending[0]
  return {
    disponibleCentimos: disp?.amount ?? 0,
    pendienteCentimos: pend?.amount ?? 0,
    divisa: (disp?.currency ?? pend?.currency ?? 'eur').toUpperCase(),
  }
}
