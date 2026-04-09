"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail, ArrowRight, Instagram, Facebook, Linkedin } from "lucide-react";
import { FadeIn, StaggerGroup } from "./Animations";
import { Globe } from "./Globe";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#D42B2B] relative font-sans text-white overflow-hidden border-t border-white/5">
      
      {/* ── TOP SECTION: MASSIVE HEADLINE & GLOBE ── */}
      <div className="relative w-full border-b border-white/10">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left: Huge CTA */}
          <div className="lg:col-span-8 p-8 lg:p-20 border-r border-white/10 flex flex-col gap-12">
            <StaggerGroup className="flex flex-col gap-8">
              <FadeIn>
                <span className="font-mono text-[0.65rem] tracking-[0.6em] uppercase font-bold opacity-60">
                  Ready to move // 09
                </span>
              </FadeIn>
              <FadeIn>
                <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase">
                  Спремни за <br />
                  <span className="italic font-[family-name:var(--font-caveat)] font-normal lowercase opacity-80">следна пратка?</span>
                </h2>
              </FadeIn>
              <FadeIn>
                <Link href="/contact" className="group inline-flex items-center gap-6 mt-6">
                   <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <ArrowRight className="w-8 h-8 group-hover:text-[#D42B2B] transition-colors" />
                   </div>
                   <span className="text-xl lg:text-3xl font-black uppercase tracking-tighter">Започнете веднаш</span>
                </Link>
              </FadeIn>
            </StaggerGroup>
          </div>

          {/* Right: Integrated Globe */}
          <div className="lg:col-span-4 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden bg-black/5">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
             <div className="relative w-[300px] lg:w-[450px] opacity-80 hover:opacity-100 transition-opacity duration-1000 scale-125">
                <Globe />
             </div>
          </div>

        </div>
      </div>

      {/* ── MIDDLE SECTION: LOGO & LINKS ── */}
      <div className="w-full border-b border-white/10">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Branding */}
          <div className="lg:col-span-5 p-8 lg:p-20 border-r border-white/10 flex flex-col justify-between gap-20">
             <div className="flex flex-col gap-4">
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
                   KON<br />TRANS
                </h1>
                <p className="font-mono text-[0.6rem] tracking-[0.4em] uppercase opacity-60 max-w-xs leading-relaxed">
                   Вашиот доверлив партнер за меѓународен транспорт и глобална логистика низ светот.
                </p>
             </div>

             <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Linkedin, href: "#" }
                ].map((social, i) => (
                  <Link key={i} href={social.href} className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#D42B2B] transition-all">
                     <social.icon className="w-5 h-5" />
                  </Link>
                ))}
             </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 h-full">
             
             {/* Col: Services */}
             <div className="p-8 lg:p-20 border-r border-white/10 flex flex-col gap-10">
                <span className="font-mono text-[0.55rem] font-bold tracking-widest uppercase opacity-40">01 // Услуги</span>
                <ul className="flex flex-col gap-4">
                   {['Бродски транспорт', 'Авионски транспорт', 'Камионски транспорт', 'Складирање'].map((link) => (
                     <li key={link}>
                        <Link href="/#services" className="text-sm font-bold uppercase tracking-widest hover:pl-2 transition-all block">
                           {link}
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>

             {/* Col: Company */}
             <div className="p-8 lg:p-20 border-r border-white/10 flex flex-col gap-10">
                <span className="font-mono text-[0.55rem] font-bold tracking-widest uppercase opacity-40">02 // Компанија</span>
                <ul className="flex flex-col gap-4">
                   {['За нас', 'Процес', 'Статистика', 'Контакт'].map((link) => (
                     <li key={link}>
                        <Link href={link === 'За нас' ? '/about' : link === 'Контакт' ? '/contact' : '/#process'} className="text-sm font-bold uppercase tracking-widest hover:pl-2 transition-all block">
                           {link}
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>

             {/* Col: Info */}
             <div className="p-8 lg:p-20 flex flex-col gap-10">
                <span className="font-mono text-[0.55rem] font-bold tracking-widest uppercase opacity-40">03 // Контакт</span>
                <div className="flex flex-col gap-8">
                   <div className="flex items-start gap-4">
                      <MapPin className="w-4 h-4 mt-1 opacity-50" />
                      <span className="text-xs font-bold leading-relaxed uppercase">
                         Бул. Партизански <br />Одреди 15, Скопје
                      </span>
                   </div>
                   <div className="flex items-start gap-4">
                      <Phone className="w-4 h-4 mt-1 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-widest">+389 2 3123 456</span>
                   </div>
                   <div className="flex items-start gap-4">
                      <Mail className="w-4 h-4 mt-1 opacity-50" />
                      <span className="text-xs font-bold uppercase tracking-widest">info@kontrans.mk</span>
                   </div>
                </div>
             </div>

          </div>

        </div>
      </div>

      {/* ── BOTTOM SECTION: COPYRIGHT ── */}
      <div className="max-w-[1700px] mx-auto p-8 lg:px-20 lg:py-12 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="font-mono text-[0.55rem] tracking-[0.5em] uppercase opacity-40">
            &copy; {currentYear} KONTRANS. СИТЕ ПРАВА СЕ ЗАДРЖАНИ.
         </div>
         <div className="flex gap-12 font-mono text-[0.55rem] tracking-[0.4em] uppercase opacity-40">
            <Link href="#privacy" className="hover:opacity-100 transition-opacity">Приватност</Link>
            <Link href="#terms" className="hover:opacity-100 transition-opacity">Услови</Link>
         </div>
      </div>

      {/* Decorative BG Text */}
      <div className="absolute -bottom-20 -right-20 text-[20vw] font-black opacity-[0.03] select-none pointer-events-none">
         2026
      </div>

    </footer>
  );
}
