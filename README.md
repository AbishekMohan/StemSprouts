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

1. In the Supabase project's SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) to create the `posts` table.
2. Fill in `.env.local` (see `.env.local` for the placeholders already there):
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase dashboard > Project Settings > API > service_role secret. Server-only, never expose to the client.
   - `JWT_SECRET` — already generated; keep it secret and consistent across environments (dev + Vercel).
   - `ADMIN_USERS` — generate with:
     ```bash
     node scripts/generate-admin-users.mjs alice:somepassword bob:anotherpassword
     ```
     Paste the printed base64 string in as `ADMIN_USERS`. Add one `username:password` pair per admin.
3. Set the same env vars in Vercel (Project Settings > Environment Variables) for production.
4. Log in at `/admin/login` with one of the usernames/passwords you generated.
