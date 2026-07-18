/**
 * CurvedLoop — adapted from React Bits (https://reactbits.dev/text-animations/curved-loop)
 * Text repeated along a shallow SVG curve, looping endlessly via SMIL startOffset animation.
 * Pure SVG/CSS, no animation library.
 */

type CurvedLoopProps = {
  text: string;
  className?: string;
  /** seconds for one full loop */
  duration?: number;
};

const REPEAT_COUNT = 8;

export default function CurvedLoop({ text, className = "", duration = 22 }: CurvedLoopProps) {
  const pathId = "curved-loop-path";
  const item = ` ${text} • `;
  const repeated = item.repeat(REPEAT_COUNT);
  const step = 100 / REPEAT_COUNT;

  return (
    <div className={`curved-loop pointer-events-none select-none overflow-hidden ${className}`} aria-hidden>
      <svg viewBox="0 0 1200 160" className="h-28 w-full sm:h-36">
        <path id={pathId} d="M -200 110 Q 600 -20 2000 110" fill="none" />
        <text className="font-serif" style={{ fontSize: "42px", fill: "var(--color-gold)" }}>
          <textPath href={`#${pathId}`} startOffset="0%">
            {repeated}
            <animate
              attributeName="startOffset"
              from="0%"
              to={`-${step}%`}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
      <span className="sr-only">{text}</span>
    </div>
  );
}
