import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogosMarquee } from "@/components/LogosMarquee";
import { Commitment } from "@/components/Commitment";
import { Services } from "@/components/Services";
import { VideoPortal } from "@/components/VideoPortal";
import { TechnicalAnatomy } from "@/components/TechnicalAnatomy";
import { GlobalCoverage } from "@/components/GlobalCoverage";
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
      <TechnicalAnatomy />
      <GlobalCoverage />
      <Contact />
      <Footer />
    </main>
  );
}
