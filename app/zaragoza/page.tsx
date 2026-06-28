import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Zaragoza: software de cobros para empresas aragonesas',
  description: 'Software de cobros automáticos con IA para autónomos, gestorías y pymes de Zaragoza y Aragón. Cumple Ley 3/2004. 30 días gratis.',
  alternates: { canonical: 'https://www.marsof.es/zaragoza' },
  keywords: ['software cobros Zaragoza', 'gestoría Zaragoza', 'autónomo Zaragoza', 'Saldea Zaragoza', 'pyme Aragón'],
  openGraph: { title: 'Saldea en Zaragoza', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automáticos con IA',
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
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link>
            </div>
          </div>
        </nav>
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>?? Atendiendo Zaragoza y Aragón</span></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autónomos de Zaragoza</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">Zaragoza concentra logística, industria automovilística y agroalimentaria del Valle del Ebro. Saldea automatiza los cobros con IA, escala el tono y se integra con tu software de facturación.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores aragoneses donde más encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>?? <strong>Logística</strong> y transporte (Plaza, Plataforma Logística de Zaragoza)</li>
            <li>?? <strong>Industria del automóvil</strong> y componentes</li>
            <li>?? <strong>Agroalimentario</strong> del Valle del Ebro</li>
            <li>?? <strong>Asesorías</strong> de Zaragoza, Huesca, Teruel</li>
            <li>??? <strong>Construcción industrial</strong></li>
            <li>?? <strong>Empresas tecnológicas</strong> y consultoras</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué encaja en Aragón</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>? Empresas con <strong>cadenas de subcontratación</strong> donde la morosidad se transmite</li>
            <li>? <strong>Cumple Ley 3/2004</strong></li>
            <li>? <strong>Soporte en español</strong> peninsular</li>
            <li>? <strong>30 días gratis</strong> · cancela antes y no pagas nada</li>
          </ul>
          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Empieza desde Zaragoza</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0€ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis ?</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
