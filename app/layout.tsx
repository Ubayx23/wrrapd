import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "wrrapd | Coming Soon",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,300;0,400..900;1,400..900&family=Poppins:wght@300;400;600;700&family=Space+Grotesk:wght@700&family=Syne:wght@400..800&family=Outfit:wght@400..700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning prevents browser extensions from causing hydration errors */}
      <body className="font-poppins" suppressHydrationWarning>{children}</body>
    </html>
  );
}
