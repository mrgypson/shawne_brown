# Editing your photography site

A plain-English guide to updating content on your live domain. Keep this document handy the first few times you make changes.

## What you need

- The **Studio URL** you were given — it looks like `https://<name>.sanity.studio`.
- The login email that was invited to the project.
- A modern browser (Chrome, Safari, Firefox).

You will **not** need to touch code, servers, email sending (Resend), or the hosting dashboard (Vercel). All day-to-day edits happen in Studio.

---

## Core idea in one paragraph

The **website** pulls its text and images from **Studio** (powered by Sanity). When you edit a field in Studio and click **Publish**, the site updates within seconds. Draft edits are saved automatically but are **not** visible to visitors until you publish.

---

## Signing in

1. Open your Studio URL.
2. Sign in with the email that was invited.
3. After sign-in you land on the **Content** list with four main areas:
   - **Site settings** — site name, tagline, SEO defaults, and brand images.
   - **About & Contact** — the About page and where inquiry emails are delivered.
   - **Home page** — the optional heading and subheading above the portfolio grid on the home page.
   - **Project** — each series / body of work. Every project is always listed in the **Work** dropdown in the site header; individual projects can be toggled on or off the home page grid.

---

## Updating branding and SEO defaults

1. In Studio, click **Site settings**.
2. Edit any of:
   - **Site name** — used in header and page titles.
   - **Tagline** — optional short brand line for templates/components that reference it.
   - **Default SEO title / description** — homepage and fallback metadata.
   - **Logo / Favicon / Default Open Graph image** — brand assets used in shared layout metadata.
3. Click **Publish**.

---

## Updating the About page

1. In Studio, click **About & Contact**.
2. Edit any of:
   - **Biography** — short paragraph at the top of the About page.
   - **Artist statement** — longer statement below the biography.
   - **Exhibitions & publications** — click **Add item** to add a new row (year + detail). Drag rows to reorder.
   - **Publications note** — optional short paragraph below the exhibitions list.
   - **Contact page — intro / inquiry heading / inquiry disclaimer** — the small pieces of copy that appear on the Contact page. Leave blank to keep site defaults.
3. Click **Publish** (top right).
4. Open the site and reload — the change should be visible.

### Where inquiry emails go

Under **Contact** on the same document:

- **Email** — this is the inbox that receives messages from the Contact form. **It is not shown on the public Contact page.** Update it any time your preferred inbox changes, then **Publish**.
- **Location** — optional short label shown on Contact and in the footer.
- **Instagram** — your handle, e.g. `@yourhandle`. Appears on About and in the footer as a link.
- **Website** — optional external site. Appears on About and in the footer.

> Tip: to change where inquiries are delivered, the **only** thing you change is the **Email** field here. No code or settings elsewhere.

---

## Updating the Home page

The home page shows your portfolio grid. An optional short header can sit above it; both pieces of copy are optional and can be hidden without deleting them.

1. In Studio, click **Home page**.
2. Edit any of:
   - **Title** — the large heading above the portfolio grid. Leave blank (or toggle off) to hide the heading.
   - **Show title** — toggle off to hide the heading entirely (keeps your text saved for later).
   - **Subheading** — the line of copy under the title.
   - **Show subheading** — toggle off to hide the subheading (keeps your text saved for later).
3. Click **Publish**.
4. Open the site and reload — if both toggles are off (or both fields are empty), the grid shows with no header.

> Tip: the projects themselves are still edited under **Project** — this page only controls the header text above the grid, not which projects appear there. For that, see the **Show on home page** toggle on each project.

---

## Adding or editing a Project (a body of work)

Every project is one document here. All projects appear in the **Work** dropdown menu in the site header regardless of their settings. Projects can also be featured on the home page grid with a per-project toggle.

### Create a new project

1. In Studio → **Project** → **Create** (top right).
2. Fill in:
   - **Title** — shown as the project heading.
   - **Slug** — click **Generate** to auto-fill from the title. This is the URL piece (e.g. `/work/your-slug`). Changing it later will break existing links.
   - **Show on home page** — toggle on to include this project in the home page grid (cover image + title). Toggle off to keep the project live and reachable from the Work dropdown but hidden from the home grid. Default: on.
   - **Sort order** — a number. Lower numbers appear **first** on the home page grid and in the Work dropdown. Leave `0` to use defaults.
   - **Year / span** — e.g. `2021` or `2018–2020`.
   - **Project type**:
     - **Standard** — normal project.
     - **Neuhoff (print sales fields)** — shows an edition/print-sales note and exposes per-image print sale fields.
   - **Short description** — 1–3 sentences shown under the title.
   - **Long description** — optional, longer paragraph.
   - **Cover image** — used on the Work index grid and as the project’s default preview. Click **Alternative text** and describe the image for screen readers.
