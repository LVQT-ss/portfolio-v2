import TextType from "@/components/reactbits/TextType";
// import HeroFace from "@/components/HeroFace"; // hidden — replaced by the Lanyard card
// import CircularText from "@/components/reactbits/CircularText"; // hidden for now
import HeroLanyard from "@/components/HeroLanyard";
import { hero, site } from "@/content/site";

const isPlaceholder = (s: string) => s.includes("[");

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-24 pb-4 sm:px-6 sm:pt-28">
      {/* subtle gold glow — pure CSS, no runtime cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-130 w-200 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #92400e, transparent)" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* text column sits above the full-bleed lanyard canvas so links stay clickable */}
        <div className="relative z-10">
          <h1 className="block font-sans text-6xl leading-[0.9] font-black tracking-tight text-gold uppercase sm:text-7xl">
            {hero.headline}
          </h1>
          <p className="block font-sans text-6xl leading-[0.9] font-black tracking-tight text-foreground uppercase sm:text-7xl">
            {hero.subHeadline}
          </p>
          <TextType
            as="p"
            text={hero.intro}
            typingSpeed={18}
            initialDelay={600}
            loop={false}
            showCursor
            cursorCharacter="|"
            cursorClassName="text-gold"
            className="mt-6 min-h-44 max-w-2xl text-base leading-relaxed text-muted sm:min-h-40 sm:text-lg"
          />

          {!isPlaceholder(hero.stat.value) && (
            <div className="mt-8 inline-flex items-baseline gap-3 rounded-xl border border-border bg-surface px-5 py-3">
              <span className="font-serif text-3xl text-gold">{hero.stat.value}</span>
              <span className="text-sm text-muted">{hero.stat.label}</span>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={hero.ctaPrimary.href}
              className="rounded-md bg-gold px-7 py-3 text-sm font-bold tracking-wide text-background uppercase transition-opacity hover:opacity-90"
            >
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="rounded-md border border-border px-7 py-3 text-sm font-bold tracking-wide text-foreground uppercase transition-colors hover:border-gold hover:text-gold"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span className="size-2 rounded-full bg-gold" aria-hidden />
            {hero.availability}
          </p>
        </div>

        {/* on lg+ HeroLanyard renders absolute inset-0 (whole grid = drag area);
            on mobile it renders as an in-flow box in this column */}
        <div className="lg:h-[560px]">
          <HeroLanyard />
        </div>
      </div>
    </section>
  );
}
