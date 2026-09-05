"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export function SiteHeader({locale,logo}:{locale:"en"|"ru";logo:string}){
 const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>80);f();addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
 return <header className={`site-header ${scrolled?"is-scrolled":""}`}><img src={logo} alt="GITEX AI Kazakhstan"/><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Menu">☰</button><nav className={open?"is-open":""}><a href="#top">HOME</a><div className="nav-drop"><a href="#programmes">CONFERENCE <i/></a><div className="drop-menu"><a href="https://www.gitexcac.com/speakers-2026">Speakers</a><a href="#themes">Key Themes</a></div></div><div className="nav-drop"><a href="#exhibition">EXHIBITION <i/></a><div className="drop-menu"><a href="#exhibition">Exhibiting Sectors</a><a href="https://www.gitexcac.com/supernova-pitch-competition">Supernova Pitch Competition</a><a href="https://events.mobi-hub.com/circular-tech-hub/gitexcac/">Circular Tech Hub</a></div></div><div className="nav-drop"><a href="https://www.gitexcac.com/investors">INVESTORS <i/></a><div className="drop-menu"><a href="https://www.gitexcac.com/investors">Investor Programme</a><a href="https://www.gitexcac.com/executive-meetings-programme">VIP Executive Meeting</a></div></div><Link href={locale==="en"?"/ru":"/en"}>{locale==="en"?"RU":"EN"}</Link></nav></header>
}
