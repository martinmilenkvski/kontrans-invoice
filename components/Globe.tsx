"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

// Define a more robust Marker type that includes the metadata for labels
export interface GlobeMarker {
  location: [number, number];
  size: number;
  id?: string;
  label?: string;
  color?: [number, number, number];
}

export interface GlobeArc {
  from: [number, number];
  to: [number, number];
}

const GLOBE_CONFIG: Partial<COBEOptions> = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0, // Light theme
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [1, 1, 1], // White/Light
  markerColor: [212 / 255, 43 / 255, 43 / 255], // Kontrans Red
  glowColor: [1, 1, 1], // Light Glow
  markers: [],
};

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
}

export function Globe({
  className,
  config = {},
  markers = [],
  arcs = [],
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  // Use a callback to handle the rendering and manually set CSS variables for labels
  const onRender = useCallback((state: Record<string, any>) => {
    if (!pointerInteracting.current) {
      phiRef.current += 0.003;
    }
    state.phi = phiRef.current + pointerMovement.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;

    // The library SHOULD set the variables, but we ensure they are applied to the container
    // If the library provides them in the state, we can use them.
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    window.addEventListener("resize", onResize);
    onResize();

    const mergedConfig = {
      ...GLOBE_CONFIG,
      ...config,
      markers: markers.map(m => ({ location: m.location, size: m.size, id: m.id })),
      arcs: arcs,
    };

    const globe = createGlobe(canvasRef.current, {
      ...mergedConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state: any) => {
        onRender(state);
        // Sync the state variables to the container for CSS Anchor Positioning
        // COBE puts them in state.markers[i].__style
        if (containerRef.current) {
          markers.forEach((m, i) => {
             if (m.id) {
                // @ts-ignore - access internal style if available or fallback
                const markerState = (state.markers as any)?.[i];
                if (markerState?.__style) {
                   Object.entries(markerState.__style).forEach(([key, value]) => {
                      containerRef.current?.style.setProperty(key, value as string);
                   });
                }
             }
          });
        }
      },
    } as any);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [isMounted, config, markers, arcs, onRender, onResize]);

  return (
    <div ref={containerRef} className={cn("relative w-full aspect-square group", className)}>
      {/* Cinematic Atmosphere Glow - Light Theme (Darker shadow/glow) */}
      <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden flex items-center justify-center">
        <div 
          className="w-[90%] h-[90%] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000 cursor-grab active:cursor-grabbing z-10"
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
          }
        }}
      />

      {/* Interactive Labels using CSS Anchor Positioning */}
      {markers.map((m) => m.id && m.label && (
        <div
          key={m.id}
          className="absolute z-20 pointer-events-none select-none transition-opacity duration-300"
          style={{
            // @ts-ignore - CSS Anchor Positioning
            positionAnchor: `--cobe-${m.id}`,
            top: "anchor(top)",
            left: "anchor(center)",
            transform: "translate(-50%, -100%)",
            marginTop: "-12px",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
          }}
        >
          <div className="px-3 py-1.5 bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-sm flex flex-col gap-0.5 shadow-xl">
             <span className="text-[0.5rem] font-black text-white/40 tracking-[0.2em] uppercase leading-none">HUB // {m.id}</span>
             <span className="text-[0.7rem] font-bold text-white tracking-widest uppercase whitespace-nowrap">{m.label}</span>
             
             {/* Decorative indicator */}
             <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-b from-[#111111]/40 to-transparent" />
          </div>
        </div>
      ))}

      {/* CSS for Anchor Positioning Support */}
      <style jsx global>{`
        @supports not (anchor-name: --test) {
          /* Fallback for browsers without anchor positioning: hide labels to avoid clutter
             In a strictly cinematic modern experience, we often target Chromium for these features. */
          [style*="positionAnchor"] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
