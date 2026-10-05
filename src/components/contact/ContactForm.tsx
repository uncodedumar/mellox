"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Field, FormConfig } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({
  config,
  id = "form",
  defaults = {},
}: {
  config: FormConfig;
  id?: string;
  /** optional prefilled values by field name (selects fall back to their first option if the value is not an option) */
  defaults?: Record<string, string>;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const payload = { form: config.key, ...Object.fromEntries(new FormData(formEl)) };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      formEl.reset();
      setStatus("sent");
      trackEvent("generate_lead", { form: config.key });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  // consecutive "half" fields share a row
  const isHalf = (f: Field) => "half" in f && !!f.half;
  const rows: Field[][] = [];
  config.fields.forEach((f) => {
    const last = rows[rows.length - 1];
    if (isHalf(f) && last && isHalf(last[0]) && last.length < 2) last.push(f);
    else rows.push([f]);
  });

  if (status === "sent") {
    return (
      <div id={id} className="px-card ct-form ct-done" role="status">
        <CheckCircle2 size={48} strokeWidth={1.4} aria-hidden="true" />
        <h3>{config.success?.title ?? "Message sent"}</h3>
        <p>{config.success?.text ?? "Thanks, we have it. A real person on the Mellox team will reply to the email address you gave us."}</p>
        <button type="button" className="px-cta hero-cta" onClick={() => setStatus("idle")}>
          {config.success?.again ?? "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form id={id} className="px-card ct-form" onSubmit={onSubmit} data-reveal>
      <h3>{config.title}</h3>
      {/* honeypot: hidden from people, filled in by bots */}
      <div className="ct-hp" aria-hidden="true">
        <label htmlFor={`${id}-hp`}>Leave this field empty</label>
        <input id={`${id}-hp`} name="website_url" tabIndex={-1} autoComplete="off" />
      </div>
      {rows.map((row) => (
        <div key={row[0].name} className={row.length > 1 ? "row" : undefined}>
          {row.map((f) => {
            const fid = `${id}-${f.name}`;
            return (
              <div className="ct-field" key={f.name}>
                <label htmlFor={fid}>{f.label}</label>
                {f.type === "select" ? (
                  <select id={fid} name={f.name} defaultValue={f.options.includes(defaults[f.name]) ? defaults[f.name] : f.options[0]}>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea id={fid} name={f.name} required={f.required} placeholder={f.placeholder} maxLength={5000} defaultValue={defaults[f.name]} />
                ) : (
                  <input
                    id={fid}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    maxLength={300}
                    defaultValue={defaults[f.name]}
                    autoComplete={f.name === "name" ? "name" : f.name === "email" ? "email" : undefined}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
      <button type="submit" className="px-cta px-cta-lime" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : config.submit}
      </button>
      <p className={`ct-fine ${status === "error" ? "ct-err" : ""}`} role={status === "error" ? "alert" : "status"}>
        {status === "error" ? error : "We reply from a real inbox. Your details are only used to answer you."}
      </p>
    </form>
  );
}
