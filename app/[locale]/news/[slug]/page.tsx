import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsPost,getSettings,type Locale } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
export const dynamic="force-dynamic";
type SeoOverrides={title?:string;description?:string;keywords?:string[];image?:string;noIndex?:boolean};
const seo=(value:unknown):SeoOverrides=>{try{return JSON.parse(String(value||"{}")) as SeoOverrides}catch{return {}}};
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{const {locale:raw,slug}=await params;const locale=(raw==="ru"?"ru":"en") as Locale;const post=await getNewsPost(slug,locale);if(!post)return {};const options=seo(post.seo_json);return pageMetadata({locale,path:`/${locale}/news/${slug}`,title:String(post.title),description:String(post.excerpt),image:String(post.cover_url||""),keywords:options.keywords,type:"article",publishedTime:String(post.published_at),noIndex:options.noIndex});}
export default async function NewsDetail({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale:raw,slug}=await params;if(raw!=="en"&&raw!=="ru")notFound();const locale=raw as Locale;
 const [post,settings]=await Promise.all([getNewsPost(slug,locale),getSettings()]);if(!post||!settings)notFound();
 const articleSchema={"@context":"https://schema.org","@type":"NewsArticle",headline:String(post.title),description:String(post.excerpt),image:post.cover_url?[absoluteUrl(String(post.cover_url))]:undefined,datePublished:String(post.published_at),mainEntityOfPage:absoluteUrl(`/${locale}/news/${slug}`),publisher:{"@type":"Organization",name:"GITEX AI Kazakhstan",logo:{"@type":"ImageObject",url:absoluteUrl(String(settings.logo_url||""))}}};
 return <main className="inner-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema)}}/><SiteHeader locale={locale} logo={String(settings.logo_url)}/><article className="news-detail">{Boolean(post.cover_url)&&<img src={String(post.cover_url)} alt={String(post.title)}/>}<small>{new Date(String(post.published_at)).toLocaleDateString(locale)}</small><h1>{String(post.title)}</h1><p className="lead">{String(post.excerpt)}</p><div>{String(post.body_md).replace(/^# .+\n+/,"").split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</div><Link href={`/${locale}/news`}>← {locale==="en"?"BACK TO NEWS":"НАЗАД К НОВОСТЯМ"}</Link></article></main>;
}
