import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: facturas }, { data: clientes }] = await Promise.all([
    supabase.from('facturas').select('*, cliente:clientes(nombre, empresa)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('clientes').select('id').eq('user_id', user.id),
  ])

  const totalPendiente = facturas?.filter(f => f.estado === 'pendiente' || f.estado === 'vencida').reduce((acc, f) => acc + f.importe, 0) ?? 0
  const totalCobrado = facturas?.filter(f => f.estado === 'cobrada').reduce((acc, f) => acc + f.importe, 0) ?? 0
  const facturasVencidas = facturas?.filter(f => f.estado === 'vencida').length ?? 0

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de control</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen de tus cobros pendientes</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Por cobrar</p>
          <p className="text-2xl font-bold text-gray-900">{formatearEuros(totalPendiente)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Cobrado este mes</p>
          <p className="text-2xl font-bold text-emerald-600">{formatearEuros(totalCobrado)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Facturas vencidas</p>
          <p className="text-2xl font-bold text-red-500">{facturasVencidas}</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="flex gap-3 mb-8">
        <Link href="/facturas/nueva" className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          + Nueva factura
        </Link>
        <Link href="/clientes/nuevo" className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          + Nuevo cliente
        </Link>
      </div>

      {/* Últimas facturas */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Últimas facturas</h2>
          <Link href="/facturas" className="text-sm text-emerald-600 hover:underline">Ver todas</Link>
        </div>

        {facturas && facturas.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {facturas.map(factura => (
              <Link key={factura.id} href={`/facturas/${factura.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{(factura.cliente as { nombre: string })?.nombre}</p>
                  <p className="text-xs text-gray-400">Factura {factura.numero} · Vence {formatearFecha(factura.fecha_vencimiento)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">{formatearEuros(factura.importe)}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${colorEstado(factura.estado)}`}>
                    {etiquetaEstado(factura.estado)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-sm mb-4">Aún no tienes facturas</p>
            <Link href="/facturas/nueva" className="text-emerald-600 text-sm font-medium hover:underline">
              Crear tu primera factura →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
