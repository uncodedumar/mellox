import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

let ipCounter = 0;
const post = (body: unknown, ip = `10.0.0.${++ipCounter}`) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
  );

const validDemo = {
  form: "demo",
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  website: "https://example.com",
  interest: "Agency (multiple client brands)",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "sales@example.com");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends a demo request through Resend", async () => {
    const res = await post(validDemo);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const [url, init] = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const sent = JSON.parse(init.body);
    expect(sent.to).toEqual(["sales@example.com"]);
    expect(sent.reply_to).toBe("ada@example.com");
    expect(sent.subject).toContain("Demo request");
  });

  it("rejects an invalid email", async () => {
    const res = await post({ ...validDemo, email: "not-an-email" });
    expect(res.status).toBe(400);
  });

  it("requires the required fields", async () => {
    const res = await post({ ...validDemo, company: "" });
    expect(res.status).toBe(400);
  });

  it("rejects an unknown form", async () => {
    const res = await post({ ...validDemo, form: "nope" });
    expect(res.status).toBe(400);
  });

  it("pretends success for bots that fill the honeypot, without sending", async () => {
    const res = await post({ ...validDemo, website_url: "spam" });
    expect(res.status).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("fails clearly when email is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await post(validDemo);
    expect(res.status).toBe(500);
  });

  it("throttles repeated submissions from one address", async () => {
    const ip = "203.0.113.9";
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await post(validDemo, ip)).status);
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(statuses[6]).toBe(429);
  });
});
