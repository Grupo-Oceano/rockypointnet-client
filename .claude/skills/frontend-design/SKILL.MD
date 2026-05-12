---
name: frontend-design
description: Build production UI for rockypointnet-client that is consistent with the established design system — Astro pages with Qwik islands, Tailwind v4 tokens (ocean/navy/emperor/sand), Spanish-first copy, and the tourism-site visual language shown in the landing mock. Use whenever the user asks for a component, section, or page in this app.
---

# Frontend design — rockypointnet-client

This skill encodes the **rockypointnet.com** design system. The goal is **consistency with the existing visual language**, not novelty. Match the patterns shown in the landing mock and the tokens defined in [src/styles/global.css](../../../src/styles/global.css); deviate only when the user explicitly asks for it.

## Stack & conventions (binding)

- **Astro 6** for pages, layouts, and non-interactive markup → `*.astro` in `src/components/[module]/`
- **Qwik islands** (`@qwik.dev/astro`) for any interactivity, state, or client effects → `*.tsx` in `src/components/[module]/qwik/`, **default export**
- **Tailwind v4** via `@tailwindcss/vite`. Tokens live in `@theme` in [src/styles/global.css](../../../src/styles/global.css). Use token utilities (`bg-ocean-600`, `text-navy-800`) — do not hard-code hex.
- **Motion** (`motion` v12) for animation in Qwik islands. Plain CSS transitions for Astro-only markup.
- **TypeScript strict**. Tests sit next to source (`foo.ts` → `foo.test.ts`).
- **Spanish-first copy**. Strings ship in Spanish (`es-MX` voice); only mirror to English when the user asks.
- Lint must pass with `--max-warnings=0`. Run `bun run lint` and `bun run build` before declaring done.

When in doubt about Astro vs. Qwik: if it needs `onClick`, `useSignal`, fetching, or any client state → Qwik island. Otherwise → Astro.

## Color system

All colors are defined in [src/styles/global.css](../../../src/styles/global.css) as OKLCH ramps. Use them like Tailwind colors (`bg-ocean-600`, `border-sand-300`).

