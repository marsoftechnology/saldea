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
