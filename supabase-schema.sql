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
