import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Zoho Books: ERP global vs cobros locales 2026',
  description: 'Zoho Books es contabilidad internacional. Saldea es IA espaÃ±ola de cobros. AnÃ¡lisis honesto y por quÃ© Saldea encaja mejor para el mercado espaÃ±ol.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-zoho' },
  keywords: ['saldea vs zoho', 'zoho books cobros', 'alternativa zoho', 'zoho vs saldea espaÃ±ol'],
  openGraph: { title: 'Saldea vs Zoho Books', description: 'ERP global vs cobros locales.', type: 'article', locale: 'es_ES' },
}

export default function PageVsZoho() {
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Zoho Books</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Zoho Books es una suite contable global. Saldea estÃ¡ pensado 100% para el mercado espaÃ±ol. AnÃ¡lisis honesto.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Zoho Books:</strong> contabilidad SaaS multinacional. Funciona en 180 paÃ­ses. Ãštil si tienes operaciones internacionales.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> SaaS espaÃ±ol 100% enfocado en cobros automÃ¡ticos con IA. Conoce Ley 3/2004 y Veri*factu de forma nativa.</p>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">FunciÃ³n</th><th className="py-3 px-4 text-left text-zinc-100">Saldea</th><th className="py-3 px-4 text-left text-zinc-100">Zoho Books</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Origen</td><td className="py-2 px-4">EspaÃ±a (Marsof)</td><td className="py-2 px-4">India (Zoho)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Soporte espaÃ±ol</td><td className="py-2 px-4">âœ… Nativo</td><td className="py-2 px-4">Limitado</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Ley 3/2004</td><td className="py-2 px-4">âœ… AutomÃ¡tico</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">N/A (no factura)</td><td className="py-2 px-4">Pendiente</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios IA</td><td className="py-2 px-4">âœ… Claude</td><td className="py-2 px-4">BÃ¡sicos</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Datos en Europa</td><td className="py-2 px-4">âœ… Frankfurt</td><td className="py-2 px-4">Multinacional</td></tr>
                <tr><td className="py-2 px-4">Precio</td><td className="py-2 px-4">49â‚¬/mes</td><td className="py-2 px-4">~20-200â‚¬/mes segÃºn plan</td></tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo elegir Zoho Books</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Empresa con operaciones internacionales (USA, UK, India)</li>
            <li>âœ“ Necesitas suite contable integrada con CRM, ventas, RRHH (Zoho One)</li>
            <li>âœ“ Eres equipo bilingÃ¼e y no te molesta soporte en inglÃ©s</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo elegir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Operas principalmente en EspaÃ±a</li>
            <li>âœ“ Tu problema son las facturas vencidas, no la contabilidad</li>
            <li>âœ“ Quieres soporte y producto en espaÃ±ol sin desfase horario</li>
            <li>âœ“ Necesitas que los recordatorios <strong>citen automÃ¡ticamente la Ley 3/2004</strong></li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El argumento decisivo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu cliente es espaÃ±ol, lo que mÃ¡s le mueve es que el recordatorio cite especÃ­ficamente la <strong>Ley 3/2004</strong> y los intereses concretos. Zoho no lo hace nativamente. Saldea sÃ­, en cada email. La diferencia se nota en la tasa de cobro real.</p>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea + Zoho Books pueden convivir</h3>
          <p className="text-zinc-300 mb-5">Si ya usas Zoho para contabilidad internacional, Saldea complementa con cobros automÃ¡ticos para EspaÃ±a. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis â†’</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  )
}
