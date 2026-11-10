import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
export const metadata: Metadata = { title:"TalentIQ AI | Intelligent Hiring", description:"Recruitment workspace design prototype" };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>}
