"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TechnicalAnatomy() {
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

    // ── PHASE 1: Base chassis — clip-path wipe from center ──
    tl.fromTo(".ta-layer-chassis",
      { clipPath: "inset(50% 50% 50% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 2.5, ease: "power3.inOut" },
      0
    );

    // ── PHASE 2: Detail overlay — clip-path wipe from right ──
    tl.fromTo(".ta-layer-detail",
      { clipPath: "inset(0 0 0 100%)" },
      { clipPath: "inset(0 0 0 0%)", duration: 2, ease: "power3.inOut" },
      0.8
    );
    // Ship overlay — clip-path wipe from left
    tl.fromTo(".ta-layer-ship",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power3.inOut" },
      1.0
    );

    // ── PHASE 3: Text reveals (stagger) ──
    tl.fromTo(".ta-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "power4.out" },
      1.6
    );

    // ── PHASE 4: Spec grid ──
    tl.fromTo(".ta-spec",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      2.2
    );

    // ── Decorative line draw ──
    tl.fromTo(".ta-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: "power2.inOut" },
      1.2
    );

  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative h-screen bg-[#FAFAFA] overflow-hidden">

      <section className="relative z-10 w-full h-full flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ── LEFT: LAYERED IMAGE ASSEMBLY ── */}
          <div className="relative h-[400px] lg:h-[560px]">
            
            {/* Base: Truck Blueprint — centred, dominant */}
            <div className="ta-layer-chassis absolute inset-0 flex items-center justify-center" style={{ clipPath: "inset(50% 50% 50% 50%)" }}>
              <div className="relative w-full h-full">
                <Image 
                  src="/about_blueprint_truck_light.png" 
                  alt="Truck Blueprint" 
                  fill 
                  className="object-contain drop-shadow-lg" 
                />
              </div>
            </div>

            {/* Overlay: Detail Blueprint — offset top-right */}
            <div className="ta-layer-detail absolute -top-8 -right-8 lg:-right-16 w-[55%] h-[55%]" style={{ clipPath: "inset(0 0 0 100%)" }}>
              <Image 
                src="/about-blueprint.png" 
                alt="Technical Detail" 
                fill 
                className="object-contain mix-blend-multiply" 
              />
            </div>

            {/* Overlay: Ship Blueprint — offset bottom-left */}
            <div className="ta-layer-ship absolute -bottom-4 -left-4 lg:-left-12 w-[45%] h-[45%]" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <Image 
                src="/about_blueprint_ship_light.png" 
                alt="Ship Blueprint" 
                fill 
                className="object-contain mix-blend-multiply" 
              />
            </div>

            {/* Connecting accent lines */}
            <div className="absolute top-[30%] left-[20%] w-[80px] lg:w-[120px] h-[1px] bg-[#D42B2B]/30 ta-divider origin-left" />
            <div className="absolute bottom-[35%] right-[15%] w-[60px] lg:w-[100px] h-[1px] bg-[#D42B2B]/30 ta-divider origin-right" />
          </div>

          {/* ── RIGHT: EDITORIAL TEXT + SPECS ── */}
          <div className="flex flex-col gap-10 lg:gap-14">
            
            <div className="flex flex-col gap-6">
              <span className="ta-text font-mono text-[0.6rem] text-[#D42B2B] uppercase tracking-[0.5em] font-black opacity-0">
                Техничка архитектура // 06
              </span>
              <h2 className="ta-text font-sans text-[clamp(2.2rem,4.5vw,4.5rem)] text-[#111111] leading-[0.88] tracking-tighter uppercase font-black opacity-0">
                Прецизна <br />
                <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] font-normal lowercase">Анатомија.</span>
              </h2>
              <p className="ta-text text-black/50 font-[family-name:var(--font-jost)] text-lg lg:text-xl font-medium leading-relaxed max-w-lg opacity-0">
                Секоја единица во нашата флота е подложена на детални технички анализи. Од аеродинамика до оптимизација на гориво, не оставаме ништо на случајот.
              </p>
            </div>

            {/* Divider */}
            <div className="ta-divider w-full h-[1px] bg-black/10 origin-left" />

            {/* Spec Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              {[
                { label: "Стандард",   val: "ISO-14001" },
                { label: "Инженеринг", val: "BDS-900" },
                { label: "Ефикасност", val: "A++ PLUS" },
                { label: "Структура",  val: "DURALLOY" },
              ].map((spec, i) => (
                <div key={i} className="ta-spec flex flex-col gap-1.5 opacity-0">
                  <span className="text-[0.6rem] font-bold text-black/30 tracking-widest uppercase">{spec.label}</span>
                  <span className="text-2xl font-black text-[#111111] tracking-tighter uppercase">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BOTTOM METADATA ── */}
      <div className="absolute bottom-8 left-16 right-16 flex justify-between items-center opacity-15 hidden lg:flex pointer-events-none select-none">
        <span className="font-mono text-[0.5rem] tracking-[0.5em] uppercase">ASSEMBLY_SEQUENCE_092</span>
        <span className="font-mono text-[0.5rem] tracking-[0.5em] uppercase">KONTRANS // TECH_DEPT</span>
      </div>
    </div>
  );
}
