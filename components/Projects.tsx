import FadeContent from "@/components/reactbits/FadeContent";
import ScrollStack from "@/components/reactbits/ScrollStack";
import { projects, type Project } from "@/content/site";
import { FiExternalLink, FiImage, FiGitBranch } from "react-icons/fi";
import { SiDocker, SiCloudflare, SiNginx } from "react-icons/si";
import type { IconType } from "react-icons";

const isPlaceholder = (s: string) => s.includes("[");

const deployIcons: Record<string, IconType> = {
  Docker: SiDocker,
  Cloudflare: SiCloudflare,
  Nginx: SiNginx,
  "CI/CD": FiGitBranch,
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

function ProjectMedia({ p }: { p: Project }) {
  if (isPlaceholder(p.media)) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-2 text-muted">
        <FiImage className="size-6" aria-hidden />
        <span className="text-xs">{p.media} — add screenshot or video</span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  const img = (
    <img
      src={p.media}
      alt={`${p.name} screenshot`}
      className="absolute inset-0 size-full object-cover object-top transition-opacity group-hover:opacity-90"
      loading="lazy"
    />
  );

  if (isPlaceholder(p.demoLink)) return img;

  return (
    <a
      href={p.demoLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${p.name} live demo`}
      className="absolute inset-0 block"
    >
      {img}
    </a>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <FadeContent delay={index * 80} className="h-full">
      <article className="group flex h-[100dvh] w-full flex-col overflow-hidden border-t border-border bg-surface">
        <div className="relative min-h-0 flex-1">
          <ProjectMedia p={p} />
        </div>
        <div className="shrink-0 px-4 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
            <h3 className="font-serif text-xl text-foreground sm:text-2xl">{p.name}</h3>
            <p className="text-sm text-muted">{p.tagline}</p>
          </div>

          {p.role ? (
            <span className="mt-4 inline-block rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold tracking-widest text-gold uppercase">
              {p.role}
            </span>
          ) : (
            <>
              {p.highlights && (
                <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm leading-snug text-foreground/90">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {p.stack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              )}
              {p.deploy && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.deploy.map((t) => {
                    const Icon = deployIcons[t];
                    return (
                      <Chip key={t}>
                        <span className="inline-flex items-center gap-1.5">
                          {Icon && <Icon className="size-3.5" aria-hidden />}
                          {t}
                        </span>
                      </Chip>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <div className="mt-5">
            {isPlaceholder(p.demoLink) ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted/60 italic">
                <FiExternalLink aria-hidden /> {p.demoLink}
              </span>
            ) : (
              <a
                href={p.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline"
              >
                <FiExternalLink aria-hidden /> Live demo
              </a>
            )}
          </div>
        </div>
      </article>
    </FadeContent>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border/60 pt-8 sm:pt-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-1 px-4 sm:px-6">
        <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Projects</h2>
        <p className="text-sm text-muted">
          A marketplace shipped to production, a design exploration, and a services platform.
        </p>
      </div>
      <ScrollStack className="mt-4" topOffset={64} stackGap={0}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </ScrollStack>
    </section>
  );
}
