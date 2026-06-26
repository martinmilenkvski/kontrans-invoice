"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutTeam() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
      }
    });

    // 1. Reveal team header first (at the start of the timeline)
    tl.fromTo(".team-header-reveal",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // 2. Image mask reveal starts shortly after the header starts revealing
    tl.fromTo(".team-img-mask",
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.8,
        ease: "power4.inOut",
      },
      "-=0.8"
    );

    // 3. Reveal content columns (under the image) as the image finishes revealing
    tl.fromTo(".team-reveal",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      },
      "-=0.8"
    );

    // 4. Animate Signature Path (Last step)
    tl.fromTo(".signature-path",
      { strokeDasharray: 600, strokeDashoffset: 600 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "+=0.2" // Slight pause before signing
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-40 bg-white pt-56 pb-56 overflow-hidden">

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col gap-24 lg:gap-32">

        {/* 1. Header Section (Matching Commitment Headline Style) */}
        <div className="w-full flex justify-end">
          <div className="max-w-5xl text-right">
            <h2 className="team-header-reveal font-sans text-[clamp(2.2rem,5vw,3.2rem)] text-brand-dark leading-[1.05] tracking-tight font-normal">
              Луѓето зад вашата логистика се мостот меѓу <br className="hidden lg:block" />
              локалните увиди и глобалните стандарди, <br className="hidden lg:block" />
              создавајќи <span className="text-brand-red italic font-sans font-medium">значителни идеи.</span>
            </h2>
          </div>
        </div>

        {/* 2. Panoramic Hero Image */}
        <div className="team-img-mask relative w-full aspect-21/9 overflow-hidden border border-black/5 bg-[#F9F9F9]">
          <Image
            src="/team_skopje.png"
            alt="The Kontrans Team"
            fill
            className="object-cover scale-105"
            sizes="100vw"
          />
        </div>

        {/* 3. Content Grid (Reverted to the Editorial 3-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Tag Column */}
          <div className="md:col-span-3 team-reveal">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                004 // ТИМОТ НА КОНТРАНС
              </span>
            </div>
          </div>

          {/* Manifesto / Large Text Column */}
          <div className="md:col-span-5 team-reveal">
            <h3 className="font-sans text-[clamp(1.5rem,2.5vw,2.2rem)] font-medium text-brand-dark leading-[1.1] tracking-tight mb-8">
              Ние сме тим од креатори и мислители кои веруваат во создавање на искуства кои навистина поврзуваат.
            </h3>
            <div className="w-full h-px bg-black/10 mb-8" />
            <p className="text-[16px] md:text-[18px] leading-relaxed text-brand-dark/70 font-sans">
              Македонскиот логистички пазар бара комбинација на локален увид и глобални стандарди. Ние сме тука да обезбедиме сигурност и брзина во секој чекор.
            </p>
          </div>

          {/* CEO Card Column */}
          <div className="md:col-span-4 team-reveal flex flex-col gap-12 pt-8">
            <div className="relative">
              <span className="absolute -left-10 -top-12 text-brand-red text-7xl font-serif opacity-40 select-none">&ldquo;</span>
              <p className="text-[16px] md:text-[18px] leading-relaxed text-brand-dark/70 font-sans italic relative z-10">
                Нашата приказна е изградена на страст и стремеж за реализација на значајни идеи во глобалниот транспортен ланец.
              </p>
              <span className="absolute -right-4 -bottom-10 text-brand-red text-7xl font-serif opacity-40 select-none">&rdquo;</span>
            </div>

            {/* CEO LOCKUP */}
            <div className="flex items-center gap-6 group pt-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border border-black/5 grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/marina.png"
                  alt="Марина Миленковска"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-bold text-brand-dark tracking-tight leading-none">Марина Миленковска</span>
                <span className="font-mono text-[9px] font-bold text-brand-red uppercase tracking-widest mt-2">General Manager // CEO</span>

                {/* Signature lockup (SVG Path) */}
                <div className="mt-4">
                  <svg width="180" height="60" viewBox="0 0 180 60" fill="none" className="team-signature overflow-visible">
                    <path
                      d="M10,40 Q25,10 35,35 T55,25 T75,40 T95,20 T115,35 T135,15 T155,40 T170,25"
                      stroke="#E31E24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="signature-path"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
