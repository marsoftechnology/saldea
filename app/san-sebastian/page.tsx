import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en San Sebastián: software de cobros para empresas guipuzcoanas',
  description: 'Software con IA para automatizar el cobro de facturas en San Sebastián y Gipuzkoa. Compatible con TicketBAI. 15 días gratis.',
  alternates: { canonical: 'https://marsof.es/san-sebastian' },
  keywords: ['software cobros San Sebastián', 'gestoría Donostia', 'autónomo Gipuzkoa', 'Saldea Donostia', 'TicketBAI cobros'],
  openGraph: { title: 'Saldea en San Sebastián', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}
const schema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Software de cobros con IA', provider: { '@id': 'https://marsof.es/#organization' }, areaServed: { '@type': 'City', name: 'San Sebastián' } }

export default function PageSanSebastian() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">15 días gratis</Link></div>
        </div>
      </nav>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>📍 Atendiendo Donostia y Gipuzkoa</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autónomos de Donostia</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">Gipuzkoa tiene una industria fuerte (máquina-herramienta, automoción, papel) y un sector turístico premium. TicketBAI obligatorio. Saldea convive: tú facturas con tu software TicketBAI y Saldea persigue los cobros con IA.</p>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores guipuzcoanos donde encaja Saldea</h2>
        <ul className="space-y-2 text-zinc-300 mb-8">
          <li>⚙️ <strong>Máquina-herramienta</strong> y proveedores industriales</li>
          <li>📊 <strong>Asesorías y gestorías</strong> de Donostia y comarca</li>
          <li>🍴 <strong>Hostelería premium</strong> y restauración gastronómica</li>
          <li>📰 <strong>Papel y arte gráfico</strong></li>
          <li>💻 <strong>Empresas tecnológicas</strong> de innovación</li>
        </ul>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué encaja en Gipuzkoa</h2>
        <ul className="space-y-3 text-zinc-300 mb-8">
          <li>✓ Compatible con TicketBAI (tu software se encarga)</li>
          <li>✓ Industria con plazos de cobro largos</li>
          <li>✓ Cumple Ley 3/2004</li>
          <li>✓ 15 días gratis</li>
        </ul>
        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Empieza desde Donostia</h2>
          <p className="text-zinc-400 mb-6">5 min. 15 días gratis.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  </>)
}
