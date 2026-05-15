import Link from 'next/link'
import {
  sumaIngresos,
  ingresosPorMes,
  suscripcionesActivas,
  calcularMRR,
  eventosRecientes,
  obtenerBalance,
  periodoMes,
  periodoAno,
} from '@/lib/admin-stripe'
import MonthlyChart from './MonthlyChart'

function formatEuros(centimos: number, opciones?: { decimales?: boolean }): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: opciones?.decimales ? 2 : 0,
  }).format(centimos / 100)
}

function fechaCorta(d: Date): string {
  const hoy = new Date()
  const diff = (hoy.getTime() - d.getTime()) / (24 * 3600 * 1000)
  if (diff < 1) {
    const horas = Math.floor((hoy.getTime() - d.getTime()) / (3600 * 1000))
    if (horas < 1) return 'hace unos minutos'
    return `hace ${horas} h`
  }
  if (diff < 30) return `hace ${Math.floor(diff)} días`
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default async function AdminInicioPage() {
  const hoy = new Date()
  const yearActual = hoy.getUTCFullYear()
  const mesActual = hoy.getUTCMonth()

  // Pedimos todo en paralelo
  const [
    esteMes,
    mesAnterior,
    esteAno,
    lifetime,
    subs,
    porMes,
    eventos,
    balance,
  ] = await Promise.all([
    sumaIngresos(periodoMes(yearActual, mesActual)),
    sumaIngresos(mesActual === 0
      ? periodoMes(yearActual - 1, 11)
      : periodoMes(yearActual, mesActual - 1)),
    sumaIngresos(periodoAno(yearActual)),
    sumaIngresos(), // todo el lifetime
    suscripcionesActivas(),
    ingresosPorMes(12),
    eventosRecientes(10),
    obtenerBalance().catch(() => ({ disponibleCentimos: 0, pendienteCentimos: 0, divisa: 'EUR' })),
  ])

  const mrrCentimos = Math.round(calcularMRR(subs))
  const arrCentimos = mrrCentimos * 12
  const subsActivas = subs.filter(s => s.estado === 'active' || s.estado === 'trialing').length
  const subsTrialing = subs.filter(s => s.estado === 'trialing').length

  // Variación vs mes anterior
  const variacion = mesAnterior.brutoCentimos > 0
    ? ((esteMes.brutoCentimos - mesAnterior.brutoCentimos) / mesAnterior.brutoCentimos) * 100
    : null

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <p className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-2">
          Panel administrador · Marsof Technology
        </p>
        <h1 className="text-2xl font-bold text-zinc-100">Resumen financiero global</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Cuánto está facturando cada una de tus apps. Datos en vivo desde Stripe.
        </p>
      </div>

      {/* KPIs principales: ingresos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <KPI
          label="Este mes"
          valor={formatEuros(esteMes.brutoCentimos)}
          sub={
            variacion === null ? `${esteMes.numPagos} pago${esteMes.numPagos === 1 ? '' : 's'}`
            : variacion >= 0 ? `▲ ${variacion.toFixed(0)}% vs mes anterior`
            : `▼ ${Math.abs(variacion).toFixed(0)}% vs mes anterior`
          }
          subColor={variacion === null ? 'text-zinc-500' : variacion >= 0 ? 'text-emerald-300' : 'text-rose-300'}
          highlight
        />
        <KPI
          label="Este año"
          valor={formatEuros(esteAno.brutoCentimos)}
          sub={`${esteAno.numPagos} pagos · ${yearActual}`}
        />
        <KPI
          label="Total lifetime"
          valor={formatEuros(lifetime.brutoCentimos)}
          sub={`${lifetime.numPagos} pagos desde el inicio`}
        />
      </div>

      {/* KPIs secundarios: recurrencia + balance */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KPI
          label="MRR"
          valor={formatEuros(mrrCentimos)}
          sub={`${subsActivas} activa${subsActivas === 1 ? '' : 's'}${subsTrialing > 0 ? ` · ${subsTrialing} en trial` : ''}`}
          textColor="text-sky-300"
        />
        <KPI
          label="ARR estimado"
          valor={formatEuros(arrCentimos)}
          sub="MRR × 12"
        />
        <KPI
          label="Saldo Stripe"
          valor={formatEuros(balance.disponibleCentimos)}
          sub={balance.pendienteCentimos > 0 ? `+ ${formatEuros(balance.pendienteCentimos)} en tránsito` : 'disponible'}
        />
        <KPI
          label="Comisión Stripe"
          valor={formatEuros(lifetime.comisionCentimos)}
          sub={`${((lifetime.comisionCentimos / Math.max(1, lifetime.brutoCentimos)) * 100).toFixed(1)}% del bruto`}
          textColor="text-zinc-400"
        />
      </div>

      {/* Gráfico de evolución mensual */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-5 mb-8">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-sm font-semibold text-zinc-100">📈 Evolución mensual</h2>
          <span className="text-[10px] text-zinc-600">Últimos 12 meses · datos de Stripe</span>
        </div>
        <p className="text-xs text-zinc-500 mb-4">Ingresos brutos por mes (pasa el ratón por una barra para ver el detalle)</p>
        <div className="text-sky-300">
          <MonthlyChart data={porMes} />
        </div>
      </div>

      {/* Desglose por app */}
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Apps</h2>
      <div className="space-y-3 mb-8">
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <h3 className="text-base font-bold text-zinc-100">Saldea</h3>
                <p className="text-xs text-zinc-500">Cobro automático de facturas con IA · marsof.es</p>
              </div>
            </div>
            <Link
              href="/admin/saldea"
              className="text-xs text-sky-400 hover:text-sky-300 border border-sky-500/30 hover:bg-sky-500/10 px-3 py-1.5 rounded-lg"
            >
              Detalle financiero →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {/* En el futuro, cuando haya más apps, estos números se filtrarán por app */}
            <SubMetric label="Este mes" valor={formatEuros(esteMes.brutoCentimos)} />
            <SubMetric label="Este año" valor={formatEuros(esteAno.brutoCentimos)} />
            <SubMetric label="MRR" valor={formatEuros(mrrCentimos)} />
            <SubMetric label="Suscriptores" valor={String(subsActivas)} />
          </div>
        </div>

        {/* Placeholder de futuras apps */}
        <div className="bg-zinc-900/20 border border-dashed border-white/10 rounded-2xl p-6 text-center">
          <p className="text-zinc-500 text-sm">🧪 Cuando lances la siguiente app de Marsof aparecerá aquí</p>
          <p className="text-zinc-600 text-xs mt-1">Cada app tendrá su propia fila con sus métricas</p>
        </div>
      </div>

      {/* Eventos recientes */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-2xl">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-sm font-semibold text-zinc-100">🕒 Actividad reciente</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Últimos {eventos.length} eventos de Stripe</p>
        </div>
        {eventos.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm">Sin eventos aún.</div>
        ) : (
          <ul className="divide-y divide-white/5">
            {eventos.map(e => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg">
                    {e.tipo === 'alta' ? '🆕' : e.tipo === 'baja' ? '❌' : e.tipo === 'pago' ? '💰' : '🔄'}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-200 truncate">{e.descripcion}</p>
                    <p className="text-[10px] text-zinc-500">{fechaCorta(e.fecha)} · {e.raw}</p>
                  </div>
                </div>
                {e.importeCentimos !== null && (
                  <span className={`text-sm font-semibold shrink-0 ${e.importeCentimos < 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                    {e.importeCentimos < 0 ? '-' : ''}{formatEuros(Math.abs(e.importeCentimos))}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function KPI({
  label, valor, sub, subColor, textColor, highlight,
}: {
  label: string
  valor: string
  sub?: string
  subColor?: string
  textColor?: string
  highlight?: boolean
}) {
  return (
    <div className={`${highlight ? 'bg-gradient-to-br from-sky-500/20 to-sky-500/5 border-sky-500/30' : 'bg-zinc-900/40 border-white/10'} border rounded-xl p-5`}>
      <p className={`text-[10px] uppercase tracking-wider mb-1 font-semibold ${highlight ? 'text-sky-300' : 'text-zinc-500'}`}>
        {label}
      </p>
      <p className={`text-2xl font-bold ${textColor ?? 'text-zinc-100'}`}>{valor}</p>
      {sub && <p className={`text-xs mt-1 ${subColor ?? 'text-zinc-500'}`}>{sub}</p>}
    </div>
  )
}

function SubMetric({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="bg-zinc-900/40 p-4">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-lg font-bold text-zinc-100">{valor}</p>
    </div>
  )
}
