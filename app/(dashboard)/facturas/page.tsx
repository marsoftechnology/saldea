import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { getActiveOrg } from '@/lib/auth-org'

export default async function FacturasPage() {
  const org = await getActiveOrg()
  if (!org) redirect('/login')
  const supabase = await createServerSupabaseClient()

  const { data: facturas } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(nombre, empresa)')
    .eq('org_id', org.org_id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Facturas</h1>
          <p className="text-zinc-500 text-sm mt-1">{facturas?.length ?? 0} facturas en total</p>
        </div>
        <div className="flex items-center gap-2">
          {(facturas?.length ?? 0) > 0 && (
            <a
              href="/api/facturas/exportar"
              download
              className="text-zinc-300 border border-white/10 hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5"
              title="Descargar todas las facturas en CSV"
            >
              ⬇ Exportar CSV
            </a>
          )}
          <Link href="/facturas/nueva" className="bg-sky-500 text-zinc-900 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20">
            + Nueva factura
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
        {facturas && facturas.length > 0 ? (
          <>
            <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              <span className="col-span-2">Cliente</span>
              <span>Importe</span>
              <span>Vencimiento</span>
              <span>Estado</span>
            </div>
            <div className="divide-y divide-white/5">
              {facturas.map(factura => (
                <Link key={factura.id} href={`/facturas/${factura.id}`} className="grid grid-cols-5 gap-4 px-4 py-4 hover:bg-white/[0.03] transition-colors items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-zinc-100">{(factura.cliente as { nombre: string })?.nombre}</p>
                    <p className="text-xs text-zinc-500">Factura {factura.numero}</p>
                  </div>
                  <span className="text-sm font-semibold text-zinc-100">{formatearEuros(factura.importe)}</span>
                  <span className="text-sm text-zinc-400">{formatearFecha(factura.fecha_vencimiento)}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border w-fit ${colorEstado(factura.estado)}`}>
                    {etiquetaEstado(factura.estado)}
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <p className="text-4xl mb-4">📄</p>
            <p className="text-zinc-100 font-medium mb-2">Aún no tienes facturas</p>
            <p className="text-zinc-500 text-sm mb-6">Crea tu primera factura y la IA se encargará de cobrarla</p>
            <Link href="/facturas/nueva" className="inline-block bg-sky-500 text-zinc-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20">
              Crear primera factura
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
