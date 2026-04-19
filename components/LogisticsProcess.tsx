"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { id: "01", title: "Побарај Понуда", desc: "Контактирајте нè за персонализирано логистичко решение." },
  { id: "02", title: "Понуда", desc: "Добијте прецизна понуда базирана на вашите спецификации." },
  { id: "03", title: "24ч Детален План", desc: "Изработуваме целосен план за транспорт во рекордно време." },
  { id: "04", title: "Сигурна Достава", desc: "Вашата пратка стигнува безбедно до финалната дестинација." }
];

const radicalOptions = [
  { id: 1, name: "Scanline Timeline" },
  { id: 2, name: "Cascading Staircase" },
  { id: 3, name: "Navigation Quadrant" },
  { id: 4, name: "Split Horizon" },
  { id: 5, name: "Blueprint Zoom" },
];

export function LogisticsProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    if (!mounted) return;

    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === containerRef.current) t.kill();
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        }
      });

      // Global Reset
      gsap.set(".rad-video", { xPercent: 0, yPercent: 0, opacity: 1, scale: 1, x: 0, y: 0 });
      gsap.set(".rad-text", { opacity: 0, y: 30, x: 0 });
      gsap.set(".rad-blueprint", { scale: 1, x: 0, y: 0 });
      gsap.set(".rad-line", { scaleX: 0, opacity: 0 });

      switch (activeMode) {
        case 1: // SCANLINE TIMELINE
          tl.set(".rad-video", { width: "120px", height: "400px" });
          steps.forEach((_, i) => {
            tl.to(".rad-video", { x: (i * 250) - 400, duration: 1 }, i * 1.5);
            tl.fromTo(`.rad-text-${i}`, { opacity: 0, y: i % 2 === 0 ? 100 : -100 }, { opacity: 1, y: i % 2 === 0 ? 250 : -250, duration: 0.8 }, i * 1.5 + 0.2);
            if (i < 3) tl.to(`.rad-text-${i}`, { opacity: 0, duration: 0.5 }, (i + 1) * 1.5 - 0.2);
          });
          break;

        case 2: // CASCADING STAIRCASE
          const stairs = [{x: -350, y: -200}, {x: 250, y: -50}, {x: -250, y: 150}, {x: 350, y: 300}];
          steps.forEach((_, i) => {
            tl.to(".rad-video", { x: stairs[i].x, y: stairs[i].y, duration: 1, ease: "power2.inOut" }, i * 1.5);
            tl.fromTo(`.rad-text-${i}`, { opacity: 0, x: stairs[i].x > 0 ? -300 : 300 }, { opacity: 1, x: stairs[i].x > 0 ? -450 : 450, duration: 0.8 }, i * 1.5 + 0.2);
            if (i < 3) tl.to(`.rad-text-${i}`, { opacity: 0, duration: 0.5 }, (i + 1) * 1.5 - 0.2);
          });
          break;

        case 3: // NAVIGATION QUADRANT
          const quads = [{x: -300, y: -200}, {x: 300, y: 200}, {x: 300, y: -200}, {x: -300, y: 200}];
          steps.forEach((_, i) => {
            tl.to(".rad-video", { x: quads[i].x, y: quads[i].y, duration: 1, ease: "slow(0.7, 0.7, false)" }, i * 1.5);
            tl.fromTo(`.rad-text-${i}`, { opacity: 0 }, { opacity: 1, duration: 0.8 }, i * 1.5 + 0.5);
            if (i < 3) tl.to(`.rad-text-${i}`, { opacity: 0, duration: 0.5 }, (i + 1) * 1.5 - 0.2);
          });
          break;

        case 4: // SPLIT HORIZON (Counter-Motion)
          tl.set(".rad-video", { y: -150 });
          steps.forEach((_, i) => {
            tl.to(".rad-video", { x: (i % 2 === 0 ? -200 : 200), duration: 1 }, i * 1.5);
            tl.fromTo(`.rad-text-${i}`, { x: (i % 2 === 0 ? 200 : -200), opacity: 0 }, { x: (i % 2 === 0 ? 100 : -100), y: 150, opacity: 1, duration: 1 }, i * 1.5);
            if (i < 3) tl.to(`.rad-text-${i}`, { opacity: 0, duration: 0.5 }, (i + 1) * 1.5 - 0.2);
          });
          break;

        case 5: // BLUEPRINT ZOOM
          steps.forEach((_, i) => {
            const views = [
              { scale: 2.5, x: 400, y: 300 },
              { scale: 2.0, x: -400, y: 200 },
              { scale: 3.0, x: 200, y: -400 },
              { scale: 1.0, x: 0, y: 0 }
            ];
            tl.to(".rad-blueprint", { scale: views[i].scale, x: views[i].x, y: views[i].y, duration: 1.5, ease: "power3.inOut" }, i * 1.5);
            tl.fromTo(`.rad-text-${i}`, { opacity: 0 }, { opacity: 1, duration: 1 }, i * 1.5 + 0.5);
            if (i < 3) tl.to(`.rad-text-${i}`, { opacity: 0, duration: 0.5 }, (i + 1) * 1.5 - 0.2);
          });
          break;
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeMode, mounted]);

  if (!mounted) return null;

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#F2F2F2]">
      
      {/* ── BACKGROUND BLUEPRINT (For Option 5) ── */}
      <div className="rad-blueprint absolute inset-0 z-0 pointer-events-none opacity-10 flex items-center justify-center">
          <div className="w-[200vw] h-[200vh] border-[0.5px] border-black/20" 
               style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
          {/* Static drafting markings */}
          <div className="absolute top-[20%] left-[10%] w-64 h-64 border border-black/10" />
          <div className="absolute bottom-[30%] right-[15%] w-96 h-32 border border-black/10" />
      </div>

      {/* ── CENTRAL HUD AXIS (For Option 1) ── */}
      {activeMode === 1 && (
        <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-black/10 z-0" />
      )}

      {/* ── DYNAMIC VIDEO FRAME ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="rad-video relative w-[400px] h-[500px] bg-white shadow-2xl border border-black/5 overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[0.3]">
            <source src="/bg-kontrans.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-4 left-4 font-mono text-[7px] text-black/40 tracking-[0.3em] uppercase">Ref_Operational_Node</div>
        </div>
      </div>

      {/* ── PROCESS CONTENT ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
         {steps.map((step, idx) => (
           <div key={idx} className={`rad-text rad-text-${idx} absolute p-8 bg-white border border-black/5 shadow-xl min-w-[320px]`}>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-[#D42B2B] font-bold tracking-[0.3em] uppercase">{step.id}</span>
                    <div className="h-[1px] w-8 bg-black/10" />
                 </div>
                 <h3 className="font-sans text-3xl font-medium text-[#111111] leading-none tracking-tighter">
                   {step.title}
                 </h3>
                 <p className="font-[family-name:var(--font-jost)] text-sm text-black/60 leading-relaxed">
                   {step.desc}
                 </p>
              </div>
           </div>
         ))}
      </div>

      {/* ── RADICAL MODE SWITCHER ── */}
      <div className="absolute top-12 left-12 z-50 flex flex-col items-start gap-8 pointer-events-none">
         <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#D42B2B] font-bold tracking-[0.5em] mb-2 uppercase italic underline decoration-1 underline-offset-4">Diverse Layout Lab</span>
            <span className="font-mono text-[8px] text-black/30 tracking-[0.2em] uppercase">Testing radicle spatial logic</span>
         </div>
         <div className="flex gap-2 pointer-events-auto bg-white p-1 border border-black/5 shadow-sm">
            {radicalOptions.map(opt => (
              <button 
                key={opt.id}
                onClick={() => setActiveMode(opt.id)}
                className={`px-4 py-2 text-[9px] font-mono tracking-widest uppercase transition-all
                  ${activeMode === opt.id 
                    ? "bg-[#111111] text-white" 
                    : "text-black/40 hover:bg-black/5"}`}
              >
                {opt.id}. {opt.name}
              </button>
            ))}
         </div>
      </div>

      {/* ── BOTTOM METADATA ── */}
      <div className="absolute bottom-12 right-12 z-50 flex flex-col items-end opacity-20 pointer-events-none">
         <span className="font-mono text-[8px] text-black tracking-[0.6em] uppercase">Kontrans_Process_Audit // v2.0</span>
      </div>

    </section>
  );
}
