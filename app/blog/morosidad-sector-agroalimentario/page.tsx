import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morosidad sector agroalimentario 2026: cobrar a cadenas y mayoristas | Marsof',
  description: 'C�mo cobrar a cadenas de supermercados y mayoristas en el sector agroalimentario. Ley de la Cadena Alimentaria, plazos legales y cl�usulas.',
  alternates: { canonical: 'https://www.marsof.es/blog/morosidad-sector-agroalimentario' },
  keywords: ['cobrar agroalimentario', 'ley cadena alimentaria', 'cobrar supermercados', 'productor frutas cobros', 'cooperativa cobros'],
  openGraph: { title: 'Morosidad sector agroalimentario', description: 'Cobrar a cadenas y mayoristas.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Morosidad sector agroalimentario 2026: cobrar a cadenas y mayoristas", "description": "C�mo cobrar a cadenas de supermercados y mayoristas en el sector agroalimentario. Ley de la Cadena Alimentaria, plazos legales y cl�usulas.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/morosidad-sector-agroalimentario"}

export default function PageAgro() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector � 8 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Morosidad en el sector agroalimentario</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Productores, cooperativas y mayoristas tienen una ley espec�fica que protege sus cobros: la Ley de la Cadena Alimentaria. Pero hay que saber usarla.</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El marco legal espec�fico</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La <strong>Ley 12/2013 de la Cadena Alimentaria</strong> (modificada por Ley 16/2021) establece plazos m�ximos de pago especialmente cortos para productos agroalimentarios.</p>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Producto</th><th className="py-3 px-4 text-left text-zinc-100">Plazo m�ximo</th></tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Productos perecederos (frutas, hortalizas, l�cteos, carne fresca)</td><td className="py-2 px-4">30 d�as</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Resto de alimentos</td><td className="py-2 px-4">60 d�as</td></tr>
                <tr><td className="py-2 px-4">Cualquier sancionable</td><td className="py-2 px-4">Imperativos, no pactables</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Qui�n est� obligado por la Ley de la Cadena</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Industria alimentaria que compra a productores</li>
            <li>? Cadenas de supermercados (Mercadona, Carrefour, Lidl, Eroski, D�a, El Corte Ingl�s)</li>
            <li>? Mayoristas y distribuidores</li>
            <li>? Cualquier operador que pague a un productor primario o cooperativa</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Sanciones por incumplir</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Pagar fuera de plazo:</strong> infracci�n grave, multa de 3.001 a 100.000�</li>
            <li>?? <strong>Pacto de plazo superior:</strong> infracci�n muy grave, hasta 1.000.000�</li>
            <li>?? <strong>Reincidencia:</strong> el doble</li>
            <li>?? <strong>Denuncia:</strong> AICA (Agencia de Informaci�n y Control Alimentarios)</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo cobrar a una cadena que se retrasa</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>D�a 1 vencimiento:</strong> recordatorio amable mencionando expresamente la Ley 12/2013</li>
            <li><strong>D�a 7:</strong> recordatorio firme con c�lculo de intereses + 40� por factura</li>
            <li><strong>D�a 15:</strong> llamada al jefe de proveedores / departamento de pagos</li>
            <li><strong>D�a 30:</strong> burofax + amenaza de denuncia a AICA</li>
            <li><strong>D�a 45:</strong> denuncia REAL a AICA si persiste el impago</li>
          </ol>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Truco que pocos saben:</strong> denunciar a AICA es gratis y muy efectivo. Las cadenas grandes temen estas denuncias porque les ponen el foco. Muchas veces pagan al d�a siguiente de recibir aviso.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cl�usulas clave en contratos agroalimentarios</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Plazo de pago:</strong> 30 d�as (perecederos) o 60 d�as (resto)</li>
            <li>? <strong>Ley 12/2013 expresa</strong> mencionada</li>
            <li>? <strong>Anticipo en cooperativas:</strong> habitual 30-50%</li>
            <li>? <strong>Cl�usula de devoluci�n</strong> con plazos cortos (24h para perecederos)</li>
            <li>? <strong>Sin pactos accesorios</strong> que disfracen pagos tard�os (descuentos por pronto pago disfrazados de plazos largos)</li>
          </ul>
        </section>

        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea conoce la Ley 12/2013</h3>
          <p className="text-zinc-300 mb-5">Los recordatorios autom�ticos citan la Ley de la Cadena Alimentaria cuando corresponde. Ideal para cooperativas, productores y mayoristas. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

