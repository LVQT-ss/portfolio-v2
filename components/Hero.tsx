import TextType from "@/components/reactbits/TextType";
// import TrueFocus from "@/components/reactbits/TrueFocus"; // swapped for RotatingText
import RotatingText from "@/components/reactbits/RotatingText";
import LightRays from "@/components/reactbits/LightRays";
// import HeroFace from "@/components/HeroFace"; // hidden — replaced by the Lanyard card
// import CircularText from "@/components/reactbits/CircularText"; // hidden for now
import HeroLanyard from "@/components/HeroLanyard";
import { hero } from "@/content/site";

const isPlaceholder = (s: string) => s.includes("[");

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-24 pb-4 sm:px-6 sm:pt-28">
      {/* WebGL light rays background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#92400e"
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.4}
          fadeDistance={1.1}
          saturation={0.9}
          followMouse
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.03}
          className="opacity-70"
        />
      </div>
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* text column sits above the full-bleed lanyard canvas so links stay clickable */}
        <div className="relative z-10">
          {/* <h1 className="block font-sans text-6xl leading-[0.9] font-black tracking-tight text-gold uppercase sm:text-7xl">
            <TrueFocus
              sentence={hero.headline}
              separator="-"
              manualMode={false}
              blurAmount={4}
              borderColor="var(--color-gold)"
              glowColor="var(--color-gold-soft)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
              className="!justify-start !gap-3"
            />
          </h1>
          <p className="block font-sans text-6xl leading-[0.9] font-black tracking-tight text-foreground uppercase sm:text-7xl">
            {hero.subHeadline}
          </p> */}
          <h1 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-4xl leading-[0.9] font-black tracking-tight text-foreground uppercase sm:text-5xl">
            <RotatingText
              texts={hero.roles}
              mainClassName="max-w-full justify-center overflow-hidden rounded-lg bg-gold px-4 py-1 text-background sm:px-5 sm:py-2"
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.02}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2200}
            />
            <span>{hero.subHeadline}</span>
          </h1>
          <TextType
            as="p"
            text={hero.intro}
            typingSpeed={18}
            initialDelay={600}
            loop={false}
            showCursor
            cursorCharacter="|"
            cursorClassName="text-gold"
            className="mt-6 min-h-16 max-w-2xl text-base leading-relaxed text-muted sm:min-h-14 sm:text-lg"
          />

          {!isPlaceholder(hero.stat.value) && (
            <div className="mt-8 inline-flex items-baseline gap-3 rounded-xl border border-border bg-surface px-5 py-3">
              <span className="font-serif text-3xl text-gold">{hero.stat.value}</span>
              <span className="text-sm text-muted">{hero.stat.label}</span>
            </div>
          )}

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
