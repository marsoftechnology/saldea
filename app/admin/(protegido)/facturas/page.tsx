import { createServiceRoleClient } from '@/lib/supabase-service'
import Link from 'next/link'
import { colorEstado, etiquetaEstado, formatearEuros, formatearFecha } from '@/lib/utils'

export default async function AdminFacturasPage() {
  const supabase = createServiceRoleClient()

  const { data: facturas } = await supabase
    .from('facturas')
    .select('id, numero, importe, estado, fecha_vencimiento, created_at, org_id, cliente:clientes(nombre, email), org:organizations(name)')
    .order('created_at', { ascending: false })
    .limit(500)

  const facturaIds = (facturas ?? []).map(f => f.id)
  const { data: pagos } = facturaIds.length > 0
    ? await supabase.from('pagos').select('factura_id, importe').in('factura_id', facturaIds)
    : { data: [] }
  const pagadoPorFactura = new Map<string, number>()
  for (const p of pagos ?? []) {
    pagadoPorFactura.set(p.factura_id, (pagadoPorFactura.get(p.factura_id) ?? 0) + Number(p.importe))
  }

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300">← Dashboard</Link>
        <h1 className="text-2xl font-bold text-zinc-100 mt-2">📄 Facturas ({facturas?.length ?? 0})</h1>
        <p className="text-zinc-400 text-sm mt-1">Últimas 500 facturas de todas las organizaciones · todos los productos</p>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 border-b border-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="text-left px-4 py-3">Nº</th>
                <th className="text-left px-4 py-3">Org</th>
                <th className="text-left px-4 py-3">Cliente</th>
                <th className="text-right px-4 py-3">Importe</th>
                <th className="text-right px-4 py-3">Pagado</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-left px-4 py-3">Vencimiento</th>
                <th className="text-left px-4 py-3">Creada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(facturas ?? []).map(f => {
                const c = f.cliente as unknown as { nombre: string; email: string } | null
                const o = f.org as unknown as { name: string } | null
                const pagado = pagadoPorFactura.get(f.id) ?? 0
                return (
                  <tr key={f.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-200 font-mono text-xs">{f.numero}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{o?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-zinc-300 text-xs">
                      <p>{c?.nombre ?? '—'}</p>
                      <p className="text-zinc-600">{c?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-100 text-right">{formatearEuros(Number(f.importe))}</td>
                    <td className="px-4 py-3 text-emerald-300 text-right text-xs">
                      {pagado > 0 ? formatearEuros(pagado) : <span className="text-zinc-600">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${colorEstado(f.estado)}`}>
                        {etiquetaEstado(f.estado)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">{formatearFecha(f.fecha_vencimiento)}</td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">{formatearFecha(f.created_at)}</td>
                  </tr>
                )
              })}
              {(facturas ?? []).length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-zinc-500">No hay facturas aún.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
