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
          Tu suscripción al Plan Pro de Saldea está activa. Ahora tienes acceso a todas las funciones.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-sky-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-sky-400 transition-colors"
        >
          Ir al panel →
        </Link>
      </div>
    </div>
  )
}
