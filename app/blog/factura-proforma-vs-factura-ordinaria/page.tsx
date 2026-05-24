import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factura proforma vs factura ordinaria: diferencias 2026 | Saldea',
  description: 'Qué es una factura proforma, cuándo usarla, diferencias legales con la factura ordinaria y plantilla gratis. Guía clara para autónomos y empresas.',
  alternates: { canonical: 'https://marsof.es/blog/factura-proforma-vs-factura-ordinaria' },
  keywords: [
    'factura proforma',
    'factura proforma vs ordinaria',
    'que es factura proforma',
    'diferencia factura ordinaria',
    'cuando usar proforma',
  ],
  openGraph: {
    title: 'Factura proforma vs factura ordinaria',
    description: 'Diferencias legales y cuándo usar cada una.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageProforma() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Facturación · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Factura proforma vs factura ordinaria</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Una se contabiliza, la otra no. Una vale para Hacienda, la otra no. Esta es la diferencia exacta y cuándo conviene cada una.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Diferencias clave</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Aspecto</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Factura proforma</th>
                  <th className="py-3 px-4 text-left text-zinc-100">Factura ordinaria</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Validez fiscal</td><td className="py-2 px-4">❌ No vale para Hacienda</td><td className="py-2 px-4">✅ Vale para Hacienda</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Genera IVA</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Genera IRPF</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Es contable</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Vinculante</td><td className="py-2 px-4">No (es oferta)</td><td className="py-2 px-4">Sí (es obligación)</td></tr>
                <tr><td className="py-2 px-4">Numeración correlativa</td><td className="py-2 px-4">No obligatoria</td><td className="py-2 px-4">Obligatoria</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es una factura proforma?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Una factura proforma es un <strong>documento informativo previo</strong> a la operación real. Funciona como un <strong>presupuesto formal con apariencia de factura</strong>: incluye todos los datos (cliente, importe, IVA, concepto) pero no genera obligación fiscal ni contable.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Cuándo conviene usarla?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Para enviar un presupuesto formal</strong> al cliente antes de empezar el trabajo.</li>
            <li>✓ <strong>Para que el cliente solicite financiación</strong> bancaria o fondos antes del pago.</li>
            <li>✓ <strong>Para operaciones internacionales</strong>, donde se necesita un documento previo al envío.</li>
            <li>✓ <strong>Para cobrar anticipos</strong> antes de emitir la factura final.</li>
            <li>✗ NUNCA para contabilizar o liquidar impuestos.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué pasa después de la proforma?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Cuando el cliente acepta y se realiza la operación real (entrega o cobro), debes emitir la <strong>factura ordinaria</strong> con los mismos datos pero con numeración correlativa fiscal. Esta sí va a tu libro de IVA e IRPF.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Elementos obligatorios de una proforma</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>La palabra "PROFORMA" claramente visible</li>
            <li>Tus datos (nombre, NIF, dirección)</li>
            <li>Datos del cliente</li>
            <li>Fecha de emisión</li>
            <li>Descripción del producto o servicio</li>
            <li>Precio unitario y total</li>
            <li>IVA aplicable (informativo)</li>
            <li>Total con IVA</li>
            <li>Validez de la oferta (15-30 días recomendado)</li>
            <li>Forma de pago propuesta</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla básica</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`FACTURA PROFORMA Nº [NUMERO]
Fecha: [FECHA]
Válida hasta: [FECHA + 30 días]

DE: [Tu nombre/empresa]
NIF/CIF: [Tu NIF]
Dirección: [Tu dirección]

A: [Cliente]
NIF/CIF: [NIF cliente]
Dirección: [Dirección cliente]

CONCEPTO          | CANT | PRECIO U. | TOTAL
[Servicio/producto] | 1   | 1.000€    | 1.000€

Base imponible:    1.000€
IVA (21%):           210€
TOTAL:             1.210€

Forma de pago: Transferencia bancaria a IBAN [TU IBAN]
Condiciones: 30% anticipo, 70% a la entrega.

Esta factura proforma NO tiene validez fiscal.
Se emitirá factura ordinaria tras la aceptación.`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores típicos con la proforma</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ <strong>Olvidar poner "PROFORMA"</strong> en grande. Si no lo pones, Hacienda puede considerarla factura real.</li>
            <li>❌ <strong>Usarla para cobrar</strong>. Para cobrar necesitas la factura ordinaria.</li>
            <li>❌ <strong>No emitir la factura ordinaria después</strong>. Si te pagan, tienes 30 días.</li>
            <li>❌ <strong>Numeración correlativa con las ordinarias</strong>. Las proformas llevan numeración separada.</li>
          </ul>
        </section>

        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Cuando emitas la factura ordinaria, conéctala con Saldea</h3>
          <p className="text-zinc-300 mb-5">Si el cliente acepta la proforma pero después se retrasa con la factura ordinaria, Saldea persigue el cobro automáticamente. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
