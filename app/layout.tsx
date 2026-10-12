import type { Metadata } from "next";
import { Caveat, Figtree, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "wrrapd",
  description:
    "Untangle your mind. Free lessons on how your thoughts work, then take it to paper.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${figtree.variable} ${caveat.variable}`}
    >
      <body
        className="bg-[#f7efbd] text-[#1e2a3f] font-[family-name:var(--font-figtree)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
