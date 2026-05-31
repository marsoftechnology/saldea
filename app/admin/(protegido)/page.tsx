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
import { createServiceRoleClient } from '@/lib/supabase-service'

// ─── Visitas web ────────────────────────────────────────────────────────────

interface VisitasStats {
  hoy: number
  semana: number
  mes: number
  topRutas: { ruta: string; visitas: number }[]
}

async function obtenerVisitas(): Promise<VisitasStats> {
  try {
    const supabase = createServiceRoleClient()
    const ahora = new Date()
    const inicioHoy = new Date(ahora)
    inicioHoy.setUTCHours(0, 0, 0, 0)
    const inicioSemana = new Date(ahora.getTime() - 7 * 24 * 3600 * 1000)
    const inicioMes = new Date(ahora.getTime() - 30 * 24 * 3600 * 1000)

    const [resHoy, resSemana, resMes, resTop] = await Promise.all([
      supabase
        .from('visitas_web')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', inicioHoy.toISOString()),
      supabase
        .from('visitas_web')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', inicioSemana.toISOString()),
      supabase
        .from('visitas_web')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', inicioMes.toISOString()),
      supabase
        .from('visitas_web')
        .select('ruta')
        .gte('created_at', inicioMes.toISOString())
        .order('created_at', { ascending: false })
        .limit(500),
    ])

    // Contar manualmente por ruta (no hay RPC todavía)
    const conteo: Record<string, number> = {}
    for (const row of resTop.data ?? []) {
      conteo[row.ruta] = (conteo[row.ruta] ?? 0) + 1
    }
    const topRutas = Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([ruta, visitas]) => ({ ruta, visitas }))

    return {
      hoy: resHoy.count ?? 0,
      semana: resSemana.count ?? 0,
      mes: resMes.count ?? 0,
      topRutas,
    }
  } catch {
    return { hoy: 0, semana: 0, mes: 0, topRutas: [] }
  }
}

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
  const hace30 = new Date(hoy.getTime() - 30 * 24 * 3600 * 1000)

  // Pedimos todo en paralelo
  const [
    esteMes,
    mesAnterior,
    esteAno,
    lifetime,
    ultimos30,
    subs,
    porMes,
    eventos,
    balance,
    visitas,
  ] = await Promise.all([
    sumaIngresos(periodoMes(yearActual, mesActual)),
    sumaIngresos(mesActual === 0
      ? periodoMes(yearActual - 1, 11)
      : periodoMes(yearActual, mesActual - 1)),
    sumaIngresos(periodoAno(yearActual)),
    sumaIngresos(), // todo el lifetime
    sumaIngresos({ inicio: hace30, fin: hoy }),
    suscripcionesActivas(),
    ingresosPorMes(12),
    eventosRecientes(10),
    obtenerBalance().catch(() => ({ disponibleCentimos: 0, pendienteCentimos: 0, divisa: 'EUR' })),
    obtenerVisitas(),
  ])

  const mrrCentimos = Math.round(calcularMRR(subs))
  const arrCentimos = mrrCentimos * 12
  const subsActivas = subs.filter(s => s.estado === 'active' || s.estado === 'trialing').length
  const subsTrialing = subs.filter(s => s.estado === 'trialing').length
  const subsMensuales = subs.filter(s => s.intervalo === 'month' && (s.estado === 'active' || s.estado === 'trialing'))
  const subsAnuales = subs.filter(s => s.intervalo === 'year' && (s.estado === 'active' || s.estado === 'trialing'))
  const subsCancelaPendiente = subs.filter(s => s.cancelaAlFinal && s.estado === 'active')
  const hace30Unix = Math.floor(hace30.getTime() / 1000)
  const subsNuevas30 = subs.filter(s => s.altaUnix >= hace30Unix).length

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

      {/* Desglose lifetime + mezcla de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Lifetime bruto / comisión / neto */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">💸 Lifetime detallado</h2>
          <div className="space-y-2 text-sm">
            <Linea label="Bruto cobrado" valor={formatEuros(lifetime.brutoCentimos)} />
            <Linea label="Comisión Stripe" valor={`− ${formatEuros(lifetime.comisionCentimos, { decimales: true })}`} textColor="text-rose-300" />
            <div className="border-t border-white/5 pt-2 mt-2">
              <Linea label="Neto en tu banco" valor={formatEuros(lifetime.netoCentimos)} bold textColor="text-emerald-300" />
            </div>
            <p className="text-[10px] text-zinc-600 pt-1">
              {((lifetime.comisionCentimos / Math.max(1, lifetime.brutoCentimos)) * 100).toFixed(2)}% comisión efectiva ·
              Últimos 30d: <span className="text-zinc-400">{formatEuros(ultimos30.brutoCentimos)}</span> ({ultimos30.numPagos} pagos)
            </p>
          </div>
        </div>

        {/* Mezcla de planes */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">📊 Mezcla de planes</h2>
          {subsActivas === 0 ? (
            <p className="text-xs text-zinc-500">Aún no hay suscriptores.</p>
          ) : (
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-baseline justify-between text-xs mb-1">
                  <span className="text-zinc-300">Mensual</span>
                  <span className="text-zinc-400">{subsMensuales.length} · {formatEuros(subsMensuales.reduce((s, x) => s + x.precioCentimos, 0))}/mes</span>
                </div>
                <Bar pct={subsMensuales.length / Math.max(1, subsActivas) * 100} color="bg-sky-500" />
              </div>
              <div>
                <div className="flex items-baseline justify-between text-xs mb-1">
                  <span className="text-zinc-300">Anual</span>
                  <span className="text-zinc-400">{subsAnuales.length} · {formatEuros(subsAnuales.reduce((s, x) => s + x.precioCentimos, 0))}/año</span>
                </div>
                <Bar pct={subsAnuales.length / Math.max(1, subsActivas) * 100} color="bg-emerald-500" />
              </div>
              <p className="text-[10px] text-zinc-600 pt-1">
                Nuevas (30d): <span className={subsNuevas30 > 0 ? 'text-emerald-300' : 'text-zinc-500'}>{subsNuevas30}</span>
                {subsCancelaPendiente.length > 0 && (
                  <span className="text-amber-300 ml-2">⚠ {subsCancelaPendiente.length} cancela{subsCancelaPendiente.length === 1 ? '' : 'n'} al final del periodo</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desglose por producto */}
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Productos Marsof Technology</h2>
      <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="text-left px-5 py-3">Producto</th>
              <th className="text-right px-5 py-3">Este mes</th>
              <th className="text-right px-5 py-3">Este año</th>
              <th className="text-right px-5 py-3">MRR</th>
              <th className="text-right px-5 py-3">Suscriptores</th>
              <th className="text-left px-5 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02]">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💼</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">Saldea</p>
                    <p className="text-xs text-zinc-500">Cobro automático de facturas con IA</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-right text-zinc-100 font-semibold">{formatEuros(esteMes.brutoCentimos)}</td>
              <td className="px-5 py-4 text-right text-zinc-300">{formatEuros(esteAno.brutoCentimos)}</td>
              <td className="px-5 py-4 text-right text-sky-300 font-semibold">{formatEuros(mrrCentimos)}</td>
              <td className="px-5 py-4 text-right text-zinc-300">{subsActivas}</td>
              <td className="px-5 py-4">
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  🟢 Activa
                </span>
              </td>
            </tr>
            <tr className="bg-zinc-900/20">
              <td colSpan={6} className="px-5 py-3 text-xs text-zinc-600 italic text-center">
                🧪 Aquí aparecerá cada nueva app que lances — una fila por producto
              </td>
            </tr>
          </tbody>
        </table>
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

      {/* Contador de visitas web */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Visitas al sitio web</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <KPI label="Hoy" valor={String(visitas.hoy)} sub="visitas únicas de página" />
          <KPI label="Últimos 7 días" valor={String(visitas.semana)} sub="visitas únicas de página" />
          <KPI label="Últimos 30 días" valor={String(visitas.mes)} sub="visitas únicas de página" />
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 flex items-baseline justify-between">
            <h3 className="text-sm font-semibold text-zinc-100">🌐 Páginas más visitadas</h3>
            <span className="text-[10px] text-zinc-600">Últimos 30 días</span>
          </div>
          {visitas.topRutas.length === 0 ? (
            <div className="px-5 py-6 text-center text-zinc-600 text-xs">
              Todavía no hay visitas registradas. El contador empieza a funcionar<br />
              en cuanto la tabla <code className="text-zinc-500">visitas_web</code> esté creada en Supabase.
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {visitas.topRutas.map(({ ruta, visitas: n }, i) => {
                const maxVisitas = visitas.topRutas[0]?.visitas ?? 1
                const pct = Math.max(4, Math.round((n / maxVisitas) * 100))
                return (
                  <li key={ruta} className="flex items-center gap-4 px-5 py-3">
                    <span className="text-[10px] text-zinc-600 w-4 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-200 font-mono truncate">{ruta}</p>
                      <div className="mt-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-zinc-300 shrink-0">{n}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
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
      <div className={`h-full ${color} transition-all`} style={{ width: `${Math.max(2, pct)}%` }} />
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

