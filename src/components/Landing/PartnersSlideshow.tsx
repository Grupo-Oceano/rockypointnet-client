import { component$, useSignal } from "@qwik.dev/core";

export const PartnersSlideshow = component$(() => {
  const counter = useSignal(0);

  return (
    <div class="flex flex-col gap-6 w-full h-64 bg-gray-200 items-center justify-center">
      <p class="text-gray-500">Partners Slideshow Placeholder</p>

      <h1>Partner {counter.value}</h1>

      <button
        class="bg-gray-700 text-white px-4 py-2 rounded"
        onClick$={() => counter.value++}
      >
        Next Partner ({counter.value})
      </button>
    </div>
  );
});
