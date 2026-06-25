
-- ===== supabase-schema.sql =====
-- Ejecuta este SQL en Supabase → SQL Editor

create table clientes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  nombre text not null,
  email text not null,
  telefono text,
  empresa text,
  created_at timestamptz default now()
);

create table facturas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  cliente_id uuid references clientes(id) on delete cascade not null,
  numero text not null,
  importe numeric(10,2) not null,
  fecha_vencimiento date not null,
  estado text not null default 'pendiente' check (estado in ('pendiente','vencida','cobrada','cancelada')),
  descripcion text,
  created_at timestamptz default now()
);

create table recordatorios (
  id uuid primary key default gen_random_uuid(),
  factura_id uuid references facturas(id) on delete cascade not null,
  dias_offset integer not null,
  tono text not null check (tono in ('amigable','firme','formal')),
  enviado boolean default false,
  enviado_at timestamptz,
  mensaje_preview text
);

create table logs_email (
  id uuid primary key default gen_random_uuid(),
  factura_id uuid references facturas(id) on delete cascade not null,
  cliente_id uuid references clientes(id) on delete cascade not null,
  asunto text not null,
  cuerpo text not null,
  enviado_at timestamptz default now(),
  estado text not null default 'enviado'
);

-- Seguridad: cada usuario solo ve sus propios datos
alter table clientes enable row level security;
alter table facturas enable row level security;
alter table recordatorios enable row level security;
alter table logs_email enable row level security;

create policy "usuarios ven sus clientes" on clientes for all using (auth.uid() = user_id);
create policy "usuarios ven sus facturas" on facturas for all using (auth.uid() = user_id);
create policy "usuarios ven sus recordatorios" on recordatorios for all
  using (exists (select 1 from facturas where id = recordatorios.factura_id and user_id = auth.uid()));
create policy "usuarios ven sus logs" on logs_email for all
  using (exists (select 1 from facturas where id = logs_email.factura_id and user_id = auth.uid()));


-- ===== supabase-configuracion.sql =====
-- Ejecuta este SQL en Supabase → SQL Editor (una sola vez)
-- Tabla con TODAS las opciones de configuración futuras de Saldea.
-- Iremos activando cada una en la UI conforme las vayamos implementando.

create table configuraciones_usuario (
  user_id uuid primary key references auth.users on delete cascade,

  -- Frecuencia de recordatorios
  max_recordatorios integer not null default 3 check (max_recordatorios between 1 and 10),
  patron_dias text not null default 'normal' check (patron_dias in ('agresivo','normal','suave','personalizado')),
  dias_personalizados integer[] not null default array[3,10,20],
  dias_gracia integer not null default 0 check (dias_gracia between 0 and 7),
  hora_envio integer not null default 9 check (hora_envio between 8 and 20),
  enviar_fin_semana boolean not null default false,
  max_emails_mes integer not null default 5 check (max_emails_mes between 1 and 10),

  -- Tono y mensajes
  tono_preset text not null default 'firme' check (tono_preset in ('cordial','firme','contundente','personalizado')),
  dureza_nivel integer not null default 5 check (dureza_nivel between 1 and 10),
  escalar_tono boolean not null default true,
  plantilla_amigable text,
  plantilla_firme text,
  plantilla_formal text,

  -- Imagen de marca
  logo_url text,
  firma text,
  color_primario text default '#059669',
  idioma text not null default 'es' check (idioma in ('es','ca','en','pt')),

  -- Comportamiento inteligente
  pausar_si_responde boolean not null default false,
  detectar_disputa boolean not null default false,
  ofrecer_pago_plazos_dia integer default 0,
  variar_textos boolean not null default false,
  evitar_festivos boolean not null default false,
  detectar_vacaciones_cliente boolean not null default false,

  -- Acciones de cobro avanzadas
  recargo_mora_activo boolean not null default false,
  recargo_mora_pct numeric(5,2) default 0,
  recargo_mora_dia integer default 30,
  descuento_pronto_pago_pct numeric(5,2) default 0,
  descuento_pronto_pago_dias integer default 7,

  -- Conciliación bancaria
  match_por_concepto boolean not null default true,
  match_por_nombre boolean not null default true,
  match_por_importe boolean not null default true,

  -- Avisos al usuario
  resumen_diario boolean not null default false,
  resumen_semanal boolean not null default true,
  alertas_push boolean not null default false,

  -- Modos especiales
  modo_vacaciones boolean not null default false,
  modo_vacaciones_hasta date,
  aprender_historial boolean not null default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table configuraciones_usuario enable row level security;

create policy "usuarios ven su configuracion" on configuraciones_usuario for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ===== supabase-respuestas-pausada.sql =====
-- Migración para soportar detección de respuestas + pausa por respuesta
-- Ejecutar en Supabase → SQL Editor

-- 1) Permitir pausar recordatorios de una factura hasta una fecha
alter table facturas add column pausada_hasta date;
alter table facturas add column notas_internas text;

