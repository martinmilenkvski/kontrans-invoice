"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
          },
        });

        // 1. Header Entrance (Independent of scrub)
        gsap.fromTo(".pillar-entrance-left", 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            }
          }
        );

        gsap.fromTo(".pillar-entrance-right", 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power4.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            }
          }
        );

        // 2. Initial State
        gsap.set(".pillar-card", { rotationY: 0 });

        // 3. Image Parallax before flip
        tl.fromTo(".pillar-image", 
          { scale: 1.1, y: "-5%" }, 
          { scale: 1.1, y: "5%", ease: "none", duration: 1 }, 
          0
        );

        // 4. Container Width Narrowing
        tl.to(cardContainerRef.current, { width: "70%", duration: 1 }, 0.5);

        // 5. Gap Animation
        tl.to(
          cardContainerRef.current,
          {
            gap: "32px",
            duration: 1,
            ease: "power2.inOut",
          },
          1
        );

        // 6. Card Flip & Spread
        tl.to(
          ".pillar-card",
          {
            rotationY: 180,
            duration: 2,
            stagger: 0.2,
            ease: "power3.inOut",
          },
          2
        );

        // Subtle Fan Effect
        tl.to(
          ".pillar-card:first-child",
          {
            y: 30,
            rotationZ: -4,
            duration: 2,
            ease: "power3.inOut",
          },
          2
        );
        tl.to(
          ".pillar-card:last-child",
          {
            y: 30,
            rotationZ: 4,
            duration: 2,
            ease: "power3.inOut",
          },
          2
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-white z-20 border-t border-black/5 font-[family-name:var(--font-jost)]">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-32 overflow-hidden">
        
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        {/* Header Section */}
        <div 
          ref={headerRef}
          className="relative z-30 w-full max-w-[1600px] px-6 mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
        >
          {/* Left Column: Description */}
          <div className="pillar-entrance-left opacity-0">
             <p className="text-[16px] md:text-[18px] leading-relaxed text-[#1A1A1A]/70 max-w-[480px]">
                Нашите три стратешки столбови се основата на секоја успешна операција. 
                Преку брзина, прецизност и глобална поврзаност, создаваме логистички решенија кои ја движат вашата визија напред.
             </p>
          </div>

          {/* Right Column: Title */}
          <div className="pillar-entrance-right opacity-0 text-right">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] text-[#1A1A1A] leading-[0.85] tracking-tighter font-medium">
              Три столба. <br />
              <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] font-normal tracking-normal lowercase text-[1.1em] inline-block mt-2">
                една визија.
              </span>
            </h2>
          </div>
        </div>

        {/* Card Container */}
        <div
          ref={cardContainerRef}
          className="relative w-[100%] h-[50vh] flex perspective-[2000px] gap-0 z-20 transition-all duration-300"
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="pillar-card relative flex-1 aspect-[4/5] preserve-3d will-change-transform h-full"
            >
              {/* CARD FRONT: Image Only */}
              <div className="absolute inset-0 backface-hidden overflow-hidden border border-black/5 flex flex-col bg-white">
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="pillar-image object-cover"
                  />
                </div>
              </div>

              {/* CARD BACK: Light Professional Theme */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#F7F7F7] border border-black/5 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-start mb-8">
                     <span className="font-mono text-[10px] text-[#D42B2B] tracking-[0.5em] font-bold uppercase">({pillar.index})</span>
                     <div className="w-2 h-2 bg-[#D42B2B] rounded-none" />
                   </div>
                   <h4 className="text-[#1A1A1A] font-medium text-3xl md:text-4xl tracking-tighter mb-6 leading-none uppercase">
                     {pillar.title}
                   </h4>
                   <p className="text-[#1A1A1A]/70 font-normal text-base md:text-lg leading-relaxed">
                     {pillar.description}
                   </p>
                </div>
                
                <div className="flex flex-col gap-4 border-t border-black/10 pt-6">
                   <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-black/20" />
                      <span className="font-mono text-[9px] text-black/40 tracking-widest uppercase font-bold">{pillar.subtitle}</span>
                   </div>
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
