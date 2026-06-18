"use client";

import { Footer } from "@/components/layout/Footer";
import {
  AboutHero,
  AboutHistory,
  AboutValues,
  AboutFlexibility
} from "@/components/sections/AboutSections";

export function AboutContent() {
  return (
    <main 
      className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30"
      style={{ "--grid-line-color": "rgba(0, 0, 0, 0.05)" } as React.CSSProperties}
    >


      <AboutHero />
      <AboutHistory />
      <AboutValues />
      <AboutFlexibility />

      <Footer />
    </main>
  );
}
