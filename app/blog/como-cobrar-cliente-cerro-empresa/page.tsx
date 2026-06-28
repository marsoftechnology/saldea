import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a un cliente que cerró su empresa | Marsof',
  description: 'Tu cliente cerró la empresa o entró en concurso. ¿Puedes cobrar? Sí, en ciertos casos. Te explico cómo y cuándo.',
  alternates: { canonical: 'https://www.marsof.es/blog/como-cobrar-cliente-cerro-empresa' },
  keywords: ['cliente cerró empresa', 'cobrar empresa cerrada', 'cliente quebrado', 'cliente concurso acreedores'],
  openGraph: { title: 'Cómo cobrar a un cliente que cerró', description: 'Concurso y soluciones.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">? Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Caso especial · 5 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar a un cliente que cerró</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">Cuando la empresa cierra o entra en concurso, complica todo. Pero hay opciones, sobre todo si actúas rápido.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Verifica primero: ¿qué pasó?</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>?? <strong>Busca en BORME</strong> (boe.es/diario_borme): ¿está en concurso? ¿Disolución?</li>
            <li>?? <strong>einforma.com:</strong> estado actual de la empresa</li>
            <li>?? <strong>Hacienda:</strong> verifica si el CIF sigue activo</li>
            <li>?? <strong>Sus redes/web:</strong> ¿hay nuevas empresas del mismo dueño?</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Escenario 1 — Concurso de acreedores</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Lo más común. Si publican concurso en BORME:</p>
          <ol className="space-y-2 text-zinc-300 list-decimal list-inside mb-6">
            <li>Tienes <strong>30 días desde publicación</strong> para inscribir tu crédito como acreedor</li>
            <li>Necesitas: factura original, prueba de la deuda, datos identificación</li>
            <li>Lo presentas al <strong>administrador concursal</strong> designado</li>
            <li>Esperas a la lista provisional y final de acreedores</li>
            <li>Cobras (si hay liquidez) según orden legal: trabajadores ? Hacienda ? Seguridad Social ? garantizados ? ordinarios</li>
          </ol>
          <p className="text-zinc-300 leading-relaxed mb-4"><strong>Realidad:</strong> el acreedor ordinario cobra el 10-30% de la deuda en el mejor caso. Pero algo es algo.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Escenario 2 — Empresa disuelta</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">La empresa se disolvió sin concurso formal:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Si los socios no liquidaron correctamente, pueden ser <strong>responsables personales</strong></li>
            <li>? Si hubo "vaciado" de la empresa a otra paralela: <strong>acción de levantamiento del velo</strong></li>
            <li>? Si el administrador no convocó concurso obligatorio: <strong>responsabilidad personal</strong></li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mb-4">Aquí necesitas abogado mercantilista. Pero hay opciones reales.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Escenario 3 — El dueño abrió otra empresa</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Misma persona, otra empresa, mismos clientes. Esto se llama "sucesión empresarial fraudulenta":</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Demanda al socio personalmente vía "responsabilidad solidaria"</li>
            <li>? La empresa nueva puede ser declarada continuadora de las deudas</li>
            <li>? Requiere abogado pero las probabilidades son altas si hay pruebas</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si nada funciona</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Última opción: declararlo como <strong>crédito incobrable</strong> en tu contabilidad. Te permite:</p>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>? Recuperar el IVA repercutido (si han pasado 6-12 meses según ley actual)</li>
            <li>? Imputar la pérdida fiscalmente</li>
            <li>? Cerrar el caso emocionalmente y seguir</li>
          </ul>
        </section>
        <aside className="mt-12 bg-sky-500/10 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea te avisa antes del cierre</h3>
          <p className="text-zinc-300 mb-5">Si tu cliente publica concurso o cambia datos en BORME, Saldea integra alertas. Reaccionas a tiempo para inscribir tu crédito. <strong>30 días gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis ?</Link>
        </aside>
      </div>
    </article>
  )
}

