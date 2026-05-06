"use client";

import { ReactNode } from "react";
import { FadeIn, StaggerGroup } from "../ui/Animations";

interface WebsiteHeroProps {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  subtitle: string;
  imageSrc: string;
  minHeight?: string;
  accentMode?: "inline" | "block";
}

export function WebsiteHero({
  eyebrow,
  title,
  accent,
  subtitle,
  imageSrc,
  minHeight = "min-h-[60vh]",
  accentMode = "inline",
}: WebsiteHeroProps) {
  return (
    <section
      className={`relative bg-background border-b border-white/10 ${minHeight} flex flex-col justify-end pb-12 lg:pb-24 overflow-hidden pt-32`}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-25 grayscale contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-background/20" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 relative z-10">
        <StaggerGroup className="flex flex-col gap-8">
          <FadeIn>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-brand-red" />
              <span className="font-mono text-[0.6rem] text-brand-red tracking-[0.45em] uppercase font-bold">
                {eyebrow}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="max-w-6xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium text-white tracking-tighter leading-[0.86]">
              {title}
              {accent && (
                <>
                  {accentMode === "block" ? <br /> : " "}
                  <span className="text-brand-red italic font-(family-name:--font-jost) font-normal tracking-normal text-[1.05em]">
                    {accent}
                  </span>
                </>
              )}
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="max-w-2xl text-base md:text-xl text-white/55 font-medium leading-relaxed">
              {subtitle}
            </p>
          </FadeIn>
        </StaggerGroup>
      </div>
    </section>
  );
}
