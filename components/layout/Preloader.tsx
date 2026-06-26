"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { usePreloader } from "@/lib/PreloaderContext";


if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, useGSAP);
  // Only create it if it doesn't exist yet to avoid React strict mode errors
  if (!CustomEase.get("hop")) {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
  }
}



const headerText = "КОНТРАНС".split("");

const images = [
  "/service_ocean_bright.png",
  "/service_air_bright.png",
  "/service_land_bright.png",
  "/about-highway.png",
];

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isComplete, setComplete } = usePreloader();

  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isComplete]);


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
          setComplete(true);
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      });

      // Add absolute labels to control precise sequencing
      tl.addLabel("start", 0);
      tl.addLabel("textEnter", 0.8);
      tl.addLabel("collapse", 3.2);
      tl.addLabel("curtainExit", 4.2);

      // Phase 1: Progress Bar (syncs with build phase)
      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 2.8,
        ease: "power3.inOut",
      }, "start")
        .set(".progress-bar", { transformOrigin: "right" }, 2.8)
        .to(".progress-bar", {
          scaleX: 0,
          duration: 0.4,
          ease: "power3.in",
        }, 2.8);

      // Phase 2: Image Reveal
      preloaderImages.forEach((preloaderImg, index) => {
        tl.to(
          preloaderImg as Element,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.8,
            ease: "hop",
          },
          `start+=${index * 0.4}`
        );
      });

      preloaderImagesInner.forEach((preloaderImageInner, index) => {
        tl.to(
          preloaderImageInner as Element,
          {
            scale: 1,
            duration: 1.2,
            ease: "hop",
          },
          `start+=${index * 0.4}`
        );
      });

      // Phase 3: Header Entrance
      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "hop",
          stagger: 0.02,
        },
        "textEnter"
      );

      // Phase 4: Preloader Exit (Cohesive Collapse)
      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.6,
          ease: "hop",
        },
        "collapse"
      );

      tl.to(
        chars,
        {
          yPercent: (index) => {
            return index % 2 === 0 ? 100 : -100;
          },
          duration: 0.6,
          ease: "hop",
          stagger: 0.02,
          overwrite: "auto",
        },
        "collapse+=0.2"
      );

      // Guarantee text container is completely removed so it's impossible to see
      tl.set(".preloader-header", { display: "none" }, "curtainExit");

      tl.to(
        ".preloader-overlay",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: "hop",
        },
        "curtainExit"
      );
    },
    { scope: containerRef }
  );

  if (isComplete) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] touch-none pointer-events-auto font-[family-name:var(--font-jost)]">
      {/* Preloader Layer */}
      <div
        className="preloader-overlay fixed inset-0 w-full h-screen bg-white"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", willChange: "clip-path" }}
      >
        <div
          className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-[#D42B2B] origin-left"
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

      <style dangerouslySetInnerHTML={{ __html: `
        .char-mask:nth-child(odd) .char-inner {
          transform: translateY(-100%);
        }
        .char-mask:nth-child(even) .char-inner {
          transform: translateY(100%);
        }
      `}} />

      {/* Sticky Header that moves after loading */}
      <div
        className="preloader-header fixed w-full flex justify-center items-center translate-y-[50vh] lg:translate-y-[60vh] z-10 origin-top"
        style={{ willChange: "transform" }}
      >
        <div className="flex text-[#1A1A1A] uppercase text-[4rem] lg:text-[7.5rem] font-semibold leading-[1.15] tracking-tighter">
          {headerText.map((char, idx) => (
            <div key={idx} className="char-mask relative inline-block overflow-hidden">
              <span className={`char-inner inline-block py-3 pr-[0.08em] min-w-[0.5rem] ${idx >= 3 ? 'text-[#D42B2B]' : ''}`}>
                {char === " " ? "\u00A0" : char}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