-- 2) Tabla para guardar las respuestas que envían los clientes
create table respuestas_clientes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  factura_id uuid references facturas(id) on delete cascade,
  cliente_id uuid references clientes(id) on delete cascade,
  email_de text not null,
  asunto text not null,
  cuerpo text not null,
  categoria text not null check (categoria in ('pago_confirmado','disputa','vacaciones','pidiendo_plazos','otro')),
  confianza text not null check (confianza in ('alta','media','baja')),
  resumen text,
  enviado_a_usuario boolean default false,
  created_at timestamptz default now()
);

-- 3) RLS para que cada usuario vea solo sus respuestas
alter table respuestas_clientes enable row level security;

create policy "usuarios ven sus respuestas" on respuestas_clientes for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- ===== supabase-stripe-customer.sql =====
-- Añade stripe_customer_id para enlazar usuarios con Stripe.
-- Ejecutar una sola vez en Supabase → SQL Editor.
alter table configuraciones_usuario
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text;

-- Índice para búsquedas rápidas desde el webhook (que recibe customer_id de Stripe)
create index if not exists idx_configuraciones_stripe_customer
  on configuraciones_usuario (stripe_customer_id);


-- ===== MULTI-TENANT: organizations, org_members, org_invites + org_id columns =====

CREATE TABLE IF NOT EXISTS organizations (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                     TEXT NOT NULL,
  owner_id                 UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  onboarding_completado_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS org_members (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id     UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'readonly')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, user_id)
);

CREATE TABLE IF NOT EXISTS org_invites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('admin', 'member', 'readonly')),
  token       TEXT NOT NULL UNIQUE,
  invited_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helper function for RLS: SECURITY DEFINER bypasses RLS on org_members (avoids recursion).
-- supabase-rls-org-fix.sql will later CREATE OR REPLACE the same function (idempotent).
CREATE OR REPLACE FUNCTION public.es_miembro_de_org(p_org_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.org_members WHERE org_id = p_org_id AND user_id = auth.uid());
$$;

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_invites    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members see their orgs" ON organizations
  FOR ALL USING (public.es_miembro_de_org(id));

CREATE POLICY "members manage their org_members" ON org_members
  FOR ALL USING (public.es_miembro_de_org(org_id));

CREATE POLICY "members manage their invites" ON org_invites
  FOR ALL USING (public.es_miembro_de_org(org_id));

