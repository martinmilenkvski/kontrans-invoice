"use client";
import { useRef } from "react";
import { ArrowRight, Ship, Plane, Truck, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, StaggerGroup } from "./Animations";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax offsets
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden font-sans bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >

      {/* ── Full-bleed background video ── */}
      <motion.div 
        style={{ y: videoY }}
        className="absolute inset-0 z-0 h-[120%]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-cinematic.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080808]/75" />
      </motion.div>

      {/* ── Gradient glow layers (on top of image) ── */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-20%] left-[30%] w-[60%] h-[70%] bg-[#1a1a1a] rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[40%] bg-[#D42B2B] rounded-full blur-[180px] opacity-[0.08]" />
        <div className="absolute top-[5%] right-[10%] w-[25%] h-[35%] bg-[#D42B2B] rounded-full blur-[150px] opacity-[0.06]" />
      </motion.div>

      {/* ── Grid background pattern (subtle) ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />



      {/* ── Content ── */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-24 min-h-screen flex flex-col pt-24 pb-16"
      >

        {/* Main row: left content + right floating cards */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT COLUMN: Content ── */}
          <StaggerGroup className="flex flex-col gap-7">

            {/* Eyebrow */}
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D42B2B]" />
                </span>
                <span className="text-[#D42B2B] font-semibold tracking-[0.25em] text-xs uppercase">
                  Freight & Logistics
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.2}>
              <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold text-white leading-[1.05] tracking-tight">
                Глобален{" "}
                <br className="hidden sm:block" />
                транспорт со{" "}
                <br className="hidden sm:block" />
                <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] text-[1.1em]">
                  доверба.
                </span>
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.3}>
              <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
                Сигурен, брз и целосно следен транспорт на над 50 дестинации. 
                Бродски, авионски и камионски превоз од една платформа.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.4}>
              <div className="flex items-center gap-4 pt-1">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-[#D42B2B] hover:bg-[#b02222] text-white text-sm font-bold tracking-widest uppercase rounded-lg transition-all duration-300 group shadow-xl shadow-[#D42B2B]/25"
                >
                  Побарај понуда
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#services"
                  className="text-white/70 hover:text-white text-sm font-semibold tracking-wide transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                >
                  Нашите услуги
                </Link>
              </div>
            </FadeIn>

            {/* Stats row */}
            <FadeIn delay={0.5}>
              <div className="flex items-center gap-10 pt-6 mt-2 border-t border-white/[0.07]">
                {[
                  { value: "1000+", label: "Пратки" },
                  { value: "18",    label: "Години" },
                  { value: "50+",   label: "Дестинации" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-2xl md:text-3xl font-black text-white tracking-tight">{s.value}</span>
                    <span className="text-gray-500 text-[0.65rem] font-bold uppercase tracking-[0.15em]">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </StaggerGroup>

          {/* ── RIGHT COLUMN: Dashboard cards ── */}
          <motion.div style={{ y: cardsY }}>
            <StaggerGroup className="hidden lg:flex flex-col gap-4 justify-center" staggerDelay={0.15}>

              {/* Main card: Shipment Tracking */}
              <FadeIn direction="left" delay={0.4}>
                <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#D42B2B]/15 flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5 text-[#D42B2B]" />
                      </div>
                      <span className="text-white text-sm font-bold">Следење на пратки</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/15" />
                      <div className="w-2 h-2 rounded-full bg-white/15" />
                      <div className="w-2 h-2 rounded-full bg-white/15" />
                    </div>
                  </div>
                  <div className="px-5 py-1">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 text-[0.6rem] text-gray-500 font-bold uppercase tracking-widest py-2.5 border-b border-white/[0.05]">
                      <span>Рута</span>
                      <span>Статус</span>
                      <span>ETA</span>
                    </div>
                    {[
                      { route: "Шангај → Скопје",  status: "Во транзит", eta: "12 дена", color: "text-yellow-400", icon: <Ship className="w-3.5 h-3.5" /> },
                      { route: "Дубаи → Битола",    status: "Доставена",  eta: "—",       color: "text-emerald-400", icon: <Plane className="w-3.5 h-3.5" /> },
                      { route: "Истанбул → Прилеп", status: "Во транзит", eta: "3 дена",  color: "text-yellow-400", icon: <Truck className="w-3.5 h-3.5" /> },
                      { route: "Хамбург → Охрид",   status: "Потвдена",  eta: "8 дена",  color: "text-blue-400",   icon: <Ship className="w-3.5 h-3.5" /> },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-x-6 items-center py-3 border-b border-white/[0.03] last:border-b-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[#D42B2B]">{row.icon}</span>
                          <span className="text-white/80 text-xs font-medium">{row.route}</span>
                        </div>
                        <span className={`text-xs font-bold ${row.color}`}>{row.status}</span>
                        <span className="text-white/35 text-xs font-medium text-right">{row.eta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Bottom row: 3 small cards side by side */}
              <div className="grid grid-cols-3 gap-3">

                {/* Verified */}
                <FadeIn direction="up" delay={0.5}>
                  <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 flex flex-col gap-2.5 h-full">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-white text-xs font-bold block">Верифициран</span>
                      <span className="text-gray-500 text-[0.6rem] font-medium">ISO 9001</span>
                    </div>
                  </div>
                </FadeIn>

                {/* Delivery score */}
                <FadeIn direction="up" delay={0.6}>
                  <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-full">
                    <div className="relative w-14 h-14">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f0f0f0" strokeWidth="2.5" />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#D42B2B" strokeWidth="2.5" strokeDasharray="97.4" strokeDashoffset="21.4" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#111111] text-sm font-black">98%</span>
                      </div>
                    </div>
                    <span className="text-[#111111] text-[0.5rem] font-bold uppercase tracking-widest text-center">Достава</span>
                  </div>
                </FadeIn>

                {/* 24/7 Support */}
                <FadeIn direction="up" delay={0.7}>
                  <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/[0.08] rounded-xl p-4 flex flex-col gap-2.5 h-full">
                    <div className="w-8 h-8 rounded-full bg-[#D42B2B]/15 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#D42B2B]" />
                    </div>
                    <div>
                      <span className="text-white text-xs font-bold block">24/7</span>
                      <span className="text-gray-500 text-[0.6rem] font-medium">Поддршка</span>
                    </div>
                  </div>
                </FadeIn>

              </div>
            </StaggerGroup>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
