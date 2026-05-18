import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Contasimple: facturaciÃ³n vs cobros automÃ¡ticos 2026',
  description: 'Contasimple es gratis para autÃ³nomos pequeÃ±os. Saldea automatiza cobros con IA. Comparativa honesta: cuÃ¡ndo usar cada uno.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-contasimple' },
  keywords: ['saldea vs contasimple', 'contasimple cobros', 'alternativa contasimple', 'contasimple vs saldea'],
  openGraph: { title: 'Saldea vs Contasimple', description: 'Comparativa honesta.', type: 'article', locale: 'es_ES' },
}

export default function PageVsContasimple() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link></div>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa Â· 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Contasimple</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Contasimple es uno de los softwares de facturaciÃ³n gratuitos mÃ¡s usados por autÃ³nomos en EspaÃ±a. Saldea es la IA que persigue los cobros. Veamos cuÃ¡ndo conviene cada uno.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Contasimple:</strong> facturaciÃ³n gratis para autÃ³nomos pequeÃ±os. Libros de IVA bÃ¡sicos, modelo 130/303.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> NO emite facturas. Persigue las que ya has emitido cuando el cliente se retrasa.</p>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">FunciÃ³n</th><th className="py-3 px-4 text-left text-zinc-100">Saldea</th><th className="py-3 px-4 text-left text-zinc-100">Contasimple</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Emitir facturas</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ… Gratis</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Libros de IVA</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Modelos AEAT</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ… Plan Pro</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios IA</td><td className="py-2 px-4">âœ… Claude</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">âœ…</td><td className="py-2 px-4">BÃ¡sico</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plan gratis</td><td className="py-2 px-4">3 facturas</td><td className="py-2 px-4">Ilimitado</td></tr>
                <tr><td className="py-2 px-4">Plan Pro</td><td className="py-2 px-4">49â‚¬/mes</td><td className="py-2 px-4">~10-20â‚¬/mes</td></tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack autÃ³nomo low-cost: Contasimple + Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si eres autÃ³nomo con presupuesto ajustado:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ <strong>Contasimple gratis</strong> â†’ emites facturas, llevas libro IVA</li>
            <li>âœ“ <strong>Saldea 49â‚¬/mes</strong> â†’ automatiza cobros cuando se retrasen</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Total: ~49â‚¬/mes para tener todo el ciclo desde la emisiÃ³n hasta el cobro persiguiendo morosos automÃ¡ticamente.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo solo necesitas Contasimple</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ AutÃ³nomo reciÃ©n empezando</li>
            <li>âœ“ Tus clientes pagan rÃ¡pido</li>
            <li>âœ“ Volumen bajo (1-3 facturas/mes)</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo aÃ±adir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Tu cliente paga tarde habitualmente</li>
            <li>âœ“ Tienes facturas vencidas pendientes</li>
            <li>âœ“ Dedicas tiempo a reclamar manualmente</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">MantÃ©n Contasimple, aÃ±ade Saldea</h3>
          <p className="text-zinc-300 mb-5">Importa CSV desde Contasimple. Saldea persigue las facturas vencidas. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis â†’</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  )
}
