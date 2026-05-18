import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Madrid: software de cobros con IA para empresas y autÃ³nomos',
  description: 'Saldea automatiza el cobro de facturas para autÃ³nomos, gestorÃ­as y pymes de Madrid. IA que escala el tono, cumple Ley 3/2004. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/madrid' },
  keywords: ['software cobros Madrid', 'gestorÃ­a Madrid cobros', 'autÃ³nomo Madrid facturas', 'Saldea Madrid', 'morosos Madrid', 'asesorÃ­a fiscal Madrid'],
  openGraph: { title: 'Saldea en Madrid', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automÃ¡ticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Madrid' },
  description: 'Software con IA que automatiza el cobro de facturas para autÃ³nomos, gestorÃ­as y pymes de Madrid.',
}

export default function PageMadrid() {
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
            <span>ðŸ“ Atendiendo Madrid y Comunidad</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para autÃ³nomos y empresas de Madrid</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">Si trabajas en Madrid sabes que el ritmo es alto y los morosos no perdonan. Saldea automatiza el cobro de tus facturas con IA: escala el tono, cita la Ley 3/2004 y detecta respuestas de clientes. Sin que pierdas horas semanales.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores madrileÃ±os donde mÃ¡s encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>ðŸ“Š <strong>AsesorÃ­as y gestorÃ­as</strong> de Madrid capital, AlcalÃ¡, MÃ³stoles, Getafe</li>
            <li>ðŸ’» <strong>Empresas tecnolÃ³gicas</strong> y SaaS con facturaciÃ³n B2B</li>
            <li>ðŸŽ¨ <strong>Agencias de marketing, comunicaciÃ³n, diseÃ±o</strong></li>
            <li>ðŸ‘· <strong>ConstrucciÃ³n y reformas</strong> (sector con plazos largos)</li>
            <li>ðŸ“š <strong>FormaciÃ³n y consultorÃ­a</strong> en grandes empresas</li>
            <li>ðŸ´ <strong>Proveedores de hostelerÃ­a</strong> y catering</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por quÃ© encaja en Madrid</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>âœ“ Las empresas madrileÃ±as tienden a <strong>pagar mÃ¡s tarde que la media</strong> (DSO ~75 dÃ­as)</li>
            <li>âœ“ El volumen de facturaciÃ³n obliga a <strong>automatizar</strong> seguimientos</li>
            <li>âœ“ <strong>Soporte en espaÃ±ol</strong> peninsular, sin desfase horario</li>
            <li>âœ“ <strong>Cumple Ley 3/2004</strong> y la nueva normativa Veri*factu</li>
            <li>âœ“ <strong>1 mes gratis</strong> sin tarjeta para que pruebes con clientes reales</li>
          </ul>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Empieza desde Madrid en 5 minutos</h2>
            <p className="text-zinc-400 mb-6">Crea cuenta, conecta Stripe, importa tu primera factura y deja que la IA persiga el cobro.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis â†’</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
