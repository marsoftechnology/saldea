import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Saldea vs Contasimple: facturación vs cobros automáticos 2026',
  description: 'Contasimple es gratis para autónomos pequeños. Saldea automatiza cobros con IA. Comparativa honesta: cuándo usar cada uno.',
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
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">15 días gratis</Link></div>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Saldea vs Contasimple</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Contasimple es uno de los softwares de facturación gratuitos más usados por autónomos en España. Saldea es la IA que persigue los cobros. Veamos cuándo conviene cada uno.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Contasimple:</strong> facturación gratis para autónomos pequeños. Libros de IVA básicos, modelo 130/303.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> NO emite facturas. Persigue las que ya has emitido cuando el cliente se retrasa.</p>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Función</th><th className="py-3 px-4 text-left text-zinc-100">Saldea</th><th className="py-3 px-4 text-left text-zinc-100">Contasimple</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Emitir facturas</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅ Gratis</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Libros de IVA</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Modelos AEAT</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅ Plan Pro</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios IA</td><td className="py-2 px-4">✅ Claude</td><td className="py-2 px-4">❌</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">✅</td><td className="py-2 px-4">Básico</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plan gratis</td><td className="py-2 px-4">3 facturas</td><td className="py-2 px-4">Ilimitado</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Plan Pro</td><td className="py-2 px-4">49€/mes</td><td className="py-2 px-4">~10-20€/mes</td></tr>
                <tr><td className="py-2 px-4">Conciliación bancaria automática</td><td className="py-2 px-4">✅ Plan Max (GoCardless)</td><td className="py-2 px-4">❌</td></tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El stack autónomo low-cost: Contasimple + Saldea</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si eres autónomo con presupuesto ajustado:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Contasimple gratis</strong> → emites facturas, llevas libro IVA</li>
            <li>✓ <strong>Saldea 49€/mes</strong> → automatiza cobros cuando se retrasen</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Total: ~49€/mes para tener todo el ciclo desde la emisión hasta el cobro persiguiendo morosos automáticamente.</p>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo solo necesitas Contasimple</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Autónomo recién empezando</li>
            <li>✓ Tus clientes pagan rápido</li>
            <li>✓ Volumen bajo (1-3 facturas/mes)</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo añadir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Tu cliente paga tarde habitualmente</li>
            <li>✓ Tienes facturas vencidas pendientes</li>
            <li>✓ Dedicas tiempo a reclamar manualmente</li>
            <li>✓ <strong>Conciliación bancaria automática</strong> (Plan Max): conecta tu banco vía GoCardless y Saldea cruza cada pago recibido con sus facturas automáticamente.</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Mantén Contasimple, añade Saldea</h3>
          <p className="text-zinc-300 mb-5">Importa CSV desde Contasimple. Saldea persigue las facturas vencidas. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </article>
      <MarketingFooter />
    </div>
  )
}