3. **Gallery layout (top of project)** — two settings apply to the whole gallery at once:
   - **Space between images** (0 – 4) — the vertical gap between every image, and between image-pair rows. Pick one rhythm for the whole project. Default `3`.
   - **Pair gap** (0 – 4) — the gap **inside** every pair: the column gap on desktop and the stack gap on mobile. Default `2`.
4. **Gallery** — click **Add item** for each image:
   - **Image** (required) + **Alternative text** (required).
   - **Caption** — optional text below the image.
   - **Width** — `Small` (~40% of the column), `Medium` (~70%, the default), `Large` (full column), or `Full` (edge-to-edge, ignores page margins).
   - **Alignment** — `Left`, `Center` (default), or `Right`. Takes effect when Width is Small, Medium, or Large. Ignored when Width is Full.
   - **Inset left / Inset right (fine-tune)** — optional 0 – 4 padding on either side that narrows the image *inside* the width you chose.
   - **Pair with next image** — check this on one image to place it side-by-side with the next one on desktop. They always stack on mobile. When paired, each image fills its column, and the individual Width/Alignment/Inset on those two items are ignored. The mobile stack gap and desktop column gap both come from the project-level **Pair gap**. When this is checked, two extra fields appear on the first image of the pair:
     - **Pair ratio** — `50/50` (equal, default), `60/40` (this image larger), or `40/60` (next image larger). Desktop only; on mobile they stack equally.
     - **Pair vertical alignment** — `Top` (default), `Center`, or `Bottom`. Controls how the two images line up when their heights differ (desktop only).
   - **Edition / print #** — optional badge.
   - **Print sales (Neuhoff)** — only used when Project type is Neuhoff.

   > Quick tip: the **simplest** way to set layout is Width + Alignment. Inset Left/Right are fine-tuners that apply *inside* the chosen width. If you want an image pushed hard to one side, set Width to Small or Large and Alignment to Left or Right.
5. **Publish**.

### Reordering projects on the Work page

Set the **Sort order** number on each project:

- `1` appears first, `2` second, and so on.
- Ties are broken alphabetically.
- You don’t need to number every project — only the ones whose order matters.

### Replace an image

1. Open the project.
2. In Gallery, click the gallery row → click the image field → **Remove** → upload the new image.
3. Update **Alternative text**.
4. **Publish**.

### Delete a project

Open the project → menu (`⋮`) → **Delete** → confirm. The page `/work/<slug>` will stop existing immediately after you publish/confirm deletion.

---

## Saving vs publishing

- Studio **auto-saves drafts** as you type.
- Drafts are visible **only** inside Studio.
- Click **Publish** to make the change live.
- If you change your mind, click the history icon on the top bar to roll back.

---

## Images — what works best

- Prefer large images (at least **2400 pixels** on the long edge). The site automatically resizes for thumbnails.
- JPEG or PNG are fine; Studio will optimize.
- **Always set Alternative text.** It describes the image for screen readers and helps SEO.
- Use the built-in cropping / **hotspot** tool to set what part of an image stays visible on small crops (useful for cover images).

---

## The Contact form

- Visitors fill out Name, Email, Message on `/contact`.
- The message is delivered to whatever email address is set in **About & Contact → Email**.
- You do **not** get notifications from any third-party service dashboard — messages arrive in your inbox directly.
- If you stop receiving form messages:
  1. Check spam.
  2. Confirm the **Email** field in Studio is correct and the document is **Published**.
  3. Ping your developer.

---

## Troubleshooting quick reference

| Symptom | What to check |
|---|---|
| I changed something in Studio but the site looks the same | Did you click **Publish**? Try a hard reload (`Cmd+Shift+R` on Mac). |
| New project isn’t on the Work page | Did you publish it? Is **Slug** filled in? |
| A project title changed but the URL broke | The **Slug** was edited — the old URL will 404. Try to keep slugs stable after launch. |
| Contact form messages aren’t arriving | Check spam; confirm **About & Contact → Email** is right and published. |
| Images look blurry | Upload a larger original; then reload after publishing. |

---

## What to ask your developer about

Things **not** covered by Studio (contact your developer):

- Design / layout changes to the page templates.
- Adding new kinds of content (e.g. a Blog or Events section).
- New pages in the top nav.
- Changing the domain name.
- Changing who owns the Studio account or the email-sending account.
- Anything that involves code, DNS, or hosting.

---

## Glossary

- **Studio** — the editing app where you type content (Sanity).
- **Document** — one editable entry (e.g. one project, the About page).
- **Field** — a single input within a document (e.g. Title, Bio).
- **Slug** — the piece of URL that identifies a project (`/work/<slug>`).
- **Publish** — make the current draft live on the site.
- **Alt text** — short description of an image for accessibility.
