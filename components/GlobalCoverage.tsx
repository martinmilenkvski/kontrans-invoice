"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Globe } from "./Globe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DIGIT_H = 80;

function SlotDigit({ digit, delay }: { digit: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { y: 0 },
      {
        y: -(digit * DIGIT_H),
        duration: 2.5,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: ref });

  return (
    <span className="relative inline-block overflow-hidden h-[80px] w-[0.625em]">
      <span ref={ref} className="absolute top-0 flex flex-col">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[80px] flex items-center leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function GlobalCoverage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    const ease = "power4.out";

    // ── STAGGERED ENTRANCE ──
    tl.fromTo(
      ".gc-headline",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease },
      0
    );

    tl.fromTo(
      [".gc-tag", ".gc-subtitle", ".gc-text"],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease, stagger: 0.1 },
      0.4
    );

    tl.fromTo(
      ".gc-globe-wrap",
      { x: -50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 2, ease: "power3.out" },
      0.6
    );

    tl.fromTo(
      ".gc-stat",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease, stagger: 0.1 },
      1.0
    );

    tl.fromTo(
      ".gc-footer-meta",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      1.5
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="network"
      className="relative bg-[#F5F5F0] pt-32 pb-24 overflow-hidden border-t border-[#111111]/05"
    >
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        
        {/* ── TOP: SECTION LABEL ── */}
        <div className="gc-tag mb-12 opacity-0">
          <span className="inline-block px-4 py-2 bg-[#111111]/[0.03] border border-[#111111]/05 text-[0.6rem] font-black text-[#111111]/40 tracking-[0.2em] uppercase">
            Global Network // 07
          </span>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center">
          
          {/* LEFT: THE GLOBE */}
          <div className="gc-globe-wrap relative w-full aspect-square max-w-[650px] mx-auto opacity-0 scale-90">
             {/* Decorative Radar Lines */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[85%] h-[85%] border border-[#D42B2B]/10 rounded-full animate-pulse" />
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#D42B2B]/20 to-transparent rotate-45" />
             </div>
             
             <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Globe 
                  markers={[
                    { location: [41.9981, 21.4254], size: 0.1, id: 'SKP', label: 'Kontrans HQ' },
                    { location: [40.6401, 22.9444], size: 0.08, id: 'SKG', label: 'Thessaloniki Port' },
                    { location: [31.2304, 121.4737], size: 0.08, id: 'SHA', label: 'Shanghai Hub' },
                    { location: [40.7128, -74.006], size: 0.06, id: 'NYC' },
                    { location: [35.6762, 139.6503], size: 0.06, id: 'TKY' },
                    { location: [1.3521, 103.8198], size: 0.06, id: 'SGP' },
                  ]}
                  arcs={[
                    { from: [31.2304, 121.4737], to: [40.6401, 22.9444] }, // Shanghai -> Thessaloniki
                    { from: [40.6401, 22.9444], to: [41.9981, 21.4254] }, // Thessaloniki -> Skopje
                  ]}
                  config={{
                    phi: 0.5,
                    theta: 0.3,
                    dark: 0,
                    baseColor: [1, 1, 1],
                    glowColor: [1, 1, 1],
                    markerColor: [212 / 255, 43 / 255, 43 / 255],
                  }}
                />
             </div>

             {/* Globe Metadata */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 whitespace-nowrap">
                <span className="font-mono text-[0.55rem] text-[#111111]/20 tracking-widest uppercase italic">LIVE_SATELLITE_FEED</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D42B2B] animate-pulse" />
             </div>
          </div>

          {/* RIGHT: NARRATIVE stack */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="gc-subtitle font-mono text-[0.6rem] text-[#D42B2B] tracking-[0.5em] uppercase font-black mb-4 opacity-0">
                ЛОГИСТИКА БЕЗ ГРАНИЦИ
              </h3>
              <h2 className="gc-headline font-sans text-[clamp(2rem,4.5vw,3.5rem)] text-[#111111] leading-[1.02] tracking-tight font-medium opacity-0">
                Од локални херои до <br />
                <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] font-normal">
                  глобални лидери.
                </span>
              </h2>
            </div>

            <p className="gc-text text-[#111111]/60 font-[family-name:var(--font-jost)] text-lg lg:text-xl font-medium leading-relaxed max-w-xl opacity-0">
              Нашата мрежа не е само линија на мапата. Тоа е жив систем кој ги поврзува пазарите, културите и можностите. Со стратешки центри во секој клучен регион, ние го скратуваме патот до вашиот успех.
            </p>

            {/* In-stack stats preview */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-t border-[#111111]/05 pt-12">
              {[
                { label: "ДРЖАВИ", value: 50, suffix: "+" },
                { label: "ПАРТНЕРИ", value: 200, suffix: "+" },
                { label: "ИСПОРAКИ", value: 10, suffix: "K+" },
                { label: "ПОДДРШКА", text: "24/7", value: 0 },
              ].map((stat, i) => (
                <div key={i} className="gc-stat flex flex-col gap-2 opacity-0">
                  {stat.text ? (
                    <span className="font-sans text-5xl lg:text-6xl font-black text-[#111111] tracking-tighter leading-none">
                      {stat.text}
                    </span>
                  ) : (
                    <div className="flex items-center font-sans text-5xl lg:text-6xl font-black text-[#111111] tracking-tighter leading-none">
                      {stat.value.toString().split("").map((d, j) => (
                        <SlotDigit key={j} digit={parseInt(d)} delay={1 + i * 0.1 + j * 0.05} />
                      ))}
                      <span className="text-[#D42B2B] ml-1">{stat.suffix}</span>
                    </div>
                  )}
                  <span className="text-[0.6rem] font-black text-[#111111]/25 tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── FOOTER METADATA ── */}
        <div className="gc-footer-meta mt-32 flex justify-between items-center opacity-0 pointer-events-none select-none border-t border-[#111111]/05 pt-8">
          <span className="font-mono text-[0.55rem] tracking-[0.4em] uppercase text-[#111111]/20">
            NETWORK_STABILITY_V3.0 // ACTIVE
          </span>
          <span className="font-mono text-[0.55rem] tracking-[0.4em] uppercase text-[#111111]/20 text-right">
            КОНТРАНС // ГЛОБАЛЕН ХАБ
          </span>
        </div>

      </div>

      {/* Subtle background ghost number */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] transform rotate-90">
          <span className="text-[30vw] font-black text-[#111111]">07</span>
      </div>
    </section>
  );
}
