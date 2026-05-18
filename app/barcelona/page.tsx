import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea a Barcelona: software de cobros amb IA per autònoms i empreses',
  description: 'Saldea automatitza el cobrament de factures per a autònoms, gestories i pimes de Barcelona i Catalunya. IA, Llei 3/2004, RGPD. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/barcelona' },
  keywords: ['software cobros Barcelona', 'gestoría Barcelona', 'autónomo Barcelona facturas', 'Saldea Barcelona', 'cobrament factures Barcelona', 'asesoría Cataluña'],
  openGraph: { title: 'Saldea en Barcelona', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automáticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Barcelona' },
}

export default function PageBarcelona() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
            <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            <span>📍 Atendiendo Barcelona y Cataluña</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para autónomos y empresas de Barcelona</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">Barcelona concentra el mayor número de pymes tecnológicas y agencias de España. Saldea automatiza tus cobros con IA: emails escalados, detección de respuestas, integración con Stripe. Pensado para que cobres más rápido y dediques tu tiempo a crecer.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores barceloneses donde más encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>🚀 <strong>Startups y SaaS</strong> con facturación recurrente B2B</li>
            <li>🎨 <strong>Agencias de marketing y publicidad</strong></li>
            <li>📊 <strong>Asesorías y gestorías</strong> de Barcelona y área metropolitana</li>
            <li>💼 <strong>Consultoras y firmas profesionales</strong></li>
            <li>🏭 <strong>Empresas industriales</strong> del Vallès, Baix Llobregat, Maresme</li>
            <li>🛒 <strong>Comercio mayorista</strong> y proveedores</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Detalles importantes para Cataluña</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>✓ <strong>Compatible con TicketBAI</strong> y Veri*factu (tu software de facturación se encarga)</li>
            <li>✓ <strong>Plantillas adaptables</strong>: puedes configurar los recordatorios en catalán si lo necesitas</li>
            <li>✓ <strong>Cumplimiento RGPD</strong> con servidores europeos</li>
            <li>✓ <strong>Soporte en español</strong> en horario peninsular</li>
            <li>✓ <strong>1 mes gratis</strong> sin tarjeta para que pruebes</li>
          </ul>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Probadlo desde Barcelona</h2>
            <p className="text-zinc-400 mb-6">5 minutos para activarlo. 1 mes para validar si te encaja. 0€ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
