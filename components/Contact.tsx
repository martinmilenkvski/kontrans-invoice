"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Ship, Plane, Truck, Route, Loader2, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // ── FORM LOGIC ──
  const [transportMode, setTransportMode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    volume: "",
    commodity: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const transportOptions = [
    { id: 'sea', icon: Ship, label: 'SEAFREIGHT' },
    { id: 'air', icon: Plane, label: 'AIRFREIGHT' },
    { id: 'road', icon: Truck, label: 'ROAD_CARRIAGE' },
    { id: 'multimodal', icon: Route, label: 'MULTIMODAL' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, placeholder } = e.target;
    const field = id || (placeholder?.includes("ОД") ? "origin" : placeholder?.includes("ДО") ? "destination" : placeholder?.includes("EMAIL") ? "email" : "phone");
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!transportMode) newErrors.transportMode = "Изберете тип на транспорт";
    if (!formData.origin.trim()) newErrors.origin = "Задолжително";
    if (!formData.destination.trim()) newErrors.destination = "Задолжително";
    if (!formData.email.trim()) newErrors.email = "Задолжително";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Невалидна адреса";
    if (!formData.phone.trim()) newErrors.phone = "Задолжително";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transportMode, ...formData }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ origin: '', destination: '', weight: '', volume: '', commodity: '', email: '', phone: '' });
        setTransportMode(null);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(".contact-minimal-reveal", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );

      tl.fromTo(".contact-minimal-line", 
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power3.inOut" },
        0.5
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="contact" className="relative bg-[#FAFAFA] pt-48 pb-32 overflow-hidden border-t border-black/5 min-h-screen">
      
      {/* Background Subtle Label */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20 pointer-events-none select-none">
         <div className="w-[100px] h-[1px] bg-black" />
         <span className="font-mono text-[0.6rem] tracking-[0.8em] uppercase font-bold text-black">ТЕРМИНАЛ ЗА ПРАШАЊА // ОТВОРЕНО</span>
         <div className="w-[100px] h-[1px] bg-black" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        
        {/* Editorial Headline */}
        <div className="flex flex-col gap-10 mb-32">
          <div className="flex flex-col gap-4">
             <span className="contact-minimal-reveal font-mono text-[0.65rem] text-[#D42B2B] uppercase tracking-[0.625em] font-black italic opacity-0">
                БАРАЊЕ ЗА КОНТАКТ // 08
             </span>
             <h2 className="contact-minimal-reveal font-sans text-[clamp(2.5rem,8vw,6.5rem)] text-[#111111] leading-[0.8] tracking-tighter uppercase font-black opacity-0">
               Побарај <br /> 
               <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] lowercase font-normal px-2">Понуда.</span>
             </h2>
          </div>
          <div className="contact-minimal-line w-[80px] h-1 bg-[#D42B2B] origin-left" />
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-24">
          
          {/* 1. Избор на тип на транспорт */}
          <div className="contact-minimal-reveal flex flex-col gap-8 opacity-0">
            <span className="font-mono text-[0.55rem] font-bold text-black/60 tracking-widest uppercase">01 // ИЗБЕРЕТЕ_ТИП_НА_ТРАНСПОРТ</span>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {transportOptions.map((opt) => {
                const isSelected = transportMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTransportMode(opt.id)}
                    className={`group flex items-center gap-4 transition-all ${isSelected ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                  >
                    <div className={`w-10 h-10 border transition-all ${isSelected ? "bg-[#111111] border-black" : "border-black/20 group-hover:border-black"}`}>
                       <opt.icon className={`w-4 h-4 ${isSelected ? "text-[#D42B2B]" : "text-black"}`} />
                    </div>
                    <span className="font-sans text-[11px] font-black tracking-widest uppercase text-black">{opt.label === 'SEAFREIGHT' ? 'БРОДСКИ' : opt.label === 'AIRFREIGHT' ? 'АВИОНСКИ' : opt.label === 'ROAD_CARRIAGE' ? 'КАМИОНСКИ' : 'МУЛТИМОДАЛЕН'}</span>
                  </button>
                );
              })}
            </div>
            {errors.transportMode && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.transportMode}</span>}
          </div>

          {/* 2. Routing Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
             
             {/* Origin */}
             <div className="contact-minimal-reveal flex flex-col gap-3 opacity-0 group">
                <span className="font-mono text-[0.55rem] font-bold text-black/60 tracking-widest uppercase mb-1">02 // ОД_ПОЧЕТНА_ТОЧКА</span>
                <input 
                  type="text" 
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="ГРАД / ПРИСТАНИШТЕ / HUB"
                  className="w-full bg-transparent border-b-2 border-black/10 pb-4 text-[#111111] text-2xl font-black placeholder-black/30 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
                {errors.origin && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.origin}</span>}
             </div>

             {/* Destination */}
             <div className="contact-minimal-reveal flex flex-col gap-3 opacity-0 group">
                <span className="font-mono text-[0.55rem] font-bold text-black/60 tracking-widest uppercase mb-1">03 // ДО_ДЕСТИНАЦИЈА</span>
                <input 
                  type="text" 
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="КРАЈНА_ТОЧКА_НА_ИСПОРУКА"
                  className="w-full bg-transparent border-b-2 border-black/10 pb-4 text-[#111111] text-2xl font-black placeholder-black/30 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
                {errors.destination && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.destination}</span>}
             </div>

             {/* Email */}
             <div className="contact-minimal-reveal flex flex-col gap-3 opacity-0 group">
                <span className="font-mono text-[0.55rem] font-bold text-black/60 tracking-widest uppercase mb-1">04 // Е-ПОШТА_КОМУНИКАЦИЈА</span>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ВАНАТА@Е-ПОШТА.COM"
                  className="w-full bg-transparent border-b-2 border-black/10 pb-4 text-[#111111] text-2xl font-black placeholder-black/30 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
                {errors.email && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.email}</span>}
             </div>

             {/* Phone */}
             <div className="contact-minimal-reveal flex flex-col gap-3 opacity-0 group">
                <span className="font-mono text-[0.55rem] font-bold text-black/60 tracking-widest uppercase mb-1">05 // ТЕЛЕФОНСКИ_КОНТАКТ</span>
                <input 
                  type="tel" 
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+389 __ ___ ___"
                  className="w-full bg-transparent border-b-2 border-black/10 pb-4 text-[#111111] text-2xl font-black placeholder-black/30 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
                {errors.phone && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.phone}</span>}
             </div>

          </div>

          {/* Submit Button */}
          <div className="contact-minimal-reveal pt-10 opacity-0">
             <button 
               type="submit" 
               disabled={isSubmitting}
               className="group flex flex-col items-start gap-4 disabled:opacity-50"
             >
                <div className="flex items-center gap-6">
                   <span className="font-sans text-xl lg:text-3xl font-black text-[#111111] tracking-tighter uppercase group-hover:text-[#D42B2B] transition-colors">
                      {isSubmitting ? "СЕ ПРОЦЕСИРА..." : "ИСПРАТИ БАРАЊЕ"}
                   </span>
                   <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#111111] flex items-center justify-center transition-all duration-500 group-hover:bg-[#D42B2B] group-hover:rotate-45">
                      {isSubmitting ? (
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                      ) : (
                        <ArrowUpRight className="text-white w-6 h-6 lg:w-8 lg:h-8" />
                      )}
                   </div>
                </div>
                <span className="font-mono text-[0.6rem] font-bold text-black/50 tracking-[0.5em] uppercase text-right">ИНИЦИРАЈ_ТЕРМИНАЛНИ_ПРОТОКОЛИ_V4</span>
             </button>

             {submitStatus === 'success' && (
                <div className="mt-12 p-8 bg-black text-white flex flex-col gap-2">
                   <span className="font-sans text-2xl font-black uppercase">Успешно!</span>
                   <p className="font-mono text-[0.6rem] text-white/50 tracking-widest uppercase italic">Вашето барање е во процесирање. Нашиот тим ќе ве контактира набрзо.</p>
                </div>
             )}
          </div>

        </form>

      </div>

      {/* Side Decorative Numbers */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-[0.03] select-none pointer-events-none">
         <span className="font-sans text-9xl font-black">08</span>
      </div>

    </section>
  );
}
