"use client";

import React from "react";
import { motion } from "framer-motion";

interface KineticTextProps {
  text: string;
  className?: string;
}

export function KineticText({ text, className = "" }: KineticTextProps) {
  return (
    <motion.span
      className={`relative inline-block overflow-hidden whitespace-nowrap group ${className}`}
      initial="initial"
      whileHover="hover"
    >
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute top-full left-0 block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full text-[#D42B2B]">
        {text}
      </span>
    </motion.span>
  );
}
