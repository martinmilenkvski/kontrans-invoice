"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight, Anchor, Wind, MoveHorizontal, MapPin, Globe2 } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  { id: "OCEAN", label: "Бродски", icon: <Anchor className="w-5 h-5" /> },
  { id: "AIR", label: "Авионски", icon: <Wind className="w-5 h-5" /> },
  { id: "ROAD", label: "Патен", icon: <MoveHorizontal className="w-5 h-5" /> }
];

export function RFQSystem() {
  const [service, setService] = useState("OCEAN");
  const [mounted, setMounted] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTimestamp(new Date().toLocaleTimeString() + " (UTC+2)");
  }, []);

  useGSAP(() => {
    if (!mounted) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    // ── ANIMATION SEQUENCE ──

    // 1. Globe Image Fade-In
    tl.fromTo(".man-visual",
      { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
      0
    );

    // 2. Grid lines grow
    tl.fromTo(".man-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: "power3.inOut", stagger: 0.1 },
      0.2
    );

    // 3. Form Content
    tl.fromTo(".man-reveal-h",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.4
    );

    tl.fromTo(".man-field",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
      0.6
    );

  }, { scope: containerRef, dependencies: [mounted] });

  return (
    <section ref={containerRef} className="relative bg-[#FAFAFA] py-32 lg:py-56 border-t border-black/5">

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── LEFT COLUMN: STICKY GLOBE VISUAL ── */}
          <div className="lg:col-span-5 man-visual opacity-0 sticky top-32 self-start">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-black/5 bg-black/[0.02] flex items-center justify-center">
              <Image
                src="/kontrans-globe.png"
                alt="Global Logistics Network"
                width={1000}
                height={1200}
                className="w-full h-full object-cover opacity-90 mix-blend-multiply"
              />

              {/* Visual Label */}
              <div className="absolute top-10 left-10 flex flex-col gap-2">
                <div className="w-12 h-px bg-[#D42B2B]" />
                <span className="font-mono text-[10px] text-black/40 tracking-[0.4em] uppercase font-bold">NODE_VIS_ALPHA_01</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: HIGH-IMPACT MANIFEST FORM ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* HEADER */}
            <div className="man-reveal-h opacity-0 mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-[#D42B2B] uppercase">LOG_DOC_REF: KNT-2026-X</span>
                <div className="w-1.5 h-1.5 bg-[#D42B2B] rounded-full" />
              </div>
              <h2 className="font-[family-name:var(--font-jost)] text-5xl lg:text-7xl text-[#111111] leading-[0.8] tracking-tighter font-medium uppercase md:normal-case">
                Логистички <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] lowercase font-normal px-2">манифест.</span>
              </h2>
            </div>

            <div className="flex flex-col">
              <div className="man-line w-full h-px bg-black/10 origin-left" />

              {/* MODE */}
              <div className="man-field opacity-0 grid grid-cols-1 md:grid-cols-12 items-center min-h-[120px]">
                <span className="md:col-span-4 font-mono text-[10px] font-bold text-black/40 tracking-[0.4em] uppercase">01/ ТРАНСПОРТ_МОД</span>
                <div className="md:col-span-8 py-8 flex gap-3 flex-wrap">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={`flex items-center gap-4 px-10 py-5 border transition-all duration-500 font-medium text-xs tracking-widest uppercase
                            ${service === s.id
                          ? "bg-[#111111] border-[#111111] text-white shadow-xl shadow-black/10"
                          : "border-black/5 text-black/30 hover:border-black/30 hover:text-black"}`}
                    >
                      {s.icon} <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="man-line w-full h-px bg-black/10 origin-left" />

              {/* ORIGIN */}
              <div className="man-field opacity-0 grid grid-cols-1 md:grid-cols-12 items-center min-h-[140px]">
                <span className="md:col-span-4 font-mono text-[10px] font-bold text-black/40 tracking-[0.4em] uppercase">02/ ПРЕЗЕМАЊЕ_ОД</span>
                <div className="md:col-span-8 relative flex items-center">
                  <MapPin className="absolute left-0 text-black/10 w-8 h-8 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Vnesete lokacija..."
                    className="w-full bg-transparent pl-14 py-8 text-2xl lg:text-4xl font-normal text-[#111111] tracking-tighter outline-none placeholder:text-black/5 focus:text-[#D42B2B] transition-colors"
                  />
                </div>
              </div>

              <div className="man-line w-full h-px bg-black/10 origin-left" />

              {/* DESTINATION */}
              <div className="man-field opacity-0 grid grid-cols-1 md:grid-cols-12 items-center min-h-[140px]">
                <span className="md:col-span-4 font-mono text-[10px] font-bold text-black/40 tracking-[0.4em] uppercase">03/ ИСПОРАКА_ДО</span>
                <div className="md:col-span-8 relative flex items-center">
                  <MapPin className="absolute left-0 text-black/10 w-8 h-8 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Krajna destinacija..."
                    className="w-full bg-transparent pl-14 py-8 text-2xl lg:text-4xl font-normal text-[#111111] tracking-tighter outline-none placeholder:text-black/5 focus:text-[#D42B2B] transition-colors"
                  />
                </div>
              </div>

              <div className="man-line w-full h-px bg-black/10 origin-left" />

              {/* SPECS */}
              <div className="man-field opacity-0 grid grid-cols-1 md:grid-cols-12 items-start py-12">
                <span className="md:col-span-4 font-mono text-[10px] font-bold text-black/40 tracking-[0.4em] uppercase py-2">04/ СПЕЦИФИКАЦИЈА</span>
                <div className="md:col-span-8">
                  <textarea
                    rows={3}
                    placeholder="Тежина, волумен, вид на стока (пр. 24t, 80m3, Палети)..."
                    className="w-full bg-transparent text-xl font-normal text-[#111111] tracking-tight outline-none placeholder:text-black/10 focus:text-[#D42B2B] transition-all resize-none"
                  />
                </div>
              </div>

              <div className="man-line w-full h-px bg-black/10 origin-left" />

            </div>

            {/* ACTIONS */}
            <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-12">
              <div className="man-reveal-h opacity-0 flex flex-col gap-2">
                <span className="font-mono text-[9px] text-black/30 tracking-[0.4em] uppercase">Logistic_System_Node // verified</span>
                <span className="font-mono text-[9px] text-black/10 tracking-[0.3em] uppercase">{timestamp}</span>
              </div>

              <button className="man-reveal-h opacity-0 group relative flex items-center gap-10 px-14 py-8 bg-[#111111] overflow-hidden transition-all duration-700 w-full sm:w-auto">
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D42B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <span className="relative z-10 text-2xl font-medium tracking-tighter text-white uppercase sm:normal-case">Пресметај рута</span>
                <div className="relative z-10 w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-[#D42B2B] group-hover:border-[#D42B2B] transition-all duration-500">
                  <MoveRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
