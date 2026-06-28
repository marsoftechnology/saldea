import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cliente que dispute la factura: c�mo defender tu cobro | Marsof',
  description: 'El cliente dice "no estoy conforme" para evitar pagar. C�mo distinguir disputa leg�tima de excusa y c�mo defender tu factura.',
  alternates: { canonical: 'https://www.marsof.es/blog/cliente-disputa-factura' },
  keywords: ['cliente disputa factura', 'cliente no conforme', 'reclamar disputa factura', 'cobrar con disputa'],
  openGraph: { title: 'Cliente que dispute la factura', description: 'C�mo defender tu cobro.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Cliente que dispute la factura: c�mo defender tu cobro", "description": "El cliente dice \"no estoy conforme\" para evitar pagar. C�mo distinguir disputa leg�tima de excusa y c�mo defender tu factura.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/cliente-disputa-factura"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso espec�fico � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cliente que disputa la factura</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">"No estoy de acuerdo". A veces es disputa real, otras veces excusa para no pagar. C�mo distinguirlas.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Disputa real vs excusa</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Disputa real (~30%):</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Aparece TRAS la entrega, no despu�s del recordatorio</li>
            <li>? Identifica punto concreto del trabajo</li>
            <li>? Aporta razones t�cnicas</li>
            <li>? Propone soluci�n</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Excusa (~70%):</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Aparece despu�s de tu recordatorio de pago</li>
            <li>? Vago ("no me convence")</li>
            <li>? No identifica nada concreto</li>
            <li>? No propone soluci�n, solo se queja</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo responder ante disputa</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Vale, dime exactamente qu� punto no cumple. Te concedo 7 d�as para detallarlo por escrito. Pasado este plazo, sin alegaci�n concreta, mantengo la factura."</p>
          </div>
          <p className="text-zinc-300 leading-relaxed mb-4">Esa frase fuerza al cliente a concretar. Si era excusa, no podr� concretar y la disputa se desinfla. Si es real, te lo dir� y podr�s resolver.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si tiene raz�n parcialmente</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Reconoce el error sin disculparse en exceso</li>
            <li>? Ofrece correcci�n r�pida (no nuevo presupuesto)</li>
            <li>? O descuento parcial: "Te aplico 10% de descuento para zanjarlo"</li>
            <li>? Documenta el acuerdo por email</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si NO tiene raz�n</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Mant�n la factura. Defensa:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Presenta presupuesto/contrato firmado donde se acord� lo entregado</li>
            <li>? Emails donde el cliente confirma encargo y aceptaci�n</li>
            <li>? Si pasaron 7-15 d�as sin rechazar = aceptaci�n t�cita</li>
            <li>? Documenta toda la negociaci�n por escrito</li>
            <li>? Sigue con el plan de cobro: recordatorios, burofax, monitorio</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo aceptar descuento</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Acepta descuento si:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Recuperas el cobro inmediato (en 7 d�as)</li>
            <li>? Mantienes el cliente para futuras facturas</li>
            <li>? El descuento es &lt; coste de monitorio</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">No aceptes si es cliente puntual que no volver�s a ver. Mant�n factura �ntegra.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea detecta disputas y pausa el env�o</h3>
          <p className="text-zinc-300 mb-5">La IA reconoce cuando el cliente responde "no estoy conforme" y pausa los recordatorios para que T� gestiones la disputa. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

