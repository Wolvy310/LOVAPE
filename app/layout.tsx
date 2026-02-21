import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
