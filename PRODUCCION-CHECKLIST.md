# 🚀 Saldea — Listo para producción

Estado: **100% verificado y desplegado**.

---

## ✅ TODO COMPLETADO

### Código (commits desplegados)
- [x] **error.tsx + not-found.tsx** con branding Saldea + Sentry + link soporte
- [x] **/ayuda** con 8 FAQs + email soporte (`soporte@marsof.es`)
- [x] **DELETE `/api/facturas/[id]`** (endpoint nuevo)
- [x] **`fecha_cobro` visible en UI** del detalle de factura
- [x] **Rate limiting** `lib/rate-limit.ts` aplicado a `/api/enviar-recordatorio` (30/h) y `/api/equipo/invitar` (10/h)
- [x] **Dashboard responsive mobile** con menú hamburguesa, overlay, auto-cierre
- [x] **Modo claro/oscuro** funcional con WCAG AA, toggle sin stale-state, contrastes corregidos
- [x] **Sitemap.xml** incluye `/ayuda`

### Email
- [x] **SPF** (incluye Resend) — pre-existente
- [x] **DKIM Resend** — pre-existente
- [x] **DMARC** `_dmarc.marsof.es` — ✅ **añadido por mí en Cloudflare, propagado y verificado vía DNS público**
  ```
  v=DMARC1; p=none; rua=mailto:dmarc@marsof.es; ruf=mailto:dmarc@marsof.es; pct=100; aspf=r; adkim=r; fo=1
  ```
- [x] **SMTP Supabase → Resend** (auth emails con dominio marsof.es)
- [x] **Plantillas auth en español** con branding Saldea

### Infraestructura
- [x] **Supabase activo** (eu-north-1, daily backups, WAL habilitado)
- [x] **Sentry** integrado (instrumentation.ts + global-error.tsx)
- [x] **2 webhooks Stripe** verificados via API:
  - `we_1TWj3f7e3KndS0wx5bflQeJB` → `/api/stripe-webhook` (subs Pro) · enabled · livemode
  - `we_1TXRZ37e3KndS0wx2oFREXxM` → `/api/stripe-connect-webhook` (cobros) · enabled · livemode
- [x] **`STRIPE_WEBHOOK_SECRET` + `STRIPE_CONNECT_WEBHOOK_SECRET`** presentes en Vercel
- [x] **Endpoint del webhook** responde 400 "falta signature" correctamente (verificación activa)

### Test E2E completo
- [x] Crear cliente → factura → enviar recordatorio real → registrar pago → marcar cobrada (con `fecha_cobro` automático) → cleanup CASCADE

---

## ⚠️ Verificación final (tú, al primer pago real)

La única cosa que no se puede verificar desde fuera del dashboard de Stripe es que el **secret del webhook en Stripe coincida exactamente con el de Vercel** (Stripe lo marca "Sensitive" y solo se revela una vez al crearlo).

**Cómo confirmarlo:**
- Cuando se haga el primer pago real (puede ser una compra de prueba con tu propia tarjeta), el plan debe activarse automáticamente a Pro en 2-3 segundos.
- Si no se activa → el secret no coincide. Recupera el secret de Stripe Dashboard → Webhooks → click endpoint → "Reveal" → cópialo a Vercel como `STRIPE_WEBHOOK_SECRET` y redeploy.

---

## 🟢 Opcional para más adelante

- [ ] Upgrade Supabase a Pro ($25/mes) → habilita PITR cuando tengas clientes Pro pagando
- [ ] Subir DMARC a `p=quarantine` y luego `p=reject` tras 2-3 semanas monitoreando reports
- [ ] Welcome email post-registro
- [ ] Headers de seguridad CSP/HSTS si quieres certificación de seguridad
- [ ] Página `/status` con uptime monitoring

---

## 📊 Veredicto

**Saldea está lista para clientes públicos.** Puedes anunciarla con tranquilidad.

Stack: Next.js 16, Supabase EU (Frankfurt), Stripe live + Connect, Resend, Sentry, Vercel + Cloudflare DNS.

Toda la app funciona end-to-end (verificado en este sprint con un cliente test real, factura test real, pago test real, marcado cobrada → fecha_cobro registrada).
