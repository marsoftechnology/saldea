'use client'

// Captura errores no manejados del árbol React de toda la app y los envía a Sentry.
// Solo se renderiza si la propia <RootLayout> falla — los errores de páginas concretas
// se manejan con archivos `error.tsx` en cada segmento.

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
