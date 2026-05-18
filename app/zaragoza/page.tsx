import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Zaragoza: software de cobros para empresas aragonesas',
  description: 'Software de cobros automÃ¡ticos con IA para autÃ³nomos, gestorÃ­as y pymes de Zaragoza y AragÃ³n. Cumple Ley 3/2004. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/zaragoza' },
  keywords: ['software cobros Zaragoza', 'gestorÃ­a Zaragoza', 'autÃ³nomo Zaragoza', 'Saldea Zaragoza', 'pyme AragÃ³n'],
  openGraph: { title: 'Saldea en Zaragoza', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automÃ¡ticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Zaragoza' },
}

export default function PageZaragoza() {
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
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>ðŸ“ Atendiendo Zaragoza y AragÃ³n</span></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autÃ³nomos de Zaragoza</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">Zaragoza concentra logÃ­stica, industria automovilÃ­stica y agroalimentaria del Valle del Ebro. Saldea automatiza los cobros con IA, escala el tono y se integra con tu software de facturaciÃ³n.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores aragoneses donde mÃ¡s encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>ðŸš› <strong>LogÃ­stica</strong> y transporte (Plaza, Plataforma LogÃ­stica de Zaragoza)</li>
            <li>ðŸš— <strong>Industria del automÃ³vil</strong> y componentes</li>
            <li>ðŸŒ¾ <strong>Agroalimentario</strong> del Valle del Ebro</li>
            <li>ðŸ“Š <strong>AsesorÃ­as</strong> de Zaragoza, Huesca, Teruel</li>
            <li>ðŸ—ï¸ <strong>ConstrucciÃ³n industrial</strong></li>
            <li>ðŸ’» <strong>Empresas tecnolÃ³gicas</strong> y consultoras</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en AragÃ³n</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>âœ“ Empresas con <strong>cadenas de subcontrataciÃ³n</strong> donde la morosidad se transmite</li>
            <li>âœ“ <strong>Cumple Ley 3/2004</strong></li>
            <li>âœ“ <strong>Soporte en espaÃ±ol</strong> peninsular</li>
            <li>âœ“ <strong>1 mes gratis</strong> sin tarjeta</li>
          </ul>
          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Empieza desde Zaragoza</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0â‚¬ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
