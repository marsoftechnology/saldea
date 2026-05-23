import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saldea — Cobro automático de facturas',
    short_name: 'Saldea',
    description: 'IA que automatiza el cobro de tus facturas impagadas',
    start_url: '/dashboard',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0a0a0b',
    theme_color: '#0ea5e9',
    lang: 'es',
    dir: 'ltr',
    categories: ['business', 'finance', 'productivity'],
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
