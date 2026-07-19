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

1. In the Supabase project's SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) to create the `posts`, `admin_users`, and `admin_invites` tables. Also create a public Storage bucket named `post-images` (Storage > New bucket > Public), used for post cover images.
   - If these tables already exist (the deployed project), instead run just the **"MIGRATION FOR EXISTING DATABASES"** block at the bottom of that file — it adds admin roles and the post review workflow without touching existing data.
2. Fill in `.env.local` (see `.env.local` for the placeholders already there):
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase dashboard > Project Settings > API > service_role secret. Server-only, never expose to the client.
   - `JWT_SECRET` — already generated; keep it secret and consistent across environments (dev + Vercel).
   - `ADMIN_SETUP_SECRET` — already generated; a one-time code only the site owner should know, required to claim the first admin account (see below). Keep it out of chat/Slack once you've used it — treat it like a password.
   - `NEXT_PUBLIC_SITE_URL` — optional, defaults to `https://stem-sprouts.org`. The canonical origin used to build the sitemap, robots.txt, and RSS feed URLs.
   - `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` — optional. The full JSON key (as a single-line string) for a Google Cloud service account with access to the Indexing API. When set, publishing a post automatically pings Google to crawl it. See "Google Search Console & Indexing API" below.
3. Set the same env vars in Vercel (Project Settings > Environment Variables) for production.
4. Visit `/admin/setup` and create the first admin account (you pick your own username/password), entering `ADMIN_SETUP_SECRET` in the "Setup code" field. This only works once — it's how whoever runs this first claims the first account, so nobody else can beat them to it. The first account created this way is always a **main admin**.
5. To add more admins, log in and go to `/admin/invite` — pick a role (Main Admin or Chapter Lead), generate a one-time link, and send it to them. They open it and pick their own username/password; you never see or set it for them. Links expire after 7 days or first use.

### Admin roles

- **Main admin** — full access: publish posts directly, review and approve/reject chapter leads' posts, invite new admins, and remove admin accounts (`/admin/admins`).
- **Chapter lead** — can create and edit their own posts only. Saving always lands the post as "Pending Review" (never goes live directly, including edits to an already-published post of theirs) until a main admin approves it from the "Pending Review" section on `/admin`.

Existing admin accounts created before this feature shipped were grandfathered in as main admins by the migration above.

## SEO / indexing

- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` dynamically — every published post is included automatically, no manual edits needed.
- `/news/feed.xml` is an RSS feed of the latest 30 published posts.
- `app/not-found.tsx` is the site's 404 page.

### Google Search Console & Indexing API

These steps need to be done once, by hand, in Google's dashboards — there's no way to automate the initial verification:

1. Go to [Google Search Console](https://search.google.com/search-console) and add `stem-sprouts.org` as a **Domain property** (verify via the DNS TXT record it gives you — add it wherever the domain's DNS is managed).
2. Under Sitemaps, submit `https://stem-sprouts.org/sitemap.xml`.
3. For the Indexing API ping (`lib/google-indexing.ts`, wired into publish/approve actions in `app/api/posts/*`):
   - In [Google Cloud Console](https://console.cloud.google.com/), create a project (or reuse one), enable the **Web Search Indexing API**, and create a **Service Account** with a JSON key.
   - In Search Console (Settings > Users and permissions), add that service account's email as an **Owner** of the `stem-sprouts.org` property.
   - Set `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` (the full key file contents, minified to one line) in `.env.local` and in Vercel. Until it's set, publishing just logs a console warning and skips the ping — it never blocks a publish.
4. To confirm it's working: publish a post, then check it in Search Console's URL Inspection tool — it should show as crawled within a day or two.
