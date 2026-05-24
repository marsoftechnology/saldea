-- Añadir columna onboarding_completado a configuraciones_usuario
-- DEFAULT true para que los usuarios existentes NO vean el wizard
-- Los nuevos usuarios (sin fila de config) son detectados por la ausencia de fila

ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS onboarding_completado boolean NOT NULL DEFAULT true;

-- Solo para pruebas: si quieres forzar el onboarding en tu cuenta, ejecuta:
-- UPDATE configuraciones_usuario SET onboarding_completado = false WHERE user_id = '<tu-user-id>';
