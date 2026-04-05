"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FadeIn, StaggerGroup } from "./Animations";
import { Globe } from "./Globe";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FFFFFF] relative font-sans pt-10 md:pt-24 border-t border-black/5">
      
      {/* Floating CTA Card — Pure White / Brand Red Accent */}
      <div className="max-w-[1600px] mx-auto w-full px-0 lg:px-24 relative z-20">
        <div className="bg-[#FAFAFA] border lg:border-black/5 lg:rounded-3xl lg:mb-[-100px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-[55%_45%] shadow-xl group transition-all duration-500">
          
          {/* subtle atmospheric glow */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-[#D42B2B]/[0.05] pointer-events-none"></div>

          {/* CTA Content */}
          <StaggerGroup className="p-10 md:p-16 lg:p-20 flex flex-col gap-6 relative z-10 justify-center items-center lg:items-start text-center lg:text-left">
            
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
                </span>
                <span className="text-[#D42B2B] font-bold tracking-widest text-xs uppercase cursor-default">
                  СУПЕРИОРНА ЛОГИСТИКА
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-[1.05] uppercase">
                Спремни за вашата <br />
                <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] lowercase font-normal px-2">следна пратка?</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-black/40 font-bold text-lg leading-relaxed mt-2 max-w-md uppercase tracking-tight">
                Придружете се на над 1000 компании кои ни го доверуваат нивниот глобален транспорт.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <Link href="/contact" className="mt-8 w-fit px-10 py-5 bg-[#111111] hover:bg-[#D42B2B] text-white text-xs font-black tracking-widest uppercase rounded-sm transition-all duration-300 flex items-center gap-4 group/btn shadow-lg shadow-black/10">
                <span>Започнете веднаш</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </StaggerGroup>

          {/* Right side: WebGL Globe with Light Fade */}
          <FadeIn direction="left" delay={0.5} className="flex items-center justify-center relative bg-white overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,43,43,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative w-[300px] sm:w-[380px] lg:w-[480px] flex-shrink-0">
              <Globe />
              {/* Light Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,#FFFFFF_85%)] pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Structural footer base */}
      <div className="bg-[#FFFFFF] pt-32 lg:pt-48 pb-12 w-full relative z-10">
        
        <div className="max-w-[1600px] mx-auto w-full flex flex-col relative z-10 px-8 lg:px-16">
          
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 pb-20 mb-20 border-b border-black/5" staggerDelay={0.1}>
            
            {/* Col 1: Brand */}
            <FadeIn className="flex flex-col relative">
              <Link href="/" className="inline-block mb-10">
                <span className="text-3xl font-black text-[#111111] tracking-widest leading-none block uppercase">
                  KON<span className="text-[#D42B2B]">TRANS</span>
                </span>
                <span className="text-[0.55rem] font-black text-[#D42B2B] tracking-[0.4em] uppercase block mt-2">
                  Logistics & Shipping
                </span>
              </Link>
              
              <div className="text-black/40 text-[0.7rem] font-bold leading-relaxed mb-10 max-w-[200px] uppercase tracking-wider">
                Вашиот доверлив партнер за меѓународен транспорт и глобална логистика.
              </div>

              <div className="flex gap-6 mt-auto">
                {['LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                  <a 
                    key={social} 
                    href={`#${social.toLowerCase()}`}
                    className="text-black/20 hover:text-[#D42B2B] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Col 2: Services */}
            <FadeIn className="flex flex-col">
              <h4 className="text-[#111111] font-black tracking-[0.3em] text-[0.6rem] uppercase mb-10 flex items-center gap-4">
                <div className="w-6 h-[1px] bg-[#D42B2B]"></div>
                Услуги
              </h4>
              <ul className="flex flex-col gap-6">
                {['Бродски транспорт', 'Авионски транспорт', 'Камионски транспорт', 'Складирање'].map((link) => (
                  <li key={link}>
                    <Link href="/#services" className="text-black/40 hover:text-[#111111] text-[0.7rem] font-black uppercase tracking-widest transition-colors flex items-center gap-3 group/link w-fit">
                      <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Col 3: Company */}
            <FadeIn className="flex flex-col">
              <h4 className="text-[#111111] font-black tracking-[0.3em] text-[0.6rem] uppercase mb-10 flex items-center gap-4">
                <div className="w-6 h-[1px] bg-[#D42B2B]"></div>
                Компанија
              </h4>
              <ul className="flex flex-col gap-6">
                {['За нас', 'Процес', 'Статистика', 'Контакт'].map((link) => (
                  <li key={link}>
                    <Link href={link === 'За нас' ? '/about' : link === 'Контакт' ? '/contact' : '/#process'} className="text-black/40 hover:text-[#111111] text-[0.7rem] font-black uppercase tracking-widest transition-colors flex items-center gap-3 group/link w-fit">
                      <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Col 4: Contact */}
            <FadeIn className="flex flex-col p-10 bg-black/[0.02] border border-black/5">
              <h4 className="text-[#111111] font-black tracking-[0.3em] text-[0.6rem] uppercase mb-10 flex items-center gap-4">
                <div className="w-6 h-[1px] bg-[#D42B2B]"></div>
                Контакт
              </h4>
              <ul className="flex flex-col gap-8">
                <li className="flex items-start gap-5">
                  <MapPin className="w-4 h-4 text-[#D42B2B] shrink-0 mt-0.5" />
                  <span className="text-black/40 text-[0.7rem] font-bold uppercase leading-relaxed tracking-wider">
                    Бул. Партизански <br />Одреди 15, Скопје
                  </span>
                </li>
                <li className="flex items-center gap-5">
                  <Phone className="w-4 h-4 text-[#D42B2B] shrink-0" />
                  <span className="text-black/40 text-[0.7rem] font-bold uppercase">+389 2 3123 456</span>
                </li>
                <li className="flex items-center gap-5">
                  <Mail className="w-4 h-4 text-[#D42B2B] shrink-0" />
                  <span className="text-black/40 text-[0.7rem] font-bold uppercase">info@kontrans.mk</span>
                </li>
              </ul>
            </FadeIn>

          </StaggerGroup>

          {/* Bottom Copyright Row */}
          <FadeIn className="flex flex-col md:flex-row justify-between items-center gap-8 py-8" delay={0.3}>
            <p className="text-black/20 text-[0.6rem] font-black tracking-[0.2em] font-mono uppercase">
              &copy; {currentYear} KONTRANS. СИТЕ ПРАВА СЕ ЗАДРЖАНИ.
            </p>
            <div className="flex items-center gap-12">
              <Link href="#privacy" className="text-black/20 hover:text-black text-[0.6rem] transition-colors font-black tracking-[0.2em] uppercase">Приватност</Link>
              <Link href="#terms" className="text-black/20 hover:text-black text-[0.6rem] transition-colors font-black tracking-[0.2em] uppercase">Услови</Link>
            </div>
          </FadeIn>

        </div>
      </div>

    </footer>
  );
}
