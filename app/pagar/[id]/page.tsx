import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'

function formatEuros(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}
function formatFecha(s: string) {
  return new Date(s + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function PortalClientePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // UUID básico — si no tiene pinta de UUID, 404 inmediato
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: factura } = await supabase
    .from('facturas')
    .select('id, numero, importe, fecha_vencimiento, descripcion, estado, link_pago, org_id')
    .eq('id', id)
    .maybeSingle()

  if (!factura) notFound()

  // Nombre del emisor (empresa que emite la factura)
  const { data: org } = await supabase
    .from('organizations')
    .select('name')
    .eq('id', factura.org_id)
    .maybeSingle()

  const emisor = org?.name || 'Tu proveedor'

  // Calcular pagos ya realizados
  const { data: pagos } = await supabase
    .from('pagos')
    .select('importe')
    .eq('factura_id', id)
  const importePagado = (pagos ?? []).reduce((s, p) => s + Number(p.importe), 0)
  const importePendiente = Math.max(0, Number(factura.importe) - importePagado)

  const yaEstaCobrada = factura.estado === 'cobrada' || importePendiente <= 0
  const estaCancelada = factura.estado === 'cancelada'

  const hoy = new Date()
  const vencimiento = new Date(factura.fecha_vencimiento + 'T00:00:00')
  const diasRestantes = Math.ceil((vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
  const estaVencida = diasRestantes < 0

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header emisor */}
        <div className="text-center mb-6">
          <p className="text-zinc-500 text-sm">Factura de</p>
          <h1 className="text-xl font-bold text-zinc-100 mt-1">{emisor}</h1>
        </div>

        {/* Tarjeta principal */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">

          {/* Importe */}
          <div className={`px-8 py-8 text-center ${yaEstaCobrada ? 'bg-sky-500/10' : estaVencida ? 'bg-red-500/10' : 'bg-zinc-900/40'}`}>
            {yaEstaCobrada ? (
              <>
                <div className="w-14 h-14 bg-sky-500/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">✓</div>
                <p className="text-sky-400 font-semibold text-lg">Factura pagada</p>
                <p className="text-zinc-400 text-sm mt-1">No tienes ningún importe pendiente. ¡Gracias!</p>
              </>
            ) : estaCancelada ? (
              <>
                <p className="text-zinc-400 font-medium">Factura cancelada</p>
              </>
            ) : (
              <>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Importe pendiente</p>
                <p className={`text-4xl font-bold ${estaVencida ? 'text-red-400' : 'text-white'}`}>
                  {formatEuros(importePendiente)}
                </p>
                {importePagado > 0 && (
                  <p className="text-zinc-500 text-sm mt-1">Ya pagado: {formatEuros(importePagado)}</p>
                )}
                {estaVencida ? (
                  <p className="text-red-400 text-sm mt-2 font-medium">
                    Vencida hace {Math.abs(diasRestantes)} {Math.abs(diasRestantes) === 1 ? 'día' : 'días'}
                  </p>
                ) : (
                  <p className="text-zinc-400 text-sm mt-2">
                    Vence el {formatFecha(factura.fecha_vencimiento)}
                    {diasRestantes === 0 ? ' (hoy)' : diasRestantes === 1 ? ' (mañana)' : ` · en ${diasRestantes} días`}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Datos de la factura */}
          <div className="px-6 py-5 border-t border-white/5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Factura</span>
              <span className="text-zinc-200 font-medium">{factura.numero}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Importe total</span>
              <span className="text-zinc-200">{formatEuros(Number(factura.importe))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Vencimiento</span>
              <span className="text-zinc-200">{formatFecha(factura.fecha_vencimiento)}</span>
            </div>
            {factura.descripcion && (
              <div className="flex justify-between text-sm gap-4">
                <span className="text-zinc-500 shrink-0">Concepto</span>
                <span className="text-zinc-200 text-right">{factura.descripcion}</span>
              </div>
            )}
          </div>

          {/* Acciones */}
          {!yaEstaCobrada && !estaCancelada && (
            <div className="px-6 pb-6 space-y-3">
              {factura.link_pago && (
                <a
                  href={factura.link_pago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-sky-500 hover:bg-sky-400 text-zinc-900 font-bold text-center py-3.5 rounded-xl transition-colors shadow-lg shadow-sky-500/20"
                >
                  💳 Pagar ahora — {formatEuros(importePendiente)}
                </a>
              )}
              <a
                href={`/api/cobrado?id=${factura.id}`}
                className={`block w-full text-center py-3 rounded-xl text-sm font-medium transition-colors ${
                  factura.link_pago
                    ? 'border border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    : 'bg-sky-500 hover:bg-sky-400 text-zinc-900 font-bold shadow-lg shadow-sky-500/20'
                }`}
              >
                {factura.link_pago ? '✓ Ya realicé el pago por otro medio' : '✓ Ya he pagado esta factura'}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-6">
          Gestión de cobros por{' '}
          <Link href="https://marsof.es" className="text-zinc-500 hover:text-zinc-400">
            Saldea · marsof.es
          </Link>
        </p>
      </div>
    </div>
  )
}