ALTER TABLE clientes              ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id) ON DELETE CASCADE;
ALTER TABLE facturas              ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id) ON DELETE CASCADE;
ALTER TABLE logs_email            ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id) ON DELETE CASCADE;
ALTER TABLE configuraciones_usuario ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_org_members_user_id      ON org_members (user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org_id       ON org_members (org_id);
CREATE INDEX IF NOT EXISTS idx_org_invites_token        ON org_invites (token);
CREATE INDEX IF NOT EXISTS idx_org_invites_org_id       ON org_invites (org_id);
CREATE INDEX IF NOT EXISTS idx_configuraciones_org_id   ON configuraciones_usuario (org_id);

-- Tabla pagos (aquí porque supabase-fecha-cobro.sql hace un backfill que la referencia)
CREATE TABLE IF NOT EXISTS pagos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factura_id  UUID NOT NULL REFERENCES facturas(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  org_id      UUID REFERENCES organizations(id) ON DELETE CASCADE,
  importe     NUMERIC(10,2) NOT NULL CHECK (importe > 0),
  fecha       DATE NOT NULL DEFAULT CURRENT_DATE,
  metodo      TEXT CHECK (metodo IN ('transferencia','tarjeta','efectivo','bizum','stripe','paypal','otro')),
  referencia  TEXT,
  notas       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "miembros gestionan pagos de su org" ON pagos
  FOR ALL USING (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  )
  WITH CHECK (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_pagos_factura_id ON pagos (factura_id);
CREATE INDEX IF NOT EXISTS idx_pagos_org_id ON pagos (org_id);


-- ===== supabase-plan-enforcement.sql =====
-- Ejecuta este SQL en Supabase → SQL Editor (una sola vez)
-- Añade el plan del usuario y los triggers que enforzan los límites del plan Free.

-- 1) Columna plan en configuraciones_usuario
alter table configuraciones_usuario
  add column if not exists plan text not null default 'free'
  check (plan in ('free', 'pro'));

-- Aseguramos que existe una fila por usuario nuevo automáticamente.
-- Si no existe, en Saldea se asume 'free' por defecto.
-- IMPORTANTE: search_path explícito + tabla schema-qualified + exception handler.
-- Sin esto el signup de Supabase devuelve "Database error saving new user".
create or replace function public.ensure_user_config()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  begin
    insert into public.configuraciones_usuario (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  exception when others then
    -- Nunca bloquear el signup si la inserción de config falla
    raise warning 'ensure_user_config fallo: %', SQLERRM;
  end;
  return new;
end;
$$;

drop trigger if exists trg_ensure_user_config on auth.users;
create trigger trg_ensure_user_config
  after insert on auth.users
  for each row execute function ensure_user_config();

-- 2) Función helper: devuelve el plan del usuario (o 'free' si no tiene fila)
create or replace function get_user_plan(uid uuid)
returns text
language sql
stable
security definer
as $$
  select coalesce(
    (select plan from configuraciones_usuario where user_id = uid),
    'free'
  );
$$;

-- 3) Trigger: bloquear crear factura si Free y ya tiene 3+ activas
create or replace function check_free_factura_limit()
returns trigger
language plpgsql
security definer
as $$
declare
  plan_actual text;
  activas_count integer;
begin
  plan_actual := get_user_plan(new.user_id);
  if plan_actual = 'free' then
    select count(*) into activas_count
    from facturas
    where user_id = new.user_id
      and estado in ('pendiente', 'vencida');
    if activas_count >= 3 then
      raise exception 'PLAN_LIMIT_FACTURAS'
        using hint = 'El plan Free permite máx. 3 facturas activas. Sube a Pro para ilimitadas.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_check_free_factura_limit on facturas;
create trigger trg_check_free_factura_limit
  before insert on facturas
  for each row execute function check_free_factura_limit();

-- 4) Trigger: bloquear crear cliente si Free y ya tiene 10+
create or replace function check_free_cliente_limit()
returns trigger
language plpgsql
security definer
as $$
declare
  plan_actual text;
  clientes_count integer;
begin
  plan_actual := get_user_plan(new.user_id);
  if plan_actual = 'free' then
    select count(*) into clientes_count
    from clientes
    where user_id = new.user_id;
    if clientes_count >= 10 then
      raise exception 'PLAN_LIMIT_CLIENTES'
        using hint = 'El plan Free permite máx. 10 clientes. Sube a Pro para ilimitados.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_check_free_cliente_limit on clientes;
create trigger trg_check_free_cliente_limit
  before insert on clientes
  for each row execute function check_free_cliente_limit();

-- 5) Crear fila de configuracion para usuarios YA existentes (backfill, idempotente)
insert into configuraciones_usuario (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- 6) Fix: ampliar constraint de plan para incluir 'max'
ALTER TABLE configuraciones_usuario DROP CONSTRAINT IF EXISTS configuraciones_usuario_plan_check;
ALTER TABLE configuraciones_usuario ADD CONSTRAINT configuraciones_usuario_plan_check CHECK (plan IN ('free', 'pro', 'max'));


-- ===== supabase-mejoras-cobro.sql =====
-- Ejecuta este SQL en Supabase → SQL Editor
-- Añade campos para: link de pago manual y PDF propio del usuario por factura.
-- Las notas internas (notas_internas) ya existen — solo se expone su UI.

alter table facturas
  add column if not exists link_pago text,
  add column if not exists pdf_propio_path text;

-- Bucket para PDFs subidos por el usuario (idempotente)
insert into storage.buckets (id, name, public)
values ('facturas-pdf', 'facturas-pdf', false)
on conflict (id) do nothing;

