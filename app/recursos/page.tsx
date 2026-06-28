import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Recursos gratis: plantillas, calculadoras y guías de cobros | Saldea',
  description: 'Plantillas Word/Excel gratis para reclamar facturas, calculadora de intereses de demora, modelos de burofax y más. Todo sin registro.',
  alternates: { canonical: 'https://marsof.es/recursos' },
  keywords: [
    'plantilla reclamacion factura',
    'modelo burofax word',
    'calculadora intereses demora',
    'plantilla recordatorio pago',
    'recursos gratis cobros',
    'documento monitorio',
  ],
  openGraph: {
    title: 'Recursos gratis para cobrar tus facturas',
    description: 'Plantillas, calculadoras y modelos legales. Sin registro.',
    type: 'website',
    locale: 'es_ES',
  },
}

const recursos = [
  {
    icono: '📧',
    titulo: '4 plantillas de email de reclamación',
    desc: 'Tono amable, firme, formal y previo a burofax. Adaptadas a Ley 3/2004.',
    enlace: '/blog/modelo-email-reclamacion-factura-impagada',
    cta: 'Ver plantillas',
  },
  {
    icono: '📮',
    titulo: 'Modelo de burofax descargable',
    desc: 'Texto completo listo para copiar en Correos.es. Cita Ley 3/2004 e intereses.',
    enlace: '/blog/como-enviar-burofax-reclamar-deuda',
    cta: 'Ver modelo',
  },
  {
    icono: '🧮',
    titulo: 'Calculadora de intereses de demora',
    desc: 'Fórmula exacta y tabla con ejemplos según importe y días vencidos. Tipo 2026.',
    enlace: '/blog/calcular-intereses-demora-factura-impagada',
    cta: 'Calcular',
  },
  {
    icono: '⚖️',
    titulo: 'Guía del procedimiento monitorio',
    desc: 'Paso a paso para reclamar judicialmente sin abogado (deudas < 2.000€).',
    enlace: '/blog/procedimiento-monitorio-reclamar-deuda',
    cta: 'Leer guía',
  },
  {
    icono: '📋',
    titulo: 'Ley 3/2004 explicada en 8 minutos',
    desc: 'Plazos, intereses, indemnización 40€ y aplicación práctica con ejemplos.',
    enlace: '/blog/ley-3-2004-morosidad-explicada',
    cta: 'Leer guía',
  },
  {
    icono: '🗓',
    titulo: 'Calendario de reclamación de impagados',
    desc: 'Las 7 fases de cobro: del día 1 al procedimiento monitorio. Plantilla de seguimiento.',
    enlace: '/blog/como-cobrar-cliente-moroso',
    cta: 'Ver calendario',
  },
]

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Recursos gratis: plantillas, calculadoras y guías de cobros',
  description: 'Plantillas Word/Excel, calculadora de intereses de demora, modelos de burofax y más. Todo gratis y sin registro.',
  url: 'https://www.marsof.es/recursos',
  publisher: { '@id': 'https://marsof.es/#organization' },
  inLanguage: 'es-ES',
}

export default function PageRecursos() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Recursos gratis para cobrar tus facturas</h1>
        <p className="text-xl text-zinc-400 leading-relaxed">Plantillas, modelos legales y calculadoras 100% gratis. Sin registro ni email. Cópialos y úsalos en tu negocio.</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {recursos.map((r) => (
            <Link key={r.titulo} href={r.enlace} className="block bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-sky-500/40 transition-all">
              <p className="text-3xl mb-3">{r.icono}</p>
              <h2 className="text-xl font-bold text-zinc-100 mb-2">{r.titulo}</h2>
              <p className="text-zinc-400 text-sm mb-4">{r.desc}</p>
              <p className="text-sky-400 text-sm font-medium">{r.cta} →</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">¿Quieres que esto lo haga la IA por ti?</h2>
          <p className="text-zinc-400 mb-6">Saldea hace todo lo que ves aquí automáticamente: manda los emails, calcula intereses, escala el tono y detecta respuestas.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar 30 días gratis →</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  </>
  )
}
