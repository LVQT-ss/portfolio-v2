import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, hero } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";

// Self-hosted fonts (faster + no Google Fonts request at runtime or build)
const dmSans = localFont({
  src: "./fonts/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 900",
});

const dmSerif = localFont({
  src: "./fonts/dm-serif-display-latin-400-normal.woff2",
  variable: "--font-dm-serif",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — SaaS, Marketplace & Booking Platform Developer`,
    template: `%s — ${site.name}`,
  },
  description: hero.intro,
  keywords: [
    "full-stack developer",
    "SaaS developer",
    "marketplace developer",
    "booking system developer",
    "NestJS",
    "Next.js",
    "React Native",
  ],
  openGraph: {
    title: `${site.name} — SaaS, Marketplace & Booking Platform Developer`,
    description: hero.intro,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — SaaS, Marketplace & Booking Platform Developer`,
    description: hero.intro,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
