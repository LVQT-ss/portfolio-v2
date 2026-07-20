"use client";

import { useRef, useState } from "react";
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

export default function TechStackWheel() {
  const groups = techStackWheel.map((g) => g.group);
  const [selected, setSelected] = useState(0);
  const active = techStackWheel[selected];
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} id="stack-wheel" className="border-t border-border/60">
      <div className="grid min-h-screen grid-cols-1 sm:grid-cols-2">
        <div className="relative h-[50vh] sm:h-screen">
          <OptionWheel
            items={groups}
            defaultSelected={0}
            onChange={(index) => setSelected(index)}
            side="left"
            fontSize={2}
            inset={40}
            textColor="#6b675e"
            activeColor="#92400e"
            scopeRef={sectionRef}
          />
        </div>

        <div className="flex h-[50vh] flex-col justify-center gap-4 border-t border-border/60 px-6 sm:h-screen sm:border-l sm:border-t-0 sm:px-10">
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
