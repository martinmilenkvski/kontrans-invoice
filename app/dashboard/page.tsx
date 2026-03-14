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
    <main className="min-h-screen bg-[#080808] text-white font-sans flex flex-col">
      {/* Sidebar / Top Nav */}
      <header className="border-b border-white/5 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <span className="text-sm font-black tracking-[0.12em] uppercase">
                KON<span className="text-[#D42B2B]">TRANS</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-white/40">
              <ChevronRight className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                <LayoutDashboard className="w-3 h-3" />
                Контролна табла
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            Одјави се
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Добредојдовте назад, Админ</h1>
          <p className="text-white/40">Изберете модул за да продолжите со работа</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardOptions.map((option) => (
            <Link 
              key={option.title}
              href={option.href}
              className="group block"
            >
              <div className={`h-full bg-[#111111] border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
                {/* Visual indicator corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${option.color.replace('text-', 'bg-')}`} />
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${option.color} border ${option.border}`}>
                  {option.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#D42B2B] transition-colors">{option.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {option.description}
                </p>

                <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/40 group-hover:text-white transition-colors">
                  <span>Отвори модул</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D42B2B] group-hover:border-[#D42B2B] transition-all">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats or Footer section for the DASHBOARD */}
        <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-lg font-bold mb-1">Потребна ви е помош?</h4>
            <p className="text-white/40 text-sm">Доколку имате технички проблеми контактирајте ја поддршката.</p>
          </div>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
            Контактирај поддршка
          </button>
        </div>
      </div>

      <footer className="mt-auto py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/20 text-[0.65rem] uppercase tracking-[0.2em]">
            &copy; 2024 KONTRANS INVOICE SYSTEM &bull; ПРЕМИУМ ПАНЕЛ
          </p>
        </div>
      </footer>
    </main>
  );
}
