import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { bookingFocus } from "@/content/site";
import { FiCalendar, FiClock } from "react-icons/fi";

export default function BookingFocus() {
  return (
    <section id="booking" className="border-t border-border/60 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SpotlightCard className="p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold tracking-widest text-gold uppercase">
                <FiCalendar aria-hidden /> Current focus
              </p>
              <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
                {bookingFocus.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{bookingFocus.body}</p>
              <ul className="mt-6 space-y-2">
                {bookingFocus.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-gold" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo embed slot — swap in your live booking demo here later */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-2 p-10 text-center">
              {bookingFocus.demo.ready ? (
                <a
                  href={bookingFocus.demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  {bookingFocus.demo.label}
                </a>
              ) : (
                <>
                  <FiClock className="size-8 text-muted" aria-hidden />
                  <p className="mt-3 text-sm text-muted">{bookingFocus.demo.label}</p>
                  <p className="mt-1 text-xs text-muted/60">
                    This slot is reserved for the next booking SaaS demo.
                  </p>
                </>
              )}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
