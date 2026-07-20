"use client";

/**
 * HeroFace — the original memoji artwork with live eyes.
 * The irises were removed from the base image (public/images/hero-face.png)
 * and are re-drawn here as CSS gradients so they can look at the cursor.
 * The whole head adds a subtle 3D parallax tilt on top.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";

type HeroFaceProps = {
  className?: string;
};

/** eye geometry, as fractions of the (square) image */
const EYES = [
  // left eye
  { cx: 0.3687, cy: 0.4932, openCx: 0.3638, openCy: 0.4937, openRx: 0.0488, openRy: 0.0308 },
  // right eye
  { cx: 0.6226, cy: 0.4956, openCx: 0.6201, openCy: 0.4941, openRx: 0.0562, openRy: 0.0327 },
];

/** iris diameter as a fraction of image width (measured from the artwork) */
const IRIS_SIZE = 0.0781;
/** how far the iris may travel, as a fraction of image width */
const MAX_SHIFT_X = 0.016;
const MAX_SHIFT_Y = 0.008;
/** head parallax tilt (deg) */
const MAX_TILT = 7;
/** cursor distance (px) from the face at which the look hits max */
const RANGE_PX = 450;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function HeroFace({ className = "" }: HeroFaceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const irisRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0; // target, -1..1
    let ty = 0;
    let cx = 0; // current (smoothed)
    let cy = 0;

    const onMouseMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      tx = clamp(dx / RANGE_PX, -1, 1);
      ty = clamp(dy / RANGE_PX, -1, 1);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const wrap = wrapRef.current;
      const head = headRef.current;
      if (!wrap || !head) return;

      // eyes react faster than the head — reads as "looking", not "tilting"
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;

      const w = wrap.clientWidth;
      const ix = cx * MAX_SHIFT_X * w;
      const iy = cy * MAX_SHIFT_Y * w;
      for (const iris of irisRefs.current) {
        if (iris) iris.style.transform = `translate(${ix}px, ${iy}px)`;
      }

      head.style.transform = `rotateY(${cx * MAX_TILT}deg) rotateX(${-cy * MAX_TILT * 0.6}deg)`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`w-full max-w-sm select-none [perspective:900px] ${className}`}
    >
      <div
        ref={headRef}
        className="relative aspect-square will-change-transform"
        style={{ filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.45))" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-face.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full"
          loading="eager"
        />

        {EYES.map((eye, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              clipPath: `ellipse(${eye.openRx * 100}% ${eye.openRy * 100}% at ${
                eye.openCx * 100
              }% ${eye.openCy * 100}%)`,
            }}
          >
            <div
              ref={(el) => {
                irisRefs.current[i] = el;
              }}
              className="absolute rounded-full will-change-transform"
              style={{
                width: `${IRIS_SIZE * 100}%`,
                aspectRatio: "1",
                left: `${(eye.cx - IRIS_SIZE / 2) * 100}%`,
                top: `${(eye.cy - IRIS_SIZE / 2) * 100}%`,
                background:
                  "radial-gradient(circle at 50% 50%, #1a1918 0% 60%, #241d16 68%, #5a4129 80%, #6b4d31 90%, #3d2c1c 100%)",
                boxShadow: "inset 0 3px 5px rgba(0,0,0,0.35)",
              }}
            >
              {/* glint */}
              <div
                className="absolute rounded-full bg-white"
                style={{ width: "26%", height: "26%", left: "24%", top: "16%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
