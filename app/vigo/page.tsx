import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Vigo: software de cobros para empresas y autÃ³nomos gallegos',
  description: 'Software con IA para automatizar el cobro de facturas. Para empresas de Vigo, A CoruÃ±a, Pontevedra y toda Galicia. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/vigo' },
  keywords: ['software cobros Vigo', 'gestorÃ­a Vigo', 'autÃ³nomo Galicia facturas', 'Saldea Vigo', 'pyme Galicia'],
  openGraph: { title: 'Saldea en Vigo', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}
const schema = { '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Software de cobros con IA', provider: { '@id': 'https://marsof.es/#organization' }, areaServed: { '@type': 'City', name: 'Vigo' } }

export default function PageVigo() {
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
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6"><span>ðŸ“ Atendiendo Vigo y Galicia</span></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para empresas y autÃ³nomos de Vigo y Galicia</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">Vigo concentra la industria automovilÃ­stica, naval, pesquera y de servicios marÃ­timos de Galicia. Sectores con cadenas de subcontrataciÃ³n largas donde los retrasos de pago son la norma. Saldea automatiza tus cobros con IA.</p>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores gallegos donde encaja Saldea</h2>
        <ul className="space-y-2 text-zinc-300 mb-8">
          <li>ðŸš— <strong>AutomociÃ³n</strong> (PSA-Stellantis y proveedores)</li>
          <li>ðŸš¢ <strong>Industria naval</strong> y proveedores marÃ­timos</li>
          <li>ðŸŸ <strong>Pesca y conservas</strong> de Vigo y Bueu</li>
          <li>ðŸ“Š <strong>GestorÃ­as y asesorÃ­as</strong> de Vigo, A CoruÃ±a, Santiago, Pontevedra</li>
          <li>ðŸŒ³ <strong>Madera y mueble</strong> de Pontevedra y Lugo</li>
        </ul>
        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en Galicia</h2>
        <ul className="space-y-3 text-zinc-300 mb-8">
          <li>âœ“ Sectores con <strong>cadenas largas</strong> (auto, naval) donde la morosidad se transmite</li>
          <li>âœ“ Cumple Ley 3/2004</li>
          <li>âœ“ Soporte en espaÃ±ol peninsular</li>
          <li>âœ“ 1 mes gratis sin tarjeta</li>
        </ul>
        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-2">Empieza desde Vigo</h2>
          <p className="text-zinc-400 mb-6">5 min para activarlo. 0â‚¬ hasta el dÃ­a 31.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  </>)
}
