"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Побарајте понуда",
    desc: "Испратете ни ги деталите за вашиот товар преку контакт формата или директен телефонски повик.",
    tag: "INQUIRY",
  },
  {
    id: "02",
    title: "Оптимална рута и цена",
    desc: "За 24 часа нашите експерти ќе ви проследат оптимална рута и најдобра цена за вашиот транспорт.",
    tag: "ANALYSIS",
  },
  {
    id: "03",
    title: "Потврда на букинг",
    desc: "По прифаќање на понудата, веднаш ја потврдуваме резервацијата и ги активираме нашите логистички канали.",
    tag: "BOOKING",
  },
  {
    id: "04",
    title: "Достава до магацин",
    desc: "Целосна грижа за вашиот товар до финалната дестинација. Брза и сигурна испорака до вашиот магацин.",
    tag: "DELIVERY",
  },
];

export function VideoPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const cardsAnimated = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current || !videoCardRef.current) return;

      const parent = containerRef.current;
      const card = videoCardRef.current;
      const video = videoWrapperRef.current;

      const mm = gsap.matchMedia();

      // Desktop animation: pin and shrink reveal
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parent,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress > 0.45) {
                if (!cardsAnimated.current) {
                  cardsAnimated.current = true;
                  gsap.fromTo(".bento-card",
                    { opacity: 0, y: 16 },
                    {
                      opacity: 1,
                      y: 0,
                      stagger: 0.08,
                      duration: 0.8,
                      ease: "power3.out",
                      overwrite: "auto"
                    }
                  );
                }
              } else if (self.progress < 0.2) {
                if (cardsAnimated.current) {
                  cardsAnimated.current = false;
                  gsap.to(".bento-card", {
                    opacity: 0,
                    y: 16,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "power2.in",
                    overwrite: "auto"
                  });
                }
              }
            }
          },
        });

        tl.fromTo(
          video,
          {
            width: () => gridContainerRef.current?.getBoundingClientRect().width || window.innerWidth,
            height: () => window.innerHeight * 0.82,
            left: () => gridContainerRef.current ? (gridContainerRef.current.getBoundingClientRect().left - parent.getBoundingClientRect().left) : 0,
            top: () => (window.innerHeight - window.innerHeight * 0.82) / 2,
            borderRadius: "0px",
            opacity: 1,
          },
          {
            width: () => card.getBoundingClientRect().width,
            height: () => card.getBoundingClientRect().height,
            left: () => card.getBoundingClientRect().left - parent.getBoundingClientRect().left,
            top: () => card.getBoundingClientRect().top - parent.getBoundingClientRect().top,
            borderRadius: "0px",
            duration: 1.5,
            ease: "power3.inOut",
          },
          0
        );

        tl.to(".vp-overlay", { opacity: 0.3, duration: 1 }, 0);
      });

      // Mobile: no scroll hijacking or pinning, let bento cards fade in smoothly as they scroll into view
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".bento-card",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full h-auto bg-white flex items-center justify-center text-brand-dark py-12 md:py-24 lg:py-32"
    >

      <div
        ref={videoWrapperRef}
        className="hidden md:block absolute z-30 overflow-hidden pointer-events-none rounded-none"
        style={{ width: "100vw", height: "100vh", left: 0, top: 0, opacity: 0 }}
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/process-video.mp4" type="video/mp4" />
        </video>

        <div className="vp-overlay absolute inset-0 bg-white/10" />
      </div>

      {/* ── BENTO GRID CONTAINER ── */}
      <div
        ref={gridContainerRef}
        className="w-full max-w-[1600px] px-6 lg:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 w-full">

          {/* ── COLUMN 1 (LEFT): VIDEO PANEL ── */}
          <div className="flex flex-col w-full md:self-stretch h-full">
            {/* Title above the video */}
            <h2 className="font-sans text-[clamp(2.2rem,5vw,3.2rem)] text-brand-dark leading-[1.05] tracking-tight font-normal">
              Од барање до вашиот <span className="text-brand-red italic font-sans font-medium relative inline-block">магацин</span> во 4 чекори.
            </h2>

            {/* Centered Video Placeholder */}
            <div className="flex-1 flex flex-col justify-center w-full py-12 md:py-0 min-h-0">
              <div
                ref={videoCardRef}
                className="bg-transparent rounded-none relative overflow-hidden w-full aspect-video pointer-events-none"
              >
                {/* The video element shrinks directly over this container on desktop, and plays directly on mobile */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover md:hidden"
                >
                  <source src="/process-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Tag at the bottom of the left side */}
            <div className="flex items-center gap-3 mb-8 lg:mb-10">
              <div className="h-px w-6 bg-brand-red" />
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-[0.2em] font-space">
                003 // ОПЕРАТИВЕН МОДЕЛ
              </span>
            </div>
          </div>

          {/* ── COLUMN 2 (RIGHT): THE HORIZONTAL SPLIT ── */}
          <div className="flex flex-col w-full md:mt-0 relative py-8">
            {/* The vertical divider line */}
            <div className="absolute left-[35%] top-0 bottom-0 w-px bg-black/10 -translate-x-1/2"></div>

            <div className="flex flex-col w-full">
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className="bento-card opacity-0 relative grid grid-cols-[35%_1fr] group/step cursor-pointer py-10"
                >
                  {/* Left Side: Number */}
                  <div className="flex flex-col items-end justify-start text-right pr-8 md:pr-12">
                    <span className="font-sans text-5xl md:text-6xl text-black/10 font-black tracking-tighter group-hover/step:text-brand-red/20 transition-colors duration-500">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Right Side: Title & Desc */}
                  <div className="flex flex-col items-start justify-start pl-8 md:pl-12 relative">
                    {/* Animated Hover Line on the middle axis */}
                    <div className="absolute left-0 top-1 w-0.5 h-12 bg-brand-red scale-y-0 group-hover/step:scale-y-100 origin-top transition-transform duration-500 -translate-x-1/2 z-10"></div>

                    <h3 className="font-space text-xl md:text-2xl text-brand-dark font-bold tracking-tight uppercase mb-4 group-hover/step:text-brand-red transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-brand-dark/60 leading-relaxed font-light group-hover/step:text-brand-dark/90 transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
