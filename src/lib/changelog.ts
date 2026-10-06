// Changelog content for /changelog. To add a release, put a new entry at the TOP of RELEASES.
// (The page sorts by date, so the order here does not matter.) Each change has a type:
//   "new" (a new feature), "improved" (something got better) or "fixed" (a bug fix).
// `image` is optional: put the file in public/changelog/ and use "/changelog/your-image.webp".
//
// NOTE: the entries below are SAMPLE content. Replace them with your real release notes.

export type ChangeType = "new" | "improved" | "fixed";

export type Release = {
  /** ISO date, e.g. "2026-10-05" */
  date: string;
  /** Optional label, e.g. "v1.2" */
  version?: string;
  title: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  changes: { type: ChangeType; text: string }[];
};

export const RELEASES: Release[] = [
  {
    date: "2026-10-06",
    version: "v1.3",
    title: "Autopilot, MCP and your favourite tools",
    summary: "Mellox now runs the workflow for you, works inside Claude and ChatGPT, and plugs into Slack, Notion and Canva.",
    changes: [
      { type: "new", text: "Autopilot mode: Mellox does the work while you sit back and watch." },
      { type: "new", text: "MCP connection: use Mellox from inside Claude and ChatGPT." },
      { type: "new", text: "Slack and Notion integrations." },
      { type: "new", text: "Every generated image can now be fully edited in Canva." },
    ],
  },
  {
    date: "2026-10-05",
    version: "v1.2",
    title: "Meet Mellox Nebula",
    summary: "A new default model for everyday marketing work, plus more control over how closely it follows your brand.",
    changes: [
      { type: "new", text: "Mellox Nebula is now the default model for posts, images and research." },
      { type: "new", text: "Style picker: choose Brand DNA only, or loosen it for a more experimental result." },
      { type: "improved", text: "Starting from your website is faster: paste your URL and go." },
    ],
  },
  {
    date: "2026-09-18",
    version: "v1.1",
    title: "See how AI describes your brand",
    summary: "Check how assistants such as ChatGPT, Gemini and Perplexity talk about you, and what to fix first.",
    changes: [
      { type: "new", text: "AI search checks that show whether, and how, each assistant mentions your brand." },
      { type: "improved", text: "Clearer next-step suggestions after every check." },
    ],
  },
  {
    date: "2026-09-02",
    version: "v1.0",
    title: "Mellox is live",
    summary: "The first release of the AI marketing platform for agencies and startups.",
    changes: [
      { type: "new", text: "Brand DNA: a profile of your voice, audience and look, built from your website." },
      { type: "new", text: "Create and plan content that follows your Brand DNA." },
      { type: "new", text: "Workspaces for managing more than one brand from a single account." },
    ],
  },
];

export const CHANGE_LABEL: Record<ChangeType, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
};
