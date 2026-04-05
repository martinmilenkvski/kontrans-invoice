"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── DIGITAL SLOT COUNTER (SYNCED WITH COMMITMENT) ────────────────────────────────
const DIGIT_H = 80; 

function SlotDigit({ digit, delay, trigger }: { digit: number; delay: number; trigger: any }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current || !trigger.current) return;

    gsap.fromTo(ref.current, 
      { y: 0 }, 
      { 
        y: -(digit * DIGIT_H), 
        duration: 1.5, 
        delay, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top center", // Triggered by the parent's horizontal scroll position
        }
      }
    );
  }, { scope: ref, dependencies: [trigger, digit] });

  return (
    <span className="relative inline-block overflow-hidden h-[80px] w-[0.625em]">
      <span ref={ref} className="absolute top-0 flex flex-col">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[80px] flex items-center leading-none font-[family-name:var(--font-jost)]">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: "01",
      title: "Целосен Контакт",
      desc: "Испратете ни барање со вашите специфични потреби. Нашиот тим е подготвен за архитектура на вашето движење.",
      image: "/logistics_port_minimalist_1775391957641.png",
      tag: "INITIAL_CONTACT",
      note: "брзо и ефикасно"
    },
    {
      id: "02",
      title: "Архитектура на Понуда",
      desc: "Добивате прецизна, оптимизирана цена и рута. Архитектонски нацрт за вашиот глобален успех.",
      image: "/process_architecture_minimalist_1775393651264.png",
      tag: "DCRYPT_OFFER",
      note: "безбедно до целта"
    },
    {
      id: "03",
      title: "Активација на Транспорт",
      desc: "Нашиот флот се активира. Вашиот товар е внимателно преземен и внесен во системот за следење.",
      image: "/process_activation_minimalist_1775393666898.png",
      tag: "UNIT_ACTIVATE",
      note: "потполна грижа"
    },
    {
      id: "04",
      title: "Финална Испорака",
      desc: "Сигурна и навремена испорака. Процесот завршува со потврда за квалитет и задоволство.",
      isRed: true,
      tag: "CORE_COMPLETE",
      note: "мисијата е завршена"
    },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".filmstrip-card");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalRef.current?.scrollWidth || 3000}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── HORIZONTAL SLIDE ──
      tl.to(horizontalRef.current, {
        x: () => -(horizontalRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
      });

      // ── PARALLAX FOR IMAGES WITHIN CARDS ──
      cards.forEach((card) => {
        const img = card.querySelector(".parallax-img");
        if (img) {
          gsap.fromTo(img, 
            { x: "-10%" },
            { 
              x: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl, // Sync with the horizontal timeline
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );
        }
      });

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="process" className="relative bg-[#FAFAFA] h-screen overflow-hidden">
      
      {/* ── PERSISTENT EDITORIAL HEADER ── */}
      <div className="absolute top-16 lg:top-20 left-4 lg:left-10 z-50 max-w-4xl pointer-events-none">
         <span className="inline-block px-4 py-2 bg-black/[0.03] border border-black/5 text-[0.6rem] font-black text-black/40 tracking-[0.2em] uppercase mb-8">
            ОПЕРАТИВЕН МОДЕЛ
         </span>
         <h2 className="font-[family-name:var(--font-jost)] text-[clamp(2rem,5vw,3.5rem)] text-[#111111] leading-[1.05] tracking-tight font-black uppercase">
           Од идеја <br /> 
           <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] lowercase font-normal">
             до реализација.
           </span>
         </h2>
      </div>

      {/* ── THE CINEMATIC FILMSTRIP ── */}
      <div 
        ref={horizontalRef} 
        className="flex h-full w-fit items-center flex-nowrap pr-[20vw]" // Large right padding for end feel
      >
        {steps.map((step, i) => (
          <div 
            key={i} 
            className="filmstrip-card relative w-[75vw] lg:w-[65vw] h-[65vh] lg:h-[60vh] flex-shrink-0 ml-[4vw] lg:ml-[2.5vw] first:ml-[10vw] lg:first:ml-[10vw]"
          >
            {!step.isRed ? (
              // ── EDITORIAL WHITE CARD ──
              <div className="w-full h-full bg-white border border-black/5 p-8 lg:p-12 flex flex-col justify-between shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] group">
                
                {/* TOP: Identification */}
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-6">
                      <div className="flex items-center font-[family-name:var(--font-jost)] text-6xl lg:text-8xl font-black text-[#111111] leading-none tracking-tighter">
                         <span>0</span>
                         <SlotDigit digit={parseInt(step.id.charAt(1))} delay={0.1} trigger={sectionRef} />
                      </div>
                      <div className="h-10 w-px bg-black/10 mx-2" />
                      <div className="flex flex-col">
                         <span className="font-[family-name:var(--font-jost)] text-[0.6rem] text-[#D42B2B] uppercase tracking-[0.4em] font-black italic">
                            {step.tag}
                         </span>
                         <span className="font-[family-name:var(--font-jost)] text-[0.5rem] text-black/20 uppercase tracking-[0.2em]">SYS_CTRL // NOM_100%</span>
                      </div>
                   </div>
                   <span className="font-[family-name:var(--font-caveat)] text-[1.5rem] lg:text-[2rem] text-[#D42B2B] italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {step.note}
                   </span>
                </div>

                {/* MIDDLE: Content + Parallax Capture */}
                 <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end mt-12 overflow-hidden">
                    <div className="flex flex-col gap-6">
                       <h3 className="text-[#111111] font-[family-name:var(--font-jost)] text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase tracking-tighter leading-[0.95]">
                         {step.title}
                       </h3>
                       <p className="text-black/60 font-[family-name:var(--font-jost)] text-base lg:text-lg font-medium leading-relaxed max-w-md">
                         {step.desc}
                       </p>
                    </div>

                   <div className="relative aspect-[16/10] w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 grayscale-rect">
                      {step.image && (
                        <Image 
                          src={step.image} 
                          alt={step.title} 
                          fill 
                          className="parallax-img object-cover scale-125"
                        />
                      )}
                   </div>
                </div>

                {/* BOTTOM: Micro-Labels */}
                <div className="flex justify-between items-center mt-8 pt-8 border-t border-black/5 opacity-30">
                   <span className="text-[0.55rem] font-[family-name:var(--font-jost)] tracking-[0.4em] text-black uppercase font-black">
                      OPERATIONAL_PHASE_{step.id}_ACTIVE
                   </span>
                   <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-[#D42B2B]" />
                      <div className="w-1.5 h-1.5 bg-black/10" />
                      <div className="w-1.5 h-1.5 bg-black/10" />
                   </div>
                </div>
              </div>
            ) : (
              // ── THE RED FINALE CARD ──
               <div className="w-full h-full bg-[#D42B2B] p-12 lg:p-16 flex flex-col justify-between overflow-hidden relative group">
                  <div className="flex justify-between items-start z-10">
                     <div className="flex items-center gap-6">
                        <div className="font-[family-name:var(--font-jost)] text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter opacity-20">
                           04
                        </div>
                        <div className="h-16 w-px bg-white/10" />
                        <div className="flex flex-col">
                           <span className="font-[family-name:var(--font-jost)] text-[0.7rem] text-white/50 uppercase tracking-[0.5em] font-black italic">
                              {step.tag}
                           </span>
                           <span className="font-[family-name:var(--font-jost)] text-[0.6rem] text-white/20 uppercase tracking-[0.3em]">KONTRANS // COMPLETE</span>
                        </div>
                     </div>
                     <div className="w-16 h-16 border border-white/20 flex items-center justify-center">
                        <ArrowUpRight className="text-white w-8 h-8 group-hover:rotate-45 transition-transform duration-500" />
                     </div>
                  </div>

                 <div className="max-w-4xl z-10 mt-auto mb-12">
                    <h3 className="text-white font-[family-name:var(--font-jost)] font-black text-[clamp(2rem,6vw,5rem)] leading-[0.85] uppercase tracking-tighter mb-8">
                      СИРУРНО <br /> 
                      И <span className="opacity-50 italic">СЕКОГАШ.</span>
                    </h3>
                    <p className="text-white/80 font-[family-name:var(--font-jost)] text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
                      Секој транспорт завршува со потврда за квалитет. Ние не само што превезуваме стока, туку градиме доверба низ секој чекор.
                    </p>
                 </div>

                 <Link href="/contact" className="z-10 group inline-flex items-center gap-4 text-white text-[0.8rem] font-black tracking-[0.4em] uppercase border-b border-white/20 pb-4 w-fit hover:border-white transition-all">
                    ЗАПОЧНЕТЕ НОВ ПРОЕКТ
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </Link>

                 {/* ABSTRACT DECORATIVE CIRCLES */}
                 <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] border border-white/5 rounded-full opacity-30" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] border border-white/[0.03] rounded-full opacity-10 pointer-events-none" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── GLOBAL PROGRESS HUD ── */}
      <div className="absolute bottom-12 left-4 lg:left-10 z-50 flex items-center gap-12 opacity-30">
         <div className="flex flex-col gap-1 w-48">
            <span className="text-[9px] font-mono tracking-[0.4em] text-black uppercase font-black">
               TRACKING_PHASES
            </span>
            <div className="h-px w-full bg-black/10 relative overflow-hidden">
               {/* Progress Inner would be animated by GSAP but for MVP we use a simple placeholder */}
               <div className="absolute inset-0 bg-[#D42B2B] origin-left scale-x-0" />
            </div>
         </div>
         <span className="text-[9px] font-mono text-black/60 uppercase tracking-[0.2em] hidden lg:block">
            CONTINUOUS_LOGISTICS_FLOW // 2024
         </span>
      </div>

    </section>
  );
}
