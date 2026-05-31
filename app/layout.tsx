import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CookieBanner } from './components/CookieBanner'
import { TrackPageView } from '@/components/TrackPageView'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

// Viewport separado (requerido por Next.js 13+ para themeColor)
export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover', // Para notch en iPhone
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: 'Saldea',
  title: {
    default: 'Marsof — Software español para automatizar tu negocio',
    template: '%s | Marsof',
  },
  description: 'Marsof Technology, empresa española de software con sede en Huelva. Desarrolla Saldea, IA que automatiza el cobro de facturas para autónomos y pymes. 30 días gratis.',
  keywords: [
    'Marsof',
    'Marsof Technology',
    'Marsof Saldea',
    'Marsof Huelva',
    'Marsof Huelva',
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
    'Saldea',
    'Carlos Gálvez',
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
    siteName: 'Marsof',
    locale: 'es_ES',
    url: APP_URL,
    title: 'Marsof — Software español para automatizar tu negocio',
    description: 'Empresa española de software. Desarrollamos Saldea, IA que automatiza el cobro de facturas. 30 días gratis.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Marsof Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@marsof_es',
    title: 'Marsof — Software español para automatizar tu negocio',
    description: 'Empresa española de software. Desarrollamos Saldea, IA que automatiza el cobro de facturas. 30 días gratis.',
    images: ['/opengraph-image'],
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
  // PWA — comportamiento en iOS (Safari no lee el manifest para estos)
  appleWebApp: {
    capable: true,
    title: 'Saldea',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
}

// Schema JSON-LD para Google (rich results, knowledge panel)
const schemaOrganizacion = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${APP_URL}/#organization`,
  name: 'Marsof',
  alternateName: ['Marsof Technology', 'Marsof Tech'],
  legalName: 'Marsof Technology',
  url: APP_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${APP_URL}/og-image.png`,
    width: '1200',
    height: '630',
  },
  image: `${APP_URL}/og-image.png`,
  description: 'Marsof Technology es una empresa española de software con sede en Huelva. Desarrolla Saldea, una IA que automatiza el cobro de facturas impagadas para autónomos y pymes.',
  slogan: 'Software español para automatizar tu negocio',
  founder: {
    '@type': 'Person',
    name: 'Carlos Gálvez Carrillo',
    jobTitle: 'Fundador y CEO',
    nationality: { '@type': 'Country', name: 'España' },
  },
  foundingDate: '2026',
  foundingLocation: {
    '@type': 'Place',
    name: 'Huelva, España',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Huelva',
    addressRegion: 'Huelva',
    postalCode: '21001',
    addressCountry: 'ES',
  },
  areaServed: { '@type': 'Country', name: 'España' },
  knowsLanguage: 'es-ES',
  knowsAbout: [
    'Software de cobros',
    'Inteligencia Artificial aplicada a negocios',
    'Automatización de procesos administrativos',
    'Facturación electrónica',
    'Gestión de morosidad',
    'Ley 3/2004',
    'SaaS B2B',
    'Stripe Connect',
  ],
  brand: [
    {
      '@type': 'Brand',
      name: 'Saldea',
      logo: `${APP_URL}/og-image.png`,
      url: `${APP_URL}/saldea`,
      description: 'IA que automatiza el cobro de facturas impagadas',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'soporte@marsof.es',
      availableLanguage: ['Spanish'],
      areaServed: 'ES',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hola@marsof.es',
      availableLanguage: ['Spanish'],
      areaServed: 'ES',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/marsof',
    'https://github.com/carlos90inversiones',
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
  // Script inline que aplica el tema antes del primer paint (sin flash).
  // Lee localStorage.saldea_theme y setea data-theme="light|dark" en <html>.
  const themeScript = `(function(){try{var t=localStorage.getItem('saldea_theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

  return (
    <html lang="es" className="h-full" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* PWA: icono para iOS (Safari ignora el manifest para apple-touch-icon) */}
        <link rel="apple-touch-icon" href="/images/saldea/logo-mark.png" />
        {/* PWA: meta tags para instalación en móviles */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Saldea" />
        <meta name="theme-color" content="#09090b" />
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
        <TrackPageView />
      </body>
    </html>
  )
}
