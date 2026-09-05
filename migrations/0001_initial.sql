PRAGMA foreign_keys = ON;

CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  site_name_en TEXT NOT NULL, site_name_ru TEXT NOT NULL,
  default_locale TEXT NOT NULL DEFAULT 'en' CHECK (default_locale IN ('en','ru')),
  event_dates_en TEXT NOT NULL, event_dates_ru TEXT NOT NULL,
  venue_en TEXT NOT NULL, venue_ru TEXT NOT NULL,
  city_en TEXT NOT NULL, city_ru TEXT NOT NULL,
  country_en TEXT NOT NULL, country_ru TEXT NOT NULL,
  logo_url TEXT, favicon_url TEXT,
  social_links_json TEXT NOT NULL DEFAULT '[]',
  footer_blurb_en TEXT NOT NULL, footer_blurb_ru TEXT NOT NULL,
  legal_links_json TEXT NOT NULL DEFAULT '[]',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hero (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  eyebrow_en TEXT NOT NULL, eyebrow_ru TEXT NOT NULL,
  title_en TEXT NOT NULL, title_ru TEXT NOT NULL,
  subtitle_en TEXT NOT NULL, subtitle_ru TEXT NOT NULL,
  countdown_target TEXT NOT NULL,
  patronage_line_en TEXT NOT NULL, patronage_line_ru TEXT NOT NULL,
  primary_ctas_json TEXT NOT NULL DEFAULT '[]',
  host_logos_json TEXT NOT NULL DEFAULT '[]', partner_logos_json TEXT NOT NULL DEFAULT '[]',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stats (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT NOT NULL, label_en TEXT NOT NULL, label_ru TEXT NOT NULL, suffix TEXT, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE highlights (id INTEGER PRIMARY KEY CHECK (id = 1), title_en TEXT NOT NULL, title_ru TEXT NOT NULL, body_en TEXT NOT NULL, body_ru TEXT NOT NULL, video_embed_url TEXT, gallery_images_json TEXT NOT NULL DEFAULT '[]', factsheet_file_url TEXT);
CREATE TABLE programmes (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title_en TEXT NOT NULL, title_ru TEXT NOT NULL, body_en TEXT NOT NULL, body_ru TEXT NOT NULL, image_url TEXT, cta_label_en TEXT NOT NULL, cta_label_ru TEXT NOT NULL, cta_href TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE speakers (id INTEGER PRIMARY KEY AUTOINCREMENT, name_en TEXT NOT NULL, name_ru TEXT NOT NULL, title_en TEXT NOT NULL, title_ru TEXT NOT NULL, org_en TEXT NOT NULL, org_ru TEXT NOT NULL, country_en TEXT NOT NULL, country_ru TEXT NOT NULL, photo_url TEXT, bio_en TEXT, bio_ru TEXT, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE testimonials (id INTEGER PRIMARY KEY AUTOINCREMENT, quote_en TEXT NOT NULL, quote_ru TEXT NOT NULL, name_en TEXT NOT NULL, name_ru TEXT NOT NULL, role_en TEXT NOT NULL, role_ru TEXT NOT NULL, company_en TEXT NOT NULL, company_ru TEXT NOT NULL, logo_url TEXT, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE sponsor_tiers (id INTEGER PRIMARY KEY AUTOINCREMENT, name_en TEXT NOT NULL, name_ru TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE sponsor_logos (id INTEGER PRIMARY KEY AUTOINCREMENT, tier_id INTEGER NOT NULL REFERENCES sponsor_tiers(id) ON DELETE CASCADE, name TEXT NOT NULL, image_url TEXT, href TEXT, sort_order INTEGER NOT NULL DEFAULT 0);
CREATE TABLE news_posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL, locale TEXT NOT NULL CHECK (locale IN ('en','ru')), title TEXT NOT NULL, excerpt TEXT NOT NULL, body_md TEXT NOT NULL, cover_url TEXT, published_at TEXT NOT NULL, seo_json TEXT NOT NULL DEFAULT '{}', UNIQUE(slug, locale));
CREATE TABLE ctas (key TEXT PRIMARY KEY CHECK (key IN ('registerVisit','exhibit','investor','startup')), title_en TEXT NOT NULL, title_ru TEXT NOT NULL, blurb_en TEXT NOT NULL, blurb_ru TEXT NOT NULL, external_form_url TEXT NOT NULL);
CREATE TABLE seo_defaults (id INTEGER PRIMARY KEY CHECK (id = 1), title_template_en TEXT NOT NULL, title_template_ru TEXT NOT NULL, description_en TEXT NOT NULL, description_ru TEXT NOT NULL, og_image TEXT);

CREATE TABLE admin_users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE sessions (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE, expires_at TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX idx_news_locale_published ON news_posts(locale, published_at DESC);
