import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TracePoint SPB — Data-Driven Flyer Distribution in St. Petersburg",
  description:
    "Bridging the gap between physical flyer distribution and digital transparency. GPS-verified, photo-documented delivery across all districts of Saint Petersburg, Russia.",
  keywords: ["flyer distribution", "Saint Petersburg", "offline marketing", "verified delivery", "TracePoint"],
  openGraph: {
    title: "TracePoint SPB — Data-Driven Offline Marketing",
    description: "Verified flyer distribution with 100% transparency across St. Petersburg.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#080b14] text-slate-200">{children}</body>
    </html>
  );
}
