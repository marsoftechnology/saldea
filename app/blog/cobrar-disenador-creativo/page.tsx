import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo cobrar a clientes como diseñador o freelance creativo | Saldea',
  description: 'Estrategias específicas para diseñadores, ilustradores y creativos. Cláusula de propiedad intelectual, anticipos y archivos fuente.',
  alternates: { canonical: 'https://marsof.es/blog/cobrar-disenador-creativo' },
  keywords: ['cobrar diseñador freelance', 'cobrar diseño gráfico', 'cobrar ilustrador', 'cobrar trabajo creativo'],
  openGraph: { title: 'Cómo cobrar como diseñador creativo', description: 'Estrategias y cláusulas.', type: 'article', locale: 'es_ES' },
}

export default function Page() {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 mb-8 inline-block">← Volver al blog</Link>
        <header className="mb-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-3">Sector · 4 min</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Cómo cobrar como diseñador o freelance creativo</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">El sector creativo es vulnerable a impagos. Pero tienes un arma única: la propiedad intelectual.</p>
        </header>
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Tu arma secreta: la propiedad intelectual</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">En España, la propiedad intelectual de tu trabajo es tuya HASTA que cobras. Esto te da un poder enorme.</p>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Cláusula crítica en presupuesto</h2>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5 my-4 text-sm">
            <p className="text-zinc-300 whitespace-pre-line">
{`PROPIEDAD INTELECTUAL Y CESIÓN DE DERECHOS:

La cesión de los derechos de explotación y uso comercial
del trabajo entregado se efectúa ÚNICAMENTE tras el pago
íntegro del importe acordado.

Hasta el pago completo, el trabajo se entrega bajo licencia
limitada de revisión interna, prohibiendo su uso comercial,
publicación, modificación o cesión a terceros.

El uso no autorizado constituye infracción de los derechos
de propiedad intelectual (Real Decreto Legislativo 1/1996),
con las consecuencias legales correspondientes.`}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Entrega en fases</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>1️⃣ <strong>Borradores en PDF con marca de agua</strong> hasta 1er hito de pago</li>
            <li>2️⃣ <strong>Versión preview sin archivos fuente</strong> hasta 2º hito</li>
            <li>3️⃣ <strong>Archivos fuente y derechos de explotación</strong> SOLO tras pago completo</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Si lo está usando sin pagar</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">Es agravante. Manda burofax:</p>
          <div className="bg-zinc-900/40 border-l-4 border-rose-500 rounded-r-xl p-5 my-4">
            <p className="text-zinc-300 text-sm italic">"He detectado que estás usando comercialmente el material entregado sin haber completado el pago. Esto constituye infracción de propiedad intelectual según RDL 1/1996. Te requiero al pago íntegro de [importe] en 7 días, o procederé a denuncia por uso indebido + reclamación civil."</p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Estructura de precios típica</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ 30% al firmar presupuesto (reserva de fecha)</li>
            <li>✓ 30% a la entrega de borradores aprobados</li>
            <li>✓ 40% a la entrega final con cesión de derechos</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">Plataformas de cobro creativo</h2>
          <ul className="space-y-2 text-zinc-300 mb-6">
            <li>✓ <strong>Stripe Connect:</strong> link de pago en cada entrega</li>
            <li>✓ <strong>Cuenta autónomo dedicada:</strong> separar lo creativo del resto</li>
            <li>✓ <strong>Portal cliente con contraseña:</strong> archivos bloqueados hasta cobro</li>
          </ul>
        </section>
        <aside className="mt-12 bg-gradient-to-br from-sky-50 to-sky-100/50 border border-sky-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Saldea persigue tus cobros creativos</h3>
          <p className="text-zinc-300 mb-5">Mientras tú creas, Saldea reclama. Recordatorios profesionales con tu marca personal. <strong>1 mes gratis.</strong></p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Probar Saldea gratis →</Link>
        </aside>
      </div>
    </article>
  )
}
