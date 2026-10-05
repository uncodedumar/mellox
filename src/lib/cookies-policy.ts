// Cookie Policy content for /cookies. Draft written to match how the site works today; review before launch.
import type { TermsSection } from "./terms";

export const COOKIES_UPDATED = "5 October 2026";

export const COOKIES: TermsSection[] = [
  {
    id: "what",
    title: "What cookies are",
    paras: [
      "Cookies are small text files stored on your device when you visit a website. Similar technologies, such as local storage, work in the same way. They let a site remember who you are, keep you signed in and understand how it is used. In this policy we use the word cookies for all of them.",
    ],
  },
  {
    id: "how",
    title: "How Mellox uses cookies",
    paras: [
      "Mellox uses essential cookies and similar storage to run the site and the app. At the time of the last update, mellox.ai does not load analytics or advertising cookies.",
      "If we add analytics or marketing tools in future, they stay switched off until you accept them, and we will update this page and ask for your choice again.",
    ],
  },
  {
    id: "categories",
    title: "Categories of cookies",
    list: [
      "Essential: needed to sign you in, keep your session and workspace secure, remember your cookie choice and make forms and the site work. These cannot be switched off.",
      "Analytics: optional. Help us understand which pages and features are used so we can improve the product. Off unless you accept.",
      "Marketing: optional. Let us measure our own campaigns and show relevant Mellox messages on other sites and platforms. Off unless you accept.",
    ],
  },
  {
    id: "list",
    title: "Cookies and storage we use",
    list: [
      "mellox_consent (cookie, up to 180 days, essential): remembers your cookie choice so we do not ask on every visit.",
      "mellox-consent (local storage, up to 180 days, essential): stores the same choice in your browser, with the date you made it.",
      "Session and security cookies in the app (essential, set when you sign in at app.mellox.ai): keep you signed in and protect your account. They are removed when you sign out or your session ends.",
    ],
    after: "Names and lifetimes can change as the product changes. Third party services you connect or visit, such as the social platforms you publish to, set their own cookies under their own policies.",
  },
  {
    id: "consent",
    title: "Your choices and consent",
    paras: [
      "The first time you visit, a banner asks you to accept all cookies, reject non-essential ones, or customise your choice. We do not set optional cookies before you choose.",
      "You can change your mind at any time with the Cookie Settings link in the footer of every page, or the button at the top of this policy. We ask again after about six months, and whenever we add a new type of cookie.",
    ],
  },
  {
    id: "browser",
    title: "Controlling cookies in your browser",
    paras: [
      "Most browsers let you block or delete cookies in their settings, and can clear local storage as well. Blocking essential cookies can stop parts of Mellox from working, for example you may not stay signed in. If you clear your cookies you will be asked for your cookie choice again.",
    ],
  },
  {
    id: "third",
    title: "Third parties",
    paras: [
      "Some cookies come from services we use, such as payment, email or analytics providers, or from platforms you connect to your workspace. These providers act under their own policies, and we only enable optional ones with your consent.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paras: [
      "We may update this Cookie Policy when our cookies or the law change. The date at the top shows the latest update. For significant changes we will show the consent banner again.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paras: ["Questions about cookies? Email support@mellox.ai or use our contact page. For how we handle personal information, see our Privacy Policy."],
  },
];
