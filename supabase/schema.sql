-- Run this in the Supabase project's SQL editor (Project > SQL Editor > New query)
-- to set up the table backing the news/research blog.
--
-- This file is safe to run against a brand-new database. If you already have
-- these tables (e.g. the existing STEM Sprouts project), skip to the
-- "MIGRATION FOR EXISTING DATABASES" section at the bottom instead -- running
-- the CREATE TABLE / CREATE POLICY statements above it again will error since
-- they already exist.

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'news' check (char_length(trim(category)) > 0),
  image_url text,
  author text not null default 'STEM Sprouts',
  -- `published` mirrors `status = 'published'` and is what public-facing
  -- queries filter on (kept simple/unchanged). `status` is the source of
  -- truth the admin UI and review workflow use.
  published boolean not null default false,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'pending', 'published')),
  created_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_at_idx on posts (published_at desc);

alter table posts enable row level security;

-- Anyone (anon key) can read published posts only.
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- All writes go through the service_role key from the admin API routes,
-- which bypasses RLS entirely, so no insert/update/delete policy is needed here.

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  -- main_admin: full access -- publish directly, review others' posts,
  -- invite/remove admins. chapter_lead: can write posts, but they land as
  -- "pending" and need a main_admin to approve before going live.
  role text not null default 'chapter_lead' check (role in ('main_admin', 'chapter_lead')),
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

-- No policies: this table is only ever touched via the service_role key
-- from server-side API routes (never exposed to the anon/public client).

create table if not exists admin_invites (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  created_by text not null,
  role text not null default 'chapter_lead' check (role in ('main_admin', 'chapter_lead')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

alter table admin_invites enable row level security;

-- No policies: only ever touched via the service_role key from server-side
-- API routes. The invite page looks up a row by its unguessable token, which
-- is the actual access control, not RLS.


-- ============================================================
-- MIGRATION FOR EXISTING DATABASES
-- Run this block against the already-deployed STEM Sprouts project. It's
-- written to be safe to run more than once -- each ALTER only fires the
-- first time, and the one-time backfills only run inside that same check.
-- ============================================================

do $$
begin
  if not exists (
    select 1 from information_schema.columns where table_name = 'admin_users' and column_name = 'role'
  ) then
    alter table admin_users
      add column role text not null default 'chapter_lead' check (role in ('main_admin', 'chapter_lead'));

    -- Everyone who already had admin credentials before roles existed was
    -- trusted with full access, so grandfather them all in as main_admin.
    update admin_users set role = 'main_admin';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from information_schema.columns where table_name = 'admin_invites' and column_name = 'role'
  ) then
    alter table admin_invites
      add column role text not null default 'chapter_lead' check (role in ('main_admin', 'chapter_lead'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from information_schema.columns where table_name = 'posts' and column_name = 'status'
  ) then
    alter table posts
      add column status text not null default 'draft' check (status in ('draft', 'pending', 'published'));

    -- Preserve whatever was already live.
    update posts set status = 'published' where published = true;
  end if;
end $$;

alter table posts add column if not exists created_by uuid references admin_users(id) on delete set null;
