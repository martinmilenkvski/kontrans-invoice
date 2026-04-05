"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VideoPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });

    const heroEase = "power3.out";

    // ── THE KINETIC IRIS ZOOM ──
    tl.fromTo(textMaskRef.current, 
      { scale: 1, opacity: 1 }, 
      { scale: 90, opacity: 0, duration: 4, ease: "power2.in" }, 0
    );

    tl.fromTo(".v-iris", 
      { r: 0 }, 
      { r: 1500, duration: 4, ease: "power2.in" }, 0
    );

    // Light wash on kinetic video
    tl.to(".v-video-overlay", { opacity: 0.15, duration: 2 }, 2.5);

    // Orbital Messages
    tl.fromTo(".v-msg-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: heroEase }, 4);
    tl.to(".v-msg-1", { opacity: 0, y: -30, duration: 1, ease: "power2.in" }, 6);

    tl.fromTo(".v-msg-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: heroEase }, 7);
    tl.to(".v-msg-2", { opacity: 0.1, duration: 1 }, 9);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#FAFAFA]">
      
      {/* ── KINETIC VIDEO LAYER ── */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/bg-kontrans.mp4" type="video/mp4" />
        </video>
        <div className="v-video-overlay absolute inset-0 bg-white/40" />
      </div>

      {/* ── THE WHITE IRIS MASK ── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
        <svg ref={textMaskRef} viewBox="0 0 1000 1000" className="w-full h-full max-w-[150vw] origin-center">
          <defs>
            <mask id="kineticPortalMask">
              <rect width="1000" height="1000" fill="white" />
              <text x="500" y="500" textAnchor="middle" dominantBaseline="middle" fontSize="150" fontWeight="900" fill="black" letterSpacing="-0.04em" className="font-sans uppercase">ДВИЖЕЊЕ</text>
              <circle cx="500" cy="500" r="0" fill="black" className="v-iris" />
            </mask>
          </defs>
          <rect width="1000" height="1000" fill="#FAFAFA" mask="url(#kineticPortalMask)" />
        </svg>
      </div>

      {/* ── EDITORIAL ORBITAL MESSAGES ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-8 text-center pointer-events-none">
        <div className="v-msg-1 absolute flex flex-col items-center opacity-0">
           <h2 className="font-sans text-[clamp(2.5rem,8vw,7.5rem)] text-[#111111] leading-[0.85] tracking-tighter uppercase font-black">
              Движење кое <br /> 
              <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] lowercase font-normal px-2">не застанува.</span>
           </h2>
        </div>
        <div className="v-msg-2 absolute flex flex-col items-center opacity-0">
           <h2 className="font-sans text-[clamp(2.5rem,8vw,7.5rem)] text-[#111111] leading-[0.85] tracking-tighter uppercase font-black">
              Глобална мрежа <br /> 
              <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] lowercase font-normal px-2">на доверба.</span>
           </h2>
        </div>
      </div>

    </section>
  );
}
