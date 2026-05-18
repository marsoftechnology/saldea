import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Saldea vs Holded: comparativa real 2026 (cobros, facturaciÃ³n, IA)',
  description: 'Â¿Saldea o Holded? AnÃ¡lisis honesto: para quÃ© sirve cada uno, precios, integraciÃ³n Stripe, IA y cuÃ¡l te conviene segÃºn tu negocio.',
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
    description: 'Â¿CuÃ¡l te conviene segÃºn tu negocio?',
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
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa Â· 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Saldea vs Holded: Â¿cuÃ¡l te conviene?</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si estÃ¡s eligiendo entre Saldea y Holded, esta comparativa honesta te ayudarÃ¡ a decidir segÃºn tu negocio. Sin marketing, solo hechos.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">TL;DR â€” ConclusiÃ³n rÃ¡pida</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Holded:</strong> ERP completo para empresas medianas que necesitan facturaciÃ³n + contabilidad + RRHH + CRM. Los cobros son una funciÃ³n secundaria.</p>
            <p className="text-zinc-300"><strong className="text-sky-400">Saldea:</strong> Especializado 100% en cobros automÃ¡ticos con IA. Es lo Ãºnico que hace, pero lo hace mejor que nadie en EspaÃ±a.</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa cara a cara</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">CaracterÃ­stica</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Saldea</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Holded</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Precio entry</td><td className="py-2 px-4">49â‚¬/mes</td><td className="py-2 px-4">29â‚¬/mes</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Trial gratis</td><td className="py-2 px-4">30 dÃ­as sin tarjeta</td><td className="py-2 px-4">14 dÃ­as con tarjeta</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Foco</td><td className="py-2 px-4">Cobros con IA</td><td className="py-2 px-4">ERP completo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Recordatorios automÃ¡ticos</td><td className="py-2 px-4">âœ… Con IA, escalado</td><td className="py-2 px-4">BÃ¡sicos (sin IA)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">DetecciÃ³n de respuestas</td><td className="py-2 px-4">âœ… IA Claude</td><td className="py-2 px-4">âŒ</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Stripe Connect</td><td className="py-2 px-4">âœ… Nativo</td><td className="py-2 px-4">âœ… IntegraciÃ³n</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Contabilidad</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ… Completa</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">FacturaciÃ³n legal</td><td className="py-2 px-4">BÃ¡sica</td><td className="py-2 px-4">âœ… Completa con TicketBAI/Veri*factu</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">RRHH y nÃ³minas</td><td className="py-2 px-4">âŒ</td><td className="py-2 px-4">âœ…</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">CRM</td><td className="py-2 px-4">BÃ¡sico (clientes)</td><td className="py-2 px-4">âœ… Completo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Multi-usuario</td><td className="py-2 px-4">10 miembros</td><td className="py-2 px-4">SegÃºn plan</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Detecta vacaciones cliente</td><td className="py-2 px-4">âœ… Con IA</td><td className="py-2 px-4">âŒ</td></tr>
                <tr><td className="py-2 px-4">Pagos parciales</td><td className="py-2 px-4">âœ…</td><td className="py-2 px-4">âœ…</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo elegir Holded</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Necesitas <strong>ERP completo</strong>: factura + contabilidad + RRHH + CRM en una sola herramienta.</li>
            <li>âœ“ Tienes <strong>empleados</strong> y necesitas nÃ³minas.</li>
            <li>âœ“ Tu asesor fiscal te ha pedido que uses una herramienta integrada con contabilidad.</li>
            <li>âœ“ FacturaciÃ³n legal con TicketBAI o Veri*factu es crÃ­tica para ti.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">CuÃ¡ndo elegir Saldea</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>âœ“ Tu problema principal es que <strong>no cobras a tiempo</strong>.</li>
            <li>âœ“ Ya tienes facturaciÃ³n en otro sitio (Quipu, Anfix, Excel) y solo quieres automatizar los cobros.</li>
            <li>âœ“ Quieres una IA que <strong>escale el tono</strong> de los recordatorios segÃºn los dÃ­as de retraso.</li>
            <li>âœ“ Necesitas que el sistema <strong>entienda las respuestas</strong> de tus clientes ("ya te paguÃ©", "espÃ©rame al 30").</li>
            <li>âœ“ Eres autÃ³nomo o gestorÃ­a con clientes pymes y los recordatorios manuales te ocupan demasiado.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Â¿Y si los uso a la vez?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es lo que recomiendo: usa <strong>Holded para facturaciÃ³n + contabilidad + RRHH</strong> y <strong>Saldea para la persecuciÃ³n de cobros</strong>. Cada uno hace lo que mejor sabe. Coste combinado: 29 + 49 = 78â‚¬/mes, pero te ahorras horas de trabajo manual y cobras mÃ¡s rÃ¡pido.</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">PruÃ©balo gratis y compara tÃº mismo</h3>
          <p className="text-zinc-300 mb-5">1 mes de Saldea sin tarjeta. En 30 dÃ­as verÃ¡s si la IA mejora tus cobros lo suficiente para mantenerlo.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis â†’</Link>
        </aside>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-500">Datos a fecha de mayo 2026. Pueden variar.</p>
        </div>
      </article>
    </div>
  )
}
