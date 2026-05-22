-- ─── Tracking fecha real de cobro ──────────────────────────────────
-- Necesario para que "Aprender del histórico" calcule el retraso real
-- (antes usaba created_at de la factura, que no refleja cuándo se pagó).

ALTER TABLE facturas ADD COLUMN IF NOT EXISTS fecha_cobro timestamptz;

-- Backfill: para facturas ya cobradas, usar la fecha del último pago registrado.
UPDATE facturas f
SET fecha_cobro = sub.ultimo_pago
FROM (
  SELECT factura_id, MAX(COALESCE(fecha::timestamptz, created_at)) AS ultimo_pago
  FROM pagos
  GROUP BY factura_id
) sub
WHERE f.id = sub.factura_id
  AND f.estado = 'cobrada'
  AND f.fecha_cobro IS NULL;
