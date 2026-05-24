import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Testimonios de usuarios de Saldea | Marsof',
  description: 'Lo que dicen nuestros primeros usuarios sobre Saldea: gestorías, autónomos y pymes que ya recuperan facturas con IA.',
  alternates: { canonical: 'https://marsof.es/testimonios' },
  keywords: ['testimonios Saldea', 'opiniones Saldea', 'reseñas Saldea', 'usuarios Saldea'],
  openGraph: { title: 'Testimonios Saldea', description: 'Lo que dicen los usuarios.', type: 'website', locale: 'es_ES' },
}

export default function PageTestimonios() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <div className="flex items-center gap-2">
<Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">15 días gratis</Link></div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Testimonios y casos de éxito</h1>
        <p className="text-zinc-400 text-lg mb-12">Saldea acaba de lanzarse en mayo de 2026. Esta página irá creciendo con las historias reales de nuestros primeros usuarios. Si quieres ser uno de ellos, prueba 15 días gratis y nos cuentas.</p>

        <div className="bg-zinc-900/40 border border-sky-500/30 rounded-2xl p-8 mb-12 text-center">
          <p className="text-5xl mb-4">🎯</p>
          <h2 className="text-2xl font-bold text-zinc-100 mb-3">Próximamente: los primeros casos</h2>
          <p className="text-zinc-400 mb-6">Estamos recogiendo los primeros testimonios. Si quieres ser fundador y aparecer aquí con tu logo y caso, escríbenos.</p>
          <a href="mailto:hola@marsof.es?subject=Quiero%20ser%20caso%20de%20estudio" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Quiero ser caso de estudio →</a>
        </div>

        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">¿Qué métricas medimos en los casos de éxito?</h2>
        <ul className="space-y-2 text-zinc-300 mb-12">
          <li>📊 <strong>DSO antes vs después:</strong> días promedio de cobro</li>
          <li>💰 <strong>Facturas recuperadas:</strong> importe que pasó de vencido a cobrado</li>
          <li>⏱️ <strong>Horas ahorradas:</strong> tiempo que NO dedicas a perseguir cobros</li>
          <li>🎯 <strong>Tasa de cobro:</strong> % de facturas cobradas vs emitidas</li>
          <li>📈 <strong>ROI:</strong> retorno sobre los 49€/mes</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mt-12 mb-4">¿Por qué deberías ser caso de estudio?</h2>
        <ul className="space-y-2 text-zinc-300 mb-12">
          <li>✓ <strong>Visibilidad gratuita</strong> para tu empresa en nuestra web</li>
          <li>✓ <strong>Plan Pro gratuito</strong> el primer año si aportas datos verificables</li>
          <li>✓ <strong>Caso compartido en LinkedIn</strong> y redes (con tu permiso)</li>
          <li>✓ <strong>Ayudas a otros</strong> en tu situación a confiar en Saldea</li>
        </ul>

        <div className="bg-gradient-to-br from-sky-500/15 to-transparent border border-sky-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Prueba Saldea y conviértete en el siguiente caso</h2>
          <p className="text-zinc-400 mb-6">15 días gratis. Si funciona, hablamos.</p>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-sky-400 transition-colors">Empezar gratis →</Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  )
}
