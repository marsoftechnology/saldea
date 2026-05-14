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
