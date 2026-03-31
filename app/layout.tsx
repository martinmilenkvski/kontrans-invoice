import type { Metadata } from "next";
import { Jost, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Kontrans - Transport and Shipping",
  description: "Вашиот товар. Нашата одговорност.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <body
        className={`${jost.variable} ${spaceGrotesk.variable} antialiased bg-[#080808] text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
