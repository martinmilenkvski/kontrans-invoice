import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Контакт | Kontrans",
  description: "Кон-транс Шипинг. Контактирајте не за понуди, консултации и поддршка.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
