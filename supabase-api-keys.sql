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
