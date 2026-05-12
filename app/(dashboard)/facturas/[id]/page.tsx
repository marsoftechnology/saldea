import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado, diasVencida } from '@/lib/utils'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import MarcarCobradaButton from './MarcarCobradaButton'
import EnviarRecordatorioButton from './EnviarRecordatorioButton'

export default async function FacturaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: factura } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!factura) notFound()

  const { data: recordatorios } = await supabase
    .from('recordatorios')
    .select('*')
    .eq('factura_id', id)
    .order('dias_offset')

  const { data: logs } = await supabase
    .from('logs_email')
    .select('*')
    .eq('factura_id', id)
    .order('enviado_at', { ascending: false })

  const dias = diasVencida(factura.fecha_vencimiento)
  const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/facturas" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
          ← Volver a facturas
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Factura {factura.numero}</h1>
            <p className="text-gray-500 text-sm mt-1">{cliente?.nombre}{cliente?.empresa ? ` — ${cliente.empresa}` : ''}</p>
          </div>
          <span className={`text-sm font-medium px-3 py-1.5 rounded-full border ${colorEstado(factura.estado)}`}>
            {etiquetaEstado(factura.estado)}
          </span>
        </div>
      </div>

      {/* Datos principales */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Importe</p>
            <p className="text-3xl font-bold text-gray-900">{formatearEuros(factura.importe)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Vencimiento</p>
            <p className="text-lg font-semibold text-gray-900">{formatearFecha(factura.fecha_vencimiento)}</p>
            {factura.estado !== 'cobrada' && factura.estado !== 'cancelada' && (
              <p className={`text-sm mt-0.5 ${dias > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                {dias > 0 ? `Vencida hace ${dias} días` : `Vence en ${Math.abs(dias)} días`}
              </p>
            )}
          </div>
          {factura.descripcion && (
            <div className="col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Descripción</p>
              <p className="text-gray-700 text-sm">{factura.descripcion}</p>
            </div>
          )}
        </div>

        {factura.estado !== 'cobrada' && factura.estado !== 'cancelada' && (
          <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
            <MarcarCobradaButton facturaId={factura.id} />
            <EnviarRecordatorioButton facturaId={factura.id} clienteEmail={cliente?.email} diasVencida={dias} />
          </div>
        )}
      </div>

      {/* Recordatorios automáticos */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Recordatorios automáticos</h2>
        <div className="space-y-3">
          {recordatorios?.map(r => (
            <div key={r.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${r.enviado ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                <span className="text-sm text-gray-700">Día {r.dias_offset} — Tono {r.tono}</span>
              </div>
              <span className="text-xs text-gray-400">
                {r.enviado ? `Enviado ${formatearFecha(r.enviado_at)}` : 'Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de emails */}
      {logs && logs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Historial de emails enviados</h2>
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{log.asunto}</p>
                  <span className="text-xs text-gray-400">{formatearFecha(log.enviado_at)}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{log.cuerpo}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
