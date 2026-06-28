import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar a un cliente extranjero: SEPA, Wise y reclamaciones | Marsof',
  description: 'M�todos de pago, divisas, marco legal y reclamaci�n internacional. Todo lo que necesitas para cobrar a clientes fuera de Espa�a.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-cliente-extranjero' },
  keywords: ['cobrar cliente extranjero', 'cobrar a UK', 'cobrar internacional', 'SEPA UE', 'Wise cobros'],
  openGraph: { title: 'C�mo cobrar a un cliente extranjero', description: 'SEPA, Wise y reclamaciones.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar a un cliente extranjero: SEPA, Wise y reclamaciones", "description": "M�todos de pago, divisas, marco legal y reclamaci�n internacional. Todo lo que necesitas para cobrar a clientes fuera de Espa�a.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-cliente-extranjero"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar a un cliente extranjero</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">SEPA, Wise, PayPal, Stripe. El m�todo que elijas marca la velocidad y el coste del cobro.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">M�todos seg�n destino</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Destino</th><th className="py-3 px-4 text-left text-zinc-100">Mejor m�todo</th><th className="py-3 px-4 text-left text-zinc-100">Coste</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">UE (SEPA)</td><td className="py-2 px-4">Transferencia SEPA</td><td className="py-2 px-4">0�</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Reino Unido</td><td className="py-2 px-4">Wise</td><td className="py-2 px-4">0,5-1%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">EE.UU.</td><td className="py-2 px-4">Stripe / Wise</td><td className="py-2 px-4">1,5-3%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">LATAM</td><td className="py-2 px-4">Stripe / Wise / PayPal</td><td className="py-2 px-4">3-5%</td></tr>
                <tr><td className="py-2 px-4">Asia</td><td className="py-2 px-4">Wise / Payoneer</td><td className="py-2 px-4">1-3%</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Trucos clave</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Factura en EUR</strong> aunque le env�es a USD/GBP. T� no asumes riesgo divisa</li>
            <li>? <strong>Pide anticipo del 50%</strong> con cliente extranjero nuevo (no tienes recurso legal f�cil)</li>
            <li>? <strong>Stripe Connect</strong> permite cobrar en 130+ pa�ses sin comisi�n adicional</li>
            <li>? <strong>IVA:</strong> dentro UE con CIF intracomunitario v�lido = sin IVA. Fuera UE = sin IVA</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si no paga</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Reclamar internacional es 10x m�s dif�cil que nacional:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Dentro UE:</strong> proceso europeo de escasa cuant�a (Reglamento 861/2007). Hasta 5.000�</li>
            <li>? <strong>Burofax internacional</strong> equivalente v�a correos.es</li>
            <li>? <strong>Plataformas de cobro internacional:</strong> Atradius, Coface, Intrum</li>
            <li>? <strong>Monitorio espa�ol NO sirve</strong> contra empresas extranjeras sin sede en Espa�a</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea funciona con Stripe Connect internacional</h3>
          <p className="text-zinc-300 mb-5">Link de pago Stripe que acepta clientes de 130+ pa�ses. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

