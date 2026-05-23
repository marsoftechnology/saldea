import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatearEuros, formatearFecha, colorEstado, etiquetaEstado, diasVencida } from '@/lib/utils'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import EnviarRecordatorioButton from './EnviarRecordatorioButton'
import NotasInternasEditor from './NotasInternasEditor'
import LinkPagoEditor from './LinkPagoEditor'
import PdfPropioUploader from './PdfPropioUploader'
import PagosSection from './PagosSection'
import WhatsAppRecordatorioButton from './WhatsAppRecordatorioButton'
import WhatsAppEnviarFacturaButton from './WhatsAppEnviarFacturaButton'
import { getActiveOrg } from '@/lib/auth-org'

export default async function FacturaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const org = await getActiveOrg()
  if (!org) redirect('/login')
  const supabase = await createServerSupabaseClient()

  const { data: factura } = await supabase
    .from('facturas')
    .select('*, cliente:clientes(*)')
    .eq('id', id)
    .eq('org_id', org.org_id)
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

  const { data: pagos } = await supabase
    .from('pagos')
    .select('*')
    .eq('factura_id', id)
    .order('fecha', { ascending: false })

  const dias = diasVencida(factura.fecha_vencimiento)
  const cliente = factura.cliente as { nombre: string; email: string; empresa: string | null; telefono: string | null; whatsapp_opt_in_at: string | null }

  // Empresa emisora para el mensaje de WhatsApp: nombre de la org
  const { data: orgData } = await supabase
    .from('organizations')
    .select('name, addon_whatsapp_active')
    .eq('id', org.org_id)
    .maybeSingle()
  const empresaEmisor = orgData?.name || 'tu empresa'
  const addonWhatsapp = !!orgData?.addon_whatsapp_active
  const totalPagado = (pagos ?? []).reduce((s, p) => s + Number(p.importe), 0)
  const pendienteFactura = Math.max(0, Number(factura.importe) - totalPagado)

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/facturas" className="text-sm text-zinc-400 hover:text-zinc-100 mb-4 inline-block">
          ← Volver a facturas
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Factura {factura.numero}</h1>
            <p className="text-zinc-400 text-sm mt-1">{cliente?.nombre}{cliente?.empresa ? ` — ${cliente.empresa}` : ''}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full border ${colorEstado(factura.estado)}`}>
              {etiquetaEstado(factura.estado)}
            </span>
            {factura.estado === 'cobrada' && factura.fecha_cobro && (
              <span className="text-xs text-zinc-500">
                Cobrada el {formatearFecha(factura.fecha_cobro)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Datos principales */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Importe</p>
            <p className="text-3xl font-bold text-zinc-100">{formatearEuros(factura.importe)}</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Vencimiento</p>
            <p className="text-lg font-semibold text-zinc-100">{formatearFecha(factura.fecha_vencimiento)}</p>
            {factura.estado !== 'cobrada' && factura.estado !== 'cancelada' && (
              <p className={`text-sm mt-0.5 ${dias > 0 ? 'text-red-500' : 'text-sky-400'}`}>
                {dias > 0 ? `Vencida hace ${dias} días` : `Vence en ${Math.abs(dias)} días`}
              </p>
            )}
          </div>
          {factura.descripcion && (
            <div className="col-span-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Descripción</p>
              <p className="text-zinc-300 text-sm">{factura.descripcion}</p>
            </div>
          )}
        </div>

        {factura.estado !== 'cobrada' && factura.estado !== 'cancelada' && (
          <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
            <EnviarRecordatorioButton facturaId={factura.id} clienteEmail={cliente?.email} diasVencida={dias} />
          </div>
        )}

        <WhatsAppEnviarFacturaButton
          facturaId={factura.id}
          clienteConOptin={!!cliente?.whatsapp_opt_in_at && !!cliente?.telefono}
          addonActivo={addonWhatsapp}
        />
      </div>

      {/* Pagos recibidos (parciales o completos) */}
      <PagosSection
        facturaId={factura.id}
        importeFactura={Number(factura.importe)}
        pagosIniciales={pagos ?? []}
        facturaCancelada={factura.estado === 'cancelada'}
      />

      {/* WhatsApp recordatorio (solo si la factura está pendiente / vencida / parcial) */}
      {factura.estado !== 'cobrada' && factura.estado !== 'cancelada' && (
        <WhatsAppRecordatorioButton
          facturaNumero={factura.numero}
          facturaImporte={Number(factura.importe)}
          facturaPendiente={pendienteFactura}
          fechaVencimiento={factura.fecha_vencimiento}
          diasVencida={dias}
          linkPago={factura.link_pago ?? null}
          clienteNombre={cliente.nombre}
          clienteTelefono={cliente.telefono}
          empresaEmisor={empresaEmisor}
        />
      )}

      {/* PDF de la factura */}
      <PdfPropioUploader
        facturaId={factura.id}
        numeroFactura={factura.numero}
        pdfPathInicial={factura.pdf_propio_path ?? null}
      />

      {/* Link de pago */}
      <LinkPagoEditor facturaId={factura.id} linkInicial={factura.link_pago ?? null} />

      {/* Notas internas */}
      <NotasInternasEditor facturaId={factura.id} notasIniciales={factura.notas_internas ?? null} />

      {/* Recordatorios automáticos */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6 mb-4">
        <h2 className="font-semibold text-zinc-100 mb-4">Recordatorios automáticos</h2>
        <div className="space-y-3">
          {recordatorios?.map(r => (
            <div key={r.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${r.enviado ? 'bg-sky-500/100' : 'bg-gray-200'}`} />
                <span className="text-sm text-zinc-300">Día {r.dias_offset} — Tono {r.tono}</span>
              </div>
              <span className="text-xs text-zinc-500">
                {r.enviado ? `Enviado ${formatearFecha(r.enviado_at)}` : 'Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de emails */}
      {logs && logs.length > 0 && (
        <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-6">
          <h2 className="font-semibold text-zinc-100 mb-4">Historial de emails enviados</h2>
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log.id} className="border border-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-zinc-100">{log.asunto}</p>
                  <span className="text-xs text-zinc-500">{formatearFecha(log.enviado_at)}</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{log.cuerpo}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
