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
          '/admin',
          '/admin/',
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
          '/equipo',
          '/equipo/',
          '/bienvenida',
          '/aceptar-invitacion',
          '/restablecer',
          '/recuperar',
          '/pago-completado',
          '/cobrado',
          '/portal/',
          '/pagar/',
          '/login',
          '/encuesta',
          '/peticiones',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
