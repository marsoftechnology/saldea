import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cliente que paga pero llega tarde cada mes: cómo educarlo | Saldea',
  description: 'Tu cliente paga, pero siempre con 30-60 días de retraso. Cómo cambiar el patrón sin perder el cliente.',
  alternates: { canonical: 'https://marsof.es/blog/cliente-paga-tarde-cada-mes' },
  keywords: ['cliente paga tarde', 'educar cliente pago tiempo', 'cliente retraso habitual', 'cambiar patrón moroso'],
  openGraph: { title: 'Cliente que paga pero llega tarde cada mes', description: 'Cómo educarlo.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso específico · 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cliente que paga pero llega tarde cada mes</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Acaba pagando, pero siempre te toca perseguirlo. Cómo cambiar el patrón.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Por qué hace esto?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tres razones típicas:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>1. <strong>Política empresarial:</strong> en su empresa todos los proveedores cobran "cuando toca", no según factura</li>
            <li>2. <strong>Olvido sistemático:</strong> no es agenda prioritaria</li>
            <li>3. <strong>"Te pago si me insistes":</strong> sabe que si insistes paga, así que espera a tu insistencia</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Solución 1 — Domiciliación SEPA</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La mejor para clientes recurrentes. Le pides firma de mandato SEPA. El cargo va automático cada mes. Reduce la morosidad un 70%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Solución 2 — Recordatorio pre-vencimiento</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">3 días antes del vencimiento, email automático:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], te aviso de que la factura [X] vence el [fecha]. ¿Todo OK?"</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Aumenta cobros a tiempo +30-40%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Solución 3 — Descuento por pronto pago</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">"Si pagas en los primeros 7 días: 2% descuento". Le incentivas. Muchos pagan al instante por ahorrarse algo.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cuidado:</strong> sólo si tu margen lo permite. No regales tu margen para "compensar" un pagador lento.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Solución 4 — Sube el precio para compensar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si paga 30 días tarde, esos 30 días te cuestan dinero (oportunidad). Sube el precio un 3-5% en próxima renovación. Si protesta, dale opción de "precio inferior con domiciliación SEPA".</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Solución 5 — Conversación franca</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"[nombre], me gustaría hablar contigo sobre las facturas. Hemos colaborado bien estos meses, pero el patrón de pago retrasado me afecta. ¿Qué podemos hacer para regularizarlo? Te ofrezco SEPA, descuento por pronto pago o cambio de plazos. Dime qué te encaja mejor."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si nada cambia el patrón</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Decisión empresarial: ¿vale la pena este cliente? Calcula:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>+Margen bruto del cliente</li>
            <li>-Coste de horas perseguir</li>
            <li>-Coste oportunidad de los 30-60 días sin cobrar</li>
            <li>-Estrés mensual</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Si el neto es bajo, libera espacio para otro cliente que pague mejor.</p>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea cambia el patrón automáticamente</h3>
          <p className="text-zinc-300 mb-5">Recordatorio pre-vencimiento + recordatorio el día 1 + SEPA opcional. Tu cliente se acostumbra a pagar a tiempo sin esfuerzo por tu parte. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
