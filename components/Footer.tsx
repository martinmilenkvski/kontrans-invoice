"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div 
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full">
        <footer className="bg-[#D42B2B] h-full relative font-sans text-white overflow-hidden border-t border-white/5 flex flex-col justify-between">
          
          {/* Top Divider Detail */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* ── MIDDLE SECTION: LOGO & LINKS ── */}
          <div className="w-full flex-grow flex flex-col justify-center border-b border-white/10">
            <div className="max-w-[1700px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 h-full">
              
              {/* Branding */}
              <div className="lg:col-span-5 p-8 lg:p-20 border-r border-white/10 flex flex-col justify-center gap-12">
                 <div className="flex flex-col gap-4">
                    <h1 className="text-6xl lg:text-[7rem] font-black tracking-tighter leading-none uppercase">
                       KON<br />TRANS
                    </h1>
                    <p className="font-mono text-[0.6rem] tracking-[0.4em] uppercase opacity-60 max-w-xs leading-relaxed mt-4">
                       Вашиот доверлив партнер за меѓународен транспорт и глобална логистика низ светот.
                    </p>
                 </div>
    
                 <div className="flex gap-4 mt-8">
                    {[
                      { icon: Instagram, href: "#" },
                      { icon: Facebook, href: "#" },
                      { icon: Linkedin, href: "#" }
                    ].map((social, i) => (
                      <Link key={i} href={social.href} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#D42B2B] transition-colors duration-300">
                         <social.icon className="w-5 h-5" />
                      </Link>
                    ))}
                 </div>
              </div>
    
              {/* Links Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 h-full">
                 
                 {/* Col: Services */}
                 <div className="p-8 lg:p-20 border-r border-white/10 flex flex-col justify-center gap-10">
                    <span className="font-mono text-[0.55rem] font-bold tracking-widest uppercase opacity-40">01 // Услуги</span>
                    <ul className="flex flex-col gap-6">
                       {['Бродски транспорт', 'Авионски транспорт', 'Камионски транспорт', 'Складирање'].map((link) => (
                         <li key={link}>
                            <Link href="/#services" className="text-sm font-bold uppercase tracking-widest hover:text-black hover:pl-2 transition-all duration-300 block">
                               {link}
                            </Link>
                         </li>
                       ))}
                    </ul>
                 </div>
    
                 {/* Col: Company */}
                 <div className="p-8 lg:p-20 border-r border-white/10 flex flex-col justify-center gap-10">
                    <span className="font-mono text-[0.55rem] font-bold tracking-widest uppercase opacity-40">02 // Компанија</span>
                    <ul className="flex flex-col gap-6">
                       {['За нас', 'Процес', 'Статистика', 'Контакт'].map((link) => (
                         <li key={link}>
                            <Link href={link === 'За нас' ? '/about' : link === 'Контакт' ? '/contact' : '/#process'} className="text-sm font-bold uppercase tracking-widest hover:text-black hover:pl-2 transition-all duration-300 block">
                               {link}
                            </Link>
                         </li>
                       ))}
                    </ul>
                 </div>
    
                 {/* Col: Info */}
                 <div className="p-8 lg:p-20 flex flex-col justify-center gap-10">
                    <span className="font-mono text-[0.55rem] font-bold tracking-widest uppercase opacity-40">03 // Контакт</span>
                    <div className="flex flex-col gap-10">
                       <div className="flex items-start gap-4 hover:opacity-100 opacity-80 transition-opacity">
                          <MapPin className="w-5 h-5 mt-0.5 text-white/50" />
                          <span className="text-xs font-bold leading-relaxed uppercase tracking-wider">
                             Киро Крстевски 3/6 <br />1000 Скопје
                          </span>
                       </div>
                       <div className="flex items-start gap-4 hover:opacity-100 opacity-80 transition-opacity cursor-pointer">
                          <Phone className="w-5 h-5 mt-0.5 text-white/50" />
                          <div className="flex flex-col gap-2">
                             <span className="text-xs font-bold uppercase tracking-widest">+389 2 3232 657</span>
                             <span className="text-xs font-bold uppercase tracking-widest">+389 2 3215 296</span>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 hover:opacity-100 opacity-80 transition-opacity cursor-pointer">
                          <Mail className="w-5 h-5 mt-0.5 text-white/50" />
                          <span className="text-xs font-bold uppercase tracking-widest">office@kontrans.com.mk</span>
                       </div>
                    </div>
                 </div>
    
              </div>
    
            </div>
          </div>
    
          {/* ── BOTTOM SECTION: COPYRIGHT ── */}
          <div className="w-full">
            <div className="max-w-[1700px] mx-auto p-8 lg:px-20 lg:py-8 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="font-mono text-[0.55rem] tracking-[0.5em] uppercase opacity-40">
                  &copy; {currentYear} KONTRANS. СИТЕ ПРАВА СЕ ЗАДРЖАНИ.
               </div>
               <div className="flex gap-12 font-mono text-[0.55rem] tracking-[0.4em] uppercase opacity-40">
                  <Link href="#privacy" className="hover:opacity-100 transition-opacity">Приватност</Link>
                  <Link href="#terms" className="hover:opacity-100 transition-opacity">Услови</Link>
               </div>
            </div>
          </div>
    
          {/* Decorative BG Text */}
          <div className="absolute -bottom-10 -right-10 text-[25vw] font-black opacity-[0.03] select-none pointer-events-none group-hover:scale-105 transition-transform duration-1000">
             2026
          </div>
    
        </footer>
      </div>
    </div>
  );
}
