# Shawne Brown — artist site

Astro + Sanity: the public site reads projects and the About/Contact singleton from the Content Lake; [Sanity Studio](studio/) is the editorial UI.

## Scripts

| Command | Action |
| --- | --- |
| `npm install` | Install site dependencies |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Production build |
| `npm run check` | `astro check` (TypeScript) |
| `npm run studio` | Run Studio locally (`studio/`) |
| `npm run studio:deploy` | Deploy hosted Studio |

## Environment variables

Copy [`.env.example`](.env.example) to `.env` for local development. On Vercel, set the same keys in Project Settings → Environment Variables.

### Sanity (site)

| Variable | Required | Notes |
| --- | --- | --- |
| `SANITY_PROJECT_ID` | Usually no | Defaults match the Studio project when unset |
| `SANITY_DATASET` | No | Default `production` |
| `SANITY_READ_TOKEN` | For drafts/preview | Server-only; used with `previewDrafts` perspective |
| `SANITY_USE_CDN` | No | Set `false` to bypass CDN when needed |
| `SANITY_USE_MOCK` | No | Set `true` to force mock data (no Sanity requests) |
| `SANITY_PREVIEW_SECRET` | Legacy manual preview | Must match `secret` query param on `/api/preview/enable` if used |

### Inquiry email (Resend)

The contact form `POST`s to [`/api/inquiry`](src/pages/api/inquiry.ts). Mail is sent with [Resend](https://resend.com); the **To** address is `contact.email` from the Sanity **About & Contact** document (`aboutPage`). That address is **not** shown on the public Contact page—it is only used server-side for delivery.

| Variable | Required (prod) | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from Resend dashboard |
| `RESEND_FROM_EMAIL` | Yes | Verified sender, e.g. `Shawne Brown <onboarding@resend.dev>` or your domain |

### Phase One production checklist

1. **Sanity content**: Create the singleton About document with **document id** `aboutPage` (required by the GROQ query). Add at least one **Project** with slug and images.
2. **Vercel env**: Set `RESEND_*`, Sanity vars as needed, and **never** set `SANITY_USE_MOCK=true` in production.
3. **Canonical URL**: Set `site` in [`astro.config.mjs`](astro.config.mjs) to the final domain; [`siteConfig.baseUrl`](src/data/mock/site.ts) follows `import.meta.env.SITE`.
4. **Studio**: Deploy Studio (`npm run studio:deploy`); set `SANITY_STUDIO_PREVIEW_URL` in `studio/.env` to the live site origin for Presentation.
5. **Resend**: Verify the sending domain (or use Resend’s test sender for smoke tests).

## Project layout

- [`src/pages/`](src/pages/) — routes (Work, About, Contact, preview API)
- [`src/lib/sanity/`](src/lib/sanity/) — client, queries, image URLs, mappers
- [`studio/schemaTypes/`](studio/schemaTypes/) — Sanity schemas
