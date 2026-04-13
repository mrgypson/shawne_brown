# Sanity: publish webhooks and preview

Content routes (home, Work, project detail, About, Contact) are **server-rendered** on Netlify so that after `/api/preview/enable` runs, the same deployment can show **draft** content when `SANITY_READ_TOKEN` is configured. Published visitors still see published documents; drafts require a valid preview session from Studio’s Presentation tool (or the legacy manual secret flow).

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

- **Vercel**: Deploy Hooks (production branch).
- **Netlify**: Build hooks; this repo uses [`@astrojs/netlify`](../astro.config.mjs).
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

1. Copy [`studio/.env.example`](../studio/.env.example) to `studio/.env` and set `SANITY_STUDIO_PREVIEW_URL` to your deployed site origin (e.g. `https://your-site.netlify.app` or `http://localhost:4321` for local Astro).
2. Deploy or run Studio; open the **Presentation** tool. It uses `/api/preview/enable` and `/api/preview/disable` configured in [`studio/sanity.config.ts`](../studio/sanity.config.ts).

### Presentation troubleshooting

- **`/api/preview/enable` returns 5xx**: Ensure `SANITY_READ_TOKEN` is a **project** token (Viewer/Editor) in the Astro root `.env`, then restart `npm run dev`. Response bodies are plain text and describe the failure.
- **401 after enable**: Preview secrets expire (about an hour). Close Presentation and open it again so Studio issues a new `sanity-preview-secret`.
- **“Unable to connect to visual editing”**: With a valid preview session, [`SanityVisualEditing.astro`](../src/components/SanityVisualEditing.astro) calls `enableVisualEditing()` from `@sanity/visual-editing`. Full click-to-edit overlays also need **Stega**-encoded strings in your queries; this repo uses plain strings, so overlays may be limited until you add Stega.
- **Hosted Studio (`https://`) + `http://localhost:4321`**: The iframe is cross-origin / mixed-content; browsers may warn. For fewer warnings, run Studio locally against localhost or preview the **deployed** HTTPS site.

---

## 4. Client workflow (summary)

1. Edit in Studio (hosted or local).
2. Open **Presentation** → preview loads the front end with draft content after the enable route sets the cookie.
3. **Publish** when ready; the live site shows published content on the next request. Optionally keep a **webhook** so full site builds still run for non-HTML assets or policy.
