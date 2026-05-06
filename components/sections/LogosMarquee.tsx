"use client";

import Image from "next/image";

const logos = [
  { name: "MSC", url: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Mediterranean_Shipping_Company_logo.svg" },
  { name: "Maersk", url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maersk_Group_Logo.svg" },
  { name: "COSCO", url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/COSCO_Shipping_Logo.svg" },
  { name: "Evergreen", url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Evergreen_Logo.svg" },
  { name: "CMA CGM", url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/CMA_CGM_logo.svg" },
  { name: "ZIM", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/ZIM_Logo.svg" },
  { name: "ONE", url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Ocean_Network_Express_logo.svg" },
];

export function LogosMarquee() {
  return (
    <section className="bg-[#FAFAFA] py-18 border-b border-black/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-8 flex justify-end">
        <span className="font-mono text-[0.6rem] text-black/20 tracking-[0.4em] uppercase font-black text-right">
           GLOBAL_PARTNERS // NETWORK_NODES
        </span>
      </div>

      <div className="relative flex overflow-hidden group mask-[linear-gradient(to_right,transparent_0,black_256px,black_calc(100%-256px),transparent_100%)]">
        {/* First list */}
        <div className="flex animate-marquee whitespace-nowrap items-center gap-20 lg:gap-32 px-10">
          {logos.map((logo, i) => (
            <div 
              key={i} 
              className="relative w-24 lg:w-32 h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <Image 
                src={logo.url} 
                alt={logo.name} 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Second list (duplicate for seamless loop) */}
        <div className="flex animate-marquee whitespace-nowrap items-center gap-20 lg:gap-32 px-10" aria-hidden="true">
          {logos.map((logo, i) => (
            <div 
              key={`duplicate-${i}`} 
              className="relative w-24 lg:w-32 h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <Image 
                src={logo.url} 
                alt={logo.name} 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
