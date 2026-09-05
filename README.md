# GITEX AI Kazakhstan CMS

Cloudflare-native Next.js rebuild for GITEX AI Kazakhstan. The homepage and inner content pages read from D1 in English and Russian. The authenticated CMS edits site settings, hero, highlights/gallery, statistics, programmes, speakers, testimonials, sponsors, news, CTAs, SEO, homepage sections, and inner pages.

Deployed Worker: `https://gitex-kazakhstan-cms.gitex-kazakhstan.workers.dev`

## Stack

- Next.js App Router
- OpenNext Cloudflare adapter on Workers
- Cloudflare D1 custom CMS
- Cloudflare R2 binding stub for future uploads
- Web Crypto PBKDF2 password verification and D1 sessions

Payload CMS was evaluated conceptually but not selected because a small custom D1 CMS is substantially cleaner on the Workers runtime and avoids a second database/runtime abstraction. See `docs/ARCHITECTURE.md`.

## Local setup

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000/en`, `http://localhost:3000/ru`, or `http://localhost:3000/admin`.

Seed login (local development only):

- Email: `admin@gitex.local`
- Password: `ChangeMe123!`

Change the seeded credentials before client handover. Generate replacement hashes with PBKDF2-SHA256 using no more than 100,000 iterations (the current Cloudflare Workers Web Crypto limit) in the format documented by `lib/auth.ts`, then update the remote admin row.

## Scripts

- `npm run dev` — Next.js development server with local Cloudflare bindings
- `npm run build` — Next.js production validation
- `npm run build:worker` — generate the deployable OpenNext Worker bundle
- `npm run preview` — build and run the production Worker locally
- `npm run db:migrate` — apply D1 migrations locally
- `npm run db:seed` — seed local D1 content and admin
- `npm run db:migrate:remote` — apply migrations to remote D1
- `npm run db:seed:remote` — seed remote D1 (use only for a fresh database)
- `npm run deploy` — build and deploy with Wrangler
- `npm run cf-typegen` — regenerate binding types

## Create and connect Cloudflare resources

Authenticate once with `npx wrangler login`, then create the resources:

```bash
npx wrangler d1 create gitex-kazakhstan-cms
npx wrangler r2 bucket create gitex-kazakhstan-media
```

Copy the returned D1 database ID into `wrangler.toml`. R2 must first be enabled in the Cloudflare dashboard; after creating the bucket, uncomment the binding stub in `wrangler.toml`. The current milestone uses URL fields and does not require R2 at runtime. Then run:

```bash
npm run cf-typegen
npm run db:migrate:remote
npm run db:seed:remote
npm run deploy
```

Wrangler will return a `*.workers.dev` URL; no custom domain is required. For CI, connect the GitHub repository in Workers Builds and use `npm run deploy` as the deploy command.

## Environment and secrets

Copy `.env.example` to `.dev.vars` for local-only secret values. Set production secrets interactively so they never enter shell history or Git:

```bash
npx wrangler secret put SESSION_SECRET
```

The current opaque D1 session design does not require `SESSION_SECRET`; it is reserved for signed session/CSRF hardening in the next CMS increment. Admin credentials are stored only as a password hash in D1.

## Content ownership

D1 owns copy, image/file URLs, links, ordered lists, dates, speakers, sponsors, news, and inner pages. R2 upload can replace URL entry later. Visual design, layout, carousels, modal behaviour, programme interactions, counters, and reveal animation stay in code. The Russian draft is complete and no longer contains review-marker prefixes; a native-language editorial review is still recommended before the public launch.

## Local routes

Every route is available below both `/en` and `/ru`: homepage, speakers, investors, executive meetings, Supernova, gallery, cybersecurity, newsroom, news details, about, terms, privacy, and cookie policy. Form-oriented CTAs remain safe mock anchors until the client supplies production form destinations and consent wording.

## Accessibility and responsive support

The interface includes semantic navigation and dialog roles, visible keyboard focus, reduced-motion support, labelled carousel controls, localized document language, and responsive layouts at 520px and 900px breakpoints. Validate final client content and third-party media again at 390×844, 768×1024, 1024×768, and 1440×900 before production-domain launch.
