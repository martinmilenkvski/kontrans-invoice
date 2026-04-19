"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

  const baseBg = isRed ? "bg-[#D42B2B]" : isDark ? "bg-[#080808]" : "bg-white";
  const baseText = isRed || isDark ? "text-white" : "text-black";
  const baseBorder = isRed ? "border-[#D42B2B]" : isDark ? "border-[#080808]" : "border-black";

  const content = (
    <>
      <div 
        className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" 
        style={{ backgroundColor: hoverColor }}
      />
      
      <span className={`relative z-10 font-sans text-xs font-medium tracking-[0.2em] transition-colors duration-500 whitespace-nowrap ${baseText} group-hover:text-white`}>
        {text}
      </span>

      <div className="relative z-10 flex items-center justify-center">
        <ArrowUpRight className={`w-5 h-5 transition-all duration-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 ${baseText}`} />
      </div>
    </>
  );

  const sharedClasses = `group relative flex items-center justify-between gap-6 px-8 py-5 transition-all duration-500 overflow-hidden w-fit border ${baseBorder} ${baseBg} ${className}`;

  if (isDecorative) {
    return (
      <div className={sharedClasses}>
        {content}
      </div>
    );
  }

  return (
    <Link href={href} id={id} className={sharedClasses}>
      {content}
    </Link>
  );
}
