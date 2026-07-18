import FadeContent from "@/components/reactbits/FadeContent";
import ScrollStack from "@/components/reactbits/ScrollStack";
import { caseStudies, type CaseStudy } from "@/content/site";
import { FiExternalLink, FiGithub, FiImage } from "react-icons/fi";

const isPlaceholder = (s: string) => s.includes("[");

function MediaSlot({ cs }: { cs: CaseStudy }) {
  if (isPlaceholder(cs.media)) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-2 text-muted">
        <FiImage className="size-6" aria-hidden />
        <span className="text-xs">{cs.media} — add screenshot or video</span>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={cs.media}
      alt={`${cs.name} screenshot`}
      className="aspect-video w-full rounded-xl border border-border object-cover"
      loading="lazy"
    />
  );
}

function CaseStudyBlock({ cs, index }: { cs: CaseStudy; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <FadeContent>
      <article
        id={cs.id}
        className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-12"
      >
        <div className={reversed ? "lg:order-2" : ""}>
          <MediaSlot cs={cs} />
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <p className="text-xs font-semibold tracking-widest text-gold uppercase">
            Case study {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-serif text-3xl text-foreground">{cs.name}</h3>
          <p className="mt-1 text-muted">{cs.tagline}</p>

          <h4 className="mt-6 text-sm font-semibold text-foreground">Problem</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted">{cs.problem}</p>

          <h4 className="mt-4 text-sm font-semibold text-foreground">What I built</h4>
          <ul className="mt-1 space-y-1.5">
            {cs.solution.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" aria-hidden />
                {s}
              </li>
            ))}
          </ul>

          <h4 className="mt-4 text-sm font-semibold text-foreground">Results</h4>
          <ul className="mt-1 space-y-1.5">
            {cs.results.map((r, i) => (
              <li
                key={i}
                className={`flex gap-2 text-sm leading-relaxed ${
                  isPlaceholder(r) ? "italic text-muted/60" : "text-foreground/90"
                }`}
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" aria-hidden />
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {cs.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            {isPlaceholder(cs.demoLink) ? (
              <span className="inline-flex items-center gap-1.5 text-muted/60 italic">
                <FiExternalLink aria-hidden /> {cs.demoLink}
              </span>
            ) : (
              <a
                href={cs.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold hover:underline"
              >
                <FiExternalLink aria-hidden /> Live demo
              </a>
            )}
            {isPlaceholder(cs.githubNote) ? (
              <span className="inline-flex items-center gap-1.5 text-muted/60 italic">
                <FiGithub aria-hidden /> {cs.githubNote}
              </span>
            ) : cs.githubNote.startsWith("http") ? (
              <a
                href={cs.githubNote}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted hover:text-foreground"
              >
                <FiGithub aria-hidden /> Source
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-muted">
                <FiGithub aria-hidden /> {cs.githubNote}
              </span>
            )}
          </div>
        </div>
      </article>
    </FadeContent>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">Case studies</h2>
        <p className="mt-3 max-w-xl text-muted">
          Three production systems — marketplace SEO at scale, a tested-to-death AI planner, and a
          rescue-and-refactor job.
        </p>
        <ScrollStack className="mt-10">
          {caseStudies.map((cs, i) => (
            <CaseStudyBlock key={cs.id} cs={cs} index={i} />
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
