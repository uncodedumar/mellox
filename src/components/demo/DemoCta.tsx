import CtaBand from "@/components/cta/CtaBand";

/** Sales-led call to action: "Book a demo" first, "Start free" second. Used on pricing, compare and similar pages. */
export default function DemoCta({
  title = "Want to see it on your own brand?",
  text = "Book a demo and we will walk through Mellox using your website, then help you pick the right plan.",
  interest,
}: {
  title?: string;
  text?: string;
  /** preselects the demo form: scale | agency | startup | in-house */
  interest?: string;
}) {
  return (
    <CtaBand
      title={title}
      text={text}
      primary={{ label: "Book a demo", href: interest ? `/demo?interest=${interest}` : "/demo" }}
      secondary={{ label: "Start free", href: "https://app.mellox.ai" }}
    />
  );
}
