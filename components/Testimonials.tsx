"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiCloudflare,
  SiCss,
  SiDocker,
  SiDotnet,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiLinux,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  FiActivity,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiLayers,
  FiLock,
  FiRefreshCw,
  FiShield,
  FiTool,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import FadeContent from "@/components/reactbits/FadeContent";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { testimonials, testimonialsFallback } from "@/content/site";
import { smoothScrollTo } from "@/lib/smoothScrollTo";

const isPlaceholder = (s: string) => s.includes("[");

/** how much extra scroll (in vh) the pinned reveal holds the section for */
const PIN_VH = 120;

const keywordIcons: Record<string, { icon: IconType; color: string }> = {
  "Web fundamentals": { icon: FiCode, color: "#C8A96E" },
  "Git & GitHub": { icon: SiGit, color: "#F05032" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#1572B6" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#EDEDED" },
  Angular: { icon: SiAngular, color: "#DD0031" },
  Tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  Express: { icon: SiExpress, color: "#EDEDED" },
  ".NET": { icon: SiDotnet, color: "#512BD4" },
  Java: { icon: SiOpenjdk, color: "#ED8B00" },
  "REST APIs": { icon: FiCode, color: "#C8A96E" },
  Auth: { icon: FiShield, color: "#C8A96E" },
  WebSockets: { icon: SiSocketdotio, color: "#EDEDED" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  Expo: { icon: SiExpo, color: "#EDEDED" },
  PostgreSQL: { icon: SiPostgresql, color: "#699ECA" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Redis: { icon: SiRedis, color: "#FF4438" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  "System design": { icon: FiLayers, color: "#C8A96E" },
  RBAC: { icon: FiShield, color: "#C8A96E" },
  Caching: { icon: FiZap, color: "#C8A96E" },
  Realtime: { icon: FiActivity, color: "#C8A96E" },
  "Unit tests": { icon: FiCheckCircle, color: "#C8A96E" },
  "Integration tests": { icon: FiCheckCircle, color: "#C8A96E" },
  Validation: { icon: FiCheckCircle, color: "#C8A96E" },
  Security: { icon: FiLock, color: "#C8A96E" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Vercel: { icon: SiVercel, color: "#EDEDED" },
  AWS: { icon: FaAws, color: "#FF9900" },
  Cloudflare: { icon: SiCloudflare, color: "#F38020" },
  Nginx: { icon: SiNginx, color: "#009639" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  "CI/CD": { icon: FiCloud, color: "#C8A96E" },
  Deploy: { icon: FiCloud, color: "#C8A96E" },
  Monitor: { icon: FiActivity, color: "#C8A96E" },
  Debug: { icon: FiTool, color: "#C8A96E" },
  Optimize: { icon: FiTrendingUp, color: "#C8A96E" },
  Maintain: { icon: FiRefreshCw, color: "#C8A96E" },
};

const journeyCards = [
  {
    eyebrow: "From idea to product",
    steps: [
      { label: "Foundations & tools", keywords: ["Web fundamentals", "Git & GitHub", "Linux", "Figma", "Postman"] },
      { label: "Frontend", keywords: ["HTML", "CSS", "TypeScript", "React", "Next.js", "Angular", "Tailwind"] },
      { label: "Backend", keywords: ["Node.js", "NestJS", "Express", ".NET", "Java", "REST APIs", "Auth", "WebSockets"] },
      { label: "Mobile & data", keywords: ["React Native", "Expo", "PostgreSQL", "MongoDB", "Redis", "Firebase"] },
    ],
  },
  {
    eyebrow: "Beyond the launch",
    steps: [
      { label: "Architecture", keywords: ["System design", "RBAC", "Caching", "Realtime"] },
      { label: "Quality", keywords: ["Unit tests", "Integration tests", "Validation", "Security"] },
      { label: "Cloud & delivery", keywords: ["Docker", "Vercel", "AWS", "Cloudflare", "Nginx", "CI/CD", "GitHub Actions"] },
      { label: "Operate & improve", keywords: ["Deploy", "Monitor", "Debug", "Optimize", "Maintain"] },
    ],
  },
];

function JourneyCard({
  eyebrow,
  steps,
  direction,
}: {
  eyebrow: string;
  steps: { label: string; keywords: string[] }[];
  direction: "left" | "right";
}) {
  return (
    <div
      className={`w-56 rounded-2xl border border-border bg-surface/95 p-4 shadow-2xl backdrop-blur xl:w-64 ${
        direction === "left" ? "-rotate-6" : "rotate-6"
      }`}
    >
      <p className="text-[10px] font-semibold tracking-[0.22em] text-gold uppercase">
        {eyebrow}
      </p>
      <div className="mt-4">
        {steps.map((step, index) => (
          <div key={step.label} className="relative flex gap-3 pb-4 last:pb-0">
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-5 left-[7px] h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-gold/70 to-border"
              />
            )}
            <span className="relative mt-1.5 size-3.5 shrink-0 rounded-full border border-gold/70 bg-background shadow-[0_0_14px_rgba(200,169,110,0.35)]">
              <span className="absolute inset-1 rounded-full bg-gold" />
            </span>
            <div>
              <p className="text-[10px] tracking-widest text-muted uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{step.label}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {step.keywords.map((keyword) => (
                  (() => {
                    const entry = keywordIcons[keyword];
                    const KeywordIcon = entry?.icon;
                    return (
                      <span
                        key={keyword}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-1.5 py-1 text-[9px] leading-none text-muted"
                      >
                        {KeywordIcon && (
                          <KeywordIcon
                            aria-hidden
                            className="size-2.5 shrink-0"
                            style={{ color: entry.color }}
                          />
                        )}
                        {keyword}
                      </span>
                    );
                  })()
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const real = testimonials.filter((t) => !isPlaceholder(t.quote));
  const pinRef = useRef<HTMLElement | null>(null);

  if (real.length === 0) {
    return (
      <section
        ref={pinRef}
        id="testimonials"
        className="relative border-t border-border/60"
        style={{ height: `calc(100vh + ${PIN_VH}vh)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center px-4 sm:px-6">
          <div className="pointer-events-none absolute top-1/2 left-4 hidden -translate-y-1/2 xl:left-10 xl:block 2xl:left-16">
            <FadeContent delay={100}>
              <JourneyCard
                eyebrow={journeyCards[0].eyebrow}
                steps={journeyCards[0].steps}
                direction="left"
              />
            </FadeContent>
          </div>
          <div className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 xl:right-10 xl:block 2xl:right-16">
            <FadeContent delay={200}>
              <JourneyCard
                eyebrow={journeyCards[1].eyebrow}
                steps={journeyCards[1].steps}
                direction="right"
              />
            </FadeContent>
          </div>

          <div className="mx-auto max-w-3xl">
            <ScrollReveal
              triggerRef={pinRef}
              baseOpacity={0}
              enableBlur
              baseRotation={5}
              blurStrength={10}
              textClassName="font-serif text-foreground"
            >
              {testimonialsFallback}
            </ScrollReveal>
            <a
              href="#contact"
              onClick={(e) => smoothScrollTo(e, "#contact")}
              className="mt-8 inline-block rounded-md bg-gold px-7 py-3 text-sm font-bold tracking-wide text-background uppercase transition-opacity hover:opacity-90"
            >
              Let&apos;s work together
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">What clients say</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {real.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-border bg-surface p-6">
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium text-foreground">{t.author}</span>
                <span className="text-muted"> — {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
