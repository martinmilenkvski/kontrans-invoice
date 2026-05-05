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
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current) return;

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // ── PHASE 1: THE SHRINK ENTRANCE ──
        tl.fromTo(
          videoWrapperRef.current,
          {
            width: "100%",
            height: "100vh",
            borderRadius: "0px",
            y: 0,
            opacity: 1,
          },
          {
            width: isDesktop ? "42vw" : "85vw", 
            height: isDesktop ? "55vh" : "30vh", 
            y: isDesktop ? 0 : "0vh",
            opacity: isDesktop ? 1 : 0.05, // Almost hide but leave a ghost of motion
            borderRadius: isDesktop ? "2px" : "12px",
            duration: 1.5,
            ease: "expo.inOut",
          },
          0
        );

        tl.to(".vp-overlay", { opacity: isDesktop ? 0.45 : 1, duration: 1 }, 0);

        // ── PHASE 2: EDITORIAL REVEALS ──
        
        tl.set(".vp-ed-backdrop", { opacity: 0 });
        if (isDesktop) {
          tl.fromTo(".vp-ed-backdrop",
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
            0.3
          );
        }

        // Top Header Reveal
        tl.fromTo(".vp-ed-header-container", 
          { y: -30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, 
          0.4
        );

        // Mobile specific: Lift header up as steps appear
        if (isMobile) {
          tl.to(".vp-ed-header-container", { 
            y: -140, 
            opacity: 0.2, 
            scale: 0.9,
            duration: 2.5, 
            ease: "power2.inOut" 
          }, 1.5);
        }

        // ── PHASE 3: SEQUENTIAL PROCESS STEPS ──
        PROCESS_STEPS.forEach((_, i) => {
          const stepTime = 1.2 + i * 0.7;
          
          tl.fromTo(`.vp-step-${i}`, 
            { opacity: 0, y: isDesktop ? 20 : 60, scale: 0.95 }, 
            { 
              opacity: 1, 
              y: isDesktop ? 0 : -100, // Even higher to ensure full visibility
              scale: 1,
              duration: 0.8, 
              ease: "power3.out" 
            }, 
            stepTime
          );

          if (i > 0) {
            tl.to(`.vp-step-${i-1}`, { opacity: isDesktop ? 0.3 : 0, duration: 0.4 }, stepTime);
          }
        });

        // Metadata Bottom
        tl.fromTo(".vp-ed-footer",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          1.0
        );

        return () => {};
      });

      return () => mm.revert();

    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
      
      {/* ── BACKGROUND LAYER: INDEX NUMBER ── */}
      <div className="vp-ed-backdrop absolute left-4 lg:left-20 top-1/2 -translate-y-1/2 z-0 opacity-0 pointer-events-none select-none">
        <span className="font-(family-name:--font-jost) text-[40vw] lg:text-[25vw] leading-none font-black text-black/3">01</span>
      </div>

      {/* ── BACKGROUND VIDEO SHRINKING FRAME ── */}
      <div 
        ref={videoWrapperRef} 
        className="relative z-10 overflow-hidden border border-black/10"
        style={{ width: "100%", height: "100vh" }}
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/process-video.mp4" type="video/mp4" />
        </video>
        <div className="vp-overlay absolute inset-0 bg-white/20" />
      </div>

      {/* ── LEFT MARGIN HAIRLINE ── */}
      <div className="hidden lg:flex absolute left-6 lg:left-12 inset-y-0 z-20 flex-col justify-between py-20 pointer-events-none">
         <div className="vp-vertical-divider w-px bg-black/5 flex-1 origin-top" />
         <div className="vp-vertical-divider w-px bg-black/5 flex-1 origin-bottom" />
      </div>

      {/* ── EDITORIAL UI LAYER ── */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 lg:p-20 flex flex-col justify-between">
        
        <div className="vp-ed-header-container flex flex-col gap-4 lg:gap-10 max-w-md">
           <div className="vp-ed-header opacity-0">
             <span className="inline-block px-3 py-1 bg-brand-red text-white text-[0.6rem] lg:text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-2 lg:mb-8">
               Оперативен модел
             </span>
             <h2 className="font-(family-name:--font-jost) text-[1.8rem] lg:text-[clamp(2.5rem,5vw,4rem)] text-brand-dark leading-[0.9] lg:leading-[0.85] tracking-tight font-medium">
               Од барање <br />
               до <span className="text-brand-red italic font-(family-name:--font-caveat) lowercase font-normal">реализација.</span>
             </h2>
           </div>
           
           <div className="vp-ed-manifesto pl-4 border-l border-black/5">
              <p className="font-(family-name:--font-jost) text-xs lg:text-base text-brand-dark/70 leading-relaxed max-w-85 lg:max-w-none">
                 Нашиот оперативен модел е дизајниран за максимална прецизност. Секој чекор е оптимизиран за да обезбеди сигурност и брзина во глобалниот транспортен ланец.
              </p>
           </div>
        </div>

        {/* MIDDLE ROW (STEPS) */}
        <div className="relative lg:absolute lg:right-28 lg:top-1/2 lg:-translate-y-1/2 flex items-stretch gap-6 lg:gap-12 h-fit mt-6 lg:mt-0 mb-auto lg:mb-0">
           <div className="hidden lg:block vp-vertical-divider w-px bg-black/10 origin-top h-auto min-h-100 opacity-0" />
           <div className="flex flex-col gap-6 lg:gap-12 w-full max-w-95">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className={`vp-step-${i} opacity-0 flex flex-col gap-2 lg:gap-3 items-start lg:pl-6 bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl border border-black/5 lg:border-none shadow-xl lg:shadow-none`}>
                   <span className="font-mono text-[10px] lg:text-[11px] text-brand-red font-bold tracking-[0.2em] uppercase">{step.tag}</span>
                   <h3 className="font-(family-name:--font-jost) text-xl lg:text-3xl text-brand-dark font-medium tracking-tight leading-none uppercase">
                     {step.title}
                   </h3>
                   <p className="font-(family-name:--font-jost) text-sm lg:text-base text-brand-dark/60 font-normal leading-relaxed">
                     {step.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* FOOTER ROW: ONLY COORDINATES */}
        <div className="vp-ed-footer opacity-0 flex justify-between items-end mt-4 lg:mt-0">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-brand-red rounded-full" />
              <span className="font-mono text-[11px] text-black/40 tracking-[0.3em] font-bold">41°59'56"N 21°25'44"E</span>
           </div>
           
           <div className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-black/10" />
              <div className="w-1.5 h-1.5 bg-black/5" />
           </div>
        </div>

      </div>

    </section>
  );
}
