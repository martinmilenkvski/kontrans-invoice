import { Ship, Plane, Truck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FadeIn, StaggerGroup, RevealLine } from "./Animations";

export function Services() {
  const services = [
    {
      id: "01",
      title: "БРОДСКИ ТРАНСПОРТ",
      icon: <Ship className="w-10 h-10 text-[#D42B2B]" strokeWidth={1.5} />,
      description: "Најоптимално решение за транспорт на големи количини стока ширум светот со загарантирана безбедност.",
      bullets: [
        "FCL/LCL контејнери",
        "Царинско чистење",
        "Азиски пазар",
        "Транзит Солун",
      ],
    },
    {
      id: "02",
      title: "АВИОНСКИ ТРАНСПОРТ",
      icon: <Plane className="w-10 h-10 text-[#D42B2B]" strokeWidth={1.5} />,
      description: "Кога времето е од клучно значење, нашиот авионски транспорт нуди најбрза испорака до било која дестинација.",
      bullets: [
        "Експресна достава",
        "Меѓународни аеродроми",
        "Деликатни пратки",
        "Карго чартери",
      ],
    },
    {
      id: "03",
      title: "КАМИОНСКИ ТРАНСПОРТ",
      icon: <Truck className="w-10 h-10 text-[#D42B2B]" strokeWidth={1.5} />,
      description: "Флексибилна и директна достава преку развиена патна мрежа која ги поврзува пазарите ефикасно и навремено.",
      bullets: [
        "Дистрибуција МКД",
        "Дневни линии Балкан",
        "Full Truck Load (FTL)",
        "Tracking во живо",
      ],
      hasButton: true,
    },
  ];

  return (
    <section id="services" className="bg-[#F4F4F5] border-t border-black/10 relative overflow-hidden">

      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,400px)] border-b border-black/10">
          
          {/* Main Title Area */}
          <div className="p-10 md:p-16 lg:p-24 lg:border-r border-black/10 flex flex-col justify-center bg-[#FAFAFA]">
            
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
                </span>
                <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  Што правиме
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-[#111111] leading-[1.05] tracking-tight mb-8">
                Три начини да стигне
                <br />
                вашата{" "}
                <span className="text-[#D42B2B] italic pr-2 font-[family-name:var(--font-caveat)]">пратка.</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
                Модерниот бизнис знае дека не купуваме само транспорт, ние купуваме сигурност. Затоа го ставаме креативниот процес во фокус за да ви овозможиме простор да се покажете не само што правите, туку кои сте.
              </p>
            </FadeIn>
          </div>
          
          {/* Empty Space / Future content */}
          <div className="hidden lg:block bg-[#EBEBEC]"></div>

        </div>

        {/* Services Columns Area */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
          
          {services.map((service, index) => (
            <FadeIn 
              key={service.id}
              className={`group p-10 md:p-12 border-b lg:border-b-0 border-black/10 flex flex-col hover:bg-white transition-colors duration-500 bg-[#F4F4F5] ${index < 3 ? 'lg:border-r' : ''} relative`}
            >
              {index < 3 && <RevealLine horizontal={false} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[1px] bg-black/10" />}
              
              {/* Step Circle & Icon */}
              <div className="flex items-center justify-between mb-10 w-full">
                <div className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center shadow-sm">
                  <span className="text-[#111111] font-bold text-sm tracking-widest">{service.id}</span>
                </div>
                <div className="transform group-hover:scale-110 transition-transform duration-500 origin-right">
                  {service.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-[#111111] font-bold text-2xl tracking-wide uppercase mb-8 pr-4 leading-[1.2]">
                {service.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed mb-12 flex-grow font-medium">
                {service.description}
              </p>

              {/* Separator */}
              <div className="w-full h-[1px] bg-black/10 mb-8"></div>

              {/* Bullet Points */}
              <ul className="flex flex-col gap-4 mb-12 font-semibold">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-500 hover:text-[#111111] transition-colors">
                    <span className="text-[#D42B2B] text-xs font-bold mt-[4px]">■</span>
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button - Ghost Button style from design system */}
              {service.hasButton && (
                <button className="mt-auto flex items-center justify-between w-full bg-white border border-black/10 hover:border-black/30 hover:shadow-md text-[#111111] font-bold p-5 rounded-lg transition-all duration-300 group/btn">
                  <span className="uppercase tracking-widest text-sm">Побарај понуда</span>
                  <ArrowRight className="w-5 h-5 text-[#D42B2B] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </FadeIn>
          ))}

          {/* 4th Column: Image */}
          <FadeIn className="relative h-[600px] lg:h-auto min-h-[500px] hidden lg:block overflow-hidden border-black/10 group bg-black" direction="left">
            <div className="absolute inset-0 bg-[#D42B2B]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <Image
              src="/services-cinematic.png"
              alt="Logistics Operations"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 contrast-125"
              quality={90}
            />
          </FadeIn>

        </StaggerGroup>
        
      </div>
    </section>
  );
}
