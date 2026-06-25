-- Tabla para registrar visitas a páginas públicas del marketing site
-- Solo se registran rutas públicas (/, /precios, /blog, etc.)
-- Las rutas de la app (/dashboard, /admin, etc.) se excluyen en el cliente

CREATE TABLE IF NOT EXISTS visitas_web (
  id          bigint        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ruta        text          NOT NULL,
  referrer    text,
  pais        text,          -- futuro: header CF-IPCountry
  created_at  timestamptz   NOT NULL DEFAULT now()
);

-- Índice para consultas por fecha (el widget del admin ordena/filtra por created_at)
CREATE INDEX IF NOT EXISTS visitas_web_created_at_idx ON visitas_web (created_at DESC);

-- Índice para agrupación por ruta (top páginas)
CREATE INDEX IF NOT EXISTS visitas_web_ruta_idx ON visitas_web (ruta);

-- RLS activado: ningún usuario autenticado puede leer ni escribir esta tabla.
-- Las escrituras se hacen exclusivamente con el service role desde la API route.
ALTER TABLE visitas_web ENABLE ROW LEVEL SECURITY;

-- Política de denegación explícita para cualquier rol anon/authenticated
-- (el service role siempre puede saltarse RLS)
CREATE POLICY "Sin acceso público" ON visitas_web FOR ALL USING (false);
