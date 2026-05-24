import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado } from '@/lib/utils'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import ClienteOverridesEditor from './ClienteOverridesEditor'
import WhatsAppButton from './WhatsAppButton'
import PortalClienteLink from './PortalClienteLink'
import { getActiveOrg } from '@/lib/auth-org'

export default async function ClienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const org = await getActiveOrg()
  if (!org) redirect('/login')
  const supabase = await createServerSupabaseClient()

  const { data: cliente } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .eq('org_id', org.org_id)
    .single()

  if (!cliente) notFound()

  const { data: facturas } = await supabase
    .from('facturas')
    .select('*')
    .eq('cliente_id', id)
    .eq('org_id', org.org_id)
    .order('fecha_vencimiento', { ascending: false })

  const facturaIds = (facturas ?? []).map(f => f.id)

  // Suma de pagos por factura para calcular pendiente real
  const { data: pagosCliente } = facturaIds.length > 0
    ? await supabase.from('pagos').select('factura_id, importe').in('factura_id', facturaIds)
    : { data: [] as Array<{ factura_id: string; importe: number }> }
  const pagosPorFactura = new Map<string, number>()
  for (const p of pagosCliente ?? []) {
    pagosPorFactura.set(p.factura_id, (pagosPorFactura.get(p.factura_id) ?? 0) + Number(p.importe))
  }

  const totalCobrado = Array.from(pagosPorFactura.values()).reduce((s, v) => s + v, 0)
  const totalPendiente = (facturas ?? [])
    .filter(f => f.estado !== 'cobrada' && f.estado !== 'cancelada')
    .reduce((s, f) => s + Math.max(0, Number(f.importe) - (pagosPorFactura.get(f.id) ?? 0)), 0)

  // Historial de comunicaciones con este cliente
  const { data: logsEmails } = facturaIds.length > 0
    ? await supabase
        .from('logs_email')
        .select('id, asunto, enviado_at, factura_id')
        .in('factura_id', facturaIds)
        .order('enviado_at', { ascending: false })
        .limit(20)
    : { data: [] }
  const facturaNumeroPorId = new Map((facturas ?? []).map(f => [f.id, f.numero]))

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/clientes" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">
          ← Volver a clientes
        </Link>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-sky-500/20 text-sky-300 rounded-full flex items-center justify-center font-semibold text-xl">
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
              <div className="flex items-center gap-2">
                <p className="text-zinc-100 text-sm">{cliente.telefono}</p>
                <WhatsAppButton telefono={cliente.telefono} nombreCliente={cliente.nombre} />
              </div>
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
          <p className="text-2xl font-bold text-sky-400">{formatearEuros(totalCobrado)}</p>
        </div>
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Pendiente de cobro</p>
          <p className="text-2xl font-bold text-zinc-100">{formatearEuros(totalPendiente)}</p>
        </div>
      </div>

      {/* Portal del cliente — enlace compartible */}
      {cliente.portal_token && (
        <PortalClienteLink
          token={cliente.portal_token}
          clienteNombre={cliente.nombre}
        />
      )}

      {/* Preferencias del cliente (overrides) */}
      <ClienteOverridesEditor cliente={cliente} />

      <div className="bg-zinc-900/40 border border-white/10 rounded-xl mb-4">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-semibold text-zinc-100">Facturas ({facturas?.length ?? 0})</h2>
          <Link href="/facturas/nueva" className="text-sm text-sky-400 hover:text-sky-300 font-medium">
            + Nueva factura
          </Link>
        </div>
        {facturas && facturas.length > 0 ? (
          <div className="divide-y divide-white/5">
            {facturas.map(f => {
              const pagado = pagosPorFactura.get(f.id) ?? 0
              const pendienteF = Math.max(0, Number(f.importe) - pagado)
              return (
                <Link key={f.id} href={`/facturas/${f.id}`} className="flex items-center justify-between p-4 hover:bg-zinc-900/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">Factura {f.numero}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Vence {formatearFecha(f.fecha_vencimiento)}
                      {f.estado === 'parcialmente_cobrada' && (
                        <> · Pagado {formatearEuros(pagado)} de {formatearEuros(Number(f.importe))}</>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorEstado(f.estado)}`}>
                      {etiquetaEstado(f.estado)}
                    </span>
                    <p className="text-sm font-semibold text-zinc-100 w-28 text-right">
                      {f.estado === 'parcialmente_cobrada' ? formatearEuros(pendienteF) : formatearEuros(Number(f.importe))}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-zinc-500 text-sm">Este cliente aún no tiene facturas</p>
          </div>
        )}
      </div>

      {/* Historial de comunicaciones */}
      {logsEmails && logsEmails.length > 0 && (
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl">
          <div className="p-6 border-b border-white/5">
            <h2 className="font-semibold text-zinc-100">📨 Historial de comunicaciones</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Últimos {logsEmails.length} emails enviados a este cliente</p>
          </div>
          <div className="divide-y divide-white/5">
            {logsEmails.map(log => (
              <Link
                key={log.id}
                href={`/facturas/${log.factura_id}`}
                className="block p-4 hover:bg-zinc-900/30 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm text-zinc-100 truncate flex-1">{log.asunto}</p>
                  <span className="text-xs text-zinc-500 shrink-0">{formatearFecha(log.enviado_at)}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Factura {facturaNumeroPorId.get(log.factura_id) ?? log.factura_id.slice(0, 8)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
