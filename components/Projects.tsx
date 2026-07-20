import FadeContent from "@/components/reactbits/FadeContent";
import ScrollStack from "@/components/reactbits/ScrollStack";
import { projects, type Project } from "@/content/site";
import { FiExternalLink, FiImage } from "react-icons/fi";

const isPlaceholder = (s: string) => s.includes("[");

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
      className="absolute inset-0 size-full object-cover object-top transition duration-500 group-hover/media:scale-[1.015] group-hover/media:opacity-90"
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
      className="group/media absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
    >
      {img}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/15 opacity-80 transition-opacity group-hover/media:opacity-100"
      />
      <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-background/80 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-gold uppercase shadow-lg backdrop-blur-md sm:top-6 sm:left-6">
        <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(200,169,110,0.8)]" />
        Live project
      </span>
      <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-background shadow-xl transition-transform group-hover/media:-translate-y-1 sm:right-6 sm:bottom-6 sm:px-5 sm:py-2.5 sm:text-sm">
        See it in action
        <FiExternalLink aria-hidden />
      </span>
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

          {p.role && (
            <span className="mt-4 inline-block rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold tracking-widest text-gold uppercase">
              {p.role}
            </span>
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
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                See it in action <FiExternalLink aria-hidden />
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
