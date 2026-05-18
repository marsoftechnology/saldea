import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Valencia: software de cobros para autÃ³nomos y pymes valencianas',
  description: 'Saldea automatiza el cobro de facturas para autÃ³nomos, gestorÃ­as y pymes de Valencia, Alicante y CastellÃ³n. IA, Ley 3/2004, RGPD. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/valencia' },
  keywords: ['software cobros Valencia', 'gestorÃ­a Valencia', 'autÃ³nomo Valencia facturas', 'Saldea Valencia', 'cobros pyme Comunidad Valenciana', 'morosos Valencia'],
  openGraph: { title: 'Saldea en Valencia', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automÃ¡ticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad Valenciana' },
}

export default function PageValencia() {
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
            <span>ðŸ“ Atendiendo Valencia, Alicante y CastellÃ³n</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para autÃ³nomos y empresas valencianas</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">La Comunidad Valenciana tiene un tejido pyme muy fuerte: cerÃ¡mica, textil, agroalimentario, mueble, turismo. Todos sectores con plazos de cobro largos. Saldea automatiza esos cobros con IA. Sin que tengas que dedicar horas a perseguir clientes.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores valencianos donde mÃ¡s encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>ðŸº <strong>CerÃ¡mica</strong> de CastellÃ³n (Onda, Vila-real, Almazora)</li>
            <li>ðŸ‘” <strong>Textil</strong> y moda de Alicante (Elche, Elda)</li>
            <li>ðŸŠ <strong>Agroalimentario</strong> y cooperativas citrÃ­colas</li>
            <li>ðŸ›‹ï¸ <strong>Mueble y madera</strong> del Valle del VinalopÃ³</li>
            <li>ðŸ–ï¸ <strong>Turismo y hostelerÃ­a</strong> con cobros a operadores</li>
            <li>ðŸ“Š <strong>AsesorÃ­as y gestorÃ­as</strong> de Valencia, Alicante y CastellÃ³n</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en la Comunidad Valenciana</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>âœ“ Los sectores exportadores trabajan con <strong>plazos largos</strong> (60-120 dÃ­as)</li>
            <li>âœ“ <strong>IA que escala el tono</strong> sin perder cliente</li>
            <li>âœ“ <strong>Cumple Ley 3/2004</strong> y Veri*factu</li>
            <li>âœ“ <strong>Soporte en espaÃ±ol</strong> peninsular</li>
            <li>âœ“ <strong>1 mes gratis</strong> sin tarjeta</li>
          </ul>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">PruÃ©balo desde Valencia</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0â‚¬ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
