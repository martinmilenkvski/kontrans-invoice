"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    id: "01",
    title: "Предизвикот",
    body: "Знаеме дека во денешниот брз свет, протокот на стока е всушност проток на живот за еден бизнис. Затоа одбивме да се натпреваруваме само со суви бројки. Нашата опсесија стана откривањето на паметни, алтернативни решенија кои ви штедат време и ви даваат вистинска предност на пазарот.",
    image: "/port-min.png",
    alt: "Пристаниште — логистички операции",
  },
  {
    id: "02",
    title: "Нашиот пристап",
    body: "Ние го нудиме најдоброто од двата света. Доволно сме големи за да испорачаме бескомпромисен квалитет, а доволно флексибилни за да се прилагодиме на вас. И што е најважно – нема изненадувања. Ја добивате вистинската информација за вашата пратка во секој можен момент.",
    image: "/ship-min.png",
    alt: "Бродски транспорт",
  },
  {
    id: "03",
    title: "Иднината",
    body: "Се стремиме кон врвот на регионот, но преку чесен и етички бизнис. Инвестираме во луѓе кои рушат граници и поставуваме дрски, амбициозни цели. Како динамична компанија, секогаш сме подготвени за нови партнерства кои носат заеднички раст.",
    image: "/about-highway.png",
    alt: "Копнен транспорт",
  },
];

