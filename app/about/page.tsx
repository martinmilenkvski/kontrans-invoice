import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "За нас | Kontrans",
  description: "Дознајте повеќе за историјата, вредностите и посветеноста на Контранс во светот на логистиката од 2003 година.",
};

export default function AboutPage() {
  return <AboutContent />;
}
