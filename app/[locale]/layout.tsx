import { notFound } from "next/navigation";
import { LocaleDocument } from "@/components/LocaleDocument";
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="en"&&locale!=="ru")notFound();return <><LocaleDocument locale={locale}/>{children}</>}
