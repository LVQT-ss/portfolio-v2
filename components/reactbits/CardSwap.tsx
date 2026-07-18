"use client";

/**
 * CardSwap — adapted from React Bits (https://reactbits.dev/components/card-swap)
 * A stack of cards that auto-cycles: the front card retires to the back on an interval.
 * Pure CSS transforms + setInterval, no animation library.
 */

import { useEffect, useState } from "react";

type CardSwapProps = {
  cards: { title: string; body: string; icon?: React.ReactNode }[];
  className?: string;
  intervalMs?: number;
};

export default function CardSwap({ cards, className = "", intervalMs = 3800 }: CardSwapProps) {
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFront((f) => (f + 1) % cards.length), intervalMs);
    return () => clearInterval(id);
  }, [cards.length, intervalMs]);

  return (
    <div className={`relative h-64 w-full max-w-sm ${className}`}>
      {cards.map((card, i) => {
        const order = (i - front + cards.length) % cards.length;
        return (
          <button
            key={card.title}
            type="button"
            onClick={() => setFront(i)}
            aria-current={order === 0}
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 text-left shadow-lg transition-all duration-500 ease-out"
            style={{
              transform: `translateY(${order * 14}px) translateX(${order * 10}px) scale(${1 - order * 0.05})`,
              zIndex: cards.length - order,
              opacity: order < 3 ? 1 - order * 0.18 : 0,
              pointerEvents: order === 0 ? "auto" : "none",
            }}
          >
            <div>
              {card.icon && <div className="mb-3 text-gold">{card.icon}</div>}
              <h3 className="font-serif text-xl text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
            </div>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {cards.map((_, dot) => (
                <span
                  key={dot}
                  className={`h-1 rounded-full transition-all ${
                    dot === front ? "w-5 bg-gold" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
