"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export function SiteHeader({locale,logo}:{locale:"en"|"ru";logo:string}){
 const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>80);f();addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
 return <header className={`site-header ${scrolled?"is-scrolled":""}`}><img src={logo} alt="GITEX AI Kazakhstan"/><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Menu">☰</button><nav className={open?"is-open":""}><a href="#top">HOME</a><div className="nav-drop"><a href="#programmes">CONFERENCE <i/></a><div className="drop-menu"><a href="#speakers">Speakers</a><a href="#themes">Key Themes</a></div></div><div className="nav-drop"><a href="#exhibition">EXHIBITION <i/></a><div className="drop-menu"><a href="#exhibition">Enterprise</a><a href="#startup">Startups</a><a href="#sponsors">Sponsors & Exhibitors</a></div></div><div className="nav-drop"><a href="#investors">INVESTORS <i/></a><div className="drop-menu"><a href="#investors">Investor Programme</a><a href="#register">Get Involved</a><a href="#startup">VIP Executive Meeting</a></div></div><Link href={locale==="en"?"/ru":"/en"}>{locale==="en"?"RU":"EN"}</Link></nav></header>
}
