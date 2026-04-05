"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FleetArsenal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal and parallax for grid items
    gsap.utils.toArray<HTMLElement>(".fa-panel").forEach((panel) => {
      gsap.fromTo(panel, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".fa-image").forEach((img) => {
      gsap.fromTo(img, 
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="fleet" className="relative bg-[#FAFAFA] py-32 px-4 lg:px-6">
      <div className="w-full max-w-[1700px] mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col gap-4 fa-panel">
          <span className="font-[family-name:var(--font-jost)] text-[0.65rem] text-[#D42B2B] uppercase tracking-[0.6em] font-black">
            Hardware Division // (04)
          </span>
          <h2 className="font-[family-name:var(--font-jost)] text-[clamp(2.5rem,5vw,5rem)] text-[#111111] leading-[0.9] tracking-tighter uppercase font-medium">
            Индустриска <br /> 
            <span className="text-[#D42B2B]">Ергела.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Massive Panel */}
          <div className="lg:col-span-12 h-[500px] lg:h-[700px] relative overflow-hidden bg-[#111] fa-panel group shadow-xl">
            <div className="absolute inset-0 w-full h-full scale-[1.2]">
              <Image src="/fleet_ocean_cinematic.png" alt="Ocean Freight" fill className="object-cover opacity-80 fa-image grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
               <span className="font-[family-name:var(--font-jost)] text-[0.65rem] text-[#D42B2B] uppercase tracking-[0.3em] font-black">OCEAN FREIGHT</span>
               <span className="font-[family-name:var(--font-jost)] text-3xl font-medium text-white tracking-tighter uppercase">TRIPLE-E CLASS VESSEL</span>
            </div>
            <div className="absolute top-8 right-8 border border-white/10 p-4 backdrop-blur-md bg-white/5 text-white flex flex-col gap-1 text-right hidden sm:flex">
                <span className="font-[family-name:var(--font-jost)] text-[0.55rem] tracking-widest uppercase text-white/50">Capacity</span>
                <span className="font-[family-name:var(--font-jost)] text-xl font-bold">18,000 TEU</span>
            </div>
          </div>

          {/* Secondary Panel: Text */}
          <div className="lg:col-span-5 h-[400px] lg:h-[500px] bg-white border border-black/5 p-10 flex flex-col justify-between fa-panel shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="w-12 h-1 bg-[#D42B2B]" />
              <h3 className="font-[family-name:var(--font-jost)] text-2xl lg:text-3xl font-medium text-[#111111] leading-tight uppercase tracking-tight">Супериорна <br />Копнена Флота</h3>
              <p className="text-black/50 font-[family-name:var(--font-jost)] text-base font-medium leading-relaxed mt-4">
                Нашите транспортни операции се поддржани од најновата генерација на SCANIA и VOLVO тешки возила, оптимизирани за сигурност, брзина и минимална емисија на гасови.
              </p>
            </div>
            <div className="flex flex-col gap-1 pt-6 border-t border-black/5">
                <span className="font-[family-name:var(--font-jost)] text-[0.55rem] tracking-widest uppercase text-black/40">Network Status</span>
                <span className="font-[family-name:var(--font-jost)] text-lg font-bold text-[#D42B2B]">FULLY OPERATIONAL</span>
            </div>
          </div>

          {/* Third Panel: Image */}
          <div className="lg:col-span-7 h-[400px] lg:h-[500px] relative overflow-hidden bg-[#111] fa-panel group shadow-xl">
            <div className="absolute inset-0 w-full h-full scale-[1.2]">
               <Image src="/fleet_land_cinematic.png" alt="Land Freight" fill className="object-cover opacity-80 fa-image grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />
            <div className="absolute bottom-8 left-8 flex flex-col gap-2">
               <span className="font-[family-name:var(--font-jost)] text-[0.65rem] text-[#D42B2B] uppercase tracking-[0.3em] font-black">LAND FREIGHT</span>
               <span className="font-[family-name:var(--font-jost)] text-2xl lg:text-3xl font-medium text-white tracking-tighter uppercase">SCANIA R-SERIES 500</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
