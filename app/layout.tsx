import type { Metadata } from 'next'
import './globals.css'
import { CookieBanner } from './components/CookieBanner'

export const metadata: Metadata = {
  title: 'Saldea by Marsof — Cobra tus facturas sin esfuerzo',
  description: 'Automatiza el cobro de tus facturas impagadas con IA. Mensajes personalizados que escalan en tono hasta que te paguen.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
