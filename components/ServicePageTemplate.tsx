"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn, RevealLine, StaggerGroup } from "@/components/Animations";
import { useEffect } from "react";
import Lenis from "lenis";

export interface ServicePageProps {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageSrc: string;
  };
  overview: {
    title: string;
    description: string;
    features: string[];
  };
  details: {
    title: string;
    description: string;
    imageSrc: string;
    bullets: string[];
    reverse?: boolean;
  }[];
}

export function ServicePageTemplate({ hero, overview, details }: ServicePageProps) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#080808] border-b border-white/10 min-h-[60vh] flex flex-col justify-end pb-12 lg:pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.imageSrc} 
            alt={hero.title} 
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
        </div>
        
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }} 
        />
        <div className="absolute top-[-20%] left-[30%] w-[60%] h-[70%] bg-[#D42B2B] rounded-full blur-[180px] opacity-[0.08]" />

        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-24 relative z-10">
          <StaggerGroup className="flex flex-col gap-8">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D42B2B]"></span>
                </span>
                <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  {hero.eyebrow}
                </span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-4 max-w-5xl">
                {hero.title.split(' ').map((word, i, arr) => {
                   if (i === arr.length - 1) {
                      return <span key={i} className="text-[#D42B2B] italic drop-shadow-lg pr-2"> {word}</span>;
                   }
                   return word + " ";
                })}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-medium leading-relaxed mt-2">
                {hero.subtitle}
              </p>
            </FadeIn>
          </StaggerGroup>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white text-[#111111] overflow-hidden">
        <div className="max-w-[1600px] mx-auto border-x border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-10 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/10 bg-[#FAFAFA] flex flex-col justify-center">
               <StaggerGroup>
                 <FadeIn>
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-4 h-[2px] bg-[#D42B2B]"></span>
                      <span className="text-gray-500 font-bold tracking-widest text-xs uppercase">
                        Преглед на услугата
                      </span>
                    </div>
                 </FadeIn>
                 <FadeIn delay={0.1}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight leading-[1.1] mb-8">
                      {overview.title}
                    </h2>
                 </FadeIn>
                 <FadeIn delay={0.2}>
                    <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                      {overview.description}
                    </p>
                 </FadeIn>
               </StaggerGroup>
            </div>

            <div className="p-10 md:p-12 lg:p-24 flex flex-col justify-center border-b border-black/10 lg:border-b-0 relative group">
               <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#D42B2B]/[0.02] rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-[#D42B2B]/[0.05]"></div>

               <StaggerGroup className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                 {overview.features.map((feature, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1}>
                      <div className="flex items-start gap-4 p-6 bg-white border border-black/5 rounded-xl hover:border-black/10 hover:shadow-xl transition-all duration-300 h-full">
                        <div className="mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border border-[#D42B2B]/20 bg-[#D42B2B]/5">
                           <span className="text-[#D42B2B] text-[8px] font-bold">■</span>
                        </div>
                        <span className="text-gray-700 font-bold tracking-wide uppercase text-xs leading-relaxed mt-0.5">{feature}</span>
                      </div>
                    </FadeIn>
                 ))}
               </StaggerGroup>
            </div>

          </div>
        </div>
      </section>

      {/* Deep Dive Details Sections */}
      {details.map((detail, index) => (
        <section key={index} className="bg-[#FAFAFA] text-[#111111]">
          <div className="max-w-[1600px] mx-auto border-x border-black/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-black/10">
              
              {/* Image Column */}
              <div className={`relative min-h-[400px] lg:min-h-full border-b border-black/10 overflow-hidden group ${detail.reverse ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r lg:border-b-0'}`}>
                <img 
                  src={detail.imageSrc} 
                  alt={detail.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
              </div>

              {/* Text Column */}
              <div className={`p-10 md:p-12 lg:p-24 flex flex-col justify-center border-b border-black/10 lg:border-b-0 bg-[#FAFAFA] ${detail.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                <StaggerGroup className="flex flex-col gap-8 h-full justify-center">
                  <FadeIn>
                     <span className="text-[#D42B2B] font-mono tracking-widest text-sm uppercase">0{index + 1} — Детали</span>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <h3 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#111111]">
                      {detail.title}
                    </h3>
                  </FadeIn>
                  <FadeIn delay={0.3}>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                      {detail.description}
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.4}>
                    <ul className="flex flex-col gap-5 mt-4">
                      {detail.bullets.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4 font-bold uppercase tracking-wider text-xs md:text-sm text-gray-700">
                          <span className="text-[10px] text-[#D42B2B] mr-2">■</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </StaggerGroup>
              </div>

            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
