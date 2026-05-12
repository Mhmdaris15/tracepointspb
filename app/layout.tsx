import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TracePoint SPB — Door to Door, Data to Door. A Field Report from St. Petersburg.",
  description:
    "Verified flyer distribution and web development in Saint Petersburg. GPS-stamped delivery, photographic proof, no middlemen. Bridging paper and data, district by district.",
  keywords: [
    "flyer distribution",
    "Saint Petersburg",
    "offline marketing",
    "verified delivery",
    "TracePoint",
    "web development",
  ],
  openGraph: {
    title: "TracePoint SPB — Door to Door, Data to Door",
    description:
      "Verified flyer distribution & web development in Saint Petersburg. Every door, on the record.",
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
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--paper)] text-[var(--ink)] font-sans">
        {children}
      </body>
    </html>
  );
}
