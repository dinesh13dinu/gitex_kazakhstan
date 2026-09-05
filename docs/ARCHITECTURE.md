# Architecture

## Stack chosen

Next.js App Router runs on Cloudflare Workers through the OpenNext Cloudflare adapter. A lightweight custom CMS uses Cloudflare D1 directly. Payload CMS was intentionally not selected: its conventional Node/database assumptions add deployment and operational complexity for this Workers-first milestone, while the required editor flow is small and maps cleanly to D1.

## Runtime

- Public requests to `/`, `/en`, and `/ru` are server-rendered by Next.js. `/` redirects to `/en`.
- Server Components read the `DB` D1 binding through OpenNext's Cloudflare context.
- Content pages are dynamic so an editor's saved change appears on the next request.
- Static assets are emitted to `.open-next/assets` and served by the `ASSETS` binding.
- Media currently uses external URLs because R2 is not enabled on the client Cloudflare account (API error 10042). The upload design uses SEO slugs from CMS titles and can be enabled without changing content tables once R2 is activated.
- `SITE_URL` is the single canonical-origin setting. Change it to the final production domain when connected; canonicals, language alternates, structured data, robots and the sitemap follow automatically.

## CMS and data flow

The public homepage queries each content collection from D1. Localized relational columns use an `_en` or `_ru` suffix. Repeatable editor structures such as CTA arrays and social links use JSON columns; ordered first-class content uses related tables.

`/admin/login` verifies a PBKDF2-SHA256 password using Web Crypto. A random opaque session ID is persisted in D1 and sent in an HttpOnly, SameSite=Lax cookie. `/admin` requires that session before reading or mutating content. Server Actions update D1 and revalidate public routes.

## Deployment

`wrangler.toml` owns the Worker, D1, R2, static assets, compatibility flag, and observability configuration. Remote D1 migrations and seed data are deliberately separate commands so production data is never overwritten accidentally. Secrets belong in Cloudflare secrets or local `.dev.vars`, never in the repository.

## Extension path

Add CRUD screens for the remaining existing collections, then R2 upload and asset selection. Layout, responsive behavior, and animation remain code-owned. Adding an inner page should reuse the same locale strategy and D1 content access layer.
