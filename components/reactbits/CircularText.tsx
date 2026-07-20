/**
 * CircularText — text laid out on a circle, slowly spinning.
 * Pure SVG + CSS, no runtime cost. Overlay-friendly (pointer-events: none).
 */

type CircularTextProps = {
  text: string;
  /** seconds per full rotation */
  duration?: number;
  className?: string;
};

const R = 78;
const CIRCUMFERENCE = Math.round(2 * Math.PI * R);

export default function CircularText({
  text,
  duration = 18,
  className = "",
}: CircularTextProps) {
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <style>{`@keyframes circular-text-spin { to { transform: rotate(360deg); } }`}</style>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        style={{
          animation: `circular-text-spin ${duration}s linear infinite`,
          transformOrigin: "50% 50%",
        }}
      >
        <defs>
          <path
            id="circular-text-path"
            d={`M 100,100 m -${R},0 a ${R},${R} 0 1,1 ${R * 2},0 a ${R},${R} 0 1,1 -${R * 2},0`}
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="13.5"
          fontWeight="700"
          letterSpacing="2.5"
          style={{ textTransform: "uppercase" }}
        >
          <textPath
            href="#circular-text-path"
            textLength={CIRCUMFERENCE}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
        {/* center accent */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fontSize="18"
        >
          ✦
        </text>
      </svg>
    </div>
  );
}
