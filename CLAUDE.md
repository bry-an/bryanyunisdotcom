@AGENTS.md

# bryanyunis.com

Personal site for Bryan Yunis. Narrative: a technical leader whose deep engineering expertise is amplified by AI. Next.js 16 App Router (`cacheComponents`, `trailingSlash`), plain CSS modules, no Tailwind. Hosted on Vercel (team `bbyunis-projects`, project `bryanyunisdotcom`).

## Rules
- **Never deploy or run git commit/push.** Bryan deploys via git. Verify locally, then say what's ready to commit. Vercel CLI is fine for DNS/env/logs/inspect (always `--non-interactive`).
- Don't kill the dev server on :3000. Don't read `.env.local`.
- Install packages with `npm i <pkg>`, never by hand-editing package.json versions.
- Secrets go in via `! vercel env add …` by Bryan, never through chat.

## Voice & design
- Show, don't tell. Simple, cohesive. Consistent heading sizes.
- No "eight years" or similar tenure claims; "with experience."
- Link every Gateless mention to https://gateless.com/.
- Ledger labels: "With AI" (sparkle) / "With experience" (scale).
- Messaging must stay consistent with `../../linkedin/*.md` and `../copy/*.md`; update those when site copy changes.

## Where things live
- Content: `src/content/profile.ts` (bio, roles, pills/`labels`), `src/content/projects.ts` (case studies). Content strings support `**bold**` (renders in accent), `*em*`, and `[links](url)` via `src/lib/markdown.tsx`.
- Home `src/app/page.tsx` holds featured work (`WorkSpine`); there's no /projects index (redirects to `/#featured-work`). Case studies at `/projects/[slug]/`. Renamed slugs need a redirect in `next.config.ts`.
- Theme: tokens in `src/app/globals.css` on `:root`, dark via `prefers-color-scheme`, override via `<meta name="color-scheme">` content (`light`/`dark`/`light dark`) matched with `:root:has(...)`; toggle in `ThemeToggle.tsx`, boot script `src/lib/theme.ts`.
- SEO/LLM: `src/lib/seo.ts` (JSON-LD `personLd.knowsAbout`, keep in sync with role pills), `opengraph-image.tsx`, `src/app/llms.txt`, `llms-full.txt` (built from content in `src/lib/llms.ts`), `sitemap.ts`, `robots.ts`.
- Contact: `src/app/actions.ts` → Resend (from `contact@bryanyunis.com`, reply-to sender), BotID + honeypot. Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.

## Infra
DNS on Vercel (registrar GoDaddy). Google Workspace MX + SPF; Resend records on `send`/`resend._domainkey`. Old DigitalOcean droplet/zone: Bryan to shut down after ~2026-11-17.

## Verify
`npm run build` must pass. For visual changes, screenshot light + dark in Chromium and WebKit.
