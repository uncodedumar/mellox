import type { FormConfig, FormKey } from "./contact";

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const THEME: Record<FormKey, { label: string; accent: string; blurb: string }> = {
  support: { label: "Support message", accent: "#cbe960", blurb: "A visitor wrote to the support team." },
  press: { label: "Press and media request", accent: "#fe7032", blurb: "A journalist or outlet is asking for your time." },
  partner: { label: "Partnership enquiry", accent: "#4f8bff", blurb: "A company wants to work with Mellox." },
  demo: { label: "Demo request", accent: "#cbe960", blurb: "A prospect would like a Mellox demo. Reply soon." },
};

type Entry = { label: string; value: string; long: boolean };

export function buildEmail(config: FormConfig, values: Record<string, string>, meta: { receivedAt: string }) {
  const t = THEME[config.key];
  const name = values.name || "Someone";
  const email = values.email;

  const entries: Entry[] = config.fields
    .filter((f) => f.name !== "name" && f.name !== "email" && values[f.name])
    .map((f) => ({ label: f.label, value: values[f.name], long: f.type === "textarea" }));
  const short = entries.filter((e) => !e.long);
  const long = entries.filter((e) => e.long);

  const subject = `[${config.subjectTag}] ${name}${values.company ? ` from ${values.company}` : values.outlet ? ` at ${values.outlet}` : ""}`;

  const cell = (e: Entry) => `
    <tr><td style="padding:14px 0;border-top:1px solid #1f2733;">
      <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7c88b0;font-weight:600;">${esc(e.label)}</div>
      <div style="margin-top:6px;font-size:16px;line-height:1.5;color:#ffffff;">${esc(e.value)}</div>
    </td></tr>`;

  const longBlock = (e: Entry) => `
    <div style="margin-top:22px;">
      <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7c88b0;font-weight:600;">${esc(e.label)}</div>
      <div style="margin-top:10px;padding:18px 20px;background:#0b0e14;border:1px solid #1f2733;border-left:3px solid ${t.accent};border-radius:12px;font-size:16px;line-height:1.65;color:#e8ecf7;white-space:pre-wrap;">${esc(e.value)}</div>
    </div>`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#030405;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(name)}: ${esc((long[0]?.value || t.blurb).slice(0, 110))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#030405" style="background:#030405;">
<tr><td align="center" style="padding:36px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr><td style="padding:0 4px 20px;">
      <span style="font-size:20px;font-weight:700;letter-spacing:0.14em;color:#ffffff;">MELLOX</span>
      <span style="float:right;font-size:12px;color:#6f7aa3;padding-top:6px;">${esc(meta.receivedAt)}</span>
    </td></tr>
    <tr><td bgcolor="#080b10" style="background:#080b10;border:1px solid #1f2733;border-radius:24px;overflow:hidden;">
      <div style="height:4px;background:linear-gradient(90deg,#fe7032,${t.accent},#0756e7);"></div>
      <div style="padding:34px 32px 30px;">
        <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:${t.accent}22;border:1px solid ${t.accent}66;color:${t.accent};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${esc(t.label)}</span>
        <h1 style="margin:18px 0 6px;font-size:28px;line-height:1.2;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">${esc(name)}</h1>
        <p style="margin:0;font-size:15px;color:#8b97c2;">${esc(t.blurb)}</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr><td style="padding:14px 0;border-top:1px solid #1f2733;">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7c88b0;font-weight:600;">Email</div>
            <div style="margin-top:6px;font-size:16px;"><a href="mailto:${esc(email)}" style="color:${t.accent};text-decoration:none;">${esc(email)}</a></div>
          </td></tr>
          ${short.map(cell).join("")}
        </table>
        ${long.map(longBlock).join("")}

        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:30px;"><tr>
          <td bgcolor="${t.accent}" style="border-radius:999px;background:${t.accent};">
            <a href="mailto:${esc(email)}?subject=${encodeURIComponent(`Re: ${config.subjectTag} from Mellox`)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:#0b1004;text-decoration:none;">Reply to ${esc(name.split(" ")[0])}</a>
          </td>
        </tr></table>
        <p style="margin:14px 0 0;font-size:13px;color:#6f7aa3;">Replying to this email also goes straight to ${esc(name.split(" ")[0])}.</p>
      </div>
    </td></tr>
    <tr><td style="padding:22px 8px 0;text-align:center;font-size:12px;line-height:1.6;color:#566086;">
      Sent from the Mellox website contact form.<br>You are receiving this because it is the Mellox support inbox.
    </td></tr>
  </table>
</td></tr></table></body></html>`;

  const text = [
    `${t.label.toUpperCase()}`,
    `From: ${name} <${email}>`,
    ...short.map((e) => `${e.label}: ${e.value}`),
    ...long.map((e) => `\n${e.label}:\n${e.value}`),
    `\nReceived ${meta.receivedAt}`,
  ].join("\n");

  return { subject, html, text };
}
