# Multi-site deployment matrix

Use one codebase with separate deployments and environment sets per photographer.

## Frontend deployment variables

| Variable | Photographer A example | Photographer B example |
| --- | --- | --- |
| `SITE_URL` | `https://photographer-a.com` | `https://photographer-b.com` |
| `SANITY_PROJECT_ID` | `projA123` | `projB456` |
| `SANITY_DATASET` | `production` | `production` |
| `SANITY_READ_TOKEN` | `***` | `***` |
| `RESEND_API_KEY` | `***` | `***` |
| `RESEND_FROM_EMAIL` | `Studio A <mail@photographer-a.com>` | `Studio B <mail@photographer-b.com>` |

## Studio deployment variables

| Variable | Photographer A example | Photographer B example |
| --- | --- | --- |
| `SANITY_PROJECT_ID` | `projA123` | `projB456` |
| `SANITY_DATASET` | `production` | `production` |
| `SANITY_STUDIO_HOST` | `photographer-a-studio` | `photographer-b-studio` |
| `SANITY_STUDIO_TITLE` | `Photographer A Studio` | `Photographer B Studio` |
| `SANITY_SITE_ORIGIN_DEFAULT` | `https://photographer-a.com` | `https://photographer-b.com` |
| `SANITY_STUDIO_PREVIEW_URL` | `https://photographer-a.com` | `https://photographer-b.com` |
| `SANITY_STUDIO_ALLOW_ORIGINS` | `https://photographer-a.com,https://*.vercel.app` | `https://photographer-b.com,https://*.vercel.app` |

## Verification checklist

1. Publish distinct `siteSettings` values per project/dataset.
2. Confirm each deployment header/title/favicon matches its own `siteSettings`.
3. Confirm canonical and OG URLs use each deployment's `SITE_URL`.
4. Confirm Studio Presentation loads the matching frontend origin.
5. Confirm contact form messages route to the intended inbox for each site.
