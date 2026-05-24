-- ═══════════════════════════════════════════════════════════════════════════
-- Conciliación bancaria — tablas y RLS
-- Ejecutar en Supabase → SQL Editor (idempotente)
-- ═══════════════════════════════════════════════════════════════════════════

-- ── banco_conexiones ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banco_conexiones (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id           uuid NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  requisition_id   text NOT NULL UNIQUE,
  institution_id   text NOT NULL,
  institution_name text,
  institution_logo text,
  status           text NOT NULL DEFAULT 'pendiente',
  -- pendiente | activa | expirada | error | revocada
  account_ids      text[] DEFAULT '{}',
  last_sync_at     timestamptz,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

ALTER TABLE banco_conexiones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "miembros gestionan banco_conexiones" ON banco_conexiones;
CREATE POLICY "miembros gestionan banco_conexiones" ON banco_conexiones
  FOR ALL
  USING  (public.es_miembro_de_org(org_id))
  WITH CHECK (public.es_miembro_de_org(org_id));

-- ── banco_transacciones ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banco_transacciones (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id           uuid NOT NULL REFERENCES orgs(id) ON DELETE CASCADE,
  conexion_id      uuid NOT NULL REFERENCES banco_conexiones(id) ON DELETE CASCADE,
  account_id       text NOT NULL,
  transaction_id   text NOT NULL,
  -- GoCardless puede devolver IDs duplicados si no tiene transactionId nativo
  -- usamos account_id + transaction_id como clave única
  booking_date     date,
  amount           numeric(12,2) NOT NULL,
  currency         text NOT NULL DEFAULT 'EUR',
  creditor_name    text,
  debtor_name      text,
  remittance_info  text,
  factura_id       uuid REFERENCES facturas(id) ON DELETE SET NULL,
  conciliada       boolean NOT NULL DEFAULT false,
  ignorada         boolean NOT NULL DEFAULT false,
  raw              jsonb,
  created_at       timestamptz DEFAULT now(),
  UNIQUE (account_id, transaction_id)
);

ALTER TABLE banco_transacciones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "miembros gestionan banco_transacciones" ON banco_transacciones;
CREATE POLICY "miembros gestionan banco_transacciones" ON banco_transacciones
  FOR ALL
  USING  (public.es_miembro_de_org(org_id))
  WITH CHECK (public.es_miembro_de_org(org_id));

-- ── Índices ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_banco_conexiones_org  ON banco_conexiones (org_id);
CREATE INDEX IF NOT EXISTS idx_banco_tx_org          ON banco_transacciones (org_id);
CREATE INDEX IF NOT EXISTS idx_banco_tx_factura      ON banco_transacciones (factura_id) WHERE factura_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_banco_tx_no_conciliada ON banco_transacciones (org_id, conciliada) WHERE NOT conciliada AND NOT ignorada;

-- ── updated_at automático ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_banco_conexiones_updated_at ON banco_conexiones;
CREATE TRIGGER trg_banco_conexiones_updated_at
  BEFORE UPDATE ON banco_conexiones
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
