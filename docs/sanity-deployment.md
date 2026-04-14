# Sanity: publish webhooks and preview

Content routes (home, Work, project detail, About, Contact) are **server-rendered** (this repo uses [`@astrojs/vercel`](../astro.config.mjs) for Vercel) so that after `/api/preview/enable` runs, the same deployment can show **draft** content when `SANITY_READ_TOKEN` is configured. Published visitors still see published documents; drafts require a valid preview session from Studio’s Presentation tool (or the legacy manual secret flow).

## 1. Automatic deploy when content is published

Publishing in Studio updates the API immediately, but this app reads Sanity **at request time** on those routes, so **you do not have to rebuild** for every text tweak unless you want fully static HTML for other reasons. Many teams still add a webhook so **builds** run on publish (for images, schema-driven layout changes, or to refresh any prerendered assets).

### Webhook → deploy hook (optional but typical)

1. In your host dashboard, create a **Deploy hook** / **Build hook** and copy the URL.
2. In [Sanity Manage](https://www.sanity.io/manage) → your project → **API** → **Webhooks** → **Create webhook**:
   - **URL**: the deploy hook.
   - **Trigger on**: Create, Update, Delete (or filter to `project`, `aboutPage`, etc.).
   - **Filter** (optional GROQ): e.g. `_type in ["project","aboutPage"]`.
3. Test the webhook and confirm a build starts.

### Host notes

- **Vercel**: Deploy Hooks (production branch); Astro adapter is `@astrojs/vercel`.
- **Netlify**: Build hooks (switch adapter to `@astrojs/netlify` if you move the site there).
- **Cloudflare Pages**: Deploy hooks.

### Build freshness (optional)

For any **build-time** Sanity reads, you can bypass the CDN:

```bash
SANITY_USE_CDN=false
```

Set in the host’s build environment (see [`.env.example`](../.env.example)).

---

## 2. Environment variables on the Astro host

| Variable | Required | Purpose |
|----------|----------|---------|
| `SANITY_READ_TOKEN` | **Yes** for Presentation / `validatePreviewUrl` | Draft perspective + secret validation |
| `SANITY_PREVIEW_SECRET` | No | Legacy manual preview: `/api/preview/enable?secret=…&redirect=/` |
| `SANITY_USE_CDN` | No | Set to `false` on CI if builds must see brand-new publishes immediately |

---

## 3. Studio: Presentation + preview URL

### Local Studio (`sanity dev`)

1. Copy [`studio/.env.example`](../studio/.env.example) to `studio/.env`.
2. Set `SANITY_STUDIO_PREVIEW_URL` to `http://localhost:4321` while the Astro app runs with `npm run dev`, or to your **deployed** HTTPS URL if you want Presentation to hit production from local Studio.

### Hosted Studio (`*.sanity.studio`)

`previewUrl.initial` and default `allowOrigins` are set in [`studio/sanity.config.ts`](../studio/sanity.config.ts) (production Astro origin + `https://*.vercel.app`). You **do not** need `studio/.env.production` unless you override for another host.

1. From `studio/`, run **`npm run deploy`**. Optional: copy [`studio/.env.production.example`](../studio/.env.production.example) to **`studio/.env.production`** only if you set `SANITY_STUDIO_PREVIEW_URL` / `SANITY_STUDIO_ALLOW_ORIGINS` there (CI or multi-environment).
2. Open **Presentation** on `*.sanity.studio`; Studio loads your site origin in the iframe, then calls `/api/preview/enable?…` with a signed `sanity-preview-secret`.

**If you deploy Studio from CI:** pass `SANITY_STUDIO_*` overrides as runner env only when you need a non-default preview host.

### Presentation troubleshooting (checklist vs generic guides)

| Step | This repo | You still do in dashboards |
|------|-----------|----------------------------|
| **`presentationTool` + `previewUrl`** | Done in [`studio/sanity.config.ts`](../studio/sanity.config.ts) — defaults to `https://shawne-brown.vercel.app`, `allowOrigins` includes `*.vercel.app`. | If you use another production URL, change `BROWN_ASTRO_SITE_ORIGIN` in that file and redeploy Studio. Remove bad overrides from `studio/.env.production` if present. |
| **`SANITY_STUDIO_PREVIEW_URL`** | Optional: defaults are in `sanity.config.ts`. Set env only for **local Astro** (`http://localhost:4321` in `studio/.env`). | — |
| **CORS (Sanity Manage)** | Not in repo. | [Sanity Manage](https://www.sanity.io/manage) → **yrca4rxr** → **API** → **CORS origins** → add **`https://shawne-brown.vercel.app`** and **`http://localhost:4321`** (credentials / browser requests from the preview iframe often need this). Keep `https://*.sanity.studio` if listed. |
| **Cookies / cross-site Studio** | [`/api/preview/enable`](../src/pages/api/preview/enable.ts) sets `sanity-preview` with **`SameSite=None; Secure`** in production. | Browsers that block third-party cookies may still break Presentation; then use “Open in new tab” or embed Studio on your domain. |
| **`SANITY_READ_TOKEN` on the Astro host** | Not in repo. | **Vercel** → Environment variables → Production **and** Preview → redeploy. |
| **`next-sanity`** | **N/A** — this app is **Astro**, not Next.js. | Use `@sanity/client`, `@sanity/visual-editing`, `sanity` versions in root [`package.json`](../package.json); bump when you choose, not required for “latest” unless you hit a known bug. |

Other bullets:

- **Iframe shows only `/api/preview/enable`**: Preview base was wrong; `sanity.config.ts` now defaults to the site origin and throws if someone sets the enable path. Redeploy Studio.
- **`/api/preview/enable` returns 5xx**: `SANITY_READ_TOKEN` missing or wrong on **Vercel** (or local `.env`). Plain-text response explains the failure.
- **401 after enable**: Preview secrets expire (~1h). Close Presentation and reopen.
- **“Unable to connect to visual editing”**: Needs a working preview session (cookie) + [`SanityVisualEditing.astro`](../src/components/SanityVisualEditing.astro). Stega overlays are optional for basic connection.

---

## 4. Client workflow (summary)

1. Edit in Studio (hosted or local).
2. Open **Presentation** → preview loads the front end with draft content after the enable route sets the cookie.
3. **Publish** when ready; the live site shows published content on the next request. Optionally keep a **webhook** so full site builds still run for non-HTML assets or policy.
