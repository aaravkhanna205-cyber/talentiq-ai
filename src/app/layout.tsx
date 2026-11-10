import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { brand } from "@/lib/brand";
export const metadata: Metadata = { title:`${brand.fullName} | Recruiter Workspace`, description:"Hiring platform for Instant Mechanic" };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>}
