"use client";

import { useState } from "react";
import { contact, site } from "@/content/site";
import { FiMail, FiCalendar, FiLinkedin, FiBriefcase } from "react-icons/fi";

const isPlaceholder = (s: string) => s.includes("[");

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-gold focus:outline-none";

  return (
    <section id="contact" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{contact.title}</h2>
          <p className="mt-3 max-w-md text-muted">{contact.body}</p>
          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-foreground/90 hover:text-gold"
            >
              <FiMail aria-hidden className="text-gold" /> {site.email}
            </a>
            {!isPlaceholder(site.links.upwork) && (
              <a
                href={site.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/90 hover:text-gold"
              >
                <FiBriefcase aria-hidden className="text-gold" /> Hire me on Upwork
              </a>
            )}
            {!isPlaceholder(site.links.calendly) && (
              <a
                href={site.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/90 hover:text-gold"
              >
                <FiCalendar aria-hidden className="text-gold" /> Book a call
              </a>
            )}
            {!isPlaceholder(site.links.linkedin) && (
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/90 hover:text-gold"
              >
                <FiLinkedin aria-hidden className="text-gold" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
              Name
            </label>
            <input id="name" name="name" required maxLength={100} className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
              Email
            </label>
            <input id="email" name="email" type="email" required maxLength={200} className={inputClass} placeholder="you@company.com" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={5000}
              rows={5}
              className={inputClass}
              placeholder="What are you building?"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-gold px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-gold">Thanks — I&apos;ll get back to you within 24 hours.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Email me directly at {site.email}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
