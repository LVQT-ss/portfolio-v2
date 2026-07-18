import type { IconType } from "react-icons";
import {
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiExpo,
  SiDocker,
  SiVercel,
} from "react-icons/si";
import { FiDatabase, FiBox, FiCpu, FiGitBranch } from "react-icons/fi";
import Folder from "@/components/reactbits/Folder";
import { techStack } from "@/content/site";

const icons: Record<string, IconType> = {
  nestjs: SiNestjs,
  nodejs: SiNodedotjs,
  postgresql: SiPostgresql,
  redis: SiRedis,
  nextjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  expo: SiExpo,
  docker: SiDocker,
  vercel: SiVercel,
  database: FiDatabase,
  state: FiBox,
  ai: FiCpu,
  cicd: FiGitBranch,
};

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Tech stack</h2>
        <p className="mt-3 max-w-xl text-muted">
          Tools I ship production systems with — not a logo wall of everything I&apos;ve touched once.
          Hover a folder to open it.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((group) => (
            <Folder
              key={group.group}
              label={group.group}
              items={group.items.map((item) => {
                const Icon = icons[item.icon] ?? FiBox;
                return {
                  name: item.name,
                  icon: <Icon className="size-3.5 shrink-0 text-gold" aria-hidden />,
                };
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
