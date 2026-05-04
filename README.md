# Photography site (shared codebase)

Astro + Sanity: the public site reads content from Sanity; [Sanity Studio](studio/) is the editorial UI. This repository is designed to support multiple photographer deployments from one codebase.

**HBMuir:** Hosted Studio at https://hbmuir-studio.sanity.studio/ is deployed only from the separate **hbmuir** canonical repository (Sanity project `1ogerp1o`). Do not point this repo’s Vercel envs or `studio:deploy` at that project or hostname.

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
| `SITE_URL` | Yes (prod) | Canonical site URL (used by Astro `site`, canonical links, OG URL base) |

### Sanity (studio)

Use `studio/.env` (local) or `studio/.env.production` (hosted Studio deploy):

| Variable | Required | Notes |
| --- | --- | --- |
| `SANITY_PROJECT_ID` | Yes | Photographer-specific Sanity project |
| `SANITY_DATASET` | Yes | Usually `production` |
| `SANITY_STUDIO_HOST` | Yes (hosted studio) | Studio URL slug: `https://<slug>.sanity.studio` |
| `SANITY_STUDIO_TITLE` | No | Top-bar Studio title |
| `SANITY_SITE_ORIGIN_DEFAULT` | Yes | Default site origin for Presentation |
| `SANITY_STUDIO_PREVIEW_URL` | No | Explicit preview origin override |
| `SANITY_STUDIO_ALLOW_ORIGINS` | No | Comma-separated allow list for Presentation |

### Inquiry email (Resend)

The contact form `POST`s to [`/api/inquiry`](src/pages/api/inquiry.ts). Mail is sent with [Resend](https://resend.com); the **To** address is `contact.email` from the Sanity **About & Contact** document (`aboutPage`). That address is **not** shown on the public Contact page—it is only used server-side for delivery.

| Variable | Required (prod) | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from Resend dashboard |
| `RESEND_FROM_EMAIL` | Yes | Verified sender, e.g. `Studio Team <onboarding@resend.dev>` or your domain |

### Multi-site deployment checklist

1. **Create Sanity target**: Use a dedicated project or dataset for each photographer.
2. **Seed singleton docs**: Ensure `siteSettings`, `aboutPage`, and `homePage` exist and are published.
3. **Set frontend envs**: Configure `SITE_URL`, Sanity read envs, and `RESEND_*`. Never set `SANITY_USE_MOCK=true` in production.
4. **Set Studio envs**: Configure project/dataset/studio host/origin vars in `studio/.env.production`.
5. **Deploy twice**: Create deployment A and B from the same repo, each with its own env set.
6. **Verify branding split**: Confirm each deployment renders its own `siteSettings` values while sharing identical code.

### Example environment matrix

| Deployment | `SITE_URL` | `SANITY_PROJECT_ID` | `SANITY_DATASET` | `SANITY_STUDIO_HOST` |
| --- | --- | --- | --- | --- |
| Photographer A | `https://photographer-a.com` | `projA123` | `production` | `photographer-a-studio` |
| Photographer B | `https://photographer-b.com` | `projB456` | `production` | `photographer-b-studio` |

## Project layout

- [`src/pages/`](src/pages/) — routes (Work, About, Contact, preview API)
- [`src/lib/sanity/`](src/lib/sanity/) — client, queries, image URLs, mappers
- [`studio/schemaTypes/`](studio/schemaTypes/) — Sanity schemas
- [`docs/deployment-matrix.md`](docs/deployment-matrix.md) — per-photographer env matrix for shared-code deployments
