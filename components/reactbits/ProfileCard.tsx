"use client";

/**
 * ProfileCard — adapted from React Bits (https://reactbits.dev/components/profile-card)
 * The avatar turns to face the cursor anywhere on the page — rotation is computed from
 * the real angle between the image's center and the pointer, not just viewport position,
 * so it reads as "looking at you" rather than a generic tilt. Pure CSS transform.
 * Respects prefers-reduced-motion (effect disabled entirely).
 */

import { useEffect, useRef } from "react";

type ProfileCardProps = {
  avatarSrc: string;
  name: string;
  title: string;
  status?: string;
  className?: string;
};

const MAX_TILT_DEG = 20;
/** cursor distance (px) from the face center at which rotation hits max */
const RANGE_PX = 500;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function ProfileCard({
  avatarSrc,
  name,
  title,
  status = "Available for projects",
  className = "",
}: ProfileCardProps) {
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let mouseX = -9999;
    let mouseY = -9999;

    const applyTilt = () => {
      ticking = false;
      const el = imgWrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;

      const rotateY = clamp(dx / RANGE_PX, -1, 1) * MAX_TILT_DEG;
      const rotateX = clamp(-dy / RANGE_PX, -1, 1) * MAX_TILT_DEG;

      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyTilt);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className={`w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-surface ${className}`}>
      <div className="overflow-hidden [perspective:900px]">
        <div
          ref={imgWrapRef}
          className="origin-bottom transition-transform duration-150 ease-out will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={name}
            className="aspect-[4/5] w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
      <div className="relative border-t border-border bg-surface/95 p-5">
        <p className="font-serif text-xl text-foreground">{name}</p>
        <p className="mt-0.5 text-sm text-muted">{title}</p>
        <p className="mt-3 inline-flex items-center gap-2 text-xs text-gold">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden />
          {status}
        </p>
      </div>
    </div>
  );
}
