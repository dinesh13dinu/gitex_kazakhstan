import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentPage,getNews,getSettings,getSpeakers,json,localized,type Locale } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic="force-dynamic";
type Block={title_en:string;title_ru:string;body_en:string;body_ru:string};
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{const {locale:raw,slug}=await params;const locale=(raw==="ru"?"ru":"en") as Locale;const page=await getContentPage(slug);if(!page)return {};return pageMetadata({locale,path:`/${locale}/${slug}`,title:localized(page,"title",locale),description:localized(page,"body",locale),image:String(page.hero_image||"")});}
export default async function ContentPage({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale:raw,slug}=await params;if(raw!=="en"&&raw!=="ru")notFound();const locale=raw as Locale;
 const [page,settings]=await Promise.all([getContentPage(slug),getSettings()]);if(!page||!settings)notFound();
 const blocks=json<Block[]>(page.sections_json,[]);const speakers=slug==="speakers"?(await getSpeakers()).results:[];const news=slug==="news"?(await getNews(locale)).results:[];
 const galleryImages=["Presidential-Images.jpg","Presidential-tour.jpg","VM_09775.jpg","VM_00901.jpg","MAX00984.jpg","VM_01145.jpg","img_0022.jpg","MAX01827.jpg"].map(v=>`https://www.gitexcac.com/images/${v}`);
 return <main className="inner-page"><SiteHeader locale={locale} logo={String(settings.logo_url)}/><section className="inner-hero" style={page.hero_image?{backgroundImage:`linear-gradient(90deg,#064ecddd,#05070b88),url(${page.hero_image})`}:undefined}><div><p>{localized(page,"eyebrow",locale)}</p><h1>{localized(page,"title",locale)}</h1><span>{localized(page,"body",locale)}</span></div></section>
 {blocks.length>0&&<section className="inner-blocks">{blocks.map((b,i)=><article key={i}><span>0{i+1}</span><h2>{localized(b as unknown as Record<string,unknown>,"title",locale)}</h2><p>{localized(b as unknown as Record<string,unknown>,"body",locale)}</p></article>)}</section>}
 {slug==="speakers"&&<section className="inner-list people">{speakers.map(p=><article key={String(p.id)}><div className="portrait" style={{backgroundImage:`url(${p.photo_url})`}}/><small>{localized(p,"country",locale)}</small><h3>{localized(p,"name",locale)}</h3><p>{localized(p,"title",locale)}</p><b>{localized(p,"org",locale)}</b></article>)}</section>}
 {slug==="gallery"&&<section className="inner-gallery">{galleryImages.map((url,i)=><img src={url} alt={`GITEX Kazakhstan ${i+1}`} key={url}/>)}</section>}
 {slug==="news"&&<section className="inner-news">{news.map(n=><article key={String(n.id)}><small>{new Date(String(n.published_at)).toLocaleDateString(locale)}</small><h2>{String(n.title)}</h2><p>{String(n.excerpt)}</p><Link href={`/${locale}/news/${n.slug}`}>{locale==="en"?"READ STORY":"ЧИТАТЬ"} →</Link></article>)}</section>}
 <section className="inner-cta"><h2>{locale==="en"?"BE PART OF GITEX AI KAZAKHSTAN 2027":"СТАНЬТЕ ЧАСТЬЮ GITEX AI KAZAKHSTAN 2027"}</h2><Link href={`/${locale}#register`}>{locale==="en"?"REGISTER INTEREST":"ОСТАВИТЬ ЗАЯВКУ"}</Link></section><footer className="compact-footer"><Link href={`/${locale}`}>GITEX AI Kazakhstan</Link><span>7–8 {locale==="en"?"JUNE":"ИЮНЯ"} 2027 · ALMATY</span><div><Link href={`/${locale}/privacy-policy`}>{locale==="en"?"Privacy":"Конфиденциальность"}</Link><Link href={`/${locale}/terms-and-conditions`}>{locale==="en"?"Terms":"Условия"}</Link></div></footer></main>;
}
