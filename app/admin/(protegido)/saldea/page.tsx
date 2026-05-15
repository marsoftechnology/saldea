import { createServiceRoleClient } from '@/lib/supabase-service'
import Link from 'next/link'

function fechaCorta(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-ES')
}

function formatearEuros(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

export default async function AdminSaldeaPage() {
  const supabase = createServiceRoleClient()

  // Últimos 30 días para detectar actividad reciente
  const hace30 = new Date()
  hace30.setDate(hace30.getDate() - 30)
  const hace30ISO = hace30.toISOString()

  const [
    { count: usuarios30d },
    { count: facturas30d },
    { count: invitacionesPend },
    pagos30d,
    pagosTotalRes,
    ultimosLogs,
    ultimasFacturasRes,
  ] = await Promise.all([
    // No podemos contar users por created_at fácilmente sin listUsers; aproximamos vía orgs
    supabase.from('organizations').select('id', { count: 'exact', head: true }).gte('created_at', hace30ISO),
    supabase.from('facturas').select('id', { count: 'exact', head: true }).gte('created_at', hace30ISO),
    supabase.from('org_invites').select('id', { count: 'exact', head: true }).is('accepted_at', null).gt('expires_at', new Date().toISOString()),
    supabase.from('pagos').select('importe').gte('created_at', hace30ISO),
    supabase.from('pagos').select('importe, metodo'),
    supabase.from('logs_email').select('id, asunto, enviado_at, factura_id').order('enviado_at', { ascending: false }).limit(10),
    supabase.from('facturas').select('id, numero, importe, estado, created_at, cliente:clientes(nombre)').order('created_at', { ascending: false }).limit(10),
  ])

  const cobrado30 = (pagos30d.data ?? []).reduce((s: number, p: { importe: number }) => s + Number(p.importe), 0)
  const cobradoTotal = (pagosTotalRes.data ?? []).reduce((s: number, p: { importe: number }) => s + Number(p.importe), 0)

  // Desglose por método de pago
  const metodos = new Map<string, number>()
  for (const p of pagosTotalRes.data ?? []) {
    const m = (p.metodo as string | null) ?? 'otro'
    metodos.set(m, (metodos.get(m) ?? 0) + Number(p.importe))
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Resumen general</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">💼 Saldea</h1>
        <p className="text-zinc-400 text-sm mt-1">Métricas detalladas y actividad reciente</p>
      </div>

      {/* KPIs últimos 30 días */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Últimos 30 días</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="Orgs nuevas" valor={usuarios30d ?? 0} />
          <Card label="Facturas creadas" valor={facturas30d ?? 0} />
          <Card label="Volumen cobrado" valor={formatearEuros(cobrado30)} />
          <Card label="Invitaciones pendientes" valor={invitacionesPend ?? 0} />
        </div>
      </div>

      {/* Sub-páginas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <SubLink href="/admin/saldea/usuarios" icono="👥" label="Ver usuarios" />
        <SubLink href="/admin/saldea/organizaciones" icono="🏛️" label="Ver organizaciones" />
        <SubLink href="/admin/saldea/facturas" icono="📄" label="Ver facturas" />
        <SubLink href="/admin/saldea/ingresos" icono="💰" label="Ver ingresos detallados" />
      </div>

      {/* Desglose por método de pago */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-zinc-100 mb-3">💰 Cobrado por método</h3>
          {cobradoTotal === 0 ? (
            <p className="text-xs text-zinc-500">Aún no hay pagos registrados.</p>
          ) : (
            <div className="space-y-2">
              {Array.from(metodos.entries()).sort((a, b) => b[1] - a[1]).map(([m, total]) => {
                const pct = (total / cobradoTotal) * 100
                return (
                  <div key={m}>
                    <div className="flex items-baseline justify-between text-xs mb-1">
                      <span className="text-zinc-300 capitalize">{m}</span>
                      <span className="text-zinc-500">{formatearEuros(total)} · {pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
              <p className="text-[10px] text-zinc-600 pt-2 border-t border-white/5 mt-3">
                Total histórico: <span className="text-zinc-300 font-semibold">{formatearEuros(cobradoTotal)}</span>
              </p>
            </div>
          )}
        </div>

        {/* Últimas facturas creadas */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-zinc-100 mb-3">📄 Últimas facturas creadas</h3>
          <div className="space-y-1.5">
            {(ultimasFacturasRes.data ?? []).map(f => {
              const c = f.cliente as unknown as { nombre: string } | null
              return (
                <div key={f.id} className="flex items-center justify-between text-xs">
                  <div className="min-w-0">
                    <p className="text-zinc-200 truncate">{f.numero} · {c?.nombre ?? '—'}</p>
                    <p className="text-zinc-600">{fechaCorta(f.created_at)}</p>
                  </div>
                  <span className="text-zinc-400">{formatearEuros(Number(f.importe))}</span>
                </div>
              )
            })}
            {(ultimasFacturasRes.data ?? []).length === 0 && (
              <p className="text-xs text-zinc-500">Sin facturas aún.</p>
            )}
          </div>
        </div>
      </div>

      {/* Últimos emails enviados */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-zinc-100 mb-3">📧 Últimos emails enviados (todas las orgs)</h3>
        <div className="space-y-1.5">
          {(ultimosLogs.data ?? []).map(l => (
            <div key={l.id} className="flex items-baseline justify-between text-xs">
              <p className="text-zinc-300 truncate flex-1 pr-3">{l.asunto}</p>
              <span className="text-zinc-500 shrink-0">{fechaCorta(l.enviado_at)}</span>
            </div>
          ))}
          {(ultimosLogs.data ?? []).length === 0 && (
            <p className="text-xs text-zinc-500">Sin emails enviados aún.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Card({ label, valor }: { label: string; valor: number | string }) {
  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-zinc-100">{valor}</p>
    </div>
  )
}

function SubLink({ href, icono, label }: { href: string; icono: string; label: string }) {
  return (
    <Link
      href={href}
      className="bg-zinc-900/40 border border-white/10 rounded-xl p-4 hover:border-sky-500/40 transition-colors flex items-center gap-3"
    >
      <span className="text-2xl">{icono}</span>
      <span className="text-sm text-zinc-200">{label}</span>
    </Link>
  )
}
