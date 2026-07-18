import SplitText from "@/components/reactbits/SplitText";
import ProfileCard from "@/components/reactbits/ProfileCard";
import CurvedLoop from "@/components/reactbits/CurvedLoop";
import { hero, site } from "@/content/site";

const isPlaceholder = (s: string) => s.includes("[");

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-4 sm:px-6 sm:pt-44">
      {/* subtle gold glow — pure CSS, no runtime cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c8a96e, transparent)" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="mb-5 text-sm font-medium tracking-widest text-gold uppercase">
            Full-stack developer · SaaS / Marketplace / Booking
          </p>
          <SplitText
            as="h1"
            text={hero.headline}
            className="font-serif text-4xl leading-tight text-foreground sm:text-6xl"
          />
          <SplitText
            as="p"
            text={hero.subHeadline}
            delay={0.4}
            className="mt-1 font-serif text-4xl leading-tight text-gold sm:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.intro}
          </p>

          {!isPlaceholder(hero.stat.value) && (
            <div className="mt-8 inline-flex items-baseline gap-3 rounded-xl border border-border bg-surface px-5 py-3">
              <span className="font-serif text-3xl text-gold">{hero.stat.value}</span>
              <span className="text-sm text-muted">{hero.stat.label}</span>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={hero.ctaPrimary.href}
              className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <ProfileCard
          avatarSrc="/images/avatar.jpg"
          name={site.shortName}
          title="Full-Stack & Mobile Developer"
          className="mx-auto lg:mx-0 lg:justify-self-end"
        />
      </div>

      <CurvedLoop
        text="NestJS · Next.js · PostgreSQL · React Native · Docker · Redis"
        className="-mt-6 sm:-mt-4"
      />
    </section>
  );
}
