import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: cliente } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!cliente) notFound()

  const { data: facturas } = await supabase
    .from('facturas')
    .select('*')
    .eq('cliente_id', id)
    .eq('user_id', user.id)
    .order('fecha_vencimiento', { ascending: false })

  const totalCobrado = facturas?.filter(f => f.estado === 'cobrada').reduce((s, f) => s + Number(f.importe), 0) ?? 0
  const totalPendiente = facturas?.filter(f => f.estado !== 'cobrada' && f.estado !== 'cancelada').reduce((s, f) => s + Number(f.importe), 0) ?? 0

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/clientes" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">
          ← Volver a clientes
        </Link>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center font-semibold text-xl">
              {cliente.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">{cliente.nombre}</h1>
              {cliente.empresa && <p className="text-zinc-400 text-sm mt-1">{cliente.empresa}</p>}
            </div>
          </div>
          <Link href={`/clientes/${cliente.id}/editar`} className="text-sm text-zinc-400 hover:text-zinc-100 border border-white/10 hover:border-gray-300 px-3 py-1.5 rounded-lg">
            ✏️ Editar
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
        <h2 className="font-semibold text-zinc-100 mb-4">Datos de contacto</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Email</p>
            <p className="text-zinc-100 text-sm">{cliente.email}</p>
          </div>
          {cliente.telefono && (
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Teléfono</p>
              <p className="text-zinc-100 text-sm">{cliente.telefono}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Cliente desde</p>
            <p className="text-zinc-100 text-sm">{formatearFecha(cliente.created_at)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Total cobrado</p>
          <p className="text-2xl font-bold text-emerald-400">{formatearEuros(totalCobrado)}</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Pendiente de cobro</p>
          <p className="text-2xl font-bold text-zinc-100">{formatearEuros(totalPendiente)}</p>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-semibold text-zinc-100">Facturas ({facturas?.length ?? 0})</h2>
          <Link href="/facturas/nueva" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
            + Nueva factura
          </Link>
        </div>
        {facturas && facturas.length > 0 ? (
          <div className="divide-y divide-white/5">
            {facturas.map(f => (
              <Link key={f.id} href={`/facturas/${f.id}`} className="flex items-center justify-between p-4 hover:bg-zinc-900/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-zinc-100">Factura {f.numero}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Vence {formatearFecha(f.fecha_vencimiento)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorEstado(f.estado)}`}>
                    {etiquetaEstado(f.estado)}
                  </span>
                  <p className="text-sm font-semibold text-zinc-100 w-24 text-right">{formatearEuros(f.importe)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-500 text-sm">Este cliente aún no tiene facturas</p>
          </div>
        )}
      </div>
    </div>
  )
}
