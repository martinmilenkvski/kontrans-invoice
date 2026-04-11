"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#D42B2B] relative font-sans text-white overflow-hidden border-t border-white/5">
      
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
