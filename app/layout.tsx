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
        {/* Global Swiss-Brutalist Grid Structure */}
        <div className="pointer-events-none fixed inset-0 z-[-1] flex justify-center opacity-10">
          <div className="w-full max-w-[1600px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 h-full gap-0 border-x border-white">
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="h-full border-r border-white hidden lg:block last:border-r-0" />
             ))}
          </div>
        </div>

        <PreloaderProvider>
          <Header />
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
        </PreloaderProvider>
      </body>

    </html>
  );
}
