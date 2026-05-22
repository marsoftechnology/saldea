import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada · Saldea',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span className="text-7xl">🧭</span>
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 mb-3">Página no encontrada</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          La página que buscas no existe o se ha movido. Comprueba la URL o vuelve al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Ir al inicio →
          </Link>
          <Link
            href="/dashboard"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Mi panel
          </Link>
        </div>
      </div>
    </div>
  )
}
