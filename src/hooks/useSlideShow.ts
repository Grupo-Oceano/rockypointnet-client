import { $, useSignal, useVisibleTask$ } from "@qwik.dev/core";
import { animate } from "motion/mini";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const DURATION = 0.5;

export const useSlideshow = (
  selector: string,
  length: number,
  autoAdvanceMs: number = 3000,
) => {
  const containerRef = useSignal<HTMLDivElement>();
  const paused = useSignal(false);
  const counter = useSignal(0);
  const previous = useSignal(0);
  const direction = useSignal<"right" | "left">("right");

  const goTo$ = $((i: number) => {
    const target = (i + length) % length;
    if (target === counter.value) return;
    direction.value = target > counter.value ? "right" : "left";
    previous.value = counter.value;
    counter.value = target;
  });

  const next$ = $(() => {
    direction.value = "right";
    previous.value = counter.value;
    counter.value = (counter.value + 1) % length;
  });

  const prev$ = $(() => {
    direction.value = "left";
    previous.value = counter.value;
    counter.value = (counter.value - 1 + length) % length;
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => counter.value);
    const id = setInterval(() => {
      if (!paused.value) {
        direction.value = "right";
        previous.value = counter.value;
        counter.value = (counter.value + 1) % length;
      }
    }, autoAdvanceMs);
    cleanup(() => clearInterval(id));
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => counter.value);
    const container = containerRef.value;
    if (!container) return;

    const i = counter.value;
    const prevIndex = previous.value;
    if (i === prevIndex) return;

    const dir = direction.value;
    const enterFrom = dir === "right" ? "100%" : "-100%";
    const exitTo = dir === "right" ? "-100%" : "100%";

    const slides = Array.from(
      container.querySelectorAll<HTMLDivElement>(selector),
    );
    const controls: ReturnType<typeof animate>[] = [];

    slides.forEach((slide, idx) => {
      if (idx === i) {
        slide.style.zIndex = "2";
        slide.style.opacity = "1";
        controls.push(
          animate(
            slide,
            { transform: [`translateX(${enterFrom})`, "translateX(0%)"] },
            { duration: DURATION, ease: EASE },
          ),
        );
      } else if (idx === prevIndex) {
        slide.style.zIndex = "1";
        slide.style.opacity = "1";
        controls.push(
          animate(
            slide,
            { transform: ["translateX(0%)", `translateX(${exitTo})`] },
            { duration: DURATION, ease: EASE },
          ),
        );
      } else {
        slide.style.zIndex = "0";
        slide.style.opacity = "0";
        slide.style.transform = "translateX(0%)";
      }
    });

    cleanup(() => controls.forEach((c) => c.cancel()));
  });

  return {
    containerRef,
    goTo$,
    next$,
    prev$,
    paused,
    counter,
  };
};
