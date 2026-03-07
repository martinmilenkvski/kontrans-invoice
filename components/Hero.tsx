import { ArrowRight, Package, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#080808]">
      {/* Subtle read radial glow top-left */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#D42B2B] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#D42B2B]"></span>
            <span className="text-[#D42B2B] font-semibold tracking-wider text-sm uppercase">
              Транспорт и Шипинг
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Вашиот товар. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Нашата одговорност.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
            Сигурен, брз и ефикасен транспорт на сите дестинации. 
            Посветени на успехот на вашиот бизнис со секоја пратка.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#D42B2B] hover:bg-[#b02222] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group">
              Побарај понуда
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-white font-medium rounded-lg transition-all duration-300">
              Нашите услуги
            </button>
          </div>
        </div>

        {/* Right Side: Floating Dark Card */}
        <div className="relative justify-self-center lg:justify-self-end mt-12 lg:mt-0 w-full max-w-md">
          {/* Decorative element behind */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D42B2B]/20 to-transparent rounded-2xl rotate-3 scale-105 border border-white/5"></div>
          
          <div className="relative bg-[#111111] border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Успешно испорачани</p>
                <h3 className="text-4xl font-bold text-white mb-2">1000+</h3>
                <p className="text-sm text-[#D42B2B] font-medium flex items-center gap-1">
                  пратки низ светот
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#D42B2B]/10 flex items-center justify-center border border-[#D42B2B]/20">
                <Package className="w-6 h-6 text-[#D42B2B]" />
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Докажано искуство</p>
                <h3 className="text-4xl font-bold text-white mb-2">18</h3>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                  години на пазарот
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            
            {/* Minimal pulse indicator */}
            <div className="absolute -bottom-3 -right-3 flex items-center justify-center">
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#D42B2B] border-4 border-[#111111]"></span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
