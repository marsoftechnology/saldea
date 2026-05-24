import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Zoho Books: ERP global vs cobros locales 2026',
  description: 'Zoho Books es contabilidad internacional. Saldea es IA española de cobros. Análisis honesto y por qué Saldea encaja mejor para el mercado español.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-zoho' },
  keywords: ['saldea vs zoho', 'zoho books cobros', 'alternativa zoho', 'zoho vs saldea español'],
  openGraph: { title: 'Saldea vs Zoho Books', description: 'ERP global vs cobros locales.', type: 'article', locale: 'es_ES' },
}

export default function PageVsZoho() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">15 días gratis</Link></div>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Zoho Books</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Zoho Books es una suite contable global. Saldea está pensado 100% para el mercado español. Análisis honesto.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Zoho Books:</strong> contabilidad SaaS multinacional. Funciona en 180 países. Útil si tienes operaciones internacionales.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> SaaS español 100% enfocado en cobros automáticos con IA. Conoce Ley 3/2004 y Veri*factu de forma nativa.</p>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Función</th><th className="py-3 px-4 text-left text-zinc-100">Saldea</th><th className="py-3 px-4 text-left text-zinc-100">Zoho Books</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Origen</td><td className="py-2 px-4">España (Marsof)</td><td className="py-2 px-4">India (Zoho)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Soporte español</td><td className="py-2 px-4">✅ Nativo</td><td className="py-2 px-4">Limitado</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Ley 3/2004</td><td className="py-2 px-4">✅ Automático</td><td className="py-2 px-4">❌</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Veri*factu</td><td className="py-2 px-4">N/A (no factura)</td><td className="py-2 px-4">Pendiente</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios IA</td><td className="py-2 px-4">✅ Claude</td><td className="py-2 px-4">Básicos</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Datos en Europa</td><td className="py-2 px-4">✅ Frankfurt</td><td className="py-2 px-4">Multinacional</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio</td><td className="py-2 px-4">49€/mes</td><td className="py-2 px-4">~20-200€/mes según plan</td></tr>
                <tr><td className="py-2 px-4">Conciliación bancaria automática</td><td className="py-2 px-4">✅ Plan Max (GoCardless)</td><td className="py-2 px-4">❌</td></tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo elegir Zoho Books</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Empresa con operaciones internacionales (USA, UK, India)</li>
            <li>✓ Necesitas suite contable integrada con CRM, ventas, RRHH (Zoho One)</li>
            <li>✓ Eres equipo bilingüe y no te molesta soporte en inglés</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo elegir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Operas principalmente en España</li>
            <li>✓ Tu problema son las facturas vencidas, no la contabilidad</li>
            <li>✓ Quieres soporte y producto en español sin desfase horario</li>
            <li>✓ Necesitas que los recordatorios <strong>citen automáticamente la Ley 3/2004</strong></li>
            <li>✓ <strong>Conciliación bancaria automática</strong> (Plan Max): conecta tu banco vía GoCardless y Saldea cruza cada pago recibido con sus facturas automáticamente.</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El argumento decisivo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tu cliente es español, lo que más le mueve es que el recordatorio cite específicamente la <strong>Ley 3/2004</strong> y los intereses concretos. Zoho no lo hace nativamente. Saldea sí, en cada email. La diferencia se nota en la tasa de cobro real.</p>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea + Zoho Books pueden convivir</h3>
          <p className="text-zinc-300 mb-5">Si ya usas Zoho para contabilidad internacional, Saldea complementa con cobros automáticos para España. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  )
}
