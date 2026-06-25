-- Migración WhatsApp para Saldea
-- Ejecutar en Supabase → SQL Editor

-- 1) Opt-in WhatsApp en clientes
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS whatsapp_opt_in_at TIMESTAMPTZ;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS whatsapp_opt_in_source TEXT; -- 'manual' | 'form'

-- 2) Add-on WhatsApp en organizations
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS addon_whatsapp_active BOOLEAN DEFAULT FALSE;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS addon_whatsapp_stripe_sub_id TEXT;

-- 3) Log de mensajes WhatsApp enviados
CREATE TABLE IF NOT EXISTS mensajes_whatsapp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factura_id UUID REFERENCES facturas(id) ON DELETE CASCADE,
  recordatorio_id UUID REFERENCES recordatorios(id) ON DELETE SET NULL,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  org_id UUID NOT NULL,
  user_id UUID,
  twilio_message_sid TEXT UNIQUE,
  to_number TEXT NOT NULL,
  cuerpo TEXT NOT NULL,
  tono TEXT CHECK (tono IN ('amigable','firme','formal','extremo')),
  estado TEXT DEFAULT 'enviado' CHECK (estado IN ('enviado','entregado','leido','fallido')),
  enviado_at TIMESTAMPTZ DEFAULT NOW(),
  entregado_at TIMESTAMPTZ,
  leido_at TIMESTAMPTZ,
  respondido_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para mensajes_whatsapp
ALTER TABLE mensajes_whatsapp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios ven sus mensajes whatsapp" ON mensajes_whatsapp
  FOR ALL USING (
    org_id IN (
      SELECT org_id FROM org_members WHERE user_id = auth.uid()
    )
  );

-- 4) Canal en respuestas_clientes (email o whatsapp)
ALTER TABLE respuestas_clientes ADD COLUMN IF NOT EXISTS canal TEXT DEFAULT 'email'
  CHECK (canal IN ('email', 'whatsapp'));
