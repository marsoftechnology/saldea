import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Quipu: comparativa de cobros y facturaciÃ³n 2026',
  description: 'Quipu factura, Saldea cobra. AnÃ¡lisis honesto: para quÃ© sirve cada uno, precios y por quÃ© probablemente quieras ambos.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-quipu' },
  keywords: [
    'saldea vs quipu',
    'quipu cobros',
    'alternativa quipu',
    'quipu vs saldea cobros',
    'mejor software facturas autonomos',
  ],
  openGraph: {
    title: 'Saldea vs Quipu: comparativa honesta 2026',
    description: 'Quipu factura, Saldea cobra. AnÃ¡lisis claro.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageVsQuipu() {
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

      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa Â· 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Saldea vs Quipu: Â¿cuÃ¡l te conviene?</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Spoiler: probablemente quieras ambos. Te explico por quÃ©.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">ConclusiÃ³n rÃ¡pida</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Quipu:</strong> software de facturaciÃ³n + contabilidad bÃ¡sica para autÃ³nomos y pymes espaÃ±olas. Su fuerte: emitir facturas legales, llevar libro de IVA, presentar modelos.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> NO emite facturas. Lo que hace es PERSEGUIR el cobro de las facturas que ya emitiste con IA y secuencias automÃ¡ticas.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">No son competencia, son complementarios</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Esta es la verdad incÃ³moda: Quipu y Saldea no compiten. Quipu te ayuda a EMITIR facturas legales. Saldea te ayuda a COBRARLAS cuando el cliente se retrasa. Usar ambos a la vez es como tener un fontanero Y un electricista en casa: hacen cosas distintas.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa funcional</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">FunciÃ³n</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Quipu</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Emitir facturas legales</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Libro de IVA</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Modelos 303/130</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios automÃ¡ticos</td><td className="py-2 px-4">âœ… con IA escalada</td><td className="py-2 px-4">BÃ¡sicos, manuales</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">DetecciÃ³n respuestas IA</td><td className="py-2 px-4">âœ… Claude</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Escalado de tono</td><td className="py-2 px-4">âœ… 4 niveles</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cita Ley 3/2004 + intereses</td><td className="py-2 px-4">âœ… automÃ¡tico</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">âœ…</td><td className="py-2 px-4">Pasarela bÃ¡sica</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio entry</td><td className="py-2 px-4">49â‚¬/mes</td><td className="py-2 px-4">19â‚¬/mes</td></tr>
                <tr><td className="py-2 px-4">Trial gratis</td><td className="py-2 px-4">30 dÃ­as sin tarjeta</td><td className="py-2 px-4">15 dÃ­as con tarjeta</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack ideal del autÃ³nomo en 2026</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si quieres montar el flujo completo de facturaciÃ³n + cobro automÃ¡tico, la combinaciÃ³n mÃ¡s eficiente es:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ <strong>Quipu</strong> (~29â‚¬/mes) â†’ emites las facturas legales, llevas IVA, presentas modelos</li>
            <li>âœ“ <strong>Saldea</strong> (49â‚¬/mes) â†’ cuando una factura se retrasa, la IA persigue el cobro</li>
            <li>âœ“ <strong>Stripe Connect</strong> integrado en Saldea â†’ los cobros aparecen automÃ¡ticamente</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Total: ~78â‚¬/mes para automatizar toda la cadena de facturaciÃ³n a cobro. Te ahorras 5-10 horas/mes de trabajo manual.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo solo necesitas Quipu</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Eres autÃ³nomo reciÃ©n empezando y casi nunca tienes morosos</li>
            <li>âœ“ Trabajas con particulares que pagan al instante</li>
            <li>âœ“ Tu volumen de facturas es bajo (1-3 al mes)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo necesitas Saldea ademÃ¡s</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Facturas a empresas y autÃ³nomos que se retrasan</li>
            <li>âœ“ Dedicas mÃ¡s de 2 horas/semana a reclamar cobros</li>
            <li>âœ“ Quieres que la IA escale el tono sin que tÃº lo redactes</li>
            <li>âœ“ Tienes 5+ facturas vencidas pendientes ahora mismo</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Prueba Saldea junto con tu Quipu actual</h3>
          <p className="text-zinc-300 mb-5">Importa las facturas vencidas de Quipu (CSV o manual) y deja que Saldea las persiga. <strong>1 mes gratis sin tarjeta</strong>.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis â†’</Link>
        </aside>
      </article>

      <MarketingFooter />
    </div>
  )
}
