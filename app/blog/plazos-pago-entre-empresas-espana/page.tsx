import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plazos de pago entre empresas en España 2026 (Ley 3/2004) | Saldea',
  description: 'Guía completa de los plazos máximos legales de pago en España: B2B (60 días), Administración (30 días), perecederos y excepciones. Actualizado 2026.',
  alternates: { canonical: 'https://marsof.es/blog/plazos-pago-entre-empresas-espana' },
  keywords: [
    'plazos pago entre empresas',
    'plazo legal factura',
    'cuanto tarda en pagar una empresa',
    'plazo pago administracion publica',
    '60 dias pago factura',
    'ley plazo pago espana',
  ],
  openGraph: {
    title: 'Plazos de pago entre empresas en España 2026',
    description: '60 días B2B, 30 días Administración. Todo explicado.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Cuál es el plazo máximo legal de pago entre empresas?', acceptedAnswer: { '@type': 'Answer', text: '60 días naturales desde la entrega del bien o servicio según la Ley 3/2004.' } },
    { '@type': 'Question', name: '¿Cuánto tarda en pagar la Administración Pública?', acceptedAnswer: { '@type': 'Answer', text: 'Máximo 30 días naturales desde la conformidad de la factura.' } },
    { '@type': 'Question', name: '¿Se pueden pactar plazos superiores a 60 días?', acceptedAnswer: { '@type': 'Answer', text: 'No. Cualquier cláusula que fije un plazo superior es nula y se aplica el plazo legal de 60 días.' } },
  ],
}

export default function PagePlazos() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Marco legal · 6 min</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Plazos de pago entre empresas en España 2026</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">Saber cuál es el plazo legal te da herramientas para reclamar a tiempo y con respaldo. Aquí están todos los plazos vigentes según la Ley 3/2004.</p>
          </header>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Resumen rápido</h2>
            <div className="overflow-x-auto my-5">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sky-500/20">
                    <th className="py-3 px-4 text-left text-zinc-100">Tipo de operación</th>
                    <th className="py-3 px-4 text-left text-zinc-100">Plazo máximo</th>
                    <th className="py-3 px-4 text-left text-zinc-100">Base legal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">Empresa a empresa (B2B)</td><td className="py-2 px-4">60 días naturales</td><td className="py-2 px-4">Art. 4 Ley 3/2004</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">Administración a empresa</td><td className="py-2 px-4">30 días naturales</td><td className="py-2 px-4">Art. 198 LCSP</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">Productos perecederos</td><td className="py-2 px-4">30 días naturales</td><td className="py-2 px-4">Ley 12/2013</td></tr>
                  <tr className="border-b border-white/10"><td className="py-2 px-4">Consumidor final</td><td className="py-2 px-4">Lo pactado</td><td className="py-2 px-4">Libertad contractual</td></tr>
                  <tr><td className="py-2 px-4">Construcción pública</td><td className="py-2 px-4">30 días + 30 días certificación</td><td className="py-2 px-4">Art. 198.4 LCSP</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazo B2B: 60 días naturales</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">El plazo se cuenta desde la <strong>entrega efectiva del bien o prestación del servicio</strong>. NO desde la emisión de la factura. Si el cliente recibe el servicio el 1 de marzo, el plazo máximo de pago es el 30 de abril aunque la factura se haya emitido el 10 de marzo.</p>
            <p className="text-zinc-300 leading-relaxed mb-4">Son <strong>días naturales</strong>: incluyen sábados, domingos y festivos.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plazo Administración Pública: 30 días</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">La Administración (Ayuntamientos, Diputaciones, Comunidades, Estado, SEPE, etc.) tiene <strong>30 días desde la conformidad de la factura</strong>. Esa "conformidad" se entiende otorgada automáticamente a los 30 días de presentación.</p>
            <p className="text-zinc-300 leading-relaxed mb-4">Si tu cliente es público y no te paga a 30 días, puedes reclamar intereses + 40€ automáticamente.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Excepción: productos perecederos</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Frutas, hortalizas, lácteos, pescado, carne fresca... <strong>siempre 30 días máximo</strong>. La Ley 12/2013 de la cadena alimentaria es más estricta para proteger a los productores.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Y si en el contrato pone 90 o 120 días?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">La cláusula es <strong>nula de pleno derecho</strong>. Se aplica el plazo legal de 60 días. Cualquier "pacto" para alargar el plazo de pago en operaciones B2B no tiene validez.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo aprovechar estos plazos en tus reclamaciones</h2>
            <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
              <li>Cita el plazo legal exacto en tus emails de reclamación: "El plazo máximo de pago según la Ley 3/2004 es de 60 días".</li>
              <li>Comunica que los intereses de demora se devengan automáticamente: "A partir del día 61 corre el interés del BCE + 8 puntos".</li>
              <li>Recuerda el derecho a 40€ de indemnización por costes de cobro.</li>
              <li>Si es Administración, menciona la Ley de Contratos del Sector Público (LCSP).</li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">¿El plazo se cuenta desde la fecha de factura o de entrega?</h3>
                <p className="text-zinc-400 text-sm">Desde la entrega efectiva del bien o servicio, salvo pacto expreso.</p>
              </div>
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">¿Puedo cobrar antes de 60 días aunque mi cliente diga "te pago a 90"?</h3>
                <p className="text-zinc-400 text-sm">Sí. El "pacto" de 90 días es nulo. Puedes exigir el pago a 60 con intereses si no cumple.</p>
              </div>
              <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-zinc-100 mb-2">¿Cuándo nacen los intereses de demora?</h3>
                <p className="text-zinc-400 text-sm">El día siguiente al vencimiento legal o pactado (lo que sea menor). Sin necesidad de requerimiento.</p>
              </div>
            </div>
          </section>

          <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea conoce todos estos plazos</h3>
            <p className="text-zinc-300 mb-5">Los recordatorios automáticos de Saldea citan la Ley 3/2004 correspondiente al tipo de operación. Sin que tú lo configures. <strong>30 días gratis.</strong></p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
          </aside>
        </div>
      </article>
    </>
  )
}
