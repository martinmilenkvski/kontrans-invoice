"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Активни бродови", value: "42", suffix: "" },
  { label: "Копнена флота", value: "112", suffix: "" },
  { label: "Видливост", value: "100", suffix: "%" },
  { label: "Латентност", value: "24", suffix: "ms" },
];

export function OperationalGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Kill stale ScrollTriggers
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === triggerRef.current || st.pin === triggerRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".op-panel");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Main horizontal movement
    tl.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
    });

    // ── Internal frame animations ──

    // Frame 1: Headline parallax
    tl.fromTo(".op-f1-content", 
      { x: 0 }, 
      { x: -100, ease: "none" }, 0
    );

    // Frame 2: Stats stagger
    tl.fromTo(".op-f2-stat",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      0.5
    );

    // Frame 3: Red card expansion / scale
    tl.fromTo(".op-f3-card",
      { scale: 0.8, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" },
      1.0
    );

    // Header reveal (shared across frames)
    tl.fromTo(".op-header", 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }, 
      0
    );

  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-[#F5F5F0]">
      
      {/* ── SHARED HEADER ── */}
      <div className="op-header absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 lg:px-16 py-10 opacity-0 mix-blend-difference text-white">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] font-bold">
          Operational // 08
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] font-bold">
          Filmstrip Mode ↓
        </span>
      </div>

      {/* ── HORIZONTAL FILMSTRIP ── */}
      <div ref={sectionRef} className="flex flex-nowrap w-[300vw] h-screen items-center">
        
        {/* ═══ FRAME 1: THE VISION ═══ */}
        <section className="op-panel relative w-screen h-full flex items-center justify-center bg-[#F5F5F0]">
          <div className="absolute inset-0 z-0">
             <Image 
                src="/stats-dashboard.png" 
                alt="Operational Dashboard" 
                fill 
                className="object-cover opacity-20 grayscale"
             />
          </div>
          <div className="op-f1-content relative z-10 max-w-5xl px-12 lg:px-24">
             <h2 className="font-sans text-[clamp(2.5rem,8vw,6rem)] text-[#111111] leading-[0.9] tracking-tighter font-black uppercase">
                Платформа за <br />
                <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] font-normal lower-case text-[0.8em] tracking-normal">
                  целосна контрола.
                </span>
             </h2>
             <div className="mt-12 flex gap-12 items-end">
                <div className="w-24 h-[1px] bg-[#111111]/20 mb-3" />
                <p className="font-[family-name:var(--font-jost)] text-lg lg:text-xl text-[#111111]/60 font-medium max-w-md leading-relaxed">
                   Секој податок е видлив во реално време. Нашата инфраструктура е изградена за прецизност и непрекинат проток.
                </p>
             </div>
          </div>
          {/* Subtle ghost number */}
          <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
             <span className="text-[25vw] font-black text-[#111111]">01</span>
          </div>
        </section>

        {/* ═══ FRAME 2: THE DATA ═══ */}
        <section className="op-panel relative w-screen h-full flex flex-col justify-center bg-[#111111] px-12 lg:px-24">
          <div className="max-w-[1400px] w-full mx-auto">
             <div className="mb-20">
               <span className="font-mono text-[0.6rem] text-[#D42B2B] uppercase tracking-[0.5em] font-bold mb-4 block">LIVE_METRICS</span>
               <h3 className="text-white text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">Оперативна <br /> инфраструктура</h3>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 border-t border-white/10 pt-16">
                {stats.map((stat, i) => (
                  <div key={i} className="op-f2-stat flex flex-col gap-4 opacity-0">
                    <span className="text-[0.6rem] font-bold text-white/30 tracking-widest uppercase">{stat.label}</span>
                    <div className="flex items-baseline gap-1">
                       <span className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">{stat.value}</span>
                       <span className="text-2xl font-black text-[#D42B2B]">{stat.suffix}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          {/* Subtle ghost number */}
          <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-[0.05] select-none pointer-events-none">
             <span className="text-[25vw] font-black text-white">02</span>
          </div>
        </section>

        {/* ═══ FRAME 3: THE HUB (CTA) ═══ */}
        <section className="op-panel relative w-screen h-full flex items-center justify-center bg-[#F5F5F0] px-12 lg:px-24">
           <Link 
             href="/contact" 
             className="op-f3-card relative w-full h-[70vh] max-w-[1200px] bg-[#D42B2B] group flex flex-col justify-between p-12 lg:p-20 overflow-hidden transition-all duration-700"
           >
              <div className="flex justify-between items-start">
                 <div className="w-16 h-16 border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10">
                    <ArrowUpRight className="text-white w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                 </div>
                 <div className="flex flex-col items-end gap-2 text-right">
                    <span className="font-mono text-[0.65rem] text-white tracking-[0.4em] uppercase font-bold">OPERATIONAL // HUB</span>
                    <span className="font-mono text-[0.55rem] text-white/40 tracking-widest uppercase italic">V5.2 // SECURED</span>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <span className="text-white/60 text-[0.8rem] font-bold tracking-[0.3em] uppercase">ПОВРЗЕТЕ СЕ СО НАС</span>
                 <h2 className="text-white font-sans font-black text-6xl lg:text-8xl leading-[0.85] uppercase tracking-tighter">
                    ПРИСТАП ДО <br /> МРЕЖАТА.
                 </h2>
              </div>
              
              {/* Abstract Background Decoration */}
              <div className="absolute -bottom-20 -right-20 w-[40vw] h-[40vw] border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                 <div className="w-full h-full bg-[radial-gradient(circle,white_0%,transparent_70%)]" />
              </div>
           </Link>
        </section>

      </div>

      {/* ── BOTTOM METADATA (Shared) ── */}
      <div className="absolute bottom-10 left-12 right-12 z-50 flex justify-between items-center opacity-40 mix-blend-difference text-white pointer-events-none select-none">
        <span className="font-mono text-[0.5rem] tracking-[0.4em] uppercase">
          FILMSTRIP_ENGINE_V1.1
        </span>
        <span className="font-mono text-[0.5rem] tracking-[0.4em] uppercase text-right">
          KONTRANS // CONTROL
        </span>
      </div>

    </div>
  );
}
