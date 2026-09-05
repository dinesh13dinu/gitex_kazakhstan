import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "GITEX AI Kazakhstan", description: "Powering the intelligence economy of Central Asia & the Caucasus" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
