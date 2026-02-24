import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Sora } from "next/font/google";

import "./globals.css";
import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const fontHeading = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const fontUi = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap"
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "LOVAPE - Vape MTL responsable",
    template: "%s | LOVAPE"
  },
  description:
    "LOVAPE propose une selection e-liquides et materiel MTL, avec une approche responsable et sans marketing agressif.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "LOVAPE - Vape MTL responsable",
    description: "Selection MTL sobre et prise de commande accompagnee.",
    images: ["/og-image.svg"],
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fontHeading.variable} ${fontUi.variable} ${fontMono.variable}`}>
      <body className="font-ui antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieConsentBanner />
      </body>
    </html>
  );
}

