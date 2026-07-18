"use client";

/**
 * SpotlightCard — adapted from React Bits (https://reactbits.dev/components/spotlight-card)
 * Pure CSS radial-gradient spotlight following the cursor. No animation library.
 */

import { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(200, 169, 110, 0.14)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