export function TechnicalAnatomy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Kill stale ScrollTriggers on remount (hot-reload safety)
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current || st.pin === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1.2,
        snap: {
          snapTo: [0, 0.33, 0.66, 1],
          duration: { min: 0.2, max: 0.6 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          // Morph ghost number based on progress
          if (numberRef.current) {
            const p = self.progress;
            if (p < 0.33) numberRef.current.textContent = "01";
            else if (p < 0.66) numberRef.current.textContent = "02";
            else numberRef.current.textContent = "03";
          }
        },
      },
    });

    // ── CENTER DIVIDER draws down ──
    tl.fromTo(
      ".ta-divider-line",
      { scaleY: 0 },
      { scaleY: 1, duration: 0.8, ease: "power3.inOut" },
      0
    );

    // ── HEADER reveal ──
    tl.fromTo(
      ".ta-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" },
      0
    );

    // ── LEFT COLUMN — CLIP-PATH IMAGE REVEALS ──
    // Image 2 wipes from bottom over image 1
    tl.fromTo(
      ".ta-img-2",
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.inOut" },
      1.0
    );
    // Image 3 wipes from bottom over image 2
    tl.fromTo(
      ".ta-img-3",
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.inOut" },
      2.0
    );

    // ── RIGHT COLUMN (text) — scrolls UP ──
    tl.fromTo(
      ".ta-col-right-inner",
      { yPercent: 0 },
      { yPercent: -66.66, duration: 3, ease: "none" },
      0.3
    );

    // ── Bottom metadata ──
    tl.fromTo(
      ".ta-meta",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      0.1
    );

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative h-screen bg-[#F5F5F0] overflow-hidden">

      {/* ── HEADER BAR ── */}
      <div className="ta-header absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-8 lg:px-16 py-8 opacity-0">
        <span className="font-mono text-[0.6rem] text-[#111111]/40 uppercase tracking-[0.4em]">
          Approach // 06
        </span>
        <span className="font-mono text-[0.6rem] text-[#D42B2B] uppercase tracking-[0.4em] font-bold">
          Scroll ↓
        </span>
      </div>

      {/* ── MAIN SPLIT ── */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">

        {/* ═══ LEFT COLUMN — STACKED IMAGES WITH CLIP REVEALS ═══ */}
        <div className="relative overflow-hidden">
          {/* Image 1 — base layer, always visible */}
          <div className="absolute inset-0">
            <Image src={pillars[0].image} alt={pillars[0].alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F5F5F0]/80" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-8 lg:left-16 z-10 pointer-events-none select-none">
              <span className="font-sans text-[8rem] lg:text-[12rem] font-black text-black/[0.05] leading-none tracking-tighter">01</span>
            </div>
          </div>

          {/* Image 2 — clips in from bottom */}
          <div className="ta-img-2 absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <Image src={pillars[1].image} alt={pillars[1].alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F5F5F0]/80" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-8 lg:left-16 z-10 pointer-events-none select-none">
              <span className="font-sans text-[8rem] lg:text-[12rem] font-black text-black/[0.05] leading-none tracking-tighter">02</span>
            </div>
          </div>

          {/* Image 3 — clips in from bottom */}
          <div className="ta-img-3 absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <Image src={pillars[2].image} alt={pillars[2].alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F5F5F0]/80" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-8 lg:left-16 z-10 pointer-events-none select-none">
              <span className="font-sans text-[8rem] lg:text-[12rem] font-black text-black/[0.05] leading-none tracking-tighter">03</span>
            </div>
          </div>
        </div>

        {/* ═══ CENTER DIVIDER ═══ */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 z-20 -translate-x-1/2">
          {/* Red line */}
          <div className="ta-divider-line w-[1px] h-full bg-[#D42B2B]/30 origin-top" />
          {/* Pulse dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D42B2B] shadow-[0_0_20px_rgba(212,43,43,0.3)]">
            <div className="absolute inset-0 rounded-full bg-[#D42B2B] animate-ping opacity-20" />
          </div>
        </div>

        {/* ═══ RIGHT COLUMN — TEXT (scrolls UP) ═══ */}
        <div className="relative overflow-hidden bg-[#F5F5F0]">
          <div className="ta-col-right-inner" style={{ height: "300%" }}>
            {pillars.map((p, i) => (
              <div
                key={p.id}
                className="ta-text-block relative w-full flex flex-col justify-center px-10 lg:px-20"
                style={{ height: "33.333%" }}
              >
                {/* Section index */}
                <span className="font-mono text-[0.6rem] text-[#D42B2B] tracking-[0.5em] uppercase font-bold mb-6">
                  ({p.id})
                </span>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-jost)] text-[clamp(1.8rem,3.5vw,3rem)] text-[#111111] font-medium tracking-tight leading-[1.1] mb-6">
                  {p.title}
                  <span className="text-[#D42B2B]">.</span>
                </h3>

                {/* Divider */}
                <div className="w-16 h-[2px] bg-[#D42B2B]/20 mb-8" />

                {/* Body */}
                <p className="font-[family-name:var(--font-jost)] text-[0.95rem] lg:text-[1.05rem] text-[#111111]/60 font-normal leading-[1.8] max-w-md">
                  {p.body}
                </p>

                {/* Decorative corner frame */}
                <div className="absolute top-12 right-10 w-12 h-12 border-t border-r border-[#111111]/05 pointer-events-none" />
                <div className="absolute bottom-12 left-10 lg:left-20 w-12 h-12 border-b border-l border-[#111111]/05 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GHOST NUMBER (morphs 01→02→03) ── */}
      <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
        <span
          ref={numberRef}
          className="font-sans text-[10rem] lg:text-[16rem] font-black text-[#111111]/05 leading-none tracking-tighter"
        >
          01
        </span>
      </div>

      {/* ── BOTTOM METADATA ── */}
      <div className="ta-meta absolute bottom-6 left-8 lg:left-16 right-8 lg:right-16 z-30 flex justify-between items-center opacity-0 pointer-events-none select-none">
        <span className="font-mono text-[0.5rem] tracking-[0.4em] uppercase text-[#111111]/30">
          COUNTER_SCROLL_V2
        </span>
        <span className="font-mono text-[0.5rem] tracking-[0.4em] uppercase text-[#111111]/30">
          KONTRANS // APPROACH
        </span>
      </div>
    </div>
  );
}
