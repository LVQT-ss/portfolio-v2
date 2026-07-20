"use client";

/**
 * CurvedLoop — adapted from React Bits (https://reactbits.dev/text-animations/curved-loop)
 * Text repeated along an SVG curve, looping endlessly by shifting `startOffset` each frame.
 * Optionally drag-scrubbable (pointer events flip direction based on drag velocity).
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./CurvedLoop.css";

type CurvedLoopProps = {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
};

export default function CurvedLoop({
  marqueeText = "",
  speed = 2,
  className,
  curveAmount = 400,
  direction = "left",
  interactive = true,
}: CurvedLoopProps) {
  const text = useMemo(() => {
    const hasTrailing = /\s| $/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + " ";
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  // Compact viewBox tuned for a small corner loop (the original React Bits
  // component uses a 1440x120 viewBox sized for a full-width hero banner).
  // A true circular arc (not a quadratic-bezier parabola): given the chord
  // endpoints and a desired sagitta (curveAmount), solve for the radius that
  // makes the path bulge by exactly that amount at the midpoint.
  const pathD = useMemo(() => {
    const x1 = -60;
    const x2 = 540;
    const y = 45;
    const halfChord = (x2 - x1) / 2;
    const h = Math.max(curveAmount, 0.01);
    const r = (halfChord * halfChord + h * h) / (2 * h);
    return `M${x1},${y} A${r},${r} 0 0 1 ${x2},${y}`;
  }, [curveAmount]);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength ? Array(Math.ceil(600 / textLength) + 2).fill(text).join("") : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute("startOffset", initial + "px");
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute("startOffset", newOffset + "px");
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute("startOffset", newOffset + "px");
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive ? (dragRef.current ? "grabbing" : "grab") : "auto";

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 480 90">
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + "px"} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
