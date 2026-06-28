import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'C�mo cobrar a un cliente que cerr� su empresa | Marsof',
  description: 'Tu cliente cerr� la empresa o entr� en concurso. �Puedes cobrar? S�, en ciertos casos. Te explico c�mo y cu�ndo.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-cliente-cerro-empresa' },
  keywords: ['cliente cerr� empresa', 'cobrar empresa cerrada', 'cliente quebrado', 'cliente concurso acreedores'],
  openGraph: { title: 'C�mo cobrar a un cliente que cerr�', description: 'Concurso y soluciones.', type: 'article', locale: 'es_ES' },
}

const articleSchema = {"@context": "https://schema.org", "@type": "Article", "headline": "C�mo cobrar a un cliente que cerr� su empresa", "description": "Tu cliente cerr� la empresa o entr� en concurso. �Puedes cobrar? S�, en ciertos casos. Te explico c�mo y cu�ndo.", "author": {"@type": "Organization", "name": "Marsof Technology"}, "publisher": {"@type": "Organization", "name": "Marsof Technology", "logo": {"@type": "ImageObject", "url": "https://www.marsof.es/og-image.png"}}, "datePublished": "2026-05-16", "dateModified": "2026-05-16", "inLanguage": "es-ES", "url": "https://www.marsof.es/blog/como-cobrar-cliente-cerro-empresa"}

export default function Page() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial � 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">C�mo cobrar a un cliente que cerr�</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Cuando la empresa cierra o entra en concurso, complica todo. Pero hay opciones, sobre todo si act�as r�pido.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Verifica primero: �qu� pas�?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Busca en BORME</strong> (boe.es/diario_borme): �est� en concurso? �Disoluci�n?</li>
            <li>?? <strong>einforma.com:</strong> estado actual de la empresa</li>
            <li>?? <strong>Hacienda:</strong> verifica si el CIF sigue activo</li>
            <li>?? <strong>Sus redes/web:</strong> �hay nuevas empresas del mismo due�o?</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Escenario 1 � Concurso de acreedores</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Lo m�s com�n. Si publican concurso en BORME:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Tienes <strong>30 d�as desde publicaci�n</strong> para inscribir tu cr�dito como acreedor</li>
            <li>Necesitas: factura original, prueba de la deuda, datos identificaci�n</li>
            <li>Lo presentas al <strong>administrador concursal</strong> designado</li>
            <li>Esperas a la lista provisional y final de acreedores</li>
            <li>Cobras (si hay liquidez) seg�n orden legal: trabajadores ? Hacienda ? Seguridad Social ? garantizados ? ordinarios</li>
          </ol>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Realidad:</strong> el acreedor ordinario cobra el 10-30% de la deuda en el mejor caso. Pero algo es algo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Escenario 2 � Empresa disuelta</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La empresa se disolvi� sin concurso formal:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Si los socios no liquidaron correctamente, pueden ser <strong>responsables personales</strong></li>
            <li>? Si hubo "vaciado" de la empresa a otra paralela: <strong>acci�n de levantamiento del velo</strong></li>
            <li>? Si el administrador no convoc� concurso obligatorio: <strong>responsabilidad personal</strong></li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Aqu� necesitas abogado mercantilista. Pero hay opciones reales.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Escenario 3 � El due�o abri� otra empresa</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Misma persona, otra empresa, mismos clientes. Esto se llama "sucesi�n empresarial fraudulenta":</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Demanda al socio personalmente v�a "responsabilidad solidaria"</li>
            <li>? La empresa nueva puede ser declarada continuadora de las deudas</li>
            <li>? Requiere abogado pero las probabilidades son altas si hay pruebas</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si nada funciona</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">�ltima opci�n: declararlo como <strong>cr�dito incobrable</strong> en tu contabilidad. Te permite:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Recuperar el IVA repercutido (si han pasado 6-12 meses seg�n ley actual)</li>
            <li>? Imputar la p�rdida fiscalmente</li>
            <li>? Cerrar el caso emocionalmente y seguir</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea te avisa antes del cierre</h3>
          <p className="text-zinc-300 mb-5">Si tu cliente publica concurso o cambia datos en BORME, Saldea integra alertas. Reaccionas a tiempo para inscribir tu cr�dito. <strong>30 d�as gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
    </>
  )
}

