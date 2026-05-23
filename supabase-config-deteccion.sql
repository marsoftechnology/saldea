-- Feature: Flags de detección de respuestas en configuraciones_usuario
-- Ejecutar en Supabase SQL Editor

ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS pausar_si_responde BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS detectar_disputa BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS detectar_vacaciones_cliente BOOLEAN NOT NULL DEFAULT TRUE;
