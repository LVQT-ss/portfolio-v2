"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { testimonials, testimonialsFallback } from "@/content/site";
import { smoothScrollTo } from "@/lib/smoothScrollTo";

const isPlaceholder = (s: string) => s.includes("[");

/** how much extra scroll (in vh) the pinned reveal holds the section for */
const PIN_VH = 120;

export default function Testimonials() {
  const real = testimonials.filter((t) => !isPlaceholder(t.quote));
  const pinRef = useRef<HTMLElement | null>(null);

  if (real.length === 0) {
    return (
      <section
        ref={pinRef}
        id="testimonials"
        className="relative border-t border-border/60"
        style={{ height: `calc(100vh + ${PIN_VH}vh)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal
              triggerRef={pinRef}
              baseOpacity={0}
              enableBlur
              baseRotation={5}
              blurStrength={10}
              textClassName="font-serif text-foreground"
            >
              {testimonialsFallback}
            </ScrollReveal>
            <a
              href="#contact"
              onClick={(e) => smoothScrollTo(e, "#contact")}
              className="mt-8 inline-block rounded-md bg-gold px-7 py-3 text-sm font-bold tracking-wide text-background uppercase transition-opacity hover:opacity-90"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">What clients say</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {real.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-border bg-surface p-6">
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium text-foreground">{t.author}</span>
                <span className="text-muted"> — {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
