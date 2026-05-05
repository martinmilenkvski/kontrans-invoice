"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Lock, 
  Settings, 
  Layers, 
  Scan, 
  Zap, 
  Maximize2, 
  Box, 
  Search, 
  MoveHorizontal,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  { id: "01", title: "Побарај Понуда", desc: "Контактирајте нè за персонализирано логистичко решение.", icon: <Search className="w-6 h-6" /> },
  { id: "02", title: "Понуда", desc: "Добијте прецизна понуда базирана на вашите спецификации.", icon: <Settings className="w-6 h-6" /> },
  { id: "03", title: "24ч Детален План", desc: "Изработуваме целосен план за транспорт во рекордно време.", icon: <Scan className="w-6 h-6" /> },
  { id: "04", title: "Сигурна Достава", desc: "Вашата пратка стигнува безбедно до финалната дестинација.", icon: <Lock className="w-6 h-6" /> }
];

const options = [
  { id: 1, name: "Tactical HUD" },
  { id: 2, name: "Vertical Conveyor" },
  { id: 3, name: "Expanding Wave" },
  { id: 4, name: "Glitch Pipeline" },
  { id: 5, name: "3D Cube Rotation" },
  { id: 6, name: "Magnifying Glass" },
  { id: 7, name: "Cinematic Pan" },
  { id: 8, name: "Split Matrix" },
  { id: 9, name: "Perspective Floor" },
  { id: 10, name: "Shifting Prism" },
];

