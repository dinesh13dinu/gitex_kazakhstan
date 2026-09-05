# Content Model

All user-facing text is bilingual from day one. Structured JSON that contains text stores `{ "en": "…", "ru": "…" }` values. Ordered tables use `sort_order`.

## site_settings

`siteName`, `defaultLocale`, `eventDates`, `venue`, `city`, `country`, `logoUrl`, `faviconUrl`, `socialLinks[]`, `footerBlurb`, `legalLinks[]`.

Singleton table. Core copy is stored in localized columns; social and legal link lists are JSON.

## hero

`eyebrow`, `title`, `subtitle`, `countdownTarget`, `patronageLine`, `primaryCtas[] {label, href, style}`, `hostLogos[]`, `partnerLogos[]`.

Singleton table. CTA labels are bilingual objects inside JSON.

## stats

`items[] {value, label, suffix?}`.

One ordered row per statistic. `label` is localized.

## highlights

`title`, `body`, `videoEmbedUrl`, `galleryImages[]`, `factsheetFileUrl`.

Singleton table. Videos remain remote embed URLs or may later be Cloudflare Stream IDs.

## programmes

`cards[] {slug, title, body, imageUrl, ctaLabel, ctaHref, order}`.

One ordered row per programme; `slug` is unique.

## speakers

`people[] {name, title, org, country, photoUrl, bio?, order}`.

One ordered row per person. All textual identity fields are localized to allow language-appropriate spelling.

## testimonials

`items[] {quote, name, role, company, logoUrl?, order}`.

One ordered row per testimonial.

## sponsors

`tiers[] {name, order}`, `logos[] {tierId, name, imageUrl, href, order}`.

Relational tiers and logos with cascading deletion from a tier.

## news

`posts[] {slug, title, excerpt, body(md), coverUrl, publishedAt, locale, seo}`.

One row per locale, uniquely keyed by `(slug, locale)`. `body_md` keeps editorial authoring simple and `seo` is JSON for extensibility.

## ctas

`registerVisit`, `exhibit`, `investor`, `startup` — `{title, blurb, externalFormUrl}`.

Rows use a constrained key and localized title/blurb columns.

## seo_defaults

`titleTemplate`, `description`, `ogImage`.

Singleton table with localized title template and description.

## admin_users

Unique case-insensitive email, PBKDF2-SHA256 password hash, timestamps. Plaintext passwords are never persisted.

## sessions

Opaque cryptographically random ID, admin user foreign key, expiry and creation time. Expired sessions are rejected and can be cleaned periodically.
