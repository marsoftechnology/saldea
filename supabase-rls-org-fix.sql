-- ═══════════════════════════════════════════════════════════════════════════
-- RLS org-aware — ejecutar en Supabase → SQL Editor (idempotente)
--
-- Problema: las políticas originales usan `auth.uid() = user_id`.
-- Con la migración a multi-org esto significa que:
--   a) Los miembros de una org que no son el owner NO ven los datos del org.
--   b) Las nuevas facturas/clientes creadas con org_id tampoco quedan cubiertas.
--
-- Solución: sustituir las políticas antiguas por otras que permiten acceso a
-- cualquier miembro del org (vía org_members), manteniendo retrocompatibilidad
-- con registros pre-migración donde org_id aún puede ser NULL.
-- ═══════════════════════════════════════════════════════════════════════════


-- ── Función helper: ¿pertenece el usuario autenticado a este org? ────────────
-- Se marca STABLE + SECURITY DEFINER para que pueda usarse dentro de políticas RLS
-- sin revelar datos de otros usuarios.
CREATE OR REPLACE FUNCTION public.es_miembro_de_org(p_org_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM org_members
    WHERE org_id = p_org_id
      AND user_id = auth.uid()
  );
$$;


-- ── clientes ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "usuarios ven sus clientes" ON clientes;

CREATE POLICY "miembros ven clientes de su org" ON clientes
  FOR ALL
  USING (
    -- Registros con org_id: cualquier miembro del org puede verlos
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    -- Registros legacy sin org_id: solo el propietario original
    (org_id IS NULL AND user_id = auth.uid())
  )
  WITH CHECK (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  );


-- ── facturas ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "usuarios ven sus facturas" ON facturas;

CREATE POLICY "miembros ven facturas de su org" ON facturas
  FOR ALL
  USING (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  )
  WITH CHECK (
    (org_id IS NOT NULL AND public.es_miembro_de_org(org_id))
    OR
    (org_id IS NULL AND user_id = auth.uid())
  );


-- ── recordatorios (sin org_id propio; depende de facturas) ───────────────────
DROP POLICY IF EXISTS "usuarios ven sus recordatorios" ON recordatorios;

CREATE POLICY "miembros ven recordatorios de su org" ON recordatorios
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM facturas f
      WHERE f.id = recordatorios.factura_id
        AND (
          (f.org_id IS NOT NULL AND public.es_miembro_de_org(f.org_id))
          OR
          (f.org_id IS NULL AND f.user_id = auth.uid())
        )
    )
  );


-- ── logs_email (sin org_id propio; depende de facturas) ──────────────────────
DROP POLICY IF EXISTS "usuarios ven sus logs" ON logs_email;

CREATE POLICY "miembros ven logs de su org" ON logs_email
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM facturas f
      WHERE f.id = logs_email.factura_id
        AND (
          (f.org_id IS NOT NULL AND public.es_miembro_de_org(f.org_id))
          OR
          (f.org_id IS NULL AND f.user_id = auth.uid())
        )
    )
  );


-- ── respuestas_clientes ───────────────────────────────────────────────────────
-- Tiene factura_id → unimos a facturas para heredar el control de org
DROP POLICY IF EXISTS "usuarios ven sus respuestas" ON respuestas_clientes;

CREATE POLICY "miembros ven respuestas de su org" ON respuestas_clientes
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM facturas f
      WHERE f.id = respuestas_clientes.factura_id
        AND (
          (f.org_id IS NOT NULL AND public.es_miembro_de_org(f.org_id))
          OR
          (f.org_id IS NULL AND f.user_id = auth.uid())
        )
    )
  );


-- ── mensajes_whatsapp (ya tiene org_id; actualizamos por consistencia) ────────
DROP POLICY IF EXISTS "usuarios ven sus mensajes whatsapp" ON mensajes_whatsapp;

CREATE POLICY "miembros ven mensajes whatsapp de su org" ON mensajes_whatsapp
  FOR ALL
  USING (public.es_miembro_de_org(org_id));


-- ── push_subscriptions ───────────────────────────────────────────────────────
-- Verificamos si ya tiene política; si no, añadimos una org-aware.
-- (La tabla se creó después de la migración multi-org, así que org_id siempre está.)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'push_subscriptions'
      AND policyname LIKE 'miembros%'
  ) THEN
    ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
    EXECUTE $pol$
      CREATE POLICY "miembros gestionan push de su org" ON push_subscriptions
        FOR ALL
        USING (public.es_miembro_de_org(org_id))
        WITH CHECK (public.es_miembro_de_org(org_id));
    $pol$;
  END IF;
END;
$$;


-- ── Índices de soporte (mejoran el rendimiento de las políticas) ─────────────
CREATE INDEX IF NOT EXISTS idx_org_members_user_org
  ON org_members (user_id, org_id);

CREATE INDEX IF NOT EXISTS idx_facturas_org_id
  ON facturas (org_id);

CREATE INDEX IF NOT EXISTS idx_clientes_org_id
  ON clientes (org_id);
