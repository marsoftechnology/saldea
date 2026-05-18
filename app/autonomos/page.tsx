import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea para autÃ³nomos: cobra tus facturas sin perseguir a clientes',
  description: 'La herramienta que persigue tus facturas impagadas por ti con IA. Pensada para autÃ³nomos y freelancers espaÃ±oles. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/autonomos' },
  keywords: [
    'cobrar facturas autÃ³nomo',
    'autÃ³nomo morosos',
    'reclamar factura cliente autÃ³nomo',
    'software autÃ³nomos cobros',
    'app autÃ³nomo facturas',
    'recuperar dinero cliente autÃ³nomo',
  ],
  openGraph: {
    title: 'Saldea para autÃ³nomos: cobra tus facturas sin perseguir a clientes',
    description: 'Automatiza los recordatorios con IA. 1 mes gratis.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function PageAutonomos() {
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
          Hecho para autÃ³nomos y freelancers
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Cobra a tiempo, <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">sin parecer pesado</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Saldea persigue por ti las facturas que tus clientes "se olvidan" de pagar. Con IA que escala el tono sin perder educaciÃ³n. TÃº facturas, ellos pagan.
        </p>
        <Link href="/registro" className="inline-flex items-center gap-2 bg-sky-500 text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/30">
          Empezar 1 mes gratis â†’
        </Link>
        <p className="text-xs text-zinc-500 mt-4">Sin tarjeta hasta el dÃ­a 31 Â· Cancela en 1 clic</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Por quÃ© autÃ³nomos eligen Saldea</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-zinc-100 mb-3">ðŸ§˜ Te quita la incomodidad</h3>
            <p className="text-zinc-400 text-sm">Mandar emails de "oye, Â¿y mi pago?" a un cliente con el que trabajas regularmente es violento. Saldea lo hace por ti con tono profesional.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-zinc-100 mb-3">â± Te ahorra horas</h3>
            <p className="text-zinc-400 text-sm">Revisar facturas vencidas, redactar emails, hacer seguimiento... son 3-5 horas al mes que NO facturas. Saldea lo automatiza.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-zinc-100 mb-3">ðŸ’° Cobras mÃ¡s rÃ¡pido</h3>
            <p className="text-zinc-400 text-sm">Cuando un cliente recibe recordatorios automÃ¡ticos y citas la Ley 3/2004, el pago aparece en 3-5 dÃ­as.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-zinc-100 mb-3">ðŸ›¡ Sin romper relaciones</h3>
            <p className="text-zinc-400 text-sm">El tono empieza amable y solo sube si el cliente no responde. La relaciÃ³n comercial se mantiene.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Tu rutina con Saldea</h2>
        <div className="space-y-4">
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5">
            <p className="text-zinc-300"><strong className="text-sky-400">Lunes:</strong> Facturas tu trabajo del mes. Suelta los PDFs en Saldea.</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5">
            <p className="text-zinc-300"><strong className="text-sky-400">DÃ­a 1 de vencimiento:</strong> Saldea manda recordatorio amable. TÃº no haces nada.</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5">
            <p className="text-zinc-300"><strong className="text-sky-400">DÃ­a 7:</strong> Si no ha pagado, Saldea sube el tono.</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5">
            <p className="text-zinc-300"><strong className="text-sky-400">Cliente responde:</strong> Saldea entiende si paga, dispute o promete pago. Pausa o continÃºa segÃºn corresponda.</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5">
            <p className="text-zinc-300"><strong className="text-sky-400">Cliente paga:</strong> Saldea detecta el cobro vÃ­a Stripe Connect. Caso cerrado.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Precio simple</h2>
        <div className="bg-zinc-900/40 border border-sky-500/30 rounded-2xl p-8 text-center">
          <p className="text-zinc-400 mb-2">Plan Pro</p>
          <p className="text-5xl font-bold text-zinc-100 mb-2">49â‚¬<span className="text-xl text-zinc-500">/mes</span></p>
          <p className="text-sky-400 font-semibold mb-6">o 499â‚¬/aÃ±o (ahorras casi 2 meses)</p>
          <ul className="text-left max-w-md mx-auto space-y-3 text-zinc-300 mb-8">
            <li>âœ“ Facturas ilimitadas</li>
            <li>âœ“ IA Claude para recordatorios</li>
            <li>âœ“ DetecciÃ³n de respuestas</li>
            <li>âœ“ Stripe Connect (cobros automÃ¡ticos)</li>
            <li>âœ“ Soporte en espaÃ±ol</li>
          </ul>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all">Empezar 1 mes gratis â†’</Link>
          <p className="text-xs text-zinc-500 mt-4">Sin tarjeta Â· Cancela cuando quieras</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-sky-500/20 to-transparent border border-sky-500/30 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">Deja de mendigar tu propio dinero</h2>
          <p className="text-zinc-300 mb-6">Tu trabajo ya lo hiciste. Saldea hace que te paguen por Ã©l.</p>
          <Link href="/registro" className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all">Empezar 1 mes gratis â†’</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  )
}
