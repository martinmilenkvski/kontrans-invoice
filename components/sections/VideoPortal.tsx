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
  const videoCardRef = useRef<HTMLDivElement>(null);
  const cardsAnimated = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current || !videoCardRef.current) return;

      const parent = containerRef.current;
      const card = videoCardRef.current;
      const video = videoWrapperRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Decoupled, automatic staggered entrance animation
            // Plays once when the video mostly shrinks, independently of active scrolling
            if (self.progress > 0.85) {
              if (!cardsAnimated.current) {
                cardsAnimated.current = true;
                gsap.fromTo(".bento-card",
                  { opacity: 0, y: 16 },
                  { 
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.08, 
                    duration: 0.8, 
                    ease: "power3.out",
                    overwrite: "auto"
                  }
                );
              }
            } else if (self.progress < 0.5) {
              // Reset states when scrolling back up past 50% scroll progression
              if (cardsAnimated.current) {
                cardsAnimated.current = false;
                gsap.to(".bento-card", {
                  opacity: 0,
                  y: 16,
                  stagger: 0.03,
                  duration: 0.4,
                  ease: "power2.in",
                  overwrite: "auto"
                });
              }
            }
          }
        },
      });

      // Animate video shrink to the top-left bento slot on scroll
      tl.fromTo(
        video,
        {
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
          borderRadius: "0px",
          opacity: 1,
        },
        {
          width: () => card.getBoundingClientRect().width,
          height: () => card.getBoundingClientRect().height,
          left: () => card.getBoundingClientRect().left - parent.getBoundingClientRect().left,
          top: () => card.getBoundingClientRect().top - parent.getBoundingClientRect().top,
          borderRadius: "0px",
          duration: 1.5,
          ease: "power3.inOut",
        },
        0
      );

      tl.to(".vp-overlay", { opacity: 0.3, duration: 1 }, 0);

      return () => {};
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="process"
      className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center border-t border-black/10 text-brand-dark"
    >
      
      {/* ── BACKGROUND VIDEO SHRINKING FRAME ── */}
      <div 
        ref={videoWrapperRef} 
        className="absolute z-30 overflow-hidden border border-black/5 pointer-events-none rounded-none"
        style={{ width: "100vw", height: "100vh", left: 0, top: 0 }}
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/process-video.mp4" type="video/mp4" />
        </video>

        {/* HUD UI Elements Layer */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white z-10 pointer-events-none select-none">
          {/* Top Row: Camera details & Recording Pulse */}
          <div className="flex items-center justify-between w-full font-mono text-[9px] tracking-wider text-white/80 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full self-start max-w-max">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
              <span>LIVE CAM // PORT_CAM_03</span>
            </span>
            <span className="mx-2 text-white/30">|</span>
            <span>HD 1080P // 60FPS</span>
          </div>

          {/* Center Crosshair or Ticks */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="relative w-10 h-10">
              <div className="absolute left-0 top-5 w-2 h-px bg-white" />
              <div className="absolute right-0 top-5 w-2 h-px bg-white" />
              <div className="absolute left-5 top-0 w-px h-2 bg-white" />
              <div className="absolute left-5 bottom-0 w-px h-2 bg-white" />
              <div className="absolute inset-0 border border-white/20 rounded-full scale-75" />
            </div>
          </div>

          {/* Corner Ticks */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/40 pointer-events-none" />

          {/* Bottom Row: Timestamp and coordinates */}
          <div className="flex items-end justify-between w-full font-mono text-[8px] tracking-widest text-white/70">
            <span>SYS_DAT: 08.06.2026 // 16:46 UTC</span>
            <span>41°59'56"N // 21°26'15"E</span>
          </div>
        </div>

        <div className="vp-overlay absolute inset-0 bg-white/10" />
      </div>

      {/* ── BENTO GRID CONTAINER ── */}
      <div className="w-full max-w-[1600px] px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start">
          
          {/* ── COLUMN 1 (LEFT) ── */}
          <div className="flex flex-col gap-6 w-full">
            {/* Card 1: Video Placeholder (Top-Left, tall vertical block) */}
            <div 
              ref={videoCardRef} 
              className="bg-transparent rounded-none border border-black/5 relative overflow-hidden h-[420px] pointer-events-none"
            >
               {/* The video element shrinks directly over this container */}
            </div>

            {/* Card 2: Title block (Bottom-Left) */}
            <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-8 flex flex-col justify-between h-[220px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
               <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                     <div className="h-px w-8 bg-brand-red" />
                     <span className="text-[10px] font-bold text-brand-red uppercase tracking-[0.3em] font-space">
                       003 // ОПЕРАТИВЕН МОДЕЛ
                     </span>
                  </div>
                  <h2 className="font-space text-2xl lg:text-3xl text-brand-dark font-medium leading-[1.1] tracking-tight">
                     Од барање <br />
                     до <span className="text-brand-red italic font-space font-medium">букинг.</span>
                  </h2>
               </div>
               <p className="font-sans text-xs text-brand-dark/50 leading-relaxed font-light">
                  Нашиот оперативен модел е оптимизиран за брзина, прецизност и максимална сигурност во транспортниот ланец.
               </p>
            </div>
          </div>

          {/* ── COLUMN 2 (CENTER) ── */}
          <div className="flex flex-col gap-6 w-full">
            {/* Card 3: Step 1 (Top-Center) */}
            <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-8 flex flex-col justify-between h-[340px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
               <div className="flex items-start justify-between w-full">
                  <span className="font-space text-[10px] tracking-[0.2em] text-brand-red font-bold uppercase">{PROCESS_STEPS[0].tag}</span>
                  <span className="font-space text-6xl text-black/[0.04] group-hover:text-black/[0.08] font-medium leading-none select-none transition-colors duration-500">{PROCESS_STEPS[0].id}</span>
               </div>

               {/* Isometric Box wireframe illustration */}
               <div className="flex justify-center items-center my-2">
                 <svg viewBox="0 0 100 100" className="w-20 h-20 text-brand-dark transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-12">
                   {/* Top Face */}
                   <polygon points="50,15 85,35 50,55 15,35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                   {/* Left Face with hatched lines (striped) */}
                   <polygon points="15,35 50,55 50,90 15,70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                   <line x1="22" y1="39" x2="22" y2="74" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                   <line x1="29" y1="43" x2="29" y2="78" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                   <line x1="36" y1="47" x2="36" y2="82" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                   <line x1="43" y1="51" x2="43" y2="86" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                   {/* Right Face */}
                   <polygon points="50,55 85,35 85,70 50,90" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                   <line x1="50" y1="55" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" />
                 </svg>
               </div>

               <div className="flex flex-col gap-2">
                  <h3 className="font-space text-lg text-brand-dark font-semibold tracking-tight uppercase group-hover:text-brand-red transition-colors duration-300">
                    {PROCESS_STEPS[0].title}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-brand-dark/50 leading-relaxed font-light">
                    {PROCESS_STEPS[0].desc}
                  </p>
               </div>
            </div>

            {/* Card 4: Step 2 (Bottom-Center) */}
            <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-8 flex flex-col justify-between h-[300px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
               <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col gap-1">
                     <span className="font-space text-[10px] tracking-[0.2em] text-brand-red font-bold uppercase">{PROCESS_STEPS[1].tag}</span>
                     <span className="font-space text-3xl font-bold text-brand-dark mt-1">24ч.</span>
                  </div>
                  <span className="font-space text-6xl text-black/[0.04] group-hover:text-black/[0.08] font-medium leading-none select-none transition-colors duration-500">{PROCESS_STEPS[1].id}</span>
               </div>

               {/* Animated Route Network illustration */}
               <div className="my-1 overflow-hidden rounded-none border border-black/[0.03] bg-black/[0.01]">
                 <svg viewBox="0 0 160 80" className="w-full h-16 text-brand-dark/20">
                   <defs>
                     <pattern id="dot-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                       <circle cx="2" cy="2" r="0.75" fill="currentColor" fillOpacity="0.4" />
                     </pattern>
                   </defs>
                   <rect width="100%" height="100%" fill="url(#dot-grid)" />
                   <path d="M 20,60 L 60,30 L 100,50 L 140,20" fill="none" stroke="var(--color-brand-red)" strokeWidth="1.5" strokeLinecap="round" />
                   <circle cx="20" cy="60" r="3" fill="currentColor" />
                   <circle cx="60" cy="30" r="3" fill="currentColor" />
                   <circle cx="100" cy="50" r="3" fill="currentColor" />
                   <circle cx="140" cy="20" r="4" fill="var(--color-brand-red)" />
                   <circle cx="140" cy="20" r="7" fill="none" stroke="var(--color-brand-red)" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '140px 20px' }} />
                 </svg>
               </div>

               <div className="flex flex-col gap-2">
                  <h3 className="font-space text-lg text-brand-dark font-semibold tracking-tight uppercase group-hover:text-brand-red transition-colors duration-300">
                    {PROCESS_STEPS[1].title}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-brand-dark/50 leading-relaxed font-light">
                    {PROCESS_STEPS[1].desc}
                  </p>
               </div>
            </div>
          </div>

          {/* ── COLUMN 3 (RIGHT) ── */}
          <div className="flex flex-col gap-6 w-full">
            {/* Card 5: Top-Right Sub-Grid (Process code + location details) */}
            <div className="grid grid-cols-2 gap-6 w-full">
               {/* Subcard A: Model */}
               <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-6 flex flex-col justify-between h-[120px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
                  <div className="flex items-start justify-between w-full">
                     <span className="font-space text-[10px] tracking-[0.2em] text-brand-red font-bold uppercase">MODEL</span>
                     <svg viewBox="0 0 100 100" className="w-8 h-8 text-brand-dark/30 transition-all duration-700 ease-out group-hover:rotate-180 group-hover:text-brand-red">
                       <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                       <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.75" />
                       <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                       <circle cx="78" cy="22" r="2.5" fill="var(--color-brand-red)" />
                     </svg>
                  </div>
                  <span className="font-space text-3xl text-brand-dark font-bold leading-none mt-auto">003</span>
               </div>
               
               {/* Subcard B: Location */}
               <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-6 flex flex-col justify-between h-[120px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
                  <div className="flex items-start justify-between w-full">
                     <span className="font-space text-[10px] tracking-[0.2em] text-brand-red font-bold uppercase">LOCATION</span>
                     <div className="relative w-6 h-6 flex items-center justify-center">
                        <div className="absolute w-2.5 h-2.5 bg-brand-red rounded-full animate-ping" />
                        <div className="w-1.5 h-1.5 bg-brand-red rounded-full z-10" />
                     </div>
                  </div>
                  <div className="flex flex-col mt-auto">
                     <span className="font-mono text-[9px] text-black/40 font-bold">41°59'56"N</span>
                     <span className="font-mono text-[9px] text-black/40 font-bold">21°26'15"E</span>
                  </div>
               </div>
            </div>

            {/* Card 6: Step 3 (Middle-Right) */}
            <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-8 flex flex-col justify-between h-[240px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
               <div className="flex items-start justify-between w-full">
                  <span className="font-space text-[10px] tracking-[0.2em] text-brand-red font-bold uppercase">{PROCESS_STEPS[2].tag}</span>
                  <span className="font-space text-6xl text-black/[0.04] group-hover:text-black/[0.08] font-medium leading-none select-none transition-colors duration-500">{PROCESS_STEPS[2].id}</span>
               </div>
               
               {/* Concentric checkmark stamp illustration */}
               <div className="flex justify-center my-1">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 text-brand-dark transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M 35,50 L 45,60 L 65,38" fill="none" stroke="var(--color-brand-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </div>

               <div className="flex flex-col gap-2">
                  <h3 className="font-space text-lg text-brand-dark font-semibold tracking-tight uppercase group-hover:text-brand-red transition-colors duration-300">
                    {PROCESS_STEPS[2].title}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-brand-dark/50 leading-relaxed font-light">
                    {PROCESS_STEPS[2].desc}
                  </p>
               </div>
            </div>

            {/* Card 7: Step 4 (Bottom-Right) */}
            <div className="bento-card group bg-[#F5F5F7] border border-black/[0.04] rounded-none p-8 flex flex-col justify-between h-[260px] opacity-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-black/15">
               <div className="flex items-start justify-between w-full">
                  <span className="font-space text-[10px] tracking-[0.2em] text-brand-red font-bold uppercase">{PROCESS_STEPS[3].tag}</span>
                  <span className="font-space text-6xl text-black/[0.04] group-hover:text-black/[0.08] font-medium leading-none select-none transition-colors duration-500">{PROCESS_STEPS[3].id}</span>
               </div>
               
               {/* Warehouse Storage Grid illustration */}
               <div className="flex justify-center my-1">
                  <svg viewBox="0 0 120 60" className="w-24 h-12 text-brand-dark/25 group-hover:text-brand-red/60 transition-colors duration-500">
                    <line x1="10" y1="50" x2="110" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="10" y1="25" x2="110" y2="25" stroke="currentColor" strokeWidth="1.5" />
                    
                    <line x1="10" y1="10" x2="10" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="60" y1="10" x2="60" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="110" y1="10" x2="110" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    
                    <rect x="18" y="31" width="14" height="14" fill="currentColor" rx="1" />
                    <rect x="36" y="31" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" rx="1" />
                    <rect x="68" y="31" width="14" height="14" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" rx="1" />
                    <rect x="86" y="31" width="14" height="14" fill="currentColor" rx="1" />
                    
                    <rect x="18" y="6" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" rx="1" />
                    <rect x="36" y="6" width="14" height="14" fill="currentColor" rx="1" />
                    <rect x="68" y="6" width="14" height="14" fill="currentColor" rx="1" />
                    <rect x="86" y="6" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" rx="1" />
                  </svg>
               </div>

               <div className="flex flex-col gap-2">
                  <h3 className="font-space text-lg text-brand-dark font-semibold tracking-tight uppercase group-hover:text-brand-red transition-colors duration-300">
                    {PROCESS_STEPS[3].title}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-brand-dark/50 leading-relaxed font-light">
                    {PROCESS_STEPS[3].desc}
                  </p>
               </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
