import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { TERMS, TERMS_UPDATED } from "@/lib/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use Mellox AI: accounts, plans and credits, your content, AI output, acceptable use and more.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      icon={<ScrollText size={26} strokeWidth={1.4} aria-hidden="true" />}
      pill="Legal"
      title="Terms of Service"
      updated={TERMS_UPDATED}
      intro={
        <>
          Please read these Terms carefully. They explain what you can expect from Mellox and what we expect from you.
          Questions? <Link href="/contact">Contact us</Link>.
        </>
      }
      sections={TERMS}
    />
  );
}
