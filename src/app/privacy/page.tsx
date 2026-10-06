import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import LegalPage from "@/components/legal/LegalPage";
import Rich from "@/components/legal/Rich";
import { PRIVACY, PRIVACY_PREFACE, PRIVACY_UPDATED } from "@/lib/privacy";

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
      intro={PRIVACY_PREFACE.map((p) => (
        <p key={p}>
          <Rich text={p} />
        </p>
      ))}
      sections={PRIVACY}
    />
  );
}
