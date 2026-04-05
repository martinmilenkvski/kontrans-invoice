"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Ship, Plane, Truck, Route, Loader2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // ── FORM LOGIC ──
  const [transportMode, setTransportMode] = useState<string | null>(null);
  const [needsInsurance, setNeedsInsurance] = useState<boolean>(false);
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
  const [serverError, setServerError] = useState<string>('');

  const transportOptions = [
    { id: 'sea', icon: Ship, label: 'Бродски Транспорт' },
    { id: 'air', icon: Plane, label: 'Авионски Транспорт' },
    { id: 'road', icon: Truck, label: 'Камионски Транспорт' },
    { id: 'multimodal', icon: Route, label: 'Мултимодален' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, placeholder } = e.target;
    const field = id || (placeholder?.includes("тежина") ? "weight" : placeholder?.includes("Волумен") ? "volume" : "commodity");
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
        body: JSON.stringify({ transportMode, needsInsurance, ...formData }),
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

  // ── ENTRANCE STAGGER ANIMATIONS (LIGHT THEME) ──
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      const heroEase = "power4.out";
      
      tl.fromTo(".light-contact-bg", { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0);
      tl.fromTo(".stagger-line", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0.2);
      
      // Main Reveal Stagger
      tl.fromTo([".stagger-title span", ".stagger-desc", ".contact-feature", ".form-field-group", ".transport-btn", ".submit-btn-wrap"],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: heroEase, stagger: 0.1 },
        0.5
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="contact" className="relative bg-[#FAFAFA] overflow-hidden border-t border-black/5 min-h-screen w-full flex flex-col py-32 px-4 lg:px-4">
      
      {/* ── CINEMATIC LIGHT GRADIENT ── */}
      <div className="light-contact-bg absolute inset-0 z-0 opacity-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#D42B2B]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-black/[0.02] blur-[100px] rounded-full" />
      </div>

      <div className="stagger-line absolute top-[15%] left-0 w-full h-[0.5px] bg-black/10 origin-left" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 lg:gap-32">
        
        {/* LEFT: HEADING */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span className="stagger-desc font-mono text-[0.65rem] text-[#D42B2B] uppercase tracking-[0.625em] font-black italic opacity-0">
               (03) // TERMINAL HUB
            </span>
            <h2 className="stagger-title font-sans text-[clamp(2.5rem,6vw,5.5rem)] text-[#111111] leading-[0.9] tracking-tighter uppercase font-black">
              <span className="block opacity-0">МРЕЖА</span> 
              <span className="block opacity-0">КОЈА</span> 
              <span className="italic font-[family-name:var(--font-caveat)] text-[#D42B2B] lowercase font-normal px-2 block opacity-0">
                зборува.
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-black/10 pt-12">
            {[
              { label: "БЕЗБЕДНОСТ", desc: "Гарантирана сигурност на секоја пратка во реално време." },
              { label: "ТРАНСПАРЕНТНОСТ", desc: "Реални цени без скриени маржи или трошоци." },
              { label: "24/7 ПОДДРШКА", desc: "Вашиот агент е достапен на еден клик." },
              { label: "МРЕЖА", desc: "Пристап до над 50 глобални дестинации." }
            ].map((item, i) => (
              <div key={i} className="contact-feature flex flex-col gap-3 opacity-0 group">
                 <span className="text-[0.6rem] font-black text-[#D42B2B] tracking-widest">{item.label}</span>
                 <p className="text-black/50 text-[0.7rem] font-bold leading-relaxed uppercase group-hover:text-black transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="w-full">
           <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-black/10">
                 {transportOptions.map((opt) => {
                   const Icon = opt.icon;
                   const isSelected = transportMode === opt.id;
                   return (
                     <button
                       key={opt.id}
                       type="button"
                       onClick={() => setTransportMode(opt.id!)}
                       className={`transport-btn flex flex-col items-center justify-center gap-4 py-8 border-r border-black/10 last:border-r-0 transition-all opacity-0 ${
                         isSelected 
                           ? "bg-[#111111] text-white" 
                           : "bg-white text-black/40 hover:bg-black/[0.02] hover:text-black"
                       }`}
                     >
                        <Icon className={`w-5 h-5 ${isSelected ? "text-[#D42B2B]" : "text-black/20 group-hover:text-[#D42B2B] transition-colors"}`} />
                        <span className="font-black text-[9px] uppercase tracking-tighter">{opt.label.split(' ')[0]}</span>
                     </button>
                   );
                 })}
              </div>

              <div className="flex flex-col gap-10">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="form-field-group flex flex-col gap-3 opacity-0">
                       <label className="text-[0.55rem] font-bold text-black/30 tracking-widest uppercase">ОД (Origin)</label>
                       <input 
                         type="text" 
                         value={formData.origin}
                         onChange={handleInputChange}
                         placeholder="ГРАД / ПРИСТАНИШТЕ"
                         className="w-full bg-transparent border-b border-black/10 px-0 py-3 text-[#111111] text-lg font-bold placeholder-black/10 focus:outline-none focus:border-[#D42B2B] transition-all"
                       />
                       {errors.origin && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.origin}</span>}
                    </div>
                    <div className="form-field-group flex flex-col gap-3 opacity-0">
                       <label className="text-[0.55rem] font-bold text-black/30 tracking-widest uppercase">ДО (Destination)</label>
                       <input 
                         type="text" 
                         value={formData.destination}
                         onChange={handleInputChange}
                         placeholder="КРАЈНА ДЕСТИНАЦИЈА"
                         className="w-full bg-transparent border-b border-black/10 px-0 py-3 text-[#111111] text-lg font-bold placeholder-black/10 focus:outline-none focus:border-[#D42B2B] transition-all"
                       />
                       {errors.destination && <span className="text-[#D42B2B] text-[0.6rem] font-bold uppercase">{errors.destination}</span>}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="form-field-group flex flex-col gap-3 opacity-0">
                       <label className="text-[0.55rem] font-bold text-black/30 tracking-widest uppercase">Email Контакт</label>
                       <input 
                         type="email" 
                         id="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         placeholder="YOUR@EMAIL.COM"
                         className="w-full bg-transparent border-b border-black/10 px-0 py-3 text-[#111111] text-lg font-bold placeholder-black/10 focus:outline-none focus:border-[#D42B2B] transition-all"
                       />
                    </div>
                    <div className="form-field-group flex flex-col gap-3 opacity-0">
                       <label className="text-[0.55rem] font-bold text-black/30 tracking-widest uppercase">Телефон</label>
                       <input 
                         type="tel" 
                         id="phone"
                         value={formData.phone}
                         onChange={handleInputChange}
                         placeholder="+389 __ ___ ___"
                         className="w-full bg-transparent border-b border-black/10 px-0 py-3 text-[#111111] text-lg font-bold placeholder-black/10 focus:outline-none focus:border-[#D42B2B] transition-all"
                       />
                    </div>
                 </div>
              </div>

              <div className="submit-btn-wrap pt-6 opacity-0">
                 <button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="inline-flex items-center gap-8 text-[#111111] text-sm uppercase tracking-widest hover:gap-12 transition-all duration-500 group disabled:opacity-50"
                 >
                    <span className="font-black">
                      {isSubmitting ? "СЕ ПРОЦЕСИРА..." : "Побарај понуда"}
                    </span>
                    <div className="w-16 h-16 bg-[#111111] flex items-center justify-center relative overflow-hidden group-hover:bg-[#D42B2B] transition-all duration-500">
                       {isSubmitting ? (
                         <Loader2 className="w-6 h-6 animate-spin text-white" />
                       ) : (
                         <Image src="/upper-right-arrow.png" alt="Arrow" width={24} height={24} className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 invert z-10" />
                       )}
                    </div>
                 </button>
                 {submitStatus === 'success' && (
                    <p className="mt-8 text-[#D42B2B] font-mono text-[0.65rem] font-black tracking-widest uppercase">
                      ✓ Барањето е успешно прифатено.
                    </p>
                 )}
              </div>
           </form>
        </div>

      </div>
    </section>
  );
}
