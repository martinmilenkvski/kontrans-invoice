import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { LogosMarquee } from "@/components/LogosMarquee";

import { Commitment } from "@/components/Commitment";
import { AboutSection } from "@/components/AboutSection";
import { VideoPortal } from "@/components/VideoPortal";

import { StrategicPillars } from "@/components/StrategicPillars";
import { InfrastructureGridWhitespace } from "@/components/InfrastructureGridWhitespace";

import { TechnicalAnatomy } from "@/components/TechnicalAnatomy";
import { AboutTeam } from "@/components/AboutTeam";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] overflow-x-clip">


      {/* ── PHASE 1: ENTRY ── */}
      <Hero />
      <Services />
      <LogosMarquee />

      {/* ── PHASE 2: IDENTITY ── */}
      <Commitment />
      <VideoPortal />
      <AboutTeam />


      {/* ── PHASE 3: LOGIC ── */}
      <StrategicPillars />
      {/* <InfrastructureGridWhitespace /> */}

      {/* ── PHASE 4: PROOF & CLOSURE ── */}
      {/* <TechnicalAnatomy /> */}


      <Footer />
    </main>
  );
}

