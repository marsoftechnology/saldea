-- Feature: Flags de respuestas en facturas (Detectar respuestas/disputas/vacaciones)
-- Ejecutar en Supabase SQL Editor

ALTER TABLE facturas
  ADD COLUMN IF NOT EXISTS disputa BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS pausar_recordatorios BOOLEAN NOT NULL DEFAULT FALSE;

-- Índice para filtrar facturas en disputa en el listado
CREATE INDEX IF NOT EXISTS idx_facturas_disputa ON facturas (org_id, disputa)
  WHERE disputa = TRUE;
