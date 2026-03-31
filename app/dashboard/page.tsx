"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FileText, 
  Users, 
  FileSearch, 
  LogOut, 
  LayoutDashboard,
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
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const dashboardOptions = [
    {
      title: "Фактури",
      description: "Управувајте со вашите фактури и плаќања",
      icon: <FileText className="w-6 h-6" />,
      href: "/dashboard/invoices",
      color: "bg-blue-500/10 text-blue-500",
      border: "border-blue-500/20"
    },
    {
      title: "Присутност",
      description: "Следете ја присутноста на вработените",
      icon: <Users className="w-6 h-6" />,
      href: "/dashboard/attendance",
      color: "bg-[#D42B2B]/10 text-[#D42B2B]",
      border: "border-[#D42B2B]/20"
    },
    {
      title: "Понуди",
      description: "Креирајте и прегледувајте нови понуди",
      icon: <FileSearch className="w-6 h-6" />,
      href: "/dashboard/offers",
      color: "bg-emerald-500/10 text-emerald-500",
      border: "border-emerald-500/20"
    },
    {
      title: "Осигурување",
      description: "Преглед и обновување на полиси за осигурување",
      icon: <Shield className="w-6 h-6" />,
      href: "/dashboard/insurance",
      color: "bg-purple-500/10 text-purple-500",
      border: "border-purple-500/20"
    }
  ];

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-space flex flex-col selection:bg-[#D42B2B] selection:text-white">
      {/* Structural Brutalist Top Bar */}
      <header className="border-b-2 border-white/10 bg-[#050505] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-2 h-2 bg-[#D42B2B] group-hover:scale-150 transition-transform" />
              <span className="text-sm font-black tracking-[0.2em] uppercase">
                KON<span className="text-[#D42B2B]">TRANS</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-3 text-white/30 font-mono text-xs uppercase tracking-widest pl-6 border-l-2 border-white/10 h-8">
              <span className="text-[#D42B2B] mr-2">SYS_MSG:</span>
              Систем активен // Контролна Табла
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 border-2 border-white/10 hover:border-[#D42B2B] hover:bg-[#D42B2B] hover:text-white transition-all text-white/70 text-xs font-bold uppercase tracking-widest group"
          >
            Одјави се
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Grid Canvas */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-6 md:p-12 relative">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{
               backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}
        />

        <div className="relative z-10 mb-16 border-l-4 border-[#D42B2B] pl-6 py-2">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4">
            Команден <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Центар</span>
          </h1>
          <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em] max-w-xl">
            // Пристапот е одобрен. Изберете модул за да продолжите со работа.
          </p>
        </div>

        {/* Brutalist Module Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardOptions.map((option, idx) => (
            <Link 
              key={option.title}
              href={option.href}
              className="group block"
            >
              <div className="h-full bg-[#0a0a0a] border-2 border-white/10 hover:border-[#D42B2B] transition-all relative overflow-hidden flex flex-col shadow-[8px_8px_0_0_rgba(255,255,255,0.02)] hover:shadow-[8px_8px_0_0_#D42B2B] hover:-translate-y-1 hover:-translate-x-1">
                
                {/* Protocol Header */}
                <div className="flex items-center justify-between p-4 border-b-2 border-white/10 bg-[#000]">
                  <span className="font-mono text-[#D42B2B] text-[0.65rem] uppercase tracking-widest">
                    МОД_0{idx + 1}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-[#D42B2B] transition-colors" />
                    <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-[#D42B2B] transition-colors" />
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* Brutalist Icon Box */}
                  <div className="w-14 h-14 border-2 border-white/10 bg-black flex items-center justify-center mb-8 group-hover:bg-[#D42B2B] group-hover:border-[#D42B2B] text-white/50 group-hover:text-white transition-all">
                    {option.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-4 group-hover:text-[#D42B2B] transition-colors leading-tight">{option.title}</h3>
                  <p className="text-white/40 font-mono text-xs leading-relaxed mb-10 flex-1">
                    {option.description}
                  </p>

                  <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors border-t-2 border-white/10 pt-4">
                    <span>Отвори модул</span>
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Support Banner (Brutalist) */}
        <div className="relative z-10 mt-16 bg-[#D42B2B] border-2 border-[#D42B2B] p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-black shadow-[8px_8px_0_0_rgba(255,255,255,0.1)]">
          <div className="flex items-start gap-6">
            <Shield className="w-12 h-12 shrink-0 opacity-80" />
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-2">Системска Дијагностика и Поддршка</h4>
              <p className="text-black/70 font-mono text-sm uppercase tracking-wider">ПРЕДУПРЕДУВАЊЕ: Криптиран канал. Само за овластен персонал.</p>
            </div>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-3 group">
            КОНТАКТ
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Structural Footer */}
      <footer className="mt-auto border-t-2 border-white/10 bg-black">
        <div className="max-w-[1600px] mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            СИС_ДАТУМ // {new Date().getFullYear()} // KONTRANS ПРЕМИУМ ПАНЕЛ
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-[#D42B2B] opacity-40" />
              <span className="relative inline-flex h-2 w-2 bg-[#D42B2B]" />
            </span>
            <span className="text-[#D42B2B] font-mono text-[0.65rem] uppercase tracking-[0.2em]">Активна Врска</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
