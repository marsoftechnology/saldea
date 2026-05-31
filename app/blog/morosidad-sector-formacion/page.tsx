import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad en formación y consultoría 2026: cobrar a empresas | Saldea',
  description: 'Cómo cobrar facturas a empresas por servicios de formación y consultoría. Plazos reales, retainer mensual y estrategias específicas del sector.',
  alternates: { canonical: 'https://marsof.es/blog/morosidad-sector-formacion' },
  keywords: ['cobrar formacion empresa', 'morosos consultoria', 'cobrar empresa formacion', 'consultor cobros', 'retainer consultoria'],
  openGraph: { title: 'Morosidad en formación y consultoría', description: 'Cobrar a empresas por servicios profesionales.', type: 'article', locale: 'es_ES' },
}

export default function PageFormacion() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en formación y consultoría</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Consultores y formadores facturan a empresas que pagan a 60-120 días. Cómo proteger tus servicios y cobrar sin perder al cliente.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El reto del sector</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Los servicios profesionales (formación, consultoría, coaching) tienen un problema común: trabajas primero, facturas después, y el cliente puede usar cualquier "evaluación posterior" para retrasar pagos.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazos reales por tipo de cliente</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Cliente</th><th className="py-3 px-4 text-left text-zinc-100">Plazo medio</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Multinacional</td><td className="py-2 px-4">60-120 días</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Pyme grande</td><td className="py-2 px-4">60 días</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Pyme pequeña</td><td className="py-2 px-4">30-60 días</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Administración pública</td><td className="py-2 px-4">90-180 días</td></tr>
                <tr><td className="py-2 px-4">Particular</td><td className="py-2 px-4">Inmediato</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El modelo retainer mensual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si haces consultoría continua, <strong>cobra retainer mensual fijo</strong> en lugar de facturar por proyecto. Ventajas:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Ingreso recurrente predecible</li>
            <li>✓ Puedes domiciliar SEPA (reduces morosidad 70%)</li>
            <li>✓ El cliente paga antes que use los servicios</li>
            <li>✓ Te ata al cliente con un compromiso anual</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cláusulas clave en contratos de formación/consultoría</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Anticipo del 30-50%</strong> al firmar</li>
            <li>✓ <strong>Hitos de pago</strong>: por entrega de informes/módulos, no al final</li>
            <li>✓ <strong>Aceptación tácita</strong>: 7 días para discutir, sino se entiende aceptado</li>
            <li>✓ <strong>Confidencialidad</strong> con NDA recíproca</li>
            <li>✓ <strong>Cesión propiedad intelectual</strong>: solo tras pago completo</li>
            <li>✓ <strong>Ley 3/2004 + suspensión</strong> por impago</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estrategia anti-morosos</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Negocia retainer cuando sea posible</li>
            <li>Hitos de pago con entregables</li>
            <li>NO entregues el informe final hasta cobrar</li>
            <li>Recordatorios automáticos desde el día 1 vencimiento</li>
            <li>Si más de 30 días vencido: pausa el siguiente módulo o consultoría</li>
            <li>Burofax + Ley 3/2004 al día 60</li>
          </ol>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea para consultores y formadores</h3>
          <p className="text-zinc-300 mb-5">Recordatorios automáticos, retainer recurrente, escalado de tono. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
