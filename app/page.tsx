import { Hero } from "@/components/Hero";
import { MissionStatement } from "@/components/MissionStatement";
import { Services } from "@/components/Services";
import { LogosMarquee } from "@/components/LogosMarquee";

import { Commitment } from "@/components/Commitment";
import { AboutSection } from "@/components/AboutSection";
import { VideoPortal } from "@/components/VideoPortal";

import { StrategicPillars } from "@/components/StrategicPillars";
import { InfrastructureGridWhitespace } from "@/components/InfrastructureGridWhitespace";

import { TechnicalAnatomy } from "@/components/TechnicalAnatomy";
import { AboutTeam } from "@/components/AboutTeam";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-clip">


      {/* ── PHASE 1: ENTRY ── */}
      <Hero />
      <MissionStatement />
      <Services />
      <LogosMarquee />

      {/* ── PHASE 2: IDENTITY ── */}
      <Commitment />
      <div className="hidden lg:block">
        <VideoPortal />
      </div>
      <AboutTeam />


      {/* ── PHASE 3: LOGIC ── */}
      <StrategicPillars />
      {/* <InfrastructureGridWhitespace /> */}

      {/* ── PHASE 4: PROOF & CLOSURE ── */}
      {/* <TechnicalAnatomy /> */}
      <FAQ />
      <Contact />

      <Footer />
    </main>
  );
}

