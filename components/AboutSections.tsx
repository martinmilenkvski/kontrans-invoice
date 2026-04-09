"use client";

import { motion } from "framer-motion";
import { FadeIn, RevealLine, StaggerGroup } from "./Animations";
import { ArrowUpRight, CheckCircle2, Globe, History, Layout, Zap } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative bg-[#080808] border-b border-white/10 min-h-[60vh] flex flex-col justify-end pb-12 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1574127675276-80516fc989be?auto=format&fit=crop&q=80&w=2000" 
          alt="Logistics network" 
          className="w-full h-full object-cover opacity-20 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      </div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} 
      />
      <div className="absolute top-[-20%] left-[30%] w-[60%] h-[70%] bg-[#D42B2B] rounded-full blur-[180px] opacity-[0.08]" />

      <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-24 relative z-10">
        <StaggerGroup className="flex flex-col gap-8">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D42B2B]"></span>
              </span>
              <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                Нашата приказна
              </span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-4">
              Логистика со <br />
              <span className="text-[#D42B2B] italic">лично значење.</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-medium leading-relaxed mt-2">
              Од 2003 година, Контранс гради мостови меѓу индустриите, обезбедувајќи повеќе од само транспорт — обезбедуваме ветување за сигурност и раст на вашиот бизнис.
            </p>
          </FadeIn>
        </StaggerGroup>
      </div>
    </section>
  );
}

export function AboutHistory() {
  return (
    <section className="bg-[#FAFAFA] text-[#111111]">
      <div className="max-w-[1600px] mx-auto border-x border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Large Year */}
          <div className="p-10 md:p-12 lg:p-24 border-b border-black/10 flex flex-col justify-center gap-8">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D42B2B]"></span>
                </span>
                <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                  Традиција и Иновација
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-black/5 select-none -ml-4">
                2003
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight leading-[1.1] -mt-16 md:-mt-24 relative z-10">
                Повеќе од две децении <br /> посветеност.
              </h3>
            </FadeIn>
          </div>

          {/* Right Column - Content */}
          <div className="p-10 md:p-12 lg:p-24 border-l border-b border-black/10 bg-white">
            <StaggerGroup className="flex flex-col gap-8 h-full justify-center">
              <FadeIn>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Контранс е основана со идејата за логистички услуги кои се прилагодени на специфичните потреби на секој клиент. Денес, раководени од високо стручен тим, планираме и спроведуваме комплексни задачи на транспорт, складирање и дистрибуција до најмалите детали.
                </p>
              </FadeIn>
              <FadeIn>
                <div className="flex gap-4 p-8 bg-[#FAFAFA] border border-black/5 rounded-2xl group">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:bg-[#D42B2B] group-hover:border-[#D42B2B] transition-all duration-500">
                    <History className="w-5 h-5 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-sm mb-1">Глобален лидер</h4>
                    <p className="text-gray-500 text-sm">Горди сме што ја поддржуваме индустријата и трговијата во глобалната размена на стоки повеќе од 20 години.</p>
                  </div>
                </div>
              </FadeIn>
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutValues() {
  const values = [
    {
      title: "Флексибилност",
      desc: "Доволно големи за квалитет, доволно мали за максимална агилност.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Транспарентност",
      desc: "Навремени информации за секој детал поврзан со пратките.",
      icon: <Layout className="w-6 h-6" />
    },
    {
      title: "Доверба",
      desc: "Достава од врата до врата со целосна одговорност.",
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      title: "Глобална Мрежа",
      desc: "Поврзување на локалниот бизнис со светските пазари.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  return (
    <section className="bg-[#FAFAFA] text-[#111111]">
      <div className="max-w-[1600px] mx-auto border-x border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={i} className={`p-10 md:p-12 lg:p-16 border-b border-black/10 flex flex-col gap-8 group hover:bg-white transition-colors duration-500 ${i !== values.length - 1 ? 'lg:border-r' : ''}`}>
              <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-[#D42B2B] group-hover:scale-110 transition-transform duration-500">
                {v.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold uppercase tracking-widest">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {v.desc}
                </p>
              </div>
              <div className="mt-auto pt-8">
                 <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#D42B2B] transition-colors duration-500">
                   <ArrowUpRight className="w-4 h-4 group-hover:text-white" />
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
  return (
    <section className="bg-white text-[#111111] overflow-hidden">
      <div className="max-w-[1600px] mx-auto border-x border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 md:p-12 lg:p-24 border-b border-black/10 order-2 lg:order-1">
            <StaggerGroup className="flex flex-col gap-8 h-full justify-center">
              <FadeIn>
                 <div className="flex items-center gap-3 mb-4">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D42B2B]"></span>
                    </span>
                    <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                       Our Approach
                    </span>
                 </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] tracking-tight leading-[1.05]">Вашиот најдобар избор за посветено справување.</h2>
              </FadeIn>
              <FadeIn>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Она што е најважно при барањето транспортни услуги вклучува обезбедување навремен простор, брз, евтин и сигурен транспорт. Контранс е флексибилна за вашите потреби. Сосема свесни за тоа колку е важно да се одржи вистинскиот проток на товар и ликвидност на пари.
                </p>
              </FadeIn>
              <FadeIn>
                <ul className="flex flex-col gap-4">
                  {['Навремен простор и планирање', 'Компетитивни цени', 'Брз и сигурен транспорт', 'Достава од врата до врата'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-bold uppercase tracking-wider text-xs">
                      <span className="text-[10px] text-[#D42B2B]">■</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </StaggerGroup>
          </div>
          <div className="relative min-h-[400px] lg:min-h-full border-b border-l border-black/10 order-1 lg:order-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000" 
              alt="Logistics container" 
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-[#D42B2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-md border border-black/10 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Capacity</p>
                  <p className="text-xl font-bold">Infinite Flexibility</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                  <Globe className="w-5 h-5" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
