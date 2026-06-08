"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Globe, Shield, Zap, Anchor, Plane, Truck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  imageSrc: string;
  number: string;
}

export function ServiceHero({ eyebrow, title, accent, description, imageSrc, number }: ServiceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-reveal", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: "power4.out" }
    );

    tl.fromTo(".hero-image",
      { scale: 1.05 },
      { scale: 1, duration: 2.5, ease: "expo.out" },
      0
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-white pt-32 lg:pt-48 pb-24 overflow-hidden border-b border-black/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
          <div className="lg:col-span-8">
            <div className="hero-reveal opacity-0 flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                {number} // {eyebrow}
              </span>
            </div>
            
            <h1 className="hero-reveal opacity-0 font-sans text-[clamp(2.5rem,6vw,5.5rem)] text-brand-dark leading-[0.85] tracking-tighter font-medium">
              {title} <br />
              <span className="text-brand-red italic">{accent}.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 pb-4">
            <p className="hero-reveal opacity-0 font-sans text-xl text-brand-dark/50 leading-relaxed font-medium max-w-sm">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-12 aspect-[21/9] relative overflow-hidden bg-brand-dark/5 border border-black/5">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="hero-image object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white font-mono text-[9px] tracking-widest uppercase font-bold opacity-60">
             Logistics Framework // V-2.0
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceHighlightProps {
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
}

export function ServiceHighlight({ title, description, features, imageSrc }: ServiceHighlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".highlight-reveal",
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white py-32 border-b border-black/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-6 flex flex-col gap-12">
            <div className="highlight-reveal opacity-0">
               <h2 className="font-sans text-4xl lg:text-6xl font-medium text-brand-dark tracking-tighter leading-tight mb-8">
                  {title}
               </h2>
               <p className="font-sans text-xl text-brand-dark/50 leading-relaxed font-medium">
                  {description}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {features.map((feature, i) => (
                 <div key={i} className="highlight-reveal opacity-0 flex flex-col gap-4 p-8 bg-[#FAFAFA] border border-black/5">
                    <div className="w-10 h-10 bg-brand-red/5 flex items-center justify-center border border-brand-red/10">
                       <CheckCircle2 className="w-5 h-5 text-brand-red" />
                    </div>
                    <span className="font-sans text-sm font-bold text-brand-dark uppercase tracking-widest leading-snug">
                       {feature}
                    </span>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="highlight-reveal opacity-0 relative aspect-square bg-[#FAFAFA] border border-black/5 overflow-hidden">
               <Image 
                 src={imageSrc} 
                 alt="Operational Detail" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-brand-dark/5" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

interface ServiceDataProps {
  title: string;
  items: { label: string; value: string }[];
}

export function ServiceData({ title, items }: ServiceDataProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".data-item",
      { x: -30, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white py-32 border-b border-black/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h3 className="font-sans text-2xl font-bold text-brand-dark uppercase tracking-widest mb-16">
          Технички Капацитети
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
           {items.map((item, i) => (
             <div key={i} className="data-item opacity-0 bg-white p-12 flex flex-col gap-4">
                <span className="font-sans text-xs font-bold text-brand-red uppercase tracking-widest">{item.label}</span>
                <span className="font-sans text-3xl font-medium text-brand-dark tracking-tighter">{item.value}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
