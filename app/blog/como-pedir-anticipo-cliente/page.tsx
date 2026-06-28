import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo pedir un anticipo a un cliente sin incomodarlo | Marsof',
  description: 'Estrategias para pedir anticipos sin generar fricci�n. Cu�nto pedir, c�mo justificarlo y frases exactas. Filtra clientes problem�ticos.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-pedir-anticipo-cliente' },
  keywords: ['pedir anticipo cliente', 'c�mo justificar anticipo', 'porcentaje anticipo aut�nomo', 'cobrar por adelantado'],
  openGraph: { title: 'C�mo pedir un anticipo sin incomodar', description: 'Estrategias y frases.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo pedir un anticipo a un cliente sin incomodarlo", "description": "Estrategias para pedir anticipos sin generar fricci�n. Cu�nto pedir, c�mo justificarlo y frases exactas. Filtra clientes problem�ticos.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-pedir-anticipo-cliente"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Estrategia � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo pedir un anticipo sin incomodar al cliente</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El anticipo filtra clientes problem�ticos. Los serios lo entienden, los problem�ticos huyen. Te explico c�mo pedirlo.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Por qu� pedir anticipo siempre</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Filtra al moroso cr�nico:</strong> el que no quiere anticipo es el que despu�s no paga</li>
            <li>? <strong>Te garantiza liquidez:</strong> cubres materiales o tiempo invertido</li>
            <li>? <strong>Genera compromiso del cliente:</strong> ya invirti�, va a continuar</li>
            <li>? <strong>Profesionaliza tu marca:</strong> "trabajo con anticipo" suena m�s serio</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cu�nto pedir seg�n el sector</h2>
          <div className="overflow-x-auto my-5">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-sky-500/20"><th className="py-3 px-4 text-left text-zinc-100">Sector</th><th className="py-3 px-4 text-left text-zinc-100">Anticipo t�pico</th></tr></thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/10"><td className="py-2 px-4">Dise�o / Marketing</td><td className="py-2 px-4">30-50%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Desarrollo web / Software</td><td className="py-2 px-4">30-50%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Consultor�a</td><td className="py-2 px-4">25-30%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Formaci�n</td><td className="py-2 px-4">50-100%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Eventos / Catering</td><td className="py-2 px-4">50%</td></tr>
                <tr className="border-b border-white/10"><td className="py-2 px-4">Reformas / Obra</td><td className="py-2 px-4">30-40% (materiales)</td></tr>
                <tr><td className="py-2 px-4">Producto f�sico</td><td className="py-2 px-4">100% (pre-pago)</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo justificarlo sin parecer desconfiado</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">El truco: vincula el anticipo a una funci�n concreta, no a "tu desconfianza".</p>

          <div className="bg-zinc-900/40 border-l-4 border-emerald-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>1. Por materiales:</strong><br/>"El 30% inicial cubre los materiales que tengo que adquirir antes de empezar."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-emerald-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>2. Por reserva de agenda:</strong><br/>"El anticipo de 40% reserva mi disponibilidad para tu proyecto durante estas semanas."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-emerald-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>3. Por hitos:</strong><br/>"Trabajo siempre por hitos: 30% al inicio, 30% al borrador, 40% a la entrega."</p>
          </div>
          <div className="bg-zinc-900/40 border-l-4 border-emerald-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic"><strong>4. Por est�ndar profesional:</strong><br/>"Es la pr�ctica habitual en mi sector. Cubre el riesgo compartido del proyecto."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">C�mo incluirlo en el presupuesto</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">No "pidas" el anticipo despu�s. M�telo en el presupuesto desde el d�a 1:</p>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`FORMA DE PAGO:
- 30% a la firma del presupuesto: 600�
- 70% a la entrega del trabajo: 1.400�
- Transferencia a IBAN [tu IBAN]`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si el cliente rechaza el anticipo</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Tres posibles respuestas seg�n tu confianza con el cliente:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? <strong>Si conf�as 100%:</strong> negocia anticipo menor (10-15%) para no perder cliente</li>
            <li>? <strong>Si es duda:</strong> mant�n anticipo del 30% como m�nimo</li>
            <li>? <strong>Si percibes mala se�al:</strong> declina el proyecto. Mejor perder uno que cobrar nada</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Frase para clientes que se resisten</h2>
          <div className="bg-zinc-900/40 border-l-4 border-amber-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"Entiendo, es una pregunta leg�tima. El anticipo no es desconfianza hacia ti: es la pr�ctica habitual que aplico a todos los proyectos. Cubre el tiempo y los recursos que dedicar� antes de la entrega. Si prefieres, puedo ense�arte casos de c�mo lo aplico habitualmente."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Anticipo autom�tico con Stripe</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Quita fricci�n al cobro del anticipo enviando un link de pago directo:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Cliente firma presupuesto digitalmente</li>
            <li>? Recibe link de pago Stripe inmediato</li>
            <li>? Paga con tarjeta en 30 segundos</li>
            <li>? T� ves el cobro confirmado y empiezas a trabajar</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea automatiza los cobros de anticipo</h3>
          <p className="text-zinc-300 mb-5">Link de pago Stripe autom�tico. Recordatorios si no se paga. Y persigue el resto del pago al entregar. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

