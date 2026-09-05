import type { Metadata } from "next";
import "./globals.css";
import "./parity.css";
import "./experience.css";
import "./final-parity.css";
import "./admin.css";

export const metadata: Metadata = { title: "GITEX AI Kazakhstan", description: "Powering the intelligence economy of Central Asia & the Caucasus" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>; }
