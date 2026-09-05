import type { Metadata } from "next";
import type { Locale } from "./db";

export const FALLBACK_SITE_URL="https://gitex-kazakhstan-cms.gitex-kazakhstan.workers.dev";

export function siteUrl(){
  return (process.env.SITE_URL||FALLBACK_SITE_URL).replace(/\/$/,"");
}

export function absoluteUrl(path="/"){
  if(/^https?:\/\//i.test(path)) return path;
  return `${siteUrl()}${path.startsWith("/")?path:`/${path}`}`;
}

export function seoSlug(value:string){
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,96)||"gitex-ai-kazakhstan-media";
}

export function seoKeywords(value:string){
  const stop=new Set(["the","and","for","with","from","this","that","into","our","your","are","was","will","have","has","its"]);
  return [...new Set(value.toLowerCase().match(/[a-z0-9]{3,}/g)?.filter(word=>!stop.has(word))||[])].slice(0,12);
}

export function localizedAlternates(path:string,locale:Locale){
  const suffix=path.replace(/^\/(en|ru)/,"");
  return {canonical:absoluteUrl(`/${locale}${suffix}`),languages:{en:absoluteUrl(`/en${suffix}`),ru:absoluteUrl(`/ru${suffix}`),"x-default":absoluteUrl(`/en${suffix}`)}};
}

export function pageMetadata(input:{locale:Locale;path:string;title:string;description:string;image?:string;keywords?:string[];type?:"website"|"article";publishedTime?:string;noIndex?:boolean}):Metadata{
  const image=input.image?absoluteUrl(input.image):undefined;
  return {
    title:{absolute:input.title==="GITEX AI Kazakhstan"?input.title:`${input.title} | GITEX AI Kazakhstan`},
    description:input.description,
    keywords:input.keywords,
    alternates:localizedAlternates(input.path,input.locale),
    robots:input.noIndex?{index:false,follow:false}:{index:true,follow:true},
    openGraph:{type:input.type||"website",locale:input.locale==="ru"?"ru_RU":"en_US",url:absoluteUrl(input.path),siteName:"GITEX AI Kazakhstan",title:input.title,description:input.description,images:image?[{url:image,alt:input.title}]:undefined,...(input.type==="article"&&input.publishedTime?{publishedTime:input.publishedTime}:{})},
    twitter:{card:"summary_large_image",title:input.title,description:input.description,images:image?[image]:undefined},
  };
}
