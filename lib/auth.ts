import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";

const COOKIE = "gitex_admin_session";

function decode(value: string) { return Uint8Array.from(atob(value), c => c.charCodeAt(0)); }

export async function verifyPassword(password: string, encoded: string) {
  const [scheme, rounds, salt, expected] = encoded.split("$");
  if (scheme !== "pbkdf2_sha256" || !rounds || !salt || !expected) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: decode(salt), iterations: Number(rounds) }, key, 256);
  const actual = new Uint8Array(bits); const wanted = decode(expected);
  if (actual.length !== wanted.length) return false;
  let mismatch = 0; for (let i = 0; i < actual.length; i++) mismatch |= actual[i] ^ wanted[i];
  return mismatch === 0;
}

export async function createSession(userId: number) {
  const id = crypto.randomUUID()+crypto.randomUUID();
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000);
  await (await db()).prepare("INSERT INTO sessions(id,user_id,expires_at) VALUES(?,?,?)").bind(id,userId,expires.toISOString()).run();
  (await cookies()).set(COOKIE,id,{ httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"lax", path:"/", expires });
}

export async function currentAdmin() {
  const id = (await cookies()).get(COOKIE)?.value; if (!id) return null;
  return (await db()).prepare("SELECT admin_users.id,email FROM sessions JOIN admin_users ON admin_users.id=sessions.user_id WHERE sessions.id=? AND expires_at > ?").bind(id,new Date().toISOString()).first<{id:number,email:string}>();
}

export async function requireAdmin() { const user=await currentAdmin(); if(!user) redirect("/admin/login"); return user; }

export async function destroySession() { const jar=await cookies(); const id=jar.get(COOKIE)?.value; if(id) await (await db()).prepare("DELETE FROM sessions WHERE id=?").bind(id).run(); jar.delete(COOKIE); }
