import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard',
          '/dashboard/',
          '/clientes',
          '/clientes/',
          '/facturas',
          '/facturas/',
          '/ajustes',
          '/ajustes/',
          '/importar',
          '/importar/',
          '/restablecer',
          '/recuperar',
          '/pago-completado',
          '/cobrado',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
