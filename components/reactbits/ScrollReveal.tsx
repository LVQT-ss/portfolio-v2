"use client";

/**
 * ScrollReveal — adapted from React Bits (https://reactbits.dev/text-animations/scroll-reveal)
 * Splits text into words and reveals them (opacity/blur) as the container
 * rotates upright while scrolling into view.
 */

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Element whose scroll position drives the animation, if different from the
   *  rendered text itself — e.g. a tall pinned wrapper around a sticky child. */
  triggerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  triggerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = triggerRef?.current ?? el;
    const scroller = scrollContainerRef?.current ?? window;

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll(".word");

    const opacityTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    let blurTween: gsap.core.Tween | undefined;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      rotationTween.scrollTrigger?.kill();
      opacityTween.scrollTrigger?.kill();
      blurTween?.scrollTrigger?.kill();
      rotationTween.kill();
      opacityTween.kill();
      blurTween?.kill();
    };
  }, [scrollContainerRef, triggerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
}
