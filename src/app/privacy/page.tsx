import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY, PRIVACY_UPDATED } from "@/lib/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mellox AI collects, uses and protects your information, and the choices and rights you have.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      icon={<ShieldCheck size={26} strokeWidth={1.4} aria-hidden="true" />}
      pill="Legal"
      title="Privacy Policy"
      updated={PRIVACY_UPDATED}
      intro={
        <>
          Your trust matters. This policy explains what we collect, why we collect it and the choices you have. We
          never sell your personal information. Questions? <Link href="/contact">Contact us</Link>.
        </>
      }
      sections={PRIVACY}
    />
  );
}
