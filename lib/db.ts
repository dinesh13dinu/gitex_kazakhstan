import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function db(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  return env.DB;
}

export type Locale = "en" | "ru";

export function localized(row: Record<string, unknown>, field: string, locale: Locale) {
  return String(row[`${field}_${locale}`] ?? "");
}

export function json<T>(value: unknown, fallback: T): T {
  try { return value ? JSON.parse(String(value)) as T : fallback; } catch { return fallback; }
}

export type PageSection = { id:number; section_key:string; title_en:string; title_ru:string; body_en:string; body_ru:string; items_json:string; items_ru_json:string; sort_order:number };

export async function getContentPage(slug:string){ return (await db()).prepare("SELECT * FROM content_pages WHERE slug=?").bind(slug).first<Record<string,unknown>>(); }
export async function getNewsPost(slug:string,locale:Locale){ return (await db()).prepare("SELECT * FROM news_posts WHERE slug=? AND locale=?").bind(slug,locale).first<Record<string,unknown>>(); }
export async function getNews(locale:Locale){ return (await db()).prepare("SELECT * FROM news_posts WHERE locale=? ORDER BY published_at DESC").bind(locale).all<Record<string,unknown>>(); }
export async function getSpeakers(){ return (await db()).prepare("SELECT * FROM speakers ORDER BY sort_order").all<Record<string,unknown>>(); }
export async function getSettings(){ return (await db()).prepare("SELECT * FROM site_settings WHERE id=1").first<Record<string,unknown>>(); }

export async function getHomepage(locale: Locale) {
  const database = await db();
  const [settings, hero, highlights, seo, stats, programmes, speakers, testimonials, tiers, logos, news, ctas, sections] = await Promise.all([
    database.prepare("SELECT * FROM site_settings WHERE id=1").first<Record<string, unknown>>(),
    database.prepare("SELECT * FROM hero WHERE id=1").first<Record<string, unknown>>(),
    database.prepare("SELECT * FROM highlights WHERE id=1").first<Record<string, unknown>>(),
    database.prepare("SELECT * FROM seo_defaults WHERE id=1").first<Record<string, unknown>>(),
    database.prepare("SELECT * FROM stats ORDER BY sort_order").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM programmes ORDER BY sort_order").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM speakers ORDER BY sort_order").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM testimonials ORDER BY sort_order").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM sponsor_tiers ORDER BY sort_order").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM sponsor_logos ORDER BY sort_order").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM news_posts WHERE locale=? ORDER BY published_at DESC LIMIT 4").bind(locale).all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM ctas").all<Record<string, unknown>>(),
    database.prepare("SELECT * FROM page_sections ORDER BY sort_order").all<PageSection>(),
  ]);
  if (!settings || !hero || !highlights || !seo) throw new Error("CMS is not seeded. Run npm run db:migrate && npm run db:seed.");
  return { settings, hero, highlights, seo, stats: stats.results, programmes: programmes.results, speakers: speakers.results, testimonials: testimonials.results, tiers: tiers.results, logos: logos.results, news: news.results, ctas: ctas.results, sections: sections.results };
}
