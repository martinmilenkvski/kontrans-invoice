"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, useGSAP);
  // Only create it if it doesn't exist yet to avoid React strict mode errors
  if (!CustomEase.get("hop")) {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
  }
}



const headerText = "KONTRANS".split("");

const images = [
  "/gallery-1.png",
  "/gallery-2.png",
  "/gallery-3.png",
  "/gallery-4.png",
];

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(
    () => {
      const chars = document.querySelectorAll(".char-inner");
      
      const initialChar = chars[0];
      const lastChar = chars[chars.length - 1];

      // Set Initial States
      chars.forEach((char, index) => {
        gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
      });

      const preloaderImages = gsap.utils.toArray(".preloader-img");
      const preloaderImagesInner = gsap.utils.toArray(".preloader-img-inner");

      // Timeline Creation
      const tl = gsap.timeline({ 
        delay: 0.25,
        onComplete: () => {
          setIsComplete(true);
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      });

      // Phase 1: Progress Bar
      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 4,
        ease: "power3.inOut",
      })
        .set(".progress-bar", { transformOrigin: "right" })
        .to(".progress-bar", {
          scaleX: 0,
          duration: 1,
          ease: "power3.in",
        });

      // Phase 2: Image Reveal
      preloaderImages.forEach((preloaderImg: Element, index: number) => {
        tl.to(
          preloaderImg,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5"
        );
      });

      preloaderImagesInner.forEach((preloaderImageInner: Element, index: number) => {
        tl.to(
          preloaderImageInner,
          {
            scale: 1,
            duration: 1.5,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5.25"
        );
      });

      // Phase 3: Header Entrance

      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 1,
          ease: "hop",
          stagger: 0.025,
        },
        "-=3.5"
      );

      // Phase 4: Preloader Exit
      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "-=1.5"
      );

      tl.to(
        chars,
        {
          yPercent: (index) => {
            return index % 2 === 0 ? 100 : -100;
          },
          duration: 1,
          ease: "hop",
          stagger: 0.025,
          delay: 0.5,
        },
        "-=2.5"
      );

      tl.to(
        ".preloader-overlay",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.75,
          ease: "hop",
        },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  if (isComplete) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] touch-none pointer-events-none font-['Manrope',sans-serif]">
      {/* Preloader Layer */}
      <div 
        className="preloader-overlay fixed inset-0 w-full h-screen bg-black"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", willChange: "clip-path" }}
      >
        <div 
          className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-white origin-left"
          style={{ transform: "scaleX(0)", willChange: "transform" }}
        ></div>

        <div 
          className="preloader-images absolute top-[45%] lg:top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] lg:w-[25rem] lg:h-[25rem]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", willChange: "clip-path" }}
        >
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="preloader-img absolute w-full h-full"
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", willChange: "clip-path" }}
            >
              <img 
                src={src} 
                alt={`Preloader ${idx + 1}`} 
                className="preloader-img-inner relative w-full h-full object-cover"
                style={{ transform: "scale(2)", willChange: "transform" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Header that moves after loading */}
      <div 
        className="preloader-header fixed w-full flex justify-center items-center translate-y-[50vh] lg:translate-y-[60vh] z-10 origin-top"
        style={{ willChange: "transform" }}
      >
        <div className="flex text-white uppercase text-[4rem] lg:text-[7.5rem] font-semibold leading-[0.9]">
          {headerText.map((char, idx) => (
            <div key={idx} className="char-mask relative inline-block overflow-hidden">
              <span className={`char-inner inline-block min-w-[0.5rem] ${idx >= 3 ? 'text-[#D42B2B]' : ''}`}>
                {char === " " ? "\u00A0" : char}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
