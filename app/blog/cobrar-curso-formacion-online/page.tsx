import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar cursos y formaci�n online sin impagos | Marsof',
  description: 'Estrategias espec�ficas para formadores online: pre-pago, fraccionamiento, suspensi�n de acceso, recordatorios autom�ticos.',
  alternates: { canonical: 'https://www.marsof.es/blog/cobrar-curso-formacion-online' },
  keywords: ['cobrar curso online', 'formaci�n impagos', 'cobrar formaci�n empresa', 'plataforma cursos cobro'],
  openGraph: { title: 'C�mo cobrar cursos y formaci�n online', description: 'Sin impagos.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar cursos y formaci�n online sin impagos", "description": "Estrategias espec�ficas para formadores online: pre-pago, fraccionamiento, suspensi�n de acceso, recordatorios autom�ticos.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/cobrar-curso-formacion-online"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar cursos y formaci�n online</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El sector formaci�n tiene un patr�n �nico: cliente paga, accede al contenido y "se olvida" de las cuotas siguientes. C�mo evitarlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 1 � Pre-pago 100% siempre que puedas</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si vendes a particular, exige el 100% antes de dar acceso. Stripe + plataforma de cursos = pago autom�tico antes de acceso. Cero morosidad.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 2 � Si fraccionas, suspende acceso</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si permites pago en 3 cuotas: cl�usula autom�tica "si falla 1 cuota, se suspende el acceso al curso". Lo dejas claro EN EL CONTRATO.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 3 � Empresas: factura previa con plazo corto</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si vendes formaci�n a empresa, factura ANTES de impartir, con plazo de 15-30 d�as. Tu empresa cliente lo gestiona, no el participante.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plataformas que automatizan el cobro</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Hotmart, Teachable, Thinkific:</strong> cobran autom�ticamente y suspenden acceso si falla pago</li>
            <li>? <strong>Stripe Subscriptions:</strong> SEPA o tarjeta recurrente</li>
            <li>? <strong>Saldea:</strong> persigue impagos de SEPA devueltos en formaciones recurrentes</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Casos t�picos y soluciones</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente paga 1� cuota y desaparece</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Suspende acceso al curso. Email autom�tico: "Cuota fallida. Acceso suspendido. Regulariza para retomar". 70% pagan tras esta suspensi�n.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Empresa contrata formaci�n in-company y no paga</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Sigue plan est�ndar: emails escalados, burofax, monitorio. Tienes alta solidez probatoria (lista de asistencia, programa entregado, contratos firmados).</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente bonificaci�n FUNDAE</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si fuiste centro impartidor: cobras igualmente. La bonificaci�n es ASUNTO DE LA EMPRESA con Hacienda, NO con tu factura.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea persigue cuotas de formaci�n impagadas</h3>
          <p className="text-zinc-300 mb-5">Si SEPA falla o el alumno se atrasa, recordatorios autom�ticos profesionales. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

