import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero, ServiceHighlight, ServiceData } from "@/components/sections/ServiceSections";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Камионски транспорт | Kontrans",
  description: "Сигурен камионски транспорт низ цела Европа со сопствен возен парк и партнерска мрежа.",
};

const roadFeatures = [
  "Комплетни камионски пратки (FTL)",
  "Збирен транспорт низ Европа (LTL)",
  "Транспорт на опасни материи (ADR)",
  "Термо-регулиран транспорт"
];

const roadData = [
  { label: "Возен парк", value: "85+ Возила" },
  { label: "Европски дестинации", value: "45+ Земји" },
  { label: "Годишна километража", value: "3.5M+ км" },
  { label: "Стандард", value: "EURO 6" }
];

export default function RoadTransportPage() {
  return (
    <main className="min-h-screen bg-white">
      
      
      <ServiceHero 
        number="003"
        eyebrow="КОПНЕН ТРАНСПОРТ"
        title="Европска логистичка"
        accent="мрежа"
        description="Со директни линии низ целиот континент, обезбедуваме сигурност и навремена испорака на секаков вид стока, од збирен до ADR транспорт."
        imageSrc="/road_freight_hero.png"
      />

      <ServiceHighlight 
        title="Вашиот партнер на патот."
        description="Нашата флексибилност ни овозможува да одговориме на најсложените барања за транспорт, користејќи модерна опрема и напредно следење на возилата."
        features={roadFeatures}
        imageSrc="/road_detail.png"
      />

      <ServiceData 
        title="Логистички Капацитети"
        items={roadData}
      />

      <Contact />
      <Footer />
    </main>
  );
}
