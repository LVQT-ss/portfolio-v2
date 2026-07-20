"use client";

/**
 * ScrollFade — GSAP ScrollTrigger scrub reveal for a single block.
 * Unlike FadeContent (IntersectionObserver, fires once), opacity/position track
 * scroll progress directly and reverse on scroll-up — each part of a long
 * section reveals in step with the scrollbar instead of all firing on enter.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollFadeProps = {
  children: React.ReactNode;
  className?: string;
  /** px translate-y before reveal */
  distance?: number;
  /** scroll-trigger start point, e.g. "top bottom-=10%" */
  start?: string;
  /** scroll-trigger end point — fully revealed once reached */
  end?: string;
};

export default function ScrollFade({
  children,
  className = "",
  distance = 32,
  start = "top bottom-=10%",
  end = "top center",
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: distance },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [distance, start, end]);

  return (
    <div ref={ref} className={`motion-reduce:opacity-100 ${className}`}>
      {children}
    </div>
  );
}
