import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies · Saldea by Marsof Technology',
  description: 'Política de Cookies de Saldea: qué cookies usamos, para qué, y cómo gestionarlas.',
}

export default function CookiesPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Política de Cookies</h1>
      <p className="text-zinc-500 text-sm">Última actualización: 14 de mayo de 2026</p>

      <section className="mt-10 space-y-5 text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white mt-10 mb-3">1. ¿Qué es una cookie?</h2>
        <p>
          Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador para recordar información sobre tu visita (por ejemplo, mantenerte conectado entre páginas). Las cookies no son virus ni acceden a información personal de tu equipo.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">2. ¿Qué cookies usamos?</h2>
        <p>
          En Saldea utilizamos únicamente <strong className="text-zinc-100">cookies técnicas estrictamente necesarias</strong> para el funcionamiento del servicio. Estas cookies están <strong className="text-zinc-100">exentas del deber de consentimiento</strong> según el artículo 22.2 de la LSSI-CE.
        </p>

        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="text-left py-3 pr-4 font-semibold">Cookie</th>
                <th className="text-left py-3 pr-4 font-semibold">Proveedor</th>
                <th className="text-left py-3 pr-4 font-semibold">Finalidad</th>
                <th className="text-left py-3 font-semibold">Duración</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-mono text-xs">sb-*-auth-token</td>
                <td className="py-3 pr-4">Supabase</td>
                <td className="py-3 pr-4">Mantener tu sesión iniciada</td>
                <td className="py-3">1 semana</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-mono text-xs">__stripe_mid</td>
                <td className="py-3 pr-4">Stripe</td>
                <td className="py-3 pr-4">Prevención de fraude en el checkout</td>
                <td className="py-3">1 año</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-mono text-xs">__stripe_sid</td>
                <td className="py-3 pr-4">Stripe</td>
                <td className="py-3 pr-4">Sesión de checkout</td>
                <td className="py-3">30 minutos</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-mono text-xs">cf_*</td>
                <td className="py-3 pr-4">Cloudflare</td>
                <td className="py-3 pr-4">Seguridad y prevención de bots</td>
                <td className="py-3">30 minutos</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">saldea_consent</td>
                <td className="py-3 pr-4">Saldea</td>
                <td className="py-3 pr-4">Recordar que viste el aviso de cookies</td>
                <td className="py-3">1 año</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">3. Cookies de terceros</h2>
        <p>
          Stripe y Cloudflare son proveedores externos con sus propias políticas de cookies. Te recomendamos consultarlas:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><a href="https://stripe.com/cookies-policy/legal" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">Política de cookies de Stripe</a></li>
          <li><a href="https://www.cloudflare.com/cookie-policy/" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">Política de cookies de Cloudflare</a></li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">4. Cookies que NO usamos</h2>
        <p>
          A día de hoy <strong className="text-zinc-100">no utilizamos cookies de analítica, publicidad ni perfilado</strong> (Google Analytics, Meta Pixel, etc.). Si en el futuro las añadimos, te lo informaremos previamente y solicitaremos tu consentimiento explícito.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">5. ¿Cómo gestionar las cookies?</h2>
        <p>
          Puedes configurar tu navegador para aceptar, rechazar o eliminar las cookies que se almacenan en tu equipo. Ten en cuenta que si rechazas las cookies estrictamente necesarias, <strong className="text-zinc-100">no podrás iniciar sesión ni completar pagos</strong> en Saldea.
        </p>
        <p>Más información sobre cómo gestionar las cookies en cada navegador:</p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><a href="https://support.google.com/chrome/answer/95647" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">6. Contacto</h2>
        <p>
          Para cualquier consulta sobre las cookies: <a href="mailto:info@marsof.es" className="text-sky-400 hover:text-sky-300 underline">info@marsof.es</a>
        </p>
      </section>
    </article>
  )
}
