import ScrollFade from "@/components/reactbits/ScrollFade";
import { about, experience } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollFade start="top bottom" end="top bottom-=15%">
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">About</h2>
        </ScrollFade>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <ScrollFade start="top bottom" end="top bottom-=20%" className="lg:sticky lg:top-24 lg:self-start">
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">{about.bio}</p>

            <div className="mt-8 max-w-md rounded-xl border border-border bg-surface p-5">
              <p className="text-xs font-bold tracking-widest text-gold uppercase">Education</p>
              <p className="mt-2 font-serif text-lg text-foreground">{about.education.school}</p>
              <p className="text-sm text-muted">{about.education.degree}</p>
              <p className="mt-1 text-xs text-muted">
                {about.education.period} · {about.education.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{about.education.note}</p>
            </div>
          </ScrollFade>

          <div className="relative">
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[9px]"
            />
            <ol className="space-y-10">
              {experience.map((e) => (
                <ScrollFade key={e.role} start="top bottom-=5%" end="top center">
                  <li className="relative pl-8 sm:pl-10">
                    <span
                      aria-hidden
                      className="absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-gold bg-background sm:size-[18px]"
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-serif text-lg text-foreground sm:text-xl">{e.role}</h3>
                      <span className="text-xs whitespace-nowrap text-muted">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-gold">{e.company}</p>
                    <p className="text-xs text-muted">{e.location}</p>
                    <ul className="mt-3 space-y-1.5">
                      {e.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm leading-snug text-foreground/90"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ScrollFade>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
