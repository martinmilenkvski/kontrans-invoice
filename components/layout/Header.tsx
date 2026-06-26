"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { usePreloader } from "@/lib/PreloaderContext";
import { KineticText } from "../ui/KineticText";

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
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [pathname]);

  const isDashboardOrLogin = pathname === "/login" || pathname?.startsWith("/dashboard");
  if (isDashboardOrLogin) return null;

  // Pages that have a light background by default at the very top
  const isLightPage = pathname === "/about" || pathname === "/contact" || pathname?.startsWith("/services");

  // Theme logic: If we're on a light page, use dark text
  const isDarkTheme = isLightPage;

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
    { label: "Контакт", href: "/#contact" },
  ];

  return (
    <header className="absolute top-0 w-full z-50 font-sans py-2 bg-transparent">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isPreloaderDone ? "show" : "hidden"}
        className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div variants={item}>
          <Link href="/" className="flex items-center gap-4 shrink-0 h-10 lg:h-12">
            <Image
              src="/kontrans logo.svg"
              alt="КОНТРАНС"
              width={40}
              height={40}
              className={`h-full w-auto object-contain transition-all duration-500 ${isDarkTheme ? "" : "invert"}`}
              priority
            />
            <span className={`text-2xl lg:text-[1.7rem] font-black tracking-[0.05em] leading-none transition-colors duration-500 ${isDarkTheme ? "text-brand-dark" : "text-white"}`}>
              КОН<span className="text-brand-red">ТРАНС</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 h-full">
          {navLinks.map((navItem) =>
            navItem.dropdown ? (
              <motion.div key={navItem.href} variants={item} className="relative group h-full flex items-center">
                <Link
                  href={navItem.href}
                  className={`flex items-center gap-2 text-[0.95rem] font-medium transition-colors duration-300 group-hover:text-brand-red ${isDarkTheme ? "text-brand-dark" : "text-white"}`}
                >
                  <KineticText text={navItem.label} />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 group-hover:text-brand-red ${isDarkTheme ? "text-brand-dark" : "text-white"}`} />
                </Link>
                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-black/6 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="py-2 flex flex-col">
                    {navItem.dropdown.map((drop) => (
                      <Link
                        key={drop.href}
                        href={drop.href}
                        className="px-5 py-4 text-base font-medium text-brand-dark hover:bg-[#FAFAFA] hover:text-brand-red transition-colors"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key={navItem.href} variants={item} className="h-full flex items-center">
                <Link
                  href={navItem.href}
                  className={`flex items-center text-[0.95rem] font-medium transition-colors duration-300 hover:text-brand-red h-full ${isDarkTheme ? "text-brand-dark" : "text-white"}`}
                >
                  <KineticText text={navItem.label} />
                </Link>
              </motion.div>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 shrink-0">
          <motion.div variants={item}>
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-sm font-bold tracking-wide transition-all duration-300 group ${isDarkTheme
                  ? "bg-brand-dark text-white hover:bg-brand-red shadow-lg shadow-black/5"
                  : "bg-white/10 border border-white/15 text-white hover:bg-white/20"
                }`}
            >
              {isLoggedIn ? "Контролна табла" : "Најави се"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <button
            className={`md:hidden p-2 transition-all ${isDarkTheme ? "text-brand-dark" : "text-white"}`}
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
        className={`h-px w-full ${isLightPage ? "bg-black/5" : "bg-white/10"}`}
      />

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[100vh]" : "max-h-0"}`}>
        <nav className="bg-white border-t border-black/6 px-6 py-3 flex flex-col shadow-xl">
          {navLinks.map((navItem) => (
            <div key={navItem.href} className="border-b border-black/4">
              {navItem.dropdown ? (
                <div className="flex flex-col">
                  <Link
                    href={navItem.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-between items-center text-brand-dark hover:text-brand-red font-semibold text-lg py-5 transition-colors"
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
                        className="text-gray-500 hover:text-brand-red text-base font-medium transition-colors flex items-center gap-3"
                      >
                        <span className="text-brand-red text-[8px] opacity-50">■</span>
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={navItem.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-brand-dark hover:text-brand-red font-semibold text-lg py-5 transition-colors"
                >
                  {navItem.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 mb-2 flex items-center justify-center gap-3 px-6 py-4 bg-brand-red text-white text-lg font-bold tracking-widest uppercase transition-all"
          >
            Побарај понуда <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            onClick={() => setIsMenuOpen(false)}
            className="mb-2 flex items-center justify-center gap-3 px-6 py-4 bg-brand-dark hover:bg-brand-red text-white text-lg font-bold tracking-widest uppercase transition-all"
          >
            {isLoggedIn ? "Контролна табла" : "Најави се"} <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
