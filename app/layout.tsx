import type { Metadata } from 'next'
import './globals.css'
import { CookieBanner } from './components/CookieBanner'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.marsof.es'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Saldea by Marsof — Cobra tus facturas sin esfuerzo',
  description: 'Automatiza el cobro de tus facturas impagadas con IA. Mensajes personalizados que escalan en tono hasta que te paguen.',
  openGraph: {
    type: 'website',
    siteName: 'Saldea by Marsof',
    locale: 'es_ES',
    url: APP_URL,
    title: 'Saldea — Cobra tus facturas sin perseguir a nadie',
    description: 'La IA escribe los recordatorios por ti y escala el tono hasta que tus clientes pagan. 7 días gratis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saldea — Cobra tus facturas sin perseguir a nadie',
    description: 'La IA escribe los recordatorios por ti y escala el tono hasta que tus clientes pagan. 7 días gratis.',
  },
  robots: { index: true, follow: true },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body className="h-full antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
