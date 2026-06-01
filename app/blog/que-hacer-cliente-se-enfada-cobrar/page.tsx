import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Qué hacer si un cliente se enfada cuando le reclamas el pago | Saldea',
  description: 'Cómo gestionar la reacción emocional de un cliente que se molesta al recibir un recordatorio. Mantén la calma, recupera el cobro, conserva la relación.',
  alternates: { canonical: 'https://marsof.es/blog/que-hacer-cliente-se-enfada-cobrar' },
  keywords: ['cliente se enfada cobrar', 'gestionar enfado cliente moroso', 'cliente molesto reclamación', 'qué hacer cliente agresivo'],
  openGraph: { title: 'Qué hacer si un cliente se enfada cuando le reclamas', description: 'Mantén calma, cobra y conserva relación.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Gestión de conflictos · 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Qué hacer si un cliente se enfada cuando le reclamas</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Pasa el 10% de las veces. La forma en que respondes determina si pierdes al cliente o cierras el cobro.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qué se enfadan</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🎭 <strong>Maquillaje emocional:</strong> en realidad no tiene dinero y se enfada para evitar admitirlo</li>
            <li>🎭 <strong>Ofensa por el tono:</strong> percibió tu mensaje como acusación</li>
            <li>🎭 <strong>Disputa real:</strong> no está conforme con el servicio o producto</li>
            <li>🎭 <strong>Personalidad explosiva:</strong> reacciona así con todo</li>
            <li>🎭 <strong>Confusión:</strong> realmente pensaba que había pagado</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Las 5 reglas de oro</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. No respondas el mismo día</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si recibes un mensaje agresivo, espera mínimo 24 horas para responder. Tu primera respuesta caliente siempre será peor que la fría.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Reconoce sin ceder</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Validar la emoción NO es darle la razón. Frase clave:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Entiendo que mi mensaje haya podido sentar mal. Mi intención no era esa. Ahora, aclarado eso, te recuerdo que la factura sigue pendiente y necesito una fecha concreta."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Vuelve a los hechos secos</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El cliente quiere arrastrarte a una pelea emocional. Tu trabajo: volver a lo factual.</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Dejando de lado el malentendido, los hechos son: factura [X], importe [Y]€, vencida hace [Z] días. ¿Cuándo procedes al pago?"</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. Ofrece salida con dignidad</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si el cliente está bloqueado emocionalmente, dale una vía honorable de salir. Frase clave:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Si prefieres no continuar trabajando juntos, lo respeto. Pero la factura por el trabajo ya entregado sigue siendo válida. Cerremos el pago y dejamos en buenos términos lo demás."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Documenta todo</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si la conversación escala, guarda CAPTURAS de cada mensaje, emails archivados, fechas. En caso de monitorio o burofax esto puede salvarte.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el enfado es por disputa real</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si dice "no estoy contento con el trabajo", responde:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>"Vale, cuéntame qué punto concreto te ha decepcionado"</li>
            <li>Escucha sin interrumpir</li>
            <li>Si tiene razón → ofrece descuento parcial o corrección</li>
            <li>Si no tiene razón → recuerda lo que se pactó por escrito y mantén factura</li>
            <li>Documenta todo el intercambio</li>
          </ol>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo cortar y escalar a vía formal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tras 2-3 intentos de calma:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ El cliente sigue insultando o amenazando</li>
            <li>❌ Niega el pago sin justificación legítima</li>
            <li>❌ Te bloquea o ignora completamente</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">→ <strong>Cierra todo trato. Burofax + monitorio.</strong> Esa relación ya está perdida. Recupera el dinero por vía legal.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo que NUNCA hagas con un cliente enfadado</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>❌ Responder con el mismo tono</li>
            <li>❌ Pedirle perdón sin motivo (le da razón)</li>
            <li>❌ Bajar el precio para "calmar las aguas" (estás recompensando el mal comportamiento)</li>
            <li>❌ Discutir en redes sociales o públicamente</li>
            <li>❌ Insultar de vuelta</li>
            <li>❌ Amenazar con cosas que no harás</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea evita el conflicto emocional desde el día 1</h3>
          <p className="text-zinc-300 mb-5">La IA escribe los recordatorios sin tu carga emocional. El cliente no percibe ataque personal porque NO escribes tú. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
