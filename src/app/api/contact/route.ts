import { NextResponse } from "next/server";
import { FORMS, type FormKey } from "@/lib/contact";
import { buildEmail } from "@/lib/email-template";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = 5000;

// tiny in-memory throttle: 5 submissions per IP per 10 minutes (per server instance)
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return fail("Email is not configured on the server.", 500);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (throttled(ip)) return fail("Too many messages. Please try again in a few minutes.", 429);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  // honeypot: bots fill the hidden field. Pretend success so they do not retry.
  if (typeof body.website_url === "string" && body.website_url.trim() !== "") return NextResponse.json({ ok: true });

  const config = FORMS[body.form as FormKey];
  if (!config) return fail("Unknown form.");

  const values: Record<string, string> = {};
  for (const f of config.fields) {
    const raw = typeof body[f.name] === "string" ? (body[f.name] as string).trim() : "";
    if (raw.length > MAX_LEN) return fail(`${f.label} is too long.`);
    if (f.type === "select") {
      values[f.name] = f.options.includes(raw) ? raw : f.options[0];
      continue;
    }
    if ("required" in f && f.required && !raw) return fail(`${f.label} is required.`);
    if (f.type === "email" && !EMAIL_RE.test(raw)) return fail("Please enter a valid email address.");
    if (f.type === "url" && raw && !/^https?:\/\/\S+\.\S+/i.test(raw)) return fail(`${f.label} must start with http:// or https://.`);
    values[f.name] = raw;
  }

  const { subject, html, text } = buildEmail(config, values, {
    receivedAt: new Date().toUTCString().replace(" GMT", " UTC"),
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Mellox Website <onboarding@resend.dev>",
      to: [to],
      reply_to: values.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return fail("We could not send your message. Please email support@mellox.ai directly.", 502);
  }
  return NextResponse.json({ ok: true });
}
