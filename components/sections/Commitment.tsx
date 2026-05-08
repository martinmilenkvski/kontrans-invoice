"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { KineticButton } from "../ui/KineticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── DIGITAL SLOT COUNTER ──────────────────────────────────────────────────────
const DIGIT_H = 80; 

function SlotDigit({ digit, delay }: { digit: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Calculate the height of 1em based on font size.
    // If text-[90px] is applied, 1em is 90px. If text-[72px], it's 72px.
    // We'll calculate it once the element is rendered.
    const digitHeight = ref.current?.children[0]?.clientHeight || 90;

    gsap.fromTo(ref.current, 
      { y: 0 }, 
      { 
        y: -(digit * digitHeight), 
        duration: 2.5, 
        delay, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: ref });

  return (
    <span className="relative inline-block overflow-hidden h-[1em] w-[0.625em] leading-none">
      <span ref={ref} className="absolute top-0 flex flex-col">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] flex items-center justify-center leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Commitment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    const heroEase = "power4.out";

    // ── STAGGERED ENTRANCE ──
    tl.fromTo(".comm-headline", 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: heroEase }, 0
    );

    tl.fromTo([".comm-tag", ".comm-text", ".comm-btn", ".comm-counter", ".comm-footer-text"], 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: heroEase, stagger: 0.1 }, 
      0.5
    );

    // ── CLIP-PATH IMAGE REVEALS (staggered left-to-right) ──
    tl.fromTo(".comm-img-clip",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut", stagger: 0.2 },
      0.8
    );

    // (Red Card entrance animation removed to rely entirely on parallax)

    // ── PARALLAX EFFECT FOR TRIO ──
    gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed") || "0");
      if (speed === 0) return;
      
      gsap.to(el, {
        y: -350 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // ── IMAGE SCROLL ZOOM OUT ──
    gsap.utils.toArray<HTMLElement>(".comm-img-clip img").forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".comm-img-clip"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#FFFFFF] pt-32 pb-24 overflow-hidden border-b border-black/10">
      
      <div className="max-w-400 mx-auto px-4 lg:px-4 flex flex-col gap-24 lg:gap-32">
        
        {/* TOP: LARGE EDITORIAL HEADLINE */}
        <div className="w-full flex justify-end">
          <div className="max-w-5xl text-right">
            <h2 className="comm-headline font-sans text-[clamp(2.2rem,5vw,3.2rem)] text-brand-dark leading-[1.05] tracking-tight font-normal opacity-0">
              Се посветуваме целосно на нашите <br className="hidden lg:block" />
              партнери и решенијата што ги нудиме, <br className="hidden lg:block" />
              носејќи <span className="text-brand-red italic font-(family-name:--font-jost) font-medium">највисока експертиза.</span>
            </h2>
          </div>
        </div>

        {/* MIDDLE: MULTI-COL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-20 items-start">
           
           {/* Right: Tag */}
           <div className="comm-tag opacity-0 flex flex-col items-end">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-(family-name:--font-jost)">
                002 // НАШАТА ПОСВЕТЕНОСТ
              </span>
            </div>
           </div>

           {/* Middle: Paragraph */}
           <div className="flex flex-col gap-10">
              <p className="comm-text text-[16px] md:text-[18px] leading-relaxed text-brand-dark/70 font-(family-name:--font-jost) max-w-lg opacity-0 text-right ml-auto">
                Ние сме сеопфатен логистички партнер специјализиран за глобален патен, авионски и бродски транспорт. Со длабок увид во индустријата и филозофија насочена кон партнерот, ги водиме клиентите низ секоја фаза од транспортниот циклус.
              </p>
           </div>

           {/* Right: Counter */}
           <div className="comm-counter flex flex-col items-end opacity-0">
              <div className="flex items-center gap-1 font-(family-name:--font-jost) text-[72px] md:text-[90px] font-black text-brand-dark leading-none tracking-tighter">
                <SlotDigit digit={7} delay={0.6} />
                <SlotDigit digit={5} delay={0.7} />
                <SlotDigit digit={0} delay={0.8} />
                <span className="text-[48px] md:text-[60px] font-black leading-none text-brand-red">+</span>
              </div>
              <span className="text-[11px] font-bold text-brand-dark uppercase tracking-[0.3em] mt-2 block font-(family-name:--font-jost)">УСПЕШНИ ПРОЕКТИ</span>
           </div>
        </div>

        {/* BOTTOM: ASYMMETRICAL IMAGE TRIO + FOOTER LABELS */}
        <div className="flex flex-col gap-12 mt-12 lg:mt-24">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 relative min-h-[500px] lg:min-h-[700px] items-start">
              
              {/* Image 1: Main Anchor (Left) */}
              <div 
                data-speed="0"
                className="comm-img-clip md:col-span-6 lg:col-span-5 relative aspect-square lg:aspect-[4/3] overflow-hidden z-10" 
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                <Image src="/port-min.png" alt="Modern Port" fill className="object-cover" />
              </div>
              
              {/* Image 2: Trailing Parallax (Middle) */}
              <div 
                data-speed="0.8"
                className="comm-img-clip md:col-span-5 lg:col-span-4 relative aspect-[4/5] overflow-hidden z-20 md:mt-48 lg:mt-72" 
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                <Image src="/ship-min.png" alt="Minimal Ship" fill className="object-cover" />
              </div>
              
              {/* THIRD IMAGE -> RED CARD (Right, Parallax) */}
              <Link 
                href="#contact" 
                data-speed="0"
                className="comm-card md:col-span-8 md:col-start-5 lg:col-span-3 lg:col-start-10 relative aspect-[4/5] lg:aspect-[3/4] bg-brand-red flex flex-col justify-between p-8 overflow-hidden group hover:bg-[#c02626] transition-all duration-500 z-30 lg:-mt-24"
              >
                <div className="flex justify-between items-start">
                   <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                      <ArrowUpRight className="text-white w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                   </div>
                   <span className="font-mono text-[0.6rem] text-white/40 tracking-widest uppercase italic">003 // CTA</span>
                </div>
                
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                       <span className="text-white/60 text-[0.65rem] font-bold tracking-widest uppercase">ПОЧНЕТЕ ТУКА</span>
                       <h3 className="text-white font-(family-name:--font-jost) font-black text-3xl lg:text-4xl leading-tight uppercase tracking-tighter">
                          ПОБАРАЈ <br /> ПОНУДА.
                       </h3>
                    </div>
                 </div>

                {/* ABSTRACT DECORATIVE CIRCLE */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 border border-white/5 rounded-full" />
              </Link>
           </div>
           
           <div className="flex justify-between items-center px-2">
              <span className="comm-footer-text font-mono text-[0.65rem] text-black/60 font-black tracking-[0.4em] uppercase opacity-0">
                 BEYOND CONVENTIONAL LOGISTICS.
              </span>
              <span className="comm-footer-text font-mono text-[0.65rem] text-black/60 font-black tracking-[0.4em] uppercase opacity-0 text-right">
                 НИЕ ГРАДИМЕ ДОВЕРБА.
              </span>
           </div>
        </div>

      </div>

    </section>
  );
}