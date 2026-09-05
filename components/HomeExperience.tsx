"use client";
import { useEffect, useState } from "react";

export function HomeExperience({locale}:{locale:"en"|"ru"}){
  const [promo,setPromo]=useState(false); const [cookies,setCookies]=useState(false); const [settings,setSettings]=useState(false);
  useEffect(()=>{
    document.querySelectorAll("main > section").forEach(el=>el.classList.add("reveal"));
    const io=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add("is-visible")),{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
    const promoTimer=setTimeout(()=>{if(!sessionStorage.getItem("gitex-promo"))setPromo(true)},1100);
    setCookies(!localStorage.getItem("gitex-cookie-choice"));
    return()=>{clearTimeout(promoTimer);io.disconnect()};
  },[]);
  const closePromo=()=>{sessionStorage.setItem("gitex-promo","seen");setPromo(false)};
  const cookieChoice=(choice:string)=>{localStorage.setItem("gitex-cookie-choice",choice);setCookies(false)};
  return <>
    {promo&&<div className="promo-backdrop" role="dialog" aria-modal="true" aria-label="GITEX factsheet"><div className="promo-modal"><button onClick={closePromo} aria-label="Close">×</button><p>{locale==="en"?"GITEX AI KAZAKHSTAN 2026":"GITEX AI KAZAKHSTAN 2026"}</p><h2>{locale==="en"?"SEE THE IMPACT":"ОЦЕНИТЕ МАСШТАБ"}</h2><span>{locale==="en"?"Explore the show success factsheet and prepare for 2027.":"Изучите итоги выставки и начните подготовку к 2027 году."}</span><a href="#factsheet" onClick={closePromo}>{locale==="en"?"DOWNLOAD FACTSHEET":"СКАЧАТЬ ОТЧЁТ"}</a></div></div>}
    {cookies&&<div className="cookie-banner"><div><b>{locale==="en"?"YOUR PRIVACY CHOICES":"НАСТРОЙКИ КОНФИДЕНЦИАЛЬНОСТИ"}</b><p>{locale==="en"?"This mockup uses only essential storage to remember your preferences.":"Этот макет использует только необходимые данные для сохранения ваших настроек."}</p>{settings&&<small>{locale==="en"?"Analytics and advertising cookies are disabled.":"Аналитические и рекламные cookie отключены."}</small>}</div><div><button onClick={()=>setSettings(!settings)}>{locale==="en"?"SETTINGS":"НАСТРОЙКИ"}</button><button onClick={()=>cookieChoice("rejected")}>{locale==="en"?"REJECT":"ОТКЛОНИТЬ"}</button><button className="accept" onClick={()=>cookieChoice("accepted")}>{locale==="en"?"ACCEPT":"ПРИНЯТЬ"}</button></div></div>}
  </>;
}
