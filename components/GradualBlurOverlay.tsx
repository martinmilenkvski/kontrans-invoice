"use client";

import React from "react";

/**
 * GradualBlurOverlay
 * 
 * Provides a sophisticated cinematic "gradual blur" effect at the bottom of the viewport.
 * This is achieved using multiple layered backdrops with increasing blur and mask-linear gradients.
 * This creates a much smoother transition than a single blurred element.
 */
export function GradualBlurOverlay() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none select-none h-20 w-full overflow-hidden" 
      aria-hidden="true"
    >
      {/* 
          A condensed but powerful "Layered Blur" technique.
          High blur intensity focused in a very narrow 20px region.
      */}
      
      {/* Step 1: Soft Blur */}
      <div className="absolute inset-0 backdrop-blur-[2px]" 
           style={{ WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 30%)" }} />
      
      {/* Step 2: Medium Blur */}
      <div className="absolute inset-0 backdrop-blur-[6px]" 
           style={{ WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)" }} />
      
      {/* Step 3: Strong Condensed Blur */}
      <div className="absolute inset-0 backdrop-blur-[12px]" 
           style={{ WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }} />
      
      {/* Subtle edge anchor */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
    </div>
  );
}