-- Política: el usuario solo opera sobre PDFs en su propia carpeta (user_id/...)
drop policy if exists "Users upload own factura pdf" on storage.objects;
create policy "Users upload own factura pdf" on storage.objects
  for insert with check (
    bucket_id = 'facturas-pdf'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users read own factura pdf" on storage.objects;
create policy "Users read own factura pdf" on storage.objects
  for select using (
    bucket_id = 'facturas-pdf'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users delete own factura pdf" on storage.objects;
create policy "Users delete own factura pdf" on storage.objects
  for delete using (
    bucket_id = 'facturas-pdf'
    and (storage.foldername(name))[1] = auth.uid()::text
  );


-- ===== supabase-holded.sql =====
-- ─── Integración Holded ────────────────────────────────────────────
-- Ejecutar en Supabase → SQL Editor

-- 1. Configuración por org: guardar la API key de Holded
ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS holded_api_key       text,
  ADD COLUMN IF NOT EXISTS holded_connected_at  timestamptz,
  ADD COLUMN IF NOT EXISTS holded_last_sync     timestamptz;

-- 2. Facturas: rastrear qué facturas vienen de Holded (evita duplicados)
ALTER TABLE facturas
  ADD COLUMN IF NOT EXISTS holded_id text;

CREATE UNIQUE INDEX IF NOT EXISTS facturas_holded_id_org_idx
  ON facturas (holded_id, org_id)
  WHERE holded_id IS NOT NULL;

-- 3. Clientes: rastrear qué clientes vienen de Holded
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS holded_id text;

CREATE UNIQUE INDEX IF NOT EXISTS clientes_holded_id_org_idx
  ON clientes (holded_id, org_id)
  WHERE holded_id IS NOT NULL;


-- ===== supabase-fecha-cobro.sql =====
-- ─── Tracking fecha real de cobro ──────────────────────────────────
-- Necesario para que "Aprender del histórico" calcule el retraso real
-- (antes usaba created_at de la factura, que no refleja cuándo se pagó).

ALTER TABLE facturas ADD COLUMN IF NOT EXISTS fecha_cobro timestamptz;

-- Backfill: para facturas ya cobradas, usar la fecha del último pago registrado.
UPDATE facturas f
SET fecha_cobro = sub.ultimo_pago
FROM (
  SELECT factura_id, MAX(COALESCE(fecha::timestamptz, created_at)) AS ultimo_pago
  FROM pagos
  GROUP BY factura_id
) sub
WHERE f.id = sub.factura_id
  AND f.estado = 'cobrada'
  AND f.fecha_cobro IS NULL;


-- ===== supabase-whatsapp.sql =====
-- Migración WhatsApp para Saldea
-- Ejecutar en Supabase → SQL Editor

-- 1) Opt-in WhatsApp en clientes
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS whatsapp_opt_in_at TIMESTAMPTZ;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS whatsapp_opt_in_source TEXT; -- 'manual' | 'form'

-- 2) Add-on WhatsApp en organizations
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS addon_whatsapp_active BOOLEAN DEFAULT FALSE;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS addon_whatsapp_stripe_sub_id TEXT;

-- 3) Log de mensajes WhatsApp enviados
CREATE TABLE IF NOT EXISTS mensajes_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factura_id UUID REFERENCES facturas(id) ON DELETE CASCADE,
  recordatorio_id UUID REFERENCES recordatorios(id) ON DELETE SET NULL,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  org_id UUID NOT NULL,
  user_id UUID,
  twilio_message_sid TEXT UNIQUE,
  to_number TEXT NOT NULL,
  cuerpo TEXT NOT NULL,
  tono TEXT CHECK (tono IN ('amigable','firme','formal','extremo')),
  estado TEXT DEFAULT 'enviado' CHECK (estado IN ('enviado','entregado','leido','fallido')),
  enviado_at TIMESTAMPTZ DEFAULT NOW(),
  entregado_at TIMESTAMPTZ,
  leido_at TIMESTAMPTZ,
  respondido_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para mensajes_whatsapp
ALTER TABLE mensajes_whatsapp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios ven sus mensajes whatsapp" ON mensajes_whatsapp
  FOR ALL USING (
    org_id IN (
      SELECT org_id FROM org_members WHERE user_id = auth.uid()
    )
  );

-- 4) Canal en respuestas_clientes (email o whatsapp)
ALTER TABLE respuestas_clientes ADD COLUMN IF NOT EXISTS canal TEXT DEFAULT 'email'
  CHECK (canal IN ('email', 'whatsapp'));


-- ===== supabase-via-judicial.sql =====
-- Feature: Vía Judicial al día X
-- Ejecutar en Supabase SQL Editor

