import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero, ServiceHighlight, ServiceData } from "@/components/sections/ServiceSections";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Бродски транспорт | Kontrans",
  description: "Глобален контејнерски транспорт со сигурни партнери и пристанишни услуги.",
};

const seaFeatures = [
  "Организација на FCL & LCL транспорт",
  "Пристанишни услуги и манипулација",
  "Директен превоз до краен примач",
  "Комбиниран мултимодален транспорт"
];

const seaData = [
  { label: "Годишен волумен", value: "24,000+ TEU" },
  { label: "Регионални пристаништа", value: "12 Главни центри" },
  { label: "Транзитно време (EU)", value: "2-5 дена" },
  { label: "Глобални рути", value: "6 Континенти" }
];

export default function SeaTransportPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <ServiceHero 
        number="001"
        eyebrow="ПОМОРСКИ ТРАНСПОРТ"
        title="Контејнерски бродски"
        accent="транспорт"
        description="Во соработка со водечки бродски компании (MSC, OOCL, Cosco, Maersk) нудиме услуга преку сите регионални пристаништа."
        imageSrc="/sea_freight_hero.png"
      />

      <ServiceHighlight 
        title="Глобално поврзување без компромис."
        description="Организираме транспорт со избор од повеќе превозници за да ги оптимизираме трошоците и времето, обезбедувајќи максимална флексибилност."
        features={seaFeatures}
        imageSrc="/sea_detail.png"
      />

      <ServiceData 
        title="Бродски Капацитети"
        items={seaData}
      />

      <Contact />
      <Footer />
    </main>
  );
}
