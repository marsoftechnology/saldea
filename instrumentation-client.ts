// Inicialización de Sentry para el lado cliente (navegador).
// Se ejecuta antes de que la app sea interactiva.

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Entornos: production vs preview vs development
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',

  // Recibir el 100% de los errores
  sampleRate: 1.0,

  // Performance monitoring: 10% de las sesiones (suficiente para detectar lentitud)
  tracesSampleRate: 0.1,

  // Session Replay: graba la sesión cuando ocurre un error, así ves QUÉ hizo el usuario
  // 0% de sesiones normales (no gastamos cuota) pero 100% cuando hay un error
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  // Ignorar errores típicos de extensiones de navegador, bots y redirects normales
  ignoreErrors: [
    'NEXT_REDIRECT',
    'NEXT_NOT_FOUND',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Extensiones (suelen lanzar errores que no son culpa nuestra)
    /chrome-extension:\/\//i,
    /moz-extension:\/\//i,
    /safari-extension:\/\//i,
    // Errores de red por sesiones offline o adblockers agresivos
    'Network request failed',
    'NetworkError',
    'Failed to fetch',
    'Load failed',
  ],

  // No mandar URLs que tengan tokens o info sensible
  denyUrls: [
    /aceptar-invitacion\?token=/,
    /api\/admin\/login/,
  ],

  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Integrations: session replay solo cuando hay error
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,  // permitimos ver el contenido (interno)
      blockAllMedia: true, // bloqueamos imágenes/vídeos (pueden ser PDF facturas)
    }),
  ],
})

// Hook para que Next.js capture transiciones de página
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
