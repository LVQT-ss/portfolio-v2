"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const links = [
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Booking SaaS", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-serif text-lg text-gold">
          {site.shortName}
        </a>
        <div className="flex items-center gap-4 sm:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gold px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Hire me
          </a>
        </div>
      </nav>
    </header>
  );
}
