import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface FacturaPortal {
  id: string
  numero: string
  importe: number
  pendiente: number
  pagado: number
  estado: string
  fecha_vencimiento: string
  descripcion: string | null
  link_pago: string | null
}

interface PortalData {
  cliente: { nombre: string; empresa: string | null }
  org: { nombreEmpresa: string | null; logoUrl: string | null; colorPrimario: string; iban: string | null; titularCuenta: string | null }
  facturas: FacturaPortal[]
  totalPendiente: number
}

async function getPortalData(token: string): Promise<PortalData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'
  try {
    const res = await fetch(`${baseUrl}/api/portal/${token}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ token: string }> }
): Promise<Metadata> {
  const { token } = await params
  const data = await getPortalData(token)
  if (!data) return { title: 'Portal no encontrado' }
  return {
    title: `Tus facturas pendientes – ${data.org.nombreEmpresa ?? 'Saldea'}`,
    robots: { index: false },
  }
}

function formatEuros(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatFecha(s: string) {
  const d = new Date(s + 'T00:00:00')
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
}

function badgeEstado(estado: string) {
  switch (estado) {
    case 'vencida':
      return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 uppercase">Vencida</span>
    case 'parcialmente_cobrada':
      return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase">Parcial</span>
    default:
      return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 uppercase">Pendiente</span>
  }
}

export default async function PortalClientePage(
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const data = await getPortalData(token)
  if (!data) notFound()

  const { cliente, org, facturas, totalPendiente } = data
  const color = org.colorPrimario ?? '#0284c7'

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Cabecera */}
      <div className="border-b border-white/10 bg-zinc-900/60 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-4">
          {org.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={org.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg"
              style={{ backgroundColor: color }}>
              {(org.nombreEmpresa ?? 'S').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-zinc-100 text-sm">{org.nombreEmpresa ?? 'Tu proveedor'}</p>
            <p className="text-xs text-zinc-400">Portal de facturas</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Saludo */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-100">
            Hola, {cliente.nombre}
          </h1>
          {cliente.empresa && (
            <p className="text-zinc-400 text-sm mt-0.5">{cliente.empresa}</p>
          )}
        </div>

        {/* Resumen */}
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Total pendiente de pago</p>
            <p className="text-3xl font-bold" style={{ color }}>{formatEuros(totalPendiente)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Facturas pendientes</p>
            <p className="text-2xl font-semibold text-zinc-200">{facturas.length}</p>
          </div>
        </div>

        {/* Lista de facturas */}
        {facturas.length === 0 ? (
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-zinc-400">No tienes facturas pendientes. ¡Todo al día! 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {facturas.map(f => (
              <div key={f.id} className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-zinc-100 text-sm">Factura {f.numero}</span>
                        {badgeEstado(f.estado)}
                      </div>
                      {f.descripcion && (
                        <p className="text-xs text-zinc-400 mt-0.5 truncate max-w-xs">{f.descripcion}</p>
                      )}
                      <p className="text-xs text-zinc-500 mt-1">
                        Vencimiento: {formatFecha(f.fecha_vencimiento)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-zinc-100">{formatEuros(f.pendiente)}</p>
                      {f.pagado > 0 && (
                        <p className="text-xs text-zinc-500">de {formatEuros(f.importe)}</p>
                      )}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {f.link_pago && (
                      <a
                        href={f.link_pago}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-white text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                        style={{ backgroundColor: color }}
                      >
                        💳 Pagar con tarjeta
                      </a>
                    )}
                    <a
                      href={`/api/cobrado?id=${f.id}`}
                      className="flex-1 text-center text-zinc-300 text-sm font-medium px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                    >
                      ✓ Ya he pagado
                    </a>
                  </div>
                  {/* Datos para transferencia bancaria */}
                  {org.iban && (
                    <div className="mt-3 bg-zinc-800/60 border border-white/10 rounded-lg px-4 py-3">
                      <p className="text-[11px] text-zinc-500 uppercase tracking-wide mb-1.5">Transferencia bancaria</p>
                      <p className="font-mono text-sm text-zinc-200 tracking-wider">{org.iban}</p>
                      {org.titularCuenta && (
                        <p className="text-xs text-zinc-400 mt-1">Titular: {org.titularCuenta}</p>
                      )}
                      <p className="text-[11px] text-zinc-500 mt-1.5">Concepto: Factura {f.numero}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pie */}
        <p className="text-center text-xs text-zinc-600 mt-8">
          Portal gestionado por{' '}
          <a href="https://www.marsof.es" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 underline underline-offset-2">
            Saldea
          </a>
          {' '}· Si tienes dudas, contacta directamente con {org.nombreEmpresa ?? 'tu proveedor'}
        </p>
      </div>
    </div>
  )
}
