import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FadeIn, StaggerGroup, RevealLine } from "./Animations";
import { Globe } from "./Globe";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] relative font-sans mt-10 md:mt-24">
      
      {/* Floating CTA Card — dark theme for a cohesive premium look */}
      <div className="max-w-[1600px] mx-auto w-full px-0 lg:px-24 relative z-20">
        <div className="bg-[#111111] border-y lg:border border-white/5 lg:rounded-3xl lg:mb-[-100px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-[55%_45%] shadow-2xl group transition-all duration-500">
          
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
                <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  Супериорна Логистика
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                Спремни за вашата <br />
                <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)]">следна пратка?</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-gray-400 font-medium text-lg leading-relaxed mt-2 max-w-md">
                Придружете се на над 1000 компании кои ни го доверуваат нивниот глобален транспорт.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <Link href="/contact" className="mt-4 w-fit px-8 py-5 bg-[#D42B2B] hover:bg-[#b02222] text-white text-sm font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center gap-3 group/btn shadow-lg shadow-[#D42B2B]/20">
                <span>Започнете веднаш</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </StaggerGroup>

          {/* Right side: WebGL Globe — visible on all screen sizes */}
          <FadeIn direction="left" delay={0.5} className="flex items-center justify-center relative bg-[#080808] overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-0">
            {/* Atmospheric glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,43,43,0.15)_0%,transparent_70%)] pointer-events-none" />

            {/* Globe container — centered, responsive sizing */}
            <div className="relative w-[260px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[500px] flex-shrink-0">
              <Globe />
              {/* Vignette edges */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,#080808_85%)] pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Dark structural footer base */}
      <div className="bg-[#080808] border-t border-white/10 lg:pt-32 w-full relative z-10">
        
        {/* Atmospheric glow */}
        <div className="absolute z-0 bottom-0 left-[20%] w-[40%] h-[30%] bg-[#D42B2B] rounded-full blur-[180px] opacity-[0.07] pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto w-full flex flex-col relative z-10">
          
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10" staggerDelay={0.1}>
            
            {/* Col 1: Brand */}
            <FadeIn className="p-10 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col relative">
              <RevealLine horizontal={false} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[1px] bg-white/10" />
              <Link href="/" className="inline-block mb-8">
                <span className="text-3xl font-black text-white tracking-widest leading-none block uppercase">
                  KON<span className="text-[#D42B2B]">TRANS</span>
                </span>
                <span className="text-[0.6rem] font-bold text-gray-500 tracking-[0.3em] uppercase block mt-1">
                  Logistics & Shipping
                </span>
              </Link>
              
              <div className="text-gray-400 text-sm leading-relaxed mb-10 max-w-[250px]">
                Вашиот доверлив партнер за меѓународен транспорт и глобална логистика.
              </div>

              <div className="flex gap-4 mt-auto">
                {['LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                  <a 
                    key={social} 
                    href={`#${social.toLowerCase()}`}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300"
                    aria-label={social}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Col 2: Services */}
            <FadeIn className="p-10 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col relative">
              <RevealLine horizontal={false} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[1px] bg-white/10" />
              <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-10 flex items-center gap-3">
                <span className="w-4 h-[2px] bg-[#D42B2B]"></span>
                Услуги
              </h4>
              <ul className="flex flex-col gap-6">
                {[
                  { label: 'Бродски транспорт', href: '/#services' },
                  { label: 'Авионски транспорт', href: '/#services' },
                  { label: 'Камионски транспорт', href: '/#services' },
                  { label: 'Складирање', href: '/#services' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-3 group/link w-fit">
                      <span className="text-[#D42B2B] opacity-0 group-hover/link:opacity-100 transition-opacity text-[10px] font-bold">■</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Col 3: Company */}
            <FadeIn className="p-10 md:p-12 lg:p-20 border-b md:border-b-0 lg:border-r border-white/10 flex flex-col relative">
              <RevealLine horizontal={false} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[1px] bg-white/10" />
              <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-10 flex items-center gap-3">
                <span className="w-4 h-[2px] bg-[#D42B2B]"></span>
                Компанија
              </h4>
              <ul className="flex flex-col gap-6">
                {[
                  { label: 'За нас', href: '/about' },
                  { label: 'Процес', href: '/#process' },
                  { label: 'Статистика', href: '/#stats' },
                  { label: 'Контакт', href: '/contact' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-3 group/link w-fit">
                      <span className="text-[#D42B2B] opacity-0 group-hover/link:opacity-100 transition-opacity text-[10px] font-bold">■</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Col 4: Contact */}
            <FadeIn className="p-10 md:p-12 lg:p-20 flex flex-col bg-[#111111]/40">
              <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-10 flex items-center gap-3">
                <span className="w-4 h-[2px] bg-[#D42B2B]"></span>
                Контакт
              </h4>
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D42B2B] shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    Бул. Партизански Одреди 15,<br />1000 Скопје, МКД
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#D42B2B] shrink-0" />
                  <a href="tel:+38923123456" className="text-gray-400 hover:text-white text-sm transition-colors">
                    +389 2 3123 456
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#D42B2B] shrink-0" />
                  <a href="mailto:info@kontrans.mk" className="text-gray-400 hover:text-white text-sm transition-colors">
                    info@kontrans.mk
                  </a>
                </li>
              </ul>
            </FadeIn>

          </StaggerGroup>

          {/* Bottom Copyright Row */}
          <FadeIn className="grid grid-cols-1 md:grid-cols-2" delay={0.3}>
            <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center md:justify-start">
              <p className="text-gray-500 text-xs font-bold tracking-wide font-mono uppercase">
                &copy; {currentYear} KONTRANS. Сите права се задржани.
              </p>
            </div>
            <div className="p-8 lg:p-12 flex items-center justify-center md:justify-end gap-10">
              <Link href="#privacy" className="text-gray-500 hover:text-white text-xs transition-colors font-mono font-bold tracking-wide uppercase">Приватност</Link>
              <Link href="#terms" className="text-gray-500 hover:text-white text-xs transition-colors font-mono font-bold tracking-wide uppercase">Услови</Link>
            </div>
          </FadeIn>

        </div>
      </div>

    </footer>
  );
}
