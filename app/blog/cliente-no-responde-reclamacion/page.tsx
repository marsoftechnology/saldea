import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cliente que no responde a la reclamaci�n: qu� hacer | Marsof',
  description: 'Silencio absoluto del cliente moroso. C�mo escalar, romper la inercia y forzar la respuesta sin acosar.',
  alternates: { canonical: 'https://www.marsof.es/blog/cliente-no-responde-reclamacion' },
  keywords: ['cliente no responde', 'cliente ignora reclamaci�n', 'cliente desaparecido moroso', 'silencio cliente moroso'],
  openGraph: { title: 'Cliente que no responde a la reclamaci�n', description: 'C�mo romper el silencio.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "Cliente que no responde a la reclamaci�n: qu� hacer", "description": "Silencio absoluto del cliente moroso. C�mo escalar, romper la inercia y forzar la respuesta sin acosar.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/cliente-no-responde-reclamacion"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso espec�fico � 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cliente que no responde a la reclamaci�n</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Has mandado 3 emails y no contesta. Llamas y no coge. �Qu� hacer?</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 1 � Cambia el canal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si email no funciona, prueba WhatsApp. Si WhatsApp no, llamada desde n�mero distinto. Si nada, email a otra persona de la empresa (financiero, recepci�n).</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 2 � Confirma que la empresa existe</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? BORME: �concurso? �disoluci�n?</li>
            <li>?? eInforma: �estado activo?</li>
            <li>?? Google: �noticias de cierre? �oficina cerrada?</li>
            <li>?? Su web: �sigue activa?</li>
            <li>?? LinkedIn: �personas siguen ah�?</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Si descubres que cerr�: ve directamente a procedimiento concursal.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 3 � Visita presencial</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tienes la oficina cerca y la deuda lo justifica (&gt;1.000�), pres�ntate f�sicamente. Sin amenazas, profesional. Muchas veces el silencio es por miedo. Verte cara a cara desbloquea.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 4 � Burofax SIN demora</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Con el silencio, NO hay margen para m�s emails. Manda burofax inmediato. Te asegura recepci�n legal y rompe el silencio en muchos casos.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 5 � Procedimiento monitorio</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tras burofax no responde, va directo a monitorio. El juzgado lo localiza por direcci�n fiscal y le obliga a responder en 20 d�as.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cliente que cambia de n�mero y desaparece</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si cambia n�mero, cierra oficina y borra redes: alerta m�xima. Puede ser cierre fraudulento. Acude a abogado mercantilista urgente.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea sigue probando aunque no respondan</h3>
          <p className="text-zinc-300 mb-5">Los emails escalados contin�an profesionalmente. Cada email queda como prueba para el monitorio. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

