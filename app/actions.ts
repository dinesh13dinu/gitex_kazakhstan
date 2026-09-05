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
