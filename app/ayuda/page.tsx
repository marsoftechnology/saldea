import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingFooter from '../components/MarketingFooter'

export const metadata: Metadata = {
  title: 'Ayuda · Saldea',
  description: 'Centro de ayuda de Saldea. Preguntas frecuentes, soporte y contacto con el equipo de Marsof Technology.',
  alternates: { canonical: 'https://www.marsof.es/ayuda' },
}

const faqs: Array<{ q: string; a: string }> = [
  {
    q: '¿Cómo conecto Saldea con Stripe para que mis clientes paguen?',
    a: 'En Ajustes encontrarás la sección "Cobros automáticos con Stripe". Pulsa "Conectar Stripe", inicia sesión en tu cuenta Stripe (o crea una nueva) y autoriza la conexión. A partir de ese momento, cada recordatorio incluirá un botón "Pagar ahora" y las facturas se marcarán como cobradas automáticamente cuando recibas el pago.',
  },
  {
    q: '¿Cómo importo mis facturas existentes de Holded?',
    a: 'En Ajustes → "Conectar con Holded" pega tu API Key (la encuentras en Holded → Ajustes → Integraciones → API). Saldea importará automáticamente todas tus facturas pendientes y vencidas, junto con los datos de tus clientes.',
  },
  {
    q: '¿Cuántos emails puedo enviar?',
    a: 'El plan gratuito incluye 5 recordatorios al mes. El plan Pro es ilimitado. Si necesitas enviar más recordatorios, sube a Pro desde Ajustes.',
  },
  {
    q: '¿Cómo cambio el tono de los mensajes que envía la IA?',
    a: 'En Ajustes → "Tono y mensajes" puedes elegir el tono general (cordial, firme, contundente, extremo) o personalizar las plantillas tú mismo usando variables como {cliente}, {factura} e {importe}.',
  },
  {
    q: '¿Puedo invitar a otras personas a mi cuenta?',
    a: 'Sí. Desde Equipo puedes invitar miembros con roles (administrador, miembro, solo lectura). El plan gratuito permite 1 miembro; el plan Pro hasta 10.',
  },
  {
    q: '¿Mis datos están a salvo?',
    a: 'Sí. Todos los datos se cifran en reposo y en tránsito. Tu información se aloja en servidores europeos (Supabase EU) y nunca compartimos tus datos con terceros. Cumplimos con RGPD.',
  },
  {
    q: '¿Cómo cancelo mi suscripción?',
    a: 'En Ajustes → "Plan y suscripción" pulsa "Gestionar suscripción". Se abre el portal de Stripe donde puedes cancelar al instante. Mantienes acceso hasta el final del período pagado.',
  },
  {
    q: '¿Por qué algunos emails se reciben en SPAM?',
    a: 'Los emails se envían desde nuestro dominio verificado. Si un cliente concreto recibe los mensajes en SPAM, pídele que añada cobros@marsof.es a sus contactos. Estamos trabajando para mejorar la entregabilidad continuamente.',
  },
]

export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">Centro de ayuda</h1>
          <p className="text-zinc-400 text-lg">
            Preguntas frecuentes sobre Saldea. Si no encuentras lo que buscas, escríbenos.
          </p>
        </div>

        {/* Bloque de contacto */}
        <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💬</span>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">¿Necesitas ayuda directa?</h2>
              <p className="text-zinc-300 text-sm mb-3">
                Te respondemos en menos de 24h laborables. Cuéntanos lo que necesitas.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:soporte@marsof.es"
                  className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  ✉️ soporte@marsof.es
                </a>
                <Link
                  href="/contacto"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Formulario de contacto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Preguntas frecuentes</h2>
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-zinc-900/40 border border-white/10 rounded-xl group"
            >
              <summary className="cursor-pointer p-5 font-semibold text-zinc-100 hover:bg-white/[0.02] rounded-xl flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-zinc-500 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Recursos extra */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <h3 className="font-semibold text-zinc-300 mb-3">Más recursos</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/legal/terminos" className="text-sky-400 hover:text-sky-300">
                Términos y condiciones →
              </Link>
            </li>
            <li>
              <Link href="/legal/privacidad" className="text-sky-400 hover:text-sky-300">
                Política de privacidad →
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="text-sky-400 hover:text-sky-300">
                Política de cookies →
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sky-400 hover:text-sky-300">
                Blog y guías →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}
