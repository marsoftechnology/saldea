-- Columnas de integración Quipu en configuraciones_usuario
ALTER TABLE configuraciones_usuario
  ADD COLUMN IF NOT EXISTS quipu_api_token  text,
  ADD COLUMN IF NOT EXISTS quipu_last_sync  timestamptz;
