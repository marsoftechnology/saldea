'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setCargando(true)
    await new Promise(r => setTimeout(r, 800))
    setEnviado(true)
    setCargando(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <span className="text-2xl font-bold text-emerald-600">Numio</span>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#como-funciona" className="hover:text-gray-900">Cómo funciona</a>
            <a href="#beneficios" className="hover:text-gray-900">Beneficios</a>
            <a href="#precios" className="hover:text-gray-900">Precios</a>
            <a href="#faq" className="hover:text-gray-900">Preguntas</a>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2">
              Iniciar sesión
            </Link>
            <Link href="/registro" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              Empezar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Ahora en beta gratuita — sin tarjeta
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Para de perseguir clientes.<br />
          <span className="text-emerald-600">Deja que la IA cobre por ti.</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Numio envía recordatorios automáticos por email que escalan en tono hasta que te paguen.
          Amigable al principio, firme después, formal si hace falta.
        </p>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={cargando}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {cargando ? 'Apuntando...' : 'Quiero acceso gratis'}
            </button>
          </form>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 max-w-md mx-auto">
            <div className="text-3xl mb-2">✓</div>
            <p className="text-emerald-800 font-medium">¡Apuntado! Te avisamos cuando tengas acceso.</p>
            <Link href="/registro" className="inline-block mt-3 text-emerald-700 underline text-sm font-medium">
              O crea tu cuenta ahora →
            </Link>
          </div>
        )}

        <p className="text-gray-400 text-sm mt-4">Gratis durante la beta. Sin tarjeta de crédito. Cancela cuando quieras.</p>
      </section>

      {/* Estadísticas del problema */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            El problema cuesta más caro de lo que crees
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            La morosidad es uno de los mayores problemas de los autónomos y pymes en España.
            Los datos son demoledores.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { numero: '80', sufijo: 'días', texto: 'tardan de media las pymes españolas en cobrar una factura' },
              { numero: '40', sufijo: '%', texto: 'de los autónomos tienen al menos una factura impagada' },
              { numero: '11h', sufijo: '/mes', texto: 'dedican de media a perseguir cobros manualmente' },
              { numero: '15', sufijo: '%', texto: 'de las facturas acaban impagadas si no se reclaman' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <p className="text-4xl font-bold text-emerald-600 mb-1">{s.numero}<span className="text-2xl">{s.sufijo}</span></p>
                <p className="text-sm text-gray-500 leading-snug">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">¿Para quién es Numio?</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Si emites facturas y a veces te pagan tarde, esto es para ti.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icono: '💻',
              titulo: 'Freelancers y autónomos',
              descripcion: 'Diseñadores, desarrolladores, consultores, abogados, fotógrafos. Cualquiera que facture por proyectos.',
            },
            {
              icono: '🏪',
              titulo: 'Pequeñas empresas',
              descripcion: 'Negocios de 1 a 10 empleados que emiten facturas a otras empresas y necesitan flujo de caja.',
            },
            {
              icono: '🛠️',
              titulo: 'Servicios y oficios',
              descripcion: 'Electricistas, fontaneros, talleres, reformas. Trabajos hechos y facturas que se quedan colgadas.',
            },
            {
              icono: '🎨',
              titulo: 'Agencias creativas',
              descripcion: 'Marketing, diseño, publicidad, vídeo. Proyectos largos donde los pagos se eternizan.',
            },
            {
              icono: '🏗️',
              titulo: 'Constructoras y reformistas',
              descripcion: 'Donde los plazos de pago son largos y los importes altos. Cada factura cuenta.',
            },
            {
              icono: '💼',
              titulo: 'Asesorías y gestorías',
              descripcion: 'Cuotas mensuales que algunos clientes olvidan pagar todos los meses sin falta.',
            },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-emerald-200 hover:shadow-sm transition-all">
              <div className="text-3xl mb-3">{c.icono}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{c.titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Cómo funciona</h2>
          <p className="text-gray-500 text-center mb-12">Tres pasos y la IA hace el resto</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                numero: '1',
                titulo: 'Añades la factura',
                descripcion: 'Introduce los datos del cliente y el importe. Tardas 30 segundos.',
              },
              {
                numero: '2',
                titulo: 'La IA genera los mensajes',
                descripcion: 'Claude escribe emails personalizados que suben de tono si no pagan.',
              },
              {
                numero: '3',
                titulo: 'Cobras sin hacer nada',
                descripcion: 'Los emails salen solos. Tú solo recibes la notificación de que han pagado.',
              },
            ].map(paso => (
              <div key={paso.numero} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                  {paso.numero}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{paso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Por qué Numio funciona</h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          No es solo un email automático. Es la combinación exacta de tecnología, psicología y persistencia.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icono: '⏰',
              titulo: 'Ahorra 10 horas al mes',
              descripcion: 'Olvídate de redactar emails incómodos, hacer seguimiento en Excel y poner alarmas. Numio lo gestiona todo en segundo plano.',
            },
            {
              icono: '💰',
              titulo: 'Recupera más dinero',
              descripcion: 'Los estudios muestran que las facturas reclamadas sistemáticamente se cobran un 70% más que las que se ignoran.',
            },
            {
              icono: '🤝',
              titulo: 'No estropea relaciones',
              descripcion: 'La IA usa el tono adecuado en cada momento. Empieza amable, escala con educación. Nada de mensajes torpes.',
            },
            {
              icono: '🇪🇸',
              titulo: 'Diseñado para España',
              descripcion: 'Adaptado al español de España, al sistema fiscal nacional y a la forma de hacer negocios aquí. Sin traducciones raras.',
            },
            {
              icono: '🔒',
              titulo: 'Tus datos seguros',
              descripcion: 'Servidores en Europa, cumplimiento RGPD, encriptación de extremo a extremo. Tus facturas y clientes no salen de aquí.',
            },
            {
              icono: '⚡',
              titulo: 'Configuración en 5 minutos',
              descripcion: 'No es un ERP gigante. Te registras, añades un cliente, creas una factura y ya está funcionando.',
            },
          ].map((b, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">
                {b.icono}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{b.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ejemplo de mensajes */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">El tono exacto en el momento exacto</h2>
          <p className="text-gray-500 text-center mb-12">Así escala la IA cuando un cliente no paga</p>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { tono: 'Día 3 · Tono amigable', mensaje: '"Hola Pedro, te recordamos que la factura #001 de 850€ está pendiente. ¿Puedes confirmarnos cuándo realizarás el pago? ¡Gracias!"', color: 'emerald' },
              { tono: 'Día 10 · Tono firme', mensaje: '"Estimado Pedro, llevamos 10 días esperando el pago de la factura #001. Le rogamos que regularice la situación a la mayor brevedad posible."', color: 'yellow' },
              { tono: 'Día 20 · Tono formal', mensaje: '"Sr. García, le informamos que si no recibimos el pago en 48 horas, nos veremos obligados a iniciar los trámites legales correspondientes."', color: 'red' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.color === 'emerald' ? 'bg-emerald-500' :
                    item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-xs font-semibold uppercase tracking-wide ${
                    item.color === 'emerald' ? 'text-emerald-600' :
                    item.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{item.tono}</span>
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed">{item.mensaje}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Numio vs. cualquier otra cosa</h2>
        <p className="text-gray-500 text-center mb-12">Por qué no es lo mismo perseguir cobros manualmente, contratar un gestor o usar Numio</p>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-100 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Característica</th>
                <th className="text-center p-4 text-sm font-medium text-gray-500">A mano</th>
                <th className="text-center p-4 text-sm font-medium text-gray-500">Gestoría</th>
                <th className="text-center p-4 text-sm font-medium text-emerald-600 bg-emerald-50">Numio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['Coste mensual', '0€ (pero pierdes horas)', '100-300€', '0€ en beta · 29€ después'],
                ['Tiempo invertido', '10-15h/mes', '2-3h/mes', '0h/mes'],
                ['Personalización del tono', 'Sí, pero inconsistente', 'Limitada', 'IA adaptada por cliente'],
                ['Seguimiento automático', 'No', 'Parcial', 'Sí, 24/7'],
                ['Escala tono progresivamente', 'A veces', 'No siempre', 'Siempre'],
                ['Funciona los fines de semana', 'No', 'No', 'Sí'],
                ['Pierdes clientes por insistir mal', 'Sí, frecuente', 'Posible', 'Casi nunca'],
              ].map((fila, i) => (
                <tr key={i}>
                  <td className="p-4 text-sm font-medium text-gray-700">{fila[0]}</td>
                  <td className="p-4 text-sm text-gray-500 text-center">{fila[1]}</td>
                  <td className="p-4 text-sm text-gray-500 text-center">{fila[2]}</td>
                  <td className="p-4 text-sm text-emerald-700 font-medium text-center bg-emerald-50/30">{fila[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Precios simples y honestos</h2>
          <p className="text-gray-500 text-center mb-12">Gratis durante la beta. Después, un precio fijo sin sorpresas.</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Beta */}
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                AHORA
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beta gratuita</h3>
              <p className="text-gray-500 text-sm mb-6">Por tiempo limitado, mientras dure la fase beta.</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">0€<span className="text-lg text-gray-400 font-normal">/mes</span></p>
              <p className="text-sm text-gray-400 mb-6">Sin tarjeta de crédito</p>

              <ul className="space-y-3 mb-8 text-sm">
                {[
                  'Facturas y clientes ilimitados',
                  'Recordatorios automáticos con IA',
                  'Plantillas en español',
                  'Soporte por email',
                  'Acceso anticipado a nuevas funciones',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/registro" className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                Empezar gratis
              </Link>
            </div>

            {/* Después */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Pro <span className="text-xs text-gray-400 font-normal">(próximamente)</span></h3>
              <p className="text-gray-500 text-sm mb-6">Cuando termine la beta, todos los usuarios podrán seguir gratis con un plan básico o subir a Pro.</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">29€<span className="text-lg text-gray-400 font-normal">/mes</span></p>
              <p className="text-sm text-gray-400 mb-6">Cobro por SEPA · sin permanencia</p>

              <ul className="space-y-3 mb-8 text-sm">
                {[
                  'Todo lo del plan beta',
                  'Envío también por WhatsApp',
                  'Integración con bancos',
                  'Informes y exportación',
                  'Soporte prioritario',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-300 mt-0.5">✓</span>
                    <span className="text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center text-sm text-gray-400 py-3">
                Los usuarios de la beta tendrán precio reducido de por vida
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Preguntas frecuentes</h2>
        <p className="text-gray-500 text-center mb-12">Resolvemos las dudas que más nos hacéis</p>

        <div className="space-y-3">
          {[
            {
              p: '¿Es legal reclamar deudas por email automatizado?',
              r: 'Completamente legal. Numio envía recordatorios profesionales y respetuosos. Solo recoges el pago de algo que el cliente ya te debe contractualmente. Cumplimos el RGPD y la legislación española sobre comunicaciones comerciales.',
            },
            {
              p: '¿Qué pasa si el cliente paga después del primer recordatorio?',
              r: 'Marcas la factura como cobrada con un clic y el sistema deja de enviar recordatorios automáticamente. Tu cliente solo recibe el primer email amable, así que ni siquiera nota nada raro.',
            },
            {
              p: '¿Mis datos y los de mis clientes están seguros?',
              r: 'Sí. Los datos se guardan encriptados en servidores europeos (cumplen RGPD). Solo tú puedes ver tus facturas y clientes. Nunca compartimos ni vendemos información a terceros.',
            },
            {
              p: '¿Puedo cancelar cuando quiera?',
              r: 'Sí, sin permanencia ni penalizaciones. Te das de baja desde el panel en 30 segundos. Durante la beta, además, es totalmente gratis.',
            },
            {
              p: '¿Funciona con clientes fuera de España?',
              r: 'Sí, los emails se generan en español por defecto pero la IA puede adaptarlos a otros idiomas. Si tienes clientes internacionales también te sirve.',
            },
            {
              p: '¿Tengo que cambiar mi programa de facturación actual?',
              r: 'No. Numio funciona en paralelo a Holded, Anfix, Quipu o lo que uses. Solo añades las facturas que quieras reclamar. Próximamente integraremos los principales programas para que se importen solas.',
            },
            {
              p: '¿La IA puede equivocarse o ser grosera?',
              r: 'Antes de enviar el primer recordatorio puedes revisarlo si quieres. Y configurar el tono base. La IA está entrenada para ser profesional y respetuosa siempre, incluso en el tono formal final.',
            },
            {
              p: '¿Cuándo termina la beta?',
              r: 'No tenemos fecha exacta. Probablemente cuando tengamos 500 usuarios activos. Los que entren ahora tendrán precio reducido cuando lancemos los planes de pago.',
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
              className="w-full text-left bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors"
            >
              <div className="p-5 flex items-center justify-between">
                <span className="font-medium text-gray-900 pr-4">{item.p}</span>
                <span className={`text-emerald-600 text-xl transition-transform ${faqAbierta === i ? 'rotate-45' : ''}`}>+</span>
              </div>
              {faqAbierta === i && (
                <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">
                  {item.r}
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Cierre con urgencia */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Acceso gratuito limitado
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cada día sin Numio<br />pierdes dinero
          </h2>

          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            Los primeros 500 usuarios entran gratis y mantienen precio reducido de por vida.
            Después solo se abre con lista de espera.
          </p>

          <Link
            href="/registro"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Crear mi cuenta gratis ahora
          </Link>

          <p className="text-emerald-100 text-sm mt-6">
            Sin tarjeta · Sin permanencia · Configurado en 5 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <span className="text-2xl font-bold text-white">Numio</span>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                La forma más simple de cobrar tus facturas impagadas. Sin perseguir, sin estropear relaciones.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#como-funciona" className="hover:text-white">Cómo funciona</a></li>
                <li><a href="#precios" className="hover:text-white">Precios</a></li>
                <li><a href="#faq" className="hover:text-white">Preguntas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2026 Numio. Hecho en España.</p>
            <p>Datos protegidos · Servidores en Europa · Cumplimiento RGPD</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
