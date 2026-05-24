import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

// Wrap con Sentry para:
// - Subir source maps a Sentry (cuando hay SENTRY_AUTH_TOKEN en CI/Vercel)
// - Crear el tunnel /monitoring que evita que los adblockers tumben los reports
// - Configurar el plugin de build para mejor diagnóstico
export default withSentryConfig(nextConfig, {
  org: 'marsof-technology',
  project: 'saldea',

  // Reduce verbosidad en la build local (true = solo errores)
  silent: !process.env.CI,

  // Tunnel route: las requests a Sentry van por nuestro dominio
  // → ningún adblocker las bloquea
  tunnelRoute: '/monitoring',

  // Subida de source maps a Sentry — más amplia para client bundles
  widenClientFileUpload: true,

  // No intentar subir source maps si no tenemos token (build local sin auth)
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
})
