import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar a un amigo que es cliente sin perder la amistad | Marsof',
  description: 'Cobrar a amigos y conocidos es lo m�s inc�modo. Aqu� las reglas para mantener la amistad y recuperar el dinero al mismo tiempo.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-amigo-cliente' },
  keywords: ['cobrar amigo cliente', 'cobrar a conocido', 'cobrar a familiar', 'separar amistad negocio'],
  openGraph: { title: 'C�mo cobrar a un amigo cliente', description: 'Sin perder amistad.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar a un amigo que es cliente sin perder la amistad", "description": "Cobrar a amigos y conocidos es lo m�s inc�modo. Aqu� las reglas para mantener la amistad y recuperar el dinero al mismo tiempo.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-amigo-cliente"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar a un amigo que es cliente</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El caso m�s doloroso del mundo del cobro. Te lo explico para mantener la amistad Y recuperar el dinero.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El error del aut�nomo novato</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Trabajar para amigos "de palabra", sin contrato, sin presupuesto firmado, sin plazos claros. Resultado: incomodidad eterna y muchas veces, p�rdida del amigo Y del dinero.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 1 � Trata al amigo como cliente formal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El error es PRECISAMENTE relajar las formalidades. Hazlo al rev�s: con un amigo aplicas M�S rigor profesional, no menos. Presupuesto por escrito, contrato firmado, plazos claros. Le proteges A �L y a ti.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Frase para justificarlo:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Como somos amigos, prefiero dejar todo por escrito. As� evitamos malentendidos y la amistad sigue intacta pase lo que pase con el proyecto."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 2 � Anticipo S� o S�</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si es amigo, mejor anticipo del 50%. Le obliga a tomarse en serio el proyecto. Si se ofende, mala se�al: no era amigo tuyo, era alguien que quer�a favores.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 3 � Separa los canales</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El WhatsApp de "vamos a tomar algo" NO es el mismo que el de "�pagas la factura?". Crea grupos/contactos separados:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? WhatsApp personal: amistad</li>
            <li>?? Email profesional: trabajo y cobros</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Cuando reclames, hazlo por EMAIL no por WhatsApp personal. Mantiene los registros separados.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo abordar la conversaci�n</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [amigo], te escribo en plan formal aunque seamos amigos: la factura [X] est� vencida y necesito cerrarla. �Cu�ndo te viene bien procesarla? Te mando recordatorio amigable porque s� que estas cosas se traspapelan. Un abrazo."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el amigo no paga ni as�</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es la prueba de la amistad real. Tienes 3 opciones:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Conversaci�n cara a cara:</strong> "Necesito cerrar la factura. �Qu� pasa?"</li>
            <li>? <strong>Plan de pago fraccionado:</strong> "Hagamos 3 cuotas de X�"</li>
            <li>? <strong>Asumir la p�rdida:</strong> si la amistad vale m�s que esa cantidad, perdona la deuda y NO vuelvas a trabajar con �l como cliente</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La regla de oro</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Nunca prestes dinero a amigos. Nunca trabajes gratis para amigos. Y si lo haces, asume que est�s regalando.</strong> Cuando tengas claro que es un regalo, no esperas devoluci�n y la amistad sobrevive.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Pero si LO TRATAS como negocio, exige condiciones de negocio. No mezclar es la clave.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea es tu intermediario neutral</h3>
          <p className="text-zinc-300 mb-5">Los recordatorios los env�a la IA, no t�. Tu amigo no se siente perseguido por ti personalmente. La relaci�n se preserva. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

