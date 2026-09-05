"use client";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({value,suffix}:{value:string;suffix:string}) {
  const target=Number(value), ref=useRef<HTMLElement>(null), [shown,setShown]=useState(0);
  useEffect(()=>{const node=ref.current;if(!node||!Number.isFinite(target))return;let frame=0;const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;observer.disconnect();const start=performance.now();const tick=(now:number)=>{const progress=Math.min((now-start)/1700,1);setShown(Math.round(target*(1-Math.pow(1-progress,3))));if(progress<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)},{threshold:.3});observer.observe(node);return()=>{observer.disconnect();cancelAnimationFrame(frame)}},[target]);
  return <strong ref={ref}>{shown.toLocaleString("en-US").replaceAll(",","")}{suffix}</strong>;
}
