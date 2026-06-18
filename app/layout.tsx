import type { Metadata } from "next";
import { Jost, Space_Grotesk, Caveat } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { PreloaderProvider } from "@/lib/PreloaderContext";
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

const signature = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kontrans | Premium Logistics & Global Transport Solutions",
  description: "Experience excellence in global logistics with Kontrans. Specialized in sea, air, and road transport with a focus on reliability and precision. Вашиот товар. Нашата одговорност.",
  keywords: ["logistics", "transport", "shipping", "Kontrans", "global freight", "Macedonia logistics"],
  authors: [{ name: "Kontrans" }],
  icons: {
    icon: "/kontrans-logo-white.svg",
    shortcut: "/kontrans-logo-white.svg",
    apple: "/kontrans-logo-white.svg",
  },
  openGraph: {
    title: "Kontrans | Premium Logistics Solutions",
    description: "Reliable global transport solutions by sea, air, and road.",
    url: "https://kontrans.mk",
    siteName: "Kontrans",
    locale: "mk_MK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <body
        className={`${jost.variable} ${spaceGrotesk.variable} ${signature.variable} antialiased bg-background text-white`}
      >


        <PreloaderProvider>
          <Header />
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
        </PreloaderProvider>
      </body>

    </html>
  );
}
