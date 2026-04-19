"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Award, Lock, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VERTICALS = [
  {
    id: "003-1",
    tag: "STABILITY_HUB",
    title: "FOOD_GRADE & BULK",
    desc: "Сеопфатни логистички стратегии за прехранбената индустрија. Хигиена, температурна контрола и прецизен тајминг.",
    image: "/warehouse_food_grade_cinematic_1776507544419.png",
    icon: <ShieldCheck className="w-5 h-5 text-[#D42B2B]" />,
    specs: ["-18°C LOCK", "HACCP PRO"]
  },
  {
    id: "003-2",
    tag: "PRECISION_JET",
    title: "AUTOMOTIVE & HEAVY",
    desc: "Поддршка за монтажни линии и тешка индустрија. JIT системи и максимална сигурност при транспорт.",
    image: "/industrial_steel_automotive_cinematic_1776507561745.png",
    icon: <Award className="w-5 h-5 text-[#D42B2B]" />,
    specs: ["JIT_INTEGRATION", "42T_CAP"]
  },
  {
    id: "003-3",
    tag: "SCALE_AGILE",
    title: "RETAIL & CONSUMER",
    desc: "Агилна дистрибуција за широка потрошувачка. Скалабилни решенија за сезонски пикови и висок волумен.",
    image: "/logistics_retail_consumer_cinematic.png",
    icon: <Lock className="w-5 h-5 text-[#D42B2B]" />,
    specs: ["ADAPTIVE_VOLUME", "24/7_SYNC"]
  }
];

export function AuthorityEngineered() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Image Reveals (Sliding Door + Parallax)
    const cardImages = gsap.utils.toArray(".auth-img-reveal");
    cardImages.forEach((img: any) => {
      gsap.fromTo(img,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      const inner = img.querySelector(".auth-parallax-img");
      if (inner) {
        gsap.fromTo(inner,
          { yPercent: -15, scale: 1.1 },
          {
            yPercent: 15,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }
    });

    // 2. Content Stagger
    const cards = gsap.utils.toArray(".auth-card-block");
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-40 bg-[#FFFFFF] py-40 px-6 lg:px-24 border-t border-black/10">
      
      <div className="max-w-[1700px] mx-auto">
        
        {/* HEADER BLOCK (Synchronized with Infrastructure DNA) */}
        <div className="mb-32 max-w-4xl">
           <span className="font-mono text-[11px] font-black tracking-[0.4em] text-[#D42B2B] uppercase mb-6 block">003 // AUTHORITY & TRUST</span>
           <h2 className="font-sans text-[clamp(2.5rem,5vw,5rem)] font-black text-[#111111] leading-[0.9] tracking-tighter uppercase mb-10">
              ГЛОБАЛНА АВТОРИТЕТНОСТ.
           </h2>
           <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="font-sans text-xl text-[#111111]/80 max-w-md leading-relaxed font-semibold italic border-l-4 border-[#D42B2B] pl-6">
                 Ние не само превезуваме; ние инженерираме сигурност низ секој километар на вашата вредносна мрежа.
              </p>
              <div className="bg-[#111111] text-white p-6 md:p-10 flex flex-col gap-4 border-r-4 border-[#D42B2B]">
                  <span className="font-mono text-[9px] font-black tracking-widest opacity-40 uppercase">CERT_VERIFICATION</span>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#D42B2B]" />
                        <span className="font-mono text-[10px] font-black italic">ISO_9001</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#D42B2B]" />
                        <span className="font-mono text-[10px] font-black italic">HACCP_SEC</span>
                     </div>
                  </div>
              </div>
           </div>
        </div>

        {/* SYMMETRICAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
           {VERTICALS.map((item, i) => (
             <div key={item.id} className="auth-card-block md:col-span-12 lg:col-span-4 group">
                
                {/* TECHNICAL CARD HEADER */}
                <div className="flex justify-between items-center py-4 border-b-2 border-black/10 mb-8">
                   <span className="font-mono text-[10px] font-black text-[#111111]/40 uppercase tracking-widest">{item.id} // {item.tag}</span>
                   {item.icon}
                </div>

                {/* IMAGE BOX */}
                <div className="auth-img-reveal relative aspect-[4/5] overflow-hidden rounded-[8px] mb-10 border border-black/5">
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="auth-parallax-img object-cover will-change-transform"
                     sizes="(max-w-768px) 100vw, 33vw"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* CONTENT */}
                <div className="space-y-6">
                   <h3 className="font-sans text-3xl font-black text-[#111111] leading-none tracking-tighter uppercase">{item.title}</h3>
                   <p className="text-[#111111]/70 font-bold text-[15px] leading-relaxed max-w-[320px]">
                      {item.desc}
                   </p>
                   
                   {/* TECHNICAL SPECS (Inline Manifest) */}
                   <div className="flex flex-wrap gap-3 pt-6">
                      {item.specs.map(spec => (
                        <span key={spec} className="px-4 py-1.5 bg-black/5 border border-black/5 font-mono text-[9px] font-black text-[#111111]/50 uppercase tracking-widest">
                           {spec}
                        </span>
                      ))}
                   </div>
                </div>

             </div>
           ))}
        </div>

        {/* BOTTOM METRIC BAND */}
        <div className="mt-32 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex gap-12">
               <div>
                  <span className="block font-mono text-[9px] font-black text-[#111111]/30 uppercase mb-2">SYSTEM_ACCURACY</span>
                  <span className="block font-sans text-3xl font-black text-[#111111]">99.8%</span>
               </div>
               <div>
                  <span className="block font-mono text-[9px] font-black text-[#111111]/30 uppercase mb-2">GLOBAL_NODES</span>
                  <span className="block font-sans text-3xl font-black text-[#111111]">240+</span>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <span className="font-mono text-[10px] font-black text-[#D42B2B] animate-pulse">SYSTEM_ACTIVE__</span>
               <div className="flex gap-1">
                  {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-1.5 h-6 bg-black/5" />)}
               </div>
            </div>
        </div>

      </div>

    </section>
  );
}
