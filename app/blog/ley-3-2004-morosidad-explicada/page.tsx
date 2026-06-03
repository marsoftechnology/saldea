import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ley 3/2004 morosidad: guÃ­a completa 2026 con ejemplos | Marsof',
  description: 'QuÃ© dice la Ley 3/2004 contra la morosidad, plazos de pago, intereses de demora, indemnizaciÃ³n por costes de cobro y cÃ³mo aplicarla a tu empresa. Actualizada 2026.',
  alternates: { canonical: 'https://marsof.es/blog/ley-3-2004-morosidad-explicada' },
  keywords: [
    'ley 3/2004',
    'ley morosidad',
    'plazo legal pago facturas',
    'intereses de demora',
    'indemnizaciÃ³n costes cobro',
    'morosidad operaciones comerciales',
  ],
  openGraph: {
    title: 'Ley 3/2004 morosidad: guÃ­a completa con ejemplos prÃ¡cticos',
    description: 'Plazos, intereses, indemnizaciÃ³n y aplicaciÃ³n prÃ¡ctica. Todo lo que tu empresa debe saber.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schemaArticulo = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ley 3/2004 morosidad: guÃ­a completa 2026 con ejemplos',
  description: 'QuÃ© dice la Ley 3/2004 contra la morosidad, plazos de pago, intereses de demora e indemnizaciÃ³n por costes de cobro.',
  author: { '@type': 'Organization', name: 'Marsof Technology' },
  publisher: {
    '@type': 'Organization',
    name: 'Marsof Technology',
    logo: { '@type': 'ImageObject', url: 'https://marsof.es/og-image.png' },
  },
  datePublished: '2026-05-16',
  dateModified: '2026-05-16',
  inLanguage: 'es-ES',
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Â¿CuÃ¡l es el plazo legal mÃ¡ximo de pago entre empresas en EspaÃ±a?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '60 dÃ­as naturales desde la entrega del bien o prestaciÃ³n del servicio. Entre AdministraciÃ³n PÃºblica y empresa, el plazo es de 30 dÃ­as. No se puede pactar un plazo mayor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Â¿CuÃ¡nto se cobra de interÃ©s de demora segÃºn la Ley 3/2004?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tipo de interÃ©s del BCE mÃ¡s 8 puntos porcentuales. En 2026, ronda el 12,5% anual. Se devenga automÃ¡ticamente sin necesidad de reclamaciÃ³n previa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Â¿QuÃ© es la indemnizaciÃ³n por costes de cobro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una compensaciÃ³n automÃ¡tica de 40â‚¬ por cada factura impagada que el acreedor tiene derecho a reclamar, ademÃ¡s de los costes reales de cobro (cartas, abogados, agencias).',
      },
    },
  ],
}

