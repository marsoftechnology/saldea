import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Factura electrónica B2B obligatoria en España: fechas y guía | Saldea',
  description: 'La Ley Crea y Crece obliga a usar factura electrónica entre empresas en España. Fechas exactas, multas y cómo prepararte. Guía 2026.',
  alternates: { canonical: 'https://marsof.es/blog/factura-electronica-b2b-obligatoria-espana' },
  keywords: [
    'factura electronica obligatoria',
    'factura electronica B2B',
    'ley crea y crece factura',
    'factura electronica empresas espana',
    'factura electronica 2026 2027',
  ],
  openGraph: {
    title: 'Factura electrónica B2B obligatoria en España',
    description: 'Fechas, multas y guía práctica.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function PageFacturaBB() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Normativa fiscal · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Factura electrónica B2B obligatoria en España</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">La Ley Crea y Crece obliga a todas las empresas a emitir factura electrónica entre ellas. Fechas exactas, multas y cómo prepararte sin volverte loco.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué es la factura electrónica obligatoria B2B?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 18/2022 (Ley Crea y Crece)</strong> obliga a que TODAS las facturas emitidas entre empresas (B2B) en España sean electrónicas. No vale enviar un PDF por email: tiene que ser un documento electrónico estructurado (XML, formato Facturae) que se intercambie por una plataforma autorizada.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿A quién obliga?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Todas las empresas y autónomos</strong> que operen en España</li>
            <li>✓ Cualquier factura entre empresas, sin importe mínimo</li>
            <li>✗ <strong>NO obliga</strong> a facturas a consumidor final (B2C)</li>
            <li>✗ <strong>NO obliga</strong> a operaciones simplificadas (tickets &lt; 400€)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Fechas clave</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20">
                  <th className="py-3 px-4 text-left text-zinc-100">Fecha</th>
                  <th className="py-3 px-4 text-left text-zinc-100">A quién afecta</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">2 julio 2025</td><td className="py-2 px-4">Empresas con facturación &gt; 8M€</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">2 julio 2026</td><td className="py-2 px-4">Resto de empresas y autónomos</td></tr>
                <tr><td className="py-2 px-4">Continuo</td><td className="py-2 px-4">Aceptación obligatoria de e-facturas recibidas</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">¿Qué tiene que incluir una factura electrónica?</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Formato estructurado <strong>Facturae 3.2.x</strong> (XML estandarizado del Gobierno español)</li>
            <li><strong>Firma electrónica avanzada</strong> con certificado digital reconocido</li>
            <li>Envío a través de plataformas autorizadas o conexión directa con FACeB2B</li>
            <li>Conservación durante <strong>6 años</strong> (plazo de prescripción fiscal)</li>
            <li>Trazabilidad: estado (enviada, recibida, pagada, rechazada)</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Multas por incumplimiento</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🔴 <strong>No emitir e-factura cuando es obligatoria:</strong> hasta <strong>10.000€</strong></li>
            <li>🔴 <strong>No aceptar e-factura recibida:</strong> hasta <strong>10.000€</strong></li>
            <li>🔴 <strong>Manipulación de datos:</strong> sanción + responsabilidad penal</li>
            <li>🟡 <strong>Retraso en la información de estado al cliente:</strong> infracción leve</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plataformas y software</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tienes 2 opciones:</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Opción 1 — Software privado homologado</h3>
          <ul className="space-y-2 text-zinc-300 mb-4">
            <li>Holded · Quipu · Anfix · Sage 50 · Billin · FacturaScripts</li>
            <li>Generan Facturae automáticamente</li>
            <li>Conexión con plataformas de intercambio</li>
            <li>Coste: 20-100€/mes según volumen</li>
          </ul>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Opción 2 — Plataforma pública (FACeB2B)</h3>
          <ul className="space-y-2 text-zinc-300 mb-4">
            <li>Sistema gratuito del Gobierno español</li>
            <li>Solo para empresas con poco volumen</li>
            <li>Funcionalidad básica</li>
            <li>Coste: 0€</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Diferencia entre Veri*factu y factura electrónica B2B</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Mucha confusión por aquí. Son DOS cosas diferentes:</p>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-5">
            <p className="text-zinc-200 mb-2"><strong className="text-sky-400">Veri*factu (RD 1007/2023):</strong></p>
            <p className="text-zinc-400 text-sm mb-3">Sistema de verificación e integridad de cualquier factura emitida (B2B y B2C). El software de facturación firma cada factura y manda registros a Hacienda. Obligatorio desde 2026.</p>
            <p className="text-zinc-200 mb-2"><strong className="text-sky-400">Factura electrónica B2B (Ley Crea y Crece):</strong></p>
            <p className="text-zinc-400 text-sm">Obligación de que las facturas entre empresas sean en formato estructurado (Facturae XML) y se intercambien por plataformas, en lugar de PDF por email. Obligatorio desde julio 2026 para todos.</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Las dos se aplican a la vez. Si emites una factura B2B en 2026: tiene que cumplir Veri*factu (registro firmado a Hacienda) Y enviarse como Facturae (XML estructurado).</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo prepararte ahora</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Cambia a un software de facturación <strong>homologado</strong> para Veri*factu y compatible con Facturae</li>
            <li>Obtén tu <strong>certificado digital</strong> de FNMT o equivalente</li>
            <li>Habla con tu asesor para configurar la conexión con FACeB2B o la plataforma que uses</li>
            <li>Prueba enviar 1 factura electrónica a un cliente antes del plazo límite</li>
            <li>Configura la recepción: tus clientes también te enviarán Facturae a partir de 2026</li>
          </ol>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea convive perfectamente con tu Facturae</h3>
          <p className="text-zinc-300 mb-5">Tu software de facturación emite la Facturae cumpliendo la ley. Saldea importa el dato y persigue el cobro si el cliente se retrasa. Cada uno hace lo suyo. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
