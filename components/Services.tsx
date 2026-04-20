"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "./ui/KineticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceStacks = [
  {
    id: "001",
    label: "OCEAN",
    title: "Бродски\nтранспорт.",
    subtitle: "ПОЧНЕТЕ ТУКА",
    tags: ["FCL / LCL", "DDP", "HUB_GREECE"],
    desc: "Сеопфатен бродски транспорт со фокус на Азискиот и Европскиот пазар. Оптимизирани рути преку Солунското пристаниште за максимална ефикасност.",
    color: "bg-[#D42B2B]",
    textColor: "text-white",
    image: "/service_ocean_dark_cinematic_1775397818540.png"
  },
  {
    id: "002",
    label: "AIR",
    title: "Авионски\nтранспорт.",
    subtitle: "ЕКСПРЕСНА ДОСТАВА",
    tags: ["EXPRESS", "CHARTER", "DGR"],
    desc: "Кога брзината е императив. Експресна достава на деликатни и итни пратки преку најголемите светски авио-центтар.",
    color: "bg-[#111111]",
    textColor: "text-white",
    image: "/service_air_dark_cinematic_1775397835417.png"
  },
  {
    id: "003",
    label: "LAND",
    title: "Копнен\nтранспорт.",
    subtitle: "ДИРЕКТНА ЛИНИЈА",
    tags: ["FTL / LTL", "DISTRIBUTION", "GPS"],
    desc: "Развиена патна мрежа која ја поврзува Македонија и Балканот со цела Европа. Дистрибуција од врата до врата со целосен надзор.",
    color: "bg-[#D42B2B]",
    textColor: "text-white",
    image: "/service_land_dark_cinematic_1775397850992.png",
    isCTA: true, 
  }
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // 1. SECTION-LEVEL REVEAL (GSAP)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.from(".s-header-reveal", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.2
    });
  }, { scope: containerRef });

  // 2. SCROLL PROGRESS ENGINE
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      const scrolled = -top;
      
      if (scrollableDistance > 0) {
        const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        setProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalTransitions = serviceStacks.length - 1;
  const cardProgress = progress * totalTransitions;

  return (
    <section 
      ref={containerRef} 
      id="services" 
      className="relative bg-[#F4F4F5] w-full"
      style={{ height: `${serviceStacks.length * 100}vh` }}
    >
      {/* ── STICKY STAGE ── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col pt-[8vh] lg:pt-[10vh]">
        
        {/* Editorial Heading Section */}
        <div className="w-full max-w-[1600px] mx-auto px-4 mb-6 flex justify-between items-start">
          {/* Identity Tag (Left) */}
          <div className="s-header-reveal bg-black/5 py-1.5 px-4 rounded-none border border-black/5">
             <span className="font-mono text-[9px] lg:text-[10px] font-black tracking-[0.4em] text-black/60 uppercase">
                001 // Нашите услуги
             </span>
          </div>

          {/* Mission Statement (Right) */}
          <p className="s-header-reveal font-sans text-[clamp(0.9rem,1.2vw,1.1rem)] font-medium leading-[1.4] text-right max-w-lg text-[#111111] opacity-80">
             Се посветуваме целосно на нашите партнери и решенијата што ги нудиме, носејќи <span className="text-[#D42B2B] italic">највисока експертиза.</span>
          </p>
        </div>

        <div className="relative h-[62vh] lg:h-[65vh] w-full max-w-[1600px] mx-auto px-4">
          
          {serviceStacks.map((service, i) => {
            let yPercent = 120;
            let scale = 1;
            let brightness = 1;
            let opacity = 1;

            // KINETIC TEXT ANIMATION LOGIC
            let slideProgress = 0;

            if (i === 0) {
              yPercent = 0;
              slideProgress = 1; // Base card always fully active
              const shrinkProgress = Math.max(0, Math.min(1, cardProgress - 0));
              scale = 1 - (0.05 * shrinkProgress);
              brightness = 1 - (0.6 * shrinkProgress);
              opacity = 1 - (0.3 * shrinkProgress);
            } else {
              slideProgress = Math.max(0, Math.min(1, cardProgress - (i - 1)));
              yPercent = 130 * (1 - slideProgress);

              const shrinkProgress = Math.max(0, Math.min(1, cardProgress - i));
              scale = 1 - (0.05 * shrinkProgress);
              brightness = 1 - (0.6 * shrinkProgress);
              opacity = 1 - (0.3 * shrinkProgress);
            }

            // Staggered Text Reveal based on slideProgress
            // Starts revealing at 70% of the card's slide-complete
            const revealStart = 0.7;
            const contentOpacity = Math.max(0, Math.min(1, (slideProgress - revealStart) / (1 - revealStart)));
            const contentY = 30 * (1 - contentOpacity);

            return (
              <div 
                key={i} 
                className={`service-card absolute inset-0 w-full h-full rounded-none border border-white/10 overflow-hidden flex flex-col justify-between p-10 lg:p-20 ${service.color} ${service.textColor} will-change-transform shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]`}
                style={{ 
                  zIndex: i + 1,
                  transform: `translateY(${yPercent}%) scale(${scale})`,
                  opacity: opacity,
                  filter: `brightness(${brightness})`,
                  transition: 'opacity 0.3s ease-out, filter 0.3s ease-out'
                }}
              >
                {/* Background Texture Image - Reduced Intensity */}
                <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none grayscale">
                    <Image 
                        src={service.image} 
                        alt="" 
                        fill 
                        className="object-cover"
                    />
                </div>

                {/* 1. TOP BAR */}
                <div 
                  className="flex justify-between items-start w-full relative z-10"
                  style={{ opacity: contentOpacity, transform: `translateY(${contentY * 0.5}px)` }}
                >
                   <div className="flex flex-col gap-2">
                      <span className="font-mono text-[9px] lg:text-[10px] font-black tracking-[0.4rem] opacity-30">
                         STK_{service.id} // 00{i+1}
                      </span>
                      <div className="w-12 h-px bg-current opacity-20" />
                   </div>
                   
                   <div className="flex gap-2">
                      {service.tags?.map((tag, idx) => (
                        <div key={idx} className="px-3 py-1 border border-white/20 bg-white/[0.05] text-[8px] font-black tracking-widest text-white/50 uppercase backdrop-blur-md">
                           {tag}
                        </div>
                      ))}
                   </div>
                </div>

                {/* 2. MAIN HUB CONTENT */}
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                   <div 
                      className="max-w-4xl"
                      style={{ opacity: contentOpacity, transform: `translateY(${contentY}px)` }}
                   >
                      <h2 className="font-sans text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[0.8] tracking-tighter font-medium whitespace-pre-line text-left">
                         {service.title.split(/([\s\n]транспорт\.?)/gi).map((part, index) => {
                           if (part.toLowerCase().includes("транспорт")) {
                             return (
                               <span key={index} className="opacity-70">
                                 {part}
                               </span>
                             );
                           }
                           return part;
                         })}
                      </h2>
                   </div>
                </div>

                {/* 3. BOTTOM HUD BLOCK */}
                <div 
                  className="relative z-10 flex flex-col lg:flex-row justify-between items-end gap-12 pt-12 border-t border-white/10"
                  style={{ opacity: contentOpacity, transform: `translateY(${contentY * 0.8}px)` }}
                >
                   {/* Decorative ID mark */}
                   <div className="hidden lg:flex flex-col">
                      <div className="w-16 h-16 border border-white/20 flex items-center justify-center group hover:bg-white transition-all duration-500 cursor-pointer mb-2">
                        <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black group-hover:rotate-45 transition-all" />
                      </div>
                      <span className="font-mono text-[8px] opacity-20 uppercase tracking-widest">ACTION_REQUIRED // {service.label}</span>
                   </div>

                   <div className="flex flex-col items-end text-right gap-8 max-w-sm">
                      <p className="text-white/60 font-[family-name:var(--font-jost)] text-[clamp(0.9rem,1.1vw,1rem)] font-medium leading-relaxed">
                         {service.desc}
                      </p>

                      <KineticButton 
                        text="Види повеќе" 
                        href={service.isCTA ? "/contact" : "#details"} 
                        hoverColor={service.color === "bg-[#D42B2B]" ? "#080808" : "#D42B2B"}
                      />
                   </div>
                </div>

                {/* 4. DECORATIVE ELEMENTS */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] border border-white/5 rounded-full pointer-events-none" />

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
