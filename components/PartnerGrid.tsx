export type PartnerItem={name:string;image:string;tier?:string};

function slug(value:string){return value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");}

export function PartnerGrid({sectionKey,title,items,id}:{sectionKey:string;title:string;items:PartnerItem[];id?:string}){
  return <section id={id} className={`logo-band ${sectionKey}`}>
    <h2>{title}</h2>
    <div className="partner-grid">
      {items.map(item=><article className={`partner-entry partner-${slug(item.name)}`} key={item.name}>
        {item.tier&&<small>{item.tier}</small>}
        <figure><img src={item.image} alt={item.name}/></figure>
      </article>)}
    </div>
  </section>;
}
