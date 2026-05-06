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
  const cardContainerRef = useRef<HTMLDivElement>(null);

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

        // 1. Initial Spread
        tl.to(cardContainerRef.current, { 
          gap: "40px", 
          duration: 1, 
          ease: "power2.inOut" 
        }, 0);

        // 2. Flip
        tl.to(".pillar-card-inner", { 
          rotationY: 180, 
          duration: 2, 
          stagger: 0.15, 
          ease: "power3.inOut" 
        }, 0.5);

        // 3. Subtle Parallax for outer cards
        tl.to(".pillar-card:first-child", { x: -20, duration: 2, ease: "power2.out" }, 0.5);
        tl.to(".pillar-card:last-child", { x: 20, duration: 2, ease: "power2.out" }, 0.5);

        // 4. Hold state (Stay visible for 1 more duration unit)
        tl.to({}, { duration: 1.5 });
      });

      // Simple reveal for mobile
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(".pillar-card", 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2, 
            duration: 1, 
            scrollTrigger: {
              trigger: cardContainerRef.current,
              start: "top 40%",
            }
          }
        );
      });

      // Header reveals
      gsap.fromTo(".pillar-reveal", 
        { y: 100, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          stagger: 0.15, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
          }
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] lg:h-[300vh] bg-white z-20 border-t border-black/10">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-24 lg:pt-32 pb-32 overflow-hidden">
        
        {/* Architectural Background Removed */}

        <div className="relative z-30 w-full max-w-[1600px] mx-auto px-6 lg:px-12 mb-24">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              
              {/* Left: Tag (4 cols) */}
              <div className="pillar-reveal opacity-0 lg:col-span-3 flex flex-col items-start pt-2">
                 <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-brand-red" />
                    <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-(family-name:--font-jost)">
                      005 // СТРАТЕШКИ СТОЛБОВИ
                    </span>
                 </div>
              </div>

              {/* Middle: Massive Title (5 cols) */}
              <div className="pillar-reveal opacity-0 lg:col-span-5 text-left lg:text-center">
                 <h2 className="font-(family-name:--font-jost) text-[clamp(2.5rem,5.5vw,4.8rem)] text-brand-dark leading-[0.85] tracking-tighter font-medium">
                    Три стратешки <span className="text-brand-red italic">столба.</span>
                 </h2>
              </div>

              {/* Right: Description (4 cols) */}
              <div className="pillar-reveal opacity-0 lg:col-span-4 text-left lg:text-right pt-2">
                 <p className="text-[16px] md:text-[18px] leading-relaxed text-brand-dark/70 font-(family-name:--font-jost) max-w-sm lg:ml-auto">
                    Основата на секоја успешна операција преку брзина, прецизност и глобална поврзаност, создаваме решенија кои ја движат вашата визија напред.
                 </p>
              </div>

           </div>
        </div>

        {/* CARDS CONTAINER */}
        <div
          ref={cardContainerRef}
          className="relative w-full h-[60vh] flex items-center justify-center perspective-[2000px] gap-0 px-6 lg:px-0"
        >
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className={`pillar-card pillar-card-${idx} relative w-full lg:w-[340px] xl:w-[380px] aspect-[3/4] preserve-3d will-change-transform`}
            >
              <div className="pillar-card-inner relative w-full h-full preserve-3d transition-transform duration-500">
                
                {/* FRONT: Image Cinematic */}
                <div className="absolute inset-0 backface-hidden overflow-hidden border border-black/5 bg-[#F9F9F9]">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-8 left-8">
                     <span className="font-mono text-[10px] text-white/60 tracking-widest font-bold uppercase">{pillar.index}</span>
                     <h4 className="text-white font-(family-name:--font-jost) text-2xl font-medium tracking-tight uppercase mt-2">{pillar.title}</h4>
                  </div>
                </div>

                {/* BACK: Brutalist Info */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-black/10 p-8 lg:p-10 flex flex-col justify-between shadow-2xl">
                   <div>
                      <div className="flex justify-between items-start mb-8">
                         <span className="font-mono text-[11px] text-brand-red tracking-[0.4em] font-bold">({pillar.index})</span>
                         <div className="w-1.5 h-1.5 bg-brand-red" />
                      </div>
                      <h4 className="font-(family-name:--font-jost) text-2xl lg:text-3xl text-brand-dark font-black tracking-tighter uppercase leading-none mb-6">
                        {pillar.title}
                      </h4>
                      <p className="font-(family-name:--font-jost) text-[15px] lg:text-[16px] text-brand-dark/70 leading-relaxed">
                        {pillar.description}
                      </p>
                   </div>
                   
                   <div className="border-t border-black/10 pt-6">
                      <div className="flex items-center gap-4">
                         <div className="h-px w-6 bg-brand-red" />
                         <span className="font-mono text-[9px] text-black/40 tracking-[0.2em] uppercase font-bold">{pillar.subtitle}</span>
                      </div>
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
