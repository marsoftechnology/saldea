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
