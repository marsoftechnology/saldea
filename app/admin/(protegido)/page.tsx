import { createServiceRoleClient } from '@/lib/supabase-service'
import Link from 'next/link'

function formatearEuros(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export default async function AdminInicioPage() {
  const supabase = createServiceRoleClient()

  // Datos agregados Saldea (la primera app del grupo)
  const [{ count: totalUsuarios }, { count: totalOrgs }, { count: totalFacturas }, { count: totalClientes }, pagosRes, suscripciones] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: 1 }).then(r => ({ count: (r.data as { total?: number; users: unknown[] }).total ?? r.data.users.length })),
    supabase.from('organizations').select('id', { count: 'exact', head: true }),
    supabase.from('facturas').select('id', { count: 'exact', head: true }),
    supabase.from('clientes').select('id', { count: 'exact', head: true }),
    supabase.from('pagos').select('importe'),
    supabase.from('configuraciones_usuario').select('plan').eq('plan', 'pro'),
  ])

  const totalCobrado = (pagosRes.data ?? []).reduce((s: number, p: { importe: number }) => s + Number(p.importe), 0)
  const proCount = suscripciones.data?.length ?? 0
  const mrrEstimado = proCount * 49 // €/mes plan Pro mensual

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-2">Panel administrador</p>
        <h1 className="text-2xl font-bold text-zinc-100">Resumen general · Marsof Technology</h1>
        <p className="text-zinc-400 text-sm mt-1">Vista global de todas las apps. Por ahora solo Saldea está en producción.</p>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden mb-8">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">App #1</p>
            <h2 className="text-lg font-bold text-zinc-100">💼 Saldea</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Cobro automático de facturas con IA · marsof.es</p>
          </div>
          <Link
            href="/admin/saldea"
            className="text-sm text-sky-400 hover:text-sky-300 border border-sky-500/30 hover:bg-sky-500/10 px-3 py-1.5 rounded-lg"
          >
            Detalle →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          <Metric label="Usuarios" valor={totalUsuarios ?? 0} />
          <Metric label="Organizaciones" valor={totalOrgs ?? 0} />
          <Metric label="Suscripciones Pro" valor={proCount} highlight={proCount > 0} />
          <Metric label="MRR estimado" valor={formatearEuros(mrrEstimado)} sub="49€/mes × Pro mensual" />
          <Metric label="Facturas creadas" valor={totalFacturas ?? 0} />
          <Metric label="Clientes registrados" valor={totalClientes ?? 0} />
          <Metric label="Volumen cobrado" valor={formatearEuros(totalCobrado)} sub="suma de pagos" />
          <Metric label="Ticket medio" valor={formatearEuros((totalFacturas ?? 0) > 0 ? totalCobrado / (totalFacturas ?? 1) : 0)} />
        </div>
      </div>

      <div className="bg-zinc-900/20 border border-dashed border-white/10 rounded-2xl p-8 text-center">
        <p className="text-zinc-500 text-sm">🧪 Cuando lances más apps de Marsof aparecerán aquí</p>
        <p className="text-zinc-600 text-xs mt-2">El panel admin está preparado para múltiples productos</p>
      </div>
    </div>
  )
}

function Metric({ label, valor, sub, highlight }: { label: string; valor: number | string; sub?: string; highlight?: boolean }) {
  return (
    <div className="bg-zinc-900/40 p-4">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-sky-300' : 'text-zinc-100'}`}>{valor}</p>
      {sub && <p className="text-[10px] text-zinc-600 mt-0.5">{sub}</p>}
    </div>
  )
}
