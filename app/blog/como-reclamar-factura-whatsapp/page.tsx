import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo reclamar una factura por WhatsApp educadamente 2026 | Marsof',
  description: 'Gu�a para reclamar pagos por WhatsApp sin parecer agresivo. Mensajes listos, horarios correctos y errores a evitar. Tono profesional.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-reclamar-factura-whatsapp' },
  keywords: ['reclamar factura whatsapp', 'whatsapp cobrar cliente', 'mensaje whatsapp moroso', 'whatsapp recordar pago', 'cobrar por whatsapp educadamente'],
  openGraph: { title: 'C�mo reclamar una factura por WhatsApp', description: 'Educadamente y sin perder al cliente.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo reclamar una factura por WhatsApp educadamente 2026", "description": "Gu�a para reclamar pagos por WhatsApp sin parecer agresivo. Mensajes listos, horarios correctos y errores a evitar. Tono profesional.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-reclamar-factura-whatsapp"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comunicaci�n � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo reclamar una factura por WhatsApp educadamente</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">WhatsApp es �ntimo. Mal usado, ofende. Bien usado, cobra en horas. Te explico c�mo hacerlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">�WhatsApp es el canal correcto?</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Depende. WhatsApp es <strong>excelente para clientes con los que ya tienes confianza</strong>. Es <strong>p�simo para clientes nuevos o formales</strong>. Regla simple:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>S� por WhatsApp:</strong> aut�nomos conocidos, clientes recurrentes, pymes con las que tienes trato directo</li>
            <li>? <strong>NO por WhatsApp:</strong> empresas grandes, departamentos de pagos, primera factura</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plantillas WhatsApp educadas</h2>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 1 � Recordatorio amable</h3>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre] ?? Recordatorio amistoso: la factura [X] venci� ayer. Si ya la pagaste, ignora este mensaje. Si no, dime cu�ndo te viene bien. �Gracias!"</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 7 � Sin respuesta del anterior</h3>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"[nombre], te escrib� la semana pasada sobre la factura [X]. �La viste? Sin presi�n, solo que s� que a veces los mensajes se traspapelan. Dime algo cuando puedas ??"</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">D�a 15 � Subiendo tono pero educado</h3>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [nombre], como sigo sin tener noticias sobre la factura [X], te aviso que a partir de hoy ya se devengan intereses seg�n la Ley 3/2004. Para evitar tener que calcularlos, dime cu�ndo cierras el pago. Hablamos."</p>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 mt-6 mb-3">Cliente que responde "te pago ma�ana" y no paga</h3>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"[nombre], me confirmaste el pago para el [fecha pactada] y a�n no lleg�. �Hubo alg�n problema? �Tienes nueva fecha?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Errores graves por WhatsApp</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Mandar mensajes de noche o fines de semana</li>
            <li>? Stickers o memes (descuentan profesionalidad)</li>
            <li>? Audios largos (impone y pone tenso)</li>
            <li>? Mensajes en bucle (3 mensajes seguidos en pocos minutos)</li>
            <li>? "Visto" obsesivo (no funciona, presiona mal)</li>
            <li>? Reenviar las facturas como PDF en cada mensaje</li>
            <li>? Crear grupos con socios "para que el cliente vea"</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�ndo escalar de WhatsApp a email</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tras 2 WhatsApps sin respuesta clara, <strong>cambia a email formal</strong>. El email queda como prueba documentada, el WhatsApp no siempre. Y subir el canal transmite seriedad sin discutir.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Horarios correctos para WhatsApp profesional</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Martes a viernes, 10:00 - 13:00</li>
            <li>? Tardes laborables, 16:00 - 18:00</li>
            <li>? Lunes por la ma�ana (todo el mundo est� saturado)</li>
            <li>? Viernes tarde y fines de semana</li>
            <li>? Antes de las 9 o despu�s de las 19</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea genera links de WhatsApp pre-rellenados</h3>
          <p className="text-zinc-300 mb-5">Bot�n "Mandar WhatsApp" al lado de cada factura. Texto adaptado al cliente y al d�a de retraso. T� solo apruebas y env�as. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

