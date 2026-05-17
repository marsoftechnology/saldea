import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar cursos y formación online sin impagos | Saldea',
  description: 'Estrategias específicas para formadores online: pre-pago, fraccionamiento, suspensión de acceso, recordatorios automáticos.',
  alternates: { canonical: 'https://marsof.es/blog/cobrar-curso-formacion-online' },
  keywords: ['cobrar curso online', 'formación impagos', 'cobrar formación empresa', 'plataforma cursos cobro'],
  openGraph: { title: 'Cómo cobrar cursos y formación online', description: 'Sin impagos.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar cursos y formación online</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El sector formación tiene un patrón único: cliente paga, accede al contenido y "se olvida" de las cuotas siguientes. Cómo evitarlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 1 — Pre-pago 100% siempre que puedas</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si vendes a particular, exige el 100% antes de dar acceso. Stripe + plataforma de cursos = pago automático antes de acceso. Cero morosidad.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 2 — Si fraccionas, suspende acceso</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si permites pago en 3 cuotas: cláusula automática "si falla 1 cuota, se suspende el acceso al curso". Lo dejas claro EN EL CONTRATO.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 3 — Empresas: factura previa con plazo corto</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si vendes formación a empresa, factura ANTES de impartir, con plazo de 15-30 días. Tu empresa cliente lo gestiona, no el participante.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plataformas que automatizan el cobro</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Hotmart, Teachable, Thinkific:</strong> cobran automáticamente y suspenden acceso si falla pago</li>
            <li>✓ <strong>Stripe Subscriptions:</strong> SEPA o tarjeta recurrente</li>
            <li>✓ <strong>Saldea:</strong> persigue impagos de SEPA devueltos en formaciones recurrentes</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Casos típicos y soluciones</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente paga 1ª cuota y desaparece</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Suspende acceso al curso. Email automático: "Cuota fallida. Acceso suspendido. Regulariza para retomar". 70% pagan tras esta suspensión.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Empresa contrata formación in-company y no paga</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Sigue plan estándar: emails escalados, burofax, monitorio. Tienes alta solidez probatoria (lista de asistencia, programa entregado, contratos firmados).</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente bonificación FUNDAE</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si fuiste centro impartidor: cobras igualmente. La bonificación es ASUNTO DE LA EMPRESA con Hacienda, NO con tu factura.</p>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea persigue cuotas de formación impagadas</h3>
          <p className="text-zinc-300 mb-5">Si SEPA falla o el alumno se atrasa, recordatorios automáticos profesionales. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
