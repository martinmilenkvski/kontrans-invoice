"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  AboutHero, 
  AboutHistory, 
  AboutValues, 
  AboutFlexibility 
} from "@/components/AboutSections";
import { useEffect } from "react";
import Lenis from "lenis";

export function AboutContent() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30">
      <Header />
      
      <AboutHero />
      <AboutHistory />
      <AboutValues />
      <AboutFlexibility />
      
      <Footer />
    </main>
  );
}
