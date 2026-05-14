import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal y condiciones de uso · Saldea by Marsof Technology',
  description: 'Aviso legal y condiciones de uso del servicio Saldea, plataforma de cobro automático de facturas con IA.',
}

export default function TerminosPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Aviso legal y condiciones de uso</h1>
      <p className="text-zinc-500 text-sm">Última actualización: 14 de mayo de 2026</p>

      <section className="mt-10 space-y-5 text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white mt-10 mb-3">1. Identificación del titular</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos identificativos del titular del sitio web <strong className="text-zinc-100">marsof.es</strong> y de la plataforma Saldea:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Titular:</strong> Carlos Gálvez Carrillo</li>
          <li><strong className="text-zinc-200">NIF:</strong> 49080222Q</li>
          <li><strong className="text-zinc-200">Domicilio fiscal:</strong> Calle Museo 4, 21840 Niebla (Huelva), España</li>
          <li><strong className="text-zinc-200">Email de contacto:</strong> info@marsof.es</li>
          <li><strong className="text-zinc-200">Sitio web:</strong> https://marsof.es</li>
          <li><strong className="text-zinc-200">Nombre comercial:</strong> Marsof Technology · Saldea</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">2. Objeto del servicio</h2>
        <p>
          <strong className="text-zinc-100">Saldea</strong> es una plataforma SaaS (Software como Servicio) que ayuda a autónomos y pequeñas empresas a gestionar y automatizar el cobro de sus facturas mediante recordatorios escritos por inteligencia artificial. El servicio se presta a través de la web https://marsof.es y se encuentra actualmente en <strong className="text-zinc-100">fase beta</strong>.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">3. Aceptación de las condiciones</h2>
        <p>
          El acceso a la plataforma y/o el registro de una cuenta implican la aceptación expresa de las presentes condiciones de uso. Si el usuario no está de acuerdo con alguna de las cláusulas, deberá abstenerse de utilizar el servicio.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">4. Registro y cuenta de usuario</h2>
        <p>
          Para utilizar Saldea es necesario crear una cuenta con un email válido y una contraseña. El usuario se compromete a:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li>Proporcionar datos veraces y mantenerlos actualizados.</li>
          <li>Mantener la confidencialidad de sus credenciales y notificar cualquier uso no autorizado.</li>
          <li>No utilizar la cuenta de otro usuario sin autorización.</li>
          <li>Ser mayor de edad y tener capacidad legal para contratar el servicio.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">5. Planes, precios y forma de pago</h2>
        <p>
          Saldea ofrece los siguientes planes:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Plan Free:</strong> gratuito con limitaciones (hasta 3 facturas activas, 10 clientes, 30 emails/mes, 1 tono).</li>
          <li><strong className="text-zinc-200">Plan Pro Mensual:</strong> 49 €/mes con periodo de prueba gratuito de 7 días. Se requiere tarjeta. El primer cobro se realiza el día 8 si no se cancela antes.</li>
          <li><strong className="text-zinc-200">Plan Pro Anual:</strong> 499 €/año, cobro al instante, sin periodo de prueba.</li>
        </ul>
        <p>
          Los pagos son procesados por <strong className="text-zinc-100">Stripe Payments Europe, Ltd.</strong> (Irlanda). El titular del servicio no almacena datos bancarios en ningún momento.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">6. Cancelación, derecho de desistimiento y reembolsos</h2>
        <p>
          El usuario puede cancelar su suscripción en cualquier momento desde el panel de control. La cancelación detiene la renovación automática; no se aplican prorrateos ni reembolsos por periodos ya facturados, salvo en los siguientes casos:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Derecho de desistimiento:</strong> los consumidores residentes en la UE disponen de 14 días naturales desde la contratación para desistir sin justificación. No obstante, al ser un servicio digital de ejecución inmediata, el usuario reconoce que pierde este derecho una vez comenzada la prestación del servicio si lo ha solicitado expresamente.</li>
          <li><strong className="text-zinc-200">Fallo técnico imputable al titular:</strong> reembolso proporcional al periodo no disponible.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">7. Uso aceptable</h2>
        <p>
          El usuario se compromete a no utilizar Saldea para:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li>Enviar comunicaciones comerciales no solicitadas (spam) o que vulneren la Ley General de Telecomunicaciones.</li>
          <li>Reclamar deudas que no le pertenezcan o que no sean ciertas, líquidas, vencidas y exigibles.</li>
          <li>Hostigar, amenazar o intimidar a terceros.</li>
          <li>Vulnerar derechos de terceros, incluidos los derivados del RGPD.</li>
          <li>Realizar ingeniería inversa, decompilación o explotación no autorizada del software.</li>
        </ul>
        <p>
          El incumplimiento puede conllevar la suspensión inmediata de la cuenta sin reembolso.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">8. Responsabilidad sobre los datos del usuario</h2>
        <p>
          El usuario es el <strong className="text-zinc-100">responsable del tratamiento</strong> de los datos personales de sus propios clientes que introduce en Saldea (nombre, email, empresa, datos de factura). El titular del servicio actúa como <strong className="text-zinc-100">encargado del tratamiento</strong> conforme al artículo 28 del RGPD. Para más detalles consulte la <a href="/legal/privacidad" className="text-sky-400 hover:text-sky-300 underline">Política de Privacidad</a>.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">9. Disponibilidad y limitación de responsabilidad</h2>
        <p>
          El titular hará esfuerzos razonables para mantener el servicio disponible, pero <strong className="text-zinc-100">no garantiza una disponibilidad del 100%</strong>. El servicio se presta &quot;tal cual&quot; durante la fase beta. El titular no será responsable de daños indirectos, lucro cesante, pérdida de datos o cualquier consecuencia derivada del uso o imposibilidad de uso del servicio, salvo dolo o negligencia grave.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">10. Propiedad intelectual</h2>
        <p>
          El código, diseño, marcas, logotipos y contenidos de Saldea son propiedad de Carlos Gálvez Carrillo, salvo cuando se indique lo contrario. Queda prohibida su reproducción, distribución, modificación o uso comercial sin autorización expresa.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">11. Modificaciones</h2>
        <p>
          El titular podrá modificar estas condiciones en cualquier momento. Los cambios entrarán en vigor desde su publicación en este sitio web. Si los cambios son sustanciales, se notificarán por email a los usuarios registrados con al menos 15 días de antelación.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">12. Legislación aplicable y jurisdicción</h2>
        <p>
          Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del consumidor (cuando se trate de un consumidor) o, en caso contrario, a los Juzgados de la ciudad del titular del servicio.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">13. Contacto</h2>
        <p>
          Para cualquier consulta sobre estas condiciones puede contactar con: <a href="mailto:info@marsof.es" className="text-sky-400 hover:text-sky-300 underline">info@marsof.es</a>
        </p>
      </section>
    </article>
  )
}
