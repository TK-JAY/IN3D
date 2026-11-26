-- Run in your own Supabase SQL editor. Each snapshot belongs to one user.
begin;
create table if not exists public.jayit_snapshots (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 label text not null check (char_length(label) between 1 and 100),
 payload jsonb not null check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 4000000)
);
create index if not exists jayit_snapshots_owner_date on public.jayit_snapshots(user_id,created_at desc);
alter table public.jayit_snapshots enable row level security;
revoke all on public.jayit_snapshots from anon, authenticated;
grant select, insert, delete on public.jayit_snapshots to authenticated;
drop policy if exists jayit_read_own on public.jayit_snapshots;
create policy jayit_read_own on public.jayit_snapshots for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists jayit_insert_own on public.jayit_snapshots;
create policy jayit_insert_own on public.jayit_snapshots for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists jayit_delete_own on public.jayit_snapshots;
create policy jayit_delete_own on public.jayit_snapshots for delete to authenticated using ((select auth.uid())=user_id);
commit;
