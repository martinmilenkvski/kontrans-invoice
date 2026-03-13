"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const heroH = typeof window !== "undefined" ? window.innerHeight * 0.85 : 700;
    const onScroll = () => setScrolled(window.scrollY > heroH);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "За нас",     href: "/about" },
    { 
      label: "Услуги",     
      href: "/#services",
      dropdown: [
        { label: "Бродски транспорт", href: "/services/sea" },
        { label: "Камионски транспорт", href: "/services/road" },
        { label: "Авионски транспорт", href: "/services/air" },
      ]
    },
    { label: "Процес",     href: "/#process" },
    { label: "Статистика", href: "/#stats" },
    { label: "Контакт",    href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 font-sans transition-all duration-500 ${
        scrolled
          ? "bg-white border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-24 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className={`text-lg font-black tracking-[0.12em] uppercase transition-colors duration-300 ${
            scrolled ? "text-[#111111]" : "text-white"
          }`}>
            KON<span className="text-[#D42B2B]">TRANS</span>
          </span>
          <span className="relative flex h-1.5 w-1.5 ml-0.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D42B2B]" />
          </span>
        </Link>

        {/* Desktop nav — center-ish */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((item) => (
            item.dropdown ? (
              <div key={item.href} className="relative group py-6">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 text-[0.8rem] font-medium transition-colors duration-300 group-hover:text-[#D42B2B] ${
                    scrolled ? "text-[#111111]" : "text-white/65"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-180 ${
                    scrolled ? "text-[#111111] group-hover:text-[#D42B2B]" : "text-white/65 group-hover:text-[#D42B2B]"
                  }`} />
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 w-56 bg-white border border-black/[0.06] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="py-2 flex flex-col">
                    {item.dropdown.map(drop => (
                      <Link 
                        key={drop.href} 
                        href={drop.href} 
                        className="px-5 py-3 text-[0.85rem] font-medium text-[#111111] hover:bg-[#FAFAFA] hover:text-[#D42B2B] transition-colors"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.8rem] font-medium transition-colors duration-300 hover:text-[#D42B2B] py-6 ${
                  scrolled ? "text-[#111111]" : "text-white/65 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/login"
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[0.75rem] font-bold tracking-wide transition-all duration-300 group ${
              scrolled
                ? "bg-[#D42B2B] text-white hover:bg-[#b02222]"
                : "bg-white/10 border border-white/15 text-white hover:bg-white/20"
            }`}
          >
            Пријави се
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            className={`md:hidden p-2 rounded-lg transition-all ${
              scrolled ? "text-[#111111]" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[400px]" : "max-h-0"}`}>
        <nav className="bg-white border-t border-black/[0.06] px-6 py-3 flex flex-col shadow-xl">
          {navLinks.map((item) => (
            <div key={item.href} className="border-b border-black/[0.04]">
              {item.dropdown ? (
                <div className="flex flex-col">
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-between items-center text-[#111111] hover:text-[#D42B2B] font-semibold text-sm py-4 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 opacity-30" />
                  </Link>
                  <div className="flex flex-col px-4 pb-4 gap-3">
                    {item.dropdown.map(drop => (
                      <Link 
                        key={drop.href} 
                        href={drop.href} 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-gray-500 hover:text-[#D42B2B] text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <span className="text-[#D42B2B] text-[8px] opacity-50">■</span>
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-[#111111] hover:text-[#D42B2B] font-semibold text-sm py-4 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 mb-2 flex items-center justify-center gap-2 px-5 py-3 bg-[#D42B2B] text-white text-xs font-bold tracking-widest uppercase rounded-lg transition-all"
          >
            Побарај понуда <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
