"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MissionStatement() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".reveal-item",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-10 bg-white pt-32 pb-12 md:pt-48 md:pb-16 px-6 overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col gap-24 lg:gap-32 relative z-10">

        {/* TOP: LARGE EDITORIAL HEADLINE (full width, same as Commitment) */}
        <div className="max-w-5xl">
          <h2 className="reveal-item font-sans text-[clamp(2.2rem,5vw,3.2rem)] text-brand-dark leading-[1.05] tracking-tight font-normal">
            Се посветуваме целосно на нашите <br className="hidden lg:block" />
            партнери и решенијата што ги нудиме, <br className="hidden lg:block" />
            носејќи <span className="text-brand-red italic font-sans font-medium">највисока експертиза.</span>
          </h2>
        </div>

        {/* BOTTOM: MULTI-COL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-20 items-start">

          {/* 1. Left Column: Experience Counter */}
          <div className="reveal-item flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span className="text-[72px] md:text-[90px] font-black leading-none tracking-tighter font-sans text-brand-dark">20</span>
              <span className="text-[48px] md:text-[60px] font-black leading-none text-brand-red">+</span>
            </div>
            <span className="text-[11px] font-bold text-brand-dark uppercase tracking-[0.3em] mt-2 block font-sans">
              ГОДИНИ ИСКУСТВО
            </span>
          </div>

          {/* 2. Middle Column: Body Text */}
          <div className="reveal-item flex flex-col gap-10">
            <div className="max-w-120">
              <p className="text-[16px] md:text-[18px] leading-relaxed text-brand-dark/70 font-sans">
                Ние сме сеопфатен логистички партнер посветен на извонредност.
                Со длабока пасија кон иновациите, ги водиме нашите клиенти кон нови пазари со сигурност и прецизност.
              </p>
            </div>
          </div>

          {/* 3. Right Column: Identification Tag */}
          <div className="reveal-item flex flex-col items-end">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                001 // ФИЛОЗОФИЈА
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
