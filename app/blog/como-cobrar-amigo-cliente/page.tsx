import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a un amigo que es cliente sin perder la amistad | Marsof',
  description: 'Cobrar a amigos y conocidos es lo más incómodo. Aquí las reglas para mantener la amistad y recuperar el dinero al mismo tiempo.',
  alternates: { canonical: 'https://marsof.es/blog/como-cobrar-amigo-cliente' },
  keywords: ['cobrar amigo cliente', 'cobrar a conocido', 'cobrar a familiar', 'separar amistad negocio'],
  openGraph: { title: 'Cómo cobrar a un amigo cliente', description: 'Sin perder amistad.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar a un amigo que es cliente</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El caso más doloroso del mundo del cobro. Te lo explico para mantener la amistad Y recuperar el dinero.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">El error del autónomo novato</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Trabajar para amigos "de palabra", sin contrato, sin presupuesto firmado, sin plazos claros. Resultado: incomodidad eterna y muchas veces, pérdida del amigo Y del dinero.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 1 — Trata al amigo como cliente formal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El error es PRECISAMENTE relajar las formalidades. Hazlo al revés: con un amigo aplicas MÁS rigor profesional, no menos. Presupuesto por escrito, contrato firmado, plazos claros. Le proteges A ÉL y a ti.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Frase para justificarlo:</p>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Como somos amigos, prefiero dejar todo por escrito. Así evitamos malentendidos y la amistad sigue intacta pase lo que pase con el proyecto."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 2 — Anticipo SÍ o SÍ</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si es amigo, mejor anticipo del 50%. Le obliga a tomarse en serio el proyecto. Si se ofende, mala señal: no era amigo tuyo, era alguien que quería favores.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Regla 3 — Separa los canales</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El WhatsApp de "vamos a tomar algo" NO es el mismo que el de "¿pagas la factura?". Crea grupos/contactos separados:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>📱 WhatsApp personal: amistad</li>
            <li>📧 Email profesional: trabajo y cobros</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Cuando reclames, hazlo por EMAIL no por WhatsApp personal. Mantiene los registros separados.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cómo abordar la conversación</h2>
          <div className="bg-zinc-900/40 border-l-4 border-sky-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Hola [amigo], te escribo en plan formal aunque seamos amigos: la factura [X] está vencida y necesito cerrarla. ¿Cuándo te viene bien procesarla? Te mando recordatorio amigable porque sé que estas cosas se traspapelan. Un abrazo."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el amigo no paga ni así</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es la prueba de la amistad real. Tienes 3 opciones:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✅ <strong>Conversación cara a cara:</strong> "Necesito cerrar la factura. ¿Qué pasa?"</li>
            <li>✅ <strong>Plan de pago fraccionado:</strong> "Hagamos 3 cuotas de X€"</li>
            <li>✅ <strong>Asumir la pérdida:</strong> si la amistad vale más que esa cantidad, perdona la deuda y NO vuelvas a trabajar con él como cliente</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">La regla de oro</h2>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Nunca prestes dinero a amigos. Nunca trabajes gratis para amigos. Y si lo haces, asume que estás regalando.</strong> Cuando tengas claro que es un regalo, no esperas devolución y la amistad sobrevive.</p>
          <p className="text-zinc-300 leading-relaxed mb-4">Pero si LO TRATAS como negocio, exige condiciones de negocio. No mezclar es la clave.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea es tu intermediario neutral</h3>
          <p className="text-zinc-300 mb-5">Los recordatorios los envía la IA, no tú. Tu amigo no se siente perseguido por ti personalmente. La relación se preserva. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