| Token       | Role                                                    | Anchors                          |
| ----------- | ------------------------------------------------------- | -------------------------------- |
| **ocean**   | Primary brand. Active states, primary CTAs in-form, links, the `.NET` accent in the wordmark. | `ocean-600` is the brand base (#1252ae). Use `ocean-600` for solid fills, `ocean-700` for hover. |
| **navy**    | Deep accents, badges, the dark hero overlays.           | `navy-800` for very dark surfaces.|
| **emperor** | Neutral text and warm-gray surfaces.                    | `emperor-900` for headings, `emperor-600`/`500` for body, `emperor-400` for muted. |
| **sand**    | Warm light backgrounds, dividers, card surfaces.        | `sand-50`/`100` for page bg, `sand-200` for subtle fills. |

Reserved tones used directly:
- **Pure black** (`bg-black text-white`) — pill CTAs (`VER TODOS LOS EVENTOS`, `RESERVA AHORA`) and the footer. Black is the **dominant primary action** outside of forms.
- **Pure white** — card surfaces over imagery and the search widget.
- **Amber `#FBBF24`** (Tailwind `amber-400`) — star ratings only.

Hierarchy rule: blue (`ocean-600`) is reserved for **in-context controls** (search button, active tab, links). Black is for **navigational/marketing CTAs**. Do not swap them.

## Typography

- **Inter** is the only font, used for everything (body, headings, wordmark, UI). Load it once in the root layout (Google Fonts or self-hosted) and expose it as the default sans via `@theme { --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif; }` in [global.css](../../../src/styles/global.css) so `font-sans` resolves to Inter. Do not introduce a second face.
- Weights in use: `font-normal` (400) body, `font-medium` (500) UI labels, `font-semibold` (600) subheads, `font-bold` (700) section titles, `font-extrabold` (800) the wordmark.
- Headings are tight and confident — `tracking-tight`, `leading-tight`, sizes `text-3xl` to `text-5xl` for section titles.
- Small caps tags ("Restaurante" label overlay): `text-xs uppercase tracking-wider font-medium`.
- The wordmark "ROCKY POINT.NET" is a single inline element — `.NET` rendered in `text-ocean-600`, the rest in `text-emperor-900`, all `font-extrabold tracking-tight`.

## Shape & elevation

- **Cards**: `rounded-2xl` (≈16px) or `rounded-3xl` (≈24px) for hero containers. No sharp corners on content surfaces.
- **Buttons**: pill-shaped — `rounded-full px-6 py-3` for primary, `rounded-full px-4 py-2` for compact.
- **Images inside cards**: `rounded-2xl` to match the card; bottom-anchored labels sit over a gradient overlay (`bg-gradient-to-t from-black/70 to-transparent`) so white text stays legible.
- **Shadows**: prefer soft and low — `shadow-sm` on resting cards, `shadow-lg` on the floating search widget. Avoid hard `shadow-2xl` drops.

## Layout

- Page container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section vertical rhythm: `py-16 md:py-24`.
- Page background: `bg-sand-50` (or the very light blue-gray tint used in the mock — `bg-[color:oklch(0.97_0.005_255)]` if a custom step is needed; prefer adding it as a new token in `global.css` rather than inlining repeatedly).
- The hero is an image-bleed block with `rounded-3xl` corners, holding the search widget overlapping its bottom edge by ~50%.

## Component patterns (from the mock)

Implement these as reusable primitives in `src/components/ui/` (Astro) or `src/components/ui/qwik/` (Qwik) when they are used in more than one place.

### Top nav
- White, sticky, thin border-bottom in `border-sand-200`.
- Logo on the left, icon+label links on the right (icons from a single set — Lucide).
- Icons sit **above or before** the label, never decorative; same stroke width across the row.

### Hero with embedded search
- Full-width image with `rounded-3xl` and inner padding for the headline.
- Headline is white, centered, `text-4xl md:text-5xl font-bold`, with a subtle text-shadow if contrast fails.
- The search card is a white `rounded-2xl` panel with `shadow-lg`, overlapping the hero's bottom edge by roughly half its height (negative margin on the search card, not absolute positioning, so it reflows on mobile).

### Search tabs + form (Qwik island)
- Tabs are pill buttons sitting on top of the card; the active tab is `bg-ocean-600 text-white`, others are `text-emperor-700 hover:text-emperor-900` (no chrome).
- Inputs are bare: label above (`text-xs text-emperor-500 uppercase tracking-wide`), value row with a leading icon (`text-emperor-400`) and a hairline `border-b border-sand-300 focus-within:border-ocean-600`.
- Counter controls use circular outlined `+`/`−` buttons (`size-7 rounded-full border border-sand-300`).
- Submit is the only solid blue in the section: `bg-ocean-600 hover:bg-ocean-700 text-white rounded-full px-8 py-3 font-semibold uppercase tracking-wide` with a leading search icon.

### Image bento (Explora los mejores lugares)
- Asymmetric 2-column grid: one tall card on the left spanning two rows, a stack of shorter cards on the right.
- Each card is a `rounded-2xl` image with a gradient overlay and a bottom-left caption block: small uppercase tag (e.g. `Restaurante`) over a larger white name.
- Hover: scale image `1.03` over 400ms ease-out, caption block lifts 4px — gentle, not bouncy.

### Advertiser banner
- Dark image background, full-bleed inside the container, `rounded-2xl` corners.
- Two-column layout: pitch text on the left, ad slot label on the right. Headline is white, supporting copy `text-sand-200`.

### Events strip
- Section heading sits over a wide image with a dark gradient overlay on the left half so the title stays legible.
- Card row is a horizontal scroll on mobile (`overflow-x-auto snap-x snap-mandatory`), grid of 4 on `lg`.
- Event card: white, `rounded-2xl`, image top with `rounded-t-2xl`, padded content below — title (semibold), then small `emperor-500` metadata lines (date, location, organizer), then star rating (amber filled stars + numeric), and a footer row with share + heart icon buttons (`text-emperor-400 hover:text-emperor-700`).
- "Ver todos los eventos" lives below the row as a centered **black pill** button.

### Final CTA block
- Two-column on desktop: an image collage on the left (two photos overlapping at offset positions, each `rounded-2xl` with white border), and a right-aligned text block with title, supporting copy, and a black pill CTA (`RESERVA AHORA`).

### Footer
- `bg-black text-white`, single padded row on desktop, stacked on mobile. Links separated by visual spacing only (no pipes). Copyright line at the far left.

## Motion

- **Default**: keep it subtle. Cards lift on hover (`transition-transform duration-300 ease-out hover:-translate-y-1`), buttons darken (`transition-colors`).
- **Hero / first-paint**: a single staggered reveal of headline + search card is appropriate. Use `motion` in the Qwik island that owns the search; do not animate the Astro markup itself.
- Avoid carousel auto-rotation, parallax, and full-page scroll-jacking — this is a content-discovery site, not a portfolio.

## Iconography

- **Lucide** outline icons, single stroke width (`stroke-[1.5]`) across the app.
- Filled icons (star, heart-when-saved) use the same family's `*Filled` variants, not a different set.

## Accessibility

- All images need `alt`. Decorative-only images get `alt=""`.
- Form inputs need real `<label>`s (the label-above-input pattern is visual; the markup must still be semantic).
- Color contrast: white text only over the dark half of gradients, never over raw mid-tone imagery. Verify hero headlines hit 4.5:1.
- Interactive cards must be reachable by keyboard — wrap them in `<a>` or `<button>`, not click handlers on `<div>`.

## When the user gives you a design task

1. **Locate it in the system first.** Identify which existing pattern above (or in `src/components/`) the request maps to. Extend the pattern; do not invent a parallel one.
2. **Pick Astro or Qwik** based on the interactivity rule, not preference.
3. **Use tokens, not literals.** If a color or radius isn't covered, propose adding it to `@theme` in `global.css` rather than inlining a hex.
4. **Write Spanish copy** by default. If you need placeholder copy, write it in `es-MX` voice ("Reserva ahora", "Ver todos los eventos", "¿Listo para vivir Rocky Point?").
5. **Verify**: `bun run lint` and `bun run build` clean before reporting done. For interactive islands, exercise the feature in the browser.

The bar is **production quality within the established system**. Polish lives in spacing, alignment, and typography — not in introducing new aesthetic directions.
