"use client";

/**
 * ProfileCard — adapted from React Bits (https://reactbits.dev/components/profile-card)
 * Mouse-tracked 3D tilt + holographic shine. Pure CSS transforms, no animation library.
 * Respects prefers-reduced-motion (tilt disabled, shine stays static).
 */

import { useRef } from "react";

type ProfileCardProps = {
  avatarSrc: string;
  name: string;
  title: string;
  status?: string;
  className?: string;
};

export default function ProfileCard({
  avatarSrc,
  name,
  title,
  status = "Available for projects",
  className = "",
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;

    el.style.setProperty("--rx", `${rotateX}deg`);
    el.style.setProperty("--ry", `${rotateY}deg`);
    el.style.setProperty("--shine-x", `${px * 100}%`);
    el.style.setProperty("--shine-y", `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-surface transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* holographic shine */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(200,169,110,0.25), transparent 60%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt={name}
          className="aspect-[4/5] w-full object-cover"
          loading="lazy"
        />
        <div className="relative border-t border-border bg-surface/95 p-5">
          <p className="font-serif text-xl text-foreground">{name}</p>
          <p className="mt-0.5 text-sm text-muted">{title}</p>
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-gold">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
