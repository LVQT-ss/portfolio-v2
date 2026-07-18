import CardSwap from "@/components/reactbits/CardSwap";
import { FiTrendingUp, FiCheckCircle, FiTool } from "react-icons/fi";

const cards = [
  {
    title: "Ship at scale",
    body: "Built the SEO/GEO pipeline behind KeyHay's marketplace — multi-agent content generation on self-hosted LLMs, batch-processing thousands of product pages.",
    icon: <FiTrendingUp className="size-6" aria-hidden />,
  },
  {
    title: "Ship production-tested",
    body: "Plame shipped with 480+ automated tests, offline-first sync, and real subscription billing — not a demo that only works on my machine.",
    icon: <FiCheckCircle className="size-6" aria-hidden />,
  },
  {
    title: "Audit before I build",
    body: "On Focus, the job was untangling a 1,100+ line god component first — re-architecting navigation and state before adding a single feature.",
    icon: <FiTool className="size-6" aria-hidden />,
  },
];

export default function Approach() {
  return (
    <section className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">How I work</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Three real projects, three different jobs — scale an existing marketplace, ship a new
            product that survives production, or rescue a codebase that&apos;s gotten away from its
            team. Click a card to see the next.
          </p>
        </div>
        <CardSwap cards={cards} className="mx-auto lg:mx-0 lg:justify-self-end" />
      </div>
    </section>
  );
}
