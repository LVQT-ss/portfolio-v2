"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiCloudflare,
  SiNginx,
  SiGithubactions,
  SiGit,
  SiPostman,
  SiFigma,
  SiLinux,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import { FiBox } from "react-icons/fi";
import OptionWheel from "@/components/reactbits/OptionWheel";
import { techStackWheel } from "@/content/site";

const icons: Record<string, { icon: IconType; color: string }> = {
  nextjs: { icon: SiNextdotjs, color: "#1c1b18" },
  react: { icon: SiReact, color: "#61DAFB" },
  angular: { icon: SiAngular, color: "#DD0031" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  nestjs: { icon: SiNestjs, color: "#E0234E" },
  express: { icon: SiExpress, color: "#1c1b18" },
  dotnet: { icon: SiDotnet, color: "#512BD4" },
  java: { icon: FaJava, color: "#EA2D2E" },
  postgresql: { icon: SiPostgresql, color: "#699ECA" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  redis: { icon: SiRedis, color: "#FF4438" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  docker: { icon: SiDocker, color: "#2496ED" },
  cloudflare: { icon: SiCloudflare, color: "#F38020" },
  nginx: { icon: SiNginx, color: "#009639" },
  cicd: { icon: SiGithubactions, color: "#2088FF" },
  aws: { icon: FaAws, color: "#FF9900" },
  git: { icon: SiGit, color: "#F05032" },
  postman: { icon: SiPostman, color: "#FF6C37" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  linux: { icon: SiLinux, color: "#1c1b18" },
};

/** how much page scroll (in vh) advances the wheel by one step */
const STEP_VH = 50;

export default function TechStackWheel() {
  const groups = techStackWheel.map((g) => g.group);
  const steps = Math.max(groups.length - 1, 1);
  const [selected, setSelected] = useState(0);
  const [wheelPos, setWheelPos] = useState(0);
  const active = techStackWheel[selected];
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef(0);

  // The section is taller than the viewport; the inner screen is sticky, so it
  // stays pinned like its own "tab" while scroll progress drives the wheel.
  // Only once the wheel has run through every option does the page move on —
  // in both directions, with no wheel-event trapping (so nothing gets skipped).
  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(Math.max(-el.getBoundingClientRect().top / scrollable, 0), 1);
      setWheelPos(p * steps);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  // clicking an option (or arrow keys) scrolls the page to that step
  const scrollToIndex = useCallback(
    (index: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const top =
        window.scrollY + el.getBoundingClientRect().top + (index / steps) * scrollable;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [steps]
  );

  return (
    <section
      ref={sectionRef}
      id="stack-wheel"
      className="relative border-t border-border/60"
      style={{ height: `calc(100vh + ${steps * STEP_VH}vh)` }}
    >
      <div className="sticky top-0 grid h-screen grid-cols-1 sm:grid-cols-2">
        <div className="relative h-[50vh] sm:h-full">
          <OptionWheel
            items={groups}
            defaultSelected={0}
            onChange={(index) => setSelected(index)}
            position={wheelPos}
            onRequestIndex={scrollToIndex}
            side="left"
            fontSize={2}
            inset={40}
            textColor="#6b675e"
            activeColor="#92400e"
          />
        </div>

        <div className="flex h-[50vh] flex-col justify-center gap-4 border-t border-border/60 px-6 sm:h-full sm:border-l sm:border-t-0 sm:px-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">{active.group}</span>
          <div className="flex flex-wrap gap-2">
            {active.items.map((item) => {
              const entry = icons[item.icon] ?? { icon: FiBox, color: "#92400e" };
              const Icon = entry.icon;
              return (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-foreground"
                >
                  <Icon className="size-4 shrink-0" style={{ color: entry.color }} aria-hidden />
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
