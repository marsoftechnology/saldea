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
