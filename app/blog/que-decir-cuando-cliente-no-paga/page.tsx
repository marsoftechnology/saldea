import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Qu� decir cuando un cliente no paga: 12 frases que funcionan | Marsof',
  description: 'Las 12 frases exactas que usan los profesionales para reclamar cobros sin perder al cliente. Email, llamada y WhatsApp. Plantillas listas.',
  alternates: { canonical: 'https://www.marsof.es/blog/que-decir-cuando-cliente-no-paga' },
  keywords: ['qu� decir cliente no paga', 'frases reclamar pago', 'c�mo dirigirse moroso', 'palabras exactas cobrar', 'qu� escribir cliente moroso'],
  openGraph: { title: 'Qu� decir cuando un cliente no paga', description: '12 frases que funcionan.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Qu� decir cuando un cliente no paga: 12 frases que funcionan", "description": "Las 12 frases exactas que usan los profesionales para reclamar cobros sin perder al cliente. Email, llamada y WhatsApp. Plantillas listas.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/que-decir-cuando-cliente-no-paga"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Comunicaci�n � 6 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Qu� decir cuando un cliente no paga</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Las 12 frases exactas que funcionan. Sin sonar agresivo, sin sonar d�bil, sin perder al cliente.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">D�a 1 � Cuando acaba de vencer</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 1 (email amable):</strong><br/>"Hola [nombre], te recuerdo que la factura [X] venci� ayer. Si ya la has pagado en los �ltimos d�as, perdona el toque. Si no, �cu�ndo podr�as procesarla? Un saludo."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 2 (WhatsApp):</strong><br/>"Hola [nombre], aviso amistoso: la factura [X] ya est� vencida. �Alg�n tema con el pago?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">D�a 7-14 � El recordatorio firme</h2>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 3 (email firme):</strong><br/>"[nombre], la factura [X] sigue pendiente. Seg�n la Ley 3/2004 desde hoy se devengan intereses del 12,5% anual e indemnizaci�n de 40�. Si me confirmas cu�ndo procesar�s el pago, lo cerramos sin tener que cuantificar nada."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 4 (llamada):</strong><br/>"Hola [nombre], te llamo por la factura pendiente. �Va todo bien por tu lado? �Alg�n problema que pueda resolver?"</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuando el cliente da excusas</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "tengo problemas de tesorer�a":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Entiendo. �Te ayudar�a dividirlo en 2 pagos? Pongamos por escrito una fecha cerrada para cada uno."</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "estoy esperando que me paguen otros":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Mi factura est� vencida y los intereses corren desde el d�a 1, independientemente de tus cobros. Cuanto antes lo cerremos, mejor para ambos."</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "ya te lo he transferido":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Perfecto. �Me puedes pasar el justificante o el n�mero de operaci�n? Lo cuadro y te lo confirmo."</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4">
            <p className="text-zinc-200 mb-2"><strong>Si dice "no estoy de acuerdo con la factura":</strong></p>
            <p className="text-zinc-400 text-sm italic">"Vale, dime qu� punto concreto. Si hay un error, lo corregimos hoy mismo. Si no, mantenemos lo facturado."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cuando ya pasaron 60 d�as</h2>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>Frase 9 (previo a burofax):</strong><br/>"[nombre], antes de proceder a la v�a formal, te ofrezco una �ltima opci�n: cierre del pago en 7 d�as naturales. De lo contrario, el siguiente paso ser� burofax y procedimiento monitorio, repercutiendo los costes legales."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Lo que NUNCA debes decir</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? "Si no me pagas, te denuncio" (amenaza vac�a si a�n no has mandado burofax)</li>
            <li>? "Eres un sinverg�enza" (insulto, te puede denunciar a ti)</li>
            <li>? "Voy a contarle a todo el mundo que no pagas" (difamaci�n)</li>
            <li>? Mensajes a las 23:00 o fines de semana (acoso)</li>
            <li>? M�s de 1 email al d�a (acoso)</li>
            <li>? May�sculas o muchos signos de exclamaci�n</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea escribe las frases por ti</h3>
          <p className="text-zinc-300 mb-5">La IA escoge el tono exacto seg�n los d�as de retraso. T� no tienes que pensar qu� decir. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

