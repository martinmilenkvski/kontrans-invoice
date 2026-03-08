import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] overflow-hidden">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
