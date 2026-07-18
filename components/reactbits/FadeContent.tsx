"use client";

/**
 * FadeContent — adapted from React Bits (https://reactbits.dev/animations/fade-content)
 * Scroll-into-view reveal via IntersectionObserver + CSS transition.
 * Zero JS animation library cost; respects prefers-reduced-motion via CSS media query.
 */

import { useEffect, useRef, useState } from "react";

type FadeContentProps = {
  children: React.ReactNode;
  className?: string;
  /** ms transition delay, for staggering siblings */
  delay?: number;
  /** px translate-y before reveal */
  distance?: number;
  threshold?: number;
};

export default function FadeContent({
  children,
  className = "",
  delay = 0,
  distance = 28,
  threshold = 0.15,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? undefined : `translateY(${distance}px)`,
      }}
    >
      {children}
    </div>
  );
}
