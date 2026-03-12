"use client";

import { useCallback, useEffect, useRef } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [212 / 255, 43 / 255, 43 / 255],
  glowColor: [212 / 255, 43 / 255, 43 / 255],
  markers: [
    { location: [41.9981, 21.4254], size: 0.1 },   // Skopje
    { location: [40.7128, -74.006], size: 0.1 },    // New York
    { location: [52.52, 13.405], size: 0.1 },       // Berlin
    { location: [35.6762, 139.6503], size: 0.1 },   // Tokyo
    { location: [-23.5505, -46.6333], size: 0.1 },  // São Paulo
    { location: [51.5074, -0.1278], size: 0.08 },   // London
    { location: [1.3521, 103.8198], size: 0.08 },   // Singapore
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const dampedMovement = useRef(0);

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  const onRender = useCallback((state: Record<string, number>) => {
    // Smooth damping toward pointer movement
    dampedMovement.current += (pointerMovement.current - dampedMovement.current) * 0.1;

    if (!pointerInteracting.current) {
      phiRef.current += 0.005;
    }
    state.phi = phiRef.current + dampedMovement.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [config, onRender, onResize]);

  return (
    <div className={cn("relative w-full aspect-square", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-700 cursor-grab active:cursor-grabbing"
        style={{ contain: "layout paint size" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteracting.current = e.clientX;
            pointerMovement.current += delta / 200;
            phiRef.current += delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            if (pointerInteracting.current !== null) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteracting.current = e.touches[0].clientX;
              phiRef.current += delta / 200;
            } else {
              pointerInteracting.current = e.touches[0].clientX;
            }
          }
        }}
      />
    </div>
  );
}
