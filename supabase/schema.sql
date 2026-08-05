-- ============================================================
-- Galería de la boda de Felipe & Victoria — esquema Supabase
-- Ejecuta TODO este archivo en: Supabase Dashboard -> SQL Editor -> New query
--
-- Si ya habías corrido una versión anterior de este archivo, no pasa
-- nada: los "if not exists" hacen que sea seguro volver a correrlo.
-- ============================================================

-- 1) Tabla donde se guardan los metadatos de cada foto/video
create table if not exists public.wedding_uploads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  caption text,
  media_type text not null check (media_type in ('image', 'video')),
  file_path text not null,
  media_url text not null,
  created_at timestamptz not null default now()
);

-- 1.1) Columnas para filtros de la galería:
--   - category: la elige el propio invitado al subir ('before' | 'day').
--     Los registros creados antes de esta columna quedan en null,
--     y solo aparecen en el filtro "Todos los momentos".
--   - is_favorite: NO la elige el invitado — la pareja marca sus fotos
--     favoritas manualmente desde Table Editor en Supabase.
alter table public.wedding_uploads
  add column if not exists category text check (category in ('before', 'day'));

alter table public.wedding_uploads
  add column if not exists is_favorite boolean not null default false;

-- Habilita Row Level Security (obligatorio en Supabase)
alter table public.wedding_uploads enable row level security;

-- Cualquiera puede LEER (para que la galería sea pública)
drop policy if exists "Cualquiera puede ver la galería" on public.wedding_uploads;
create policy "Cualquiera puede ver la galería"
  on public.wedding_uploads
  for select
  to anon
  using (true);

-- Cualquiera puede INSERTAR (para subir sin necesidad de cuenta)
drop policy if exists "Cualquiera puede subir su recuerdo" on public.wedding_uploads;
create policy "Cualquiera puede subir su recuerdo"
  on public.wedding_uploads
  for insert
  to anon
  with check (true);

-- Habilita la actualización en tiempo real para esta tabla
-- (si ya estaba agregada, este bloque la ignora sin error)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'wedding_uploads'
  ) then
    alter publication supabase_realtime add table public.wedding_uploads;
  end if;
end $$;


-- 2) Bucket de Storage donde se guardan los archivos reales
insert into storage.buckets (id, name, public, file_size_limit)
values ('wedding-media', 'wedding-media', true, 52428800) -- 50MB límite duro del bucket
on conflict (id) do nothing;

-- Cualquiera puede LEER los archivos del bucket (para que se vean las fotos/videos)
drop policy if exists "Lectura pública del bucket wedding-media" on storage.objects;
create policy "Lectura pública del bucket wedding-media"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'wedding-media');

-- Cualquiera puede SUBIR archivos al bucket (sin necesidad de cuenta)
drop policy if exists "Subida pública al bucket wedding-media" on storage.objects;
create policy "Subida pública al bucket wedding-media"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'wedding-media');

-- Solo un admin autenticado puede borrar/moderar archivos del bucket
drop policy if exists "Admin borra del bucket wedding-media" on storage.objects;
create policy "Admin borra del bucket wedding-media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'wedding-media');

-- Solo un admin autenticado puede borrar registros de la galería
drop policy if exists "Admin borra de wedding_uploads" on public.wedding_uploads;
create policy "Admin borra de wedding_uploads"
  on public.wedding_uploads
  for delete
  to authenticated
  using (true);


-- ============================================================
-- 3) RSVP — confirmación de asistencia + solicitud de acompañante (+1)
-- ============================================================
create table if not exists public.wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  attending boolean not null,
  -- El invitado sólo SOLICITA traer acompañante; la aprobación es manual.
  plus_one_requested boolean not null default false,
  plus_one_name text,
  -- pending | approved | rejected. Solo aplica si plus_one_requested = true.
  plus_one_status text not null default 'pending'
    check (plus_one_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.wedding_rsvps enable row level security;

-- Cualquiera puede CONFIRMAR su asistencia (sin necesidad de cuenta)
drop policy if exists "Cualquiera puede confirmar asistencia" on public.wedding_rsvps;
create policy "Cualquiera puede confirmar asistencia"
  on public.wedding_rsvps
  for insert
  to anon
  with check (
    -- Un invitado nunca puede insertarse ya con el +1 aprobado:
    -- la aprobación solo la puede hacer el admin autenticado.
    plus_one_status = 'pending'
  );

-- Solo el admin autenticado puede VER la lista de invitados/RSVPs
drop policy if exists "Admin lee wedding_rsvps" on public.wedding_rsvps;
create policy "Admin lee wedding_rsvps"
  on public.wedding_rsvps
  for select
  to authenticated
  using (true);

-- Solo el admin autenticado puede aprobar/rechazar el +1 (UPDATE)
drop policy if exists "Admin actualiza wedding_rsvps" on public.wedding_rsvps;
create policy "Admin actualiza wedding_rsvps"
  on public.wedding_rsvps
  for update
  to authenticated
  using (true)
  with check (true);

-- Solo el admin autenticado puede borrar un RSVP
drop policy if exists "Admin borra wedding_rsvps" on public.wedding_rsvps;
create policy "Admin borra wedding_rsvps"
  on public.wedding_rsvps
  for delete
  to authenticated
  using (true);

-- Realtime para que el panel admin vea las confirmaciones al instante
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'wedding_rsvps'
  ) then
    alter publication supabase_realtime add table public.wedding_rsvps;
  end if;
end $$;

-- ============================================================
-- 4) Panel de administrador
-- ============================================================
-- Este proyecto usa Supabase Auth (email + password) para proteger
-- /admin. Para crear tu usuario admin:
--   1. Ve a tu proyecto en supabase.com -> Authentication -> Users.
--   2. Click "Add user" -> "Create new user".
--   3. Ingresa tu email y una contraseña. Marca "Auto Confirm User".
--   4. Ese email/contraseña es lo que usarás para entrar en /admin.
-- No necesitas crear ninguna tabla adicional para esto: las policies
-- de arriba (to authenticated) ya usan ese login automáticamente.
