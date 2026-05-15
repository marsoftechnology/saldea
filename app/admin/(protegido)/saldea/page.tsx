import Link from 'next/link'
import {
  sumaIngresos,
  ingresosPorMes,
  suscripcionesActivas,
  calcularMRR,
  periodoMes,
  periodoAno,
} from '@/lib/admin-stripe'
import MonthlyChart from '../MonthlyChart'

function formatEuros(centimos: number, opciones?: { decimales?: boolean }): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: opciones?.decimales ? 2 : 0,
  }).format(centimos / 100)
}

export default async function AdminSaldeaPage() {
  const hoy = new Date()
  const year = hoy.getUTCFullYear()
  const mes = hoy.getUTCMonth()

  // 30 días atrás (rolling)
  const hace30 = new Date(hoy.getTime() - 30 * 24 * 3600 * 1000)

  const [esteMes, mesAnt, esteAno, lifetime, ultimos30, subs, porMes] = await Promise.all([
    sumaIngresos(periodoMes(year, mes)),
    sumaIngresos(mes === 0 ? periodoMes(year - 1, 11) : periodoMes(year, mes - 1)),
    sumaIngresos(periodoAno(year)),
    sumaIngresos(),
    sumaIngresos({ inicio: hace30, fin: hoy }),
    suscripcionesActivas(),
    ingresosPorMes(12),
  ])

  const mrr = Math.round(calcularMRR(subs))
  const arr = mrr * 12

  // Stats por intervalo
  const subsMensuales = subs.filter(s => s.intervalo === 'month' && (s.estado === 'active' || s.estado === 'trialing'))
  const subsAnuales = subs.filter(s => s.intervalo === 'year' && (s.estado === 'active' || s.estado === 'trialing'))
  const subsTrial = subs.filter(s => s.estado === 'trialing')
  const subsCancelaPendiente = subs.filter(s => s.cancelaAlFinal && s.estado === 'active')

  // Cohort growth: variación vs mes anterior
  const variacion = mesAnt.brutoCentimos > 0
    ? ((esteMes.brutoCentimos - mesAnt.brutoCentimos) / mesAnt.brutoCentimos) * 100
    : null

  // Suscripciones nuevas en últimos 30d (basado en altaUnix)
  const hace30Unix = Math.floor(hace30.getTime() / 1000)
  const subsNuevas30 = subs.filter(s => s.altaUnix >= hace30Unix).length

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Resumen general</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">💼 Saldea — ingresos</h1>
        <p className="text-zinc-400 text-sm mt-1">Tus ingresos por la suscripción de Saldea (Pro mensual + Pro anual)</p>
      </div>

      {/* KPIs ingresos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KPI label="Este mes" valor={formatEuros(esteMes.brutoCentimos)} sub={
          variacion === null ? `${esteMes.numPagos} pago${esteMes.numPagos === 1 ? '' : 's'}`
          : variacion >= 0 ? `▲ ${variacion.toFixed(0)}% vs mes anterior`
          : `▼ ${Math.abs(variacion).toFixed(0)}% vs mes anterior`
        }
        subColor={variacion === null ? undefined : variacion >= 0 ? 'text-emerald-300' : 'text-rose-300'}
        highlight />
        <KPI label="Últimos 30 días" valor={formatEuros(ultimos30.brutoCentimos)} sub={`${ultimos30.numPagos} pagos`} />
        <KPI label={`Año ${year}`} valor={formatEuros(esteAno.brutoCentimos)} sub={`${esteAno.numPagos} pagos`} />
        <KPI label="Lifetime" valor={formatEuros(lifetime.brutoCentimos)} sub={`desde el inicio`} />
      </div>

      {/* Recurrencia */}
      <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Ingresos recurrentes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <KPI label="MRR" valor={formatEuros(mrr)} sub={`${subsMensuales.length + subsAnuales.length} suscripción${subsMensuales.length + subsAnuales.length === 1 ? '' : 'es'}`} textColor="text-sky-300" />
        <KPI label="ARR" valor={formatEuros(arr)} sub="MRR × 12" />
        <KPI label="Mensual / Anual" valor={`${subsMensuales.length} / ${subsAnuales.length}`} sub={`${subsTrial.length} en trial`} />
        <KPI label="Nuevas (30d)" valor={String(subsNuevas30)} sub={subsCancelaPendiente.length > 0 ? `⚠ ${subsCancelaPendiente.length} cancela al final` : 'sin cancelaciones programadas'} subColor={subsCancelaPendiente.length > 0 ? 'text-amber-300' : undefined} />
      </div>

      {/* Gráfico */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-5 mb-8">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-sm font-semibold text-zinc-100">📈 Evolución mensual de ingresos</h2>
          <span className="text-[10px] text-zinc-600">Últimos 12 meses · bruto</span>
        </div>
        <div className="text-sky-300 mt-3">
          <MonthlyChart data={porMes} />
        </div>
      </div>

      {/* Bruto vs Neto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-zinc-100 mb-3">💸 Lifetime detallado</h3>
          <div className="space-y-2 text-sm">
            <Linea label="Bruto cobrado" valor={formatEuros(lifetime.brutoCentimos)} />
            <Linea label="Comisión Stripe" valor={`- ${formatEuros(lifetime.comisionCentimos)}`} textColor="text-rose-300" />
            <div className="border-t border-white/5 pt-2 mt-2">
              <Linea label="Neto en tu banco" valor={formatEuros(lifetime.netoCentimos)} bold textColor="text-emerald-300" />
            </div>
            <p className="text-[10px] text-zinc-600 pt-2">
              {((lifetime.comisionCentimos / Math.max(1, lifetime.brutoCentimos)) * 100).toFixed(2)}% de comisión efectiva
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-zinc-100 mb-3">📊 Mezcla de planes</h3>
          {subsMensuales.length + subsAnuales.length === 0 ? (
            <p className="text-xs text-zinc-500">Aún no hay suscriptores.</p>
          ) : (
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-baseline justify-between text-xs mb-1">
                  <span className="text-zinc-300">Mensual (49€/mes)</span>
                  <span className="text-zinc-500">{subsMensuales.length}</span>
                </div>
                <Bar pct={subsMensuales.length / (subsMensuales.length + subsAnuales.length) * 100} color="bg-sky-500" />
              </div>
              <div>
                <div className="flex items-baseline justify-between text-xs mb-1">
                  <span className="text-zinc-300">Anual (499€/año)</span>
                  <span className="text-zinc-500">{subsAnuales.length}</span>
                </div>
                <Bar pct={subsAnuales.length / (subsMensuales.length + subsAnuales.length) * 100} color="bg-emerald-500" />
              </div>
              <p className="text-[10px] text-zinc-600 pt-2">
                Aporte al MRR: mensuales {formatEuros(subsMensuales.length * 4900)} · anuales {formatEuros(Math.round(subsAnuales.length * 49900 / 12))}/mes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enlaces a sub-páginas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link href="/admin/saldea/ingresos" className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 hover:border-sky-500/40 transition-colors flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-100">💰 Pagos detallados</p>
            <p className="text-xs text-zinc-500 mt-0.5">Tabla de cada cobro con bruto/neto + exportar CSV</p>
          </div>
          <span className="text-zinc-500">→</span>
        </Link>
        <Link href="/admin/saldea/suscripciones" className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 hover:border-sky-500/40 transition-colors flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-100">🔁 Suscripciones</p>
            <p className="text-xs text-zinc-500 mt-0.5">Lista de suscripciones activas, trials y canceladas</p>
          </div>
          <span className="text-zinc-500">→</span>
        </Link>
      </div>
    </div>
  )
}

function KPI({ label, valor, sub, subColor, textColor, highlight }: {
  label: string; valor: string; sub?: string; subColor?: string; textColor?: string; highlight?: boolean
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

function Linea({ label, valor, bold, textColor }: { label: string; valor: string; bold?: boolean; textColor?: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className={`${bold ? 'font-bold text-base' : ''} ${textColor ?? 'text-zinc-100'}`}>{valor}</span>
    </div>
  )
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
