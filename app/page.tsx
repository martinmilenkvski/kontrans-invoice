import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark overflow-hidden">
      <Header />
      <Hero />
      <Services />
      <Stats />
    </main>
  );
}