-- 1. Columna de configuración en configuraciones_usuario
ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS dias_via_judicial INT NOT NULL DEFAULT 0;

-- 2. Flag en facturas
ALTER TABLE facturas
  ADD COLUMN IF NOT EXISTS via_judicial BOOLEAN NOT NULL DEFAULT FALSE;

-- Índice para el cron diario (busca vencidas sin marcar)
CREATE INDEX IF NOT EXISTS idx_facturas_via_judicial_cron
  ON facturas (org_id, estado, via_judicial, fecha_vencimiento)
  WHERE estado = 'vencida' AND via_judicial = FALSE;


-- ===== supabase-push-subscriptions.sql =====
-- Feature: Web Push Notifications
-- Ejecutar en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint    TEXT NOT NULL,
  p256dh      TEXT NOT NULL,
  auth        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (org_id, user_id, endpoint)
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios gestionan sus push subs"
  ON push_subscriptions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_push_subs_org ON push_subscriptions (org_id);


-- ===== supabase-flags-facturas.sql =====
-- Feature: Flags de respuestas en facturas (Detectar respuestas/disputas/vacaciones)
-- Ejecutar en Supabase SQL Editor

ALTER TABLE facturas
  ADD COLUMN IF NOT EXISTS disputa BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS pausar_recordatorios BOOLEAN NOT NULL DEFAULT FALSE;

-- Índice para filtrar facturas en disputa en el listado
CREATE INDEX IF NOT EXISTS idx_facturas_disputa ON facturas (org_id, disputa)
  WHERE disputa = TRUE;


-- ===== supabase-config-deteccion.sql =====
-- Feature: Flags de detección de respuestas en configuraciones_usuario
-- Ejecutar en Supabase SQL Editor

ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS pausar_si_responde BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS detectar_disputa BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS detectar_vacaciones_cliente BOOLEAN NOT NULL DEFAULT TRUE;


-- ===== supabase-api-keys.sql =====
create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  key_prefix text not null,          -- primeros 8 chars de la key (para identificar en UI)
  key_hash text not null unique,     -- SHA-256 de la key completa
  created_at timestamptz default now(),
  last_used_at timestamptz,
  active boolean not null default true
);
create index if not exists idx_api_keys_hash on api_keys(key_hash);
create index if not exists idx_api_keys_org on api_keys(org_id);
alter table api_keys enable row level security;
create policy "owners manage their keys" on api_keys for all
  using (org_id in (select org_id from org_members where user_id = auth.uid() and role = 'owner'))
  with check (org_id in (select org_id from org_members where user_id = auth.uid() and role = 'owner'));


-- ===== supabase-quipu.sql =====
-- Columnas de integración Quipu en configuraciones_usuario
ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS quipu_api_token  text,
  ADD COLUMN IF NOT EXISTS quipu_last_sync  timestamptz;


-- ===== supabase\migrations\20260524_onboarding.sql =====
-- Añadir columna onboarding_completado a configuraciones_usuario
-- DEFAULT true para que los usuarios existentes NO vean el wizard
-- Los nuevos usuarios (sin fila de config) son detectados por la ausencia de fila

ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS onboarding_completado boolean NOT NULL DEFAULT true;

-- Solo para pruebas: si quieres forzar el onboarding en tu cuenta, ejecuta:
-- UPDATE configuraciones_usuario SET onboarding_completado = false WHERE user_id = '<tu-user-id>';


-- ===== supabase-rls-org-fix.sql =====
-- ═══════════════════════════════════════════════════════════════════════════
-- RLS org-aware — ejecutar en Supabase → SQL Editor (idempotente)
--
-- Problema: las políticas originales usan `auth.uid() = user_id`.
-- Con la migración a multi-org esto significa que:
--   a) Los miembros de una org que no son el owner NO ven los datos del org.
--   b) Las nuevas facturas/clientes creadas con org_id tampoco quedan cubiertas.
--
-- Solución: sustituir las políticas antiguas por otras que permiten acceso a
-- cualquier miembro del org (vía org_members), manteniendo retrocompatibilidad
-- con registros pre-migración donde org_id aún puede ser NULL.
-- ═══════════════════════════════════════════════════════════════════════════


-- ── Función helper: ¿pertenece el usuario autenticado a este org? ────────────
-- Se marca STABLE + SECURITY DEFINER para que pueda usarse dentro de políticas RLS
-- sin revelar datos de otros usuarios.
CREATE OR REPLACE FUNCTION public.es_miembro_de_org(p_org_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = p_org_id
      AND user_id = auth.uid()
  );
