"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OperationalHub() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1.2,
      }
    });

    // ── PHASE 1: Dashboard — clip-path wipe from left ──
    tl.fromTo(".hub-dashboard",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 3, ease: "power3.inOut" },
      0
    );

    // ── PHASE 2: Gradient overlays fade in after reveal ──
    tl.fromTo(".hub-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      1.5
    );

    // ── PHASE 3: Text + stats reveal ──
    tl.fromTo(".hub-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.12, ease: "power4.out" },
      1.5
    );

    // ── PHASE 4: Stats counter row ──
    tl.fromTo(".hub-stat",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" },
      2.0
    );

    // ── Decorative line ──
    tl.fromTo(".hub-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: "power2.inOut" },
      1.0
    );

  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative h-screen bg-[#080808] overflow-hidden">

      <section className="relative z-10 w-full h-full flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── LEFT: TEXT + STATS ── */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:gap-14 relative z-20">
            
            <div className="flex flex-col gap-6">
              <span className="hub-text font-mono text-[0.6rem] text-[#D42B2B] uppercase tracking-[0.5em] font-black opacity-0">
                Неврална мрежа // 07
              </span>
              <h2 className="hub-text font-sans text-[clamp(2.2rem,4.5vw,4.5rem)] text-white leading-[0.88] tracking-tighter uppercase font-black opacity-0">
                Глобално <br />
                <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] font-normal lowercase">Следење.</span>
              </h2>
              <p className="hub-text text-white/40 font-[family-name:var(--font-jost)] text-lg lg:text-xl font-medium leading-relaxed max-w-lg opacity-0">
                Централизирана платформа која ја обединува целата логистичка операција. Од бродови до индивидуални пратки, секој податок е видлив во реално време.
              </p>
            </div>

            {/* Divider */}
            <div className="hub-line w-full h-[1px] bg-white/10 origin-left" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              {[
                { label: "Видливост",     val: "100%" },
                { label: "Латентност",    val: "24ms" },
                { label: "Активни јазли", val: "14.2K" },
                { label: "Мрежа",         val: "OPTIMAL" },
              ].map((stat, i) => (
                <div key={i} className="hub-stat flex flex-col gap-1.5 opacity-0">
                  <span className="text-[0.6rem] font-bold text-white/25 tracking-widest uppercase">{stat.label}</span>
                  <span className="text-2xl font-black text-white tracking-tighter uppercase">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: CINEMATIC DASHBOARD IMAGE ── */}
          <div className="lg:col-span-7 relative h-[400px] lg:h-[560px]">
            
            {/* Main Dashboard Image */}
            <div className="hub-dashboard absolute inset-0 overflow-hidden border border-white/5" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <Image 
                src="/contact-hologram.png" 
                alt="Global Tracking Dashboard" 
                fill 
                className="object-cover" 
              />
              
              {/* Cinematic gradient overlays */}
              <div className="hub-overlay absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent opacity-0" />
              <div className="hub-overlay absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent opacity-0" />
            </div>

            {/* Accent border frame */}
            <div className="absolute -inset-3 border border-white/[0.03] pointer-events-none" />
            
            {/* Corner accent */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-[#D42B2B]/20 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* ── BOTTOM METADATA ── */}
      <div className="absolute bottom-8 left-16 right-16 flex justify-between items-center opacity-15 hidden lg:flex pointer-events-none select-none">
        <span className="font-mono text-[0.5rem] tracking-[0.5em] uppercase text-white/30">OPERATIONAL_HUB_V4.2</span>
        <span className="font-mono text-[0.5rem] tracking-[0.5em] uppercase text-white/30">DATA_SECURED // LIVE</span>
      </div>
    </div>
  );
}
