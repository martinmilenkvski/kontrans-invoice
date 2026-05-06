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
            ease: "power4.inOut",
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
        // (Top Tag animation removed)

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
            { opacity: 0, y: isDesktop ? 40 : 60, clipPath: "inset(100% 0 0 0)", scale: 0.98 }, 
            { 
              opacity: 1, 
              y: isDesktop ? 0 : -100,
              clipPath: "inset(0% 0 0 0)",
              scale: 1,
              duration: 1.2, 
              ease: "power4.out" 
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
      
      {/* ── BACKGROUND LAYER: INDEX NUMBER (Removed) ── */}

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

      {/* ── LEFT MARGIN HAIRLINE (Removed) ── */}

      {/* ── EDITORIAL UI LAYER ── */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 lg:p-20 flex flex-col justify-between">
        
        <div className="vp-ed-header-container flex flex-col gap-4 lg:gap-10 max-w-sm">
           <div className="vp-ed-header">
             <h2 className="font-(family-name:--font-jost) text-[clamp(2.5rem,5vw,4rem)] text-brand-dark leading-[0.9] lg:leading-[0.85] tracking-tight font-medium">
               Од барање <br />
              до <span className="text-brand-red italic font-(family-name:--font-jost) lowercase font-normal">реализација.</span>
             </h2>
           </div>
           
           <div className="vp-ed-manifesto">
              <p className="font-(family-name:--font-jost) text-[16px] md:text-[18px] text-brand-dark/70 leading-relaxed max-w-85 lg:max-w-none">
                 Нашиот оперативен модел е дизајниран за максимална прецизност. Секој чекор е оптимизиран за да обезбеди сигурност и брзина во глобалниот транспортен ланец.
              </p>
           </div>
        </div>

        {/* MIDDLE ROW (STEPS) */}
        <div className="relative lg:absolute lg:right-28 lg:top-1/2 lg:-translate-y-1/2 flex items-stretch gap-6 lg:gap-12 h-fit mt-6 lg:mt-0 mb-auto lg:mb-0">
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

        {/* FOOTER ROW: TAG + COORDINATES */}
        <div className="vp-ed-footer opacity-0 flex justify-between items-end mt-4 lg:mt-0">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                 <div className="h-px w-8 bg-brand-red" />
                 <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-(family-name:--font-jost) whitespace-nowrap">
                   003 // ОПЕРАТИВЕН МОДЕЛ
                 </span>
              </div>
              <div className="flex items-center gap-4 pl-1">
                 <div className="w-2 h-2 bg-brand-red rounded-full" />
                 <span className="font-mono text-[11px] text-black/40 tracking-[0.3em] font-bold">41°59'56"N 21°25'44"E</span>
              </div>
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
