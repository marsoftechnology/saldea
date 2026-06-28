import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo enviar un burofax para reclamar una deuda (guía 2026) | Marsof',
  description: 'Paso a paso para mandar un burofax legal en España: contenido, coste, dónde enviarlo y modelo gratis. Útil antes del procedimiento monitorio.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-enviar-burofax-reclamar-deuda' },
  keywords: [
    'cómo enviar burofax',
    'burofax reclamar deuda',
    'modelo burofax impago',
    'burofax precio',
    'burofax correos',
    'burofax certificado deuda',
  ],
  openGraph: {
    title: 'Cómo enviar un burofax para reclamar una deuda',
    description: 'Guía paso a paso con modelo gratis y precios actualizados 2026.',
    type: 'article',
    locale: 'es_ES',
  },
}

const schemaHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo enviar un burofax para reclamar una deuda',
  totalTime: 'PT20M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '35' },
  step: [
    { '@type': 'HowToStep', name: 'Redactar el contenido', text: 'Identifica deudor, deuda, factura e intereses según Ley 3/2004.' },
    { '@type': 'HowToStep', name: 'Elegir modalidad', text: 'Burofax con acuse de recibo y certificación de contenido.' },
    { '@type': 'HowToStep', name: 'Enviarlo en Correos', text: 'Online o presencial. Coste 25-40€.' },
    { '@type': 'HowToStep', name: 'Guardar justificantes', text: 'Acuse de recibo + certificación de contenido como prueba.' },
  ],
}

export default function PageBurofax() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <article className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
          <header className="mb-10">
            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Procedimiento legal · 7 min</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo enviar un burofax para reclamar una deuda</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">El burofax es la mejor prueba antes de ir a juicio. Te explico cuándo usarlo, qué debe contener y cómo enviarlo paso a paso.</p>
          </header>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es exactamente un burofax?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Un burofax es un envío postal de Correos con <strong>tres características legales</strong> únicas: acuse de recibo (sabes quién y cuándo lo recibió), certificación de contenido (Correos da fe de lo enviado) y valor probatorio en juicio.</p>
            <p className="text-zinc-300 leading-relaxed mb-4">Es la herramienta perfecta para reclamar una deuda cuando los emails ya no funcionan, justo antes de iniciar la vía judicial.</p>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Cuánto cuesta un burofax en 2026?</h2>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
              <ul className="space-y-2 text-zinc-300">
                <li><strong className="text-sky-400">Online (Correos.es):</strong> ~28€ con acuse y certificación</li>
                <li><strong className="text-sky-400">Presencial en oficina:</strong> ~35€</li>
                <li><strong className="text-sky-400">Páginas extra:</strong> +0,30€ por página adicional</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Qué debe contener el burofax</h2>
            <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
              <li><strong>Identificación del acreedor</strong> (tu empresa o nombre, CIF/DNI).</li>
              <li><strong>Identificación del deudor</strong> (nombre completo, CIF/DNI, dirección).</li>
              <li><strong>Origen de la deuda:</strong> número de factura, fecha, concepto, importe.</li>
              <li><strong>Intereses de demora</strong> conforme a la Ley 3/2004 (tipo BCE + 8 puntos).</li>
              <li><strong>Indemnización de 40€</strong> por costes de cobro.</li>
              <li><strong>Plazo</strong> para pagar (10 días naturales suele ser estándar).</li>
              <li><strong>Advertencia</strong> de que en caso contrario se iniciarán acciones judiciales.</li>
              <li><strong>Lugar, fecha y firma.</strong></li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Modelo de burofax (gratis)</h2>
            <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
              <p className="text-zinc-300 text-sm whitespace-pre-line">
{`[Tu nombre/empresa]
[Tu CIF/DNI]
[Tu dirección]

A: [Nombre del deudor]
[CIF/DNI del deudor]
[Dirección del deudor]

[Lugar y fecha]

Asunto: Requerimiento de pago — Factura [NÚMERO]

Muy Sr./Sra. mío/a:

Mediante el presente burofax le requiero formalmente al pago de la deuda que mantiene con [empresa] derivada de la factura nº [NÚMERO], emitida el [FECHA] por importe de [IMPORTE]€, cuyo vencimiento se produjo el [FECHA VENCIMIENTO] y que a día de hoy continúa impagada.

Conforme a la Ley 3/2004 de 29 de diciembre, de medidas de lucha contra la morosidad en operaciones comerciales, le reclamo:

- Principal: [IMPORTE]€
- Intereses de demora (BCE + 8 puntos): [CALCULAR]€
- Indemnización por costes de cobro: 40€
- TOTAL: [SUMA]€

Le concedo un plazo improrrogable de 10 días naturales desde la recepción del presente para abonar la cantidad indicada mediante transferencia a la cuenta [IBAN].

Transcurrido dicho plazo sin atender al pago, procederé a iniciar las acciones judiciales oportunas, repercutiéndole en su totalidad las costas y gastos derivados.

Atentamente,
[Firma]
[Tu nombre]`}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo enviarlo paso a paso</h2>
            <ol className="space-y-3 text-zinc-300 list-decimal list-inside mb-6">
              <li>Entra en <strong>correos.es</strong> e identifícate.</li>
              <li>Busca "Burofax online".</li>
              <li>Pega el texto del modelo adaptado a tu caso.</li>
              <li>Marca: <strong>"con acuse de recibo"</strong> y <strong>"con certificación de contenido"</strong>.</li>
              <li>Paga (28-35€) y envía.</li>
              <li>Correos te envía PDF firmado del acuse en 2-5 días.</li>
            </ol>

            <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Y si no lo recoge el deudor?</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">Aunque el deudor no recoja el burofax, <strong>se considera entregado a efectos legales</strong> si Correos ha intentado entregarlo y dejado aviso. Esto basta para iniciar el procedimiento monitorio posterior.</p>
          </section>

          <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Antes del burofax, prueba con Saldea</h3>
            <p className="text-zinc-300 mb-5">Muchos clientes pagan en cuanto reciben un recordatorio firme automático. Saldea manda emails escalados con IA. Si tras 30 días no paga, ya tienes pruebas listas para el burofax. <strong>30 días gratis.</strong></p>
            <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
          </aside>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-zinc-500">Información orientativa. Para casos concretos consulta con un abogado.</p>
          </div>
        </div>
      </article>
    </>
  )
}

