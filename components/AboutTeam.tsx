"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User } from "lucide-react";
import { KineticButton } from "./ui/KineticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutTeam() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Header Reveal (Triggers when section top hits 65%)
    gsap.fromTo(".team-header-reveal", 
      { y: 60, opacity: 0, rotationX: -10 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.4, 
        stagger: 0.12, 
        ease: "power4.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            toggleActions: "play none none none"
        }
      }
    );

    // 2. Grid Content Reveal (Triggers when grid enters viewport)
    gsap.fromTo(".team-grid-reveal", 
      { y: 50, opacity: 0, rotationX: -5 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".team-grid-trigger",
            start: "top 75%",
            toggleActions: "play none none none"
        }
      }
    );

    // 3. Panoramic Image Reveal
    gsap.fromTo(".team-img-mask",
      { clipPath: "inset(0 0 100% 0)" },
      { 
        clipPath: "inset(0 0 0% 0)", 
        duration: 2, 
        ease: "power4.inOut",
        scrollTrigger: {
            trigger: ".team-img-mask",
            start: "top 85%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-40 bg-[#FFFFFF] pt-40 pb-24 overflow-hidden border-t border-black/10">
      
      <div className="max-w-400 mx-auto px-4 lg:px-4">
        
        {/* SECTION HEADER: ASYMMETRIC LAYOUT */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="max-w-4xl">
               <span className="team-header-reveal font-mono text-[11px] font-medium tracking-[0.4em] text-brand-red mb-6 block uppercase">007 // Team & vision</span>
               <h2 className="team-header-reveal font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-medium text-brand-dark leading-[0.8] tracking-tighter mb-2">
                  Тимот на<br />Контранс.
               </h2>
            </div>
            
            {/* RIGHT SIDE: HUD METADATA */}
            <div className="hidden lg:flex flex-col items-end gap-4 text-right">
               <div className="team-header-reveal flex items-center gap-4">
                   <div className="h-px w-24 bg-black/10" />
                  <span className="font-mono text-[10px] text-black/40 tracking-[0.2em] uppercase">Core_engine: Human_capital</span>
               </div>
                <p className="team-header-reveal font-(family-name:--font-jost) text-sm text-black/60 max-w-70 leading-relaxed">
                  Македонскиот логистички пазар бара комбинација на локален увид и глобални стандарди. Нашиот тим е мостот меѓу овие две реалности.
               </p>
               <div className="team-header-reveal flex items-center gap-3">
                   <span className="font-mono text-[9px] text-brand-red font-bold tracking-[0.3em] uppercase">Operational_sync: Active</span>
                   <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
               </div>
            </div>
        </div>

        {/* PANORAMIC HERO IMAGE */}
         <div className="team-img-mask relative w-full aspect-21/9 overflow-hidden rounded-sm mb-32 border border-black/5 bg-[#F9F9F9]">
            <Image 
              src="/team_skopje.png" 
              alt="The Kontrans Leadership Team in Skopje" 
              fill 
              className="object-cover transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
              sizes="100vw"
            />
        </div>

        {/* ASYMMETRIC GRID (3-COLUMN) */}
        <div className="team-grid-trigger grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start mb-32">
            
            {/* COLUMN 1: EDITORIAL RED TAG */}
            <div className="md:col-span-3">
                <div className="team-grid-reveal bg-brand-red p-6 lg:p-8 relative overflow-hidden group h-full shadow-2xl">
                  {/* Decorative Scanline */}
                   <div className="absolute top-0 left-0 w-full h-px bg-white/20 animate-pulse" />
                  
                  <div className="flex flex-col gap-8 relative z-10">
                     <div className="flex justify-between items-start">
                        <span className="font-mono text-[9px] text-white/60 tracking-[0.3em] uppercase">Identity_tag: 07A</span>
                        <div className="w-2 h-2 bg-white rounded-full" />
                     </div>
                     
                     <h4 className="font-sans text-xl lg:text-2xl font-medium text-white leading-[1.05] tracking-tighter">
                        Нашиот тим,<br />
                        нашата приказна.
                     </h4>
                     
                     <div className="flex items-center gap-2 mt-4">
                         <div className="h-px w-6 bg-white/40" />
                        <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">Verified // Culture</span>
                     </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r border-b border-white/20" />
               </div>
            </div>

            {/* COLUMN 2: BIO + LEADERSHIP CARD */}
            <div className="md:col-span-3 flex flex-col gap-12">
                <p className="team-grid-reveal text-brand-dark/70 font-normal text-lg leading-relaxed">
                  Ние сме тим од креатори, мислители и градители кои веруваат во создавање на искуства кои навистина поврзуваат. Нашата приказна е изградена на страст, иновација и стремеж за реализација на значајни идеи.
               </p>
               
               {/* CEO CARD (Marina Milenkovska) */}
                <div className="team-grid-reveal flex items-center gap-6 p-8 border border-black/5 bg-white hover:border-brand-red transition-colors group shadow-lg">
                   <div className="relative w-16 h-16 rounded-full overflow-hidden border border-brand-red/20 bg-white flex items-center justify-center">
                     <Image 
                       src="/marina.png" 
                       alt="Марина Миленковска" 
                       fill 
                       className="object-cover"
                     />
                  </div>
                  <div className="flex flex-col">
                      <span className="font-sans text-xl font-medium text-brand-dark tracking-tighter">Марина Миленковска</span>
                      <span className="font-mono text-[9px] font-medium text-brand-red tracking-[0.2em] italic">General Manager // CEO</span>
                  </div>
               </div>
            </div>

            {/* COLUMN 3: LARGE MANIFESTO */}
            <div className="md:col-span-6">
                <div className="team-grid-reveal relative">
                    <span className="text-brand-red font-(family-name:--font-jost) text-6xl absolute -left-10 -top-10 pointer-events-none">&ldquo;</span>
                    <h3 className="font-sans text-3xl lg:text-5xl font-light text-brand-dark leading-[0.8] tracking-tighter whitespace-pre-line pb-12">
                       Ние не само превезуваме стоки; <br /><span className="text-brand-red italic font-(family-name:--font-jost) font-medium">ние го оркестрираме</span> физичкиот аспект на глобалната економија.
                   </h3>
                    <span className="text-brand-red font-(family-name:--font-jost) text-6xl absolute -right-4 -bottom-4 pointer-events-none">&rdquo;</span>
                    <div className="w-full h-px bg-black/10" />
                </div>
                <div className="team-grid-reveal mt-12 flex justify-between items-end">
                   <div className="flex flex-col gap-2">
                       <span className="font-mono text-[9px] font-medium text-black/30 tracking-widest">VISION_STATUS: OPTIMIZED</span>
                       <div className="flex gap-1.5">
                           {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-1.5 bg-brand-red" />)}
                       </div>
                   </div>
                   <div className="text-[10px] font-medium font-mono text-black/10 tracking-[0.5em] hidden lg:block">
                      GLOBAL_STRATEGY_SYNC
                   </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
}
