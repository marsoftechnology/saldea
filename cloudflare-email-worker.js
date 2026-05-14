// ============================================================
//  Saldea — Email Worker para Cloudflare Email Routing
// ============================================================
// Recibe emails entrantes a cualquier dirección @marsof.es y los
// envía al webhook de Saldea para clasificación con IA.
//
// Cómo desplegarlo:
// 1. En Cloudflare → tu sitio marsof.es → Email → Email Routing
// 2. Crea un Worker en "Email Workers" o usa la pestaña "Workers"
// 3. Pega este código
// 4. Variables (Settings > Variables):
//    - SECRET: e306299575fdd7f9203f76f62266c8d6c6d3e550d671c7bf4ed77f02ecbb65d1
//    - WEBHOOK_URL: https://marsof.es/api/email-inbound
// 5. En Email Routing > Routes, crea regla:
//    Catch-all addresses → Send to a Worker → este worker
// ============================================================

import PostalMime from 'postal-mime'

export default {
  async email(message, env, ctx) {
    try {
      // Leer el cuerpo crudo del email
      const raw = await new Response(message.raw).arrayBuffer()
      const parsed = await PostalMime.parse(raw)

      const payload = {
        from: parsed.from?.address ?? message.from,
        to: message.to,
        subject: parsed.subject ?? message.headers.get('subject') ?? '(sin asunto)',
        body: parsed.text || parsed.html || '',
        receivedAt: new Date().toISOString(),
      }

      const res = await fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-saldea-secret': env.SECRET,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        console.error('Webhook respondió no-OK:', res.status, await res.text())
      }
    } catch (e) {
      console.error('Error procesando email entrante:', e)
    }

    // (Opcional) Reenviar copia al email del dueño para que la lea humanamente
    // try { await message.forward('carlosgc90personal@gmail.com') } catch {}
  },
}
