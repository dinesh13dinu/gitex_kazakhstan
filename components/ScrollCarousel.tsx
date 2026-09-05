"use client";
import { ReactNode, useRef } from "react";
export function ScrollCarousel({children,className=""}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null); const move=(n:number)=>ref.current?.scrollBy({left:n*ref.current.clientWidth*.72,behavior:"smooth"});
 return <div className={`carousel-shell ${className}`}><button className="carousel-prev" onClick={()=>move(-1)} aria-label="Previous">←</button><div className="carousel-track" ref={ref}>{children}</div><button className="carousel-next" onClick={()=>move(1)} aria-label="Next">→</button></div>;
}
