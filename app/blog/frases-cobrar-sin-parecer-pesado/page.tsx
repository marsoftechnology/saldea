import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frases para cobrar a un cliente sin parecer pesado | Marsof',
  description: 'Las 15 frases que usan los autónomos profesionales para reclamar pagos sin agobiar. Resultado: cobras igual sin perder el cliente.',
  alternates: { canonical: 'https://marsof.es/blog/frases-cobrar-sin-parecer-pesado' },
  keywords: ['frases cobrar sin parecer pesado', 'cómo cobrar sin agobiar', 'frases recordar pago educado', 'frases cobro profesional'],
  openGraph: { title: 'Frases para cobrar sin parecer pesado', description: '15 frases que funcionan.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantillas · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Frases para cobrar a un cliente sin parecer pesado</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El secreto está en escoger las palabras correctas. Aquí las 15 que funcionan.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La fórmula psicológica</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Una frase no pesada cumple 3 condiciones:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Asume buena fe</strong> ("seguramente se traspapeló")</li>
            <li>✓ <strong>Da salida fácil</strong> ("si ya pagaste, ignora")</li>
            <li>✓ <strong>Pregunta abierta, no acusación</strong> ("cuándo te viene bien")</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Frases para abrir la conversación</h2>
          <div className="space-y-3 my-5">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">1. "Te recuerdo que la factura [X] vence hoy. Si necesitas el PDF de nuevo, dímelo."</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">2. "Aviso amable: la factura [X] está vencida. ¿Cuándo te viene bien procesarla?"</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">3. "Hola [nombre], seguramente se traspapeló: la factura [X] sigue pendiente."</p></div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Frases para subir el tono sin agobiar</h2>
          <div className="space-y-3 my-5">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">4. "Llevamos dos semanas sin tener noticias. ¿Algún problema que pueda resolver desde mi lado?"</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">5. "Para no tener que aplicar intereses Ley 3/2004, dime una fecha concreta de pago, por favor."</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">6. "¿Hay algo que pueda ayudarte a desbloquear el pago de la factura [X]?"</p></div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Frases si el cliente da excusas</h2>
          <div className="space-y-3 my-5">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">7. "Entiendo. ¿Te ayudaría dividirlo en 2 pagos?"</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">8. "Ok, ponemos por escrito la nueva fecha y zanjamos esto."</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">9. "¿Domiciliación SEPA para futuras facturas? Te quitamos el tema del olvido."</p></div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Frases para clientes recurrentes (relación a largo plazo)</h2>
          <div className="space-y-3 my-5">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">10. "Sé que tenemos buena relación, por eso te lo pregunto directamente: ¿qué pasa con la factura [X]?"</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">11. "Llevamos colaborando [X] meses sin problemas, así que asumo que es un despiste."</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">12. "¿Quieres que ajustemos los plazos de pago en futuras facturas para que te encajen mejor?"</p></div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Frases para cerrar profesionalmente</h2>
          <div className="space-y-3 my-5">
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">13. "Gracias por confirmarme. Cuento con el ingreso el [fecha]."</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">14. "Perfecto. Te paso recordatorio el día anterior para asegurarnos."</p></div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-4"><p className="text-zinc-300 text-sm">15. "Gracias por la respuesta rápida. Apunto la nueva fecha y zanjamos esto. Un saludo."</p></div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo que SÍ es pesado (evítalo)</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ "¿Has visto mi mensaje?" (en lugar de "Te paso recordatorio")</li>
            <li>❌ "Por favor, contesta" (suena a súplica)</li>
            <li>❌ "Necesito el dinero" (problema tuyo, no le importa al cliente)</li>
            <li>❌ "Es la cuarta vez que te escribo" (numerar te hace ver desesperado)</li>
            <li>❌ Mensaje cada día (mejor cada 4-7 días)</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea escribe las frases por ti</h3>
          <p className="text-zinc-300 mb-5">Sin que tengas que pensar qué decir. La IA escoge tono, momento y plantilla. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

