"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { usePreloader } from "@/lib/PreloaderContext";


const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isComplete: isPreloaderDone } = usePreloader();


  const navLinks = [
    { label: "За нас", href: "/about" },
    {
      label: "Услуги",
      href: "/#services",
      dropdown: [
        { label: "Бродски транспорт", href: "/services/sea" },
        { label: "Камионски транспорт", href: "/services/road" },
        { label: "Авионски транспорт", href: "/services/air" },
      ],
    },
    { label: "Контакт", href: "/contact" },
  ];

  return (
    <header className="absolute top-0 w-full z-50 font-sans bg-transparent">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isPreloaderDone ? "show" : "hidden"}
        className="max-w-[1600px] mx-auto px-4 lg:px-4 h-[80px] flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div variants={item}>
          <Link href="/" className="flex items-center gap-4 shrink-0 h-10 lg:h-12">
            <Image
              src="/kontrans logo.svg"
              alt="KONTRANS"
              width={40}
              height={40}
              className="h-full w-auto object-contain invert"
              priority
            />
            <span className="text-2xl lg:text-[1.7rem] font-black tracking-[0.05em] text-white leading-none">
              KON<span className="text-[#D42B2B]">TRANS</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((navItem) =>
            navItem.dropdown ? (
              <motion.div key={navItem.href} variants={item} className="relative group py-6">
                <Link
                  href={navItem.href}
                  className="flex items-center gap-2 text-[0.95rem] font-medium text-white transition-colors duration-300 group-hover:text-[#D42B2B]"
                >
                  {navItem.label}
                  <ChevronDown className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#D42B2B]" />
                </Link>
                {/* Dropdown */}
                <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 w-56 bg-white border border-black/[0.06] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="py-2 flex flex-col">
                    {navItem.dropdown.map((drop) => (
                      <Link
                        key={drop.href}
                        href={drop.href}
                        className="px-5 py-4 text-base font-medium text-[#111111] hover:bg-[#FAFAFA] hover:text-[#D42B2B] transition-colors"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key={navItem.href} variants={item}>
                <Link
                  href={navItem.href}
                  className="text-[0.95rem] font-medium text-white transition-colors duration-300 hover:text-[#D42B2B] py-6"
                >
                  {navItem.label}
                </Link>
              </motion.div>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 shrink-0">
          <motion.div variants={item}>
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-sm font-bold tracking-wide transition-all duration-300 group bg-white/10 border border-white/15 text-white hover:bg-white/20"
            >
              Најави се
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <button
            className="md:hidden p-2 rounded-lg transition-all text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Animated HR — grows left → right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isPreloaderDone ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        style={{ originX: 0 }}
        className="h-[2px] w-full bg-white/10"
      />

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[400px]" : "max-h-0"}`}>
        <nav className="bg-white border-t border-black/[0.06] px-6 py-3 flex flex-col shadow-xl">
          {navLinks.map((navItem) => (
            <div key={navItem.href} className="border-b border-black/[0.04]">
              {navItem.dropdown ? (
                <div className="flex flex-col">
                  <Link
                    href={navItem.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-between items-center text-[#111111] hover:text-[#D42B2B] font-semibold text-lg py-5 transition-colors"
                  >
                    {navItem.label}
                    <ChevronDown className="w-4 h-4 opacity-30" />
                  </Link>
                  <div className="flex flex-col px-4 pb-4 gap-3">
                    {navItem.dropdown.map((drop) => (
                      <Link
                        key={drop.href}
                        href={drop.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-500 hover:text-[#D42B2B] text-base font-medium transition-colors flex items-center gap-3"
                      >
                        <span className="text-[#D42B2B] text-[8px] opacity-50">■</span>
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={navItem.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-[#111111] hover:text-[#D42B2B] font-semibold text-lg py-5 transition-colors"
                >
                  {navItem.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 mb-2 flex items-center justify-center gap-3 px-6 py-4 bg-[#D42B2B] text-white text-lg font-bold tracking-widest uppercase rounded-lg transition-all"
          >
            Побарај понуда <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
