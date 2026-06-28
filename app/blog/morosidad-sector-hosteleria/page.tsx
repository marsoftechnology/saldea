import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en hosteler�a y restauraci�n 2026: cobrar a hoteles | Marsof',
  description: 'C�mo cobrar facturas a hoteles, restaurantes y empresas de hosteler�a en Espa�a. Plazos reales, cl�usulas clave y herramientas que funcionan.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-sector-hosteleria' },
  keywords: ['cobrar hosteleria', 'morosos hoteles', 'facturas restaurante impagadas', 'proveedor hosteleria cobros', 'cobrar a hoteles'],
  openGraph: { title: 'Morosidad en hosteler�a 2026', description: 'Cobrar a hoteles y restaurantes.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad en hosteler�a y restauraci�n 2026: cobrar a hoteles", "description": "C�mo cobrar facturas a hoteles, restaurantes y empresas de hosteler�a en Espa�a. Plazos reales, cl�usulas clave y herramientas que funcionan.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-sector-hosteleria"}

export default function PageHosteleria() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en hosteler�a y restauraci�n</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si eres proveedor de hoteles, restaurantes o catering, sabes que cobrar en este sector tiene su ciencia. Plazos, estacionalidad y qu� hacer cuando no pagan.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La realidad del sector</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Plazo medio de pago:</strong> 75-90 d�as (vs 60 d�as legales)</li>
            <li>?? <strong>Estacionalidad brutal:</strong> en invierno hay menos liquidez en zonas tur�sticas</li>
            <li>?? <strong>Concentraci�n de proveedores:</strong> grandes cadenas tienen poder de negociaci�n</li>
            <li>?? <strong>Riesgo en pymes:</strong> margen estrecho, cierres frecuentes</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de clientes y su comportamiento</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Tipo</th><th className="py-3 px-4 text-left text-zinc-100">Plazo</th><th className="py-3 px-4 text-left text-zinc-100">Riesgo</th></tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cadenas hoteleras grandes</td><td className="py-2 px-4">90-120 d�as</td><td className="py-2 px-4">Bajo (pagan, pero tarde)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Hoteles independientes</td><td className="py-2 px-4">60-90 d�as</td><td className="py-2 px-4">Medio</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Restaurantes peque�os</td><td className="py-2 px-4">30-60 d�as</td><td className="py-2 px-4">Alto (cierres)</td></tr>
                <tr><td className="py-2 px-4">Catering eventos</td><td className="py-2 px-4">7-30 d�as</td><td className="py-2 px-4">Variable</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cl�usulas clave en contratos con hosteler�a</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Anticipo para eventos:</strong> 30-50% al menos en catering</li>
            <li>? <strong>Plazo expreso:</strong> 30 d�as en restaurantes peque�os, 60 m�x. en cadenas</li>
            <li>? <strong>Suspensi�n por impago:</strong> imprescindible para proveedores recurrentes</li>
            <li>? <strong>Ley 3/2004 expresa</strong> citada en condiciones</li>
            <li>? <strong>Cl�usula de garant�a personal</strong> en restaurantes peque�os (firma del titular)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos en hosteler�a</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Verificaci�n previa:</strong> hosteler�a tiene rotaci�n alta. eInforma + Google reviews</li>
            <li><strong>Recordatorio pre-vencimiento:</strong> en hosteler�a el "olvido" es habitual por volumen</li>
            <li><strong>Llamada al jefe de compras:</strong> escala m�s r�pido que email</li>
            <li><strong>Si se retrasa &gt; 30 d�as, suspender entregas</strong> hasta regularizar</li>
            <li><strong>Burofax temprano</strong> a partir de 60 d�as para sobrevivir al cierre</li>
          </ol>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para proveedores de hosteler�a</h3>
          <p className="text-zinc-300 mb-5">Recordatorios autom�ticos por cliente, escala el tono seg�n tipo de hotel/restaurante. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

