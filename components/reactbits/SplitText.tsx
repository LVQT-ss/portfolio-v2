"use client";

/**
 * SplitText — adapted from React Bits (https://reactbits.dev/text-animations/split-text)
 * Word-level GSAP stagger reveal. Lightweight: no SplitText plugin, no ScrollTrigger.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number; // seconds before the animation starts
  stagger?: number; // seconds between words
  as?: "h1" | "h2" | "p" | "span";
};

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");

    if (prefersReduced) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      words,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger,
        delay,
      }
    );
    return () => {
      tween.kill();
    };
  }, [delay, stagger]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-1 align-bottom">
          <span data-word className="inline-block opacity-0 will-change-transform">
            {word}
            {" "}
          </span>
        </span>
      ))}
    </Tag>
  );
}
