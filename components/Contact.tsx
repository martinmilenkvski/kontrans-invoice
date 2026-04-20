"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Ship, Plane, Truck, Route, Loader2, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── SPLIT FLAP CHARACTER ───────────────────────────────────────────────────
function SplitFlapChar({ char, delay }: { char: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    if (char === " ") return;
    gsap.fromTo(ref.current,
      { rotationX: -90, opacity: 0, y: 20 },
      { 
        rotationX: 0, 
        opacity: 1, 
        y: 0,
        duration: 1.2, 
        delay, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: ref });

  return (
    <span 
      ref={ref} 
      className="inline-block perspective-[500px] opacity-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
}

function SplitFlapText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split("").map((char, i) => (
        <SplitFlapChar key={i} char={char} delay={delay + i * 0.05} />
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
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
    { id: 'sea', icon: Ship, label: 'ПОМОРСКИ' },
    { id: 'air', icon: Plane, label: 'ВОЗДУШЕН' },
    { id: 'road', icon: Truck, label: 'КОПНЕН' },
    { id: 'multimodal', icon: Route, label: 'МУЛТИ' },
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
    if (!transportMode) newErrors.transportMode = "ОБАВЕЗНО";
    if (!formData.origin.trim()) newErrors.origin = "ОБАВЕЗНО";
    if (!formData.destination.trim()) newErrors.destination = "ОБАВЕЗНО";
    if (!formData.email.trim()) newErrors.email = "ОБАВЕЗНО";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "НЕВАЛИДНО";
    if (!formData.phone.trim()) newErrors.phone = "ОБАВЕЗНО";
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
        start: "top 70%",
      },
    });

    const ease = "power4.out";

    // ── HEADER ENTRANCE ──
    tl.fromTo(".contact-header-meta", 
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease },
      0
    );

    tl.fromTo(".contact-subtitle", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease },
      0.6
    );

    // ── HUD BORDER DRAW ──
    tl.fromTo(".hud-border-h", 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 2.5, ease: "expo.inOut", stagger: 0.3 }, 0.8);
    tl.fromTo(".hud-border-v", 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 2.5, ease: "expo.inOut", stagger: 0.3 }, 1.0);

    // ── STAGGERED FORM SECTIONS ──
    tl.fromTo(".contact-section",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease },
      1.5
    );

    // ── SUBMIT BUTTON ──
    tl.fromTo(".contact-submit-area",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease },
      2.0
    );

    // ── IMAGE PARALLAX ──
    gsap.fromTo(imageRef.current, 
      { scale: 1.2 },
      { 
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative bg-white pt-24 pb-24 overflow-hidden border-t border-black/5"
    >
      <div className="max-w-[1600px] mx-auto px-4 relative z-10 w-full">
        
        <div className="flex flex-col lg:flex-row bg-white border border-black/10 overflow-hidden shadow-2xl min-h-[850px]">
          
          {/* ── LEFT: CINEMATIC IMAGE ── */}
          <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-black/10 group">
             <div ref={imageRef} className="absolute inset-0 w-full h-full scale-110">
                <Image 
                  src="/port-min.png" 
                  alt="Контранс Терминал" 
                  fill
                  className="object-cover transition-all duration-1000"
                  priority
                />
             </div>
             <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>

          {/* ── RIGHT: FORM TERMINAL ── */}
          <div className="w-full lg:w-[55%] flex flex-col relative px-8 py-12 lg:px-16 lg:py-20 justify-center">
            
             {/* Animated HUD Borders Inside the half-screen */}
             <span className="hud-border-h absolute top-6 left-6 right-6 h-[1px] bg-black/5 origin-left scale-x-0" />
             <span className="hud-border-h absolute bottom-6 left-6 right-6 h-[1px] bg-black/5 origin-right scale-x-0" />
             <span className="hud-border-v absolute top-6 bottom-6 left-6 w-[1px] bg-black/5 origin-top scale-y-0" />
             <span className="hud-border-v absolute top-6 bottom-6 right-6 w-[1px] bg-black/5 origin-bottom scale-y-0" />

             {/* Form Header */}
             <div className="mb-12 flex flex-col gap-4">
                <div className="contact-header-meta flex items-center gap-4 opacity-0">
                   <div className="w-8 h-[1px] bg-[#D42B2B]" />
                   <span className="font-mono text-[0.6rem] text-[#D42B2B] tracking-[0.5em] uppercase font-bold text-nowrap">
                     БАРАЊЕ // ФОРМУЛАР
                   </span>
                </div>

                <h2 className="font-sans text-[2.5rem] lg:text-[4rem] text-[#111111] leading-[0.9] tracking-tighter font-medium">
                  <SplitFlapText text="Закажете" /> <br />
                  <span className="text-[#D42B2B] italic font-[family-name:var(--font-caveat)] font-normal text-[1em] tracking-normal lowercase block">
                     <SplitFlapText text="превоз сега." delay={0.4} />
                  </span>
                </h2>

                <p className="contact-subtitle font-[family-name:var(--font-jost)] text-black/40 text-sm lg:text-base leading-relaxed max-w-md mt-2 opacity-0">
                  Пополнете го формуларот за брза понуда. Нашиот тим ќе ви одговори во најкус можен рок со детален логистички план.
                </p>
             </div>

             <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="flex flex-col gap-10"
             >
              {/* 1. SELECTION */}
              <div className="contact-section flex flex-col gap-5 opacity-0">
                <div className="flex justify-between items-center border-b border-black/5 pb-3">
                   <span className="font-mono text-[0.55rem] text-black/40 tracking-[0.3em] font-bold uppercase">01 // ТРАНСПОРТ</span>
                   {errors.transportMode && <span className="font-mono text-[0.55rem] text-[#D42B2B] font-bold uppercase tracking-widest">{errors.transportMode}</span>}
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                   {transportOptions.map((opt) => {
                     const isSelected = transportMode === opt.id;
                     return (
                       <button
                         key={opt.id}
                         type="button"
                         onClick={() => setTransportMode(opt.id)}
                         className={`group relative h-20 border flex flex-col items-center justify-center gap-1.5 transition-all duration-500 ${
                           isSelected ? "bg-[#D42B2B] border-[#D42B2B]" : "bg-black/[0.02] border-black/5 hover:border-black/20"
                         }`}
                       >
                         <opt.icon className={`w-4 h-4 transition-all duration-500 ${isSelected ? "text-white" : "text-black/30 group-hover:text-black"}`} />
                         <span className={`font-mono text-[0.5rem] tracking-[0.2em] font-black uppercase ${isSelected ? "text-white" : "text-black/30 group-hover:text-black"}`}>
                           {opt.label}
                         </span>
                       </button>
                     );
                   })}
                </div>
              </div>

              {/* 2. THE ROUTE */}
              <div className="contact-section grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0">
                 <div className="flex flex-col gap-4">
                    <div className="border-b border-black/5 pb-2">
                      <span className="font-mono text-[0.55rem] text-black/40 tracking-[0.3em] font-bold uppercase">02 // ПОЧЕТНА Т.</span>
                    </div>
                    <input
                      type="text"
                      id="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      placeholder="ОБЈЕКТ / ГРАД / ПРИСТАНИШТЕ"
                      className="w-full bg-transparent border-b border-black/10 pb-2 text-[#111111] text-lg font-medium placeholder-black/20 focus:outline-none focus:border-[#D42B2B] transition-all tracking-tighter"
                    />
                 </div>

                 <div className="flex flex-col gap-4">
                    <div className="border-b border-black/5 pb-2">
                      <span className="font-mono text-[0.55rem] text-black/40 tracking-[0.3em] font-bold uppercase">03 // ДЕСТИНАЦИЈА</span>
                    </div>
                    <input
                      type="text"
                      id="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="КРАЈНА ДЕСТИНАЦИЈА"
                      className="w-full bg-transparent border-b border-black/10 pb-2 text-[#111111] text-lg font-medium placeholder-black/20 focus:outline-none focus:border-[#D42B2B] transition-all tracking-tighter"
                    />
                 </div>
              </div>

              {/* 3. SPECS (Condensed) */}
              <div className="contact-section grid grid-cols-3 gap-6 opacity-0">
                 <div className="flex flex-col gap-3">
                    <span className="font-mono text-[0.5rem] text-black/40 tracking-[0.2em] uppercase">04 // ТЕЖИНА (kg)</span>
                    <input
                      type="text"
                      id="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="0.0"
                      className="w-full bg-transparent border-b border-black/10 pb-1 text-[#111111] text-sm font-medium focus:outline-none focus:border-[#D42B2B]"
                    />
                 </div>
                 <div className="flex flex-col gap-3">
                    <span className="font-mono text-[0.5rem] text-black/40 tracking-[0.2em] uppercase">05 // ВОЛУМЕН (m³)</span>
                    <input
                      type="text"
                      id="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                      placeholder="0.0"
                      className="w-full bg-transparent border-b border-black/10 pb-1 text-[#111111] text-sm font-medium focus:outline-none focus:border-[#D42B2B]"
                    />
                 </div>
                 <div className="flex flex-col gap-3">
                    <span className="font-mono text-[0.5rem] text-black/40 tracking-[0.2em] uppercase">06 // ВИД НА СТОКА</span>
                    <input
                      type="text"
                      id="commodity"
                      value={formData.commodity}
                      onChange={handleInputChange}
                      placeholder="ТИП"
                      className="w-full bg-transparent border-b border-black/10 pb-1 text-[#111111] text-sm font-medium focus:outline-none focus:border-[#D42B2B]"
                    />
                 </div>
              </div>

              {/* 4. IDENTIFICATION */}
              <div className="contact-section grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0">
                 <div className="flex flex-col gap-4">
                    <span className="font-mono text-[0.55rem] text-black/40 tracking-[0.3em] font-bold uppercase">07 // Е-ПОШТА</span>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@mail.com"
                      className="w-full bg-transparent border-b border-black/10 pb-2 text-[#111111] text-sm font-medium focus:outline-none focus:border-[#D42B2B]"
                    />
                 </div>
                 <div className="flex flex-col gap-4">
                    <span className="font-mono text-[0.55rem] text-black/40 tracking-[0.3em] font-bold uppercase">08 // ТЕЛЕФОН</span>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+389 XX XXX XXX"
                      className="w-full bg-transparent border-b border-black/10 pb-2 text-[#111111] text-sm font-medium focus:outline-none focus:border-[#D42B2B]"
                    />
                 </div>
              </div>

              {/* SUBMIT */}
              <div className="contact-submit-area pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-0">
                 <div className="flex flex-col gap-1">
                    <span className="font-mono text-[0.45rem] text-black/20 tracking-[0.2em] uppercase">БЕЗБЕДНО БАРАЊЕ</span>
                    <div className="flex gap-1">
                       {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-green-500/40 rounded-full" />)}
                    </div>
                 </div>

                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="group relative w-full sm:w-auto px-10 h-14 bg-[#111111] overflow-hidden transition-all duration-500 active:scale-[0.98] disabled:opacity-50"
                 >
                    <div className="absolute inset-0 bg-[#D42B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="relative z-10 flex items-center justify-center gap-4">
                       <span className="font-sans text-[0.6rem] font-black uppercase tracking-[0.3em] text-white">
                          {isSubmitting ? "ПОЧЕКАЈТЕ..." : "ИСПРАТИ БАРАЊЕ"}
                       </span>
                       <ArrowUpRight className="w-3.5 h-3.5 text-white transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                 </button>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 bg-green-50/50 p-4 border border-green-100 uppercase font-mono text-[0.55rem] text-green-700 tracking-widest">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Успешно испратено. Нашиот тим ќе ве контактира набрзо.
                </div>
              )}

             </form>
          </div>
        </div>

        {/* FOOTER META */}
        <div className="contact-section flex justify-between items-center opacity-0 pt-10">
          <span className="font-mono text-[0.45rem] tracking-[0.4em] uppercase text-black/10 font-bold">
            SESSION_9.3 // 2026
          </span>
          <span className="font-mono text-[0.45rem] tracking-[0.4em] uppercase text-black/10 font-bold text-right">
            КОНТРАНС // OPERATIONAL_SPLIT_VIEW
          </span>
        </div>

      </div>

    </section>
  );
}
