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
  headline: "Full-Stack",
  subHeadline: "Developer",
  // ⚠️ Fill in your real KeyHay traffic number, e.g. "120K organic visits/month".
  // The stat block is hidden until you replace this placeholder.
  stat: {
    value: "[KEYHAY_TRAFFIC_METRIC]",
    label: "organic traffic grown for KeyHay marketplace",
  },
  intro:
    "Hi, I’m Quoc Thinh, a Full-Stack Developer with 3+ years of hands-on experience building complete web and mobile products. Across academic, personal, and production projects, I’ve worked through the entire development lifecycle—from shaping ideas and designing systems to implementation, testing, deployment, and continuous improvement.",
  availability: "Available for full-time opportunities",
  ctaPrimary: { label: "View projects", href: "#projects" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const techStack: { group: string; items: { name: string; icon: string }[] }[] = [
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
    group: "Backend",
    items: [
      { name: "NestJS", icon: "nestjs" },
      { name: "Node.js", icon: "nodejs" },
    ],
  },
  {
    group: "Mobile",
    items: [
      { name: "React Native", icon: "react" },
      { name: "Expo", icon: "expo" },
      { name: "Zustand", icon: "zustand" },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "WatermelonDB", icon: "watermelon" },
    ],
  },
  {
    group: "Hosting & Infra",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel" },
      { name: "vLLM", icon: "vllm" },
      { name: "CI/CD", icon: "cicd" },
    ],
  },
];

export const techStackWheel: { group: string; items: { name: string; icon: string }[] }[] = [
  {
    group: "Frontend Development",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "React Native", icon: "react" },
      { name: "Angular", icon: "angular" },
      { name: "TypeScript", icon: "typescript" },
      { name: "TailwindCSS", icon: "tailwind" },
    ],
  },
  {
    group: "Backend Development",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Express.js", icon: "express" },
      { name: ".NET", icon: "dotnet" },
      { name: "Java", icon: "java" },
    ],
  },
  {
    group: "Databases & Message Queues",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    group: "DevOps & Cloud",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "GitHub Actions", icon: "cicd" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "AWS", icon: "aws" },
      { name: "Nginx", icon: "nginx" },
    ],
  },
  {
    group: "Tools & Others",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Postman", icon: "postman" },
      { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  /** Path under /public, e.g. "/images/keyhay.png". Placeholder shown until set. */
  media: string;
  /** When set, this is a design-only project — show the role badge instead of stack/deploy. */
  role?: string;
  stack?: string[];
  deploy?: string[];
  demoLink: string; // [DEMO_LINK] or a real URL
};

export const projects: Project[] = [
  {
    id: "keyhay",
    name: "KeyHay",
    tagline: "Digital goods marketplace for Vietnamese gamers",
    media: "/images/keyhay.png",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "vLLM", "Qwen2.5-72B"],
    deploy: ["Docker", "Cloudflare", "CI/CD", "Nginx"],
    demoLink: "https://keyhay.com",
  },
  {
    id: "tea-garden",
    name: "Tea Garden",
    tagline: "Environmental awareness landing page — motion-first design exploration",
    media: "/images/tea-garden.png",
    role: "UI/UX Designer",
    demoLink: "https://tea-garden-hazel.vercel.app/",
  },
  {
    id: "home-services",
    name: "HomePro",
    tagline: "Home repair & improvement booking landing page",
    media: "/images/homepro.png",
    demoLink: "https://home-services-qzu328rxq-le-viet-quoc-thinhs-projects.vercel.app/",
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
