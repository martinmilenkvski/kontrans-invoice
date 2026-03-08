import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FadeIn, StaggerGroup, RevealLine } from "./Animations";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] relative font-sans mt-10 md:mt-24">
      
      {/* Floating CTA Card — pure white against the dark base for max contrast */}
      <div className="max-w-[1600px] mx-auto w-full px-0 lg:px-24 relative z-20">
        <div className="bg-white border-y lg:border border-black/5 lg:rounded-3xl lg:mb-[-100px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-[55%_45%] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_20px_rgba(0,0,0,0.05)] group transition-all duration-500">
          
          {/* subtle tinted glow visible on the white card */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-[#D42B2B]/[0.03] pointer-events-none"></div>

          {/* CTA Content */}
          <StaggerGroup className="p-10 md:p-16 lg:p-20 flex flex-col gap-6 relative z-10 justify-center">
            
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight leading-[1.05]">
                Спремни за вашата <br />
                <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)]">следна пратка?</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mt-2 max-w-md">
                Придружете се на над 1000 компании кои ни го доверуваат нивниот глобален транспорт.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <button className="mt-4 w-fit px-8 py-5 bg-[#D42B2B] hover:bg-[#b02222] text-white text-sm font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center gap-3 group/btn shadow-lg shadow-[#D42B2B]/20">
                <span>Започнете веднаш</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </FadeIn>
          </StaggerGroup>

          {/* Right side: Modern Data Globe */}
          <FadeIn direction="left" delay={0.5} className="hidden lg:flex items-center justify-center relative bg-[#080808] overflow-hidden">
            {/* Soft background illumination */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(212,43,43,0.08)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">

              {/* Base gradient sphere */}
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.8)_80%)] shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.9)] border border-white/5" />

              {/* Animated sweeping radar conic gradient */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(212,43,43,0.1)_90deg,transparent_120deg)] animate-[spin_8s_linear_infinite]" />

              {/* Globe lines SVG */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="globe-mask">
                    <stop offset="60%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g mask="url(#globe-mask)">
                  {/* Grid of dots */}
                  <pattern id="dotGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.8" fill="white" opacity="0.3" />
                  </pattern>
                  <circle cx="100" cy="100" r="90" fill="url(#dotGrid)" opacity="0.4" />
                  
                  {/* Horizontal contours */}
                  <path d="M 10,100 Q 100,60 190,100" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                  <path d="M 10,100 Q 100,140 190,100" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                  <ellipse cx="100" cy="100" rx="90" ry="8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />

                  {/* Vertical contours */}
                  <path d="M 100,10 Q 60,100 100,190" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <path d="M 100,10 Q 140,100 100,190" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <ellipse cx="100" cy="100" rx="12" ry="90" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                </g>
              </svg>

              {/* Data Connections / Network Nodes */}
              <div className="absolute inset-0 preserve-3d animate-[spin_60s_linear_infinite]">
                {/* Hub 1: Europe */}
                <div className="absolute top-[35%] left-[55%] flex items-center justify-center z-10">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D42B2B] shadow-[0_0_15px_rgba(212,43,43,1)]" />
                    <div className="absolute inset-0 rounded-full bg-[#D42B2B] animate-ping opacity-50" style={{ animationDuration: '2s' }} />
                  </div>
                  {/* Label */}
                  <span className="absolute left-3 top-0 text-[8px] font-mono text-white/70 uppercase tracking-widest bg-black/50 px-1.5 py-0.5 rounded backdrop-blur">
                    Frankfurt
                  </span>
                </div>

                {/* Hub 2: US East */}
                <div className="absolute top-[42%] left-[25%] flex items-center justify-center z-10">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" style={{ animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Hub 3: Asia */}
                <div className="absolute top-[48%] right-[20%] flex items-center justify-center z-10">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D42B2B] shadow-[0_0_12px_rgba(212,43,43,0.9)]" />
                    <div className="absolute inset-0 rounded-full bg-[#D42B2B] animate-ping opacity-40" style={{ animationDuration: '2.5s' }} />
                  </div>
                </div>

                {/* Hub 4: South America */}
                <div className="absolute bottom-[35%] left-[35%] flex items-center justify-center z-10">
                  <div className="relative">
                    <div className="w-1 h-1 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </div>
                </div>

                {/* Connecting Lines (SVG) absolute positioned so it spins with the nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                  {/* US to Europe */}
                  <path d="M 100,168 Q 160,120 220,140" fill="none" stroke="#D42B2B" strokeWidth="1" opacity="0.6" strokeDasharray="3 4">
                    <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                  {/* Europe to Asia */}
                  <path d="M 220,140 Q 280,160 320,192" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>

              {/* Floating tech rings */}
              <div className="absolute inset-0 rounded-full border border-[#D42B2B]/20 scale-[1.05] shadow-[0_0_20px_rgba(212,43,43,0.1)] pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[1.12] border-dashed pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
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
                {['Бродски транспорт', 'Авионски транспорт', 'Камионски транспорт', 'Складирање'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-3 group/link w-fit">
                      <span className="text-[#D42B2B] opacity-0 group-hover/link:opacity-100 transition-opacity text-[10px] font-bold">■</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">{item}</span>
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
                {['За нас', 'Процес', 'Статистика', 'Контакт'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-3 group/link w-fit">
                      <span className="text-[#D42B2B] opacity-0 group-hover/link:opacity-100 transition-opacity text-[10px] font-bold">■</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">{item}</span>
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
