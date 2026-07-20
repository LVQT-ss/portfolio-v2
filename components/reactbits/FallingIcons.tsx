"use client";

/**
 * FallingIcons — adapted from React Bits' FallingText (https://reactbits.dev),
 * but drops icon chips instead of words. Chips start laid out in a grid; when
 * the section scrolls into view they fall with matter-js physics and can be
 * grabbed/thrown with the mouse. Respects prefers-reduced-motion (stays static).
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Matter from "matter-js";

export type FallingIconItem = {
  name: string;
  icon: ReactNode;
};

export type FallingIconColumn = {
  title?: string;
  items: FallingIconItem[];
};

type FallingIconsProps = {
  /** each column gets its own physics compartment, separated by a divider wall */
  columns: FallingIconColumn[];
  /** how the effect starts */
  trigger?: "click" | "hover" | "auto" | "scroll";
  gravity?: number;
  mouseConstraintStiffness?: number;
  className?: string;
};

export default function FallingIcons({
  columns,
  trigger = "scroll",
  gravity = 0.9,
  mouseConstraintStiffness = 0.2,
  className = "",
}: FallingIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // trigger handling
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (trigger === "auto") {
      setStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // physics
  useEffect(() => {
    if (!started) return;
    const container = containerRef.current;
    const chipsWrap = chipsRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !chipsWrap || !canvasContainer) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainer,
      engine,
      options: { width, height, background: "transparent", wireframes: false },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    // divider walls between compartments — chips can't cross sides
    const dividers = Array.from({ length: columns.length - 1 }, (_, i) =>
      Bodies.rectangle(
        (width * (i + 1)) / columns.length,
        height / 2,
        4,
        height,
        boundaryOptions
      )
    );

    const chipEls = chipsWrap.querySelectorAll<HTMLElement>("[data-chip]");
    const chipBodies = [...chipEls].map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        chamfer: { radius: rect.height / 2 },
        render: { fillStyle: "transparent" },
        restitution: 0.6,
        frictionAir: 0.015,
        friction: 0.25,
      });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);
      // freeze current size so absolute positioning doesn't reflow it
      elem.style.width = `${rect.width}px`;
      elem.style.height = `${rect.height}px`;
      return { elem, body };
    });

    chipBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "translate(-50%, -50%)";
    });

    const mouse = Mouse.create(container);
    // Matter's mouse hijacks wheel + touch — remove so the page can still scroll
    type MouseWithHandlers = Matter.Mouse & {
      mousewheel: EventListener;
      mousedown: EventListener;
      mousemove: EventListener;
      mouseup: EventListener;
    };
    const m = mouse as MouseWithHandlers;
    mouse.element.removeEventListener("mousewheel", m.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", m.mousewheel);
    mouse.element.removeEventListener("wheel", m.mousewheel);
    mouse.element.removeEventListener("touchstart", m.mousedown);
    mouse.element.removeEventListener("touchmove", m.mousemove);
    mouse.element.removeEventListener("touchend", m.mouseup);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...dividers,
      mouseConstraint,
      ...chipBodies.map((cb) => cb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let raf = 0;
    const updateLoop = () => {
      raf = requestAnimationFrame(updateLoop);
      chipBodies.forEach(({ body, elem }) => {
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
    };
    raf = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(raf);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainer.contains(render.canvas)) {
        canvasContainer.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [started, gravity, mouseConstraintStiffness, columns.length]);

  const handleTrigger = () => {
    if (!started && (trigger === "click" || trigger === "hover")) {
      setStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      className={`relative overflow-hidden ${started ? "cursor-grab" : ""} ${className}`}
    >
      <div ref={chipsRef} className="flex h-full">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`flex h-full flex-1 flex-wrap content-start items-start justify-center gap-3 p-4 sm:p-6 ${
              col.title ? "pt-12 sm:pt-14" : "pt-8"
            } ${i > 0 ? "border-l border-border/60" : ""}`}
          >
            {col.items.map((item) => (
              <div
                key={item.name}
                data-chip
                className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* compartment titles — stay put, not part of the physics */}
      {columns.map(
        (col, i) =>
          col.title && (
            <div
              key={`title-${i}`}
              className="pointer-events-none absolute top-4 text-center text-[0.65rem] font-bold tracking-widest text-gold uppercase"
              style={{
                left: `${(i / columns.length) * 100}%`,
                width: `${(1 / columns.length) * 100}%`,
              }}
            >
              {col.title}
            </div>
          )
      )}
      <div ref={canvasContainerRef} className="pointer-events-none absolute inset-0 z-0" />
    </div>
  );
}
