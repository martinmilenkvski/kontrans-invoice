"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import ShippingContainer from "./ShippingContainer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // PREPARE INITIAL STATES
    // ----------------------------------------------------------------------
    // Main outline path: Needs to start invisible so it can be 'drawn' out.
    // SVG stroke length for this asset is around 500
    gsap.set(".main-path", { strokeDasharray: 520, strokeDashoffset: 520 });
    
    // Details (inner grid/corrugation): Start scaled down
    gsap.set(".detail-item", { scaleY: 0, scaleX: 0, transformOrigin: "bottom" });
    gsap.set(".grid-line", { opacity: 0, scaleY: 0, transformOrigin: "center" });
    
    // UI elements: start hidden
    gsap.set([".bp-header", ".bp-sub", ".bp-msg-body", ".bp-stat-item"], { y: 60, opacity: 0 });
    gsap.set(".laser-line", { y: "-100%", opacity: 0 });
    
    // Core Container wrapper: Start massive in the center of viewport
    gsap.set(".bp-unit-reveal", { scale: 3.5, y: -50, transformOrigin: "center center" });

    // MASTER TIMELINE
    // ----------------------------------------------------------------------
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Extends the pin so there's a lot of scroll-room
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // STEP 1: Draw the wireframe outline ("Image 1")
    tl.to(".main-path", { 
      strokeDashoffset: 0, 
      duration: 3, 
      ease: "power2.inOut" 
    });

    // STEP 2: Draw inner details ("Image 2")
    tl.to(".detail-item", { 
      scaleY: 1, 
      scaleX: 1, 
      duration: 2, 
      stagger: 0.1, 
      ease: "power2.out" 
    }, "-=0.5");
    
    tl.to(".grid-line", { 
      opacity: 0.4, 
      scaleY: 1, 
      duration: 1.5, 
      ease: "power1.out" 
    }, "-=1.5");

    // STEP 3: Connect to layout - Shrink container into the middle column position
    tl.to(".bp-unit-reveal", { 
      scale: 1, 
      y: 0, 
      duration: 3, 
      ease: "power4.inOut" 
    });

    // STEP 4: Lock-in sequence - Text Staggers and Laser scans
    tl.fromTo(".laser-line", 
      { y: "-100%", opacity: 0 }, 
      { y: "100%", opacity: 1, duration: 2, ease: "none" }, 
      "-=1.5"
    );

    tl.to([".bp-sub", ".bp-header", ".bp-msg-body", ".bp-stat-item"], { 
      y: 0, 
      opacity: 1, 
      duration: 1.5, 
      ease: "power3.out", 
      stagger: 0.1 
    }, "-=1.5");
    
    // Atmospheric pulsing glow in background
    tl.to(".bp-glow", { opacity: 1, duration: 3, repeat: -1, yoyo: true }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="relative h-screen bg-[#FAFAFA] overflow-hidden border-b border-black/5 flex items-center justify-center">
      
      <div className="bp-glow absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_40%,rgba(212,43,43,0.03)_0%,transparent_70%)] opacity-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 lg:px-6 py-20 lg:py-0 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: IMAGE 1 & CONTAINER SPECS */}
        <div className="flex flex-col gap-12 pt-10">
            <div className="flex flex-col gap-4 bp-msg-body">
                <div className="relative aspect-square w-full shadow-lg">
                    <Image src="/service_ocean_dark_cinematic_1775397818540.png" alt="Terminal Hub" fill className="object-cover grayscale" />
                </div>
                <div className="flex justify-between items-center opacity-40">
                   <span className="font-[family-name:var(--font-jost)] text-[0.55rem] font-black uppercase tracking-[0.1em]">[01] GLOBAL RESEARCH HUB</span>
                   <span className="font-[family-name:var(--font-jost)] text-[0.55rem] font-black uppercase tracking-[0.1em]">©2026</span>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 bp-stat-item pt-8 mt-10">
               <h3 className="font-[family-name:var(--font-jost)] text-[0.65rem] font-black text-[#D42B2B] uppercase tracking-[0.2em] mb-2 border-b border-[#D42B2B] pb-3">ОПРЕМА И КОНТЕЈНЕРИ</h3>
               <div className="flex flex-col gap-3 border-l border-[#D42B2B] pl-4">
                 {[
                   { type: "20' STANDARD", desc: "Општ товар" },
                   { type: "40' HIGH CUBE", desc: "Зголемен волумен" },
                   { type: "45' HIGH CUBE", desc: "Макс. капацитет" },
                   { type: "REFRIGERATED", desc: "Термо контрола" }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-black/5 pb-2">
                     <span className="font-[family-name:var(--font-jost)] text-[0.65rem] font-black uppercase text-[#111111]">{item.type}</span>
                     <span className="font-[family-name:var(--font-jost)] text-[0.5rem] uppercase font-bold text-black/40 text-right">{item.desc}</span>
                   </div>
                 ))}
               </div>
            </div>
        </div>

        {/* MIDDLE COLUMN: MAIN TITLE, SVG CONTAINER, MAIN STATS */}
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 lg:py-16 h-full">
            <div className="w-full flex flex-col gap-6 bp-header max-w-xl self-start lg:pl-[10%]">
                <h2 className="font-[family-name:var(--font-jost)] text-[3rem] text-[#111111] leading-[1.0] tracking-tighter font-medium text-left">
                  Повеќе од <br /> 
                  <span className="text-[#D42B2B]">логистика.</span>
                </h2>
                <p className="text-[#111111] font-[family-name:var(--font-jost)] text-lg lg:text-xl font-medium leading-relaxed text-left">
                  Ние градиме патишта таму каде што другите гледаат граници. Секој контејнер е ветување, секоја рута е прецизно исцртан успех.
                </p>
            </div>

            <div className="relative flex items-center justify-center w-full h-[400px] lg:h-[450px] mt-4 bg-[#fafafa]">
                <div className="bp-unit-reveal absolute inset-x-0 bottom-10 top-10 bg-[radial-gradient(circle_at_center,rgba(212,43,43,0.02)_0%,transparent_70%)]" />
                <div className="bp-unit-reveal relative z-10 will-change-transform w-full h-full flex items-center justify-center">
                    <ShippingContainer manual={true} />
                </div>
                {/* VERTICAL RED LASER LINE */}
                <div className="laser-line absolute top-0 bottom-0 left-[30%] lg:left-[35%] w-[2px] bg-[#D42B2B] z-20 pointer-events-none" />
            </div>

            <div className="w-full flex justify-center gap-16 lg:gap-20 mt-6 bp-msg-body">
                <div className="flex flex-col gap-1 text-left border-r border-[#D42B2B] pr-16 py-2">
                    <span className="text-4xl lg:text-[3.5rem] font-medium text-[#111111] tracking-tighter font-[family-name:var(--font-jost)]">99%</span>
                    <span className="text-[0.45rem] font-black text-black/40 tracking-widest uppercase font-[family-name:var(--font-jost)] pt-2 whitespace-nowrap">Точност на <br /> Испорака</span>
                </div>
                <div className="flex flex-col gap-1 text-left py-2">
                    <span className="text-4xl lg:text-[3.5rem] font-medium text-[#111111] tracking-tighter font-[family-name:var(--font-jost)]">24/7</span>
                    <span className="text-[0.45rem] font-black text-black/40 tracking-widest uppercase font-[family-name:var(--font-jost)] pt-2 whitespace-nowrap">Мрежно <br /> Следење</span>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: ISO BOX & IMAGE 2 */}
        <div className="flex flex-col gap-16 pt-20">
            <div className="flex flex-col gap-8 bg-[#fdfdfd] p-8 shadow-sm border border-black/5 bp-stat-item">
              {[
                { label: "КВАЛИТЕТ", val: "ISO 9001" },
                { label: "БРЗИНА", val: "24H ACTIVE" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                     <div className="w-1 h-1 bg-[#D42B2B] rounded-full" />
                     <span className="text-[0.55rem] font-black text-[#D42B2B] tracking-widest uppercase font-[family-name:var(--font-jost)]">{stat.label}</span>
                  </div>
                  <span className="text-2xl lg:text-3xl font-medium text-[#111111] tracking-tighter font-[family-name:var(--font-jost)]">{stat.val}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 bp-msg-body">
                <div className="relative aspect-[4/5] w-full shadow-lg">
                    <Image src="/logistics_port_minimalist_1775391957641.png" alt="Logistics Port" fill className="object-cover grayscale" />
                </div>
                <div className="flex justify-between items-center opacity-40">
                   <span className="font-[family-name:var(--font-jost)] text-[0.55rem] font-black uppercase tracking-[0.1em]">[02] KINETIC SECURE</span>
                   <span className="font-[family-name:var(--font-jost)] text-[0.55rem] font-black uppercase tracking-[0.1em]">©2026</span>
                </div>
            </div>
        </div>

      </div>

    </section>
  );
}
