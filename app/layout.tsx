import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOVAPE",
  description: "LOVAPE - Bien vaper - mieux vaper"
};

const earlyPreferencesScript = `
(() => {
  try {
    const root = document.documentElement;
    const language = localStorage.getItem("lovape-language");
    if (language === "fr" || language === "en") {
      root.lang = language;
    }

    const theme = localStorage.getItem("lovape-theme");
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
      return;
    }

    root.setAttribute("data-theme", "dark");
    root.style.colorScheme = "dark";
  } catch {
    // Ignore storage access errors before hydration.
  }
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: earlyPreferencesScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
