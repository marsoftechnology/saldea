# Stripe Connect — Setup en producción

Para activar la integración de **Stripe Connect** (cobros automáticos por factura) en producción hay que hacer 3 cosas en orden:

## 1. Activar Connect en tu cuenta de Stripe

1. Entra a **https://dashboard.stripe.com/connect**
2. Click en **"Get started"** y elige tipo **"Standard"** (otros usuarios traen su propio Stripe vía OAuth)
3. Rellena el formulario de plataforma (nombre, sitio web, descripción del producto…)
4. Stripe te dará un **Client ID** del tipo `ca_xxxxxxxxxxxx` → cópialo

## 2. Configurar OAuth redirect URI

En la misma pantalla de **Connect → Settings → OAuth**:

- **Redirect URIs**: añadir `https://www.marsof.es/api/stripe-connect/callback`
- Guarda

## 3. Crear webhook para eventos de cuentas conectadas

En **Stripe Dashboard → Developers → Webhooks → Add endpoint**:

- **Endpoint URL**: `https://www.marsof.es/api/stripe-connect-webhook`
- **Listen to**: **"Events on Connected accounts"** (NO marcar "Account events"; ya tienes otro webhook para esos)
- **Events to send**: selecciona estos cuatro:
  - `checkout.session.completed`
  - `payment_intent.succeeded`
  - `account.updated`
  - `account.application.deauthorized`
- Click **Add endpoint**
- Stripe te dará un **Signing secret** del tipo `whsec_xxxx` → cópialo

## 4. Configurar variables de entorno en Vercel

En **Vercel → Project → Settings → Environment Variables**, añadir:

| Variable | Valor |
|---|---|
| `STRIPE_CONNECT_CLIENT_ID` | El `ca_xxxx` del paso 1 |
| `STRIPE_CONNECT_WEBHOOK_SECRET` | El `whsec_xxxx` del paso 3 |

Las ya existentes (`STRIPE_SECRET_KEY`, etc.) se reutilizan. **Redeploy** para que las lea.

## 5. Probar

1. Como usuario de Saldea, ve a **Ajustes** → sección "Cobros automáticos con Stripe"
2. Click en **"Conectar Stripe →"**
3. Se abre Stripe OAuth → autoriza con tu cuenta de prueba (modo test)
4. Vuelves a Saldea, ya estás conectado
5. Ve a una factura → click en **"⚡ Generar link de pago con Stripe automáticamente"**
6. El link queda guardado y aparece en los próximos recordatorios
7. Como cliente, paga el link con la tarjeta de prueba `4242 4242 4242 4242`
8. La factura se marca como **Cobrada** automáticamente (gracias al webhook)

## Cómo funciona — resumen técnico

```
Usuario Saldea ─OAuth Stripe─▶ guardamos stripe_connect_account_id
                              en configuraciones_usuario

Usuario crea factura ─click "Generar"─▶ POST /api/facturas/[id]/generar-link-pago
                                       crea Payment Link con stripeAccount header
                                       guarda link.url en facturas.link_pago

Cliente paga ─Stripe Checkout─▶ Stripe envía checkout.session.completed
                                a /api/stripe-connect-webhook con metadata.factura_id
                                marcamos factura como 'cobrada'
                                escribimos log para historial
```

El dinero llega **directamente a la cuenta bancaria del usuario** que conectó su Stripe; Saldea solo es facilitador, nunca toca el dinero.
