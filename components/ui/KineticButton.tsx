"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

interface KineticButtonProps {
  text: string;
  href: string;
  className?: string;
  id?: string;
  hoverColor?: string;
  isDecorative?: boolean;
  variant?: "white" | "red" | "dark";
}

export function KineticButton({ 
  text, 
  href, 
  className = "", 
  id = "", 
  hoverColor = "#D42B2B",
  isDecorative = false,
  variant = "white"
}: KineticButtonProps) {
  const isRed = variant === "red";
  const isDark = variant === "dark";
  
  const buttonRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const textEl = textRef.current;
    if (!button || !textEl) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textXTo = gsap.quickTo(textEl, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(textEl, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { clientX, clientY } = mouseEvent;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.4);
      yTo(y * 0.4);
      textXTo(x * 0.2);
      textYTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const baseBg = isRed ? "bg-[#D42B2B]" : isDark ? "bg-[#080808]" : "bg-white";
  const baseText = isRed || isDark ? "text-white" : "text-black";
  const baseBorder = isRed ? "border-[#D42B2B]" : isDark ? "border-[#080808]" : "border-black";

  const content = (
    <>
      <div 
        className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" 
        style={{ backgroundColor: hoverColor }}
      />
      
      <span ref={textRef} className={`relative z-10 font-sans text-xs font-medium tracking-[0.2em] transition-colors duration-500 whitespace-nowrap ${baseText} group-hover:text-white`}>
        {text}
      </span>

      <div className="relative z-10 flex items-center justify-center">
        <ArrowUpRight className={`w-5 h-5 transition-all duration-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 ${baseText}`} />
      </div>
    </>
  );

  const sharedClasses = `group relative flex items-center justify-between gap-6 px-8 py-5 transition-colors duration-500 overflow-hidden w-fit border ${baseBorder} ${baseBg} ${className}`;

  if (isDecorative) {
    return (
      <div ref={buttonRef as React.RefObject<HTMLDivElement>} className={sharedClasses}>
        {content}
      </div>
    );
  }

  return (
    <Link href={href} id={id} ref={buttonRef as React.RefObject<HTMLAnchorElement>} className={sharedClasses}>
      {content}
    </Link>
  );
}
