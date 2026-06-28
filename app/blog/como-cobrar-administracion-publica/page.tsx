import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar a la Administraci�n P�blica en Espa�a (2026) | Marsof',
  description: 'Plazos reales, marco legal y trucos para cobrar m�s r�pido a Ayuntamientos, Diputaciones y Comunidades Aut�nomas. Ley 9/2017 y monitorio.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-administracion-publica' },
  keywords: ['cobrar administraci�n p�blica', 'cobrar ayuntamiento', 'morosidad sector p�blico', 'ley 9/2017 contratos'],
  openGraph: { title: 'C�mo cobrar a la Administraci�n P�blica', description: 'Plazos y trucos legales.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar a la Administraci�n P�blica en Espa�a (2026)", "description": "Plazos reales, marco legal y trucos para cobrar m�s r�pido a Ayuntamientos, Diputaciones y Comunidades Aut�nomas. Ley 9/2017 y monitorio.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-administracion-publica"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar a la Administraci�n P�blica</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Por ley te deben pagar a 30 d�as. En la realidad, 90-180 d�as es com�n. Te explico c�mo acelerarlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 9/2017 de Contratos del Sector P�blico</strong> obliga a la Administraci�n a pagar en <strong>30 d�as naturales desde la conformidad de la factura</strong>. La conformidad se entiende otorgada a los 30 d�as de presentaci�n si no la rechazan expresamente.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Resultado te�rico: m�ximo 60 d�as desde que presentas factura. Realidad: pueden pasar 90-180 d�as.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Pasos para cobrar m�s r�pido</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Factura electr�nica en FACe</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Las facturas a Administraci�n P�blica deben presentarse a trav�s del portal <strong>FACe</strong> (face.gob.es). Si no la presentas ah�, no cuenta como entregada y el plazo no empieza.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. C�digos DIR3 correctos</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada Administraci�n tiene 3 c�digos obligatorios (oficina contable, �rgano gestor, unidad tramitadora). Confirma estos c�digos ANTES de facturar. Si est�n mal, te devuelven la factura y empiezas de cero.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Seguimiento sistem�tico</h3>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>D�a 7: "Confirmadme recepci�n de la factura X"</li>
            <li>D�a 30: "�Est� aprobada la factura X?"</li>
            <li>D�a 45: "Falta confirmar fecha de pago"</li>
            <li>D�a 60: "Han pasado los 30 d�as desde conformidad. Solicito informaci�n de pago"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si pasan 60 d�as sin pagar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tienes 3 herramientas legales potentes:</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">A) Certificaci�n expresa</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Pides al interventor que CERTIFIQUE el reconocimiento de la obligaci�n. Una vez certificada, puedes ir a v�a judicial directamente.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">B) Reclamaci�n de intereses</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Pasados los 30 d�as desde conformidad, se devengan intereses + 40� autom�ticos. Recl�ma por escrito mencionando la Ley 9/2017 y la Ley 3/2004.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">C) Procedimiento monitorio o ejecutivo</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Pasados 90 d�as, puedes ir a juzgado contencioso-administrativo. Con factura electr�nica registrada en FACe, tienes prueba suficiente.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Trucos que muchos no usan</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Plan de pago a proveedores:</strong> algunos Ayuntamientos abren ventanas de "pago a 90 d�as con descuento del 2-3%". Vale la pena</li>
            <li>? <strong>Cesi�n a empresa de cobro:</strong> hay empresas que compran tu factura administraci�n a descuento del 5-10%</li>
            <li>? <strong>Confirming p�blico:</strong> ICO ofrece programas de pronto pago a proveedores de administraci�n</li>
            <li>? <strong>Junta Consultiva de Contrataci�n:</strong> denuncia formal si retraso reiterado</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo NO trabajar con Administraci�n</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Si tu pyme no aguanta 60-120 d�as sin cobrar</li>
            <li>? Si el importe es bajo (&lt;1.000�): no compensa el tr�mite</li>
            <li>? Si Administraci�n con hist�rico de morosidad publicado</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea sigue el ritmo de la Administraci�n</h3>
          <p className="text-zinc-300 mb-5">Recordatorios programados a 30/60/90 d�as con citas legales correctas (Ley 9/2017). Sin que tengas que llevar la cuenta. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