export default function PageLey32004() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticulo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">
            â† Volver al blog
          </Link>

          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Marco legal Â· 8 min de lectura</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Ley 3/2004 contra la morosidad: guÃ­a completa 2026
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Todo lo que tu empresa debe saber sobre los plazos de pago, intereses de demora y derechos como acreedor en EspaÃ±a.
            </p>
          </header>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Â¿QuÃ© es la Ley 3/2004?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              La <strong>Ley 3/2004, de 29 de diciembre</strong>, establece las medidas de lucha contra la morosidad en las operaciones comerciales en EspaÃ±a. Es la norma que regula los <strong>plazos mÃ¡ximos de pago</strong> entre empresas y entre empresas y Administraciones PÃºblicas.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Se aplica a <strong>todas las operaciones comerciales</strong> realizadas entre empresas o entre empresas y la AdministraciÃ³n PÃºblica, independientemente de si el contrato es escrito u oral.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Plazos mÃ¡ximos de pago</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
              <ul className="space-y-3 text-zinc-300">
                <li><strong className="text-sky-400">Entre empresas:</strong> mÃ¡ximo <strong>60 dÃ­as naturales</strong> desde la entrega del bien o prestaciÃ³n del servicio.</li>
                <li><strong className="text-sky-400">AdministraciÃ³n PÃºblica a empresa:</strong> mÃ¡ximo <strong>30 dÃ­as naturales</strong> desde la conformidad de la factura.</li>
                <li><strong className="text-sky-400">Productos frescos y perecederos:</strong> mÃ¡ximo <strong>30 dÃ­as</strong>.</li>
              </ul>
            </div>
            <p className="text-zinc-300 leading-relaxed mb-4">
              <strong>Importante:</strong> Estos plazos son imperativos. No se pueden pactar plazos mayores en el contrato. Si lo haces, la clÃ¡usula es nula y se aplica el plazo legal.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Intereses de demora automÃ¡ticos</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Cuando una factura no se paga en plazo, el acreedor tiene derecho a cobrar intereses de demora <strong>de forma automÃ¡tica</strong>, sin necesidad de mandar requerimiento previo.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-4">
              El tipo legal de interÃ©s de demora es el del <strong>BCE mÃ¡s 8 puntos porcentuales</strong>. En 2026 esto supone aproximadamente un <strong>12,5% anual</strong>.
            </p>
            <div className="bg-sky-500/5 border border-sky-500/30 rounded-xl p-5 my-5">
              <p className="text-zinc-200 mb-2"><strong>Ejemplo prÃ¡ctico:</strong></p>
              <p className="text-zinc-400 text-sm">Factura de 5.000â‚¬ vencida hace 60 dÃ­as â†’ 5.000 Ã— 12,5% Ã— (60/365) = <strong className="text-sky-400">102,74â‚¬ de intereses</strong> que puedes exigir ademÃ¡s del principal.</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Los 40â‚¬ de indemnizaciÃ³n por costes de cobro</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              El artÃ­culo 8 de la Ley 3/2004 reconoce el derecho a una <strong>indemnizaciÃ³n fija de 40â‚¬ por cada factura impagada</strong>, sin tener que demostrar el daÃ±o. Es automÃ¡tica.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-4">
              AdemÃ¡s, si los costes reales de cobro (cartas certificadas, burofax, abogados, agencias) superan esos 40â‚¬, puedes reclamar la diferencia.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">CÃ³mo aplicar la Ley 3/2004 en la prÃ¡ctica</h2>
            <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
              <li><strong>Manda recordatorio en cuanto venza la factura</strong> (dÃ­a 1 de retraso). No esperes meses.</li>
              <li><strong>Cita expresamente la Ley 3/2004</strong> en el segundo recordatorio. Eso ya transmite seriedad.</li>
              <li><strong>Reclama los 40â‚¬ de indemnizaciÃ³n</strong> y los intereses al cuantificar la deuda.</li>
              <li><strong>Documenta todo</strong>: emails, fechas, copias de factura. Por si hay que ir a juicio.</li>
              <li><strong>Si pasan 60 dÃ­as</strong> sin respuesta, envÃ­a burofax o inicia procedimiento monitorio.</li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Errores tÃ­picos que te dejan sin defensa legal</h2>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>âŒ <strong>No mandar recordatorios escritos</strong>. Sin pruebas, sin reclamaciÃ³n judicial.</li>
              <li>âŒ <strong>Aceptar plazos de pago superiores a 60 dÃ­as</strong>. La clÃ¡usula es nula pero te pone en desventaja negociadora.</li>
              <li>âŒ <strong>Olvidarse de los 40â‚¬</strong>. Es dinero al que tienes derecho automÃ¡tico.</li>
              <li>âŒ <strong>Tardar mÃ¡s de 5 aÃ±os</strong> en reclamar (prescripciÃ³n).</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mt-10 mb-4">Preguntas frecuentes</h2>

            <div className="space-y-5 mb-8">
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">Â¿CuÃ¡l es el plazo legal mÃ¡ximo de pago entre empresas?</h3>
                <p className="text-zinc-400 text-sm">60 dÃ­as naturales desde la entrega del bien o prestaciÃ³n del servicio.</p>
              </div>
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">Â¿CuÃ¡nto se cobra de interÃ©s de demora?</h3>
                <p className="text-zinc-400 text-sm">El tipo BCE mÃ¡s 8 puntos. En 2026, ~12,5% anual.</p>
              </div>
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">Â¿Tengo que reclamar la indemnizaciÃ³n de 40â‚¬ o es automÃ¡tica?</h3>
                <p className="text-zinc-400 text-sm">El derecho es automÃ¡tico. Pero el cobro efectivo requiere reclamarla expresamente.</p>
              </div>
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">Â¿QuÃ© pasa si el contrato fija un plazo de pago de 90 dÃ­as?</h3>
                <p className="text-zinc-400 text-sm">La clÃ¡usula es nula. Se aplica el plazo legal de 60 dÃ­as.</p>
              </div>
            </div>
          </section>

          <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Automatiza el cumplimiento de la Ley 3/2004</h3>
            <p className="text-zinc-300 mb-5">
              Saldea manda los recordatorios en plazo, cita la Ley 3/2004 automÃ¡ticamente y calcula los intereses + 40â‚¬ por factura impagada. 30 dÃ­as gratis.
            </p>
            <Link
              href="/registro"
              className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors"
            >
              Probar Saldea gratis â†’
            </Link>
          </aside>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-zinc-500">
              Este artÃ­culo tiene fines informativos. No constituye asesoramiento legal. Para casos concretos consulta con un abogado especialista.
            </p>
          </div>
        </div>
      </article>
    </>
  )
}

