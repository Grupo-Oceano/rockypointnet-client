import hero1 from "@assets/carousel-samples/hero-1.webp?url";
import hero2 from "@assets/carousel-samples/hero-2.webp?url";
import hero3 from "@assets/carousel-samples/hero-3.webp?url";
import hero4 from "@assets/carousel-samples/hero-4.webp?url";
import hero5 from "@assets/carousel-samples/hero-5.webp?url";
import hero6 from "@assets/carousel-samples/hero-6.webp?url";
import { component$ } from "@qwik.dev/core";
import { useSlideshow } from "../../../hooks/useSlideShow";

const PARTNERS = [
  {
    title: "Comienza tu aventura en Rocky Point",
    src: hero1,
    color: "bg-rose-200",
  },
  { title: "", src: hero2, color: "bg-emerald-200" },
  { title: "", src: hero3, color: "bg-sky-200" },
  { title: "", src: hero4, color: "bg-yellow-200" },
  { title: "", src: hero5, color: "bg-purple-200" },
  { title: "", src: hero6, color: "bg-pink-200" },
];

const PartnersSlideshow = component$(() => {
  const { containerRef, goTo$, next$, prev$, paused, counter } = useSlideshow(
    "[data-slide]",
    PARTNERS.length,
    5000,
  );

  return (
    <div
      class="relative w-full h-64 overflow-hidden rounded-lg bg-gray-200"
      onMouseEnter$={() => (paused.value = true)}
      onMouseLeave$={() => (paused.value = false)}
    >
      <div ref={containerRef} class="absolute inset-0">
        {PARTNERS.map((p, i) => (
          <div
            key={i}
            data-slide
            class={`absolute inset-0 flex items-center justify-center ${p.color} ${
              i === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={p.src}
              alt={p.title}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              class="w-full h-full object-cover"
            />
            {p.title && (
              <span class="text-2xl font-semibold text-gray-800">
                {p.title}
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous partner"
        onClick$={prev$}
        class="absolute z-10 left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next partner"
        onClick$={next$}
        class="absolute z-10 right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow"
      >
        ›
      </button>

      <div class="absolute z-10 bottom-3 left-0 right-0 flex justify-center gap-2">
        {PARTNERS.map((p, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${p.title}`}
            onClick$={() => goTo$(i)}
            class={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === counter.value
                ? "bg-gray-800"
                : "bg-gray-400/60 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

export default PartnersSlideshow;
