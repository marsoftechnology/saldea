import Link from 'next/link'

export default function PagoCompletadoPage() {
  return (
    <div className="min-h-screen bg-zinc-900/40 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">¡Pago completado!</h1>
        <p className="text-zinc-400 mb-8">
          Tu suscripción a Saldea está activa. Ya tienes acceso a todas las funciones de tu plan.
        </p>
        <Link
          href="/ajustes"
          className="inline-block bg-sky-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-sky-400 transition-colors"
        >
          Ver mi plan →
        </Link>
      </div>
    </div>
  )
}
