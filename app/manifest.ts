import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saldea — Cobros automáticos',
    short_name: 'Saldea',
    description: 'Persigue el cobro de tus facturas con IA',
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#09090b',
    theme_color: '#09090b',
    lang: 'es-ES',
    dir: 'ltr',
    categories: ['business', 'finance'],
    icons: [
      {
        src: '/images/saldea/logo-mark.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/saldea/logo-mark.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [],
  }
}
