import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cliente que no responde a la reclamación: qué hacer | Marsof',
  description: 'Silencio absoluto del cliente moroso. Cómo escalar, romper la inercia y forzar la respuesta sin acosar.',
  alternates: { canonical: 'https://marsof.es/blog/cliente-no-responde-reclamacion' },
  keywords: ['cliente no responde', 'cliente ignora reclamación', 'cliente desaparecido moroso', 'silencio cliente moroso'],
  openGraph: { title: 'Cliente que no responde a la reclamación', description: 'Cómo romper el silencio.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso específico · 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cliente que no responde a la reclamación</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Has mandado 3 emails y no contesta. Llamas y no coge. ¿Qué hacer?</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 1 — Cambia el canal</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si email no funciona, prueba WhatsApp. Si WhatsApp no, llamada desde número distinto. Si nada, email a otra persona de la empresa (financiero, recepción).</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 2 — Confirma que la empresa existe</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>🔍 BORME: ¿concurso? ¿disolución?</li>
            <li>🔍 eInforma: ¿estado activo?</li>
            <li>🔍 Google: ¿noticias de cierre? ¿oficina cerrada?</li>
            <li>🔍 Su web: ¿sigue activa?</li>
            <li>🔍 LinkedIn: ¿personas siguen ahí?</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Si descubres que cerró: ve directamente a procedimiento concursal.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 3 — Visita presencial</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tienes la oficina cerca y la deuda lo justifica (&gt;1.000€), preséntate físicamente. Sin amenazas, profesional. Muchas veces el silencio es por miedo. Verte cara a cara desbloquea.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 4 — Burofax SIN demora</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Con el silencio, NO hay margen para más emails. Manda burofax inmediato. Te asegura recepción legal y rompe el silencio en muchos casos.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Paso 5 — Procedimiento monitorio</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si tras burofax no responde, va directo a monitorio. El juzgado lo localiza por dirección fiscal y le obliga a responder en 20 días.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cliente que cambia de número y desaparece</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Si cambia número, cierra oficina y borra redes: alerta máxima. Puede ser cierre fraudulento. Acude a abogado mercantilista urgente.</p>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea sigue probando aunque no respondan</h3>
          <p className="text-zinc-300 mb-5">Los emails escalados continúan profesionalmente. Cada email queda como prueba para el monitorio. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}

