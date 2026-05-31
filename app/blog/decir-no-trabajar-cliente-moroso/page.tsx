import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo decirle a un cliente que no vas a trabajar más con él | Saldea',
  description: 'Cómo cortar relación con un cliente moroso sin dramas. Frases exactas, momento adecuado y cómo proteger los cobros pendientes.',
  alternates: { canonical: 'https://marsof.es/blog/decir-no-trabajar-cliente-moroso' },
  keywords: ['cortar cliente moroso', 'no trabajar más cliente', 'rescindir cliente impago', 'despedir cliente moroso'],
  openGraph: { title: 'Cómo decirle a un cliente que no trabajas más', description: 'Frases y momento adecuado.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Decisiones · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo decirle a un cliente que no vas a trabajar más con él</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">A veces, soltar al cliente es la única forma de ganar. Cómo hacerlo sin perder los cobros pendientes.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo es momento de cortar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✗ Más de 2 facturas seguidas vencidas</li>
            <li>✗ Cada nueva factura es lucha emocional</li>
            <li>✗ Te pide más trabajo aunque te debe dinero</li>
            <li>✗ Discute cada hito y cada precio</li>
            <li>✗ Te quita más energía que dinero te da</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Reglas antes de cortar</h2>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li><strong>Cobra todo lo pendiente antes de comunicarlo.</strong> Si cortas con deuda, complica el cobro.</li>
            <li><strong>Por escrito.</strong> Email formal, nunca solo WhatsApp.</li>
            <li><strong>Sin emociones.</strong> Profesional, tono neutro.</li>
            <li><strong>Sin culpar.</strong> Decisión empresarial, no personal.</li>
            <li><strong>Plazo limpio de transición.</strong> Si hay servicios activos, da 30 días.</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantillas según situación</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Sin deuda pendiente, simple corte</h3>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], te escribo para comunicarte que, por decisiones de organización de mi negocio, no podré continuar nuestra colaboración. La factura [X] queda como última que emitiré. Gracias por estos meses de trabajo. Un saludo."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Con factura pendiente</h3>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], debido a las dificultades para regularizar el pago de las facturas pendientes, te comunico que no podré continuar ofreciéndote mis servicios. Una vez se cierre el pago de la factura [X] daremos por finalizada la relación comercial en buenos términos. Quedo a la espera de tu confirmación de fecha de pago."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente que pide más trabajo aunque debe</h3>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"[nombre], no puedo aceptar nuevos encargos mientras haya facturas pendientes de pago. Cuando la factura [X] esté cerrada, podemos retomar la conversación sobre el nuevo proyecto."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el cliente insiste o se enfada</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Mantente firme pero educado:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Entiendo que no era la respuesta que esperabas. Es una decisión meditada por mi parte. Te deseo lo mejor y, sin rencores, cerremos la factura pendiente y dejamos la relación en buenos términos."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo que ganas al cortar</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ Tiempo para clientes que SÍ pagan</li>
            <li>✓ Energía mental recuperada</li>
            <li>✓ Calidad de vida</li>
            <li>✓ Liberas hueco en agenda para mejores oportunidades</li>
            <li>✓ Disuades a futuros morosos al ver que no toleras impagos</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea te avisa qué clientes deberías soltar</h3>
          <p className="text-zinc-300 mb-5">Dashboard con KPIs por cliente: DSO, retrasos acumulados, ratio cobro. Identifica problemáticos antes de que te coman. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
