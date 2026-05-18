import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea para gestorÃ­as y asesorÃ­as: cobra las facturas de tus clientes sin perseguir',
  description: 'Software de gestiÃ³n de cobros pensado para gestorÃ­as y asesorÃ­as espaÃ±olas. Automatiza los recordatorios de tus clientes con IA. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/gestorias' },
  keywords: [
    'software gestorÃ­a cobros',
    'gestiÃ³n cobros gestorÃ­a',
    'asesorÃ­a reclamar facturas',
    'software gestorÃ­a 2026',
    'herramienta morosos gestorÃ­a',
    'cobro facturas para gestores',
  ],
  openGraph: {
    title: 'Saldea para gestorÃ­as: cobra las facturas de tus clientes sin perseguir',
    description: 'Automatiza los recordatorios de tus clientes con IA. 1 mes gratis.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function PageGestorias() {
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

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
          Pensado para gestorÃ­as y asesorÃ­as espaÃ±olas
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Cobra las facturas de tus clientes <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">sin perseguir a nadie</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Saldea es la IA que persigue a los morosos de tus clientes 24/7. Mensajes personalizados que escalan en tono, detecciÃ³n automÃ¡tica de respuestas, y todo cumpliendo la Ley 3/2004.
        </p>
        <Link href="/registro" className="inline-flex items-center gap-2 bg-sky-500 text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/30">
          Empezar 1 mes gratis â†’
        </Link>
        <p className="text-xs text-zinc-500 mt-4">Sin tarjeta hasta el dÃ­a 31 Â· Cancela en 1 clic Â· Sin permanencia</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Los 3 dolores que resolvemos a gestorÃ­as</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <p className="text-3xl mb-3">ðŸ˜©</p>
            <h3 className="font-bold text-zinc-100 mb-2">"Mis clientes no cobran"</h3>
            <p className="text-zinc-400 text-sm">El 25% de las facturas de tus clientes se pagan tarde. TÃº lo sabes pero no tienes tiempo de reclamar por ellos.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <p className="text-3xl mb-3">â°</p>
            <h3 className="font-bold text-zinc-100 mb-2">"No tengo tiempo de perseguir"</h3>
            <p className="text-zinc-400 text-sm">Reclamar facturas a mano son 2-3 horas/semana por cliente. Con 20 clientes son 50 horas al mes que no facturas.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <p className="text-3xl mb-3">ðŸ“ž</p>
            <h3 className="font-bold text-zinc-100 mb-2">"Encima me llaman a mÃ­"</h3>
            <p className="text-zinc-400 text-sm">Los clientes te llaman pidiendo ayuda cuando tienen un moroso. TÃº no eres abogado de cobros.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">CÃ³mo te ayuda Saldea</h2>
        <div className="space-y-5">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">1ï¸âƒ£</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">Importas las facturas de tus clientes</h3>
              <p className="text-zinc-400 text-sm">CSV, manual o conectando con su software de facturaciÃ³n.</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">2ï¸âƒ£</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">La IA manda los recordatorios</h3>
              <p className="text-zinc-400 text-sm">DÃ­a 1 amable, dÃ­a 7 firme, dÃ­a 30 formal con Ley 3/2004, dÃ­a 60 previo a burofax. TÃº no haces nada.</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">3ï¸âƒ£</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">Detecta respuestas automÃ¡ticamente</h3>
              <p className="text-zinc-400 text-sm">Si el moroso paga, dispute o promete pago, Saldea lo entiende y pausa los recordatorios. Solo te avisa cuando hace falta.</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">4ï¸âƒ£</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">Tu cliente paga, tÃº quedas como un hÃ©roe</h3>
              <p className="text-zinc-400 text-sm">Sin escalado emocional, sin perseguir, sin gastar 2 horas semanales por cliente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Precio para gestorÃ­as</h2>
        <div className="bg-zinc-900/40 border border-sky-500/30 rounded-2xl p-8 text-center">
          <p className="text-zinc-400 mb-2">Plan Pro</p>
          <p className="text-5xl font-bold text-zinc-100 mb-2">49â‚¬<span className="text-xl text-zinc-500">/mes</span></p>
          <p className="text-sky-400 font-semibold mb-6">o 499â‚¬/aÃ±o (ahorras 89â‚¬)</p>
          <ul className="text-left max-w-md mx-auto space-y-3 text-zinc-300 mb-8">
            <li>âœ“ Facturas ilimitadas</li>
            <li>âœ“ Hasta 10 miembros de tu equipo</li>
            <li>âœ“ IA Claude para escalado de tono</li>
            <li>âœ“ DetecciÃ³n de respuestas con IA</li>
            <li>âœ“ Stripe Connect para cobros</li>
            <li>âœ“ Plantillas personalizables</li>
            <li>âœ“ Datos en servidores europeos (RGPD)</li>
            <li>âœ“ Soporte en espaÃ±ol</li>
          </ul>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all">Empezar 1 mes gratis â†’</Link>
          <p className="text-xs text-zinc-500 mt-4">Sin tarjeta hasta el dÃ­a 31. Cancela cuando quieras.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes de gestorÃ­as</h2>
        <div className="text-left space-y-4 mt-8">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">Â¿Puedo gestionar varios clientes desde la misma cuenta?</h3>
            <p className="text-zinc-400 text-sm">SÃ­. Saldea soporta multi-empresa: tÃº creas una organizaciÃ³n por cada cliente y gestionas todas desde tu login.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">Â¿Mi cliente puede ver lo que hace Saldea?</h3>
            <p className="text-zinc-400 text-sm">SÃ­. Puedes invitar a tu cliente como "lectura" para que vea el histÃ³rico sin poder modificar nada.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">Â¿Cumple Ley 3/2004 y RGPD?</h3>
            <p className="text-zinc-400 text-sm">100%. Los recordatorios citan la Ley 3/2004 automÃ¡ticamente y los 40â‚¬ de indemnizaciÃ³n. Los datos estÃ¡n en servidores europeos.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">Â¿Y si mi cliente no quiere que su moroso reciba emails automÃ¡ticos?</h3>
            <p className="text-zinc-400 text-sm">Saldea no manda nada sin que el cliente firme la activaciÃ³n. TÃº o tu cliente decidÃ­s cuÃ¡ndo empezar y podÃ©is pausar en 1 clic.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-sky-500/20 to-transparent border border-sky-500/30 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">Tu gestorÃ­a se merece esto</h2>
          <p className="text-zinc-300 mb-6">Deja de perder horas reclamando facturas de tus clientes. Que lo haga la IA.</p>
          <Link href="/registro" className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all">Empezar 1 mes gratis â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  )
}
