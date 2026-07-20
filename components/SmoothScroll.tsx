"use client";

/**
 * Global Lenis smooth-scroll — momentum-eased scrolling for the whole page.
 * Synced to GSAP's ticker so ScrollReveal's scrub animations stay in lockstep
 * with Lenis's eased scroll position instead of drifting a frame behind.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // exposed so in-page anchor links can drive it directly (see lib/smoothScrollTo.ts) —
    // Lenis's own built-in `anchors` option doesn't call preventDefault(), so the native
    // instant jump would otherwise race the smooth animation and win.
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const syncToGsapTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(syncToGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(syncToGsapTicker);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, []);

  return null;
}
