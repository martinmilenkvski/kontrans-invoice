"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Побарајте понуда",
    desc: "Испратете ни ги деталите за вашиот товар преку контакт формата или директен телефонски повик.",
    tag: "INQUIRY",
  },
  {
    id: "02",
    title: "Оптимална рута и цена",
    desc: "За 24 часа нашите експерти ќе ви проследат оптимална рута и најдобра цена за вашиот транспорт.",
    tag: "ANALYSIS",
  },
  {
    id: "03",
    title: "Потврда на букинг",
    desc: "По прифаќање на понудата, веднаш ја потврдуваме резервацијата и ги активираме нашите логистички канали.",
    tag: "BOOKING",
  },
  {
    id: "04",
    title: "Достава до магацин",
    desc: "Целосна грижа за вашиот товар до финалната дестинација. Брза и сигурна испорака до вашиот магацин.",
    tag: "DELIVERY",
  },
];

export function VideoPortal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax effect on the video
      gsap.fromTo(".video-parallax",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Staggered fade in for the steps
      gsap.fromTo(".process-step",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".process-step-list",
            start: "top 80%",
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="process"
      className="relative bg-white pt-32 pb-48 border-t border-black/10 text-brand-dark overflow-hidden"
    >
      {/* Structural Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-black" />
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-black" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* 1. LEFT COLUMN: Sticky Header & Manifesto */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start flex flex-col gap-8">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <div className="h-px w-8 bg-brand-red" />
                   <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                     003 // ОПЕРАТИВЕН МОДЕЛ
                   </span>
                </div>
                
                <h2 className="font-sans text-4xl lg:text-5xl font-medium text-brand-dark leading-[1.05] tracking-tight">
                   Од барање <br />
                   до <span className="text-brand-red italic font-sans font-medium">букинг.</span>
                </h2>
             </div>

             <div className="vp-ed-manifesto max-w-sm">
                <p className="font-sans text-base lg:text-lg text-brand-dark/60 leading-relaxed font-light">
                   Нашиот оперативен модел е дизајниран за максимална прецизност. Секој чекор е оптимизиран за да обезбеди сигурност и брзина во глобалниот транспортен ланец.
                </p>
             </div>

             <div className="flex items-center gap-4 pl-1 mt-2">
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-black/40 tracking-[0.3em] font-bold">41°59'56"N 21°25'44"E</span>
             </div>
          </div>

          {/* 2. MIDDLE COLUMN: Parallax Video Frame */}
          <div className="lg:col-span-4 relative aspect-[3/4] w-full overflow-hidden border border-black/5 rounded-2xl bg-black/5 group mt-8 lg:mt-0">
             <div className="absolute inset-0 w-full h-[120%] -top-[10%] video-parallax">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                >
                  <source src="/process-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
             </div>
          </div>

          {/* 3. RIGHT COLUMN: Process Steps List */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 process-step-list mt-8 lg:mt-0">
             {PROCESS_STEPS.map((step, i) => (
               <div key={i} className="process-step border-t border-black/10 pt-6 flex flex-col gap-3 opacity-0">
                  <div className="flex items-center justify-between w-full">
                     <span className="font-mono text-[9px] tracking-[0.2em] text-brand-red font-bold uppercase">{step.tag}</span>
                     <span className="font-mono text-[10px] text-black/30 font-bold">{step.id}</span>
                  </div>
                  <h3 className="font-sans text-xl lg:text-2xl text-brand-dark font-medium tracking-tight leading-none uppercase">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm lg:text-base text-brand-dark/60 font-light leading-relaxed">
                    {step.desc}
                  </p>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
