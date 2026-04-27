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
    id: "FAQ_01",
    question: "Како можам да побарам понуда за транспорт?",
    answer: "Можете да го користите нашиот онлајн формулар во делот \"Контакт\" или да не контактирате директно преку телефон или е-пошта. Нашите агенти ќе ви одговорат во најкраток можен рок со детален план и цени."
  },
  {
    id: "FAQ_02",
    question: "Дали нудите осигурување на товарот за време на транспортот?",
    answer: "Да, нудиме целосно карго осигурување \"All Risk\" за сите видови на транспорт. Ова гарантира максимална безбедност и покритие на вашиот товар низ целиот логистички синџир."
  },
  {
    id: "FAQ_03",
    question: "Кое е просечното време на транзит за бродски транспорт?",
    answer: "Времето на транзит зависи од дестинацијата. За испораки во Европа обично трае 2-5 дена, додека за прекуокеански пратки може да трае од 20 до 40 дена, во зависност од рутата и пристаништето."
  },
  {
    id: "FAQ_04",
    question: "Дали вршите царинско посредување?",
    answer: "Да, нашиот тим нуди комплетна поддршка за увозно и извозно царинење. Ние се грижиме за подготовка на сите потребни документи за да избегнете застој на границите."
  },
  {
    id: "FAQ_05",
    question: "Може ли да превезувате опасни материи (ADR)?",
    answer: "Да, поседуваме сертифицирани возила и стручно обучен персонал за безбеден транспорт на ADR пратки, следејќи ги највисоките меѓународни безбедносни стандарди."
  }
];

function AccordionItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-row border-b border-black/10 opacity-0 translate-y-10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 lg:py-10 flex items-center justify-between text-left group transition-colors hover:bg-black/[0.02]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12 w-full pr-8">
           <span className="font-mono text-xs lg:text-sm text-black/40 tracking-[0.2em] uppercase font-bold shrink-0">
             {faq.id}
           </span>
           <h3 className="text-2xl lg:text-4xl font-semibold text-[#111111] tracking-tight leading-tight group-hover:text-[#D42B2B] transition-colors duration-300">
             {faq.question}
           </h3>
        </div>
        
        <div className="shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-black/10 group-hover:border-[#D42B2B] transition-colors duration-300">
          <Plus 
            className={`w-5 h-5 lg:w-6 lg:h-6 text-[#111] group-hover:text-[#D42B2B] transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-45' : ''}`} 
          />
        </div>
      </button>

      {/* Modern CSS Grid Accordion Trick */}
      <div 
        className="grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-10 lg:pb-12 pl-0 lg:pl-[7.5rem] pr-8 lg:pr-32">
             <p className="text-[#111111]/70 text-lg lg:text-xl leading-relaxed">
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
    // Header animation
    gsap.fromTo(".faq-header-meta", 
      { x: -20, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 1.5, ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );

    gsap.fromTo(".faq-title", 
      { y: 20, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );

    // Rows stagger animation
    gsap.to(".faq-row", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top 85%",
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="faq"
      className="relative bg-[#F9F9F9] pt-24 pb-32 overflow-hidden border-t border-black/5"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        
        {/* HEADER */}
        <div className="mb-16 lg:mb-24 flex flex-col gap-4 max-w-4xl">
          <div className="faq-header-meta flex items-center gap-4 opacity-0">
             <div className="w-8 h-[1px] bg-[#D42B2B]" />
             <span className="font-mono text-[0.6rem] text-[#D42B2B] tracking-[0.5em] uppercase font-bold text-nowrap">
               FAQ // ИНФОРМАЦИИ
             </span>
          </div>

          <h2 className="faq-title font-sans text-[3rem] lg:text-[5rem] text-[#111111] leading-[0.9] tracking-tighter font-medium opacity-0">
            Често поставувани <br />
            <span className="text-black/30">прашања.</span>
          </h2>
        </div>

        {/* ACCORDION LIST */}
        <div className="faq-list border-t border-black/10">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 faq-row opacity-0 translate-y-10">
           <p className="font-mono text-xs text-black/40 tracking-[0.2em] uppercase font-bold mb-4">
              Имате специфично барање?
           </p>
           <a 
              href="#contact" 
              className="inline-flex items-center gap-3 text-sm lg:text-base font-bold text-[#D42B2B] uppercase tracking-widest hover:text-[#111] transition-colors duration-300 group"
           >
              <span>Контактирајте нè</span>
              <div className="w-8 h-8 rounded-full border border-[#D42B2B] group-hover:border-[#111] flex items-center justify-center transition-all duration-300">
                 <Plus className="w-4 h-4" />
              </div>
           </a>
        </div>

      </div>
    </section>
  );
}
