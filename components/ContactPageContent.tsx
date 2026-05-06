"use client";

import { Footer } from "@/components/Footer";
import { Contact as ContactForm } from "@/components/Contact";
import { WebsiteHero } from "@/components/WebsiteHero";
import { FadeIn, StaggerGroup } from "@/components/Animations";
import { MapPin, Phone, Mail } from "lucide-react";

export function ContactPageContent() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#D42B2B]/30">


      <WebsiteHero
        eyebrow="Поддршка на клиенти"
        title="Тука сме за вашата"
        accent="следна пратка."
        accentMode="block"
        subtitle="Имате прашање, потребна ви е понуда или консултација? Нашиот тим од експерти е секогаш на располагање."
        imageSrc="/contact-hologram.png"
        minHeight="min-h-[50vh]"
      />

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
                      <div className="w-12 h-12 flex-shrink-0 border border-black/10 bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all duration-300">
                        <MapPin className="w-5 h-5 text-[#D42B2B] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col gap-1 mt-1">
                        <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Адреса</span>
                        <span className="text-lg font-medium text-[#111111]">Киро Крстевски 3/6<br />1000 Скопје, Македонија</span>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.3}>
                    <div className="flex items-start gap-6 group">
                      <div className="w-12 h-12 flex-shrink-0 border border-black/10 bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all duration-300">
                        <Phone className="w-5 h-5 text-[#D42B2B] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col gap-1 mt-1">
                        <span className="font-bold uppercase tracking-wider text-xs text-gray-500">Телефон</span>
                        <a href="tel:+38923232657" className="text-lg font-medium text-[#111111] hover:text-[#D42B2B] transition-colors">+ 389 2 3232 657</a>
                        <a href="tel:+38923215296" className="text-lg font-medium text-[#111111] hover:text-[#D42B2B] transition-colors">+ 389 2 3215 296</a>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.4}>
                    <div className="flex items-start gap-6 group">
                      <div className="w-12 h-12 flex-shrink-0 border border-black/10 bg-white flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all duration-300">
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
