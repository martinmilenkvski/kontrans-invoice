"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    id: "01",
    question: "Како можам да побарам понуда за транспорт?",
    answer: "Можете да го користите нашиот онлајн формулар во делот \"Контакт\" или да не контактирате директно преку телефон или е-пошта. Нашите агенти ќе ви одговорат во најкраток можен рок со детален план и цени."
  },
  {
    id: "02",
    question: "Дали нудите осигурување на товарот?",
    answer: "Да, нудиме целосно карго осигурување \"All Risk\" за сите видови на транспорт. Ова гарантира максимална безбедност и покритие на вашиот товар низ целиот логистички синџир."
  },
  {
    id: "03",
    question: "Кое е времето на транзит за бродски транспорт?",
    answer: "Времето на транзит зависи од дестинацијата. За испораки во Европа обично трае 2-5 дена, додека за прекуокеански пратки може да трае од 20 до 40 дена, во зависност од рутата."
  },
  {
    id: "04",
    question: "Дали вршите царинско посредување?",
    answer: "Да, нашиот тим нуди комплетна поддршка за увозно и извозно царинење. Ние се грижиме за подготовка на сите потребни документи за да избегнете застој на границите."
  },
  {
    id: "05",
    question: "Може ли да превезувате опасни материи (ADR)?",
    answer: "Да, поседуваме сертифицирани возила и стручно обучен персонал за безбеден транспорт на ADR пратки, следејќи ги највисоките меѓународни безбедносни стандарди."
  }
];

function AccordionItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-row border-b border-black/10 opacity-0 translate-y-20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 lg:py-10 flex items-center justify-between text-left group transition-all duration-500"
      >
        <div className="flex items-start gap-8 lg:gap-16 w-full">
           <span className="font-(family-name:--font-jost) text-2xl lg:text-3xl font-bold text-brand-dark/10 shrink-0 mt-1 transition-colors duration-500 group-hover:text-brand-red/20">
             {faq.id}
           </span>
           <h3 className="text-xl lg:text-2xl font-(family-name:--font-jost) font-medium text-brand-dark leading-snug max-w-3xl transition-all duration-500 group-hover:translate-x-2">
             {faq.question}
           </h3>
        </div>
        
        <div className={`shrink-0 w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-black/10 flex items-center justify-center transition-all duration-700 ${isOpen ? 'bg-brand-red border-brand-red rotate-45' : 'group-hover:border-brand-dark group-hover:rotate-90'}`}>
          <Plus 
            className={`w-5 h-5 lg:w-7 lg:h-7 transition-colors duration-500 ${isOpen ? 'text-white' : 'text-brand-dark'}`} 
          />
        </div>
      </button>

      <div 
        className="grid transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-12 lg:pb-16 pl-16 lg:pl-28 max-w-3xl">
             <p className="font-(family-name:--font-jost) text-lg lg:text-xl text-brand-dark/60 leading-relaxed font-medium">
               {faq.answer}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
      }
    });

    tl.fromTo(".faq-reveal", 
      { y: 80, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.15, 
        ease: "power4.out" 
      }
    );

    // Rows stagger
    gsap.to(".faq-row", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top 60%",
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="faq"
      className="relative bg-white pt-32 pb-48 overflow-hidden border-t border-black/10"
    >
      {/* Structural Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-black" />
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-black" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        
        {/* EDITORIAL HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-32">
           
           {/* Left: Tag */}
           <div className="faq-reveal opacity-0 lg:col-span-3 flex flex-col items-start pt-2">
              <div className="flex items-center gap-4">
                 <div className="h-px w-8 bg-brand-red" />
                 <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-(family-name:--font-jost)">
                   006 // FAQ
                 </span>
              </div>
           </div>

           {/* Middle/Right: Massive Title */}
           <div className="faq-reveal opacity-0 lg:col-span-9 text-left lg:text-right">
              <h2 className="font-(family-name:--font-jost) text-[clamp(2rem,5vw,4rem)] text-brand-dark leading-[0.85] tracking-tighter font-medium">
                 Често поставувани <span className="text-brand-red italic">прашања.</span>
              </h2>
           </div>

        </div>

        {/* ACCORDION LIST */}
        <div className="faq-list border-t border-black/10">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="mt-20 faq-row opacity-0 flex flex-col items-end">
           <p className="font-(family-name:--font-jost) text-[11px] font-bold text-black/40 uppercase tracking-[0.3em] mb-4">
              Имате специфично барање?
           </p>
           <a 
              href="#contact" 
              className="group flex items-center gap-6"
           >
              <span className="font-(family-name:--font-jost) text-xl lg:text-2xl font-bold text-brand-dark tracking-tight transition-colors group-hover:text-brand-red">
                 Контактирајте го нашиот тим
              </span>
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500">
                 <Plus className="w-6 h-6 text-brand-dark group-hover:text-white transition-colors" />
              </div>
           </a>
        </div>

      </div>
    </section>
  );
}

