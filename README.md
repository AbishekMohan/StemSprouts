# STEM Sprouts

The official website for STEM Sprouts, a youth-led nonprofit building a global network of student-run STEM chapters, powered by Pinboard, our open-source learning platform.

## Pages

- `/`: Home
- `/about`: Mission, vision, and team
- `/locations`: Chapter map and locations
- `/partner`: Sponsorship and partnership info
- `/pinboard`: Our open-source learning platform
- `/resources`: Curriculum and learning resources
- `/news`: News & research posts (includes the NSRI x STEM Sprouts Research Partnership updates)
- `/admin`: Login-gated post editor for `/news`

## Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Note this may vary

## Build

```bash
npm run build
npm run start
```

## News/admin setup (Supabase)

The `/news` blog and `/admin` editor are backed by Supabase, with a JWT cookie for admin auth.
Admin accounts (username + bcrypt password hash) live in the `admin_users` table, not an env var.

1. In the Supabase project's SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) to create the `posts` and `admin_users` tables.
2. Fill in `.env.local` (see `.env.local` for the placeholders already there):
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase dashboard > Project Settings > API > service_role secret. Server-only, never expose to the client.
   - `JWT_SECRET` — already generated; keep it secret and consistent across environments (dev + Vercel).
   - `ADMIN_SETUP_SECRET` — already generated; a one-time code only the site owner should know, required to claim the first admin account (see below). Keep it out of chat/Slack once you've used it — treat it like a password.
3. Set the same env vars in Vercel (Project Settings > Environment Variables) for production.
4. Visit `/admin/setup` and create the first admin account (you pick your own username/password) — you'll also need to enter `ADMIN_SETUP_SECRET` in the "Setup code" field to claim this slot. This is required *only* for the very first account, so that whoever finds the URL first can't take it over — after that, `/admin/setup` requires being logged in already, so use the "Add Admin" button on `/admin` to invite more people (no secret needed for them).
