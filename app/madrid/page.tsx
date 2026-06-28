import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea en Madrid: software de cobros con IA para empresas y autónomos',
  description: 'Saldea automatiza el cobro de facturas para autónomos, gestorías y pymes de Madrid. IA que escala el tono, cumple Ley 3/2004. 30 días gratis.',
  alternates: { canonical: 'https://www.marsof.es/madrid' },
  keywords: ['software cobros Madrid', 'gestoría Madrid cobros', 'autónomo Madrid facturas', 'Saldea Madrid', 'morosos Madrid', 'asesoría fiscal Madrid'],
  openGraph: { title: 'Saldea en Madrid', description: 'Software de cobros con IA.', type: 'website', locale: 'es_ES' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  serviceType: 'Software de cobros automáticos con IA',
  provider: { '@id': 'https://marsof.es/#organization' },
  areaServed: { '@type': 'City', name: 'Madrid' },
  description: 'Software con IA que automatiza el cobro de facturas para autónomos, gestorías y pymes de Madrid.',
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
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">30 días gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            <span>?? Atendiendo Madrid y Comunidad</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea para autónomos y empresas de Madrid</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">Si trabajas en Madrid sabes que el ritmo es alto y los morosos no perdonan. Saldea automatiza el cobro de tus facturas con IA: escala el tono, cita la Ley 3/2004 y detecta respuestas de clientes. Sin que pierdas horas semanales.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Sectores madrileños donde más encaja Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-8">
            <li>?? <strong>Asesorías y gestorías</strong> de Madrid capital, Alcalá, Móstoles, Getafe</li>
            <li>?? <strong>Empresas tecnológicas</strong> y SaaS con facturación B2B</li>
            <li>?? <strong>Agencias de marketing, comunicación, diseño</strong></li>
            <li>?? <strong>Construcción y reformas</strong> (sector con plazos largos)</li>
            <li>?? <strong>Formación y consultoría</strong> en grandes empresas</li>
            <li>?? <strong>Proveedores de hostelería</strong> y catering</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">Por qué encaja en Madrid</h2>
          <ul className="space-y-3 text-zinc-300 mb-8">
            <li>? Las empresas madrileñas tienden a <strong>pagar más tarde que la media</strong> (DSO ~75 días)</li>
            <li>? El volumen de facturación obliga a <strong>automatizar</strong> seguimientos</li>
            <li>? <strong>Soporte en español</strong> peninsular, sin desfase horario</li>
            <li>? <strong>Cumple Ley 3/2004</strong> y la nueva normativa Veri*factu</li>
            <li>? <strong>30 días gratis</strong> · cancela antes y no pagas nada — pruébalo con clientes reales</li>
          </ul>

          <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-2">Empieza desde Madrid en 5 minutos</h2>
            <p className="text-zinc-400 mb-6">Crea cuenta, conecta Stripe, importa tu primera factura y deja que la IA persiga el cobro.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis ?</Link>
          </div>
        </section>
        <MarketingFooter />
      </div>
    </>
  )
}
