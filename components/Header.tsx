"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 w-full z-50 bg-transparent">
      {/* Top Border line */}
      <div className="absolute top-0 left-0 right-0 border-b border-white/5 h-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-1">
          KON<span className="text-[#D42B2B]">TRANS</span>
          <div className="w-2 h-2 rounded-full bg-[#D42B2B] ml-1 flex-shrink-0"></div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#home" className="text-white transition-colors">Почетна</Link>
          <Link href="#services" className="hover:text-white transition-colors">Услуги</Link>
          <Link href="#about" className="hover:text-white transition-colors">За Нас</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Контакт</Link>
        </nav>

        {/* Desktop Contact Info & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-white text-sm font-medium">
            <div className="bg-white/10 p-2 rounded-full">
              <Phone className="w-4 h-4 text-[#D42B2B]" />
            </div>
            <a href="tel:+38970123456" className="hover:text-[#D42B2B] transition-colors">
              +389 70 123 456
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 -mr-2 bg-white/5 rounded-lg border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#111111] border-b border-white/10 shadow-2xl z-40 px-6 py-6 pb-8 flex flex-col gap-6 backdrop-blur-3xl">
          <nav className="flex flex-col gap-4 text-base font-medium text-gray-300">
            <Link href="#home" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#D42B2B] transition-colors py-2 border-b border-white/5">Почетна</Link>
            <Link href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Услуги</Link>
            <Link href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">За Нас</Link>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Контакт</Link>
          </nav>
          
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl mt-2">
            <div className="flex items-center gap-3 text-white text-sm font-medium">
              <div className="bg-[#D42B2B]/20 p-2.5 rounded-full border border-[#D42B2B]/30">
                <Phone className="w-4 h-4 text-[#D42B2B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Контакт телефон</span>
                <a href="tel:+38970123456" className="font-semibold text-white">
                  +389 70 123 456
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
