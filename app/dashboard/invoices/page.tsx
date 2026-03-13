"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function InvoicesPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.print();
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col">
      {/* Navigation Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a] h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold uppercase tracking-widest">Преглед на фактура</h1>
            <span className="text-[0.65rem] text-white/40 uppercase tracking-tight">kontrans-invoice-FINAL-2026.html</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Printer className="w-4 h-4" />
            Печати
          </button>
          <a 
            href="/kontrans-invoice-FINAL-2026.html" 
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#D42B2B] hover:bg-[#b02424] rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Download className="w-4 h-4" />
            Преземи
          </a>
        </div>
      </header>

      {/* Invoice Content */}
      <div className="flex-1 bg-neutral-900 overflow-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-5xl h-full min-h-[1200px] bg-white rounded-sm shadow-2xl relative">
          <iframe 
            ref={iframeRef}
            src="/kontrans-invoice-FINAL-2026.html" 
            className="w-full h-full border-none absolute inset-0"
            title="Invoice Preview"
          />
        </div>
      </div>
    </main>
  );
}
