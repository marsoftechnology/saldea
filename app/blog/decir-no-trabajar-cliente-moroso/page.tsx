import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo decirle a un cliente que no vas a trabajar m�s con �l | Marsof',
  description: 'C�mo cortar relaci�n con un cliente moroso sin dramas. Frases exactas, momento adecuado y c�mo proteger los cobros pendientes.',
  alternates: { canonical: 'https://www.marsof.es/blog/decir-no-trabajar-cliente-moroso' },
  keywords: ['cortar cliente moroso', 'no trabajar m�s cliente', 'rescindir cliente impago', 'despedir cliente moroso'],
  openGraph: { title: 'C�mo decirle a un cliente que no trabajas m�s', description: 'Frases y momento adecuado.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo decirle a un cliente que no vas a trabajar m�s con �l", "description": "C�mo cortar relaci�n con un cliente moroso sin dramas. Frases exactas, momento adecuado y c�mo proteger los cobros pendientes.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/decir-no-trabajar-cliente-moroso"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Decisiones � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo decirle a un cliente que no vas a trabajar m�s con �l</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">A veces, soltar al cliente es la �nica forma de ganar. C�mo hacerlo sin perder los cobros pendientes.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo es momento de cortar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? M�s de 2 facturas seguidas vencidas</li>
            <li>? Cada nueva factura es lucha emocional</li>
            <li>? Te pide m�s trabajo aunque te debe dinero</li>
            <li>? Discute cada hito y cada precio</li>
            <li>? Te quita m�s energ�a que dinero te da</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Reglas antes de cortar</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Cobra todo lo pendiente antes de comunicarlo.</strong> Si cortas con deuda, complica el cobro.</li>
            <li><strong>Por escrito.</strong> Email formal, nunca solo WhatsApp.</li>
            <li><strong>Sin emociones.</strong> Profesional, tono neutro.</li>
            <li><strong>Sin culpar.</strong> Decisi�n empresarial, no personal.</li>
            <li><strong>Plazo limpio de transici�n.</strong> Si hay servicios activos, da 30 d�as.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantillas seg�n situaci�n</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Sin deuda pendiente, simple corte</h3>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], te escribo para comunicarte que, por decisiones de organizaci�n de mi negocio, no podr� continuar nuestra colaboraci�n. La factura [X] queda como �ltima que emitir�. Gracias por estos meses de trabajo. Un saludo."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Con factura pendiente</h3>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], debido a las dificultades para regularizar el pago de las facturas pendientes, te comunico que no podr� continuar ofreci�ndote mis servicios. Una vez se cierre el pago de la factura [X] daremos por finalizada la relaci�n comercial en buenos t�rminos. Quedo a la espera de tu confirmaci�n de fecha de pago."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente que pide m�s trabajo aunque debe</h3>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"[nombre], no puedo aceptar nuevos encargos mientras haya facturas pendientes de pago. Cuando la factura [X] est� cerrada, podemos retomar la conversaci�n sobre el nuevo proyecto."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el cliente insiste o se enfada</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Mantente firme pero educado:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Entiendo que no era la respuesta que esperabas. Es una decisi�n meditada por mi parte. Te deseo lo mejor y, sin rencores, cerremos la factura pendiente y dejamos la relaci�n en buenos t�rminos."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo que ganas al cortar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Tiempo para clientes que S� pagan</li>
            <li>? Energ�a mental recuperada</li>
            <li>? Calidad de vida</li>
            <li>? Liberas hueco en agenda para mejores oportunidades</li>
            <li>? Disuades a futuros morosos al ver que no toleras impagos</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea te avisa qu� clientes deber�as soltar</h3>
          <p className="text-zinc-300 mb-5">Dashboard con KPIs por cliente: DSO, retrasos acumulados, ratio cobro. Identifica problem�ticos antes de que te coman. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

