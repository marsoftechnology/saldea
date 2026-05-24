export default function BancoPage() {
  const features = [
    { icono: '🔍', titulo: 'Detección automática', desc: 'Cruza cada ingreso bancario con tus facturas pendientes en tiempo real' },
    { icono: '✅', titulo: 'Factura cobrada sola', desc: 'La factura pasa a «cobrada» sin que tengas que tocar nada' },
    { icono: '🔒', titulo: 'Solo lectura PSD2', desc: 'Acceso de lectura únicamente — nunca puede mover tu dinero' },
    { icono: '🏦', titulo: '+2.000 bancos', desc: 'CaixaBank, BBVA, Santander, Sabadell, ING y muchos más' },
  ]

  return (
    <div className="min-h-full flex items-center justify-center p-6 md:p-10">
      <div className="max-w-2xl w-full text-center">

        <div className="text-6xl mb-6">🏦</div>

        <h1 className="text-2xl font-bold text-zinc-100 mb-3">
          Conciliación bancaria automática
        </h1>

        <p className="text-zinc-400 mb-6 max-w-lg mx-auto leading-relaxed">
          Estamos trabajando para conectar los principales bancos españoles.
          Cuando esté listo, Saldea cruzará automáticamente cada ingreso con tus
          facturas pendientes — sin que hagas nada.
        </p>

        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-12">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Próximamente — en desarrollo
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          {features.map(f => (
            <div key={f.titulo} className="bg-zinc-900/60 border border-white/[0.08] rounded-xl p-5">
              <div className="text-2xl mb-2">{f.icono}</div>
              <p className="text-sm font-semibold text-zinc-200 mb-1">{f.titulo}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-600">
          Recibirás una notificación cuando la función esté disponible.
        </p>
      </div>
    </div>
  )
}
