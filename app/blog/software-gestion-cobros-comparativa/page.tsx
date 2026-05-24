import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mejor software de gestión de cobros 2026: comparativa España | Saldea',
  description: 'Comparamos 7 herramientas para automatizar el cobro de facturas en España: precios, funciones, integración con Stripe, IA y soporte. Análisis honesto 2026.',
  alternates: { canonical: 'https://marsof.es/blog/software-gestion-cobros-comparativa' },
  keywords: [
    'software gestión cobros',
    'mejor software facturación cobros',
    'herramienta cobros autónomos',
    'comparativa software morosos',
    'app para cobrar facturas',
    'crm cobros pymes',
  ],
  openGraph: {
    title: 'Mejor software de gestión de cobros 2026: comparativa España',
    description: 'Análisis honesto de 7 herramientas con precios y funciones.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageSoftwareComparativa() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comparativa · 12 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Mejor software de gestión de cobros 2026 en España</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si gestionas facturas y quieres cobrar más rápido sin perseguir clientes a mano, aquí tienes el análisis honesto de las 7 herramientas más usadas en España.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo elegir tu software de cobros</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de comparar, ten claros estos 4 criterios:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>1. Automatización:</strong> ¿manda los recordatorios solo o tienes que pulsar tú cada vez?</li>
            <li><strong>2. Escalado de tono:</strong> ¿usa un solo email tipo o adapta el mensaje según los días de retraso?</li>
            <li><strong>3. Detección de respuestas:</strong> ¿entiende cuando el cliente paga, discute o promete pago?</li>
            <li><strong>4. Integración con Stripe / cuenta bancaria:</strong> ¿genera links de pago automáticos?</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Comparativa rápida</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-3 text-left text-zinc-100">Herramienta</th>
                  <th className="py-3 px-3 text-left text-zinc-100">Precio</th>
                  <th className="py-3 px-3 text-left text-zinc-100">IA</th>
                  <th className="py-3 px-3 text-left text-zinc-100">Stripe</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10 bg-sky-500/5"><td className="py-2 px-3 font-bold">Saldea</td><td className="py-2 px-3">49€/mes</td><td className="py-2 px-3">✅</td><td className="py-2 px-3">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3">Holded</td><td className="py-2 px-3">29-99€/mes</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3">Quipu</td><td className="py-2 px-3">19-89€/mes</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">Parcial</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3">Anfix</td><td className="py-2 px-3">19-99€/mes</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3">Sage 50</td><td className="py-2 px-3">desde 49€</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">❌</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-3">Chaser (UK)</td><td className="py-2 px-3">~75€/mes</td><td className="py-2 px-3">Parcial</td><td className="py-2 px-3">✅</td></tr>
                <tr><td className="py-2 px-3">Hoja Excel</td><td className="py-2 px-3">0€</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">❌</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">1. Saldea — IA específica para cobros</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Para quién:</strong> autónomos, gestorías y pymes españolas que quieren AUTOMATIZAR todo el proceso de cobro sin perder personalización.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Lo bueno:</strong> única herramienta del mercado español con IA que <strong>escala el tono progresivamente</strong> (amable → firme → formal) y <strong>detecta respuestas reales</strong> (paga, dispute, promesa). Integración Stripe Connect nativa.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Lo malo:</strong> lanzada en 2026, comunidad aún pequeña.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Precio:</strong> 49€/mes (49€) o 499€/año. 15 días gratis.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">2. Holded — ERP completo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Para quién:</strong> empresas medianas que quieren factura + contabilidad + RRHH + CRM en una sola herramienta.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Lo bueno:</strong> es un ERP serio, todo conectado.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Lo malo:</strong> los recordatorios de cobro son básicos. No escala tono ni detecta respuestas.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">3. Quipu — Factura para autónomos</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Buena para facturación, simple. Los recordatorios son manuales y sin escalado.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">4. Anfix — Contabilidad y factura</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Foco contable. Los recordatorios existen pero requieren intervención manual.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">5. Sage 50 — Software clásico</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Pesado, instalable, sin automatización moderna. Solo si tu asesor lo exige.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">6. Chaser — Solución UK</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Buena pero pensada para Reino Unido. No conoce la Ley 3/2004 española ni los 40€ de indemnización.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">7. Excel / Google Sheets — Manual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Gratis pero te lleva 2-3 horas/semana mantenerlo y la mitad de las facturas se te pasan.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Conclusión</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si quieres una herramienta dedicada exclusivamente a <strong>cobrar mejor y más rápido</strong> y que use IA para escalar el tono y detectar respuestas: <strong>Saldea</strong>. Si necesitas un ERP completo con facturación y contabilidad: Holded o Anfix.</p>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Pruébalo tú mismo</h3>
          <p className="text-zinc-300 mb-5">15 días gratis. Se requiere tarjeta. Cancela en 1 clic. Sin permanencia.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-500">Comparativa basada en información pública de cada producto a fecha de mayo 2026. Los precios pueden cambiar.</p>
        </div>
      </div>
    </article>
  )
}
