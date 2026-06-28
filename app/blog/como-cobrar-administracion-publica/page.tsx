import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a la Administración Pública en España (2026) | Marsof',
  description: 'Plazos reales, marco legal y trucos para cobrar más rápido a Ayuntamientos, Diputaciones y Comunidades Autónomas. Ley 9/2017 y monitorio.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-administracion-publica' },
  keywords: ['cobrar administración pública', 'cobrar ayuntamiento', 'morosidad sector público', 'ley 9/2017 contratos'],
  openGraph: { title: 'Cómo cobrar a la Administración Pública', description: 'Plazos y trucos legales.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar a la Administración Pública</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Por ley te deben pagar a 30 días. En la realidad, 90-180 días es común. Te explico cómo acelerarlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 9/2017 de Contratos del Sector Público</strong> obliga a la Administración a pagar en <strong>30 días naturales desde la conformidad de la factura</strong>. La conformidad se entiende otorgada a los 30 días de presentación si no la rechazan expresamente.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Resultado teórico: máximo 60 días desde que presentas factura. Realidad: pueden pasar 90-180 días.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Pasos para cobrar más rápido</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Factura electrónica en FACe</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Las facturas a Administración Pública deben presentarse a través del portal <strong>FACe</strong> (face.gob.es). Si no la presentas ahí, no cuenta como entregada y el plazo no empieza.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Códigos DIR3 correctos</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada Administración tiene 3 códigos obligatorios (oficina contable, órgano gestor, unidad tramitadora). Confirma estos códigos ANTES de facturar. Si están mal, te devuelven la factura y empiezas de cero.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Seguimiento sistemático</h3>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>Día 7: "Confirmadme recepción de la factura X"</li>
            <li>Día 30: "¿Está aprobada la factura X?"</li>
            <li>Día 45: "Falta confirmar fecha de pago"</li>
            <li>Día 60: "Han pasado los 30 días desde conformidad. Solicito información de pago"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si pasan 60 días sin pagar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tienes 3 herramientas legales potentes:</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">A) Certificación expresa</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Pides al interventor que CERTIFIQUE el reconocimiento de la obligación. Una vez certificada, puedes ir a vía judicial directamente.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">B) Reclamación de intereses</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Pasados los 30 días desde conformidad, se devengan intereses + 40€ automáticos. Recláma por escrito mencionando la Ley 9/2017 y la Ley 3/2004.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">C) Procedimiento monitorio o ejecutivo</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Pasados 90 días, puedes ir a juzgado contencioso-administrativo. Con factura electrónica registrada en FACe, tienes prueba suficiente.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Trucos que muchos no usan</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Plan de pago a proveedores:</strong> algunos Ayuntamientos abren ventanas de "pago a 90 días con descuento del 2-3%". Vale la pena</li>
            <li>? <strong>Cesión a empresa de cobro:</strong> hay empresas que compran tu factura administración a descuento del 5-10%</li>
            <li>? <strong>Confirming público:</strong> ICO ofrece programas de pronto pago a proveedores de administración</li>
            <li>? <strong>Junta Consultiva de Contratación:</strong> denuncia formal si retraso reiterado</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo NO trabajar con Administración</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Si tu pyme no aguanta 60-120 días sin cobrar</li>
            <li>? Si el importe es bajo (&lt;1.000€): no compensa el trámite</li>
            <li>? Si Administración con histórico de morosidad publicado</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea sigue el ritmo de la Administración</h3>
          <p className="text-zinc-300 mb-5">Recordatorios programados a 30/60/90 días con citas legales correctas (Ley 9/2017). Sin que tengas que llevar la cuenta. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
  )
}

