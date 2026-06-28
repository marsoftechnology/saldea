import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo evitar impagos con un cliente nuevo: 10 medidas | Marsof',
  description: 'Las 10 medidas concretas para minimizar el riesgo de impago al trabajar con un cliente nuevo. Verificaci�n, contrato, anticipo y m�s.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-evitar-impagos-nuevo-cliente' },
  keywords: ['evitar impagos cliente nuevo', 'protegerse moroso', 'verificar cliente antes contratar', 'medidas anti-moroso'],
  openGraph: { title: 'C�mo evitar impagos con un cliente nuevo', description: '10 medidas concretas.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo evitar impagos con un cliente nuevo: 10 medidas", "description": "Las 10 medidas concretas para minimizar el riesgo de impago al trabajar con un cliente nuevo. Verificaci�n, contrato, anticipo y m�s.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-evitar-impagos-nuevo-cliente"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Prevenci�n � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo evitar impagos con un cliente nuevo</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Reclamar a un moroso cuesta 10x m�s que prevenirlo. Estas 10 medidas tomadas antes de empezar te ahorran disgustos.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">1. B�scalo en eInforma / Axesor</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Informe b�sico gratis. Si tiene impagos publicados, concurso o sociedad inactiva: huye.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">2. Verifica que la empresa exista</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Busca en el BORME (boe.es/diario_borme). Comprueba CIF en hacienda.gob.es. 5 minutos de revisi�n te evitan trabajar para empresas fantasma.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">3. Anticipo del 30-50%</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">No negociable en clientes nuevos. Filtra al 80% de los morosos: el moroso t�pico se niega a anticipo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">4. Contrato firmado (no presupuesto suelto)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Aunque el cliente diga "para qu�". El contrato fija plazos, cl�usula penal por impago, suspensi�n de servicio. Te da fuerza legal.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">5. Cl�usula expresa Ley 3/2004</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Mete en el contrato: "En caso de impago se aplicar�n intereses de demora del 12,5% (Ley 3/2004) e indemnizaci�n de 40� por costes de cobro". Disuade.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">6. Cl�usula de suspensi�n por impago</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">"El proveedor podr� suspender el servicio si se acumulan m�s de 15 d�as de retraso". Te protege para dejar de trabajar sin que te demanden.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">7. Domiciliaci�n SEPA para recurrentes</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si vas a facturar mensualmente, hazle firmar mandato SEPA. Reduce la morosidad un 70%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">8. Plazos de pago cortos</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Como pyme/aut�nomo, pacta 15-30 d�as, no 60. La Ley te permite hasta 60, pero m�s corto es mejor.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">9. Stripe Connect o link de pago</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">No esperes a que haga transferencia. M�ndale link de pago Stripe. Quitas fricci�n del cobro.</p>

          <h2 className="text-2xl function-bold text-zinc-100 mt-8 mb-4">10. Recordatorio autom�tico pre-vencimiento</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">3 d�as antes del vencimiento, manda email recordatorio. Aumenta cobros a tiempo +30%.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Se�ales de alarma del cliente moroso t�pico</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? Negocia much�simo el precio</li>
            <li>?? Pide condiciones de pago a 90 d�as</li>
            <li>?? No quiere firmar contrato</li>
            <li>?? No quiere anticipo</li>
            <li>?? Es "amigo de un amigo" sin m�s referencias</li>
            <li>?? Cambia de interlocutor con frecuencia</li>
            <li>?? Tarda en mandar datos para facturaci�n</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Si ves 2-3 se�ales: declina el proyecto. Mejor perder uno que cobrar la mitad y comerse el resto.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza las medidas 7, 9 y 10</h3>
          <p className="text-zinc-300 mb-5">SEPA, Stripe Connect y recordatorios pre-vencimiento. Las medidas 1-6 las pones t� en el contrato. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