$$;


-- ── clientes ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "usuarios ven sus clientes" ON clientes;

CREATE POLICY "miembros ven clientes de su org" ON clientes
  FOR ALL
  USING (
    -- Registros con org_id: cualquier miembro del org puede verlos
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    -- Registros legacy sin org_id: solo el propietario original
    (org_id IS NULL AND user_id = auth.uid())
  )
  WITH CHECK (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  );


-- ── facturas ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "usuarios ven sus facturas" ON facturas;

CREATE POLICY "miembros ven facturas de su org" ON facturas
  FOR ALL
  USING (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  )
  WITH CHECK (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  );


-- ── recordatorios (sin org_id propio; depende de facturas) ───────────────────
DROP POLICY IF EXISTS "usuarios ven sus recordatorios" ON recordatorios;

CREATE POLICY "miembros ven recordatorios de su org" ON recordatorios
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM facturas f
      WHERE f.id = recordatorios.factura_id
        AND (
          (f.org_id IS NOT NULL AND public.es_miembro_de_org(f.org_id))
          OR
          (f.org_id IS NULL AND f.user_id = auth.uid())
        )
    )
  );


-- ── logs_email (sin org_id propio; depende de facturas) ──────────────────────
DROP POLICY IF EXISTS "usuarios ven sus logs" ON logs_email;

CREATE POLICY "miembros ven logs de su org" ON logs_email
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM facturas f
      WHERE f.id = logs_email.factura_id
        AND (
          (f.org_id IS NOT NULL AND public.es_miembro_de_org(f.org_id))
          OR
          (f.org_id IS NULL AND f.user_id = auth.uid())
        )
    )
  );


-- ── respuestas_clientes ───────────────────────────────────────────────────────
-- Tiene factura_id → unimos a facturas para heredar el control de org
DROP POLICY IF EXISTS "usuarios ven sus respuestas" ON respuestas_clientes;

CREATE POLICY "miembros ven respuestas de su org" ON respuestas_clientes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM facturas f
      WHERE f.id = respuestas_clientes.factura_id
        AND (
          (f.org_id IS NOT NULL AND public.es_miembro_de_org(f.org_id))
          OR
          (f.org_id IS NULL AND f.user_id = auth.uid())
        )
    )
  );


-- ── mensajes_whatsapp (ya tiene org_id; actualizamos por consistencia) ────────
DROP POLICY IF EXISTS "usuarios ven sus mensajes whatsapp" ON mensajes_whatsapp;

CREATE POLICY "miembros ven mensajes whatsapp de su org" ON mensajes_whatsapp
  FOR ALL
  USING (public.es_miembro_de_org(org_id));


-- ── push_subscriptions ───────────────────────────────────────────────────────
-- Verificamos si ya tiene política; si no, añadimos una org-aware.
-- (La tabla se creó después de la migración multi-org, así que org_id siempre está.)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'push_subscriptions'
      AND policyname LIKE 'miembros%'
  ) THEN
    ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
    EXECUTE $pol$
      CREATE POLICY "miembros gestionan push de su org" ON push_subscriptions
        FOR ALL
        USING (public.es_miembro_de_org(org_id))
        WITH CHECK (public.es_miembro_de_org(org_id));
    $pol$;
  END IF;
END;
$$;


-- ── Índices de soporte (mejoran el rendimiento de las políticas) ─────────────
CREATE INDEX IF NOT EXISTS idx_org_members_user_org
  ON org_members (user_id, org_id);

CREATE INDEX IF NOT EXISTS idx_facturas_org_id
  ON facturas (org_id);

CREATE INDEX IF NOT EXISTS idx_clientes_org_id
  ON clientes (org_id);


-- ===== supabase-banco.sql =====
-- ═══════════════════════════════════════════════════════════════════════════
-- Conciliación bancaria — tablas y RLS
-- Ejecutar en Supabase → SQL Editor (idempotente)
-- ═══════════════════════════════════════════════════════════════════════════

