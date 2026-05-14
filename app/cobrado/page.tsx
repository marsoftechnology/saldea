import Link from 'next/link'

export default async function CobradoPage({
  searchParams,
}: {
  searchParams: Promise<{ num?: string; importe?: string; ya?: string; error?: string }>
}) {
  const { num, importe, ya, error } = await searchParams

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900/40 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✗</div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-3">Enlace no válido</h1>
          <p className="text-zinc-400">Este enlace de pago no es válido o ha expirado.</p>
        </div>
      </div>
    )
  }

  if (ya) {
    return (
      <div className="min-h-screen bg-zinc-900/40 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-3">Factura ya registrada</h1>
          <p className="text-zinc-400">La factura {num} ya estaba marcada como cobrada. ¡Gracias!</p>
        </div>
      </div>
    )
  }

  const importeFormateado = importe
    ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(parseFloat(importe))
    : ''

  return (
    <div className="min-h-screen bg-zinc-900/40 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">¡Pago confirmado!</h1>
        <p className="text-zinc-400 mb-2">
          Hemos registrado el pago de la factura <strong>{num}</strong>
          {importeFormateado ? ` por ${importeFormateado}` : ''}.
        </p>
        <p className="text-zinc-500 text-sm mb-8">No recibirás más recordatorios por esta factura.</p>
        <div className="bg-emerald-500/100/10 border border-emerald-500/20 rounded-xl p-5 text-sm text-emerald-300">
          Gestión de cobros automatizada por <strong>Saldea</strong> · <a href="https://marsof.es" style={{ color: '#059669' }}>marsof.es</a>
        </div>
      </div>
    </div>
  )
}
