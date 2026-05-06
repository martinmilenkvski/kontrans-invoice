"use client";

import { Footer } from "@/components/Footer";
import { WebsiteHero } from "@/components/WebsiteHero";
import { FadeIn, StaggerGroup } from "@/components/Animations";

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
  const titleParts = hero.title.trim().split(/\s+/);
  const accent = titleParts.pop();
  const title = titleParts.join(" ");

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30">


      <WebsiteHero
        eyebrow={hero.eyebrow}
        title={title}
        accent={accent}
        subtitle={hero.subtitle}
        imageSrc={hero.imageSrc}
      />

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
              <StaggerGroup className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                {overview.features.map((feature, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="flex items-start gap-4 p-6 bg-white border border-black/5 hover:border-brand-red/30 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center border border-[#D42B2B]/20 bg-[#D42B2B]/5">
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
