"use client";

/**
 * HeroLanyard — mounts the Lanyard card over the WHOLE hero section on desktop
 * (canvas covers the section, so the card can be dragged anywhere — no "box"
 * feeling), and falls back to a compact boxed canvas on mobile.
 */

import { useEffect, useState } from "react";
import Lanyard from "@/components/reactbits/Lanyard";

export default function HeroLanyard() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isDesktop === null) return null;

  if (isDesktop) {
    return (
      // -top-28 cancels the section's top padding so the canvas (and the band)
      // starts right at the very top of the hero, under the nav
      <div className="absolute inset-x-0 bottom-0 -top-28">
        <Lanyard
          position={[0, 0, 13]}
          gravity={[0, -40, 0]}
          anchorY={4.3}
          anchorX={3.1}
          frontImage="/images/profilepic.png"
          backImage="/images/profilepic.png"
          imageFit="cover"
        />
      </div>
    );
  }

  return (
    <div className="relative h-[440px] w-full">
      <Lanyard
        position={[0, 0, 16]}
        gravity={[0, -40, 0]}
        anchorY={4.2}
        frontImage="/images/profilepic.png"
        backImage="/images/profilepic.png"
        imageFit="cover"
      />
    </div>
  );
}
