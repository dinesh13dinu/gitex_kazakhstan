import { notFound } from "next/navigation";
import Link from "next/link";
import { getHomepage, json, localized, type Locale } from "@/lib/db";

type CTA={label:{en:string;ru:string};href:string;style:string};
export const dynamic="force-dynamic";
export default async function Home({params}:{params:Promise<{locale:string}>}){
  const {locale:raw}=await params; if(raw!=="en"&&raw!=="ru") notFound(); const locale=raw as Locale;
  const d=await getHomepage(locale); const h=d.hero,s=d.settings,x=d.highlights; const ct=json<CTA[]>(h.primary_ctas_json,[]);
  return <main>
    <header><Link className="brand" href={`/${locale}`}>GITEX <span>AI</span> KAZAKHSTAN</Link><nav><a href="#programmes">{locale==="en"?"PROGRAMMES":"ПРОГРАММЫ"}</a><a href="#speakers">{locale==="en"?"SPEAKERS":"СПИКЕРЫ"}</a><Link href={locale==="en"?"/ru":"/en"}>{locale==="en"?"RU":"EN"}</Link><Link className="admin-link" href="/admin">CMS</Link></nav></header>
    <section className="hero"><div className="grid-glow"/><p className="patronage">{localized(h,"patronage_line",locale)}</p><div className="hero-copy"><p className="eyebrow">{localized(h,"eyebrow",locale)}</p><h1>{localized(h,"title",locale)}</h1><h2>{localized(h,"subtitle",locale)}</h2><p className="date">{localized(s,"event_dates",locale)} · {localized(s,"city",locale)}</p><div className="actions">{ct.map((c,i)=><a className={c.style} href={c.href} key={i}>{c.label[locale]}</a>)}</div></div><div className="orb">AI</div></section>
    <section className="statement"><p>{localized(x,"title",locale)}</p><h2>{localized(x,"body",locale)}</h2></section>
    <section className="stats">{d.stats.map((item)=><article key={String(item.id)}><strong>{String(item.value)}{String(item.suffix??"")}</strong><span>{localized(item,"label",locale)}</span></article>)}</section>
    <section className="intro"><p className="eyebrow">{locale==="en"?"THE REGION’S FASTEST-GROWING AI ECOSYSTEM":"[RU needs review] САМАЯ БЫСТРОРАСТУЩАЯ ИИ-ЭКОСИСТЕМА РЕГИОНА"}</p><h2>{locale==="en"?"Powerful alliances across business, capital & policy":"[RU needs review] Сильные альянсы бизнеса, капитала и государства"}</h2></section>
    <section id="programmes" className="section"><p className="eyebrow">{locale==="en"?"FLAGSHIP PROGRAMMES & LIVE EXPERIENCES":"[RU needs review] ФЛАГМАНСКИЕ ПРОГРАММЫ"}</p><div className="cards">{d.programmes.map(p=><article className="card" key={String(p.id)}><span>0{String(p.sort_order)}</span><h3>{localized(p,"title",locale)}</h3><p>{localized(p,"body",locale)}</p><a href={String(p.cta_href)}>{localized(p,"cta_label",locale)} →</a></article>)}</div></section>
    <section id="speakers" className="section dark"><p className="eyebrow">{locale==="en"?"GLOBAL MINDS":"[RU needs review] МИРОВЫЕ ЛИДЕРЫ"}</p><h2>{locale==="en"?"Putting the nation’s AI agenda forward":"[RU needs review] Развивая национальную повестку ИИ"}</h2><div className="people">{d.speakers.map(p=><article key={String(p.id)}><div className="portrait">{localized(p,"name",locale).slice(0,1)}</div><small>{localized(p,"country",locale)}</small><h3>{localized(p,"name",locale)}</h3><p>{localized(p,"title",locale)}</p><b>{localized(p,"org",locale)}</b></article>)}</div></section>
    <section className="section"><p className="eyebrow">{locale==="en"?"TESTIMONIALS":"ОТЗЫВЫ"}</p><div className="quotes">{d.testimonials.map(t=><blockquote key={String(t.id)}>“{localized(t,"quote",locale)}”<footer><b>{localized(t,"name",locale)}</b><span>{localized(t,"role",locale)} · {localized(t,"company",locale)}</span></footer></blockquote>)}</div></section>
    <section className="section sponsors"><p className="eyebrow">{locale==="en"?"THANK YOU TO OUR SPONSORS & EXHIBITORS":"[RU needs review] НАШИ СПОНСОРЫ И ЭКСПОНЕНТЫ"}</p>{d.tiers.map(t=><div key={String(t.id)}><h3>{localized(t,"name",locale)}</h3><div className="logos">{d.logos.filter(l=>l.tier_id===t.id).map(l=><a href={String(l.href)} key={String(l.id)}>{String(l.name)}</a>)}</div></div>)}</section>
    <section className="section news"><p className="eyebrow">{locale==="en"?"NEWSROOM":"НОВОСТИ"}</p><div className="cards">{d.news.map(n=><article className="card" key={String(n.id)}><small>{new Date(String(n.published_at)).toLocaleDateString(locale)}</small><h3>{String(n.title)}</h3><p>{String(n.excerpt)}</p></article>)}</div></section>
    <footer className="site-footer"><div><b>{localized(s,"site_name",locale)}</b><p>{localized(s,"footer_blurb",locale)}</p></div><div>{localized(s,"event_dates",locale)}<br/>{localized(s,"venue",locale)}, {localized(s,"city",locale)}</div></footer>
  </main>;
}
