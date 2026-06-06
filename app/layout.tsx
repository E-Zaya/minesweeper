import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "地雷 · Minesweeper",
  description: "Wa-modern neumorphic minesweeper",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${notoSerifJP.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