export function ProcessLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeID, setActiveID] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    if (!mounted) return;

    // Reset all triggers and animations on switch
    ScrollTrigger.getAll().forEach(t => {
       if (t.trigger === containerRef.current) t.kill();
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        }
      });

      // COMMON RESET
      gsap.set(".p-step", { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(".p-video-layer", { scale: 1, x: 0, y: 0, rotation: 0, rotationX: 0, rotationY: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" });

      // OPTION SPECIFIC TIMELINES
      switch(activeID) {
        case 1: // TACTICAL HUD
          tl.to(".v-overlay", { opacity: 0.8 }, 0);
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { opacity: 0, x: 30, duration: 0.5 }, (i + 1) * 1.2 - 0.2);
          });
          break;

        case 2: // VERTICAL CONVEYOR
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.inOut" }, i * 1.2);
             tl.to(`.p-step-${i}`, { y: -200, opacity: 0, duration: 1, ease: "power4.inOut" }, (i + 1) * 1.2);
          });
          break;

        case 3: // EXPANDING WAVE
          tl.fromTo(".p-video-layer", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(150% at 50% 50%)", duration: 4 }, 0);
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { scale: 1.5, opacity: 0, duration: 1 }, (i + 1) * 1.2);
          });
          break;

        case 4: // GLITCH PIPELINE
          processSteps.forEach((_, i) => {
             tl.to(".p-video-layer", { x: () => gsap.utils.random(-20, 20), y: () => gsap.utils.random(-20, 20), duration: 0.1, repeat: 5, yoyo: true }, i * 1.2);
             tl.fromTo(`.p-step-${i}`, { opacity: 0, skewX: 20 }, { opacity: 1, skewX: 0, duration: 0.5 }, i * 1.2);
             tl.to(`.p-step-${i}`, { opacity: 0, skewX: -20, duration: 0.5 }, (i + 1) * 1.2);
          });
          break;

        case 5: // 3D CUBE
          gsap.set(".p-cube-wrapper", { perspective: 2000 });
          processSteps.forEach((_, i) => {
             tl.to(".p-video-layer", { rotationY: i * 90, duration: 1, ease: "power2.inOut" }, i * 1.2);
             tl.fromTo(`.p-step-${i}`, { opacity: 0, rotationY: -45 }, { opacity: 1, rotationY: 0, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { opacity: 0, rotationY: 45, duration: 1 }, (i + 1) * 1.2);
          });
          break;

        case 6: // MAGNIFYING GLASS
          tl.fromTo(".v-lens", { x: -500, y: -500, scale: 0 }, { x: 0, y: 0, scale: 1, duration: 1 }, 0);
          processSteps.forEach((_, i) => {
             tl.to(".v-lens", { x: (i % 2 === 0 ? 300 : -300), y: (i < 2 ? -200 : 200), duration: 1.2 }, i * 1.2);
             tl.fromTo(`.p-step-${i}`, { opacity: 0 }, { opacity: 1, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { opacity: 0, duration: 1 }, (i + 1) * 1.2);
          });
          break;

        case 7: // CINEMATIC PAN
          tl.fromTo(".p-video-layer", { xPercent: -20 }, { xPercent: 20, duration: 5, ease: "none" }, 0);
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { x: -100, opacity: 0, duration: 1 }, (i + 1) * 1.2);
          });
          break;

        case 8: // SPLIT MATRIX
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { opacity: 0.3, scale: 0.9, duration: 1 }, (i + 1) * 1.2);
          });
          break;

        case 9: // PERSPECTIVE FLOOR
          gsap.set(".p-video-layer", { rotationX: 45, transformOrigin: "center top" });
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { z: -500, opacity: 0 }, { z: 0, opacity: 1, duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { z: 500, opacity: 0, duration: 1 }, (i + 1) * 1.2);
          });
          break;

        case 10: // SHIFTING PRISM
          processSteps.forEach((_, i) => {
             tl.fromTo(`.p-step-${i}`, { opacity: 0, backdropFilter: "blur(0px)" }, { opacity: 1, backdropFilter: "blur(20px)", duration: 1 }, i * 1.2);
             tl.to(`.p-step-${i}`, { opacity: 0, backdropFilter: "blur(0px)", duration: 1 }, (i + 1) * 1.2);
          });
          break;
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeID, mounted]);

  if (!mounted) return null;

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      
      {/* ── BACKGROUND VIDEO LAYER ── */}
      <div className="absolute inset-0 z-0 p-cube-wrapper">
        <video autoPlay loop muted playsInline className="p-video-layer w-full h-full object-cover opacity-60">
          <source src="/process-video.mp4" type="video/mp4" />
        </video>
        <div className="v-overlay absolute inset-0 bg-black/40" />
      </div>

      {/* ── OPTION SPECIFIC OVERLAYS ── */}
      {activeID === 1 && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-red-500/20" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-red-500/20" />
          <div className="absolute left-0 top-1/2 w-full h-px bg-red-500/20" />
        </div>
      )}

      {activeID === 6 && (
        <div className="v-lens absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <div className="w-100 h-100 border-2 border-white/20 rounded-full shadow-[0_0_100px_rgba(212,43,43,0.2)]" />
        </div>
      )}

      {/* ── CENTRAL PROCESS CONTENT ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none">
        {processSteps.map((step, idx) => (
          <div key={idx} className={`p-step p-step-${idx} absolute flex flex-col items-center gap-8 max-w-4xl`}>
             <div className="w-20 h-20 rounded-full border border-brand-red/40 flex items-center justify-center bg-black/40 backdrop-blur-md">
                <span className="text-brand-red font-mono text-2xl font-bold">{step.id}</span>
             </div>
             <div className="flex flex-col items-center text-center gap-4">
                <h2 className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-[0.8] tracking-tighter font-medium uppercase italic">
                  {step.title}
                </h2>
                <p className="font-(family-name:--font-jost) text-xl text-white/60 max-w-2xl leading-relaxed">
                  {step.desc}
                </p>
             </div>
          </div>
        ))}
      </div>

      {/* ── LAB CONTROLLER (HUD SWITCHER) ── */}
      <div className="absolute bottom-12 left-0 w-full z-50 px-8 flex justify-center items-center pointer-events-none">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-2 flex gap-1 pointer-events-auto shadow-2xl overflow-x-auto max-w-full no-scrollbar">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveID(opt.id)}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all whitespace-nowrap
                ${activeID === opt.id 
                  ? "bg-brand-red text-white shadow-[0_0_20px_rgba(212,43,43,0.4)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              {opt.id}. {opt.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── CORNER DECORATION ── */}
      <div className="absolute top-12 left-12 z-50 flex flex-col gap-2">
         <span className="font-mono text-[9px] text-brand-red tracking-[0.4em] uppercase">Motion_Lab // v1.0</span>
         <span className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase">Select direction for process narrative</span>
      </div>

    </section>
  );
}
