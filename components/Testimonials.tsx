import { testimonials } from "@/content/site";

const isPlaceholder = (s: string) => s.includes("[");

export default function Testimonials() {
  const real = testimonials.filter((t) => !isPlaceholder(t.quote));

  return (
    <section id="testimonials" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl text-foreground sm:text-4xl">What clients say</h2>
        {real.length === 0 ? (
          <p className="mt-4 max-w-xl text-muted">
            Client references and work history available on request —{" "}
            <a href="#contact" className="text-gold hover:underline">
              get in touch
            </a>
            .
          </p>
        ) : (
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
        )}
      </div>
    </section>
  );
}