-- ── banco_conexiones ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banco_conexiones (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id           uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  requisition_id   text NOT NULL UNIQUE,
  institution_id   text NOT NULL,
  institution_name text,
  institution_logo text,
  status           text NOT NULL DEFAULT 'pendiente',
  -- pendiente | activa | expirada | error | revocada
  account_ids      text[] DEFAULT '{}',
  last_sync_at     timestamptz,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

ALTER TABLE banco_conexiones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "miembros gestionan banco_conexiones" ON banco_conexiones;
CREATE POLICY "miembros gestionan banco_conexiones" ON banco_conexiones
  FOR ALL
  USING  (public.es_miembro_de_org(org_id))
  WITH CHECK (public.es_miembro_de_org(org_id));

-- ── banco_transacciones ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banco_transacciones (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id           uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  conexion_id      uuid NOT NULL REFERENCES banco_conexiones(id) ON DELETE CASCADE,
  account_id       text NOT NULL,
  transaction_id   text NOT NULL,
  -- GoCardless puede devolver IDs duplicados si no tiene transactionId nativo
  -- usamos account_id + transaction_id como clave única
  booking_date     date,
  amount           numeric(12,2) NOT NULL,
  currency         text NOT NULL DEFAULT 'EUR',
  creditor_name    text,
  debtor_name      text,
  remittance_info  text,
  factura_id       uuid REFERENCES facturas(id) ON DELETE SET NULL,
  conciliada       boolean NOT NULL DEFAULT false,
  ignorada         boolean NOT NULL DEFAULT false,
  raw              jsonb,
  created_at       timestamptz DEFAULT now(),
  UNIQUE (account_id, transaction_id)
);

ALTER TABLE banco_transacciones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "miembros gestionan banco_transacciones" ON banco_transacciones;
CREATE POLICY "miembros gestionan banco_transacciones" ON banco_transacciones
  FOR ALL
  USING  (public.es_miembro_de_org(org_id))
  WITH CHECK (public.es_miembro_de_org(org_id));

-- ── Índices ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_banco_conexiones_org  ON banco_conexiones (org_id);
CREATE INDEX IF NOT EXISTS idx_banco_tx_org          ON banco_transacciones (org_id);
CREATE INDEX IF NOT EXISTS idx_banco_tx_factura      ON banco_transacciones (factura_id) WHERE factura_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_banco_tx_no_conciliada ON banco_transacciones (org_id, conciliada) WHERE NOT conciliada AND NOT ignorada;

-- ── updated_at automático ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_banco_conexiones_updated_at ON banco_conexiones;
CREATE TRIGGER trg_banco_conexiones_updated_at
  BEFORE UPDATE ON banco_conexiones
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ===== supabase-visitas.sql =====
-- Tabla para registrar visitas a páginas públicas del marketing site
-- Solo se registran rutas públicas (/, /precios, /blog, etc.)
-- Las rutas de la app (/dashboard, /admin, etc.) se excluyen en el cliente

CREATE TABLE IF NOT EXISTS visitas_web (
  id          bigint        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ruta        text          NOT NULL,
  referrer    text,
  pais        text,          -- futuro: header CF-IPCountry
  created_at  timestamptz   NOT NULL DEFAULT now()
);

-- Índice para consultas por fecha (el widget del admin ordena/filtra por created_at)
CREATE INDEX IF NOT EXISTS visitas_web_created_at_idx ON visitas_web (created_at DESC);

-- Índice para agrupación por ruta (top páginas)
CREATE INDEX IF NOT EXISTS visitas_web_ruta_idx ON visitas_web (ruta);

-- RLS activado: ningún usuario autenticado puede leer ni escribir esta tabla.
-- Las escrituras se hacen exclusivamente con el service role desde la API route.
ALTER TABLE visitas_web ENABLE ROW LEVEL SECURITY;

-- Política de denegación explícita para cualquier rol anon/authenticated
-- (el service role siempre puede saltarse RLS)
CREATE POLICY "Sin acceso público" ON visitas_web FOR ALL USING (false);


-- ===== columnas configuraciones_usuario añadidas manualmente (no en ningún SQL file) =====
ALTER TABLE configuraciones_usuario ADD COLUMN IF NOT EXISTS plantilla_extremo TEXT;
ALTER TABLE configuraciones_usuario ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
ALTER TABLE configuraciones_usuario ADD COLUMN IF NOT EXISTS email_from_dominio TEXT;
ALTER TABLE configuraciones_usuario ADD COLUMN IF NOT EXISTS email_from_nombre TEXT;


-- ===== idioma por cliente =====
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS idioma TEXT CHECK (idioma IN ('es', 'ca', 'en', 'pt'));
