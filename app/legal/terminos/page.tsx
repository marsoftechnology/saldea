import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal y condiciones de uso · Saldea by Marsof Technology',
  description: 'Aviso legal y condiciones de uso del servicio Saldea, plataforma de cobro automático de facturas con IA.',
}

export default function TerminosPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Aviso legal y condiciones de uso</h1>
      <p className="text-zinc-500 text-sm">Última actualización: 15 de mayo de 2026</p>

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
          <li><strong className="text-zinc-200">Plan Free:</strong> gratuito con limitaciones (hasta 3 facturas activas, 10 clientes, 30 emails/mes, 1 tono y <strong className="text-zinc-100">1 único miembro</strong> en la organización).</li>
          <li><strong className="text-zinc-200">Plan Pro Mensual:</strong> 49 €/mes con periodo de prueba gratuito de 30 días. Se requiere tarjeta. El primer cobro se realiza 30 días después del registro si no se cancela antes. Incluye <strong className="text-zinc-100">hasta 10 miembros</strong> de equipo.</li>
          <li><strong className="text-zinc-200">Plan Pro Anual:</strong> 499 €/año, cobro al instante, sin periodo de prueba. Mismas funcionalidades que Pro Mensual.</li>
        </ul>
        <p>
          Los pagos de la suscripción son procesados por <strong className="text-zinc-100">Stripe Payments Europe, Ltd.</strong> (Irlanda). El titular del servicio no almacena datos bancarios en ningún momento.
        </p>
        <p>
          El plan y la suscripción se asocian a la <strong className="text-zinc-100">organización</strong> creada por el usuario titular (propietario), no a cada miembro individual. Solo el propietario puede contratar, modificar o cancelar el plan.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">5.bis. Stripe Connect (cobros a tus clientes)</h2>
        <p>
          Saldea ofrece, como funcionalidad opcional, la integración con <strong className="text-zinc-100">Stripe Connect</strong> para que el usuario pueda cobrar sus facturas a sus propios clientes mediante un enlace de pago seguro (&quot;Payment Link&quot;).
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li>La conexión se realiza mediante OAuth: el usuario autoriza expresamente a Saldea a generar Payment Links en su nombre. Puede revocar este acceso en cualquier momento desde Ajustes o desde su dashboard de Stripe.</li>
          <li>Los fondos pagados por el deudor llegan <strong className="text-zinc-100">directamente</strong> a la cuenta bancaria que el usuario haya configurado en Stripe. Saldea <strong className="text-zinc-100">no recibe</strong>, custodia ni transmite dichos fondos en ningún momento.</li>
          <li>Las comisiones aplicables son las propias de Stripe (típicamente 1,4% + 0,25 € para tarjetas del EEE). Saldea <strong className="text-zinc-100">no añade</strong> comisiones adicionales sobre las transacciones.</li>
          <li>Las relaciones entre el usuario y Stripe se rigen por los <a href="https://stripe.com/es/connect-account/legal" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">términos de Stripe Connected Account</a>, que el usuario acepta al conectar su cuenta.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">5.ter. Miembros del equipo y roles</h2>
        <p>
          El propietario de la organización puede invitar a otros usuarios (mediante email) para que colaboren en la gestión de los cobros. Cada miembro tiene un rol que determina sus permisos:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Propietario (owner):</strong> control total, gestiona el plan y Stripe.</li>
          <li><strong className="text-zinc-200">Administrador (admin):</strong> invita miembros, cambia configuración y realiza todas las operaciones de cobro.</li>
          <li><strong className="text-zinc-200">Miembro (member):</strong> crea/edita clientes y facturas, envía recordatorios y registra pagos.</li>
          <li><strong className="text-zinc-200">Solo lectura (readonly):</strong> únicamente consulta datos; no puede editar.</li>
        </ul>
        <p>
          El propietario es responsable de las acciones realizadas por todos los miembros de su organización. Los miembros invitados deben mantener la confidencialidad de los datos de los clientes de la organización a la que pertenezcan y aceptan las presentes condiciones al aceptar la invitación.
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
          <li>Utilizar la función de WhatsApp para enviar mensajes masivos no autorizados o que vulneren los términos de uso de WhatsApp/Meta. La función abre tu propio WhatsApp con el texto pre-rellenado; el envío y la responsabilidad sobre el mensaje son tuyos.</li>
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
