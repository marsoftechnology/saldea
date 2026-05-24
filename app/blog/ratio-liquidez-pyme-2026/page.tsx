import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ratio de liquidez para pymes: cómo calcularlo y mejorarlo | Saldea',
  description: 'Qué es el ratio de liquidez, fórmula, valores ideales en España y cómo mejorarlo cobrando antes. Guía práctica para pymes y autónomos.',
  alternates: { canonical: 'https://marsof.es/blog/ratio-liquidez-pyme-2026' },
  keywords: ['ratio liquidez', 'ratio liquidez pyme', 'calcular liquidez', 'ratio tesoreria', 'salud financiera pyme'],
  openGraph: { title: 'Ratio de liquidez para pymes', description: 'Fórmula, valores ideales y mejora.', type: 'article', locale: 'es_ES' },
}

export default function PageLiquidez() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Finanzas · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Ratio de liquidez para pymes</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El indicador que te dice si tu empresa puede pagar sus deudas a corto plazo. Si no lo mides, vas a ciegas.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es el ratio de liquidez?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El <strong>ratio de liquidez</strong> mide la capacidad de tu empresa para hacer frente a sus deudas a corto plazo (las que vencen en menos de un año) con los recursos que tiene también a corto plazo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Fórmula</h2>
          <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5 text-center">
            <p className="text-xl font-bold text-zinc-100">Ratio liquidez = Activo corriente / Pasivo corriente</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué incluye cada término?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Activo corriente:</strong> caja, cuentas a cobrar (facturas pendientes), inventario, inversiones a corto plazo.</li>
            <li><strong>Pasivo corriente:</strong> deudas a proveedores, impuestos a pagar, sueldos pendientes, préstamos a corto plazo.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Valores ideales</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Ratio</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Diagnóstico</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">&lt; 1</td><td className="py-2 px-4">🔴 Peligro: no puedes pagar a corto plazo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">1 - 1,5</td><td className="py-2 px-4">🟡 Tenso: justos para pagar todo</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">1,5 - 2</td><td className="py-2 px-4">🟢 Saludable</td></tr>
                <tr><td className="py-2 px-4">&gt; 2</td><td className="py-2 px-4">⚠️ Excesivo (capital ocioso)</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ejemplo práctico</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-300 mb-2"><strong>Caso 1 — Empresa con problemas:</strong></p>
            <p className="text-zinc-400 text-sm">Activo corriente: 50.000€ (de los cuales 35.000€ son facturas vencidas pendientes)</p>
            <p className="text-zinc-400 text-sm">Pasivo corriente: 60.000€</p>
            <p className="text-sky-400 text-sm mt-2"><strong>Ratio: 0,83 → PELIGRO</strong></p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El "ratio ácido" o quick ratio</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Variante más exigente que excluye el inventario (porque no siempre se puede vender rápido):</p>
          <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5 text-center">
            <p className="text-lg font-bold text-zinc-100">Ratio ácido = (Activo corriente − Inventario) / Pasivo corriente</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Idealmente debe ser ≥ 1. Si tu ratio normal es 1,5 pero el ácido es 0,6, tienes demasiado capital atrapado en inventario.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo mejorar tu ratio de liquidez</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Cobra más rápido tus facturas</strong> → bajar el DSO (días promedio cobro)</li>
            <li><strong>Negocia plazos más largos con proveedores</strong> → subir el DPO (días promedio pago)</li>
            <li><strong>Reduce inventario inmovilizado</strong> → vender stock antiguo aunque sea con descuento</li>
            <li><strong>Factoring puntual</strong> para facturas grandes que tardan mucho</li>
            <li><strong>Anticipos a clientes nuevos</strong> → no esperes a entregar para cobrar 100%</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El impacto real de cobrar 30 días antes</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Ejemplo:</strong> empresa con 200.000€ de facturas anuales y DSO de 75 días. Si baja el DSO a 45 días (cobra 30 días antes), libera <strong>~16.500€ de capital</strong> que estaba atrapado en cuentas a cobrar. Eso mejora el ratio de liquidez automáticamente.</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea mejora tu ratio de liquidez</h3>
          <p className="text-zinc-300 mb-5">Cobrando 20-30 días antes con recordatorios automáticos, mejoras tu ratio sin pedir préstamos ni hacer factoring. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
