import type { Metadata } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import ThreadCursor from "@/components/ui/ThreadCursor";
import { meta } from "@/content/site";
import { pngSize } from "@/lib/image";
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

const ogSize = pngSize(meta.ogImage);

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "/",
    siteName: meta.title,
    type: "website",
    images: [{ url: meta.ogImage, ...ogSize, alt: meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${figtree.variable}`}>
      <body className="bg-bg font-body text-ink antialiased" suppressHydrationWarning>
        {children}
        <ThreadCursor />
      </body>
    </html>
  );
}
