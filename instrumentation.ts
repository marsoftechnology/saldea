// Inicialización de Sentry para el lado servidor de Next.js
// (Node.js runtime + Edge runtime). Para cliente: instrumentation-client.ts.

import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      // Sentry solo monta si hay DSN; no envía nada en dev local sin DSN.
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
      // Sample rate de errores: 100% (siempre que ocurra un error, lo recibimos)
      sampleRate: 1.0,
      // Performance monitoring: solo 10% para no gastar cuota en el plan free
      tracesSampleRate: 0.1,
      // Ignora errores intrascendentes
      ignoreErrors: [
        'NEXT_REDIRECT', // Redirects de Next.js son flujo normal
        'NEXT_NOT_FOUND', // 404 controlados
      ],
      // Capturar nombre del release a partir del commit de Vercel
      release: process.env.VERCEL_GIT_COMMIT_SHA,
    })
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.VERCEL_ENV ?? 'edge',
      sampleRate: 1.0,
      tracesSampleRate: 0.1,
      release: process.env.VERCEL_GIT_COMMIT_SHA,
    })
  }
}

// Hook que Sentry usa para capturar errores de Server Actions y route handlers
export const onRequestError = Sentry.captureRequestError
