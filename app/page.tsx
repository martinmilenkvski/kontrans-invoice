import { Hero } from "@/components/sections/Hero";
import { MissionStatement } from "@/components/sections/MissionStatement";
import { Services } from "@/components/sections/Services";
import { LogosMarquee } from "@/components/sections/LogosMarquee";

import { Commitment } from "@/components/sections/Commitment";
import { VideoPortal } from "@/components/sections/VideoPortal";

import { StrategicPillars } from "@/components/sections/StrategicPillars";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

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
      {/* <StrategicPillars /> */}
      <AboutTeam />

      {/* ── PHASE 3: LOGIC ── */}

      {/* <InfrastructureGridWhitespace /> */}

      {/* ── PHASE 4: PROOF & CLOSURE ── */}
      {/* <TechnicalAnatomy /> */}
      <FAQ />
      <Contact />

      <Footer />
    </main>
  );
}

