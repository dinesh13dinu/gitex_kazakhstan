"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, requireAdmin, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";

function text(form: FormData, key: string) { return String(form.get(key) ?? "").trim(); }

export async function loginAction(form: FormData) {
  const email=text(form,"email"), password=text(form,"password");
  const user=await (await db()).prepare("SELECT id,password_hash FROM admin_users WHERE email=? COLLATE NOCASE").bind(email).first<{id:number,password_hash:string}>();
  if (!user || !(await verifyPassword(password,user.password_hash))) redirect("/admin/login?error=invalid");
  await createSession(user.id); redirect("/admin");
}

export async function logoutAction() { await destroySession(); redirect("/admin/login"); }

export async function saveSiteSettings(form: FormData) {
  await requireAdmin();
  await (await db()).prepare("UPDATE site_settings SET site_name_en=?,site_name_ru=?,event_dates_en=?,event_dates_ru=?,venue_en=?,venue_ru=?,city_en=?,city_ru=?,country_en=?,country_ru=?,footer_blurb_en=?,footer_blurb_ru=?,updated_at=CURRENT_TIMESTAMP WHERE id=1")
    .bind(...["site_name_en","site_name_ru","event_dates_en","event_dates_ru","venue_en","venue_ru","city_en","city_ru","country_en","country_ru","footer_blurb_en","footer_blurb_ru"].map(k=>text(form,k))).run();
  revalidatePath("/", "layout"); redirect("/admin?status=saved");
}

export async function saveHero(form: FormData) {
  await requireAdmin();
  await (await db()).prepare("UPDATE hero SET eyebrow_en=?,eyebrow_ru=?,title_en=?,title_ru=?,subtitle_en=?,subtitle_ru=?,countdown_target=?,patronage_line_en=?,patronage_line_ru=?,updated_at=CURRENT_TIMESTAMP WHERE id=1")
    .bind(...["eyebrow_en","eyebrow_ru","title_en","title_ru","subtitle_en","subtitle_ru","countdown_target","patronage_line_en","patronage_line_ru"].map(k=>text(form,k))).run();
  revalidatePath("/", "layout"); redirect("/admin?status=saved");
}

const collectionConfig = {
  stats:{table:"stats",fields:["value","label_en","label_ru","suffix","sort_order"]},
  highlights:{table:"highlights",fields:["title_en","title_ru","body_en","body_ru","video_embed_url","gallery_images_json","factsheet_file_url"],singleton:true},
  programmes:{table:"programmes",fields:["slug","title_en","title_ru","body_en","body_ru","image_url","cta_label_en","cta_label_ru","cta_href","sort_order"]},
  speakers:{table:"speakers",fields:["name_en","name_ru","title_en","title_ru","org_en","org_ru","country_en","country_ru","photo_url","bio_en","bio_ru","sort_order"]},
  testimonials:{table:"testimonials",fields:["quote_en","quote_ru","name_en","name_ru","role_en","role_ru","company_en","company_ru","logo_url","sort_order"]},
  sponsor_tiers:{table:"sponsor_tiers",fields:["name_en","name_ru","sort_order"]},
  sponsor_logos:{table:"sponsor_logos",fields:["tier_id","name","image_url","href","sort_order"]},
  news:{table:"news_posts",fields:["slug","locale","title","excerpt","body_md","cover_url","published_at","seo_json"]},
  ctas:{table:"ctas",id:"key",fields:["key","title_en","title_ru","blurb_en","blurb_ru","external_form_url"],noDelete:true},
  seo:{table:"seo_defaults",fields:["title_template_en","title_template_ru","description_en","description_ru","og_image"],singleton:true},
  page_sections:{table:"page_sections",fields:["section_key","title_en","title_ru","body_en","body_ru","items_json","sort_order"]},
} as const;

export async function saveCollection(form: FormData) {
  await requireAdmin();
  const key=text(form,"collection") as keyof typeof collectionConfig;
  const config=collectionConfig[key]; if(!config) throw new Error("Unsupported collection");
  let rows:Record<string,unknown>[]; try{rows=JSON.parse(text(form,"payload"))}catch{throw new Error("Invalid collection data")}
  if(!Array.isArray(rows)) throw new Error("Invalid collection data");
  const database=await db(); const statements=[]; const idField="id" in config&&config.id?config.id:"id";
  if("singleton" in config&&config.singleton){
    const row=rows[0]||{}; const values=config.fields.map(f=>String(row[f]??""));
    statements.push(database.prepare(`UPDATE ${config.table} SET ${config.fields.map(f=>`${f}=?`).join(",")} WHERE id=1`).bind(...values));
  } else {
    const ids=rows.map(r=>String(r[idField]??"")).filter(Boolean);
    if(!("noDelete" in config&&config.noDelete)) statements.push(ids.length?database.prepare(`DELETE FROM ${config.table} WHERE ${idField} NOT IN (${ids.map(()=>"?").join(",")})`).bind(...ids):database.prepare(`DELETE FROM ${config.table}`));
    for(const row of rows){
      const values=config.fields.map(f=>String(row[f]??"")); const id=String(row[idField]??"");
      if(id) statements.push(database.prepare(`UPDATE ${config.table} SET ${config.fields.map(f=>`${f}=?`).join(",")} WHERE ${idField}=?`).bind(...values,id));
      else statements.push(database.prepare(`INSERT INTO ${config.table} (${config.fields.join(",")}) VALUES (${config.fields.map(()=>"?").join(",")})`).bind(...values));
    }
  }
  if(statements.length) await database.batch(statements);
  revalidatePath("/", "layout"); redirect(`/admin?status=saved&collection=${key}`);
}
