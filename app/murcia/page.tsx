import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Murcia: software de cobros para empresas y autÃ³nomos murcianos',
  description: 'Software con IA para automatizar el cobro de facturas en Murcia. Para gestorÃ­as, agroalimentaria y servicios. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/murcia' },
  keywords: ['software cobros Murcia', 'gestorÃ­a Murcia', 'autÃ³nomo Murcia', 'Saldea Murcia', 'pyme RegiÃ³n de Murcia'],
  openGraph: { title: 'Saldea en Murcia', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}
const schema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Software de cobros con IA', provider: { '@id': 'https://marsof.es/#organization' }, areaServed: { '@type': 'City', name: 'Murcia' } }

export default function PageMurcia() {
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
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>ðŸ“ Atendiendo Murcia y la RegiÃ³n</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autÃ³nomos de Murcia</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">La RegiÃ³n de Murcia tiene un tejido productivo fuerte en agroalimentario (frutas, hortalizas, conservas), industria del calzado y servicios. Saldea automatiza tus cobros con IA y se integra con tu software de facturaciÃ³n.</p>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores murcianos donde encaja Saldea</h2>
        <ul className="space-y-2 text-zinc-300 mb-8">
          <li>ðŸ… <strong>Agroalimentario</strong> (Vega del Segura, Cieza, MazarrÃ³n)</li>
          <li>ðŸ‘ž <strong>Calzado e industria</strong> de Caravaca y Yecla</li>
          <li>ðŸ“Š <strong>GestorÃ­as y asesorÃ­as</strong> de Murcia capital y Cartagena</li>
          <li>ðŸ—ï¸ <strong>ConstrucciÃ³n y servicios</strong> a hostelerÃ­a</li>
          <li>ðŸ›’ <strong>Comercio mayorista</strong> agroalimentario</li>
        </ul>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en Murcia</h2>
        <ul className="space-y-3 text-zinc-300 mb-8">
          <li>âœ“ Ley 12/2013 de la Cadena Alimentaria <strong>citada automÃ¡ticamente</strong> en agroalimentario</li>
          <li>âœ“ Soporte cercano en espaÃ±ol peninsular</li>
          <li>âœ“ Cumple Ley 3/2004 y Veri*factu</li>
          <li>âœ“ 1 mes gratis sin tarjeta</li>
        </ul>
        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Empieza desde Murcia</h2>
          <p className="text-zinc-400 mb-6">5 min para activarlo. 0â‚¬ hasta el dÃ­a 31.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  </>)
}
