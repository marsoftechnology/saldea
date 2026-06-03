import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Procedimiento monitorio: cómo reclamar una deuda sin abogado | Marsof',
  description: 'Guía completa del procedimiento monitorio en España: cómo presentar la demanda, plazos, coste y cuándo se necesita abogado. Actualizado 2026.',
  alternates: { canonical: 'https://marsof.es/blog/procedimiento-monitorio-reclamar-deuda' },
  keywords: [
    'procedimiento monitorio',
    'monitorio sin abogado',
    'demanda monitoria',
    'reclamar deuda judicial',
    'juicio monitorio',
    'demanda morosos',
  ],
  openGraph: {
    title: 'Procedimiento monitorio: cómo reclamar una deuda sin abogado',
    description: 'Pasos, formularios y plazos para el monitorio en España.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Procedimiento monitorio paso a paso',
  totalTime: 'P30D',
  step: [
    { '@type': 'HowToStep', name: 'Preparar documentación', text: 'Factura, contrato, comunicaciones previas (burofax).' },
    { '@type': 'HowToStep', name: 'Rellenar formulario', text: 'Modelo oficial del CGPJ.' },
    { '@type': 'HowToStep', name: 'Presentar en juzgado', text: 'Decanato del lugar del deudor.' },
    { '@type': 'HowToStep', name: 'Esperar requerimiento', text: 'El juez requiere pago al deudor en 20 días.' },
  ],
}

export default function PageMonitorio() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Vía judicial · 9 min</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Procedimiento monitorio: cómo reclamar una deuda sin abogado</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">El procedimiento monitorio es el camino más rápido y barato en España para cobrar una deuda dineraria. Sin abogado si la cuantía es inferior a 2.000€.</p>
          </header>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es el procedimiento monitorio?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Es un procedimiento judicial <strong>simplificado y ágil</strong> regulado en los artículos 812-818 de la Ley de Enjuiciamiento Civil. Está pensado para reclamar deudas <strong>dinerarias, líquidas, vencidas y exigibles</strong>, sin límite máximo de cuantía.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Ventajas frente a un juicio ordinario</h2>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>✅ <strong>Sin abogado ni procurador</strong> si la cuantía es inferior a 2.000€.</li>
              <li>✅ <strong>Rápido:</strong> el juez requiere pago al deudor en 20 días.</li>
              <li>✅ <strong>Sin tasas judiciales</strong> para personas físicas.</li>
              <li>✅ <strong>Sin cuantía máxima:</strong> puedes reclamar 500€ o 500.000€.</li>
              <li>✅ <strong>Si el deudor no responde,</strong> se ejecuta directamente.</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Documentación que necesitas</h2>
            <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
              <li>Factura original (o contrato, presupuesto firmado, albarán...).</li>
              <li>Comunicaciones previas reclamando el pago (emails, burofax, cartas).</li>
              <li>Justificantes de envío del burofax (acuse y certificación de contenido).</li>
              <li>Datos completos del deudor (nombre/razón social, CIF/DNI, domicilio).</li>
              <li>Cálculo detallado de la deuda: principal + intereses + 40€ indemnización.</li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo presentar la demanda paso a paso</h2>
            <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
              <li><strong>Descarga el formulario oficial</strong> "Petición inicial de procedimiento monitorio" en la web del CGPJ (poderjudicial.es).</li>
              <li><strong>Rellénalo</strong> con tus datos, los del deudor, importe reclamado e identifica los documentos que adjuntas.</li>
              <li><strong>Adjunta toda la documentación.</strong></li>
              <li><strong>Preséntalo</strong> en el Decanato de los juzgados del <strong>domicilio del deudor</strong>. Puede ser:
                <ul className="ml-6 mt-2 space-y-1 list-disc">
                  <li>Presencial (con cita previa).</li>
                  <li>Online (con certificado digital) en sede.justicia.gob.es</li>
                </ul>
              </li>
              <li>El juzgado <strong>admite</strong> y emite requerimiento al deudor.</li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Qué pasa después de presentar la demanda</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
              <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Escenario 1 — El deudor paga:</strong> caso cerrado, cobras.</p>
              <p className="text-zinc-300 mb-3"><strong className="text-sky-400">Escenario 2 — El deudor no responde en 20 días:</strong> el juez dicta auto de ejecución. Puedes embargar cuentas, salarios, propiedades.</p>
              <p className="text-zinc-300"><strong className="text-sky-400">Escenario 3 — El deudor se opone:</strong> el procedimiento se convierte en juicio verbal u ordinario según cuantía. Aquí ya necesitarás abogado.</p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Cuánto cuesta?</h2>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li><strong>Personas físicas:</strong> 0€ en tasas judiciales.</li>
              <li><strong>Empresas (deuda &lt; 2.000€):</strong> 0€ en tasas + 0€ abogado.</li>
              <li><strong>Empresas (deuda &gt; 2.000€):</strong> tasas (~100€) + abogado y procurador (300-800€).</li>
              <li><strong>Si ganas:</strong> el deudor paga costas.</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo NO usar el monitorio</h2>
            <ul className="space-y-2 text-zinc-300 mb-6">
              <li>❌ Cuando hay <strong>disputa real</strong> sobre el servicio prestado.</li>
              <li>❌ Cuando la <strong>deuda no está documentada</strong> con factura/contrato.</li>
              <li>❌ Cuando ya ha pasado el <strong>plazo de prescripción</strong> (5 años).</li>
              <li>❌ Cuando esperas que el deudor <strong>se vaya a oponer</strong> y prefieres juicio ordinario directo.</li>
            </ul>
          </section>

          <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea genera la documentación lista para el monitorio</h3>
            <p className="text-zinc-300 mb-5">Cada email que manda Saldea queda registrado con fecha y contenido. Si tienes que ir al monitorio, exportas el historial en PDF y lo presentas como prueba documental. <strong>30 días gratis.</strong></p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
          </aside>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-zinc-500">Información orientativa. Para casos complejos consulta con un abogado.</p>
          </div>
        </div>
      </article>
    </>
  )
}

