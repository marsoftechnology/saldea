import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Numio — Cobra tus facturas sin esfuerzo',
  description: 'Automatiza el cobro de tus facturas impagadas con IA. Mensajes personalizados que escalan en tono hasta que te paguen.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  )
}
