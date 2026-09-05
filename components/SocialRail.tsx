type IconName="linkedin"|"instagram"|"threads"|"facebook"|"youtube"|"telegram"|"tiktok";

const links:{name:IconName;label:string;href:string}[]=[
  {name:"linkedin",label:"LinkedIn",href:"https://www.linkedin.com/company/gitexaikazakhstan/"},
  {name:"instagram",label:"Instagram",href:"https://www.instagram.com/gitexaikazakhstan/"},
  {name:"threads",label:"Threads",href:"https://www.threads.com/@gitexaikazakhstan"},
  {name:"facebook",label:"Facebook",href:"https://www.facebook.com/gitexaikazakhstan"},
  {name:"youtube",label:"YouTube",href:"https://www.youtube.com/@GITEXCENTRALASIACAUCASUS"},
  {name:"telegram",label:"Telegram",href:"https://t.me/gitexaikazakhstan"},
  {name:"tiktok",label:"TikTok",href:"https://www.tiktok.com/@gitexaicentralasia"},
];

function SocialIcon({name}:{name:IconName}){
  if(name==="linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 7.8H1.6V22h3.6V7.8ZM3.4 2A2.1 2.1 0 1 0 3.4 6.2 2.1 2.1 0 0 0 3.4 2ZM22.4 13.9c0-4.3-2.3-6.4-5.4-6.4-2.5 0-3.6 1.4-4.2 2.3v-2H9.2V22h3.6v-7c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8V22h3.6l1-8.1Z"/></svg>;
  if(name==="instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2"/><circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="2.2"/><circle cx="17.8" cy="6.3" r="1.25"/></svg>;
  if(name==="threads") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.7 8.5c-.8-3-2.7-4.5-5.8-4.5-4.4 0-7 3.1-7 8s2.6 8 7.2 8c4 0 6.7-2.1 6.7-5.2 0-2.5-2-4.1-5.1-4.1-2.8 0-4.6 1.3-4.6 3.3 0 1.7 1.3 2.8 3.2 2.8 3.4 0 5.5-2.8 5.5-6.4 0-1.5-.2-2.7-.7-3.7"/></svg>;
  if(name==="facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 22v-8h2.8l.4-3H14V9.1c0-.9.3-1.5 1.6-1.5h1.8V5a22 22 0 0 0-2.6-.2c-2.6 0-4.4 1.6-4.4 4.5V11H7.5v3h2.9v8H14Z"/></svg>;
  if(name==="youtube") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12c0 1.7.1 3.3.5 4.9a3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2c.4-1.6.5-3.2.5-4.9s-.1-3.3-.5-4.9ZM9.7 15.4V8.6l6 3.4-6 3.4Z"/></svg>;
  if(name==="telegram") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21.7 3.3-3.2 17.1c-.2 1.2-.9 1.5-1.9.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.4-.1-.6-.6-.2L6 14.2l-4.8-1.5c-1-.3-1-1 .2-1.5L20 4c.9-.3 1.7.2 1.7 1.3Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 2c.4 2.3 1.8 3.7 4.1 3.9v3.2a8.1 8.1 0 0 1-4.1-1.2v6.2a6.1 6.1 0 1 1-5.2-6v3.3a2.9 2.9 0 1 0 1.9 2.7V2h3.3Z"/></svg>;
}

export function SocialRail({label}:{label:string}){
  return <aside className="social-rail" aria-label={label}>{links.map(link=><a key={link.name} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer"><SocialIcon name={link.name}/></a>)}</aside>;
}
