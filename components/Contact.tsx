import { CheckCircle2, ArrowRight } from "lucide-react";

export function Contact() {
  const trustPoints = [
    "Гарантирана безбедност на пратката",
    "Транспарентни цени без скриени трошоци",
    "24/7 посветен агент за логистика"
  ];

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
              Исполнете го формуларот со деталите за вашиот товар и нашиот тим ќе ве контактира со оптимално логистичко решение во рок од 24 часа.
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
            <div className="w-full max-w-xl bg-white p-8 md:p-12 rounded-2xl border border-black/5 shadow-2xl relative z-10">
              
              <form className="flex flex-col gap-6">
                
                {/* Form Field: Transport Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="transport-type" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Тип на транспорт</label>
                  <select 
                    id="transport-type" 
                    className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-400">Изберете услуга...</option>
                    <option value="sea">Бродски Транспорт (FCL/LCL)</option>
                    <option value="air">Авионски Транспорт</option>
                    <option value="road">Камионски Транспорт</option>
                  </select>
                </div>

                {/* Form Group: Origin & Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="origin" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Од (Држава)</label>
                    <input 
                      type="text" 
                      id="origin" 
                      placeholder="Пр. Кина" 
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="destination" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">До (Држава)</label>
                    <input 
                      type="text" 
                      id="destination" 
                      placeholder="Пр. Македонија" 
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all"
                    />
                  </div>
                </div>

                {/* Form Field: Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Опис на товарот</label>
                  <textarea 
                    id="description" 
                    placeholder="Внесете тежина, тип на стока, димензии..." 
                    rows={4}
                    className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Form Group: Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Е-маил Адреса</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="name@company.com" 
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Телефонски Број</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="+389 7X XXX XXX" 
                      className="w-full bg-[#FAFAFA] border border-black/10 rounded-lg px-5 py-4 text-[#111111] font-medium placeholder-gray-400 focus:outline-none focus:border-[#D42B2B] focus:ring-1 focus:ring-[#D42B2B] transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="mt-6 w-full px-8 py-5 bg-[#D42B2B] hover:bg-[#b02222] text-white text-sm font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group border border-[#D42B2B] hover:border-[#b02222]"
                >
                  <span>Испрати барање</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
