import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { faqs } from "@/lib/faqs";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Mellox, the AI marketing platform.",
};

export default function FaqPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#030405] text-white">
      <JsonLd data={faqJsonLd(faqs)} />
      <Navbar />
      <Faq
        standalone
        items={faqs}
        title="All your questions, answered"
        blurb="Everything you need to know about how Mellox works."
      />
      <div className="bg-[#030405] pb-20 text-center">
        <Link href="/" className="text-[15px] text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-lime">
          Back to home
        </Link>
      </div>
    </div>
  );
}
