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
  SiGithubactions,
} from "react-icons/si";
import { GiWatermelon, GiBearFace } from "react-icons/gi";
import { TbBrain } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import FallingIcons from "@/components/reactbits/FallingIcons";
import { techStack } from "@/content/site";

/** brand icon + brand color for each tech */
const icons: Record<string, { icon: IconType; color: string }> = {
  nestjs: { icon: SiNestjs, color: "#E0234E" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  postgresql: { icon: SiPostgresql, color: "#699ECA" },
  redis: { icon: SiRedis, color: "#FF4438" },
  nextjs: { icon: SiNextdotjs, color: "#EDEDED" },
  react: { icon: SiReact, color: "#61DAFB" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  expo: { icon: SiExpo, color: "#EDEDED" },
  docker: { icon: SiDocker, color: "#2496ED" },
  vercel: { icon: SiVercel, color: "#EDEDED" },
  watermelon: { icon: GiWatermelon, color: "#FC6C85" },
  zustand: { icon: GiBearFace, color: "#C98A4B" },
  vllm: { icon: TbBrain, color: "#D4A017" },
  cicd: { icon: SiGithubactions, color: "#2088FF" },
};

const LEFT_GROUPS = ["Frontend", "Backend", "Mobile"];
const RIGHT_GROUPS = ["Database", "Hosting & Infra"];

function itemsFor(groups: string[]) {
  return techStack
    .filter((group) => groups.includes(group.group))
    .flatMap((group) =>
      group.items.map((item) => {
        const entry = icons[item.icon] ?? { icon: FiBox, color: "#D4A017" };
        const Icon = entry.icon;
        return {
          name: item.name,
          icon: (
            <Icon
              className="size-4 shrink-0"
              style={{ color: entry.color }}
              aria-hidden
            />
          ),
        };
      })
    );
}

export default function TechStack() {
  return (
    <section id="stack" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Tech stack</h2>
        <p className="mt-3 max-w-xl text-muted">
          Tools I ship production systems with — not a logo wall of everything I&apos;ve touched
          once. Go ahead, grab one and throw it around.
        </p>
        <FallingIcons
          columns={[
            { title: "Frontend · Backend · Mobile", items: itemsFor(LEFT_GROUPS) },
            { title: "Hosting · Database", items: itemsFor(RIGHT_GROUPS) },
          ]}
          trigger="scroll"
          gravity={0.9}
          mouseConstraintStiffness={0.35}
          className="mt-10 h-[400px] rounded-2xl border border-border/60 bg-background/40 sm:h-[440px]"
        />
      </div>
    </section>
  );
}
