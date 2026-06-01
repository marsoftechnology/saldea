import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en hostelería y restauración 2026: cobrar a hoteles | Saldea',
  description: 'Cómo cobrar facturas a hoteles, restaurantes y empresas de hostelería en España. Plazos reales, cláusulas clave y herramientas que funcionan.',
  alternates: { canonical: 'https://marsof.es/blog/morosidad-sector-hosteleria' },
  keywords: ['cobrar hosteleria', 'morosos hoteles', 'facturas restaurante impagadas', 'proveedor hosteleria cobros', 'cobrar a hoteles'],
  openGraph: { title: 'Morosidad en hostelería 2026', description: 'Cobrar a hoteles y restaurantes.', type: 'article', locale: 'es_ES' },
}

export default function PageHosteleria() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en hostelería y restauración</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Si eres proveedor de hoteles, restaurantes o catering, sabes que cobrar en este sector tiene su ciencia. Plazos, estacionalidad y qué hacer cuando no pagan.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La realidad del sector</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📊 <strong>Plazo medio de pago:</strong> 75-90 días (vs 60 días legales)</li>
            <li>📊 <strong>Estacionalidad brutal:</strong> en invierno hay menos liquidez en zonas turísticas</li>
            <li>📊 <strong>Concentración de proveedores:</strong> grandes cadenas tienen poder de negociación</li>
            <li>📊 <strong>Riesgo en pymes:</strong> margen estrecho, cierres frecuentes</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tipos de clientes y su comportamiento</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Tipo</th><th className="py-3 px-4 text-left text-zinc-100">Plazo</th><th className="py-3 px-4 text-left text-zinc-100">Riesgo</th></tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Cadenas hoteleras grandes</td><td className="py-2 px-4">90-120 días</td><td className="py-2 px-4">Bajo (pagan, pero tarde)</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Hoteles independientes</td><td className="py-2 px-4">60-90 días</td><td className="py-2 px-4">Medio</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Restaurantes pequeños</td><td className="py-2 px-4">30-60 días</td><td className="py-2 px-4">Alto (cierres)</td></tr>
                <tr><td className="py-2 px-4">Catering eventos</td><td className="py-2 px-4">7-30 días</td><td className="py-2 px-4">Variable</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cláusulas clave en contratos con hostelería</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Anticipo para eventos:</strong> 30-50% al menos en catering</li>
            <li>✓ <strong>Plazo expreso:</strong> 30 días en restaurantes pequeños, 60 máx. en cadenas</li>
            <li>✓ <strong>Suspensión por impago:</strong> imprescindible para proveedores recurrentes</li>
            <li>✓ <strong>Ley 3/2004 expresa</strong> citada en condiciones</li>
            <li>✓ <strong>Cláusula de garantía personal</strong> en restaurantes pequeños (firma del titular)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos en hostelería</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Verificación previa:</strong> hostelería tiene rotación alta. eInforma + Google reviews</li>
            <li><strong>Recordatorio pre-vencimiento:</strong> en hostelería el "olvido" es habitual por volumen</li>
            <li><strong>Llamada al jefe de compras:</strong> escala más rápido que email</li>
            <li><strong>Si se retrasa &gt; 30 días, suspender entregas</strong> hasta regularizar</li>
            <li><strong>Burofax temprano</strong> a partir de 60 días para sobrevivir al cierre</li>
          </ol>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para proveedores de hostelería</h3>
          <p className="text-zinc-300 mb-5">Recordatorios automáticos por cliente, escala el tono según tipo de hotel/restaurante. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
