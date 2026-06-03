import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo gestionar el conflicto con un cliente moroso | Marsof',
  description: 'Las 5 fases del conflicto con un moroso y cómo desescalar cada una. Mantén la cabeza fría, recupera el cobro y conserva tu salud mental.',
  alternates: { canonical: 'https://marsof.es/blog/como-gestionar-conflicto-cliente-moroso' },
  keywords: ['conflicto cliente moroso', 'desescalar conflicto cobro', 'gestión emocional moroso', 'estrés cobro impagados'],
  openGraph: { title: 'Cómo gestionar el conflicto con un cliente moroso', description: 'Las 5 fases.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Gestión emocional · 7 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo gestionar el conflicto con un cliente moroso</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Reclamar cobros desgasta emocionalmente. Te explico cómo proteger tu cabeza mientras recuperas el dinero.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Las 5 fases del conflicto</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Fase 1 — Negación (días 1-7)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">"Seguro que paga mañana". Esperas que se resuelva solo. No actúas.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cómo gestionarla:</strong> manda el primer recordatorio el día 1. Punto. Sin esperar.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Fase 2 — Frustración (días 7-21)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">"¿Por qué no me contesta?". Empieza a invadir tu cabeza. Pierdes foco en otras cosas.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cómo gestionarla:</strong> sistematiza. Manda los emails programados. NO lo conviertas en obsesión personal.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Fase 3 — Enfado (días 21-45)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">"Me está faltando al respeto". El enfado te empuja a mandar mensajes agresivos. Eso EMPEORA la situación.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cómo gestionarla:</strong> NO mandes nada caliente. Espera 24h. Reescribe con tono neutro. Mejor un solo email formal que cinco impulsivos.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Fase 4 — Resignación (días 45-90)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">"Da igual, no lo voy a cobrar nunca". Tiras la toalla. Y entonces SÍ que pierdes el dinero.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cómo gestionarla:</strong> aquí entra el burofax. Reactiva el proceso. El 50-70% paga tras el burofax.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Fase 5 — Acción judicial (día 90+)</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Procedimiento monitorio. Frío y técnico. Aquí ya no hay emoción: hay procedimiento.</p>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Cómo gestionarla:</strong> presenta el monitorio sin abogado (deudas &lt;2.000€). Cuesta 0€ y resuelve en 1-2 meses.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Reglas para proteger tu cabeza</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">1. Separa la persona del problema</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">El cliente no te ataca a TI personalmente. Te debe DINERO. Es un problema técnico, no emocional.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">2. Pon límite de tiempo diario</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Máximo 15 minutos al día pensando en el moroso. No más. Si lo dejas invadir tu día, pierdes 8h por un problema de 15 min.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">3. Automatiza para no decidir cada vez</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si cada email te cuesta una decisión emocional, te quemas. Un sistema automático te quita esa carga.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">4. No hables del moroso con todo el mundo</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Cada vez que lo cuentas a alguien, lo revives. Habla solo con un asesor de confianza. Y NUNCA en redes sociales.</p>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">5. Asume el peor escenario y suéltalo</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">Si lo peor es perder X€, asúmelo. Una vez que aceptas que podrías no cobrar, dejas de sufrir y empiezas a actuar racionalmente.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El coste oculto del conflicto</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">No es solo el dinero. Es:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>⏰ <strong>Tiempo:</strong> 3-5 horas al mes que NO facturas</li>
            <li>🧠 <strong>Capacidad mental:</strong> que NO dedicas a clientes nuevos</li>
            <li>😴 <strong>Sueño:</strong> noches pensando en cómo cobrar</li>
            <li>💔 <strong>Relaciones:</strong> contagias tu estrés a familia y socios</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Cobrar la factura X de 1.000€ puede costarte 3.000€ en estos costes ocultos. Por eso AUTOMATIZAR vale tanto.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuándo es momento de soltar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">A veces el cobro NO compensa el desgaste. Suelta si:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✗ Cliente entró en concurso y eres acreedor menor</li>
            <li>✗ La deuda es ≤ 200€ y el desgaste es total</li>
            <li>✗ El monitorio te costaría más que la deuda</li>
            <li>✗ El cliente desapareció sin rastro localizable</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Asumirlo y seguir adelante a veces es la mejor decisión empresarial.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea quita el conflicto emocional del cobro</h3>
          <p className="text-zinc-300 mb-5">No escribes los emails. No decides cada vez. No te enfadas. La IA hace su trabajo profesionalmente y tú dedicas tu cabeza a crecer. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

