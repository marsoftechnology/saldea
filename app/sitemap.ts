import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

// Slugs de los artículos del blog. Cuando añadas uno nuevo, añade aquí su carpeta.
const BLOG_SLUGS = [
  'software-gestion-cobros-comparativa',
  'ley-3-2004-morosidad-explicada',
  'como-cobrar-cliente-moroso',
  'como-enviar-burofax-reclamar-deuda',
  'calcular-intereses-demora-factura-impagada',
  'procedimiento-monitorio-reclamar-deuda',
  'como-evitar-clientes-morosos',
  'plazos-pago-entre-empresas-espana',
  'contrato-prestacion-servicios-autonomo',
  'modelo-email-reclamacion-factura-impagada',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const rutas: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/saldea`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/gestorias`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/autonomos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/recursos`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/preguntas-frecuentes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/comparativa/saldea-vs-holded`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/registro`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/legal/terminos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  for (const slug of BLOG_SLUGS) {
    rutas.push({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return rutas
}
