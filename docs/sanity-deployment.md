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

`previewUrl.initial` is resolved when the Studio bundle is **built**. Other people’s browsers never reach your machine’s `localhost`.

1. In [Sanity Manage](https://www.sanity.io/manage) → **Project** → **Environment variables** (or your CI secrets for `sanity deploy`), set:
   - **`SANITY_STUDIO_PREVIEW_URL`** — public Astro origin, e.g. `https://your-project.vercel.app` (no trailing slash required).
   - **`SANITY_STUDIO_ALLOW_ORIGINS`** (recommended) — e.g. `https://your-project.vercel.app,https://*.vercel.app` so branch preview deploys and extra domains match Presentation’s origin checks.
2. From `studio/`, run **`npm run deploy`** again so the hosted Studio embeds those values.
3. Open **Presentation** in hosted Studio; it calls `/api/preview/enable` and `/api/preview/disable` on that origin per [`studio/sanity.config.ts`](../studio/sanity.config.ts).

### Presentation troubleshooting

- **`/api/preview/enable` returns 5xx**: Ensure `SANITY_READ_TOKEN` is a **project** token (Viewer/Editor) in the Astro root `.env`, then restart `npm run dev`. Response bodies are plain text and describe the failure.
- **401 after enable**: Preview secrets expire (about an hour). Close Presentation and open it again so Studio issues a new `sanity-preview-secret`.
- **“Unable to connect to visual editing”**: With a valid preview session, [`SanityVisualEditing.astro`](../src/components/SanityVisualEditing.astro) calls `enableVisualEditing()` from `@sanity/visual-editing`. Full click-to-edit overlays also need **Stega**-encoded strings in your queries; this repo uses plain strings, so overlays may be limited until you add Stega.
- **Hosted Studio still opening localhost**: The deploy was built without `SANITY_STUDIO_PREVIEW_URL` pointing at your **live** site. Fix the env vars in Manage, redeploy Studio, and ensure Vercel has `SANITY_READ_TOKEN`.

---

## 4. Client workflow (summary)

1. Edit in Studio (hosted or local).
2. Open **Presentation** → preview loads the front end with draft content after the enable route sets the cookie.
3. **Publish** when ready; the live site shows published content on the next request. Optionally keep a **webhook** so full site builds still run for non-HTML assets or policy.
