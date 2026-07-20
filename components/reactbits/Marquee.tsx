/**
 * Marquee — seamless infinite horizontal scroll.
 * Renders two copies of the track back-to-back and animates translateX(-50%);
 * since both halves are identical, the loop point is invisible. Pure CSS,
 * paused for prefers-reduced-motion via the .animate-marquee-x class in globals.css.
 */

type MarqueeProps = {
  children: React.ReactNode;
  speed?: number; // seconds per loop
  className?: string;
};

export default function Marquee({ children, speed = 16, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max">
        <div
          className="flex shrink-0 items-baseline animate-marquee-x"
          style={{ animationDuration: `${speed}s` }}
        >
          {children}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 items-baseline animate-marquee-x"
          style={{ animationDuration: `${speed}s` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
