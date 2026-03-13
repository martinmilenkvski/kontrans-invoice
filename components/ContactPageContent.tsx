"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact as ContactForm } from "@/components/Contact";
import { FadeIn, RevealLine, StaggerGroup } from "@/components/Animations";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect } from "react";
import Lenis from "lenis";

export function ContactPageContent() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#080808] border-b border-white/10 min-h-[50vh] flex flex-col justify-end pb-12 lg:pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact Support" 
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
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
                  Поддршка на клиенти
                </span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-4">
                Тука сме за вашата <br />
                <span className="text-[#D42B2B] italic drop-shadow-lg pr-2">следна пратка.</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-medium leading-relaxed mt-2">
                Имате прашање, потребна ви е понуда или консултација? Нашиот тим од експерти е секогаш на располагање.
              </p>
            </FadeIn>
          </StaggerGroup>
        </div>
      </section>

      {/* Info & Map Section */}
      <section className="bg-white text-[#111111]">
        <div className="max-w-[1600px] mx-auto border-x border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Contact Details */}
            <div className="p-10 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/10 bg-[#FAFAFA] flex flex-col justify-center">
               <StaggerGroup>
                 <FadeIn>
                    <div className="flex items-center gap-3 mb-10">
                      <span className="w-4 h-[2px] bg-[#D42B2B]"></span>
                      <span className="text-[#111111] font-bold tracking-widest text-xs uppercase">
                        Информации за контакт
                      </span>
                    </div>
                 </FadeIn>
                 <FadeIn delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight leading-[1.1] mb-12">
                      Кон-транс Шипинг
                    </h2>
                 </FadeIn>

                 <div className="flex flex-col gap-8">
                    <FadeIn delay={0.2}>
                      <div className="flex items-start gap-6 group">
                         <div className="w-12 h-12 flex-shrink-0 rounded-full border border-black/10 bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all duration-300">
                            <MapPin className="w-5 h-5 text-[#D42B2B] group-hover:scale-110 transition-transform" />
                         </div>
                         <div className="flex flex-col gap-1 mt-1">
                            <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Адреса</span>
                            <span className="text-lg font-medium text-[#111111]">Киро Крстевски 3/6<br/>1000 Скопје, Македонија</span>
                         </div>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                      <div className="flex items-start gap-6 group">
                         <div className="w-12 h-12 flex-shrink-0 rounded-full border border-black/10 bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all duration-300">
                            <Phone className="w-5 h-5 text-[#D42B2B] group-hover:scale-110 transition-transform" />
                         </div>
                         <div className="flex flex-col gap-1 mt-1">
                            <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Телефон</span>
                            <a href="tel:+38923232657" className="text-lg font-medium text-[#111111] hover:text-[#D42B2B] transition-colors">+ 389 2 3232 657</a>
                            <a href="tel:+3893215296" className="text-lg font-medium text-[#111111] hover:text-[#D42B2B] transition-colors">+ 389 3215 296</a>
                         </div>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                      <div className="flex items-start gap-6 group">
                         <div className="w-12 h-12 flex-shrink-0 rounded-full border border-black/10 bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all duration-300">
                            <Mail className="w-5 h-5 text-[#D42B2B] group-hover:scale-110 transition-transform" />
                         </div>
                         <div className="flex flex-col gap-1 mt-1">
                            <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Е-маил</span>
                            <a href="mailto:office@kontrans.com.mk" className="text-lg font-medium text-[#111111] hover:text-[#D42B2B] transition-colors">office@kontrans.com.mk</a>
                         </div>
                      </div>
                    </FadeIn>
                 </div>
               </StaggerGroup>
            </div>

            {/* Google Map Embed */}
            <div className="min-h-[400px] lg:min-h-full border-b border-black/10 lg:border-b-0 relative w-full h-full bg-gray-200">
               <iframe 
                 src="https://maps.google.com/maps?q=Kiro%20Krstevski%203%2F6,%20Skopje,%20Macedonia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                 className="absolute inset-0 w-full h-full"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
               />
               <div className="absolute inset-0 pointer-events-none border border-black/10"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Reusing the beautiful contact form as a 'request quote' section below */}
      <ContactForm />

      <Footer />
    </main>
  );
}
