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
