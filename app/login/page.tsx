"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check
    if (username === "admin" && password === "admin") {
      // In a real app, we'd set a cookie or JWT here
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Невалидно корисничко име или лозинка");
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center p-6 font-sans">
      <div className="absolute top-10 left-10">
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="text-lg font-black tracking-[0.12em] uppercase text-white">
            KON<span className="text-[#D42B2B]">TRANS</span>
          </span>
          <span className="relative flex h-1.5 w-1.5 ml-0.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D42B2B] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D42B2B]" />
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D42B2B]/10 blur-[100px] rounded-full group-hover:bg-[#D42B2B]/20 transition-all duration-700" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-[#D42B2B]/10 rounded-2xl flex items-center justify-center border border-[#D42B2B]/20">
                <ShieldCheck className="w-8 h-8 text-[#D42B2B]" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">Пријави се</h1>
            <p className="text-white/50 text-center text-sm mb-8">Внесете ги вашите податоци за пристап до панелот</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-widest text-white/40 ml-1">Корисничко име</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D42B2B]/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-widest text-white/40 ml-1">Лозинка</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D42B2B]/50 transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-[#D42B2B] text-xs font-medium text-center bg-[#D42B2B]/10 py-2 rounded-lg border border-[#D42B2B]/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#D42B2B] hover:bg-[#b02222] text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
              >
                Најави се
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <Link href="/" className="text-white/40 hover:text-white text-xs transition-colors">
                Назад кон почетна
              </Link>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-white/20 text-[0.65rem] uppercase tracking-[0.2em]">
          &copy; 2024 KONTRANS INVOICE SYSTEM
        </p>
      </div>
    </main>
  );
}
