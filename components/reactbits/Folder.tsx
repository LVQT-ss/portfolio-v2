"use client";

/**
 * Folder — adapted from React Bits (https://reactbits.dev/components/folder)
 * A folder that opens on hover/focus, fanning out its papers (skill chips).
 * Pure CSS transforms, no animation library.
 */

import { useState } from "react";

type FolderProps = {
  label: string;
  items: { name: string; icon?: React.ReactNode }[];
  className?: string;
};

export default function Folder({ label, items, className = "" }: FolderProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className={`group relative flex h-44 w-full flex-col items-center justify-end rounded-2xl border border-border bg-surface pb-5 text-left transition-colors hover:border-gold/50 ${className}`}
    >
      {/* fanned-out papers */}
      <div className="pointer-events-none absolute inset-x-4 bottom-14 top-6">
        {items.map((item, i) => {
          const mid = (items.length - 1) / 2;
          const offset = i - mid;
          return (
            <div
              key={item.name}
              className="absolute inset-x-0 flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-foreground/90 shadow-sm transition-all duration-300 ease-out"
              style={{
                bottom: open ? `${i * 30}px` : "0px",
                transform: open
                  ? `translateX(${offset * 8}px) rotate(${offset * 4}deg)`
                  : "translateY(0px) rotate(0deg)",
                opacity: open ? 1 : 0,
                zIndex: items.length - i,
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* folder body */}
      <div className="relative z-10 w-full px-4">
        <div
          className="h-3 w-16 rounded-t-md bg-gold-soft transition-colors group-hover:bg-gold/30"
          aria-hidden
        />
        <div
          className="flex h-16 w-full items-end justify-center rounded-b-lg rounded-tr-lg border border-gold/30 bg-gradient-to-b from-gold-soft to-surface-2 pb-2 transition-transform duration-300 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
      <p className="relative z-10 mt-3 text-sm font-semibold tracking-widest text-gold uppercase">
        {label}
      </p>
    </button>
  );
}
