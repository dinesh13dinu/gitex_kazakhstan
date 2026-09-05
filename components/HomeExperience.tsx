"use client";
import { useEffect, useState } from "react";

export function HomeExperience({locale}:{locale:"en"|"ru"}){
  const [promo,setPromo]=useState(false);const [cookies,setCookies]=useState(false); const [settings,setSettings]=useState(false);
  useEffect(()=>{
    const targets=document.querySelectorAll("main > section h2, main > section h3, main > section article, .gallery-strip img, .feature-panel>div");targets.forEach(el=>el.classList.add("micro-reveal"));
    const io=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle("is-visible",e.isIntersecting)),{threshold:.08});
    targets.forEach(el=>io.observe(el));
    const promoTimer=setTimeout(()=>{if(!sessionStorage.getItem("gitex-impact-poster"))setPromo(true)},700);
    setCookies(!localStorage.getItem("gitex-cookie-choice"));
    return()=>{clearTimeout(promoTimer);io.disconnect()};
  },[]);
  const cookieChoice=(choice:string)=>{localStorage.setItem("gitex-cookie-choice",choice);setCookies(false)};
  const closePromo=()=>{sessionStorage.setItem("gitex-impact-poster","seen");setPromo(false)};
  return <>
    {promo&&<div className="impact-backdrop" role="dialog" aria-modal="true" aria-label={locale==="en"?"2026 show success factsheet":"Отчёт об итогах выставки 2026"}><div className="impact-modal"><button autoFocus onClick={closePromo} aria-label={locale==="en"?"Close":"Закрыть"}>×</button><a href="https://event.gitexcac.com/SHOW-SUCCESS-FACTSHEET" target="_blank" rel="noreferrer"><img src="https://www.gitexcac.com/images/tmp_ab0c55c9-cb72-4191-b791-f61b747629b7.jpg" alt={locale==="en"?"See the impact — 2026 show success factsheet":"Итоги выставки 2026"}/></a></div></div>}
    {cookies&&<div className="cookie-banner"><div><b>{locale==="en"?"YOUR PRIVACY CHOICES":"НАСТРОЙКИ КОНФИДЕНЦИАЛЬНОСТИ"}</b><p>{locale==="en"?"This mockup uses only essential storage to remember your preferences.":"Этот макет использует только необходимые данные для сохранения ваших настроек."}</p>{settings&&<small>{locale==="en"?"Analytics and advertising cookies are disabled.":"Аналитические и рекламные cookie отключены."}</small>}</div><div><button onClick={()=>setSettings(!settings)}>{locale==="en"?"SETTINGS":"НАСТРОЙКИ"}</button><button onClick={()=>cookieChoice("rejected")}>{locale==="en"?"REJECT":"ОТКЛОНИТЬ"}</button><button className="accept" onClick={()=>cookieChoice("accepted")}>{locale==="en"?"ACCEPT":"ПРИНЯТЬ"}</button></div></div>}
  </>;
}
