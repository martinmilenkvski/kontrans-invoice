"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Ship, Plane, Truck, ShieldCheck, Route, Loader2 } from "lucide-react";

export function Contact() {
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

  const trustPoints = [
    "Гарантирана безбедност на пратката",
    "Транспарентни цени без скриени трошоци",
    "24/7 посветен агент за логистика"
  ];

  const transportOptions = [
    { id: 'sea', icon: Ship, label: 'Бродски Транспорт', desc: 'FCL / LCL пратки' },
    { id: 'air', icon: Plane, label: 'Авионски Транспорт', desc: 'Брза испорака' },
    { id: 'road', icon: Truck, label: 'Камионски Транспорт', desc: 'FTL / LTL Европа' },
    { id: 'multimodal', icon: Route, label: 'Мултимодален', desc: 'Комбиниран превоз' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, placeholder } = e.target;
    const field = id || (placeholder?.includes("тежина") ? "weight" : placeholder?.includes("Волумен") ? "volume" : "commodity");
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!transportMode) newErrors.transportMode = "Изберете тип на транспорт";
    if (!formData.origin.trim()) newErrors.origin = "Задолжително поле";
    if (!formData.destination.trim()) newErrors.destination = "Задолжително поле";
    if (!formData.weight.trim()) newErrors.weight = "Задолжително поле";
    if (!formData.email.trim()) newErrors.email = "Задолжително поле";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Невалидна е-маил адреса";
    if (!formData.phone.trim()) newErrors.phone = "Задолжително поле";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transportMode,
          needsInsurance,
          ...formData,
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ origin: '', destination: '', weight: '', volume: '', commodity: '', email: '', phone: '' });
        setTransportMode(null);
        setNeedsInsurance(false);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F4F4F5] border-t border-black/10 relative overflow-hidden font-sans">
      <div className="max-w-[1600px] mx-auto relative z-10 w-full flex flex-col">
        
        {/* Editorial Grid Layout for Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Context & Value Prop */}
          <div className="p-10 md:p-16 lg:p-24 lg:border-r border-b lg:border-b-0 border-black/10 flex flex-col justify-center bg-[#F4F4F5]">
            
            {/* Eyebrow Label with Solid Dot */}
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D42B2B]"></span>
              </span>
              <span className="text-[#D42B2B] font-semibold tracking-wider text-xs sm:text-sm uppercase">
                Контакт
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-[#111111] leading-[1.1] tracking-tight mb-8">
              Побарај<br />понуда{" "}
              <span className="text-[#D42B2B] italic pr-2 font-[family-name:var(--font-caveat)]">денес.</span>
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
              Внесете ги спецификациите на вашиот товар и нашите агенти ќе креираат персонализирано логистичко решение во рок од 24 часа.
            </p>

            {/* Trust Points */}
            <ul className="flex flex-col gap-6 font-medium">
              {trustPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#D42B2B] shrink-0 mt-0.5" />
                  <span className="text-[#111111] font-medium text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: The Form Card */}
          <div className="p-6 md:p-12 lg:p-20 flex items-center justify-center bg-[#F4F4F5] relative border-b border-black/10 lg:border-b-0">
            <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl border border-black/5 shadow-2xl relative z-10">
              
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                
                {/* Visual Select: Transport Mode */}
                <div className="flex flex-col gap-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Избери тип на транспорт</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {transportOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = transportMode === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { setTransportMode(opt.id); if (errors.transportMode) setErrors(prev => { const next = { ...prev }; delete next.transportMode; return next; }); }}
                          className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? "border-[#D42B2B] bg-[#fefce8] text-[#D42B2B]" 
                              : errors.transportMode ? "border-red-400 bg-red-50 text-gray-600" : "border-black/5 bg-[#FAFAFA] hover:border-[#D42B2B]/40 hover:bg-white text-gray-600"
                          }`}
                        >
                          <Icon className={`w-6 h-6 transition-colors ${isSelected ? "text-[#D42B2B]" : "text-gray-400 group-hover:text-[#D42B2B]/70"}`} />
                          <div className="text-center">
                            <span className={`block text-xs font-bold transition-colors ${isSelected ? "text-[#D42B2B]" : "text-[#111111] group-hover:text-[#D42B2B]"}`}>{opt.label}</span>
                            <span className={`block text-[10px] sm:hidden md:block mt-1 transition-colors ${isSelected ? "text-[#D42B2B]/70" : "text-gray-400 group-hover:text-gray-600"}`}>{opt.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.transportMode && <p className="text-red-500 text-xs font-medium pl-1 -mt-2">{errors.transportMode}</p>}
                </div>

                {/* Form Group: Origin & Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#FAFAFA] border border-black/5 rounded-xl">
                  <div className="flex flex-col gap-1 relative">
                    <label htmlFor="origin" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest absolute top-3 left-4 z-10">Место на утовар</label>
                    <input 
                      type="text" 
                      id="origin" 
                      value={formData.origin}
                      onChange={handleInputChange}
                      placeholder="Пр. Шангај, Кина" 
                      className={`w-full bg-white border rounded-lg px-4 pt-8 pb-3 text-[#111111] font-medium placeholder-gray-300 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all shadow-sm ${errors.origin ? 'border-red-400' : 'border-black/10'}`}
                    />
                    {errors.origin && <p className="text-red-500 text-[10px] font-medium pl-1">{errors.origin}</p>}
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label htmlFor="destination" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest absolute top-3 left-4 z-10">Место на истовар</label>
                    <input 
                      type="text" 
                      id="destination" 
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="Пр. Скопје, МКД" 
                      className={`w-full bg-white border rounded-lg px-4 pt-8 pb-3 text-[#111111] font-medium placeholder-gray-300 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all shadow-sm ${errors.destination ? 'border-red-400' : 'border-black/10'}`}
                    />
                    {errors.destination && <p className="text-red-500 text-[10px] font-medium pl-1">{errors.destination}</p>}
                  </div>
                </div>

                {/* Cargo Details Grid */}
                <div className="flex flex-col gap-3">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Детали за товарот</label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     <input 
                        type="text" 
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Бруто тежина (Кг)" 
                        className={`w-full bg-[#FAFAFA] border rounded-lg px-4 py-3.5 text-sm text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] transition-all ${errors.weight ? 'border-red-400' : 'border-black/10'}`}
                      />
                      {errors.weight && <p className="text-red-500 text-[10px] font-medium col-span-2 md:col-span-1 -mt-2">{errors.weight}</p>}
                      <input 
                        type="text" 
                        value={formData.volume}
                        onChange={handleInputChange}
                        placeholder="Волумен (CBM)" 
                        className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] transition-all"
                      />
                      <input 
                        type="text" 
                        value={formData.commodity}
                        onChange={handleInputChange}
                        placeholder="Тип на стока (Пр. Електроника)" 
                        className="w-full col-span-2 md:col-span-1 bg-[#FAFAFA] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] transition-all"
                      />
                   </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent my-2" />

                {/* Contact + Insurance Toggle */}
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Е-маил Адреса</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="vasata@kompanija.com" 
                        className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Телефонски Број</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+389 XX XXX XXX" 
                        className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] transition-all"
                      />
                    </div>
                  </div>

                  {/* Cargo Insurance Toggle */}
                  <button 
                    type="button"
                    onClick={() => setNeedsInsurance(!needsInsurance)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 w-full group ${
                      needsInsurance ? "border-[#D42B2B] bg-[#fefce8]" : "border-black/5 bg-[#FAFAFA] hover:border-black/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${needsInsurance ? "bg-[#D42B2B]/10" : "bg-black/5"}`}>
                        <ShieldCheck className={`w-5 h-5 ${needsInsurance ? "text-[#D42B2B]" : "text-gray-400"}`} />
                      </div>
                      <div className="text-left flex flex-col">
                        <span className={`font-bold text-sm ${needsInsurance ? "text-[#D42B2B]" : "text-[#111111]"}`}>Потребно е осигурување на товарот?</span>
                        <span className="text-xs text-gray-400 mt-0.5">Соработуваме со Eurolink за целосно покритие</span>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${needsInsurance ? "bg-[#D42B2B]" : "bg-gray-300"}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${needsInsurance ? "left-7 shadow-sm" : "left-1"}`} />
                    </div>
                  </button>
                </div>

                {/* Success/Error Feedback */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Вашето барање е успешно испратено! Ќе ве контактираме наскоро.</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                    <span>⚠️ Грешка при испраќање. Обидете се повторно или контактирајте нè директно.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 w-full px-8 py-5 bg-[#D42B2B] hover:bg-[#b02222] text-white text-[15px] font-bold tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group border border-[#D42B2B] hover:border-[#b02222] shadow-[0_10px_40px_-10px_rgba(212,43,43,0.4)] hover:shadow-[0_10px_40px_-5px_rgba(212,43,43,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /><span>Се испраќа...</span></>
                  ) : (
                    <><span>Испрати барање за понуда</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
