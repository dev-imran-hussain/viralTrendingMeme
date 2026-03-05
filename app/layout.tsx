import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 👇 1. Vercel ke tools import kiye
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👇 2. Default hatakar tera asli Brand Name aur SEO description daal diya!
export const metadata: Metadata = {
  title: "ViralTrendingMeme - Unlimited Laughs & Daily Memes",
  description: "The internet's best collection of funny videos, dank photos, dark humor, and viral trends. Updated every single day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* 👇 3. Analytics aur Speed Insights yahan add kar diye */}
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}