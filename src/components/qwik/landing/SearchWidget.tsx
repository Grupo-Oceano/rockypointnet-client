import { getDictionary, type Locale } from "@locales";
import { $, component$, Slot, useSignal } from "@qwik.dev/core";

type TabId = "hotels" | "restaurants" | "attractions" | "events";

const todayIso = () => {
	const d = new Date();
	return d.toISOString().slice(0, 10);
};

interface Props {
	locale: Locale;
}

const SearchWidget = component$<Props>(({ locale }) => {
	const search = getDictionary(locale).search;
	const tabs: { id: TabId; label: string }[] = [
		{ id: "hotels", label: search.tabs.hotels },
		{ id: "restaurants", label: search.tabs.restaurants },
		{ id: "attractions", label: search.tabs.attractions },
		{ id: "events", label: search.tabs.events },
	];

	const activeTab = useSignal<TabId>("hotels");
	const checkIn = useSignal(todayIso());
	const checkOut = useSignal(todayIso());
	const rooms = useSignal(1);
	const adults = useSignal(1);
	const children = useSignal(0);

	const step$ = $((sig: { value: number }, delta: number, min = 0, max = 30) => {
		const next = sig.value + delta;
		if (next < min || next > max) return;
		sig.value = next;
	});

	return (
		<section class="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-12 md:px-18" aria-label={search.sectionAria}>
			<div class="-mt-8 rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:-mt-12 md:p-8">
				<div role="tablist" aria-label={search.tabsAria} class="mb-5 flex flex-wrap gap-1 sm:gap-2">
					{tabs.map((t) => {
						const selected = t.id === activeTab.value;
						return (
							<button
								key={t.id}
								type="button"
								role="tab"
								aria-selected={selected}
								onClick$={() => (activeTab.value = t.id)}
								class={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
									selected ? "bg-ocean-600 text-white shadow-sm" : "text-emperor-600 hover:bg-sand-100 hover:text-emperor-900"
								}`}
							>
								{t.label}
							</button>
						);
					})}
				</div>

				<form
					preventdefault:submit
					onSubmit$={() => {
						// Submit handler placeholder — wire to actual search route later
					}}
					class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end"
				>
					<Field label={search.fields.arrival}>
						<CalendarIcon />
						<input
							type="date"
							aria-label={search.fields.arrivalAria}
							bind:value={checkIn}
							class="text-emperor-800 w-full bg-transparent text-sm outline-none"
						/>
					</Field>

					<Field label={search.fields.departure}>
						<CalendarIcon />
						<input
							type="date"
							aria-label={search.fields.departureAria}
							bind:value={checkOut}
							class="text-emperor-800 w-full bg-transparent text-sm outline-none"
						/>
					</Field>

					<Counter
						label={search.fields.rooms}
						value={rooms.value}
						min={1}
						max={10}
						decrementAria={`${search.decrementAriaPrefix} ${search.fields.rooms.toLowerCase()}`}
						incrementAria={`${search.incrementAriaPrefix} ${search.fields.rooms.toLowerCase()}`}
						onDec$={() => step$(rooms, -1, 1, 10)}
						onInc$={() => step$(rooms, 1, 1, 10)}
					/>

					<Counter
						label={search.fields.adults}
						value={adults.value}
						min={1}
						max={16}
						decrementAria={`${search.decrementAriaPrefix} ${search.fields.adults.toLowerCase()}`}
						incrementAria={`${search.incrementAriaPrefix} ${search.fields.adults.toLowerCase()}`}
						onDec$={() => step$(adults, -1, 1, 16)}
						onInc$={() => step$(adults, 1, 1, 16)}
					/>

					<Counter
						label={search.fields.children}
						value={children.value}
						min={0}
						max={12}
						decrementAria={`${search.decrementAriaPrefix} ${search.fields.children.toLowerCase()}`}
						incrementAria={`${search.incrementAriaPrefix} ${search.fields.children.toLowerCase()}`}
						onDec$={() => step$(children, -1, 0, 12)}
						onInc$={() => step$(children, 1, 0, 12)}
					/>

					<div class="flex justify-end lg:pb-1">
						<button
							type="submit"
							class="bg-ocean-600 hover:bg-ocean-700 focus-visible:outline-ocean-600 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							<SearchIcon />
							{search.submit}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
});

export default SearchWidget;

const Field = component$<{ label: string }>(({ label }) => {
	return (
		<label class="flex flex-col gap-1">
			<span class="text-emperor-500 text-xs font-medium tracking-wide uppercase">{label}</span>
			<span class="border-sand-300 focus-within:border-ocean-600 flex items-center gap-2 border-b pb-1.5">
				<Slot />
			</span>
		</label>
	);
});

interface CounterProps {
	label: string;
	value: number;
	min: number;
	max: number;
	decrementAria: string;
	incrementAria: string;
	onDec$: () => void;
	onInc$: () => void;
}

const Counter = component$<CounterProps>(({ label, value, min, max, decrementAria, incrementAria, onDec$, onInc$ }) => {
	return (
		<div class="flex flex-col gap-1">
			<span class="text-emperor-500 text-xs font-medium tracking-wide uppercase">{label}</span>
			<div class="border-sand-300 flex items-center justify-between border-b pb-1.5">
				<button
					type="button"
					aria-label={decrementAria}
					onClick$={onDec$}
					disabled={value <= min}
					class="border-sand-300 text-emperor-600 hover:border-ocean-600 hover:text-ocean-600 grid size-7 place-items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
				>
					<MinusIcon />
				</button>
				<span aria-live="polite" class="text-emperor-800 min-w-[1.5rem] text-center text-sm font-semibold">
					{value}
				</span>
				<button
					type="button"
					aria-label={incrementAria}
					onClick$={onInc$}
					disabled={value >= max}
					class="border-sand-300 text-emperor-600 hover:border-ocean-600 hover:text-ocean-600 grid size-7 place-items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
				>
					<PlusIcon />
				</button>
			</div>
		</div>
	);
});

const CalendarIcon = component$(() => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="text-emperor-400 size-4"
		aria-hidden="true"
	>
		<path d="M8 2v4" />
		<path d="M16 2v4" />
		<rect width="18" height="18" x="3" y="4" rx="2" />
		<path d="M3 10h18" />
	</svg>
));

const SearchIcon = component$(() => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="size-4"
		aria-hidden="true"
	>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>
));

const MinusIcon = component$(() => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="size-3.5"
		aria-hidden="true"
	>
		<path d="M5 12h14" />
	</svg>
));

const PlusIcon = component$(() => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="size-3.5"
		aria-hidden="true"
	>
		<path d="M5 12h14" />
		<path d="M12 5v14" />
	</svg>
));
