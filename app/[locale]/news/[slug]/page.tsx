import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsPost,getSettings,type Locale } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
export const dynamic="force-dynamic";
export default async function NewsDetail({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale:raw,slug}=await params;if(raw!=="en"&&raw!=="ru")notFound();const locale=raw as Locale;
 const [post,settings]=await Promise.all([getNewsPost(slug,locale),getSettings()]);if(!post||!settings)notFound();
 return <main className="inner-page"><SiteHeader locale={locale} logo={String(settings.logo_url)}/><article className="news-detail">{Boolean(post.cover_url)&&<img src={String(post.cover_url)} alt=""/>}<small>{new Date(String(post.published_at)).toLocaleDateString(locale)}</small><h1>{String(post.title)}</h1><p className="lead">{String(post.excerpt)}</p><div>{String(post.body_md).replace(/^# .+\n+/,"").split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</div><Link href={`/${locale}/news`}>← {locale==="en"?"BACK TO NEWS":"НАЗАД К НОВОСТЯМ"}</Link></article></main>;
}
