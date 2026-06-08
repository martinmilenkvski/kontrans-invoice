"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Ship, Truck, Box, Factory } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticButton } from "../ui/KineticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function InfrastructureGridWhitespace() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Force a refresh once everything is rendered
    ScrollTrigger.refresh();


    // 2. Cinematic Image Reveals (Sliding Door - Trigger Once)
    const images = gsap.utils.toArray(".ws-img-reveal");
    images.forEach((img: any) => {
      // THE REVEAL (Sliding Door)
      gsap.fromTo(img,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // THE PARALLAX (Scrub)
      const innerImg = (img as HTMLElement).querySelector(".ws-parallax-img");
      if (innerImg) {
        gsap.fromTo(innerImg,
          { 
            yPercent: -20, 
            scale: 1.15,
            transformOrigin: "center center"
          },
          {
            yPercent: 20,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          }
        );
      }
    });

    // 3. Independent Text Reveals (Individual Triggers)
    const items = gsap.utils.toArray(".ws-content-block");
    items.forEach((item: any) => {
      const tl = gsap.timeline({
        scrollTrigger: { 
          trigger: item, 
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo((item as HTMLElement).querySelector(".rev-sub"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo((item as HTMLElement).querySelector(".rev-title"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo((item as HTMLElement).querySelector(".rev-desc"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 1, ease: "power2.out" },
        "-=0.7"
      )
      .fromTo((item as HTMLElement).querySelector(".rev-link"),
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#FFFFFF] py-40 overflow-hidden border-t border-black/10">
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* HEADER */}
        <div className="ws-reveal mb-48 max-w-4xl">
          <span className="font-mono text-[11px] font-black tracking-[0.4em] text-brand-red uppercase mb-6 block">004 // Инфраструктура и капацитет</span>
          <h2 className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-black text-brand-dark leading-[0.9] tracking-tighter mb-12">
            Инфраструктура.<br />Капацитет.
          </h2>
          <p className="font-sans text-xl text-brand-dark/80 max-w-lg leading-relaxed font-semibold">
             Нашата мрежа е дизајнирана за висок проток, мапирана со хируршка прецизност низ сите индустриски граници.
          </p>
        </div>

        {/* NODE 01 (Food-Grade) */}
        <div className="ws-node-section grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-32 items-end mb-60 relative">
          <div className="ws-content-block md:col-span-5 pb-12">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 bg-brand-red flex items-center justify-center rounded-sm">
                  <Box className="text-white w-6 h-6" />
               </div>
               <span className="rev-sub text-[11px] font-black tracking-widest text-brand-red uppercase font-mono">NODE_01 // FOOD_GRADE & BULK</span>
            </div>
            <h3 className="rev-title font-sans text-4xl lg:text-5xl font-black text-brand-dark leading-tight uppercase tracking-tighter mb-8">БЕЗКОМПРОМИСНА ХИГИЕНА.</h3>
            <p className="rev-desc text-brand-dark/80 font-bold text-lg leading-relaxed mb-10 max-w-sm italic border-l-4 border-brand-red pl-6">Строги протоколи за температурна контрола и безбедност на храна. Оптимизиран проток за палмово масло, лимонска киселина и сензитивни стоки.</p>
            <Link href="/contact" className="rev-link px-10 py-5 bg-brand-dark text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-brand-red transition-all inline-block">
               REQUEST_SPEC
            </Link>
          </div>
          <div className="ws-reveal md:col-span-7 relative aspect-4/5 overflow-hidden">
             <div className="ws-img-reveal absolute inset-0 z-10 overflow-hidden">
                <Image 
                  src="/warehouse_food_grade_cinematic_1776507544419.png" 
                  alt="Warehouse" 
                  fill 
                  className="ws-parallax-img object-cover will-change-transform" 
                />
             </div>
             <div className="absolute top-10 left-10 p-4 border-l-2 border-t-2 border-brand-red text-[10px] text-white font-black bg-black/20 backdrop-blur-sm z-20">ZONE_P01</div>
          </div>
        </div>

        {/* NODE 02 (Automotive) */}
        <div className="ws-node-section grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-32 items-center mb-60">
          <div className="md:col-span-8 relative aspect-video overflow-hidden order-2 md:order-1">
             <div className="ws-img-reveal absolute inset-0 z-10 overflow-hidden">
                <Image 
                  src="/industrial_steel_automotive_cinematic_1776507561745.png" 
                  alt="Automotive" 
                  fill 
                  className="ws-parallax-img object-cover will-change-transform" 
                />
             </div>
             <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-brand-red" />)}
             </div>
          </div>
          <div className="ws-content-block md:col-span-4 order-1 md:order-2">
            <div className="w-12 h-px bg-brand-red mb-12" />
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 bg-brand-dark flex items-center justify-center rounded-sm">
                  <Factory className="text-white w-6 h-6" />
               </div>
               <span className="rev-sub text-[11px] font-black tracking-widest text-brand-red uppercase font-mono">NODE_02 // AUTOMOTIVE & HEAVY</span>
            </div>
            <h3 className="rev-title font-sans text-4xl lg:text-5xl font-black text-brand-dark leading-tight uppercase tracking-tighter mb-8">ИНДУСТРИСКА ПРЕЦИЗНОСТ.</h3>
            <p className="rev-desc text-brand-dark/80 font-bold text-lg leading-relaxed">Континуиран синџир на снабдување за автомобилски делови и тешка машинерија. Дизајнирано да одржи производните линии во движење.</p>
          </div>
        </div>

        {/* NODE 03 (Retail Centered - EXPERIMENTAL) */}
        <div className="ws-node-section relative py-20 flex flex-col items-center">
            <div className="w-full max-w-325 relative aspect-21/9 overflow-hidden">
                <div className="ws-img-reveal absolute inset-0 z-10 overflow-hidden">
                    <Image 
                        src="/logistics_retail_consumer_cinematic.png" 
                        alt="Retail Logistics" 
                        fill 
                        className="ws-parallax-img object-cover grayscale-30 will-change-transform" 
                    />
                </div>
            </div>

            {/* IMPACT CARD - AGGRESSIVE OFFSET */}
            <div className="ws-content-block relative z-30 -mt-32 md:-mt-48 max-w-2xl bg-white p-12 lg:p-16 border-r-4 border-b-4 border-brand-red shadow-2xl">
                {/* Blueprint Accent Lines */}
                <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-brand-red" />
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-black/20" />
                
                <div className="flex items-center justify-center gap-4 mb-8">
                   <div className="w-12 h-12 border-2 border-brand-red flex items-center justify-center rounded-full">
                      <Truck className="text-brand-red w-6 h-6" />
                   </div>
                   <span className="rev-sub text-[11px] font-black tracking-widest text-brand-red uppercase font-mono text-center">NODE_03 // RETAIL & CONSUMER</span>
                </div>
                <h3 className="rev-title font-sans text-4xl lg:text-6xl font-black text-brand-dark leading-tight uppercase tracking-tighter mb-10 text-center">СКАЛАБИЛНА ДИСТРИБУЦИЈА.</h3>
                <p className="rev-desc text-brand-dark/90 font-bold text-lg leading-relaxed text-center mb-12">
                   Брз транспорт на стоки за широка потрошувачка, играчки и опрема. Агилни решенија за сезонски пикови и висок волумен.
                </p>
                <div className="rev-link flex justify-center">
                    <Link href="/contact" className="inline-flex items-center gap-6 px-12 py-6 bg-brand-red text-white text-[11px] font-black tracking-widest uppercase hover:bg-black transition-all">
                        DEPLOY_SCALE <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>

        {/* Section Lead-Out */}
        <div className="flex justify-center mt-32">
          <KineticButton text="Види повеќе" href="#infrastructure-details" />
        </div>

      </div>
      
    </section>
  );
}
