import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prescripci�n de deudas comerciales en Espa�a: �a los 5 a�os? | Marsof',
  description: 'Cu�ndo prescribe una deuda en Espa�a, c�mo interrumpir la prescripci�n y c�mo aprovecharla a tu favor como acreedor.',
  alternates: { canonical: 'https://www.marsof.es/blog/deuda-prescripcion-5-anos' },
  keywords: ['prescripci�n deuda 5 a�os', 'plazo prescripci�n factura', 'interrumpir prescripci�n deuda', 'cu�ndo prescribe deuda comercial'],
  openGraph: { title: 'Prescripci�n de deudas comerciales en Espa�a', description: 'Plazo y c�mo interrumpirlo.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Prescripci�n de deudas comerciales en Espa�a: �a los 5 a�os?", "description": "Cu�ndo prescribe una deuda en Espa�a, c�mo interrumpir la prescripci�n y c�mo aprovecharla a tu favor como acreedor.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/deuda-prescripcion-5-anos"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Marco legal � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Prescripci�n de deudas comerciales en Espa�a</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El plazo es 5 a�os. Pero hay un truco que pocos conocen para mantener tu derecho a cobrar indefinidamente.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El plazo: 5 a�os</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Seg�n el <strong>art�culo 1964 del C�digo Civil</strong> (reformado en 2015), las acciones personales sin plazo especial prescriben a los <strong>5 a�os</strong>. Esto incluye las deudas comerciales.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Antes de 2015 eran 15 a�os. Si tu deuda es anterior a esa fecha, aplica el plazo viejo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El truco: interrumpir la prescripci�n</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El plazo se REINICIA cada vez que:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Mandas email reclamando el pago</li>
            <li>? Env�as burofax</li>
            <li>? Inicias procedimiento monitorio</li>
            <li>? El deudor reconoce la deuda (por email, WhatsApp, conversaci�n)</li>
            <li>? El deudor hace un pago parcial</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Cualquiera de estos actos resetea el contador a 5 a�os desde la fecha del acto.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo aprovecharlo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tienes una deuda vieja:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Manda un email a cualquier deuda &gt; 3 a�os para interrumpir prescripci�n</li>
            <li>Guarda copia del email (es tu prueba)</li>
            <li>Vuelve a interrumpir cada 4-5 a�os si la deuda sigue impagada</li>
            <li>Puedes mantener vivo el derecho a cobrar indefinidamente</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantilla para interrumpir prescripci�n</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Asunto: Reclamaci�n de la factura [X] del [FECHA]<br/><br/>Hola [nombre],<br/><br/>Te recuerdo que sigue pendiente el pago de la factura [X] del [fecha], por importe de [X]� m�s intereses Ley 3/2004 acumulados.<br/><br/>Esta comunicaci�n tiene efecto interruptivo de la prescripci�n conforme al art. 1973 del C�digo Civil. Quedo a la espera de tu respuesta para zanjar la deuda.<br/><br/>Un saludo,<br/>[tu nombre]"</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Mencionar el "art. 1973 CC" refuerza el efecto interruptivo en caso de juicio.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Casos especiales</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li><strong>Honorarios profesionales (abogados, m�dicos):</strong> 3 a�os (Art. 1967 CC)</li>
            <li><strong>Contratos transporte:</strong> 6 meses (Ley 15/2009)</li>
            <li><strong>Deudas con Administraci�n:</strong> 4 a�os (Ley General Tributaria)</li>
            <li><strong>Pagar�s / letras de cambio:</strong> 3 a�os</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea registra cada interrupci�n</h3>
          <p className="text-zinc-300 mb-5">Cada email que env�a queda con fecha exacta. Sirve como prueba de interrupci�n de la prescripci�n en caso de juicio. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

