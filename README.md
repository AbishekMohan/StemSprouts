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

1. In the Supabase project's SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) to create the `posts`, `admin_users`, and `admin_invites` tables.
2. Fill in `.env.local` (see `.env.local` for the placeholders already there):
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase dashboard > Project Settings > API > service_role secret. Server-only, never expose to the client.
   - `JWT_SECRET` — already generated; keep it secret and consistent across environments (dev + Vercel).
   - `ADMIN_SETUP_SECRET` — already generated; a one-time code only the site owner should know, required to claim the first admin account (see below). Keep it out of chat/Slack once you've used it — treat it like a password.
3. Set the same env vars in Vercel (Project Settings > Environment Variables) for production.
4. Visit `/admin/setup` and create the first admin account (you pick your own username/password), entering `ADMIN_SETUP_SECRET` in the "Setup code" field. This only works once — it's how whoever runs this first claims the first account, so nobody else can beat them to it.
5. To add more admins, log in and go to `/admin/invite` — generate a one-time link and send it to them. They open it and pick their own username/password; you never see or set it for them. Links expire after 7 days or first use.
