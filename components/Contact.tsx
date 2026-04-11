"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Ship, Plane, Truck, Route, Loader2, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    { id: 'sea', icon: Ship, label: 'MARINE' },
    { id: 'air', icon: Plane, label: 'AIR' },
    { id: 'road', icon: Truck, label: 'LAND' },
    { id: 'multimodal', icon: Route, label: 'MULTI' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => { const next = { ...prev }; delete next[id]; return next; });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!transportMode) newErrors.transportMode = "REQUIRED";
    if (!formData.origin.trim()) newErrors.origin = "REQUIRED";
    if (!formData.destination.trim()) newErrors.destination = "REQUIRED";
    if (!formData.email.trim()) newErrors.email = "REQUIRED";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "INVALID";
    if (!formData.phone.trim()) newErrors.phone = "REQUIRED";
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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    const ease = "power4.out";

    tl.fromTo(".contact-header", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease },
      0
    );

    tl.fromTo(".contact-section",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease },
      0.3
    );

    tl.fromTo(".contact-submit",
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease },
      0.8
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative bg-[#F5F5F0] py-40 overflow-hidden border-t border-[#111111]/10"
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-24 lg:gap-32 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="contact-header flex flex-col gap-8 opacity-0">
          <span className="font-mono text-[0.65rem] text-[#D42B2B] tracking-[0.6em] uppercase font-bold">
            INQUIRY_MODULE // V9.1
          </span>
          <h2 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] text-[#111111] leading-[0.95] tracking-tighter font-black uppercase">
            Започнете ја <br />
            <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] font-normal text-[0.9em] tracking-normal lowercase">
              вашата пратка.
            </span>
          </h2>
        </div>

        {/* ── THE FORM TERMINAL ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-20 p-8 lg:p-12 bg-white/40 border border-[#111111]/05 backdrop-blur-sm rounded-sm">
          
          {/* 1. SELECTION */}
          <div className="contact-section flex flex-col gap-10 opacity-0 border-t border-[#111111]/15 pt-10">
            <div className="flex justify-between items-center">
               <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">01 // ТИП НА ТРАНСПОРТ</span>
               {errors.transportMode && <span className="font-mono text-[0.6rem] text-[#D42B2B] font-bold uppercase tracking-widest">{errors.transportMode}</span>}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {transportOptions.map((opt) => {
                 const isSelected = transportMode === opt.id;
                 return (
                   <button
                     key={opt.id}
                     type="button"
                     onClick={() => setTransportMode(opt.id)}
                     className={`group relative h-20 border flex flex-col items-center justify-center gap-2 transition-all duration-400 rounded-sm ${
                       isSelected ? "bg-[#111111] border-[#111111]" : "bg-white/50 border-[#111111]/15 hover:border-[#111111]/40"
                     }`}
                   >
                     <opt.icon className={`w-4 h-4 transition-colors ${isSelected ? "text-[#D42B2B]" : "text-[#111111]/60 group-hover:text-[#111111]"}`} />
                     <span className={`font-mono text-[0.55rem] tracking-widest font-black uppercase ${isSelected ? "text-white" : "text-[#111111]/40 group-hover:text-[#111111]"}`}>
                       {opt.label}
                     </span>
                     {isSelected && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D42B2B]" />}
                   </button>
                 );
               })}
            </div>
          </div>

          {/* 2. THE ROUTE */}
          <div className="contact-section grid grid-cols-1 md:grid-cols-2 gap-12 opacity-0 border-t border-[#111111]/15 pt-10">
             <div className="flex flex-col gap-10 relative">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">02 // ПОЧЕТНА ТОЧКА</span>
                  {errors.origin && <span className="font-mono text-[0.6rem] text-[#D42B2B] font-bold uppercase tracking-widest">{errors.origin}</span>}
                </div>
                <input
                  type="text"
                  id="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="ГРАД / ПРИСТАНИШТЕ / HUB"
                  className="w-full bg-transparent border-b border-[#111111]/25 pb-6 text-[#111111] text-2xl font-black placeholder-[#111111]/20 focus:outline-none focus:border-[#D42B2B] transition-all tracking-tighter"
                />
                <div className="hidden md:block absolute right-0 bottom-6 w-[1px] h-12 bg-[#111111]/10 translate-x-6" />
             </div>

             <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">03 // ДЕСТИНАЦИЈА</span>
                  {errors.destination && <span className="font-mono text-[0.6rem] text-[#D42B2B] font-bold uppercase tracking-widest">{errors.destination}</span>}
                </div>
                <input
                  type="text"
                  id="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="КРАЈНА ТОЧКА НА ИСПОРАКА"
                  className="w-full bg-transparent border-b border-[#111111]/25 pb-6 text-[#111111] text-2xl font-black placeholder-[#111111]/20 focus:outline-none focus:border-[#D42B2B] transition-all tracking-tighter"
                />
             </div>
          </div>

          {/* 3. SPECIFICATIONS */}
          <div className="contact-section grid grid-cols-1 md:grid-cols-3 gap-12 opacity-0 border-t border-[#111111]/15 pt-10">
             {/* Weight */}
             <div className="flex flex-col gap-8">
                <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">04 // ТЕЖИНА (kg)</span>
                <input
                  type="text"
                  id="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-transparent border-b border-[#111111]/20 pb-4 text-[#111111] text-lg font-black placeholder-[#111111]/20 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
             </div>
             {/* Volume */}
             <div className="flex flex-col gap-8">
                <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">05 // ВОЛУМЕН (m3)</span>
                <input
                  type="text"
                  id="volume"
                  value={formData.volume}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-transparent border-b border-[#111111]/20 pb-4 text-[#111111] text-lg font-black placeholder-[#111111]/20 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
             </div>
             {/* Commodity */}
             <div className="flex flex-col gap-8">
                <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">06 // ВИД НА СТОКА</span>
                <input
                  type="text"
                  id="commodity"
                  value={formData.commodity}
                  onChange={handleInputChange}
                  placeholder="ОПИС"
                  className="w-full bg-transparent border-b border-[#111111]/20 pb-4 text-[#111111] text-lg font-black placeholder-[#111111]/20 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
             </div>
          </div>

          {/* 4. IDENTIFICATION */}
          <div className="contact-section grid grid-cols-1 md:grid-cols-2 gap-12 opacity-0 border-t border-[#111111]/15 pt-10">
             <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">07 // Е-ПОШТА</span>
                  {errors.email && <span className="font-mono text-[0.6rem] text-[#D42B2B] font-bold uppercase tracking-widest">{errors.email}</span>}
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@mail.com"
                  className="w-full bg-transparent border-b border-[#111111]/20 pb-4 text-[#111111] text-lg font-black placeholder-[#111111]/30 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
             </div>
             <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.4em] font-black uppercase">08 // ТЕЛЕФОН</span>
                  {errors.phone && <span className="font-mono text-[0.6rem] text-[#D42B2B] font-bold uppercase tracking-widest">{errors.phone}</span>}
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+389"
                  className="w-full bg-transparent border-b border-[#111111]/20 pb-4 text-[#111111] text-lg font-black placeholder-[#111111]/30 focus:outline-none focus:border-[#D42B2B] transition-all"
                />
             </div>
          </div>

          {/* SUBMIT */}
          <div className="contact-submit pt-16 flex flex-col items-center gap-12 opacity-0">
             <button
               type="submit"
               disabled={isSubmitting}
               className="group relative px-14 py-6 bg-[#D42B2B] text-white overflow-hidden transition-all duration-500 hover:px-16 active:scale-95 disabled:opacity-50 rounded-sm shadow-xl shadow-[#D42B2B]/20"
             >
                <div className="relative z-10 flex items-center gap-6">
                   <span className="font-sans text-xl lg:text-2xl font-black uppercase tracking-tighter">
                      {isSubmitting ? "ПРОЦЕСИРАЊЕ..." : "ИСПРАТИ БАРАЊЕ"}
                   </span>
                   {isSubmitting ? (
                     <Loader2 className="w-6 h-6 animate-spin" />
                   ) : (
                     <ArrowUpRight className="w-6 h-6 transition-transform group-hover:rotate-45" />
                   )}
                </div>
                <div className="absolute inset-0 bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </button>

             {submitStatus === 'success' && (
               <div className="text-center flex flex-col gap-2">
                 <span className="text-[#111111] text-2xl font-black uppercase tracking-tight">УСПЕШНО ИСПРАТЕНО.</span>
                 <p className="font-mono text-[0.6rem] text-[#111111]/40 tracking-[0.3em] uppercase font-bold italic">
                   Нашиот тим ќе ве контактира набрзо.
                 </p>
               </div>
             )}
          </div>

        </form>

        {/* FOOTER META */}
        <div className="contact-section flex justify-between items-center opacity-0 pt-20 border-t border-[#111111]/15">
          <span className="font-mono text-[0.55rem] tracking-[0.5em] uppercase text-[#111111]/30 font-black">
            TERMINAL_SECURED // 256_BIT
          </span>
          <span className="font-mono text-[0.55rem] tracking-[0.5em] uppercase text-[#111111]/30 font-black text-right">
            КОНТРАНС // EST_2024
          </span>
        </div>

      </div>

      {/* Decorative background grid (subtle) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]">
         <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#111111,#111111_1px,transparent_1px,transparent_100px)]" />
         <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#111111,#111111_1px,transparent_1px,transparent_100px)]" />
      </div>
    </section>
  );
}
