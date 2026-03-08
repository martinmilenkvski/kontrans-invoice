import { ArrowRight, Package, Clock } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen pt-20 bg-[#080808] flexflex-col">
      {/* Subtle red radial glow */}
      <div className="absolute z-0 -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#D42B2B] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto w-full flex-grow flex flex-col relative z-10">
        
        {/* Main Hero Grid */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 lg:border-x border-white/10 mt-10 lg:mt-16">
          
          {/* Left Column: Content & Stats */}
          <div className="flex flex-col border-b lg:border-r border-white/10">
            
            {/* Top Content Area */}
            <div className="p-10 md:p-16 lg:p-24 flex-grow flex flex-col justify-center border-b border-white/10">
              <div className="flex flex-col gap-8 max-w-xl">
                
                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#D42B2B]"></span>
                  <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                    Транспорт и Шипинг
                  </span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-white leading-[1.05] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    Вашиот товар.
                  </span>
                  <br />
                  Нашата <br />
                  <span className="text-[#D42B2B] italic pr-2">одговорност.</span>
                </h1>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md mt-4">
                  Сигурен, брз и ефикасен транспорт на сите дестинации. 
                  Посветени на успехот на вашиот бизнис со секоја пратка.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
                  <button className="w-full sm:w-auto px-8 py-5 bg-[#D42B2B] hover:bg-[#b02222] text-white text-sm font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group">
                    <span>Побарај понуда</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full sm:w-auto px-8 py-5 bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold tracking-widest uppercase rounded-lg transition-all duration-300">
                    Нашите услуги
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Stat 1 */}
              <div className="p-10 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-500 min-h-[200px]">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Package className="w-5 h-5 text-[#D42B2B]" />
                  </div>
                  {/* Ping indicator */}
                  <span className="relative flex h-3 w-3 mt-2 pr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
                  </span>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">1000+</h3>
                  <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Пратки низ светот</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-10 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-500 min-h-[200px]">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">18</h3>
                  <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Години на пазарот</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image Container */}
          <div className="relative min-h-[500px] lg:min-h-full border-b lg:border-b-0 border-white/10 group overflow-hidden">
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent z-10 lg:hidden"></div>
            <div className="absolute inset-0 bg-[#080808]/20 z-10 hidden lg:block group-hover:bg-transparent transition-colors duration-1000"></div>
            
            <Image
              src="/hero.png"
              alt="Kontrans Shipping Logistics"
              fill
              priority
              className="object-cover grayscale-[30%] contrast-110 scale-100 lg:scale-105 group-hover:scale-100 group-hover:grayscale-0 transition-all duration-1000 origin-center"
              quality={90}
            />

            {/* Accent Corner Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#D42B2B] opacity-50 z-20 hidden lg:block m-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/30 opacity-50 z-20 hidden lg:block m-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
