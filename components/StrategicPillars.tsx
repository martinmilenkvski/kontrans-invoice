"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { KineticButton } from "./ui/KineticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    id: "card-1",
    index: "01",
    title: "Брзина",
    subtitle: "Speed // Logistics",
    image: "/about-highway.png",
    description: "Најбрза можна дистрибуција преку нашата оптимизирана мрежа на транспортни канали.",
  },
  {
    id: "card-2",
    index: "02",
    title: "Прецизност",
    subtitle: "Precision // Safety",
    image: "/about-security.png",
    description: "Мулти-ниво мониторинг и беспрекорна сигурност на секоја пратка во реално време.",
  },
  {
    id: "card-3",
    index: "03",
    title: "Глобална мрежа",
    subtitle: "Global // Network",
    image: "/port-min.png",
    description: "Пристап до секој клучен логистички хаб во светот преку стратешки партнерства.",
  },
];

export function StrategicPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: false, // Pinning is handled by the sticky-viewport wrapper logic if needed, but here we just use the 400vh container
          },
        });

        // 1. Initial State
        gsap.set(".pillar-card", { rotationY: 0 });

        // 2. Header Reveal (0% -> 20%)
        tl.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0);

        // 3. Container Width Narrowing (0% -> 25%)
        tl.to(cardContainerRef.current, { width: "65%", duration: 1 }, 0);

        // 4. Gap Animation (30% -> 50%)
        tl.to(
          cardContainerRef.current,
          {
            gap: "24px",
            duration: 1,
            ease: "power2.inOut",
          },
          1.2
        );

        // 5. Card Flip & Spread (60% -> 90%)
        tl.to(
          ".pillar-card",
          {
            rotationY: 180,
            duration: 2,
            stagger: 0.2,
            ease: "power3.inOut",
          },
          2.5
        );

        // Subtle Fan Effect
        tl.to(
          ".pillar-card:first-child",
          {
            y: 40,
            rotationZ: -8,
            duration: 2,
            ease: "power3.inOut",
          },
          2.5
        );
        tl.to(
          ".pillar-card:last-child",
          {
            y: 40,
            rotationZ: 8,
            duration: 2,
            ease: "power3.inOut",
          },
          2.5
        );

        // Fade out header slightly to focus on cards
        tl.to(headerRef.current, { opacity: 0.3, duration: 1 }, 3);
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-white z-20 border-t border-black/5">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-32 overflow-hidden">
        
        {/* Background Decorative Grid/Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        {/* Header Text */}
        <div className="relative z-30 w-full text-center px-6 mb-16">
          <h2
            ref={headerRef}
            className="font-sans text-[clamp(2.5rem,6vw,5rem)] text-[#111111] leading-[0.8] tracking-tighter font-medium"
          >
            Три столба.<br />
            <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] font-normal tracking-normal lowercase text-[0.9em]">
              една визија.
            </span>
          </h2>
        </div>

        {/* Card Container */}
        <div
          ref={cardContainerRef}
          className="relative w-[100%] h-[50vh] flex perspective-[2000px] gap-0 z-20 transition-all duration-300"
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-card relative flex-1 aspect-[5/7] preserve-3d will-change-transform h-full"
            >
              {/* CARD FRONT: Image Only */}
              <div className="absolute inset-0 backface-hidden overflow-hidden border border-black/5 shadow-xl flex flex-col bg-white">
                <div className="relative flex-1">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover transition-all duration-700"
                  />
                </div>
              </div>

              {/* CARD BACK: Light Professional Theme */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#F9F9F9] border border-black/5 p-8 flex flex-col justify-between shadow-xl">
                <div>
                   <div className="flex justify-between items-start mb-8">
                     <span className="font-mono text-[9px] text-[#D42B2B] tracking-[0.5em] font-medium">({pillar.index})</span>
                     <div className="w-2 h-2 bg-[#D42B2B] rounded-full" />
                   </div>
                   <h4 className="text-[#111111] font-medium text-3xl tracking-tighter mb-6 leading-none">
                     {pillar.title}
                   </h4>
                   <p className="text-[#111111]/70 font-normal text-sm lg:text-base leading-relaxed font-[family-name:var(--font-jost)]">
                     {pillar.description}
                   </p>
                </div>
                
                <div className="flex flex-col gap-4 border-t border-black/5 pt-6">
                   <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-black/10" />
                      <span className="font-mono text-[8px] text-black/30 tracking-widest uppercase">{pillar.subtitle}</span>
                   </div>
                   <div className="w-full h-[1px] bg-gradient-to-r from-[#D42B2B] to-transparent opacity-20" />
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
