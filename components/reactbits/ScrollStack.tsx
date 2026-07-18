"use client";

/**
 * ScrollStack — adapted from React Bits (https://reactbits.dev/components/scroll-stack)
 * Cards pin via `position: sticky` and scale down as the next card stacks over them.
 * Driven by a single rAF-throttled scroll listener — no animation library.
 */

import { Children, useEffect, useRef } from "react";

type ScrollStackProps = {
  children: React.ReactNode;
  className?: string;
  /** px gap between each pinned card's sticky offset */
  stackGap?: number;
  /** sticky offset (px) for the first card, e.g. below a fixed nav */
  topOffset?: number;
};

export default function ScrollStack({
  children,
  className = "",
  stackGap = 22,
  topOffset = 96,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  cardRefs.current = [];

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) {
          card.style.setProperty("--stack-scale", "1");
          card.style.setProperty("--stack-fade", "1");
          return;
        }
        const cardRect = card.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        const overlap = cardRect.bottom - nextRect.top;
        const progress = Math.min(Math.max(overlap / cardRect.height, 0), 1);
        card.style.setProperty("--stack-scale", `${1 - progress * 0.06}`);
        card.style.setProperty("--stack-fade", `${1 - progress * 0.55}`);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {Children.map(children, (child, i) => (
        <div
          ref={(el) => {
            if (el) cardRefs.current[i] = el;
          }}
          className="sticky origin-top transition-[filter] duration-200 will-change-transform"
          style={{
            top: `${topOffset + i * stackGap}px`,
            zIndex: i + 1,
            transform: "scale(var(--stack-scale, 1))",
            filter: "brightness(var(--stack-fade, 1))",
            marginBottom: i === 0 ? undefined : "2.5rem",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
