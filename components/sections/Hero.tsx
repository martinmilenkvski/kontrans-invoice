"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePreloader } from "@/lib/PreloaderContext";


// ── Slot-machine digit ───────────────────────────────────────────────────────

const DIGIT_H = 52; // px — matches text-4xl leading-none

function SlotDigit({ digit, delay }: { digit: number; delay: number }) {
  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: DIGIT_H, width: "0.625em" }}
    >
      <motion.span
        initial={{ y: DIGIT_H * 2 }}       // start two slots below
        animate={{ y: -(digit * DIGIT_H) }} // roll up to the correct digit
        transition={{
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1], // fast-start, soft-land
          delay,
        }}
        style={{ position: "absolute", top: 0, display: "flex", flexDirection: "column" }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            style={{ height: DIGIT_H, display: "flex", alignItems: "center", lineHeight: 1 }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function SlotCounter({
  value,
  suffix = "",
  startDelay = 0,
}: {
  value: number;
  suffix?: string;
  startDelay?: number;
}) {
  const digits = value.toString().split("");
  return (
    <span className="inline-flex items-center font-sans text-white text-4xl leading-none tracking-tight tabular-nums">
      {digits.map((d, i) => (
        <SlotDigit key={i} digit={parseInt(d)} delay={startDelay + i * 0.06} />
      ))}
      {suffix && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: startDelay + digits.length * 0.06 + 0.15 }}
          style={{
            display: "inline-flex",
            height: DIGIT_H,
            alignItems: "center",
          }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

// ── Animation variants ───────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.5,
    },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const statsContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 1.2,
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────

export function Hero() {
  const { isComplete: isPreloaderDone } = usePreloader();


  const containerRef = useRef<HTMLDivElement>(null);

  // counterDelay = card's delayChildren + (index * staggerChildren)
  const stats = [
    { label: "Пратки",          value: 1000, suffix: "+", counterDelay: 1.2  },
    { label: "Дестинации",      value: 50,   suffix: "+", counterDelay: 1.38 },
    { label: "Години искуство", value: 20,   suffix: "+", counterDelay: 1.56 },
  ];

  return (
    <section
      ref={containerRef}
      className="sticky top-0 z-0 w-full h-screen overflow-hidden bg-background"
    >
      {/* ── Full-bleed background video ── */}
      <motion.div
        className="absolute inset-0 z-0 h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-cinematic.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/main-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* ── Content layer ── */}
      {isPreloaderDone && (
        <motion.div
          className="relative z-10 h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col"
        >
        <div className="mt-auto pb-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-end">

          {/* ── LEFT: Headline + subtitle + CTA ── */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 max-w-2xl"
          >
            <motion.h1
              variants={slideUp}
              className="font-sans text-[clamp(2.8rem,8vw,6.5rem)] font-medium text-white leading-[0.8] tracking-tighter"
            >
              Глобален транспорт{" "}
              <br className="hidden sm:block" />
              со{" "}
              <span className="italic font-sans text-brand-red text-[1.1em]">
                доверба.
              </span>
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="text-white/60 font-sans text-base md:text-lg leading-relaxed max-w-md"
            >
              Сигурен, брз и целосно следен транспорт на над 50 дестинации.
              Бродски, авионски и камионски превоз од една платформа.
            </motion.p>

            <motion.div
              variants={slideUp}
              className="flex flex-wrap items-center gap-8 pt-8"
            >
                <Link
                  href="#contact"
                  className="group relative flex items-center gap-4 bg-white px-8 py-5 transition-all duration-500"
                >
                  {/* Background Slide Effect */}
                  <div className="absolute inset-0 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <span className="relative z-10 font-sans text-xs font-black uppercase tracking-[0.2em] text-black group-hover:text-white transition-colors duration-500">
                    Побарај понуда
                  </span>

                  <div className="relative z-10 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-black group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                  </div>
                </Link>

              <div className="hidden sm:block w-px h-10 bg-white/10" />

              <Link
                href="#services"
                className="group relative flex flex-col py-2"
              >
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors duration-300">
                  Истражи ги
                </span>
                <span className="font-sans text-xs font-black uppercase tracking-[0.2em] text-white">
                  Нашите услуги
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stat cards with slot-machine numbers ── */}
          <motion.div
            variants={statsContainer}
            initial="hidden"
            animate="show"
            className="hidden lg:flex flex-col w-65 divide-y divide-white/10 border border-white/10 px-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={slideLeft}
                className="flex items-end justify-between py-5 cursor-default"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-white/40 text-[0.8rem] uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                  <SlotCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    startDelay={stat.counterDelay}
                  />
                </div>
                <span className="text-white/20 text-xs">···</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
      )}
    </section>
  );
}
