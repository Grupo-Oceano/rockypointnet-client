# Project conventions

## Commands

- Build: `bun run build`
- Test: `bun test`
- Lint: `bun run lint`

## Stack

- TypeScript with strict mode
- Astro 6 with embedded Qwik islands for reactivity
- Internet face of the app Astro + Qwik Containers (Islands) | Admin face Qwik Embedded app

## Rules

- Qwik components lives in ./src/components/[modules or feature]/qwik
- Astro compoents lives directly in ./src/components/[modules or feature]/\*.astro
- Default exports for qwik components (\*.tsx)
- Tests live next to source: `foo.ts` -> `foo.test.ts`

## Internationalization

### Config

- Locales `en`, `es`. Default `en`. Fallback `es → en` (see [astro.config.mjs](../astro.config.mjs)).
- Use Astro's built-in i18n routing — no third-party routing libs.
- Locale switches always trigger a full navigation. Build URLs with `getRelativeLocaleUrl` / `getAbsoluteLocaleUrl` from `astro:i18n`; never concatenate the locale prefix by hand.
- Set `<html lang={Astro.currentLocale}>` in the root layout.

### Translation storage

- Typed TS dictionaries under [src/locales/](../src/locales/). `en.ts` is the source of truth for keys; `es.ts` must match its shape (derive `es.ts`'s type from `en.ts` so missing keys fail typecheck).
- When a file grows, split per feature: `src/locales/{lang}/{landing,search,...}.ts`, re-exported from `src/locales/{lang}/index.ts`.
- No per-component co-located strings — keep coverage auditable.
- Expose a `getDictionary(locale)` helper for Astro consumers.

### Astro ↔ Qwik boundary

**Astro resolves locale. Qwik islands receive `locale` as a prop and import their own dictionary slice. Strings are never passed as bulk props.**

- **Static / display content** (top nav, footer, hero copy, card body markup): render in Astro and look up strings server-side via `getDictionary(Astro.currentLocale)`. Do not serialize these into a Qwik island.
- **Interactive islands** (search bar, filter aside, sort dropdown, paginator, autocomplete): accept `locale: "en" | "es"` as a prop and statically import only the dictionary slice they need from `src/locales/{lang}/<feature>.ts`. The slice ships inside the island bundle so post-hydration strings ("Loading…", "No results for {query}", error states) resolve without extra fetches.
- **Result cards on search/results pages**: render the card shell in Astro for SSR. Only escalate sub-elements (favorite toggle, hover menu) to small Qwik islands when interactivity is required, and pass `locale` plus the minimal needed strings as props.
- **Search/results page composition**: the Astro page resolves locale once, mounts interactive controls (top search, aside filters, sort) as Qwik islands each receiving the `locale` prop, and SSRs the result cards. Filter or sort changes that produce new results trigger full navigation with updated query params — never client-side string swaps.
- **Dictionary slices consumed by Qwik must be primitive-only.** Qwik's resumability serializes the component closure; any function captured from a dictionary (e.g. `(name) => `por ${name}``) crashes SSR with `Code(Q34): Serialization Error: Cannot serialize function`. Lint and build pass — only SSR catches it. Keep template-functions scoped to Astro-only slices (e.g. `events.card.byOrganizer`, `footer.copyright`). For Qwik slices, expose a primitive prefix (e.g. `decrementAriaPrefix: "Disminuir"`) and concatenate at the call site (`aria-label={`${prefix} ${label.toLowerCase()}`}`).

### Locale-aware formatting

- Always format dates, numbers, and currency with `Intl.*` using the resolved locale. Never hardcode formats or month names.
- Inside Qwik, derive formatters from the `locale` prop.

### Adding a translatable string

1. Add the key to `en.ts` (source of truth).
2. Add the Spanish value to `es.ts` — TypeScript will fail until the key is present.
3. Read via `getDictionary(locale).<feature>.<key>` in Astro, or from the statically imported slice in Qwik.
4. Do not rely on the `es → en` fallback for shipped pages; fill both locales before merging.
