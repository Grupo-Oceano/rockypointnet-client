import hero1 from "@assets/carousel-samples/hero-1.webp?url";
import hero2 from "@assets/carousel-samples/hero-2.webp?url";
import hero3 from "@assets/carousel-samples/hero-3.webp?url";
import hero4 from "@assets/carousel-samples/hero-4.webp?url";
import hero5 from "@assets/carousel-samples/hero-5.webp?url";
import hero6 from "@assets/carousel-samples/hero-6.webp?url";
import { getDictionary, type Locale } from "@locales";
import { component$ } from "@qwik.dev/core";
import { useSlideshow } from "../../../hooks/useSlideShow";

interface Props {
	locale: Locale;
}

const PartnersSlideshow = component$<Props>(({ locale }) => {
	const hero = getDictionary(locale).hero;

	const partners = [
		{ title: hero.slides.welcome, src: hero1, color: "bg-rose-200" },
		{ title: "", src: hero2, color: "bg-emerald-200" },
		{ title: "", src: hero3, color: "bg-sky-200" },
		{ title: "", src: hero4, color: "bg-yellow-200" },
		{ title: "", src: hero5, color: "bg-purple-200" },
		{ title: "", src: hero6, color: "bg-pink-200" },
	];

	const { containerRef, goTo$, next$, prev$, paused, counter } = useSlideshow("[data-slide]", partners.length, 5000);

	return (
		<div
			class="group bg-emperor-200 relative h-90 w-full overflow-hidden rounded-3xl sm:h-105 md:h-120"
			onMouseEnter$={() => (paused.value = true)}
			onMouseLeave$={() => (paused.value = false)}
		>
			<div ref={containerRef} class="absolute inset-0">
				{partners.map((p, i) => (
					<div key={i} data-slide class={`absolute inset-0 ${p.color} ${i === 0 ? "opacity-100" : "opacity-0"}`}>
						<img
							src={p.src}
							alt={p.title}
							loading={i === 0 ? "eager" : "lazy"}
							decoding="async"
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />
						{p.title && (
							<div class="absolute inset-0 flex items-center justify-center px-6">
								<h1 class="max-w-2xl text-center text-3xl leading-tight font-bold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
									{p.title}
								</h1>
							</div>
						)}
					</div>
				))}
			</div>

			<button
				type="button"
				aria-label={hero.previousAria}
				onClick$={prev$}
				class="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 opacity-0 shadow transition-opacity ease-in-out group-hover:opacity-100 hover:bg-white"
			>
				‹
			</button>
			<button
				type="button"
				aria-label={hero.nextAria}
				onClick$={next$}
				class="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 opacity-0 shadow transition-opacity ease-in-out group-hover:opacity-100 hover:bg-white"
			>
				›
			</button>

			<div class="absolute right-0 bottom-3 left-0 z-10 flex justify-center gap-2">
				{partners.map((_, i) => (
					<button
						key={i}
						type="button"
						aria-label={`${hero.goToAriaPrefix} ${i + 1}`}
						onClick$={() => goTo$(i)}
						class={`h-2.5 w-2.5 rounded-full transition-colors ${i === counter.value ? "bg-gray-800" : "bg-gray-400/60 hover:bg-gray-500"}`}
					/>
				))}
			</div>
		</div>
	);
});

export default PartnersSlideshow;
