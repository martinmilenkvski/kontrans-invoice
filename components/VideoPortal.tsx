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
        },
        {
          width: "42vw", 
          height: "55vh", 
          borderRadius: "2px",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(".vp-overlay", { opacity: 0.45, duration: 1 }, 0);

      // ── PHASE 2: EDITORIAL REVEALS ──
      
      // Backdrop Index 01
      tl.fromTo(".vp-ed-backdrop",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0.3
      );

      // Top Left Header Reveal
      tl.fromTo(".vp-ed-header", 
        { x: -40, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        0.4
      );

      // Manifesto Block Reveal
      tl.fromTo(".vp-ed-manifesto",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.7
      );

      // Vertical Divider
      tl.fromTo(".vp-vertical-divider",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1, ease: "power2.inOut" },
        0.6
      );

      // ── PHASE 3: SEQUENTIAL PROCESS STEPS ──
      PROCESS_STEPS.forEach((_, i) => {
        const stepTime = 1.2 + i * 0.7;
        
        tl.fromTo(`.vp-step-${i}`, 
          { opacity: 0, x: 30 }, 
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, 
          stepTime
        );

        if (i > 0) {
          tl.to(`.vp-step-${i-1}`, { opacity: 0.3, duration: 0.4 }, stepTime);
        }
      });

      // Left Margin GPS Markers
      tl.fromTo(".vp-ed-gps",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0.8
      );

      // Metadata Bottom Left
      tl.fromTo(".vp-ed-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        1.0
      );

    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
      
      {/* ── BACKGROUND LAYER: INDEX NUMBER ── */}
      <div className="vp-ed-backdrop absolute left-10 lg:left-20 top-1/2 -translate-y-1/2 z-0 opacity-0 pointer-events-none select-none">
        <span className="font-[family-name:var(--font-jost)] text-[25vw] leading-none font-black text-black/[0.03]">01</span>
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
      <div className="absolute left-6 lg:left-12 inset-y-0 z-20 flex flex-col justify-between py-20 pointer-events-none">
         <div className="vp-vertical-divider w-px bg-black/5 flex-1 origin-top" />
         <div className="vp-vertical-divider w-px bg-black/5 flex-1 origin-bottom" />
      </div>

      {/* ── EDITORIAL UI LAYER ── */}
      <div className="absolute inset-0 z-20 pointer-events-none p-10 lg:p-20 flex flex-col justify-between">
        
        {/* TOP ROW: HEADLINE + MANIFESTO */}
        <div className="flex justify-between items-start">
           <div className="flex flex-col gap-10 max-w-md">
              <div className="vp-ed-header opacity-0">
                <span className="inline-block px-3 py-1 bg-[#D42B2B] text-white text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-8">
                  Оперативен модел
                </span>
                <h2 className="font-[family-name:var(--font-jost)] text-[clamp(2.5rem,5vw,4rem)] text-[#111111] leading-[0.85] tracking-tight font-medium">
                  Од барање <br />
                  до <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] lowercase font-normal px-2">реализација.</span>
                </h2>
              </div>
              
              <div className="vp-ed-manifesto opacity-0 mt-2 pl-4 border-l border-black/5">
                 <p className="font-[family-name:var(--font-jost)] text-sm lg:text-base text-[#111111]/70 leading-relaxed max-w-[340px]">
                    Нашиот оперативен модел е дизајниран за максимална прецизност. Секој чекор е оптимизиран за да обезбеди сигурност и брзина во глобалниот транспортен ланец.
                 </p>
              </div>
           </div>
        </div>

        {/* MIDDLE ROW (STEPS) */}
        <div className="absolute right-10 lg:right-28 top-1/2 -translate-y-1/2 flex items-stretch gap-12 h-fit">
           <div className="vp-vertical-divider w-px bg-black/10 origin-top h-auto min-h-[400px] opacity-0" />
           <div className="flex flex-col gap-12 w-full max-w-[380px]">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className={`vp-step-${i} opacity-0 flex flex-col gap-3 items-start pl-6`}>
                   <span className="font-mono text-[11px] text-[#D42B2B] font-bold tracking-[0.2em] uppercase">{step.tag}</span>
                   <h3 className="font-[family-name:var(--font-jost)] text-xl lg:text-3xl text-[#111111] font-medium tracking-tight leading-none uppercase">
                     {step.title}
                   </h3>
                   <p className="font-[family-name:var(--font-jost)] text-sm lg:text-base text-[#111111]/60 font-normal leading-relaxed">
                     {step.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* FOOTER ROW: ONLY COORDINATES */}
        <div className="vp-ed-footer opacity-0 flex justify-between items-end">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#D42B2B] rounded-full" />
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
