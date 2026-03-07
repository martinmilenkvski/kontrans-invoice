import Link from "next/link";
import { Phone } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 w-full z-50 border-b border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-1">
          KON<span className="text-brand-red">TRANS</span>
          <div className="w-2 h-2 rounded-full bg-brand-red ml-1"></div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#home" className="text-white transition-colors">Почетна</Link>
          <Link href="#services" className="hover:text-white transition-colors">Услуги</Link>
          <Link href="#about" className="hover:text-white transition-colors">За Нас</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Контакт</Link>
        </nav>

        {/* Contact Info */}
        <div className="hidden md:flex items-center gap-2 text-white text-sm font-medium">
          <div className="bg-white/10 p-2 rounded-full">
            <Phone className="w-4 h-4 text-brand-red" />
          </div>
          <a href="tel:+38970123456" className="hover:text-brand-red transition-colors">
            +389 70 123 456
          </a>
        </div>
      </div>
    </header>
  );
}
