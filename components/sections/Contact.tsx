"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Ship, Plane, Truck, Route, ArrowUpRight, Plus } from "lucide-react";

if (typeof window !== "undefined") {
   gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
   const containerRef = useRef<HTMLDivElement>(null);
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
      { id: 'sea', icon: Ship, label: 'ПОМОРСКИ' },
      { id: 'air', icon: Plane, label: 'ВОЗДУШЕН' },
      { id: 'road', icon: Truck, label: 'КОПНЕН' },
      { id: 'multimodal', icon: Route, label: 'МУЛТИ' },
   ];

   const validate = (): boolean => {
      const newErrors: Record<string, string> = {};
      if (!transportMode) newErrors.transportMode = "ЗАДОЛЖИТЕЛНО";
      if (!formData.origin.trim()) newErrors.origin = "ЗАДОЛЖИТЕЛНО";
      if (!formData.destination.trim()) newErrors.destination = "ЗАДОЛЖИТЕЛНО";
      if (!formData.email.trim()) newErrors.email = "ЗАДОЛЖИТЕЛНО";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "НЕВАЛИДНО";
      if (!formData.phone.trim()) newErrors.phone = "ЗАДОЛЖИТЕЛНО";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
      if (submitStatus === 'success') setSubmitStatus('idle');
      if (errors[id]) {
         setErrors(prev => {
            const newErrs = { ...prev };
            delete newErrs[id];
            return newErrs;
         });
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
         const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               transportMode,
               ...formData,
            }),
         });

         const data = await response.json();

         if (response.ok && data.success) {
            setSubmitStatus('success');
            // Reset form states
            setFormData({
               origin: "",
               destination: "",
               weight: "",
               volume: "",
               commodity: "",
               email: "",
               phone: "",
            });
            setTransportMode(null);
         } else {
            setSubmitStatus('error');
            setErrors(prev => ({
               ...prev,
               global: data.errors ? data.errors.join(", ") : "Грешка при испраќање."
            }));
         }
      } catch (err) {
         setSubmitStatus('error');
         setErrors(prev => ({
            ...prev,
            global: "Грешка при воспоставување врска со серверот."
         }));
      } finally {
         setIsSubmitting(false);
      }
   };

   useGSAP(() => {
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
         },
      });

      tl.fromTo(".contact-reveal",
         { y: 100, opacity: 0 },
         {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out"
         }
      );

      tl.fromTo(".contact-form-item",
         { y: 40, opacity: 0 },
         {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out"
         },
         "-=1"
      );

   }, { scope: containerRef });

   return (
      <section
         ref={containerRef}
         id="contact"
         className="relative bg-white pt-32 pb-48 overflow-hidden border-t border-black/10"
      >
         {/* Background Architectural Grid */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute left-[25%] h-full w-px bg-black" />
            <div className="absolute left-[75%] h-full w-px bg-black" />
            <div className="absolute top-1/4 w-full h-px bg-black" />
         </div>

         <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full">

            {/* EDITORIAL HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-32">
               <div className="contact-reveal opacity-0 lg:col-span-4 flex flex-col items-start pt-2">
                  <div className="flex items-center gap-4">
                     <div className="h-px w-8 bg-brand-red" />
                     <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.4em] font-sans">
                        007 // КОНТАКТ
                     </span>
                  </div>
                  <p className="mt-8 font-sans text-lg text-brand-dark/40 max-w-xs leading-relaxed font-medium">
                     Побарајте понуда и добијте детален логистички план во најкраток можен рок.
                  </p>
               </div>

               <div className="contact-reveal opacity-0 lg:col-span-8 text-left">
                  <h2 className="font-sans text-[clamp(2.2rem,5.5vw,4.5rem)] text-brand-dark leading-[0.85] tracking-tighter font-medium">
                     Закажете го вашиот <br />
                     <span className="text-brand-red italic">превоз денес.</span>
                  </h2>
               </div>
            </div>

            {/* INTERACTIVE FORM GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

               {/* LEFT: INFO & IMAGE (4 cols) */}
               <div className="lg:col-span-4 flex flex-col gap-16">
                  <div className="contact-form-item opacity-0 relative aspect-[4/5] overflow-hidden border border-black/5 bg-[#F9F9F9]">
                     <Image
                        src="/port-min.png"
                        alt="Kontrans Logistics"
                        fill
                        className="object-cover transition-all duration-1000"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                     <div className="absolute bottom-6 left-6 text-white font-mono text-[9px] tracking-widest uppercase font-bold">
                        Оперативна мрежа // V-9.3
                     </div>
                  </div>

                  <div className="contact-form-item opacity-0 flex flex-col gap-8">
                     <div>
                        <h4 className="font-mono text-[9px] font-bold text-brand-red uppercase tracking-widest mb-4">Адреса</h4>
                        <p className="font-sans text-xl text-brand-dark font-bold leading-tight">
                           Ул. Киро Крстевски 3/6, <br /> 1000 Скопје
                        </p>
                     </div>
                     <div>
                        <h4 className="font-mono text-[9px] font-bold text-brand-red uppercase tracking-widest mb-4">Контакт</h4>
                        <p className="font-sans text-xl text-brand-dark font-bold leading-tight">
                           +389 2 311 0000 <br /> info@kontrans.mk
                        </p>
                     </div>
                  </div>
               </div>

               {/* RIGHT: THE FORM (8 cols) */}
               <div className="lg:col-span-8">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-16">

                     {/* Step 1: Transport Mode */}
                     <div className="contact-form-item opacity-0 flex flex-col gap-8">
                        <div className="flex items-center justify-between border-b border-black/20 pb-4">
                           <span className={`font-sans text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${errors.transportMode ? "text-brand-red" : "text-brand-dark/60"}`}>
                              01 // ТРАНСПОРТ {errors.transportMode && <span className="ml-2">// {errors.transportMode}</span>}
                           </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {transportOptions.map((opt) => (
                              <button
                                 key={opt.id}
                                 type="button"
                                 onClick={() => {
                                    setTransportMode(opt.id);
                                    if (submitStatus === 'success') setSubmitStatus('idle');
                                    if (errors.transportMode) {
                                       setErrors(prev => { const n = { ...prev }; delete n.transportMode; return n; });
                                    }
                                 }}
                                 className={`group relative h-24 border flex flex-col items-center justify-center gap-3 transition-all duration-500 ${transportMode === opt.id ? "bg-brand-red border-brand-red" : "bg-white border-black/20 hover:border-brand-dark"
                                    } ${errors.transportMode ? "border-brand-red/50" : ""}`}
                              >
                                 <opt.icon className={`w-5 h-5 transition-colors duration-500 ${transportMode === opt.id ? "text-white" : "text-brand-dark/50 group-hover:text-brand-dark"}`} />
                                 <span className={`font-mono text-[9px] font-black tracking-widest uppercase transition-colors duration-500 ${transportMode === opt.id ? "text-white" : "text-brand-dark/50 group-hover:text-brand-dark"}`}>
                                    {opt.label}
                                 </span>
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Step 2: Route Info */}
                     <div className="contact-form-item opacity-0 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        <div className="flex flex-col gap-4">
                           <span className={`font-sans text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${errors.origin ? "text-brand-red" : "text-brand-dark/60"}`}>
                              02 // ПОЧЕТНА ТОЧКА {errors.origin && <span className="ml-2">// {errors.origin}</span>}
                           </span>
                           <input
                              type="text"
                              id="origin"
                              value={formData.origin}
                              onChange={handleInputChange}
                              placeholder="ГРАД / ПРИСТАНИШТЕ"
                              className={`bg-transparent border-b-2 py-4 text-2xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none transition-colors tracking-tight ${errors.origin ? "border-brand-red" : "border-black/20 focus:border-brand-red"}`}
                           />
                        </div>
                        <div className="flex flex-col gap-4">
                           <span className={`font-sans text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${errors.destination ? "text-brand-red" : "text-brand-dark/60"}`}>
                              03 // ДЕСТИНАЦИЈА {errors.destination && <span className="ml-2">// {errors.destination}</span>}
                           </span>
                           <input
                              type="text"
                              id="destination"
                              value={formData.destination}
                              onChange={handleInputChange}
                              placeholder="КРАЈНА ТАЧКА"
                              className={`bg-transparent border-b-2 py-4 text-2xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none transition-colors tracking-tight ${errors.destination ? "border-brand-red" : "border-black/20 focus:border-brand-red"}`}
                           />
                        </div>
                     </div>

                     {/* Step 3: Logistics Specs */}
                     <div className="contact-form-item opacity-0 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                           <span className="font-sans text-[10px] font-black text-brand-dark/60 uppercase tracking-widest">04 // ТЕЖИНА (kg)</span>
                           <input
                              type="text"
                              id="weight"
                              value={formData.weight}
                              onChange={handleInputChange}
                              placeholder="00"
                              className="bg-transparent border-b-2 border-black/20 py-2 text-xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none focus:border-brand-red transition-colors"
                           />
                        </div>
                        <div className="flex flex-col gap-4">
                           <span className="font-sans text-[10px] font-black text-brand-dark/60 uppercase tracking-widest">05 // ВОЛУМЕН (m³)</span>
                           <input
                              type="text"
                              id="volume"
                              value={formData.volume}
                              onChange={handleInputChange}
                              placeholder="0.0"
                              className="bg-transparent border-b-2 border-black/20 py-2 text-xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none focus:border-brand-red transition-colors"
                           />
                        </div>
                        <div className="flex flex-col gap-4">
                           <span className="font-sans text-[10px] font-black text-brand-dark/60 uppercase tracking-widest">06 // ТИП НА РОБА</span>
                           <input
                              type="text"
                              id="commodity"
                              value={formData.commodity}
                              onChange={handleInputChange}
                              placeholder="ОПИС"
                              className="bg-transparent border-b-2 border-black/20 py-2 text-xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none focus:border-brand-red transition-colors"
                           />
                        </div>
                     </div>

                     {/* Step 4: Identification */}
                     <div className="contact-form-item opacity-0 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex flex-col gap-4">
                           <span className={`font-sans text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${errors.email ? "text-brand-red" : "text-brand-dark/60"}`}>
                              07 // Е-ПОШТА {errors.email && <span className="ml-2">// {errors.email}</span>}
                           </span>
                           <input
                              type="email"
                              id="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@mail.com"
                              className={`bg-transparent border-b-2 py-2 text-xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none transition-colors ${errors.email ? "border-brand-red" : "border-black/20 focus:border-brand-red"}`}
                           />
                        </div>
                        <div className="flex flex-col gap-4">
                           <span className={`font-sans text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${errors.phone ? "text-brand-red" : "text-brand-dark/60"}`}>
                              08 // ТЕЛЕФОН {errors.phone && <span className="ml-2">// {errors.phone}</span>}
                           </span>
                           <input
                              type="tel"
                              id="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+389"
                              className={`bg-transparent border-b-2 py-2 text-xl font-bold font-sans text-brand-dark placeholder:text-black/20 focus:outline-none transition-colors ${errors.phone ? "border-brand-red" : "border-black/20 focus:border-brand-red"}`}
                           />
                        </div>
                     </div>

                     {/* SUBMIT BUTTON */}
                     <div className="contact-form-item opacity-0 pt-8">
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="group relative w-full h-24 bg-brand-red overflow-hidden transition-all duration-500 active:scale-[0.98] disabled:opacity-50"
                        >
                           <div className="absolute inset-0 bg-brand-dark scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />
                           <div className="relative z-10 flex items-center justify-between px-10">
                              <div className="flex flex-col items-start text-left">
                                 <span className="font-mono text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Официјално барање</span>
                                 <span className="font-sans text-xl lg:text-2xl font-black text-white uppercase tracking-tight">
                                    {isSubmitting ? "Обработка..." : "Испрати до Контранс"}
                                 </span>
                              </div>
                              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors duration-500">
                                 <ArrowUpRight className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </div>
                           </div>
                        </button>

                        {submitStatus === 'success' && (
                           <div className="mt-8 flex items-center gap-4 bg-green-50 p-6 border border-green-100">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <p className="font-mono text-[10px] font-bold text-green-700 uppercase tracking-widest">
                                 Вашето барање е успешно испратено. Нашиот тим ќе ве контактира набрзо.
                              </p>
                           </div>
                        )}

                        {submitStatus === 'error' && (
                           <div className="mt-8 flex items-center gap-4 bg-red-50 p-6 border border-red-100">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <p className="font-mono text-[10px] font-bold text-red-700 uppercase tracking-widest">
                                 Грешка: {errors.global || "обидете се повторно подоцна."}
                              </p>
                           </div>
                        )}
                     </div>

                  </form>
               </div>
            </div>

            {/* FOOTER META */}
            <div className="contact-form-item opacity-0 flex justify-between items-center pt-20 border-t border-black/5 mt-20">
               <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/20 font-bold">
                  СЕСИЈА_9.3 // 2026
               </span>
               <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-black/20 font-bold text-right">
                  КОНТРАНС // ОПЕРАТИВЕН_ПРЕГЛЕД
               </span>
            </div>

         </div>
      </section>
   );
}
