# 🚀 Saldea — Checklist pre-lanzamiento público

Estado: **listo para producción** salvo 2 acciones manuales que solo tú puedes hacer.

---

## ✅ COMPLETADO (no requiere acción tuya)

### Código
- [x] **error.tsx + not-found.tsx** — páginas de error y 404 con branding Saldea
- [x] **/ayuda** — centro de ayuda con FAQs + email soporte
- [x] **DELETE factura endpoint** (`/api/facturas/[id]`)
- [x] **fecha_cobro visible** en detalle de factura
- [x] **Rate limit** en `/api/enviar-recordatorio` (30/h por org) y `/api/equipo/invitar` (10/h)
- [x] **lib/rate-limit.ts** — limiter en memoria sin dependencias externas
- [x] **Modo claro/oscuro** funcional con buenos contrastes (3 fixes durante test E2E)
- [x] **Toggle modo claro doble-click** corregido (stale React state)
- [x] **Sitemap.xml** incluye `/ayuda`
- [x] **Sentry** ya integrado (instrumentation.ts + global-error.tsx)

### Email
- [x] **SPF** configurado en marsof.es (incluye Resend)
- [x] **DKIM (Resend)** configurado en `resend._domainkey.marsof.es`
- [x] **SMTP de Supabase** apunta a Resend → emails de auth (verificar, restablecer) llegan con dominio marsof.es
- [x] **Plantillas de auth en español** con branding Saldea

### Infraestructura
- [x] **Supabase activo y saludable** (eu-north-1, WAL habilitado, daily backups)
- [x] **Stripe webhook endpoint funciona** (responde 400 sin firma correctamente)
- [x] **Sesiones SSR** (middleware con cookies, fix de `/auth/callback`)

### Test E2E completo verificado
- [x] Crear cliente → factura → enviar recordatorio → registrar pago → marcar cobrada → cleanup CASCADE

---

## ⚠️ ACCIONES MANUALES PENDIENTES (~10 min en total)

### 1. Añadir DMARC al DNS (5 min) — **importante para entregabilidad de emails**

**Dónde:** panel DNS de tu proveedor de dominio (Cloudflare, Squarespace, etc.)

**Añadir un nuevo registro TXT:**

| Campo | Valor |
|---|---|
| **Type** | TXT |
| **Name / Host** | `_dmarc` |
| **TTL** | Auto (o 3600) |
| **Value** | `v=DMARC1; p=none; rua=mailto:dmarc@marsof.es; ruf=mailto:dmarc@marsof.es; pct=100; aspf=r; adkim=r; fo=1` |

**Por qué:** sin DMARC, los emails de Saldea (recordatorios + auth) pueden ir a SPAM en Gmail/Outlook. El `p=none` significa "solo monitorea, no rechaza" — seguro para empezar. Tras 2-3 semanas se puede subir a `p=quarantine` y luego `p=reject`.

**Verificar después:**
```
nslookup -type=TXT _dmarc.marsof.es 8.8.8.8
```
Debe devolver el record.

---

### 2. Verificar que el webhook de Stripe entrega bien (5 min)

**Donde:** [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)

**Pasos:**
1. Comprueba que existe un endpoint apuntando a `https://www.marsof.es/api/stripe-webhook`
2. Que los eventos suscritos incluyen:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. En la sección "Recent attempts" comprueba que los últimos eventos devuelven **200 OK**
4. Si ves 403/4xx → puede ser la DDoS Mitigation de Vercel. En ese caso, manda un test event desde Stripe y dime el resultado, lo arreglamos.

---

## 🟢 OPCIONAL (mejoras que NO bloquean lanzamiento)

- [ ] Upgrade Supabase a Pro ($25/mes) cuando tengas clientes pagando → habilita PITR (Point-in-Time Recovery)
- [ ] Verificar email `soporte@marsof.es` y `dmarc@marsof.es` están configurados en Zoho Mail (si quieres recibir reports)
- [ ] Subir a `p=quarantine` el DMARC tras 2-3 semanas de monitoreo
- [ ] Onboarding al primer login con tour guiado
- [ ] Headers de seguridad extra (CSP, HSTS, Permissions-Policy)

---

## 📊 Veredicto

**Saldea está 100% lista para clientes públicos** después de los 2 pasos manuales de arriba (10 min de tu tiempo).

Las protecciones automáticas anti-abuso están en producción (rate limiting, error boundaries, 404). El stack está sólido: Next.js 16, Supabase, Stripe Connect, Resend, Sentry, Vercel.
