import { FadeIn, StaggerGroup, RevealLine } from "./Animations";

export function Stats() {
  const stats = [
    {
      value: "1000+",
      label: "Успешни Пратки",
      description: "Безбедно доставени низ целиот свет во рекордно време."
    },
    {
      value: "18",
      label: "Години Искуство",
      description: "Докажана експертиза и доверба во логистичката индустрија."
    },
    {
      value: "50+",
      label: "Дестинации",
      description: "Развиена мрежа на партнери на повеќе континенти."
    },
    {
      value: "24/7",
      label: "Поддршка",
      description: "Вашиот товар е следен и безбеден во секое време."
    }
  ];

  return (
    <section className="bg-[#111111] border-t border-white/10 relative overflow-hidden font-sans">
      {/* Subtle red atmospheric glow */}
      <div className="absolute z-0 top-[50%] left-[30%] w-[40%] h-[60%] bg-[#D42B2B] rounded-full blur-[200px] opacity-[0.08] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10 w-full flex flex-col">
        
        {/* Centered Top Header Row */}
        <div className="border-b border-white/10 relative">
          <RevealLine horizontal={true} className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
          <StaggerGroup className="p-10 md:p-16 lg:p-24 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
                </span>
                <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  Во Бројки
                </span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
                Резултати кои 
                <br className="hidden md:block" />
                <span className="text-[#D42B2B] italic pr-2 font-[family-name:var(--font-caveat)]">зборуваат</span>{" "}
                сами за себе.
              </h2>
            </FadeIn>
          </StaggerGroup>
        </div>

        {/* Stats Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
          {stats.map((stat, index) => (
            <FadeIn 
              key={index}
              className={`group p-10 md:p-16 border-b lg:border-b-0 border-white/10 flex flex-col hover:bg-white/[0.03] transition-colors duration-500 relative ${index < 3 ? 'lg:border-r' : ''}`}
            >
              {index < 3 && <RevealLine horizontal={false} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[1px] bg-white/10" />}
              
              <h3 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-medium text-white tracking-tighter mb-8 group-hover:scale-105 group-hover:text-[#D42B2B] transition-all duration-500 origin-left leading-none">
                {stat.value}
              </h3>
              
              <div className="w-12 h-[2px] bg-[#D42B2B] mb-8 origin-left transition-all duration-500 group-hover:w-24"></div>
              
              <h4 className="text-white font-bold text-xl sm:text-2xl tracking-wide uppercase mb-4 leading-snug">
                {stat.label.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h4>
              
              <p className="text-gray-400 font-medium text-base leading-relaxed mt-auto">
                {stat.description}
              </p>
            </FadeIn>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
