'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
    console.error('[error.tsx]', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span className="text-7xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold text-zinc-100 mb-3">Algo ha salido mal</h1>
        <p className="text-zinc-400 mb-2 leading-relaxed">
          Hemos tenido un problema cargando esta página. El error ya está reportado a nuestro equipo.
        </p>
        {error.digest && (
          <p className="text-xs text-zinc-600 mb-6 font-mono">Ref: {error.digest}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={() => unstable_retry()}
            className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/dashboard"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Volver al panel
          </Link>
          <a
            href="mailto:soporte@marsof.es"
            className="text-zinc-400 hover:text-zinc-100 px-4 py-2.5 rounded-lg text-sm transition-colors"
          >
            Contactar soporte
          </a>
        </div>
      </div>
    </div>
  )
}
