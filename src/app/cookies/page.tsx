import type { Metadata } from "next";
import { Cookie } from "lucide-react";
import Link from "next/link";
import CookieSettingsButton from "@/components/legal/CookieSettingsButton";
import LegalPage from "@/components/legal/LegalPage";
import { COOKIES, COOKIES_UPDATED } from "@/lib/cookies-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies Mellox AI uses, why we use them, and how to change your cookie choices at any time.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      icon={<Cookie size={26} strokeWidth={1.4} aria-hidden="true" />}
      pill="Legal"
      title="Cookie Policy"
      updated={COOKIES_UPDATED}
      intro={
        <>
          This policy explains the cookies Mellox uses and the choices you have. For how we handle personal
          information more broadly, see our <Link href="/privacy">Privacy Policy</Link>.{" "}
          <CookieSettingsButton className="lg-btn">Manage cookie preferences</CookieSettingsButton>
        </>
      }
      sections={COOKIES}
    />
  );
}
