import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogosMarquee } from "@/components/LogosMarquee";
import { Commitment } from "@/components/Commitment";
import { Services } from "@/components/Services";
import { VideoPortal } from "@/components/VideoPortal";
import { GlobalCoverage } from "@/components/GlobalCoverage";
import { VesselShowcase } from "@/components/VesselShowcase";
import { OperationalGrid } from "@/components/OperationalGrid";
import { TechnicalAnatomy } from "@/components/TechnicalAnatomy";
import { OperationalHub } from "@/components/OperationalHub";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] overflow-x-clip">
      <Header />
      <Hero />
      <LogosMarquee />
      <Commitment />
      <Services />
      <VideoPortal />
      <GlobalCoverage />
      <TechnicalAnatomy />
      <OperationalHub />
      <Contact />
      <Footer />
    </main>
  );
}
