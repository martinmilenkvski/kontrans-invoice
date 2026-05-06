import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero, ServiceHighlight, ServiceData } from "@/components/sections/ServiceSections";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Авионски транспорт | Kontrans",
  description: "Најбрз и најсигурен авионски карго транспорт до секоја дестинација во светот.",
};

const airFeatures = [
  "Експресни карго пратки",
  "Врата до врата (DDU/DDP)",
  "Специјален транспорт на вредна стока",
  "Следење во реално време"
];

const airData = [
  { label: "Просечно време", value: "24-72 часа" },
  { label: "Аеродромски мрежи", value: "220+ Градови" },
  { label: "Дневни летови", value: "15+ Главни рути" },
  { label: "Сигурност", value: "99.9% Безбедност" }
];

export default function AirTransportPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <ServiceHero 
        number="002"
        eyebrow="АВИОНСКИ ТРАНСПОРТ"
        title="Најбрза глобална"
        accent="испорака"
        description="Кога времето е критично, Контранс обезбедува директни авионски рути кои ги поврзуваат вашите производи со глобалните пазари."
        imageSrc="/air_freight_hero.png"
      />

      <ServiceHighlight 
        title="Брзина која ја дефинира иднината."
        description="Нудиме комплетно управување со авионски карго пратки, вклучувајќи царинско посредување и експресна достава до крајната дестинација."
        features={airFeatures}
        imageSrc="/air_detail.png"
      />

      <ServiceData 
        title="Авионски Капацитети"
        items={airData}
      />

      <Contact />
      <Footer />
    </main>
  );
}
