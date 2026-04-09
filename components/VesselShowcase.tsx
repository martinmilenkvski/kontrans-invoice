"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FLEET_ITEMS = [
  {
    id: "01",
    label: "ПОМОРСКА СИЛА",
    title: "Triple-E \nClass Vessel.",
    desc: "Максимална ефикасност преку глобалните морски патишта. Капацитет од 18,000 TEU за вашите најголеми амбиции.",
    image: "/fleet_ocean_cinematic.png",
    accent: "океанска сила"
  },
  {
    id: "02",
    label: "КОПНЕНА ЛОГИСТИКА",
    title: "Scania R-500 \nHeavy Duty.",
    desc: "Сигурност и брзина на европските патишта. Најновата генерација на Scania возила оптимизирани за долги релации.",
    image: "/fleet_land_cinematic.png",
    accent: "копнена прецизност"
  },
  {
    id: "03",
    label: "СТРАТЕШКИ ЈАЗЕЛ",
    title: "Terminal \nArchitecture.",
    desc: "Интегрирани логистички центри низ цела Европа. Побрза обработка и сигурно складирање на вашиот товар.",
    image: "/gallery-1.png",
    accent: "стратешки фокус"
  },
  {
    id: "04",
    label: "ГЛОБАЛЕН ДОФАТ",
    title: "Across the \nContinents.",
    desc: "Вашиот товар нема граници. Со нашата мрежа, светот станува една добро поврзана целина.",
    image: "/about-ship.png",
    accent: "без граници"
  }
];

export function VesselShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".vessel-panel");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => `+=${containerRef.current?.offsetWidth}`,
      }
    });

    tl.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
    });

    // Progress Bar Animation
    tl.to("#vessel-progress", {
        width: "100%",
        ease: "none"
    }, 0);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#080808]">
      <div ref={containerRef} className="flex h-screen w-[400vw] will-change-transform">
        {FLEET_ITEMS.map((item, i) => (
          <div 
            key={i} 
            className="vessel-panel relative w-screen h-full flex items-center justify-center flex-shrink-0 px-8 lg:px-16"
          >
            {/* Background Metadata */}
            <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-20">
                <span className="font-mono text-[0.6rem] tracking-[0.5em] text-white uppercase">{item.label} // (FLEET_ID_{item.id})</span>
                <span className="font-mono text-[0.6rem] tracking-[0.5em] text-[#D42B2B] uppercase">СТАТУС: ЦЕЛОСНО_ОПЕРАТИВНО</span>
            </div>

            <div className="relative z-10 w-full max-w-[1700px] h-[70vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Image Section */}
              <div className="lg:col-span-7 relative h-full overflow-hidden group border border-white/5">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="v-img object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-40" />
                
                {/* Number Overlay */}
                <div className="absolute bottom-4 right-8 font-sans text-9xl font-black text-white/5 tracking-tighter select-none">
                    {item.id}
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-12">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[0.6rem] text-[#D42B2B] tracking-[0.5em] uppercase font-black">
                    Единица на флота // {item.id}
                  </span>
                  <h2 className="v-title font-sans text-[clamp(2.5rem,5vw,5.5rem)] text-white leading-[0.85] tracking-tighter uppercase font-medium whitespace-pre-line">
                    {item.title.split('\n')[0]} <br />
                    <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] font-normal lowercase">{item.accent}.</span>
                  </h2>
                </div>
                
                <p className="font-[family-name:var(--font-jost)] text-lg text-white/50 leading-relaxed max-w-md">
                   {item.desc}
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                   <div className="flex flex-col gap-1">
                      <span className="font-mono text-[0.5rem] tracking-widest text-white/30 uppercase">Капацитет</span>
                      <span className="font-sans text-xl font-bold text-white tracking-widest uppercase italic">Супериорен</span>
                   </div>
                   <div className="w-px h-10 bg-white/10" />
                   <div className="flex flex-col gap-1 text-right">
                      <span className="font-mono text-[0.5rem] tracking-widest text-white/30 uppercase">Логистичко ниво</span>
                      <span className="font-sans text-xl font-bold text-white tracking-widest uppercase italic">Глобално A+</span>
                   </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Bar Container */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-white/10 overflow-hidden">
         <div id="vessel-progress" className="h-full bg-[#D42B2B] w-0" />
      </div>
    </section>
  );
}
