import { Ship, Plane, Truck, ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <section id="services" className="bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Subtle red radial glow background element from Design System */}
      <div className="absolute z-0 top-[20%] right-[10%] w-[40%] h-[40%] bg-[#D42B2B] rounded-full blur-[150px] opacity-[0.15] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,400px)] border-b border-white/10">
          
          {/* Main Title Area */}
          <div className="p-10 md:p-16 lg:p-24 lg:border-r border-white/10 flex flex-col justify-center">
            
            {/* Eyebrow Label with Ping Dot */}
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
              </span>
              <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                Што правиме
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight mb-12 max-w-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Три начини да стигне
              </span>
              <br />
              <span className="text-white">вашата</span>{" "}
              <span className="text-[#D42B2B] italic pr-2">пратка</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Модерниот бизнис знае дека не купуваме само транспорт, ние купуваме сигурност. Затоа го ставаме креативниот процес во фокус за да ви овозможиме простор да се покажете не само што правите, туку кои сте.
            </p>
          </div>
          
          {/* Empty Space / Future content */}
          <div className="hidden lg:block bg-[#111111]"></div>

        </div>

        {/* Services Columns Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`group p-10 md:p-12 border-b lg:border-b-0 border-white/10 flex flex-col hover:bg-white/[0.02] transition-colors duration-500 ${index < 3 ? 'lg:border-r' : ''}`}
            >
              
              {/* Step Circle & Icon */}
              <div className="flex items-center justify-between mb-10 w-full">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-medium tracking-widest">{service.id}</span>
                </div>
                <div className="transform group-hover:scale-110 transition-transform duration-500 origin-right">
                  {service.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-white font-bold text-2xl tracking-wide uppercase mb-8 pr-4 leading-[1.2]">
                {service.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-base leading-relaxed mb-12 flex-grow">
                {service.description}
              </p>

              {/* Separator */}
              <div className="w-full h-[1px] bg-white/10 mb-8"></div>

              {/* Bullet Points */}
              <ul className="flex flex-col gap-4 mb-12 font-medium">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-400 hover:text-gray-300 transition-colors">
                    <span className="text-[#D42B2B] text-xs font-bold mt-[4px]">■</span>
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button - Ghost Button style from design system */}
              {service.hasButton && (
                <button className="mt-auto flex items-center justify-between w-full bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-white font-medium p-5 rounded-lg transition-all duration-300 group/btn">
                  <span className="uppercase tracking-widest text-sm">Побарај понуда</span>
                  <ArrowRight className="w-5 h-5 text-[#D42B2B] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          ))}

          {/* 4th Column: Image */}
          <div className="relative h-[600px] lg:h-auto min-h-[500px] p-6 lg:p-10 bg-[#080808] hidden lg:block overflow-hidden">
            <div className="relative w-full h-full overflow-hidden border border-white/5 rounded-2xl group">
               {/* Design system note: Images on dark aesthetic are usually high contrast/subtle tint */}
               <div className="absolute inset-0 bg-[#D42B2B]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Image
                src="/hero-bg-2.jpg"
                alt="Logistics Operations"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                quality={90}
              />
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
