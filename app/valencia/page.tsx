import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Valencia: software de cobros para autónomos y pymes valencianas',
  description: 'Saldea automatiza el cobro de facturas para autónomos, gestorías y pymes de Valencia, Alicante y Castellón. IA, Ley 3/2004, RGPD. 30 días gratis.',
  alternates: { canonical: 'https://www.marsof.es/valencia' },
  keywords: ['software cobros Valencia', 'gestoría Valencia', 'autónomo Valencia facturas', 'Saldea Valencia', 'cobros pyme Comunidad Valenciana', 'morosos Valencia'],
  openGraph: { title: 'Saldea en Valencia', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automáticos con IA',
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
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            <span>?? Atendiendo Valencia, Alicante y Castellón</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para autónomos y empresas valencianas</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">La Comunidad Valenciana tiene un tejido pyme muy fuerte: cerámica, textil, agroalimentario, mueble, turismo. Todos sectores con plazos de cobro largos. Saldea automatiza esos cobros con IA. Sin que tengas que dedicar horas a perseguir clientes.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores valencianos donde más encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>?? <strong>Cerámica</strong> de Castellón (Onda, Vila-real, Almazora)</li>
            <li>?? <strong>Textil</strong> y moda de Alicante (Elche, Elda)</li>
            <li>?? <strong>Agroalimentario</strong> y cooperativas citrícolas</li>
            <li>??? <strong>Mueble y madera</strong> del Valle del Vinalopó</li>
            <li>??? <strong>Turismo y hostelería</strong> con cobros a operadores</li>
            <li>?? <strong>Asesorías y gestorías</strong> de Valencia, Alicante y Castellón</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué encaja en la Comunidad Valenciana</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>? Los sectores exportadores trabajan con <strong>plazos largos</strong> (60-120 días)</li>
            <li>? <strong>IA que escala el tono</strong> sin perder cliente</li>
            <li>? <strong>Cumple Ley 3/2004</strong> y Veri*factu</li>
            <li>? <strong>Soporte en español</strong> peninsular</li>
            <li>? <strong>30 días gratis</strong> · cancela antes y no pagas nada</li>
          </ul>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Pruébalo desde Valencia</h2>
            <p className="text-zinc-400 mb-6">5 min para activarlo. 1 mes para probarlo. 0€ hasta entonces.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis ?</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
