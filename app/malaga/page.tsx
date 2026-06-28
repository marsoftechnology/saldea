import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Málaga: software de cobros para autónomos y pymes malagueñas',
  description: 'Software español con IA para automatizar el cobro de facturas. Para autónomos, gestorías, empresas tecnológicas y turísticas de Málaga. 30 días gratis.',
  alternates: { canonical: 'https://www.marsof.es/malaga' },
  keywords: ['software cobros Málaga', 'gestoría Málaga', 'autónomo Málaga facturas', 'Saldea Málaga', 'pyme Costa del Sol', 'morosos Málaga'],
  openGraph: { title: 'Saldea en Málaga', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automáticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Málaga' },
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
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link>
            </div>
          </div>
        </nav>
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>?? Atendiendo Málaga y Costa del Sol</span></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autónomos de Málaga</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">Málaga es el polo tecnológico emergente del sur de España. Cientos de startups, pymes turísticas y autónomos del sector servicios trabajan con plazos largos. Saldea automatiza tus cobros con IA mientras tú te dedicas a crecer.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores malagueños donde más encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>?? <strong>Startups tecnológicas</strong> del Málaga TechPark (Cártama, PTA)</li>
            <li>??? <strong>Empresas turísticas</strong> y de servicios a hoteles</li>
            <li>?? <strong>Asesorías y gestorías</strong> de Málaga capital, Marbella, Estepona, Fuengirola</li>
            <li>??? <strong>Construcción y reformas</strong> (sector activo Costa del Sol)</li>
            <li>?? <strong>Agencias creativas</strong> y consultoras digitales</li>
            <li>?? <strong>Comercio mayorista</strong> y proveedores hostelería</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué encaja en Málaga</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>? <strong>Empresa hermana en Andalucía</strong>: Marsof es andaluza, conocemos el ecosistema andaluz</li>
            <li>? <strong>IA en castellano</strong> que entiende el contexto español</li>
            <li>? <strong>Cumple Ley 3/2004 y Veri*factu</strong></li>
            <li>? <strong>Soporte cercano</strong> en horario peninsular</li>
            <li>? <strong>30 días gratis</strong> · cancela antes y no pagas nada</li>
          </ul>
          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Empieza desde Málaga</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0€ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis ?</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
