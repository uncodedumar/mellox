// Cookie Policy content for /cookies. Written to match how the site works today (see components/Analytics.tsx and
// lib/consent.ts). Keep it in step with the tools that are switched on, and have it reviewed before launch.
import type { TermsSection } from "./terms";

export const COOKIES_UPDATED = "6 October 2026";

export const COOKIES: TermsSection[] = [
  {
    id: "what",
    title: "What cookies are",
    paras: [
      "Cookies are small text files stored on your device when you visit a website. Similar technologies, such as local storage and tracking pixels, work in much the same way. They let a site remember who you are, keep you signed in and understand how it is used. In this policy we use the word cookies for all of them.",
    ],
  },
  {
    id: "how",
    title: "How Mellox uses cookies",
    paras: [
      "Mellox uses essential cookies and similar storage to run the site and the app. These are always on because the site cannot work without them.",
      "With your permission we also use analytics tools to understand how mellox.ai is used, and marketing tools to measure our own advertising. These optional tools load only after you accept them. Until you choose, and if you reject them, none of them run and none of their cookies are set.",
    ],
  },
  {
    id: "categories",
    title: "Categories of cookies",
    list: [
      "Essential: needed to sign you in, keep your session and workspace secure, remember your cookie choice and make forms and the site work. These cannot be switched off.",
      "Analytics: optional. Help us understand which pages and features are used, how fast the site loads and where visitors get stuck, so we can improve Mellox. Off unless you accept.",
      "Marketing: optional. Let us measure how our own campaigns on advertising platforms perform. Off unless you accept.",
    ],
  },
  {
    id: "list",
    title: "Cookies and storage we use",
    list: [
      "mellox_consent (cookie, up to 180 days, essential): remembers your cookie choice so we do not ask on every visit.",
      "mellox-consent (local storage, up to 180 days, essential): stores the same choice in your browser, with the date you made it.",
      "Session and security cookies in the app (essential, set when you sign in at app.mellox.ai): keep you signed in and protect your account. They are removed when you sign out or your session ends.",
      "Google Analytics 4 (analytics, Google): cookies such as _ga and _ga_*, kept for up to two years, tell visits apart and count page views and events. We turn on IP anonymisation.",
      "Microsoft Clarity (analytics, Microsoft): cookies such as _clck and _clsk, kept from one day to a year, power heatmaps and session recordings that show how people use a page.",
      "Plausible (analytics, Plausible Analytics): measures page views without cookies and without following you across sites.",
      "Vercel Web Analytics and Speed Insights (analytics, Vercel): measure visits and real page speed without cookies.",
      "Meta Pixel (marketing, Meta): a cookie such as _fbp, kept for up to three months, lets us measure the results of our Facebook and Instagram advertising.",
      "LinkedIn Insight Tag (marketing, LinkedIn): cookies such as bcookie, lidc and li_sugr, kept from a day to a year, let us measure the results of our LinkedIn advertising.",
    ],
    after: "We only load the tools we have set up, so you may not see every one of these. Names and lifetimes are set by each provider and can change. Third party services you connect or visit, such as the social platforms you publish to, set their own cookies under their own policies.",
  },
  {
    id: "consent",
    title: "Your choices and consent",
    paras: [
      "The first time you visit, a banner asks you to accept all cookies or reject the non-essential ones. Rejecting is as easy as accepting, and the site works the same either way. We do not set optional cookies before you choose.",
      "You can change your mind at any time with the Cookie Settings link in the footer of every page, or the button at the top of this policy. Choosing again replaces your earlier choice. If you reject after accepting, the tools stop on your next page load and you can also clear the cookies they have already set in your browser. We ask again after about six months, and whenever we add a new type of cookie.",
    ],
  },
  {
    id: "browser",
    title: "Controlling cookies in your browser",
    paras: [
      "Most browsers let you block or delete cookies in their settings, and can clear local storage as well. Many also support signals such as Global Privacy Control that tell sites not to track you. Blocking essential cookies can stop parts of Mellox from working, for example you may not stay signed in. If you clear your cookies you will be asked for your cookie choice again.",
    ],
  },
  {
    id: "third",
    title: "Third parties",
    paras: [
      "The analytics and marketing cookies above come from the providers named, who act under their own privacy policies and may process data outside your country. Other cookies can come from services we use, such as payment or email providers, or from platforms you connect to your workspace. We only enable optional cookies with your consent.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paras: [
      "We may update this Cookie Policy when our cookies or the law change. The date at the top shows the latest update. For significant changes, such as adding a new tool, we will show the consent banner again.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paras: ["Questions about cookies? Email support@mellox.ai or use our contact page. For how we handle personal information, see our Privacy Policy."],
  },
];
