import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Precios de Saldea: 49â‚¬/mes o 499â‚¬/aÃ±o Â· 1 mes gratis | Saldea',
  description: 'Precios transparentes de Saldea: plan Free, Pro Mensual (49â‚¬) y Pro Anual (499â‚¬, ahorras 89â‚¬). 1 mes gratis sin tarjeta. Cancela en 1 clic.',
  alternates: { canonical: 'https://marsof.es/precios' },
  keywords: [
    'precio saldea',
    'cuanto cuesta saldea',
    'tarifas saldea',
    'plan pro saldea',
    'saldea gratis',
    'precio software cobros',
  ],
  openGraph: {
    title: 'Precios de Saldea â€” 49â‚¬/mes o 499â‚¬/aÃ±o',
    description: '1 mes gratis sin tarjeta. Cancela cuando quieras.',
    type: 'website',
    locale: 'es_ES',
  },
}

const schemaProduct = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Saldea',
  description: 'IA que automatiza el cobro de facturas impagadas para autÃ³nomos y pymes espaÃ±olas.',
  brand: { '@type': 'Brand', name: 'Marsof' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Plan Free',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Hasta 3 facturas activas, 10 clientes, 30 emails/mes',
    },
    {
      '@type': 'Offer',
      name: 'Plan Pro Mensual',
      price: '49',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Facturas ilimitadas, IA Claude, Stripe Connect, 10 miembros equipo',
    },
    {
      '@type': 'Offer',
      name: 'Plan Pro Anual',
      price: '499',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Ahorras 89â‚¬ respecto al mensual',
    },
  ],
}

export default function PagePrecios() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />

      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
            <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Precios simples y transparentes</h1>
            <p className="text-zinc-400 text-lg">Sin permanencia. Sin sorpresas. Cancela en 1 clic.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-1">Free</p>
              <p className="text-4xl font-bold text-zinc-100 mb-1">0â‚¬<span className="text-base text-zinc-500">/mes</span></p>
              <p className="text-zinc-500 text-sm mb-6">Para probar sin compromiso</p>
              <ul className="space-y-2 text-zinc-300 text-sm mb-8">
                <li>âœ“ 3 facturas activas</li>
                <li>âœ“ 10 clientes</li>
                <li>âœ“ 30 emails/mes</li>
                <li>âœ“ 1 tono de mensaje</li>
                <li>âœ“ 1 Ãºnico miembro</li>
                <li className="text-zinc-500">âœ— Sin Stripe Connect</li>
                <li className="text-zinc-500">âœ— Sin IA en respuestas</li>
              </ul>
              <Link href="/registro" className="block w-full text-center bg-zinc-800 text-zinc-200 py-3 rounded-lg font-bold hover:bg-zinc-700 transition-colors">Empezar gratis</Link>
            </div>

            <div className="bg-gradient-to-br from-sky-500/20 to-transparent border-2 border-sky-500/50 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full">MÃS POPULAR</div>
              <p className="text-sky-400 text-sm mb-1 font-semibold">Pro Mensual</p>
              <p className="text-4xl font-bold text-zinc-100 mb-1">49â‚¬<span className="text-base text-zinc-500">/mes</span></p>
              <p className="text-zinc-500 text-sm mb-6">1 mes gratis sin tarjeta</p>
              <ul className="space-y-2 text-zinc-300 text-sm mb-8">
                <li>âœ“ Facturas ilimitadas</li>
                <li>âœ“ Clientes ilimitados</li>
                <li>âœ“ Emails ilimitados</li>
                <li>âœ“ 4 tonos (amable, firme, formal, extremo)</li>
                <li>âœ“ Hasta 10 miembros</li>
                <li>âœ“ IA Claude para respuestas</li>
                <li>âœ“ Stripe Connect (cobros automÃ¡ticos)</li>
                <li>âœ“ Adjuntos PDF en emails</li>
                <li>âœ“ Soporte prioritario</li>
              </ul>
              <Link href="/registro?plan=mes" className="block w-full text-center bg-sky-500 text-zinc-900 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors">Probar 1 mes gratis</Link>
            </div>

            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <p className="text-emerald-400 text-sm mb-1 font-semibold">Pro Anual</p>
              <p className="text-4xl font-bold text-zinc-100 mb-1">499â‚¬<span className="text-base text-zinc-500">/aÃ±o</span></p>
              <p className="text-emerald-400 text-sm mb-6 font-semibold">Ahorras 89â‚¬ (15%)</p>
              <ul className="space-y-2 text-zinc-300 text-sm mb-8">
                <li>âœ“ Todo lo del plan Pro Mensual</li>
                <li>âœ“ Equivalente a 41,58â‚¬/mes</li>
                <li>âœ“ Cobro Ãºnico, sin renovaciÃ³n automÃ¡tica</li>
                <li>âœ“ Si cancelas antes, devoluciÃ³n proporcional</li>
                <li>âœ“ Soporte premium</li>
              </ul>
              <Link href="/registro?plan=anio" className="block w-full text-center bg-zinc-800 text-zinc-100 border border-emerald-500/30 py-3 rounded-lg font-bold hover:bg-zinc-700 transition-colors">Pagar 499â‚¬ y empezar</Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">ðŸ’³ Â¿Hay que poner tarjeta?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">SÃ­ en el plan mensual, pero NO se cobra nada hasta el dÃ­a 31. Puedes cancelar antes en 1 clic y no pagas. En el anual el cobro es inmediato.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">â›” Â¿Hay permanencia?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">No. Cancelas cuando quieras desde tu panel de ajustes. Sin llamadas, sin trÃ¡mites, sin justificaciones.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">ðŸ“ˆ Â¿Hay coste por cobro?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Saldea NO se queda ninguna comisiÃ³n de tus cobros. Las comisiones que paga es Stripe directamente (1,5% + 0,25â‚¬ por cobro europeo) y son por tu cuenta.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">ðŸ‡ªðŸ‡¸ Â¿IVA incluido?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">El precio mostrado es IVA INCLUIDO. Si eres autÃ³nomo o empresa con CIF, Saldea emite factura nominal para que puedas deducir el IVA.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">ðŸ”„ Â¿Cambio de plan?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Puedes pasar de mensual a anual cuando quieras (te lo prorrateamos). De anual a mensual al final del aÃ±o. De Free a Pro en el momento.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">ðŸ‘¥ Â¿Plan empresa / despacho?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Si eres una gestorÃ­a con +10 miembros o un despacho grande, escrÃ­benos a <a href="mailto:hola@marsof.es" className="text-sky-400 underline">hola@marsof.es</a> para hablar de un plan personalizado.</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-100 mb-3">Â¿Sigues con dudas?</h2>
            <p className="text-zinc-400 mb-6">Tienes 1 mes para probarlo sin coste. Si no te encaja, cancela en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-8 py-4 rounded-xl hover:bg-sky-400 transition-colors">Empezar 1 mes gratis â†’</Link>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </>
  )
}
