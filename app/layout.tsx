import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";
import "./globals.css";
import "./parity.css";
import "./experience.css";
import "./final-parity.css";
import "./admin.css";

export const metadata: Metadata = { metadataBase:new URL(siteUrl()), title:{default:"GITEX AI Kazakhstan",template:"%s | GITEX AI Kazakhstan"},description:"Powering the intelligence economy of Central Asia & the Caucasus",applicationName:"GITEX AI Kazakhstan",category:"technology",verification:{google:process.env.GOOGLE_SITE_VERIFICATION||undefined} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>; }
