-- Añade stripe_customer_id para enlazar usuarios con Stripe.
-- Ejecutar una sola vez en Supabase → SQL Editor.
alter table configuraciones_usuario
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text;

-- Índice para búsquedas rápidas desde el webhook (que recibe customer_id de Stripe)
create index if not exists idx_configuraciones_stripe_customer
  on configuraciones_usuario (stripe_customer_id);
