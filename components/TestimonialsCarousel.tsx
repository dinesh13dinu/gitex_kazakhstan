"use client";
import { useEffect, useState } from "react";

type Testimonial={quote:string;name:string;role:string;company:string;logo:string;image:string};
export function TestimonialsCarousel({items}:{items:Testimonial[]}){
  const [active,setActive]=useState(Math.max(0,items.length-1));
  useEffect(()=>{if(items.length<2)return;const timer=setInterval(()=>setActive(v=>(v+1)%items.length),6500);return()=>clearInterval(timer)},[items.length]);
  if(!items.length)return null;
  const move=(step:number)=>setActive(v=>(v+step+items.length)%items.length);
  return <div className="praise-carousel">
    <div className="praise-deck">{items.map((item,i)=>{
      const delta=(i-active+items.length)%items.length;
      const state=delta===0?"active":delta===1?"next":delta===items.length-1?"prev":"hidden";
      return <blockquote className={`praise-card ${state}`} aria-hidden={state!=="active"} key={`${item.name}-${i}`}>
        <div className="praise-copy"><div><div className="praise-mark"><span>“</span><i/></div><p>{item.quote}</p></div><footer><b>{item.name}</b><span>{item.role}{item.company?` · ${item.company}`:""}</span>{item.logo&&<img src={item.logo} alt={item.company}/>}</footer></div>
        <div className="praise-person"><div className="orbit"><img src={item.image} alt={item.name}/><i/><i/></div></div>
      </blockquote>})}</div>
    <div className="praise-controls"><button onClick={()=>move(-1)} aria-label="Previous testimonial">‹</button><button onClick={()=>move(1)} aria-label="Next testimonial">›</button></div>
  </div>
}
