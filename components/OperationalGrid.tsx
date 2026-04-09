"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { label: "Active Vessels", value: "42", status: "Nominal" },
  { label: "Truck Fleet", value: "112", status: "Operational" },
  { label: "Storage", value: "85%", status: "High Demand" },
  { label: "Telemetry", value: "24.2ms", status: "Real-time" }
];

export function OperationalGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".og-reveal", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Magnetic micro-animations for cards
    gsap.utils.toArray<HTMLElement>(".og-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * 10;
        
        gsap.to(card, {
          x: xPercent,
          y: yPercent,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#FAFAFA] py-32 px-4 lg:px-6 overflow-hidden">
      
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "100px 100px" }} />

      <div className="relative z-10 w-full max-w-[1700px] mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="og-reveal font-mono text-[0.6rem] text-[#D42B2B] uppercase tracking-[0.6em] font-black opacity-0">
               Operational Intelligence // (05)
            </span>
            <h2 className="og-reveal font-sans text-[clamp(2.5rem,5vw,5rem)] text-[#111111] leading-[0.9] tracking-tighter uppercase font-medium opacity-0">
              Динамична <br /> 
              <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] font-normal lowercase">Инфраструктура.</span>
            </h2>
          </div>
          <p className="og-reveal font-[family-name:var(--font-jost)] text-black/50 text-lg max-w-sm lg:text-right opacity-0">
            Нашата оперативна мрежа се базира на технологија која овозможува целосна видливост и контрола во секоја секунда.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto lg:h-[800px]">
          
          {/* Main Dashboard Card */}
          <div className="og-reveal og-card md:col-span-8 bg-[#111111] p-12 flex flex-col justify-between border border-black group cursor-none opacity-0 shadow-2xl overflow-hidden relative">
            <div className="relative z-10 flex flex-col gap-2">
                <span className="font-mono text-[0.6rem] text-[#D42B2B] tracking-[0.3em] font-bold">SYSTEM_LOG // LIVE</span>
                <h3 className="text-white font-sans text-4xl font-bold tracking-tight uppercase">Глобална Телеметрија</h3>
            </div>
            
            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity">
                <Image src="/stats-dashboard.png" alt="Dashboard" fill className="object-cover grayscale" />
            </div>

            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                {STATS.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <span className="font-mono text-[0.5rem] text-white/40 uppercase tracking-widest">{stat.label}</span>
                        <span className="font-sans text-2xl font-black text-white">{stat.value}</span>
                        <div className="flex items-center gap-1.5 pt-1">
                            <div className="w-1 h-1 rounded-full bg-[#D42B2B] animate-pulse" />
                            <span className="text-[0.45rem] text-[#D42B2B] font-bold uppercase tracking-widest">{stat.status}</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Secondary Stats Card */}
          <div className="og-reveal og-card md:col-span-4 bg-white p-10 flex flex-col justify-between border border-black/5 group opacity-0 shadow-sm overflow-hidden relative">
             <div className="absolute inset-0 z-0 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                <Image src="/stats-truck.png" alt="Truck Stats" fill className="object-cover" />
             </div>
             <div className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-1 bg-[#D42B2B]" />
                <h3 className="font-sans text-2xl font-bold text-[#111111] uppercase tracking-tight">Ефикасност на <br /> Копнена Достава</h3>
                <p className="text-black/50 text-sm font-medium leading-relaxed">
                   Стандардизирани процеси кои гарантираат 99.8% успешност во испораката на пратки низ Европските коридори.
                </p>
             </div>
             <div className="relative z-10 flex flex-col gap-2 pt-6 border-t border-black/5">
                <span className="font-mono text-[0.55rem] text-black/30 tracking-widest uppercase italic">Efficiency Standard</span>
                <span className="font-sans text-4xl font-black text-[#111111]">GOLD TIER</span>
             </div>
          </div>

          {/* Bottom Long Card */}
          <div className="og-reveal og-card md:col-span-12 bg-[#D42B2B] p-12 flex flex-col lg:flex-row items-center justify-between group opacity-0 shadow-xl relative overflow-hidden">
             
             <div className="absolute inset-x-0 top-0 h-[200%] w-full opacity-5 pointer-events-none">
                <Image src="/process-network.png" alt="Network" fill className="object-cover" />
             </div>

             <div className="relative z-10 flex flex-col gap-2">
                <span className="font-mono text-[0.6rem] text-white/50 tracking-[0.3em] font-bold">NETWORK STATUS // ACTIVE</span>
                <h3 className="text-white font-sans text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-none">Приклучете се на нашата <br /> логистичка мрежа.</h3>
             </div>
             
             <button className="relative z-10 mt-8 lg:mt-0 px-10 py-5 bg-white text-black font-sans text-xs font-black tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all shadow-2xl">
                ПОВРЗЕТЕ СЕ // CONNECT
             </button>

             {/* Animated Line Decorative */}
             <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20">
                <div className="h-full bg-white w-24 animate-[slide_2s_infinite_linear]" style={{ animation: 'slide 4s infinite linear' }} />
             </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(1000%); }
        }
      `}</style>
    </section>
  );
}
