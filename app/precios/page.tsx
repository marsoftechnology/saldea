import Link from 'next/link'
import type { Metadata } from 'next'
import ThemeToggleNav from '../components/ThemeToggleNav'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Precios de Saldea: 49€/mes o 499€/año · 1 mes gratis | Saldea',
  description: 'Precios transparentes de Saldea: plan Free, Pro Mensual (49€) y Pro Anual (499€, ahorras 89€). 1 mes gratis sin tarjeta. Cancela en 1 clic.',
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
    title: 'Precios de Saldea — 49€/mes o 499€/año',
    description: '1 mes gratis sin tarjeta. Cancela cuando quieras.',
    type: 'website',
    locale: 'es_ES',
  },
}

const schemaProduct = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Saldea',
  description: 'IA que automatiza el cobro de facturas impagadas para autónomos y pymes españolas.',
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
      description: 'Ahorras 89€ respecto al mensual',
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
              <ThemeToggleNav />
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
              <p className="text-4xl font-bold text-zinc-100 mb-1">0€<span className="text-base text-zinc-500">/mes</span></p>
              <p className="text-zinc-500 text-sm mb-6">Para probar sin compromiso</p>
              <ul className="space-y-2 text-zinc-300 text-sm mb-8">
                <li>✓ 3 facturas activas</li>
                <li>✓ 10 clientes</li>
                <li>✓ 30 emails/mes</li>
                <li>✓ 1 tono de mensaje</li>
                <li>✓ 1 único miembro</li>
                <li className="text-zinc-500">✗ Sin Stripe Connect</li>
                <li className="text-zinc-500">✗ Sin IA en respuestas</li>
              </ul>
              <Link href="/registro" className="block w-full text-center bg-zinc-800 text-zinc-200 py-3 rounded-lg font-bold hover:bg-zinc-700 transition-colors">Empezar gratis</Link>
            </div>

            <div className="bg-gradient-to-br from-sky-500/20 to-transparent border-2 border-sky-500/50 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full">MÁS POPULAR</div>
              <p className="text-sky-400 text-sm mb-1 font-semibold">Pro Mensual</p>
              <p className="text-4xl font-bold text-zinc-100 mb-1">49€<span className="text-base text-zinc-500">/mes</span></p>
              <p className="text-zinc-500 text-sm mb-6">1 mes gratis sin tarjeta</p>
              <ul className="space-y-2 text-zinc-300 text-sm mb-8">
                <li>✓ Facturas ilimitadas</li>
                <li>✓ Clientes ilimitados</li>
                <li>✓ Emails ilimitados</li>
                <li>✓ 4 tonos (amable, firme, formal, extremo)</li>
                <li>✓ Hasta 10 miembros</li>
                <li>✓ IA Claude para respuestas</li>
                <li>✓ Stripe Connect (cobros automáticos)</li>
                <li>✓ Adjuntos PDF en emails</li>
                <li>✓ Soporte prioritario</li>
              </ul>
              <Link href="/registro?plan=mes" className="block w-full text-center bg-sky-500 text-zinc-900 py-3 rounded-lg font-bold hover:bg-sky-400 transition-colors">Probar 1 mes gratis</Link>
            </div>

            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <p className="text-emerald-400 text-sm mb-1 font-semibold">Pro Anual</p>
              <p className="text-4xl font-bold text-zinc-100 mb-1">499€<span className="text-base text-zinc-500">/año</span></p>
              <p className="text-emerald-400 text-sm mb-6 font-semibold">Ahorras 89€ (15%)</p>
              <ul className="space-y-2 text-zinc-300 text-sm mb-8">
                <li>✓ Todo lo del plan Pro Mensual</li>
                <li>✓ Equivalente a 41,58€/mes</li>
                <li>✓ Cobro único, sin renovación automática</li>
                <li>✓ Si cancelas antes, devolución proporcional</li>
                <li>✓ Soporte premium</li>
              </ul>
              <Link href="/registro?plan=anio" className="block w-full text-center bg-zinc-800 text-zinc-100 border border-emerald-500/30 py-3 rounded-lg font-bold hover:bg-zinc-700 transition-colors">Pagar 499€ y empezar</Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">💳 ¿Hay que poner tarjeta?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Sí en el plan mensual, pero NO se cobra nada hasta el día 31. Puedes cancelar antes en 1 clic y no pagas. En el anual el cobro es inmediato.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">⛔ ¿Hay permanencia?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">No. Cancelas cuando quieras desde tu panel de ajustes. Sin llamadas, sin trámites, sin justificaciones.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">📈 ¿Hay coste por cobro?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Saldea NO se queda ninguna comisión de tus cobros. Las comisiones que paga es Stripe directamente (1,5% + 0,25€ por cobro europeo) y son por tu cuenta.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">🇪🇸 ¿IVA incluido?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">El precio mostrado es IVA INCLUIDO. Si eres autónomo o empresa con CIF, Saldea emite factura nominal para que puedas deducir el IVA.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">🔄 ¿Cambio de plan?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Puedes pasar de mensual a anual cuando quieras (te lo prorrateamos). De anual a mensual al final del año. De Free a Pro en el momento.</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-zinc-100 mb-3">👥 ¿Plan empresa / despacho?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Si eres una gestoría con +10 miembros o un despacho grande, escríbenos a <a href="mailto:hola@marsof.es" className="text-sky-400 underline">hola@marsof.es</a> para hablar de un plan personalizado.</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-100 mb-3">¿Sigues con dudas?</h2>
            <p className="text-zinc-400 mb-6">Tienes 1 mes para probarlo sin coste. Si no te encaja, cancela en 1 clic.</p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-8 py-4 rounded-xl hover:bg-sky-400 transition-colors">Empezar 1 mes gratis →</Link>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </>
  )
}
