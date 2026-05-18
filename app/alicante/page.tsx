import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Alicante: software de cobros para autÃ³nomos y pymes alicantinas',
  description: 'Software con IA para automatizar el cobro de facturas. Para empresas de Alicante, Elche, Benidorm. Calzado, turismo, comercio. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/alicante' },
  keywords: ['software cobros Alicante', 'gestorÃ­a Alicante', 'autÃ³nomo Alicante', 'Saldea Alicante', 'pyme Costa Blanca'],
  openGraph: { title: 'Saldea en Alicante', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}
const schema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Software de cobros con IA', provider: { '@id': 'https://marsof.es/#organization' }, areaServed: { '@type': 'City', name: 'Alicante' } }

export default function PageAlicante() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link></div>
        </div>
      </nav>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>ðŸ“ Atendiendo Alicante y Costa Blanca</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autÃ³nomos de Alicante</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">Alicante tiene un tejido empresarial muy diverso: calzado en Elche, juguete en Onil, turismo en Benidorm y mucha pyme exportadora. Saldea automatiza tus cobros con IA, escala el tono y se adapta a la estacionalidad.</p>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores alicantinos donde encaja Saldea</h2>
        <ul className="space-y-2 text-zinc-300 mb-8">
          <li>ðŸ‘ž <strong>Calzado</strong> de Elche y Elda</li>
          <li>ðŸ§¸ <strong>Juguete</strong> de Onil y Ibi</li>
          <li>ðŸ–ï¸ <strong>Turismo y hostelerÃ­a</strong> de Benidorm, Torrevieja, Denia</li>
          <li>ðŸ“Š <strong>AsesorÃ­as y gestorÃ­as</strong> de Alicante capital</li>
          <li>ðŸ—ï¸ <strong>ConstrucciÃ³n y reformas</strong> Costa Blanca</li>
        </ul>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en Alicante</h2>
        <ul className="space-y-3 text-zinc-300 mb-8">
          <li>âœ“ Sectores exportadores con plazos largos (60-120 dÃ­as)</li>
          <li>âœ“ Cumple Ley 3/2004 y Veri*factu</li>
          <li>âœ“ Soporte en espaÃ±ol peninsular</li>
          <li>âœ“ 1 mes gratis sin tarjeta</li>
        </ul>
        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Empieza desde Alicante</h2>
          <p className="text-zinc-400 mb-6">5 min para activarlo. 0â‚¬ hasta el dÃ­a 31.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  </>)
}
