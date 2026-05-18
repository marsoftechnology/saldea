import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en MÃ¡laga: software de cobros para autÃ³nomos y pymes malagueÃ±as',
  description: 'Software espaÃ±ol con IA para automatizar el cobro de facturas. Para autÃ³nomos, gestorÃ­as, empresas tecnolÃ³gicas y turÃ­sticas de MÃ¡laga. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/malaga' },
  keywords: ['software cobros MÃ¡laga', 'gestorÃ­a MÃ¡laga', 'autÃ³nomo MÃ¡laga facturas', 'Saldea MÃ¡laga', 'pyme Costa del Sol', 'morosos MÃ¡laga'],
  openGraph: { title: 'Saldea en MÃ¡laga', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automÃ¡ticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'MÃ¡laga' },
}

export default function PageMalaga() {
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
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>ðŸ“ Atendiendo MÃ¡laga y Costa del Sol</span></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autÃ³nomos de MÃ¡laga</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">MÃ¡laga es el polo tecnolÃ³gico emergente del sur de EspaÃ±a. Cientos de startups, pymes turÃ­sticas y autÃ³nomos del sector servicios trabajan con plazos largos. Saldea automatiza tus cobros con IA mientras tÃº te dedicas a crecer.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores malagueÃ±os donde mÃ¡s encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>ðŸ’» <strong>Startups tecnolÃ³gicas</strong> del MÃ¡laga TechPark (CÃ¡rtama, PTA)</li>
            <li>ðŸ–ï¸ <strong>Empresas turÃ­sticas</strong> y de servicios a hoteles</li>
            <li>ðŸ“Š <strong>AsesorÃ­as y gestorÃ­as</strong> de MÃ¡laga capital, Marbella, Estepona, Fuengirola</li>
            <li>ðŸ—ï¸ <strong>ConstrucciÃ³n y reformas</strong> (sector activo Costa del Sol)</li>
            <li>ðŸŽ¨ <strong>Agencias creativas</strong> y consultoras digitales</li>
            <li>ðŸ›’ <strong>Comercio mayorista</strong> y proveedores hostelerÃ­a</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en MÃ¡laga</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>âœ“ <strong>Empresa hermana en AndalucÃ­a</strong>: Marsof estÃ¡ en Niebla (Huelva), conocemos el ecosistema andaluz</li>
            <li>âœ“ <strong>IA en castellano</strong> que entiende el contexto espaÃ±ol</li>
            <li>âœ“ <strong>Cumple Ley 3/2004 y Veri*factu</strong></li>
            <li>âœ“ <strong>Soporte cercano</strong> en horario peninsular</li>
            <li>âœ“ <strong>1 mes gratis</strong> sin tarjeta</li>
          </ul>
          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Empieza desde MÃ¡laga</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0â‚¬ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
