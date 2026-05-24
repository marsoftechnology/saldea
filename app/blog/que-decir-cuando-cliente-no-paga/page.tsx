import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Qué decir cuando un cliente no paga: 12 frases que funcionan | Saldea',
  description: 'Las 12 frases exactas que usan los profesionales para reclamar cobros sin perder al cliente. Email, llamada y WhatsApp. Plantillas listas.',
  alternates: { canonical: 'https://marsof.es/blog/que-decir-cuando-cliente-no-paga' },
  keywords: ['qué decir cliente no paga', 'frases reclamar pago', 'cómo dirigirse moroso', 'palabras exactas cobrar', 'qué escribir cliente moroso'],
  openGraph: { title: 'Qué decir cuando un cliente no paga', description: '12 frases que funcionan.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comunicación · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Qué decir cuando un cliente no paga</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Las 12 frases exactas que funcionan. Sin sonar agresivo, sin sonar débil, sin perder al cliente.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Día 1 — Cuando acaba de vencer</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 1 (email amable):</strong><br/>"Hola [nombre], te recuerdo que la factura [X] venció ayer. Si ya la has pagado en los últimos días, perdona el toque. Si no, ¿cuándo podrías procesarla? Un saludo."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 2 (WhatsApp):</strong><br/>"Hola [nombre], aviso amistoso: la factura [X] ya está vencida. ¿Algún tema con el pago?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Día 7-14 — El recordatorio firme</h2>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 3 (email firme):</strong><br/>"[nombre], la factura [X] sigue pendiente. Según la Ley 3/2004 desde hoy se devengan intereses del 12,5% anual e indemnización de 40€. Si me confirmas cuándo procesarás el pago, lo cerramos sin tener que cuantificar nada."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 4 (llamada):</strong><br/>"Hola [nombre], te llamo por la factura pendiente. ¿Va todo bien por tu lado? ¿Algún problema que pueda resolver?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuando el cliente da excusas</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "tengo problemas de tesorería":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Entiendo. ¿Te ayudaría dividirlo en 2 pagos? Pongamos por escrito una fecha cerrada para cada uno."</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "estoy esperando que me paguen otros":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Mi factura está vencida y los intereses corren desde el día 1, independientemente de tus cobros. Cuanto antes lo cerremos, mejor para ambos."</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "ya te lo he transferido":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Perfecto. ¿Me puedes pasar el justificante o el número de operación? Lo cuadro y te lo confirmo."</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "no estoy de acuerdo con la factura":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Vale, dime qué punto concreto. Si hay un error, lo corregimos hoy mismo. Si no, mantenemos lo facturado."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuando ya pasaron 60 días</h2>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 9 (previo a burofax):</strong><br/>"[nombre], antes de proceder a la vía formal, te ofrezco una última opción: cierre del pago en 7 días naturales. De lo contrario, el siguiente paso será burofax y procedimiento monitorio, repercutiendo los costes legales."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo que NUNCA debes decir</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ "Si no me pagas, te denuncio" (amenaza vacía si aún no has mandado burofax)</li>
            <li>❌ "Eres un sinvergüenza" (insulto, te puede denunciar a ti)</li>
            <li>❌ "Voy a contarle a todo el mundo que no pagas" (difamación)</li>
            <li>❌ Mensajes a las 23:00 o fines de semana (acoso)</li>
            <li>❌ Más de 1 email al día (acoso)</li>
            <li>❌ Mayúsculas o muchos signos de exclamación</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea escribe las frases por ti</h3>
          <p className="text-zinc-300 mb-5">La IA escoge el tono exacto según los días de retraso. Tú no tienes que pensar qué decir. <strong>15 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
