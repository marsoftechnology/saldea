import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function FacturasPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: facturas } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(nombre, empresa)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facturas</h1>
          <p className="text-gray-500 text-sm mt-1">{facturas?.length ?? 0} facturas en total</p>
        </div>
        <Link href="/facturas/nueva" className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          + Nueva factura
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {facturas && facturas.length > 0 ? (
          <>
            <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-wide">
              <span className="col-span-2">Cliente</span>
              <span>Importe</span>
              <span>Vencimiento</span>
              <span>Estado</span>
            </div>
            <div className="divide-y divide-gray-50">
              {facturas.map(factura => (
                <Link key={factura.id} href={`/facturas/${factura.id}`} className="grid grid-cols-5 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-900">{(factura.cliente as { nombre: string })?.nombre}</p>
                    <p className="text-xs text-gray-400">Factura {factura.numero}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatearEuros(factura.importe)}</span>
                  <span className="text-sm text-gray-500">{formatearFecha(factura.fecha_vencimiento)}</span>
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
            <p className="text-gray-900 font-medium mb-2">Aún no tienes facturas</p>
            <p className="text-gray-400 text-sm mb-6">Crea tu primera factura y la IA se encargará de cobrarla</p>
            <Link href="/facturas/nueva" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              Crear primera factura
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
