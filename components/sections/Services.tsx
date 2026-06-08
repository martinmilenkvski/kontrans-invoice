"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Globe, Wind, Truck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceStacks = [
  {
    id: "01",
    label: "OCEAN FREIGHT",
    title: "Бродски Транспорт",
    description: "Комплетни решенија за контејнерски транспорт (FCL/LCL) преку најголемите светски пристаништа. Оптимизирани рути за максимална ефикасност и сигурност.",
    tier: "Global Network",
    duration: "20-35 Дена",
    buttonText: "ПОВЕЌЕ ДЕТАЛИ",
    image: "/service_ocean_bright.png",
    color: "bg-[#F7F7F7]",
    textColor: "text-[#1A1A1A]",
    accent: "bg-[#D42B2B]",
    icon: <Globe size={20} className="text-white" />,
    isLight: true
  },
  {
    id: "02",
    label: "AIR FREIGHT",
    title: "Авионски Транспорт",
    description: "Најбрзиот начин за пренос на вашиот товар до секоја точка на планетата. Идеално за итни пратки и деликатни стоки со премиум логистика.",
    tier: "Express Priority",
    duration: "2-5 Дена",
    buttonText: "ПОВЕЌЕ ДЕТАЛИ",
    image: "/service_air_bright.png",
    color: "bg-[#D42B2B]",
    textColor: "text-white",
    accent: "bg-white",
    icon: <Wind size={20} className="text-[#D42B2B]" />,
    isLight: false
  },
  {
    id: "03",
    label: "LAND FREIGHT",
    title: "Копнен Транспорт",
    description: "Развиена патна мрежа која ја поврзува Македонија со цела Европа. Дистрибуција од врата до врата со целосен GPS надзор и транспарентност.",
    tier: "Full Coverage",
    duration: "3-7 Дена",
    buttonText: "ПОВЕЌЕ ДЕТАЛИ",
    image: "/service_land_bright.png",
    color: "bg-[#F7F7F7]",
    textColor: "text-[#1A1A1A]",
    accent: "bg-[#D42B2B]",
    icon: <Truck size={20} className="text-white" />,
    isLight: true
  }
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // 1. SCROLL PROGRESS ENGINE (for the sticky stack)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = height - windowHeight;
      const scrolled = -top;

      if (scrollableDistance > 0) {
        const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        setProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalTransitions = serviceStacks.length - 1;
  const cardProgress = progress * totalTransitions;

  // 2. GSAP REVEAL STAGGERS
  useGSAP(() => {
    // Section Header
    gsap.from(".s-header-reveal", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // We can't easily trigger staggers for sticky cards with standard ScrollTrigger
    // because they are all in the viewport at once (sticky).
    // Instead, we'll use a listener or custom logic to trigger animations 
    // when a card's slideProgress crosses a threshold.
  }, { scope: containerRef });

  return (
    <>
      <section
        ref={containerRef}
        id="services"
        className="relative bg-white pt-12 pb-0 px-0 font-[family-name:var(--font-jost)] text-[#1A1A1A]"
        style={{ height: `${serviceStacks.length * 100}vh` }}
      >
        {/* STICKY STAGE */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col pt-[8vh] lg:pt-[10vh]">

          <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12">
            {/* Stack Stage */}
            <div className="relative h-[65vh] lg:h-[70vh] w-full">
              {serviceStacks.map((service, i) => {
                let yPercent = 120;
                let scale = 1;
                let brightness = 1;
                let opacity = 1;

                let slideProgress = 0;

                if (i === 0) {
                  yPercent = 0;
                  slideProgress = 1;
                  const shrinkProgress = Math.max(0, Math.min(1, cardProgress - 0));
                  scale = 1 - (0.05 * shrinkProgress);
                  brightness = 1 - (0.1 * shrinkProgress);
                  opacity = 1 - (0.1 * shrinkProgress);
                } else {
                  slideProgress = Math.max(0, Math.min(1, cardProgress - (i - 1)));
                  yPercent = 130 * (1 - slideProgress);

                  const shrinkProgress = Math.max(0, Math.min(1, cardProgress - i));
                  scale = 1 - (0.05 * shrinkProgress);
                  brightness = 1 - (0.1 * shrinkProgress);
                  opacity = 1 - (0.1 * shrinkProgress);
                }

                // Inner content reveal logic based on slide progress
                const revealStart = 0.85;
                const contentOpacity = i === 0 ? 1 : Math.max(0, Math.min(1, (slideProgress - revealStart) / (1 - revealStart)));
                const contentY = 20 * (1 - contentOpacity);

                return (
                  <div
                    key={i}
                    className={`absolute inset-0 w-full h-full rounded-none overflow-hidden flex flex-col lg:flex-row border border-black/5 ${service.color} will-change-transform`}
                    style={{
                      zIndex: i + 1,
                      transform: `translateY(${yPercent}%) scale(${scale})`,
                      opacity: opacity,
                      filter: `brightness(${brightness})`,
                    }}
                  >
                    {/* Text Side (Left) */}
                    <div
                      className={`flex-1 flex flex-col justify-between p-8 lg:p-12 ${service.textColor}`}
                      style={{ opacity: contentOpacity, transform: `translateY(${contentY}px)` }}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-none flex items-center justify-center bg-transparent">
                            {/* Icon color is handled in serviceStacks data or via cloneElement */}
                            {React.cloneElement(service.icon as any, {
                              size: 24,
                              className: service.isLight ? "text-[#D42B2B]" : "text-white"
                            })}

                          </div>
                          <span className="text-[12px] font-bold tracking-widest uppercase opacity-60">
                            {service.label}
                          </span>
                        </div>
                        <h3
                          className="text-[32px] lg:text-[48px] font-semibold mb-6 tracking-tight leading-tight"
                        >
                          {service.title}
                        </h3>
                        <p
                          className="opacity-70 text-[16px] lg:text-[18px] leading-relaxed mb-8 max-w-[520px]"
                        >
                          {service.description}
                        </p>
                      </div>

                      <div className="space-y-8">
                        {/* Divider */}
                        <div className={`w-full border-t border-dashed ${service.isLight ? 'border-black/10' : 'border-white/20'}`} />

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <span className={`text-[11px] font-bold uppercase tracking-widest block mb-2 ${service.isLight ? 'text-black/40' : 'opacity-40'}`}>МРЕЖА:</span>
                            <span className="text-[18px] lg:text-[20px] font-bold">{service.tier}</span>
                          </div>
                          <div>
                            <span className={`text-[11px] font-bold uppercase tracking-widest block mb-2 ${service.isLight ? 'text-black/40' : 'opacity-40'}`}>ТРАНЗИТ:</span>
                            <span className="text-[18px] lg:text-[20px] font-bold">{service.duration}</span>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className={`w-full border-t border-dashed ${service.isLight ? 'border-black/10' : 'border-white/20'}`} />

                        {/* CTA Button */}
                        <button
                          className="group relative flex items-center gap-4 bg-white px-6 py-4 transition-all duration-500 w-fit overflow-hidden border border-black/5"
                        >
                          {/* Background Slide Effect */}
                          <div className="absolute inset-0 bg-[#D42B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                          <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-black group-hover:text-white transition-colors duration-500">
                            {service.buttonText}
                          </span>

                          <div className="relative z-10 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Image Side (Right) */}
                    <div className="hidden lg:block lg:w-[45%] h-full relative overflow-hidden bg-white">
                      <div
                        className="absolute inset-0 transition-transform duration-1000"
                        style={{ transform: slideProgress > 0.8 ? "scale(1)" : "scale(1.1)" }}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
