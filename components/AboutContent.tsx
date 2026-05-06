"use client";

import { Footer } from "@/components/Footer";
import {
  AboutHero,
  AboutHistory,
  AboutValues,
  AboutFlexibility
} from "@/components/AboutSections";

export function AboutContent() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30">


      <AboutHero />
      <AboutHistory />
      <AboutValues />
      <AboutFlexibility />

      <Footer />
    </main>
  );
}
