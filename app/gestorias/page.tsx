import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saldea para gestorías y asesorías: cobra las facturas de tus clientes sin perseguir',
  description: 'Software de gestión de cobros pensado para gestorías y asesorías españolas. Automatiza los recordatorios de tus clientes con IA. 1 mes gratis.',
  alternates: { canonical: 'https://marsof.es/gestorias' },
  keywords: [
    'software gestoría cobros',
    'gestión cobros gestoría',
    'asesoría reclamar facturas',
    'software gestoría 2026',
    'herramienta morosos gestoría',
    'cobro facturas para gestores',
  ],
  openGraph: {
    title: 'Saldea para gestorías: cobra las facturas de tus clientes sin perseguir',
    description: 'Automatiza los recordatorios de tus clientes con IA. 1 mes gratis.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function PageGestorias() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-zinc-100">Marsof / Saldea</Link>
          <Link href="/registro" className="bg-sky-500 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors">1 mes gratis</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
          Pensado para gestorías y asesorías españolas
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Cobra las facturas de tus clientes <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">sin perseguir a nadie</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Saldea es la IA que persigue a los morosos de tus clientes 24/7. Mensajes personalizados que escalan en tono, detección automática de respuestas, y todo cumpliendo la Ley 3/2004.
        </p>
        <Link href="/registro" className="inline-flex items-center gap-2 bg-sky-500 text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/30">
          Empezar 1 mes gratis →
        </Link>
        <p className="text-xs text-zinc-500 mt-4">Sin tarjeta hasta el día 31 · Cancela en 1 clic · Sin permanencia</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Los 3 dolores que resolvemos a gestorías</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <p className="text-3xl mb-3">😩</p>
            <h3 className="font-bold text-zinc-100 mb-2">"Mis clientes no cobran"</h3>
            <p className="text-zinc-400 text-sm">El 25% de las facturas de tus clientes se pagan tarde. Tú lo sabes pero no tienes tiempo de reclamar por ellos.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <p className="text-3xl mb-3">⏰</p>
            <h3 className="font-bold text-zinc-100 mb-2">"No tengo tiempo de perseguir"</h3>
            <p className="text-zinc-400 text-sm">Reclamar facturas a mano son 2-3 horas/semana por cliente. Con 20 clientes son 50 horas al mes que no facturas.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <p className="text-3xl mb-3">📞</p>
            <h3 className="font-bold text-zinc-100 mb-2">"Encima me llaman a mí"</h3>
            <p className="text-zinc-400 text-sm">Los clientes te llaman pidiendo ayuda cuando tienen un moroso. Tú no eres abogado de cobros.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo te ayuda Saldea</h2>
        <div className="space-y-5">
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">1️⃣</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">Importas las facturas de tus clientes</h3>
              <p className="text-zinc-400 text-sm">CSV, manual o conectando con su software de facturación.</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">2️⃣</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">La IA manda los recordatorios</h3>
              <p className="text-zinc-400 text-sm">Día 1 amable, día 7 firme, día 30 formal con Ley 3/2004, día 60 previo a burofax. Tú no haces nada.</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">3️⃣</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">Detecta respuestas automáticamente</h3>
              <p className="text-zinc-400 text-sm">Si el moroso paga, dispute o promete pago, Saldea lo entiende y pausa los recordatorios. Solo te avisa cuando hace falta.</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 flex gap-5">
            <p className="text-3xl">4️⃣</p>
            <div>
              <h3 className="font-bold text-zinc-100 mb-2">Tu cliente paga, tú quedas como un héroe</h3>
              <p className="text-zinc-400 text-sm">Sin escalado emocional, sin perseguir, sin gastar 2 horas semanales por cliente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Precio para gestorías</h2>
        <div className="bg-zinc-900/40 border border-sky-500/30 rounded-2xl p-8 text-center">
          <p className="text-zinc-400 mb-2">Plan Pro</p>
          <p className="text-5xl font-bold text-zinc-100 mb-2">49€<span className="text-xl text-zinc-500">/mes</span></p>
          <p className="text-sky-400 font-semibold mb-6">o 499€/año (ahorras 89€)</p>
          <ul className="text-left max-w-md mx-auto space-y-3 text-zinc-300 mb-8">
            <li>✓ Facturas ilimitadas</li>
            <li>✓ Hasta 10 miembros de tu equipo</li>
            <li>✓ IA Claude para escalado de tono</li>
            <li>✓ Detección de respuestas con IA</li>
            <li>✓ Stripe Connect para cobros</li>
            <li>✓ Plantillas personalizables</li>
            <li>✓ Datos en servidores europeos (RGPD)</li>
            <li>✓ Soporte en español</li>
          </ul>
          <Link href="/registro" className="inline-block bg-sky-500 text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-sky-400 transition-all">Empezar 1 mes gratis →</Link>
          <p className="text-xs text-zinc-500 mt-4">Sin tarjeta hasta el día 31. Cancela cuando quieras.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes de gestorías</h2>
        <div className="text-left space-y-4 mt-8">
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">¿Puedo gestionar varios clientes desde la misma cuenta?</h3>
            <p className="text-zinc-400 text-sm">Sí. Saldea soporta multi-empresa: tú creas una organización por cada cliente y gestionas todas desde tu login.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">¿Mi cliente puede ver lo que hace Saldea?</h3>
            <p className="text-zinc-400 text-sm">Sí. Puedes invitar a tu cliente como "lectura" para que vea el histórico sin poder modificar nada.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">¿Cumple Ley 3/2004 y RGPD?</h3>
            <p className="text-zinc-400 text-sm">100%. Los recordatorios citan la Ley 3/2004 automáticamente y los 40€ de indemnización. Los datos están en servidores europeos.</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/10 rounded-xl p-5">
            <h3 className="font-bold text-zinc-100 mb-2">¿Y si mi cliente no quiere que su moroso reciba emails automáticos?</h3>
            <p className="text-zinc-400 text-sm">Saldea no manda nada sin que el cliente firme la activación. Tú o tu cliente decidís cuándo empezar y podéis pausar en 1 clic.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-sky-500/20 to-transparent border border-sky-500/30 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-4">Tu gestoría se merece esto</h2>
          <p className="text-zinc-300 mb-6">Deja de perder horas reclamando facturas de tus clientes. Que lo haga la IA.</p>
          <Link href="/registro" className="inline-block bg-white text-zinc-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-zinc-100 transition-all">Empezar 1 mes gratis →</Link>
        </div>
      </section>
    </div>
  )
}
