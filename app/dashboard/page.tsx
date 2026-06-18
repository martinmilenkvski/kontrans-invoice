"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FileText, 
  Users, 
  FileSearch, 
  LogOut, 
  ChevronRight,
  Plus,
  Shield
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple client-side auth check
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  const handleLogout = () => {
    // Clear session cookie for Middleware route guard
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const dashboardOptions = [
    {
      title: "Фактури",
      description: "Управувајте со вашите фактури и плаќања",
      icon: <FileText className="w-6 h-6" />,
      href: "/dashboard/invoices",
    },
    {
      title: "Присутност",
      description: "Следете ја присутноста на вработените",
      icon: <Users className="w-6 h-6" />,
      href: "/dashboard/attendance",
    },
    {
      title: "Понуди",
      description: "Креирајте и прегледувајте нови понуди",
      icon: <FileSearch className="w-6 h-6" />,
      href: "/dashboard/offers",
    },
    {
      title: "Осигурување",
      description: "Преглед и обновување на полиси за осигурување",
      icon: <Shield className="w-6 h-6" />,
      href: "/dashboard/insurance",
    }
  ];

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-[#080808] text-white font-sans flex flex-col selection:bg-[#D42B2B] selection:text-white">
      {/* Premium Top Bar Header */}
      <header className="border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <span className="text-xl font-black tracking-[0.15em] uppercase">
                КОН<span className="text-[#D42B2B]">ТРАНС</span>
              </span>
            </Link>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-[#D42B2B] hover:border-[#D42B2B] text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest group cursor-pointer"
          >
            Одјави се
            <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-6 md:p-12 relative flex flex-col justify-center">
        
        {/* Title Section */}
        <div className="relative z-10 mb-16 flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[#D42B2B]" />
            <span className="font-mono text-[10px] text-[#D42B2B] tracking-[0.4em] uppercase font-bold">
              КОНТРОЛЕН ПАНЕЛ
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white leading-none">
            Команден <span className="italic text-[#D42B2B] font-light">центар.</span>
          </h1>
          <p className="text-white/50 text-sm max-w-md">
            Добредојдовте назад во вашиот менаџмент систем. Изберете некој од оперативните модули подолу.
          </p>
        </div>

        {/* Sleek Module Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardOptions.map((option, idx) => (
            <Link 
              key={option.title}
              href={option.href}
              className="group block h-full"
            >
              <div className="h-full bg-[#111111] border border-white/5 hover:border-[#D42B2B]/30 p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,43,43,0.08)] group relative overflow-hidden min-h-[300px]">
                
                {/* Top red indicator border line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D42B2B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                  {/* Circular Hover Icon Box */}
                  <div className="w-14 h-14 bg-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-[#D42B2B] transition-all duration-500 mb-8 border border-white/10 group-hover:border-[#D42B2B]">
                    {option.icon}
                  </div>
                  
                  <h3 className="text-2xl font-medium tracking-tight text-white mb-3 transition-colors duration-300 group-hover:text-[#D42B2B]">
                    {option.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-10">
                    {option.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors border-t border-white/5 pt-4">
                  <span>Отвори модул</span>
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 text-[#D42B2B]" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Support Banner (Premium Logistics Design) */}
        <div className="relative z-10 mt-16 bg-gradient-to-r from-[#D42B2B] to-[#b02222] border border-white/5 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-medium tracking-tight mb-2">Системска Дијагностика и Поддршка</h4>
              <p className="text-white/85 text-sm tracking-wide leading-relaxed">
                За сите прашања околу кориснички пристап, дијагностички проблеми или помош при генерирање на фактури/осигурувања, контактирајте ја техничката поддршка.
              </p>
            </div>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-white text-black hover:bg-[#111111] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center gap-3 group cursor-pointer border-none shadow-lg">
            КОНТАКТ
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Structural Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs tracking-wider">
          <p className="uppercase">
            СИС_ДАТУМ // {new Date().getFullYear()} // KONTRANS ПРЕМИУМ ПАНЕЛ
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-[#D42B2B] opacity-40 rounded-full" />
              <span className="relative inline-flex h-2 w-2 bg-[#D42B2B] rounded-full" />
            </span>
            <span className="text-[#D42B2B] text-[10px] uppercase tracking-widest font-mono">Активна Врска</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
