import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad · Saldea by Marsof Technology',
  description: 'Política de Privacidad de Saldea: qué datos recogemos, para qué, con quién los compartimos y cómo ejercer tus derechos RGPD.',
}

export default function PrivacidadPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Política de Privacidad</h1>
      <p className="text-zinc-500 text-sm">Última actualización: 15 de mayo de 2026</p>

      <section className="mt-10 space-y-5 text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white mt-10 mb-3">1. Responsable del tratamiento</h2>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Titular:</strong> Carlos Gálvez Carrillo</li>
          <li><strong className="text-zinc-200">NIF:</strong> 49080222Q</li>
          <li><strong className="text-zinc-200">Domicilio:</strong> Calle Museo 4, 21840 Niebla (Huelva), España</li>
          <li><strong className="text-zinc-200">Email:</strong> info@marsof.es</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">2. Datos que tratamos</h2>
        <p>
          En Saldea tratamos dos tipos de datos personales claramente diferenciados:
        </p>
        <h3 className="text-lg font-semibold text-white mt-5 mb-2">2.1. Datos de tu cuenta (eres el interesado)</h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li>Email de registro (obligatorio).</li>
          <li>Contraseña (almacenada cifrada con bcrypt por Supabase Auth, nunca legible).</li>
          <li>Nombre y, opcionalmente, nombre de tu empresa u organización.</li>
          <li>Datos de uso (facturas creadas, configuración, fechas de inicio de sesión).</li>
          <li>Datos de facturación de la suscripción (procesados por Stripe; nosotros solo guardamos el ID de cliente).</li>
          <li><strong className="text-zinc-200">Si conectas tu Stripe vía Stripe Connect</strong>: ID de tu cuenta de Stripe (account_id), país, estado de habilitación de cobros y fecha de conexión. No almacenamos ni accedemos a tus credenciales ni a tu saldo.</li>
          <li><strong className="text-zinc-200">Si invitas miembros a tu organización</strong>: email del invitado, rol asignado, fecha de invitación y aceptación.</li>
        </ul>
        <h3 className="text-lg font-semibold text-white mt-5 mb-2">2.2. Datos de tus clientes (tú eres el responsable, nosotros encargados)</h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li>Nombre, email, empresa y teléfono de los clientes que tú añades.</li>
          <li>Datos de las facturas que tú emites (número, importe, fecha, descripción).</li>
          <li>Pagos registrados (importe, fecha, método, referencia y notas).</li>
          <li>PDFs de factura que subas al sistema (almacenados en Supabase Storage con acceso restringido a tu organización).</li>
          <li>Contenido de los recordatorios enviados (email y, si lo accionas manualmente, plantillas para WhatsApp) y las respuestas recibidas.</li>
          <li>Notas internas asociadas a clientes o facturas (visibles solo para los miembros de tu organización).</li>
        </ul>
        <p>
          Sobre los datos del punto 2.2 actúas como <strong className="text-zinc-100">Responsable del Tratamiento</strong> conforme al RGPD; Saldea actúa como <strong className="text-zinc-100">Encargado del Tratamiento</strong>, tratándolos exclusivamente para prestar el servicio según tus instrucciones. Si tu organización tiene varios miembros, todos ellos acceden a estos datos en virtud de la autorización que tú, como titular, les otorgas al invitarles.
        </p>
        <h3 className="text-lg font-semibold text-white mt-5 mb-2">2.3. Datos de pago de los deudores (Stripe Connect)</h3>
        <p>
          Cuando un cliente paga una factura a través del botón &quot;Pagar ahora&quot; (Stripe Payment Link generado con tu cuenta de Stripe Connect), los datos de tarjeta los recoge y procesa directamente <strong className="text-zinc-100">Stripe</strong> en tu cuenta — Saldea <strong className="text-zinc-100">nunca</strong> ve, almacena ni transmite datos bancarios. Saldea solo recibe a través del webhook de Stripe la confirmación del pago (importe, fecha, ID del payment_intent) para marcar la factura como cobrada automáticamente.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">3. Finalidad y base jurídica</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="text-left py-2 pr-4">Finalidad</th>
              <th className="text-left py-2">Base jurídica</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            <tr className="border-b border-white/5">
              <td className="py-2 pr-4">Crear y gestionar tu cuenta</td>
              <td className="py-2">Ejecución de contrato (art. 6.1.b RGPD)</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 pr-4">Prestación del servicio Saldea</td>
              <td className="py-2">Ejecución de contrato</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 pr-4">Gestión de pagos vía Stripe</td>
              <td className="py-2">Ejecución de contrato</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 pr-4">Envío de emails transaccionales (alertas, resúmenes)</td>
              <td className="py-2">Interés legítimo</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2 pr-4">Cumplimiento de obligaciones legales (fiscal, contable)</td>
              <td className="py-2">Obligación legal (art. 6.1.c)</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Mejora del servicio y soporte</td>
              <td className="py-2">Interés legítimo</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">4. Conservación de los datos</h2>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Datos de cuenta activa:</strong> mientras mantengas tu cuenta.</li>
          <li><strong className="text-zinc-200">Tras cancelar tu cuenta:</strong> se eliminan en un máximo de 30 días, salvo datos requeridos por ley.</li>
          <li><strong className="text-zinc-200">Datos fiscales y contables:</strong> conservados durante el plazo legal (mínimo 4 años en España).</li>
          <li><strong className="text-zinc-200">Logs técnicos:</strong> hasta 90 días.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">5. Destinatarios (encargados del tratamiento)</h2>
        <p>
          Para prestar el servicio compartimos algunos datos con los siguientes proveedores. Todos cuentan con garantías adecuadas (DPA firmado y, cuando aplica, cláusulas contractuales tipo de la UE):
        </p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Supabase</strong> (Supabase Inc., USA · servidores en UE) — base de datos, autenticación y almacenamiento de PDFs.</li>
          <li><strong className="text-zinc-200">Vercel</strong> (Vercel Inc., USA + CDN global) — hosting y servidores de aplicación.</li>
          <li><strong className="text-zinc-200">Stripe</strong> (Stripe Payments Europe, Ltd., Irlanda) — procesamiento de la suscripción a Saldea Pro y, mediante Stripe Connect, procesamiento de los cobros de tus facturas a tus clientes.</li>
          <li><strong className="text-zinc-200">Resend</strong> (Resend Inc., USA · servidores en UE) — envío de emails (recordatorios a tus clientes, invitaciones a miembros, resúmenes a ti).</li>
          <li><strong className="text-zinc-200">Cloudflare</strong> (Cloudflare Inc., USA) — DNS, email routing y seguridad.</li>
          <li><strong className="text-zinc-200">Anthropic</strong> (Anthropic PBC, USA) — proveedor de la IA Claude que genera los recordatorios. <strong className="text-zinc-100">Los datos enviados a Anthropic no se utilizan para entrenar modelos.</strong> Le pasamos: nombre/empresa del cliente, número e importe de factura y días de vencimiento. No le enviamos tu base de datos completa ni datos bancarios.</li>
        </ul>
        <p>
          <strong className="text-zinc-200">WhatsApp.</strong> Saldea no envía mensajes a WhatsApp directamente. La función de WhatsApp genera un enlace <code className="text-xs">wa.me</code> con el texto pre-rellenado para que tú, manualmente, abras tu propia cuenta de WhatsApp y lo envíes. Saldea no transmite datos a Meta/WhatsApp.
        </p>
        <p>
          No vendemos, alquilamos ni cedemos tus datos a terceros con fines comerciales.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">6. Transferencias internacionales</h2>
        <p>
          Algunos de los proveedores indicados están establecidos en Estados Unidos. Las transferencias se realizan al amparo de las <strong className="text-zinc-100">Cláusulas Contractuales Tipo</strong> aprobadas por la Comisión Europea (Decisión 2021/914) y, en su caso, el <strong className="text-zinc-100">EU-US Data Privacy Framework</strong>, garantizando un nivel de protección equivalente al europeo.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">7. Tus derechos</h2>
        <p>
          Como interesado puedes ejercer en cualquier momento los siguientes derechos, conforme a los arts. 15-22 del RGPD:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li><strong className="text-zinc-200">Acceso</strong> a los datos personales que tratamos.</li>
          <li><strong className="text-zinc-200">Rectificación</strong> de datos inexactos.</li>
          <li><strong className="text-zinc-200">Supresión</strong> (&quot;derecho al olvido&quot;).</li>
          <li><strong className="text-zinc-200">Limitación</strong> del tratamiento.</li>
          <li><strong className="text-zinc-200">Portabilidad</strong> (recibir tus datos en formato estructurado).</li>
          <li><strong className="text-zinc-200">Oposición</strong> al tratamiento basado en interés legítimo.</li>
          <li><strong className="text-zinc-200">Retirar el consentimiento</strong> cuando este sea la base jurídica.</li>
        </ul>
        <p>
          Para ejercer cualquiera de ellos, escribe a <a href="mailto:info@marsof.es" className="text-sky-400 hover:text-sky-300 underline">info@marsof.es</a>. Responderemos en un máximo de 1 mes.
        </p>
        <p>
          Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la <strong className="text-zinc-100">Agencia Española de Protección de Datos</strong> (<a href="https://www.aepd.es" className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer">aepd.es</a>).
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">8. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas adecuadas para garantizar la seguridad de tus datos:
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
          <li>Cifrado en tránsito (HTTPS/TLS) y en reposo de la base de datos.</li>
          <li>Contraseñas hasheadas con bcrypt, autenticación gestionada por Supabase Auth.</li>
          <li>Separación estricta entre datos de cada organización mediante <strong className="text-zinc-100">Row Level Security</strong> a nivel de PostgreSQL.</li>
          <li>PDFs de facturas almacenados con políticas RLS que limitan el acceso a los miembros de cada organización.</li>
          <li>Webhooks de Stripe firmados con HMAC; rechazamos cualquier evento sin firma válida.</li>
          <li>Tokens de invitación generados con <code className="text-xs">crypto.randomBytes(24)</code> y caducidad de 7 días.</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">9. Menores</h2>
        <p>
          Saldea no está dirigido a menores de 18 años y no tratamos a sabiendas datos de menores. Si detectas que un menor ha creado una cuenta, contacta con nosotros para proceder a su eliminación.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">10. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política puntualmente. Los cambios entrarán en vigor desde su publicación. Si los cambios son sustanciales, te lo notificaremos por email con al menos 15 días de antelación.
        </p>

        <h2 className="text-xl font-bold text-white mt-10 mb-3">11. Contacto</h2>
        <p>
          Para cualquier consulta sobre tus datos personales puedes escribir a: <a href="mailto:info@marsof.es" className="text-sky-400 hover:text-sky-300 underline">info@marsof.es</a>
        </p>
      </section>
    </article>
  )
}
