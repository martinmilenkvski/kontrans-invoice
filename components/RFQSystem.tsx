"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight, ClipboardCheck, Anchor, Wind, MoveHorizontal } from "lucide-react";
import { KineticButton } from "./ui/KineticButton";

export function RFQSystem() {
  const [service, setService] = useState("OCEAN");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".man-reveal", 
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-white py-40 overflow-hidden border-y border-black/10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-4">
        
        <div className="border-x border-black/10 shadow-[20px_20px_0px_#D42B2B]">
          
          {/* MANIFEST HEADER */}
           <div className="man-reveal p-12 border-b border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-[#111111] text-white">
              <div className="flex flex-col gap-4">
                 <span className="font-mono text-[9px] font-medium tracking-[0.4em] text-[#D42B2B]">005 // Logistics_manifest</span>
                 <div className="flex items-center gap-6">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                       <ClipboardCheck className="text-[#D42B2B] w-5 h-5" />
                    </div>
                    <h2 className="font-sans text-4xl lg:text-5xl font-medium tracking-tighter leading-[0.8]">Логистички манифест.</h2>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase">Mode: Active</span>
                 <span className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase">Form_v06.3 // Final</span>
              </div>
           </div>

          {/* MANIFEST CONTENT */}
          <div className="flex flex-col bg-white">
              
              {/* ROW 1: MODE */}
              <div className="man-reveal grid grid-cols-1 md:grid-cols-12 border-b border-black/10 hover:bg-black/[0.02] transition-colors">
                 <div className="md:col-span-3 p-10 font-mono text-[10px] font-medium text-black/40 border-r border-black/10 flex items-center justify-between bg-[#F2F2F2]">
                    <span className="tracking-widest capitalize">01_Вид_на_транспорт</span>
                    <div className="w-1.5 h-1.5 bg-[#D42B2B]" />
                 </div>
                 <div className="md:col-span-9 p-8 flex gap-4 flex-wrap items-center">
                    {[
                      { id: "Бродски", icon: <Anchor className="w-4 h-4" /> },
                      { id: "Авионски", icon: <Wind className="w-4 h-4" /> },
                      { id: "Патен", icon: <MoveHorizontal className="w-4 h-4" /> }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setService(s.id)}
                        className={`flex items-center gap-4 px-10 py-4 border transition-all font-medium text-xs tracking-widest
                          ${service === s.id ? "bg-[#D42B2B] border-[#D42B2B] text-white shadow-lg shadow-[#D42B2B]/20" : "border-black/5 text-black/40 hover:border-black hover:text-black"}`}
                      >
                        {s.icon} <span className="uppercase">{s.id}</span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* ROW 2: ORIGIN */}
              <div className="man-reveal grid grid-cols-1 md:grid-cols-12 border-b border-black/10 hover:bg-black/[0.02] transition-colors">
                 <div className="md:col-span-3 p-10 font-mono text-[10px] font-medium text-black/40 border-r border-black/10 flex items-center justify-between bg-[#F2F2F2]">
                    <span className="tracking-widest capitalize">02_ЛОКАЦИЈА_ПРЕЗЕМАЊЕ</span>
                    <div className="w-1.5 h-1.5 bg-black/10" />
                 </div>
                 <div className="md:col-span-9 flex items-center">
                    <input type="text" placeholder="Локација на преземање..." className="w-full bg-transparent px-10 py-12 text-3xl font-light tracking-tighter outline-none placeholder:text-black/20 focus:text-[#D42B2B] transition-colors" />
                 </div>
              </div>

              {/* ROW 3: DESTINATION */}
              <div className="man-reveal grid grid-cols-1 md:grid-cols-12 border-b border-black/10 hover:bg-black/[0.02] transition-colors">
                 <div className="md:col-span-3 p-10 font-mono text-[10px] font-medium text-black/40 border-r border-black/10 flex items-center justify-between bg-[#F2F2F2]">
                    <span className="tracking-widest capitalize">03_КРАЈНА_ДЕСТИНАЦИЈА</span>
                    <div className="w-1.5 h-1.5 bg-black/10" />
                 </div>
                 <div className="md:col-span-9 flex items-center">
                    <input type="text" placeholder="Крајна дестинација..." className="w-full bg-transparent px-10 py-12 text-3xl font-light tracking-tighter outline-none placeholder:text-black/20 focus:text-[#D42B2B] transition-colors" />
                 </div>
              </div>

              {/* ROW 4: SPECS */}
              <div className="man-reveal grid grid-cols-1 md:grid-cols-12 border-b border-black hover:bg-black/[0.02] transition-colors">
                 <div className="md:col-span-3 p-10 font-mono text-[10px] font-medium text-black/40 border-r border-black/10 flex items-center justify-between bg-[#F2F2F2]">
                    <span className="tracking-widest capitalize">04_СПЕЦИФИКАЦИЈА_СТОКА</span>
                    <div className="w-1.5 h-1.5 bg-black/10" />
                 </div>
                 <div className="md:col-span-9 p-10">
                    <textarea rows={4} placeholder="Внесете тежина, волумен и вид на стока (пр. 24t, 80m3, Палети)..." className="w-full bg-transparent text-xl font-normal tracking-tight outline-none placeholder:text-black/20 focus:text-[#D42B2B] transition-all resize-none" />
                 </div>
              </div>

          </div>

          {/* MANIFEST FOOTER */}
          <div className="man-reveal p-12 flex flex-col md:flex-row justify-between items-center gap-12 bg-white">
              <div className="text-[9px] font-medium font-mono text-black/30 space-y-2 uppercase tracking-widest">
                  <div>Автентикација: Validated_System</div>
                  <div>Ниво_на_прецизност: Engineering_v04</div>
                  <div>Временски_печат: {new Date().toISOString().split('T')[0]} // Local_Time</div>
              </div>
              <button className="group relative pr-20 py-8 bg-[#111111] border border-black overflow-hidden transition-all duration-500 w-fit">
                  <div className="absolute inset-0 bg-[#D42B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="relative z-10 flex items-center gap-8 pl-12">
                    <span className="text-xl font-medium tracking-tighter text-white group-hover:text-white transition-colors duration-500">Пресметај рута</span>
                    <MoveRight className="w-8 h-8 text-[#D42B2B] group-hover:text-white group-hover:translate-x-4 transition-all duration-500" />
                  </div>
              </button>
          </div>
        </div>

      </div>
    </section>
  );
}
