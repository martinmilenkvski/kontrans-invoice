import { FadeIn, StaggerGroup, RevealLine } from "./Animations";

export function Process() {
  const steps = [
    {
      id: "01/",
      title: "Контакт",
      description: "Испратете ни барање со вашите специфични потреби за логистика.",
    },
    {
      id: "02/",
      title: "Понуда",
      description: "Добивате оптимизирана цена и рута за транспортот на вашиот товар.",
    },
    {
      id: "03/",
      title: "Преземање",
      description: "Го преземаме товарот од вашата локација во точно договореното време.",
    },
    {
      id: "04/",
      title: "Испорака",
      description: "Сигурна и навремена испорака следена во секој момент од патот.",
    },
  ];

  return (
    <section className="bg-[#FAFAFA] border-t border-black/10 relative overflow-hidden font-sans">
      <div className="max-w-[1600px] mx-auto relative z-10 w-full flex flex-col">
        
        {/* Centered Top Header Row */}
        <div className="border-b border-black/10 bg-[#FAFAFA] relative">
          <RevealLine horizontal={true} className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/10" />
          <StaggerGroup className="p-10 md:p-16 lg:p-24 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
                </span>
                <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  ПРОЦЕС
                </span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-[#111111] leading-[1.05] tracking-tight mb-8">
                Едноставно. Брзо.
                <br className="hidden md:block" />
                <span className="text-[#D42B2B] italic pr-2 font-[family-name:var(--font-caveat)]">
                  Без изненадувања.
                </span>
              </h2>
            </FadeIn>
          </StaggerGroup>
        </div>  

        {/* Steps Area with full-width dashed line connection */}
        <div className="relative border-b border-black/10 bg-white">
          
          {/* Connecting Dashed Line */}
          <RevealLine horizontal={true} className="absolute top-[88px] md:top-[128px] lg:top-[144px] left-0 right-0 h-[1px] border-t border-dashed border-black/10 hidden md:block z-0" />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10" staggerDelay={0.15}>
            {steps.map((step, index) => (
              <FadeIn 
                key={index}
                className={`group p-10 md:p-16 lg:p-24 border-b lg:border-b-0 border-black/10 flex flex-col hover:bg-black/[0.01] transition-colors duration-500 bg-transparent ${index < 3 ? 'lg:border-r' : ''} relative`}
              >
                {index < 3 && <RevealLine horizontal={false} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[1px] bg-black/10" />}
                
                {/* Number Indicator overlapping the dashed line visually */}
                <h3 className="text-4xl md:text-5xl text-gray-300 tracking-widest mb-12 group-hover:text-[#111111] transition-colors duration-500 bg-white inline-block w-max pr-6 -mt-3 md:-mt-6 relative z-10 font-medium">
                  {step.id}
                </h3>
                  
                {/* Step Content */}
                <h4 className="text-[#111111] font-bold text-2xl sm:text-3xl tracking-wide uppercase mb-6 leading-snug group-hover:text-[#D42B2B] transition-colors duration-300">
                  {step.title}
                </h4>
                
                <p className="text-gray-600 font-medium text-base leading-relaxed">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </StaggerGroup>
        </div>

      </div>
    </section>
  );
}
