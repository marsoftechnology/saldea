import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensaje de recordatorio de pago al cliente: 8 ejemplos | Marsof',
  description: 'Mensajes listos para copiar y pegar para recordar el pago a un cliente. Por email, WhatsApp y SMS. Tonos amable, firme y formal.',
  alternates: { canonical: 'https://www.marsof.es/blog/mensaje-recordatorio-pago-cliente' },
  keywords: ['mensaje recordatorio pago', 'mensaje cobrar cliente', 'sms recordatorio factura', 'whatsapp recordar pago', 'plantilla recordatorio'],
  openGraph: { title: 'Mensaje de recordatorio de pago', description: '8 ejemplos listos.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Mensaje de recordatorio de pago al cliente: 8 ejemplos", "description": "Mensajes listos para copiar y pegar para recordar el pago a un cliente. Por email, WhatsApp y SMS. Tonos amable, firme y formal.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/mensaje-recordatorio-pago-cliente"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Plantillas � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Mensaje de recordatorio de pago al cliente</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">8 ejemplos listos para copiar. Email, WhatsApp y SMS. Adaptados a cada momento del retraso.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Mensaje antes del vencimiento (recomendado)</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Aumenta los cobros a tiempo en un 30-40% si lo mandas 3 d�as antes:</p>
          <div className="bg-zinc-900/40 border-l-4 border-emerald-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>1. Email pre-vencimiento:</strong><br/>"Hola [nombre], te aviso de que la factura [X] vence el [fecha]. Si necesitas el PDF de nuevo, d�melo. Un saludo."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-emerald-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>2. SMS / WhatsApp pre-vencimiento:</strong><br/>"Recordatorio: factura [X] vence el [fecha]. �Todo OK por tu lado?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">D�a 1 vencido</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>3. Email amable:</strong><br/>"Hola [nombre], te recuerdo que la factura [X] venci� ayer. Si ya la has pagado, ignora este mensaje. Si no, �cu�ndo podr�as procesarla? Un saludo."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>4. WhatsApp amable:</strong><br/>"Hola [nombre], la factura [X] venci� ayer. Solo aviso, sin presi�n. Cu�ntame cu�ndo te viene bien procesarla."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">D�a 7-15 vencido</h2>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>5. Email firme:</strong><br/>"Hola [nombre], llevo dos semanas sin tener noticias sobre la factura [X]. �Hay alg�n problema que pueda ayudarte a resolver? Te recuerdo que la Ley 3/2004 establece intereses autom�ticos del 12,5% anual desde el vencimiento. Conf�rmame fecha de pago, por favor."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">D�a 30+ vencido</h2>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>6. Email formal:</strong><br/>"[nombre], la factura [X] (importe [Y]�) lleva 30 d�as vencida. La deuda actual incluye:<br/>- Principal: [Y]�<br/>- Intereses Ley 3/2004 (12,5%): [Z]�<br/>- Indemnizaci�n art. 8: 40�<br/>- TOTAL: [SUMA]�<br/><br/>Te concedo 7 d�as para regularizar. Pasado este plazo proceder� a burofax y monitorio."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cliente que ya pag� parcialmente</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>7. Email tras pago parcial:</strong><br/>"Hola [nombre], confirmo recepci�n de [importe parcial]�. Queda pendiente [restante]�. �Cu�ndo cierras el resto? Gracias."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cliente recurrente con cuota mensual</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>8. Email mensual SEPA fallido:</strong><br/>"Hola [nombre], el adeudo SEPA de la cuota [mes] ha sido devuelto. Por favor, comprueba tu cuenta o av�same del nuevo m�todo de pago. Reintento programado en 3 d�as."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Reglas clave</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Horario laboral (9:00 - 19:00 lunes a viernes)</li>
            <li>? Un solo mensaje por d�a como m�ximo</li>
            <li>? Numera tus mensajes ("Aviso 1 de 3")</li>
            <li>? Mant�n tono profesional siempre</li>
            <li>? Documenta cada env�o (fecha, hora, contenido)</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea manda estos mensajes autom�ticamente</h3>
          <p className="text-zinc-300 mb-5">Cada email con el tono y plantilla exacta seg�n los d�as de retraso. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

