import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const headingFont = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "700", "800"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "LOVAPE",
  description: "LOVAPE - Bien vaper - mieux vaper"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}

