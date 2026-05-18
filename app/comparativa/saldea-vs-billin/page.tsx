import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Billin: facturaciÃ³n vs cobros automÃ¡ticos 2026',
  description: 'Billin factura, Saldea cobra. Comparativa honesta: precio, funciones y por quÃ© usar ambos en autÃ³nomos y pymes espaÃ±olas.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-billin' },
  keywords: ['saldea vs billin', 'billin cobros', 'alternativa billin', 'mejor software autonomos', 'billin vs saldea'],
  openGraph: { title: 'Saldea vs Billin: comparativa 2026', description: 'FacturaciÃ³n + cobros automÃ¡ticos.', type: 'article', locale: 'es_ES' },
}

export default function PageVsBillin() {
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
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa Â· 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Billin</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Billin emite facturas legales. Saldea persigue los cobros con IA. Son herramientas que cubren etapas distintas. AquÃ­ va el anÃ¡lisis.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Billin:</strong> software de facturaciÃ³n gratuito (con planes de pago) para autÃ³nomos. Buenas plantillas, fÃ¡cil de usar, Veri*factu homologado.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> NO emite facturas. PERSIGUE las facturas que ya emitiste con IA cuando el cliente se retrasa.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa funcional</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">FunciÃ³n</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Billin</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Emitir facturas</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios automÃ¡ticos</td><td className="py-2 px-4">âœ… con IA</td><td className="py-2 px-4">BÃ¡sicos (manuales)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Escalado tono IA</td><td className="py-2 px-4">âœ… 4 niveles</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">DetecciÃ³n respuestas</td><td className="py-2 px-4">âœ… Claude</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">âœ… nativo</td><td className="py-2 px-4">Parcial</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plan gratis</td><td className="py-2 px-4">Limitado (3 facturas)</td><td className="py-2 px-4">SÃ­ (con lÃ­mites)</td></tr>
                <tr><td className="py-2 px-4">Plan Pro</td><td className="py-2 px-4">49â‚¬/mes</td><td className="py-2 px-4">~15-30â‚¬/mes</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack perfecto del autÃ³nomo: Billin + Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si eres autÃ³nomo en EspaÃ±a, esta combinaciÃ³n es de las mÃ¡s eficientes:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ <strong>Billin gratis o ~15â‚¬/mes</strong> â†’ emites facturas, cumples Veri*factu, llevas libro IVA</li>
            <li>âœ“ <strong>Saldea 49â‚¬/mes</strong> â†’ automatiza la persecuciÃ³n de cobros con IA</li>
            <li>Total: ~65â‚¬/mes para tener todo el ciclo desde la emisiÃ³n hasta el cobro</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo solo necesitas Billin</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ AutÃ³nomo principiante con pocos clientes</li>
            <li>âœ“ Tus clientes pagan rÃ¡pido (B2C o domiciliaciÃ³n SEPA)</li>
            <li>âœ“ Volumen bajo (1-3 facturas/mes)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo aÃ±adir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Facturas a empresas que pagan tarde</li>
            <li>âœ“ MÃ¡s de 5 facturas/mes</li>
            <li>âœ“ Dedicas tiempo a perseguir cobros manualmente</li>
            <li>âœ“ Tienes facturas vencidas pendientes ahora mismo</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Conecta Billin + Saldea hoy</h3>
          <p className="text-zinc-300 mb-5">Importa CSV desde Billin. Saldea persigue. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis â†’</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  )
}
