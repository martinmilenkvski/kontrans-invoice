"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Globe } from "./Globe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GlobalCoverage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    tl.fromTo(".gc-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
    tl.fromTo(".gc-globe", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2 }, "-=0.5");
    tl.fromTo(".gc-stat", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, stagger: 0.1 }, "-=1");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="network" className="relative h-screen bg-[#050505] overflow-hidden flex items-center">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Globe Background (Right Offset) */}
      <div className="gc-globe absolute -right-[40%] lg:-right-[10%] top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] lg:w-[1400px] lg:h-[1400px] pointer-events-none opacity-0">
        <Globe />
      </div>

      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-16 justify-center max-w-xl">
            <div className="flex flex-col gap-6">
                <span className="gc-title font-[family-name:var(--font-jost)] text-[0.65rem] text-[#D42B2B] uppercase tracking-[0.6em] font-black opacity-0">
                  Global Architecture // (03)
                </span>
                <h2 className="gc-title font-[family-name:var(--font-jost)] text-[clamp(2.5rem,5vw,5rem)] text-white leading-[0.9] tracking-tighter uppercase font-medium opacity-0">
                  Без <br /> <span className="text-[#D42B2B]">Граници.</span>
                </h2>
                <p className="gc-title text-white/50 font-[family-name:var(--font-jost)] text-lg lg:text-xl font-medium leading-relaxed opacity-0">
                  Нашата логистична мрежа функционира со прецизност на часовник низ сите континенти. Од централните јазли до најоддалечените дестинации, обезбедуваме сигурен и контиуниран проток на капитал.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-t border-white/10 pt-10">
                {[
                  { label: "Држави", val: "50+" },
                  { label: "Испораки", val: "10K+" },
                  { label: "Телеметрија", val: "24/7" },
                  { label: "Партнери", val: "200+" }
                ].map((stat, i) => (
                  <div key={i} className="gc-stat flex flex-col gap-3 opacity-0 border-l border-[#D42B2B] pl-4">
                    <span className="text-4xl lg:text-5xl font-medium text-white tracking-tighter font-[family-name:var(--font-jost)]">{stat.val}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[0.6rem] font-black text-white/40 tracking-widest uppercase font-[family-name:var(--font-jost)]">{stat.label}</span>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
