import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/seo";

export const dynamic="force-dynamic";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const database=await db();
  const [pages,news]=await Promise.all([
    database.prepare("SELECT slug FROM content_pages ORDER BY sort_order").all<{slug:string}>(),
    database.prepare("SELECT slug,locale,published_at,cover_url FROM news_posts ORDER BY published_at DESC").all<{slug:string;locale:string;published_at:string;cover_url:string|null}>(),
  ]);
  const now=new Date();
  const entries:MetadataRoute.Sitemap=[];
  for(const locale of ["en","ru"] as const){
    entries.push({url:absoluteUrl(`/${locale}`),lastModified:now,changeFrequency:"weekly",priority:1});
    for(const page of pages.results) entries.push({url:absoluteUrl(`/${locale}/${page.slug}`),lastModified:now,changeFrequency:page.slug==="news"?"daily":"monthly",priority:page.slug==="news"?.8:.7});
  }
  for(const post of news.results) entries.push({url:absoluteUrl(`/${post.locale}/news/${post.slug}`),lastModified:new Date(post.published_at),changeFrequency:"monthly",priority:.7,images:post.cover_url?[absoluteUrl(post.cover_url)]:undefined});
  return entries;
}
