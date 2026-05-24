import Link from 'next/link'
import Stripe from 'stripe'
import { unixSeg } from '@/lib/admin-stripe'

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY no configurada')
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
}

function formatEuros(centimos: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(centimos / 100)
}

function fechaCorta(d: Date): string {
  return d.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
}

interface PagoDetallado {
  fecha: Date
  bruto: number
  comision: number
  neto: number
  divisa: string
  email: string
  descripcion: string
  chargeId: string
  txId: string
  status: string
}

export default async function AdminIngresosPage({
  searchParams,
}: {
  searchParams: Promise<{ desde?: string; hasta?: string; periodo?: string }>
}) {
  const params = await searchParams
  const stripe = getStripe()

  // Determinar periodo
  const hoy = new Date()
  let inicio: Date
  let fin: Date = new Date(hoy)
  fin.setUTCHours(23, 59, 59, 999)

  const periodo = params.periodo ?? 'mes'
  if (params.desde || params.hasta) {
    inicio = params.desde ? new Date(params.desde) : new Date(2020, 0, 1)
    if (params.hasta) {
      fin = new Date(params.hasta)
      fin.setUTCHours(23, 59, 59, 999)
    }
  } else if (periodo === 'mes') {
    inicio = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1))
  } else if (periodo === 'mes_anterior') {
    inicio = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() - 1, 1))
    fin = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1) - 1)
  } else if (periodo === 'trimestre') {
    const trimestre = Math.floor(hoy.getUTCMonth() / 3)
    inicio = new Date(Date.UTC(hoy.getUTCFullYear(), trimestre * 3, 1))
  } else if (periodo === 'ano') {
    inicio = new Date(Date.UTC(hoy.getUTCFullYear(), 0, 1))
  } else if (periodo === 'lifetime') {
    inicio = new Date(2020, 0, 1)
  } else {
    inicio = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1))
  }

  // Consultar Stripe
  const filtro: Stripe.BalanceTransactionListParams = {
    limit: 100,
    type: 'charge',
    created: { gte: unixSeg(inicio), lt: unixSeg(fin) },
  }

  const pagos: PagoDetallado[] = []
  let totalBruto = 0
  let totalComision = 0
  let totalNeto = 0

  let consultados = 0
  for await (const tx of stripe.balanceTransactions.list(filtro)) {
    if (tx.type !== 'charge') continue
    let chargeId = ''
    let descripcion = ''
    let email = ''
    let status = 'succeeded'
    if (typeof tx.source === 'string') {
      chargeId = tx.source
    } else if (tx.source && tx.source.object === 'charge') {
      const ch = tx.source as Stripe.Charge
      chargeId = ch.id
      descripcion = ch.description ?? ''
      email = ch.billing_details?.email ?? ch.receipt_email ?? ''
      status = ch.status
    }
    pagos.push({
      fecha: new Date(tx.created * 1000),
      bruto: tx.amount,
      comision: tx.fee,
      neto: tx.net,
      divisa: tx.currency.toUpperCase(),
      email,
      descripcion,
      chargeId,
      txId: tx.id,
      status,
    })
    totalBruto += tx.amount
    totalComision += tx.fee
    totalNeto += tx.net
    consultados++
    if (consultados >= 500) break
  }

  const formatoFechaInput = (d: Date) => d.toISOString().slice(0, 10)
  const desdeQuery = formatoFechaInput(inicio)
  const hastaQuery = formatoFechaInput(fin)

  const periodoOptions = [
    { v: 'mes', label: 'Este mes' },
    { v: 'mes_anterior', label: 'Mes anterior' },
    { v: 'trimestre', label: 'Este trimestre' },
    { v: 'ano', label: 'Este año' },
    { v: 'lifetime', label: 'Histórico completo' },
  ]

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Dashboard</Link>
        <div className="flex items-baseline justify-between mt-2 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-zinc-100">💰 Pagos detallados</h1>
          <a
            href={`/api/admin/exportar-pagos?desde=${desdeQuery}&hasta=${hastaQuery}`}
            download
            className="text-xs px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-white/5 text-zinc-200"
          >
            ⬇ Exportar CSV
          </a>
        </div>
        <p className="text-zinc-400 text-sm mt-1">Cada cobro real que Stripe ha procesado · datos en vivo · todos los productos</p>
      </div>

      {/* Selector de periodo */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 mb-6">
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">Periodo</p>
        <div className="flex flex-wrap gap-2">
          {periodoOptions.map(opt => (
            <Link
              key={opt.v}
              href={`/admin/ingresos?periodo=${opt.v}`}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                periodo === opt.v && !params.desde && !params.hasta
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-200'
                  : 'border-white/10 text-zinc-400 hover:bg-white/5'
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
        <p className="text-[10px] text-zinc-500 mt-3">
          Mostrando desde <strong className="text-zinc-300">{desdeQuery}</strong> hasta <strong className="text-zinc-300">{hastaQuery}</strong>
        </p>
      </div>

      {/* Totales del periodo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
        <Card label="Pagos en el periodo" valor={String(pagos.length)} />
        <Card label="Bruto" valor={formatEuros(totalBruto)} />
        <Card label="Comisión Stripe" valor={formatEuros(totalComision)} textColor="text-rose-300" />
        <Card label="Neto recibido" valor={formatEuros(totalNeto)} textColor="text-emerald-300" highlight />
      </div>

      {/* Tabla de pagos */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-zinc-100">Listado de pagos</h2>
          <p className="text-xs text-zinc-500">{pagos.length} {pagos.length === 1 ? 'cobro' : 'cobros'}</p>
        </div>
        {pagos.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">No hay pagos en este periodo.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-left px-4 py-3">Cliente</th>
                  <th className="text-left px-4 py-3">Descripción</th>
                  <th className="text-right px-4 py-3">Bruto</th>
                  <th className="text-right px-4 py-3">Comisión</th>
                  <th className="text-right px-4 py-3">Neto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pagos.map(p => (
                  <tr key={p.txId} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">{fechaCorta(p.fecha)}</td>
                    <td className="px-4 py-3 text-zinc-300 text-xs font-mono">{p.email || '—'}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs truncate max-w-xs">{p.descripcion || '—'}</td>
                    <td className="px-4 py-3 text-zinc-100 text-right">{formatEuros(p.bruto)}</td>
                    <td className="px-4 py-3 text-rose-300 text-right text-xs">-{formatEuros(p.comision)}</td>
                    <td className="px-4 py-3 text-emerald-300 text-right font-semibold">{formatEuros(p.neto)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-zinc-900/60 border-t border-white/10">
                <tr className="font-semibold">
                  <td className="px-4 py-3 text-zinc-300 text-xs uppercase" colSpan={3}>Total {periodoOptions.find(o => o.v === periodo)?.label.toLowerCase()}</td>
                  <td className="px-4 py-3 text-zinc-100 text-right">{formatEuros(totalBruto)}</td>
                  <td className="px-4 py-3 text-rose-300 text-right text-xs">-{formatEuros(totalComision)}</td>
                  <td className="px-4 py-3 text-emerald-300 text-right">{formatEuros(totalNeto)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {consultados >= 500 && (
          <div className="px-4 py-3 border-t border-white/5 text-xs text-amber-300 bg-amber-500/5">
            ⚠ Mostrando los primeros 500 pagos del periodo. Para un volumen mayor, usa el CSV exportado.
          </div>
        )}
      </div>

      <p className="text-[10px] text-zinc-600 mt-4 text-center">
        Datos en tiempo real desde Stripe Balance Transactions
      </p>
    </div>
  )
}

function Card({ label, valor, textColor, highlight }: { label: string; valor: string; textColor?: string; highlight?: boolean }) {
  return (
    <div className={`${highlight ? 'bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border-emerald-500/30' : 'bg-zinc-900/40 border-white/10'} border rounded-xl p-4`}>
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-xl font-bold ${textColor ?? 'text-zinc-100'}`}>{valor}</p>
    </div>
  )
}
