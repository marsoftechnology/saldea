import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saldea vs Holded: comparativa real 2026 (cobros, facturación, IA)',
  description: '¿Saldea o Holded? Análisis honesto: para qué sirve cada uno, precios, integración Stripe, IA y cuál te conviene según tu negocio.',
  alternates: { canonical: 'https://marsof.es/comparativa/saldea-vs-holded' },
  keywords: [
    'saldea vs holded',
    'holded cobros',
    'alternativa holded',
    'comparativa saldea holded',
    'mejor software facturas',
  ],
  openGraph: {
    title: 'Saldea vs Holded: comparativa honesta 2026',
    description: '¿Cuál te conviene según tu negocio?',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageVsHolded() {
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
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa · 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Saldea vs Holded: ¿cuál te conviene?</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si estás eligiendo entre Saldea y Holded, esta comparativa honesta te ayudará a decidir según tu negocio. Sin marketing, solo hechos.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">TL;DR — Conclusión rápida</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Holded:</strong> ERP completo para empresas medianas que necesitan facturación + contabilidad + RRHH + CRM. Los cobros son una función secundaria.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> Especializado 100% en cobros automáticos con IA. Es lo único que hace, pero lo hace mejor que nadie en España.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa cara a cara</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Característica</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Holded</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio entry</td><td className="py-2 px-4">49€/mes</td><td className="py-2 px-4">29€/mes</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Trial gratis</td><td className="py-2 px-4">30 días sin tarjeta</td><td className="py-2 px-4">14 días con tarjeta</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Foco</td><td className="py-2 px-4">Cobros con IA</td><td className="py-2 px-4">ERP completo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios automáticos</td><td className="py-2 px-4">✅ Con IA, escalado</td><td className="py-2 px-4">Básicos (sin IA)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Detección de respuestas</td><td className="py-2 px-4">✅ IA Claude</td><td className="py-2 px-4">❌</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">✅ Nativo</td><td className="py-2 px-4">✅ Integración</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅ Completa</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Facturación legal</td><td className="py-2 px-4">Básica</td><td className="py-2 px-4">✅ Completa con TicketBAI/Veri*factu</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">RRHH y nóminas</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">CRM</td><td className="py-2 px-4">Básico (clientes)</td><td className="py-2 px-4">✅ Completo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Multi-usuario</td><td className="py-2 px-4">10 miembros</td><td className="py-2 px-4">Según plan</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Detecta vacaciones cliente</td><td className="py-2 px-4">✅ Con IA</td><td className="py-2 px-4">❌</td></tr>
                <tr><td className="py-2 px-4">Pagos parciales</td><td className="py-2 px-4">✅</td><td className="py-2 px-4">✅</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo elegir Holded</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Necesitas <strong>ERP completo</strong>: factura + contabilidad + RRHH + CRM en una sola herramienta.</li>
            <li>✓ Tienes <strong>empleados</strong> y necesitas nóminas.</li>
            <li>✓ Tu asesor fiscal te ha pedido que uses una herramienta integrada con contabilidad.</li>
            <li>✓ Facturación legal con TicketBAI o Veri*factu es crítica para ti.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo elegir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Tu problema principal es que <strong>no cobras a tiempo</strong>.</li>
            <li>✓ Ya tienes facturación en otro sitio (Quipu, Anfix, Excel) y solo quieres automatizar los cobros.</li>
            <li>✓ Quieres una IA que <strong>escale el tono</strong> de los recordatorios según los días de retraso.</li>
            <li>✓ Necesitas que el sistema <strong>entienda las respuestas</strong> de tus clientes ("ya te pagué", "espérame al 30").</li>
            <li>✓ Eres autónomo o gestoría con clientes pymes y los recordatorios manuales te ocupan demasiado.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Y si los uso a la vez?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es lo que recomiendo: usa <strong>Holded para facturación + contabilidad + RRHH</strong> y <strong>Saldea para la persecución de cobros</strong>. Cada uno hace lo que mejor sabe. Coste combinado: 29 + 49 = 78€/mes, pero te ahorras horas de trabajo manual y cobras más rápido.</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Pruébalo gratis y compara tú mismo</h3>
          <p className="text-zinc-300 mb-5">1 mes de Saldea sin tarjeta. En 30 días verás si la IA mejora tus cobros lo suficiente para mantenerlo.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-500">Datos a fecha de mayo 2026. Pueden variar.</p>
        </div>
      </article>
    </div>
  )
}
