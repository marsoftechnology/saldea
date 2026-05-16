import type { Metadata } from 'next'
import './globals.css'
import { CookieBanner } from './components/CookieBanner'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Saldea by Marsof — Cobra tus facturas sin esfuerzo',
    template: '%s · Saldea by Marsof',
  },
  description: 'Automatiza el cobro de tus facturas impagadas con IA. Mensajes personalizados que escalan en tono hasta que te paguen. 1 mes gratis.',
  keywords: [
    'cobro de facturas',
    'facturas impagadas',
    'recordatorios de pago',
    'software cobros',
    'gestión de morosos',
    'reclamación de deudas',
    'automatizar cobros',
    'ley 3/2004 morosidad',
    'recordatorio factura impagada',
    'cobrar morosos autónomos',
    'gestoría cobros clientes',
    'IA cobros',
    'SaaS cobros España',
  ],
  authors: [{ name: 'Marsof Technology', url: APP_URL }],
  creator: 'Carlos Gálvez · Marsof Technology',
  publisher: 'Marsof Technology',
  category: 'Business',
  alternates: {
    canonical: APP_URL,
    languages: { 'es-ES': APP_URL },
  },
  openGraph: {
    type: 'website',
    siteName: 'Saldea by Marsof',
    locale: 'es_ES',
    url: APP_URL,
    title: 'Saldea — Cobra tus facturas sin perseguir a nadie',
    description: 'La IA escribe los recordatorios por ti y escala el tono hasta que tus clientes pagan. 1 mes gratis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saldea — Cobra tus facturas sin perseguir a nadie',
    description: 'La IA escribe los recordatorios por ti y escala el tono hasta que tus clientes pagan. 1 mes gratis.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    // Anadir cuando se de de alta Google Search Console
    // google: 'codigo-de-verificacion-aqui',
  },
}

// Script inline para aplicar el tema ANTES del primer paint (evita flash de fondo blanco/oscuro)
const temaInicial = `
  (function() {
    try {
      var t = localStorage.getItem('saldea_theme');
      if (t === 'light') document.documentElement.classList.add('light');
    } catch (e) {}
  })();
`

// Schema JSON-LD para Google (rich results, knowledge panel)
const schemaOrganizacion = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${APP_URL}/#organization`,
  name: 'Marsof Technology',
  legalName: 'Marsof Technology',
  url: APP_URL,
  logo: `${APP_URL}/og-image.png`,
  founder: { '@type': 'Person', name: 'Carlos Gálvez Carrillo' },
  foundingDate: '2026',
  areaServed: { '@type': 'Country', name: 'España' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'soporte@marsof.es',
    availableLanguage: ['Spanish'],
  },
  sameAs: [
    'https://www.linkedin.com/company/marsof',
  ],
}

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${APP_URL}/#website`,
  url: APP_URL,
  name: 'Saldea by Marsof',
  description: 'Automatiza el cobro de tus facturas impagadas con IA.',
  inLanguage: 'es-ES',
  publisher: { '@id': `${APP_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${APP_URL}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const schemaSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${APP_URL}/saldea#software`,
  name: 'Saldea',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Accounts Receivable Software',
  operatingSystem: 'Web',
  url: `${APP_URL}/saldea`,
  description: 'Software SaaS que automatiza el cobro de facturas impagadas con IA. Envía recordatorios personalizados, escala el tono y detecta respuestas de clientes.',
  inLanguage: 'es-ES',
  offers: [
    {
      '@type': 'Offer',
      name: 'Plan Pro Mensual',
      price: '49',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '49',
        priceCurrency: 'EUR',
        unitText: 'MES',
      },
      availability: 'https://schema.org/InStock',
      eligibleRegion: { '@type': 'Country', name: 'ES' },
    },
    {
      '@type': 'Offer',
      name: 'Plan Pro Anual',
      price: '499',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '499',
        priceCurrency: 'EUR',
        unitText: 'AÑO',
      },
      availability: 'https://schema.org/InStock',
      eligibleRegion: { '@type': 'Country', name: 'ES' },
    },
  ],
  featureList: [
    'Recordatorios automáticos con IA',
    'Escalado de tono progresivo',
    'Detección de respuestas con IA',
    'Pagos parciales',
    'Stripe Connect para cobros',
    'Multi-usuario',
    'Adjuntos PDF',
    'Plantillas personalizables',
  ],
  publisher: { '@id': `${APP_URL}/#organization` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganizacion) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }}
        />
      </head>
      <body className="h-full antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
