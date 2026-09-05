import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import { loginAction } from "@/app/actions";

export const dynamic="force-dynamic";
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){
  if(await currentAdmin()) redirect("/admin"); const {error}=await searchParams;
  return <main className="login"><form action={loginAction}><p className="eyebrow">GITEX CMS</p><h1>Editor login</h1>{error&&<p className="error">Invalid email or password.</p>}<label>Email</label><input name="email" type="email" required autoComplete="username"/><label>Password</label><input name="password" type="password" required autoComplete="current-password"/><button className="save">SIGN IN</button></form></main>;
}
