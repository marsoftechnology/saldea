import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Recursos gratis: plantillas, calculadoras y guÃ­as de cobros | Saldea',
  description: 'Plantillas Word/Excel gratis para reclamar facturas, calculadora de intereses de demora, modelos de burofax y mÃ¡s. Todo sin registro.',
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
    icono: 'ðŸ“§',
    titulo: '4 plantillas de email de reclamaciÃ³n',
    desc: 'Tono amable, firme, formal y previo a burofax. Adaptadas a Ley 3/2004.',
    enlace: '/blog/modelo-email-reclamacion-factura-impagada',
    cta: 'Ver plantillas',
  },
  {
    icono: 'ðŸ“®',
    titulo: 'Modelo de burofax descargable',
    desc: 'Texto completo listo para copiar en Correos.es. Cita Ley 3/2004 e intereses.',
    enlace: '/blog/como-enviar-burofax-reclamar-deuda',
    cta: 'Ver modelo',
  },
  {
    icono: 'ðŸ§®',
    titulo: 'Calculadora de intereses de demora',
    desc: 'FÃ³rmula exacta y tabla con ejemplos segÃºn importe y dÃ­as vencidos. Tipo 2026.',
    enlace: '/blog/calcular-intereses-demora-factura-impagada',
    cta: 'Calcular',
  },
  {
    icono: 'âš–ï¸',
    titulo: 'GuÃ­a del procedimiento monitorio',
    desc: 'Paso a paso para reclamar judicialmente sin abogado (deudas < 2.000â‚¬).',
    enlace: '/blog/procedimiento-monitorio-reclamar-deuda',
    cta: 'Leer guÃ­a',
  },
  {
    icono: 'ðŸ“‹',
    titulo: 'Ley 3/2004 explicada en 8 minutos',
    desc: 'Plazos, intereses, indemnizaciÃ³n 40â‚¬ y aplicaciÃ³n prÃ¡ctica con ejemplos.',
    enlace: '/blog/ley-3-2004-morosidad-explicada',
    cta: 'Leer guÃ­a',
  },
  {
    icono: 'ðŸ—“',
    titulo: 'Calendario de reclamaciÃ³n de impagados',
    desc: 'Las 7 fases de cobro: del dÃ­a 1 al procedimiento monitorio. Plantilla de seguimiento.',
    enlace: '/blog/como-cobrar-cliente-moroso',
    cta: 'Ver calendario',
  },
]

export default function PageRecursos() {
  return (
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Recursos gratis para cobrar tus facturas</h1>
        <p className="text-xl text-zinc-400 leading-relaxed">Plantillas, modelos legales y calculadoras 100% gratis. Sin registro ni email. CÃ³pialos y Ãºsalos en tu negocio.</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {recursos.map((r) => (
            <Link key={r.titulo} href={r.enlace} className="block bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-sky-500/40 transition-all">
              <p className="text-3xl mb-3">{r.icono}</p>
              <h2 className="text-xl font-bold text-zinc-100 mb-2">{r.titulo}</h2>
              <p className="text-zinc-400 text-sm mb-4">{r.desc}</p>
              <p className="text-sky-400 text-sm font-medium">{r.cta} â†’</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Â¿Quieres que esto lo haga la IA por ti?</h2>
          <p className="text-zinc-400 mb-6">Saldea hace todo lo que ves aquÃ­ automÃ¡ticamente: manda los emails, calcula intereses, escala el tono y detecta respuestas.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar 1 mes gratis â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  )
}
