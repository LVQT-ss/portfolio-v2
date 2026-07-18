/**
 * ============================================================
 * SITE CONTENT — edit everything here, no need to touch components.
 * Placeholders you must fill in are wrapped in [BRACKETS].
 * Search for "[" in this file to find all of them.
 * ============================================================
 */

export const site = {
  name: "Quoc Thinh Le Viet",
  shortName: "Quoc Thinh",
  url: "https://your-domain.vercel.app", // [PRODUCTION_URL] — update after deploy
  email: "levietquocthinh@gmail.com",
  links: {
    github: "https://github.com/LVQT-ss",
    upwork: "[UPWORK_PROFILE_URL]",
    calendly: "[CALENDLY_URL]", // optional — leave as-is to hide the button
    linkedin: "[LINKEDIN_URL]", // optional — leave as-is to hide the button
  },
};

export const hero = {
  headline: "I build SaaS, marketplace & booking platforms",
  subHeadline: "from backend to admin dashboard.",
  // ⚠️ Fill in your real KeyHay traffic number, e.g. "120K organic visits/month".
  // The stat block is hidden until you replace this placeholder.
  stat: {
    value: "[KEYHAY_TRAFFIC_METRIC]",
    label: "organic traffic grown for KeyHay marketplace",
  },
  intro:
    "Full-stack developer specialized in production SaaS, marketplace and booking systems — NestJS, Next.js, PostgreSQL, Redis, Docker, React Native.",
  ctaPrimary: { label: "View case studies", href: "#case-studies" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const techStack: { group: string; items: { name: string; icon: string }[] }[] = [
  {
    group: "Backend",
    items: [
      { name: "NestJS", icon: "nestjs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    group: "Mobile",
    items: [
      { name: "React Native", icon: "react" },
      { name: "Expo", icon: "expo" },
      { name: "WatermelonDB", icon: "database" },
      { name: "Zustand", icon: "state" },
    ],
  },
  {
    group: "Infra & AI",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel" },
      { name: "vLLM", icon: "ai" },
      { name: "CI/CD", icon: "cicd" },
    ],
  },
];

export type CaseStudy = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string[];
  /** Real, verified results only. Items still in [BRACKETS] render as
   *  visible "to be filled" placeholders — replace them with real numbers. */
  results: string[];
  stack: string[];
  demoLink: string; // [DEMO_LINK] or a real URL
  githubNote: string; // link, or note like "Private repo — code walkthrough available on request"
  /** Path under /public, e.g. "/images/keyhay-1.png". Placeholder shown until set. */
  media: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "keyhay",
    name: "KeyHay",
    tagline: "Digital goods marketplace for Vietnamese gamers",
    problem:
      "A marketplace lives or dies by organic traffic. KeyHay needed strong SEO to compete for search visibility in a crowded digital-goods market — with thousands of product pages missing critical SEO fields.",
    solution: [
      "Designed a GEO (Generative Engine Optimization) roadmap to rank in both classic search and AI answer engines.",
      "Built a multi-agent content pipeline running Qwen2.5-72B via vLLM on FPT Cloud H100 GPUs.",
      "Audited the full catalog and batch-generated thousands of missing SEO fields with LLM pipelines — with validation, not blind autogeneration.",
    ],
    results: ["[METRICS — e.g. organic traffic growth, indexed pages, ranking wins]"],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "vLLM", "Qwen2.5-72B", "FPT Cloud H100"],
    demoLink: "https://keyhay.com",
    githubNote: "Private repo — code walkthrough available on request",
    media: "[SCREENSHOT/VIDEO]",
  },
  {
    id: "plame",
    name: "Plame",
    tagline: "Voice-first AI planner app",
    problem:
      "Most AI planner demos fall apart in production: no offline support, no monetization, no test coverage. Plame was built as a real product, not a demo.",
    solution: [
      "NestJS backend, Expo mobile app, and a Vite + Refine admin panel — one coherent monorepo.",
      "Offline-first sync with WatermelonDB, so the app works on a subway with zero connectivity.",
      "RevenueCat subscription monetization and a multi-persona AI system.",
      "Custom design system: dark theme, gold accent, DM Sans / DM Serif typography.",
    ],
    results: [
      "480+ automated tests passing — proof of code quality, not just a pretty demo.",
    ],
    stack: ["NestJS", "Expo", "WatermelonDB", "Refine", "Vite", "RevenueCat", "PostgreSQL"],
    demoLink: "[DEMO_LINK]",
    githubNote: "Private repo — code walkthrough available on request",
    media: "[SCREENSHOT/VIDEO]",
  },
  {
    id: "focus",
    name: "Focus",
    tagline: "Productivity app — Eisenhower Matrix + Pomodoro + pixel-art rewards",
    problem:
      "Inherited codebase with a 1,100+ line god component and tangled navigation. The job wasn't to build new — it was to audit, untangle, and re-architect without breaking the product.",
    solution: [
      "Full codebase audit: identified the 1,100+ line god component and mapped its hidden responsibilities.",
      "Redesigned the routing architecture on expo-router v6 with clear ownership per screen.",
      "Migrated state to Zustand v5 with MMKV persistence for instant cold starts.",
    ],
    results: ["[METRICS — e.g. component size reduction, startup time, crash rate]"],
    stack: ["Expo SDK 54", "expo-router v6", "Zustand v5", "MMKV", "TypeScript"],
    demoLink: "[DEMO_LINK]",
    githubNote: "Private repo — code walkthrough available on request",
    media: "[SCREENSHOT/VIDEO]",
  },
];

export const bookingFocus = {
  title: "Now building: booking & scheduling SaaS",
  body: "I'm doubling down on the vertical I know best — booking and scheduling systems. Vet clinic booking, appointment management, service marketplaces: availability engines, calendar sync, payments, reminders, no-show handling.",
  bullets: [
    "Availability & slot engines that handle timezones, buffers and overlapping resources",
    "Payment + deposit flows built for no-show reduction",
    "Admin dashboards your staff will actually use",
  ],
  // When your demo is ready, set demo.href and demo.label — the card updates itself.
  demo: {
    ready: false,
    label: "Live demo coming soon",
    href: "#",
  },
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/** Replace with real testimonials. While every entry still contains
 *  [BRACKETS], the section renders a tasteful "references available" note instead. */
export const testimonials: Testimonial[] = [
  {
    quote: "[TESTIMONIAL_QUOTE]",
    author: "[CLIENT_NAME]",
    role: "[CLIENT_ROLE_COMPANY]",
  },
];

export const contact = {
  title: "Let's build your platform",
  body: "Tell me about your project — I usually reply within 24 hours.",
};
