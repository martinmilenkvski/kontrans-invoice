"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax Lift: as the footer unmasks into view, slide the ship up
    gsap.fromTo(shipRef.current,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: -10, // lift slightly higher than the viewport bottom
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative lg:h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative lg:fixed lg:bottom-0 lg:h-screen w-full">
        <footer className="bg-gradient-to-br from-[#D42B2B] via-[#B52424] to-[#751111] h-full min-h-[600px] relative font-sans text-white overflow-hidden border-t border-white/5 flex flex-col justify-between pt-8 lg:pt-16 pb-0">
          
          {/* Top Divider Detail */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />


          {/* ── 2. MIDDLE SECTION: FOUR-COLUMN DETAILS GRID ── */}
          <div className="w-full relative z-20 grow flex flex-col justify-center my-6">
            <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 items-start">
              
              {/* Col 1: Brand description & Stacked Brand Mark */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-white/50 uppercase font-bold">За компанијата</span>
                <p className="text-sm lg:text-base text-white/85 max-w-[320px] leading-relaxed font-light">
                  Вашиот доверлив партнер за меѓународен транспорт и глобална логистика низ целиот свет.
                </p>
              </div>

              {/* Col 2: Services navigation list */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-white/50 uppercase font-bold">01 // Услуги</span>
                <ul className="flex flex-col gap-3">
                   {['Бродски транспорт', 'Авионски транспорт', 'Камионски транспорт', 'Складирање'].map((link, idx) => (
                     <li key={idx}>
                        <Link href={link === 'Бродски транспорт' ? '/services/sea' : link === 'Авионски транспорт' ? '/services/air' : link === 'Камионски транспорт' ? '/services/road' : '/#services'} className="text-sm lg:text-base font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1.5 block">
                           {link}
                        </Link>
                     </li>
                   ))}
                </ul>
              </div>

              {/* Col 3: Company navigation list */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-white/50 uppercase font-bold">02 // Компанија</span>
                <ul className="flex flex-col gap-3">
                   {['За нас', 'Процес', 'Статистика', 'Контакт'].map((link, idx) => (
                     <li key={idx}>
                        <Link href={link === 'За нас' ? '/about' : link === 'Контакт' ? '/contact' : '/#process'} className="text-sm lg:text-base font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1.5 block">
                           {link}
                        </Link>
                     </li>
                   ))}
                </ul>
              </div>

              {/* Col 4: Detailed Contact (with phones) */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] lg:text-xs tracking-[0.2em] text-white/50 uppercase font-bold">03 // Контакт</span>
                <div className="flex flex-col gap-3">
                   <p className="text-sm lg:text-base text-white leading-relaxed font-bold">
                      Киро Крстевски 3/6<br />1000 Скопје, Македонија
                   </p>
                   <div className="flex flex-col text-sm lg:text-base text-white/90 font-medium">
                      <span>+389 2 3232 657</span>
                      <span>+389 2 3215 296</span>
                   </div>
                   <span className="text-sm lg:text-base text-white/70 font-semibold block">office@kontrans.com.mk</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── 3. COPYRIGHT & SUBSCRIBE ROW ── */}
          <div className="w-full relative z-20 border-t border-white/10 pt-6 pb-6 lg:pb-8">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* Copyright & Legal Links */}
              <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12">
                <div className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                  &copy; {currentYear} КОНТРАНС. СИТЕ ПРАВА СЕ ЗАДРЖАНИ.
                </div>
                <div className="flex gap-6 font-mono text-[9px] tracking-widest text-white/40 uppercase">
                  <Link href="#privacy" className="hover:text-white transition-colors duration-300">Приватност</Link>
                  <Link href="#terms" className="hover:text-white transition-colors duration-300">Услови</Link>
                </div>
              </div>

              {/* Newsletter subscribe form (bottom-right) */}
              <div className="flex items-center gap-4 border border-white/20 bg-white/5 hover:border-white/40 transition-colors duration-300 max-w-sm w-full">
                <input 
                  type="email" 
                  placeholder="Пријавете се за новости" 
                  className="w-full bg-transparent px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none"
                />
                <button className="bg-white text-[#D42B2B] px-4 py-2.5 text-[10px] font-black uppercase tracking-wider hover:bg-[#400A0A] hover:text-white transition-colors duration-300">
                  Пријави се
                </button>
              </div>

            </div>
          </div>

          {/* ── 4. GIANT WATERMARK LOGO ROW ── */}
          <div className="w-full relative overflow-hidden select-none pointer-events-none z-20 mt-auto">
            <h1 className="text-[16vw] lg:text-[22vw] font-black tracking-tighter leading-[0.8] uppercase text-white opacity-95 text-center translate-y-[15%]">
              КОНТРАНС
            </h1>
          </div>

          {/* Parallax Container Ship */}
          <div 
            ref={shipRef}
            className="absolute bottom-0 right-0 w-[60vw] max-w-[900px] h-full pointer-events-none select-none z-10 mix-blend-multiply lg:mix-blend-luminosity opacity-20"
          >
             <Image 
               src="/footer-ship.png"
               alt="Container Ship"
               fill
               className="object-contain object-right-bottom"
               sizes="(max-w-lg) 100vw, 60vw"
             />
          </div>
    
        </footer>
      </div>
    </div>
  );
}
