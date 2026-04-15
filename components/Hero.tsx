"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

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
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    const handlePreloader = () => setIsPreloaderDone(true);
    window.addEventListener("preloaderComplete", handlePreloader);

    const timer = setTimeout(() => setIsPreloaderDone(true), 8000); // 8s fallback
    
    return () => {
      window.removeEventListener("preloaderComplete", handlePreloader);
      clearTimeout(timer);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  // counterDelay = card's delayChildren + (index * staggerChildren)
  const stats = [
    { label: "Пратки",          value: 1000, suffix: "+", counterDelay: 1.2  },
    { label: "Дестинации",      value: 50,   suffix: "+", counterDelay: 1.38 },
    { label: "Години искуство", value: 18,   suffix: "",  counterDelay: 1.56 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#080808]"
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
          <source src="/bg-kontrans.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* ── Content layer ── */}
      {isPreloaderDone && (
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 h-full max-w-[1600px] mx-auto px-4 lg:px-4 flex flex-col"
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
              className="font-sans text-[clamp(2.8rem,6vw,5.5rem)] text-white leading-[0.9] tracking-tight"
            >
              Глобален транспорт{" "}
              <br className="hidden sm:block" />
              со{" "}
              <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] text-[1.1em]">
                доверба.
              </span>
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="text-white/60 font-[family-name:var(--font-jost)] text-base md:text-lg leading-relaxed max-w-md"
            >
              Сигурен, брз и целосно следен транспорт на над 50 дестинации.
              Бродски, авионски и камионски превоз од една платформа.
            </motion.p>

            <motion.div
              variants={slideUp}
              className="flex items-center gap-6 pt-2"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 text-white text-sm uppercase tracking-widest hover:gap-5 transition-all duration-300 group"
              >
                Побарај понуда
                <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <Image src="/upper-right-arrow.png" alt="Arrow" width={16} height={16} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 invert group-hover:invert-0" />
                </div>
              </Link>
              <div className="w-px h-4 bg-white/30" />
              <Link
                href="#services"
                className="text-white/40 hover:text-white text-sm uppercase tracking-widest transition-colors"
              >
                Нашите услуги
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stat cards with slot-machine numbers ── */}
          <motion.div
            variants={statsContainer}
            initial="hidden"
            animate="show"
            className="hidden lg:flex flex-col w-[260px] divide-y divide-white/10"
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

            {/* Learn More */}
            <motion.div variants={slideLeft} className="pt-5 flex justify-end">
              <Link
                href="#services"
                className="text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-2 group"
              >
                Повеќе
                <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <Image src="/upper-right-arrow.png" alt="Arrow" width={12} height={12} className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 invert group-hover:invert-0" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
      )}
    </section>
  );
}
