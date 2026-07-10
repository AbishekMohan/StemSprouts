-- Run this in the Supabase project's SQL editor (Project > SQL Editor > New query)
-- to set up the table backing the news/research blog.

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'news' check (category in ('news', 'research')),
  author text not null default 'STEM Sprouts',
  published boolean not null default false,
  published_at timestamptz,
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
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

-- No policies: this table is only ever touched via the service_role key
-- from server-side API routes (never exposed to the anon/public client).

create table if not exists admin_invites (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  created_by text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

alter table admin_invites enable row level security;

-- No policies: only ever touched via the service_role key from server-side
-- API routes. The invite page looks up a row by its unguessable token, which
-- is the actual access control, not RLS.
