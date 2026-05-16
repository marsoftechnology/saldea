import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

// Slugs de los artículos del blog. Cuando añadas uno nuevo, añade aquí su carpeta.
const BLOG_SLUGS = [
  'modelo-presupuesto-autonomo',
  'gestion-cuentas-a-cobrar-pyme',
  'ratio-liquidez-pyme-2026',
  'domiciliacion-sepa-cobros-automaticos',
  'morosidad-sector-construccion',
  'morosidad-sector-hosteleria',
  'morosidad-sector-agroalimentario',
  'morosidad-sector-sanitario',
  'morosidad-ecommerce-tiendas-online',
  'morosidad-sector-transporte-logistica',
  'morosidad-sector-formacion',
  'morosidad-sector-retail-comercio',
  'razones-clientes-no-pagan-facturas',
  'verifactu-facturas-electronicas-2026',
  'factura-electronica-b2b-obligatoria-espana',
  'software-gestion-cobros-comparativa',
  'ley-3-2004-morosidad-explicada',
  'como-cobrar-cliente-moroso',
  'como-enviar-burofax-reclamar-deuda',
  'calcular-intereses-demora-factura-impagada',
  'procedimiento-monitorio-reclamar-deuda',
  'como-evitar-clientes-morosos',
  'plazos-pago-entre-empresas-espana',
  'contrato-prestacion-servicios-autonomo',
  'factura-proforma-vs-factura-ordinaria',
  'facturas-recurrentes-suscripciones',
  'factoring-vs-recordatorios-cobro',
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
    { url: `${BASE_URL}/glosario`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/sobre-marsof`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/precios`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/comparativa/saldea-vs-quipu`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/comparativa/saldea-vs-anfix`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/huelva`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/sevilla`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/madrid`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/barcelona`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/valencia`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/comparativa/saldea-vs-sage`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/comparativa/saldea-vs-billin`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/malaga`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/bilbao`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/zaragoza`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/prensa`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/afiliados`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/murcia`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/granada`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/alicante`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/vigo`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/palma`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE_URL}/comparativa/saldea-vs-contasimple`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/comparativa/saldea-vs-zoho`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
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
