-- Ejecuta este SQL en Supabase → SQL Editor
-- Añade campos para: link de pago manual y PDF propio del usuario por factura.
-- Las notas internas (notas_internas) ya existen — solo se expone su UI.

alter table facturas
  add column if not exists link_pago text,
  add column if not exists pdf_propio_path text;

-- Bucket para PDFs subidos por el usuario (idempotente)
insert into storage.buckets (id, name, public)
values ('facturas-pdf', 'facturas-pdf', false)
on conflict (id) do nothing;

-- Política: el usuario solo opera sobre PDFs en su propia carpeta (user_id/...)
drop policy if exists "Users upload own factura pdf" on storage.objects;
create policy "Users upload own factura pdf" on storage.objects
  for insert with check (
    bucket_id = 'facturas-pdf'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users read own factura pdf" on storage.objects;
create policy "Users read own factura pdf" on storage.objects
  for select using (
    bucket_id = 'facturas-pdf'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users delete own factura pdf" on storage.objects;
create policy "Users delete own factura pdf" on storage.objects
  for delete using (
    bucket_id = 'facturas-pdf'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
