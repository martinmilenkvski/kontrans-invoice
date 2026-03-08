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
    <section className="bg-[#080808] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative z-10 w-full">
        
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,400px)] border-b border-white/10">
          <div className="p-10 md:p-16 lg:p-24 lg:border-r border-white/10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
              </span>
              <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                Во Бројки
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Резултати кои 
              </span>
              <br className="hidden md:block" />
              <span className="text-[#D42B2B] italic pr-2">зборуваат</span>{" "}
              <span className="text-white">сами за себе.</span>
            </h2>
          </div>
          
          {/* Empty Space */}
          <div className="hidden lg:block bg-[#111111]"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`group p-10 md:p-16 border-b lg:border-b-0 border-white/10 flex flex-col hover:bg-white/[0.02] transition-colors duration-500 ${index < 3 ? 'lg:border-r' : ''}`}
            >
              <h3 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-medium text-white tracking-tighter mb-8 group-hover:scale-105 group-hover:text-[#D42B2B] transition-all duration-500 origin-left leading-none">
                {stat.value}
              </h3>
              
              <div className="w-12 h-[2px] bg-[#D42B2B] mb-8 origin-left transition-all duration-500 group-hover:w-24"></div>
              
              <h4 className="text-white font-bold text-xl sm:text-2xl tracking-wide uppercase mb-4 leading-snug">
                {stat.label.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h4>
              
              <p className="text-gray-400 text-base leading-relaxed mt-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
