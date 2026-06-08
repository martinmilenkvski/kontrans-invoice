import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, Globe, History, Layout, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-reveal", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: "power4.out" }
    );

    tl.fromTo(".hero-image",
      { scale: 1.05 },
      { scale: 1, duration: 2.5, ease: "expo.out" },
      0
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative bg-white pt-48 pb-32 overflow-hidden border-b border-black/10"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
          
          <div className="lg:col-span-8">
            <div className="hero-reveal opacity-0 flex items-center gap-4 mb-12">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                001 // НАШАТА ПРИКАЗНА
              </span>
            </div>
            
            <h1 className="hero-reveal opacity-0 font-sans text-[clamp(3rem,7vw,6rem)] text-brand-dark leading-[0.85] tracking-tighter font-medium">
              Логистика со <br />
              <span className="text-brand-red italic">лично значење.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 pb-4">
            <p className="hero-reveal opacity-0 font-sans text-xl text-brand-dark/50 leading-relaxed font-medium max-w-sm">
              Од 2003 година, Контранс гради мостови меѓу индустриите, обезбедувајќи повеќе од само транспорт - обезбедуваме ветување за сигурност.
            </p>
          </div>
        </div>

        <div className="mt-24 aspect-[21/9] relative overflow-hidden bg-brand-dark/5 border border-black/5">
          <Image 
            src="/about_hero_v3_1778073936286.png" 
            alt="Kontrans HQ" 
            fill 
            className="hero-image object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white font-mono text-[9px] tracking-widest uppercase font-bold opacity-60">
             Architectural Framework // V-1.0
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutHistory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".history-reveal",
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="bg-white py-32 border-b border-black/10"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="history-reveal opacity-0 flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                002 // ТРАДИЦИЈА
              </span>
            </div>
            
            <div className="history-reveal opacity-0 text-[10rem] lg:text-[15rem] font-black leading-none tracking-tighter text-brand-dark/[0.05] select-none -ml-4 lg:-ml-8 mt-12 lg:mt-24">
              2003
            </div>
            
            <h3 className="history-reveal opacity-0 font-sans text-4xl lg:text-6xl font-medium text-brand-dark tracking-tighter leading-[1.1] -mt-12 lg:-mt-20 relative z-10">
              Повеќе од две децении <br /> посветеност.
            </h3>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center gap-12 pt-12 lg:pt-0">
            <p className="history-reveal opacity-0 font-sans text-2xl text-brand-dark/60 leading-relaxed font-medium">
              Контранс е основана со идејата за логистички услуги кои се прилагодени на специфичните потреби на секој клиент. Денес, раководени од високо стручен тим, планираме и спроведуваме комплексни задачи до најмалите детали.
            </p>
            
            <div className="history-reveal opacity-0 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-[#FAFAFA] border border-black/5 group hover:border-brand-red/20 transition-colors duration-500">
                  <div className="w-12 h-12 border border-black/10 flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500">
                    <History className="w-5 h-5 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-xs mb-3 text-brand-red">Глобално влијание</h4>
                  <p className="text-brand-dark/50 text-sm leading-relaxed">Ја поддржуваме индустријата и трговијата во глобалната размена на стоки повеќе од 20 години.</p>
               </div>

               <div className="p-8 bg-[#FAFAFA] border border-black/5 group hover:border-brand-red/20 transition-colors duration-500">
                  <div className="w-12 h-12 border border-black/10 flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500">
                    <CheckCircle2 className="w-5 h-5 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-sans font-bold uppercase tracking-widest text-xs mb-3 text-brand-red">Стручен Тим</h4>
                  <p className="text-brand-dark/50 text-sm leading-relaxed">Нашите кадри се основата на секој успешен транспортен проект што го реализираме.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function AboutValues() {
  const containerRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      title: "Флексибилност",
      desc: "Доволно големи за квалитет, доволно мали за максимална агилност.",
      icon: Zap
    },
    {
      title: "Транспарентност",
      desc: "Навремени информации за секој детал поврзан со пратките.",
      icon: Layout
    },
    {
      title: "Доверба",
      desc: "Достава од врата до врата со целосна одговорност.",
      icon: CheckCircle2
    },
    {
      title: "Глобална Мрежа",
      desc: "Поврзување на локалниот бизнис со светските пазари.",
      icon: Globe
    }
  ];

  useGSAP(() => {
    gsap.fromTo(".value-card",
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-[#FAFAFA] py-32 border-b border-black/10"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {values.map((v, i) => (
            <div key={i} className="value-card opacity-0 bg-white p-12 lg:p-16 flex flex-col gap-10 group hover:bg-brand-red transition-all duration-700">
              <div className="w-14 h-14 border border-black/10 flex items-center justify-center text-brand-red group-hover:text-white group-hover:border-white/20 transition-all duration-500">
                <v.icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-sans text-xl font-bold uppercase tracking-widest group-hover:text-white transition-colors">{v.title}</h3>
                <p className="font-sans text-brand-dark/50 leading-relaxed text-sm group-hover:text-white/60 transition-colors">
                  {v.desc}
                </p>
              </div>
              <div className="mt-auto pt-8">
                 <div className="w-8 h-8 bg-black/5 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-brand-dark group-hover:text-brand-red" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutFlexibility() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".flex-reveal",
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="bg-white overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="flex-reveal opacity-0 flex items-center gap-4 mb-12">
              <div className="h-px w-8 bg-brand-red" />
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                003 // НАШИОТ ПРИСТАП
              </span>
            </div>
            
            <h2 className="flex-reveal opacity-0 font-sans text-4xl lg:text-7xl font-medium text-brand-dark tracking-tighter leading-[1.05] mb-12">
              Вашиот најдобар избор за <span className="text-brand-red">посветено справување.</span>
            </h2>
            
            <p className="flex-reveal opacity-0 font-sans text-xl text-brand-dark/60 leading-relaxed font-medium mb-12">
              Она што е најважно при барањето транспортни услуги вклучува обезбедување навремен простор, брз, евтин и сигурен транспорт. Контранс е флексибилна за вашите потреби.
            </p>

            <ul className="flex-reveal opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Навремен простор', 'Компетитивни цени', 'Брз транспорт', 'Достава од врата'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 font-sans font-bold uppercase tracking-widest text-[10px] text-brand-dark/40 border-b border-black/5 pb-4">
                  <span className="w-2 h-2 bg-brand-red rotate-45" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-square overflow-hidden group border border-black/5">
              <Image 
                src="/about_flexibility_v2_1778073981366.png" 
                alt="Logistics precision" 
                fill
                className="object-cover"
              />
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-white flex items-center justify-center border-l border-b border-black/10">
                 <Globe className="w-8 h-8 text-brand-red" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

