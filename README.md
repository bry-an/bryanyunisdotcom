# bryanyunis.com

Next.js 16 (App Router, Cache Components, Partial Prefetching), deployed on Vercel.
Every reading route is prerendered to static HTML and works without JavaScript.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Content

Wording is sourced from `../copy/` (`layout.md` is the spec). Structured records live in:

- `src/content/projects.ts`: one record per case study (slug, source number, title, subtitle,
  topics, summary, Markdown body, placement, stages). Featured priority is stored separately from
  source order. The homepage and `/projects/<slug>/` render from these records.
- `src/content/profile.ts`: hero, approach, signature line, history and roles (About anchors:
  `#gateless`, `#remax`, `#oppenheimerfunds`, `#contact`).

When you edit `copy/`, mirror the change here.

Any content string supports inline `**bold**` and `*italic*`. Page titles and meta descriptions
get the markers stripped automatically (`plain()` in `src/lib/markdown.tsx`).

## Contact form

`src/app/actions.ts` sends mail through Resend. Your email address is only ever in a server
env var, never in the page. Spam defenses: a honeypot field and Vercel BotID
(`src/instrumentation-client.ts`). Copy `.env.example` and set the vars in Vercel → Project →
Settings → Environment Variables. Verify `bryanyunis.com` in Resend so `CONTACT_FROM_EMAIL` can
use it.

BotID only runs real detection on Vercel. Locally `next dev` treats everyone as human. Under
`next start` the challenge script can't load, so submissions show the fallback message.

## SEO and LLM discovery

- Page metadata: `metadata` / `generateMetadata` per route; shared Open Graph base and JSON-LD builders in `src/lib/seo.ts`.
- Structured data (schema.org): WebSite + Person on every page, ProfilePage on About, Article on each case study.
- Share images: `opengraph-image.tsx` (site) and `projects/[slug]/opengraph-image.tsx` (per case), rendered at build time from `src/lib/og.tsx` with the fonts in `src/assets/fonts` (OFL).
- `/llms.txt` (index) and `/llms-full.txt` (whole site as Markdown), generated from the content modules in `src/lib/llms.ts`.
- `sitemap.ts`, `robots.ts` (all crawlers allowed, AI crawlers included), `apple-icon.tsx`.
