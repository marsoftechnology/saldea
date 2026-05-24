import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cliente que promete pagar pero no paga: 5 reglas para gestionarlo | Saldea',
  description: 'La excusa más común: "te pago la semana que viene". Cómo cortar la dinámica y conseguir un pago real.',
  alternates: { canonical: 'https://marsof.es/blog/cliente-promete-pero-no-paga' },
  keywords: ['cliente promete no paga', 'cliente da excusas pago', 'siempre dice mañana paga', 'romper dinámica moroso'],
  openGraph: { title: 'Cliente que promete pero no paga', description: '5 reglas para gestionarlo.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso específico · 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cliente que promete pero no paga</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">"Te pago la semana que viene". Cinco semanas después, nada. Cómo cortar la dinámica.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 1 — Compromiso por escrito</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si te dice "el lunes", responde:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Perfecto. Te confirmo que mando recordatorio el viernes para asegurarnos del pago del lunes 15."</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Ahora hay COMPROMISO concreto. No más promesas vagas.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 2 — Fecha exacta o "no es compromiso"</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">"Pronto", "la semana que viene", "en cuanto pueda" = nada. Devuelve la pelota:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"¿Me concretas día? Para apuntarlo y no insistirte hasta entonces."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 3 — Tres promesas y se acabó</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si rompe la promesa 3 veces seguidas, ya no hay confianza. Cambia el tono:</p>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Es la tercera fecha que se incumple. A partir de hoy, no aceptaré nuevas promesas verbales. O pago efectivo en 7 días, o paso a burofax y monitorio."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 4 — Plan de pago FIRMADO</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si dice que no puede de golpe, ofrécele plan de pago. PERO firmado:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📅 3 cuotas con fechas exactas</li>
            <li>📄 Documento firmado por ambas partes</li>
            <li>⚠️ Cláusula: "Si falla 1 cuota, deuda íntegra es exigible"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 5 — Stripe link para anular la excusa "no he podido"</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">"No he tenido tiempo de ir al banco". Mándale link de pago Stripe. Pago con tarjeta en 30 segundos. Quita la excusa.</p>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea registra cada promesa y recordatorio</h3>
          <p className="text-zinc-300 mb-5">Si el cliente dice "el lunes", Saldea programa recordatorio para el viernes. Pasa el lunes sin pago → email firme automático. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
