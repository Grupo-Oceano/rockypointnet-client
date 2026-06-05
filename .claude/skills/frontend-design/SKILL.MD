---
name: frontend-design
description: Build production UI for rockypointnet (Next.js) that is consistent with the established design system — React Server Components by default with small client islands, Tailwind v4 tokens (ocean/navy/emperor/sand), Spanish-first copy, and the tourism-site visual language shown in the landing mock. Use whenever the user asks for a component, section, or page in this app.
---

# Frontend design — rockypointnet (Next.js)

This skill encodes the **rockypointnet.com** design system. The goal is **consistency with the existing visual language**, not novelty. Match the patterns shown in the landing mock and the tokens defined in [app/globals.css](../../../app/globals.css); deviate only when the user explicitly asks for it.

## Stack & conventions (binding)

- **Next.js 16 App Router** for routes, layouts, and route handlers. The `app/` directory holds **only** Next file-convention files — no reusable components live there.
- **React 19 Server Components** by default. Mark `"use client"` only when the file needs state (`useState`/`useReducer`/`useRef`), effects, browser APIs, or event handlers wired directly in JSX. Push the `"use client"` boundary to the smallest leaf possible.
- Components live in `src/components/[feature]/` with **default exports**.
  - UI primitives shared across features: `src/components/ui/` (Icon, ImageCustom, Logo, LocaleSwitcher, Footer, TopNav)
  - Feature-scoped components: `src/components/[feature]/` (e.g. `src/components/landing/Hero.tsx`)
- **Tailwind v4** via `@tailwindcss/postcss`. Tokens live in `@theme` in [app/globals.css](../../../app/globals.css). Use token utilities (`bg-ocean-600`, `text-navy-800`) — never hard-code hex.
- Animation: prefer plain CSS transitions in server components. If you need JS-driven motion, isolate it inside a small `"use client"` component.
- **TypeScript strict**. Tests sit next to source (`foo.ts` → `foo.test.ts`).
- **Spanish-first copy**. Strings ship in Spanish (`es-MX` voice); only mirror to English when the user asks. Both locales must be filled before merging.
- Lint must pass with `--max-warnings=0`. Run `bun run lint` and `bun run build` before declaring done.

When in doubt about RSC vs client: if it needs `onClick`, `useState`, fetching window APIs, or any browser effect → small client component. Otherwise → server component (the default).

## Color system

All colors are defined in [app/globals.css](../../../app/globals.css) as OKLCH ramps. Use them like Tailwind colors (`bg-ocean-600`, `border-sand-300`).

| Token       | Role                                                                                          | Anchors                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **ocean**   | Primary brand. Active states, primary CTAs in-form, links, the `.NET` accent in the wordmark. | `ocean-600` is the brand base (#1252ae). Use `ocean-600` for solid fills, `ocean-700` for hover. |
| **navy**    | Deep accents, badges, the dark hero overlays.                                                 | `navy-800` for very dark surfaces.                                                               |
| **emperor** | Neutral text and warm-gray surfaces.                                                          | `emperor-900` for headings, `emperor-600`/`500` for body, `emperor-400` for muted.               |
| **sand**    | Warm light backgrounds, dividers, card surfaces.                                              | `sand-50`/`100` for page bg, `sand-200` for subtle fills.                                        |

Reserved tones used directly:

- **Pure black** (`bg-black text-white`) — pill CTAs (`VER TODOS LOS EVENTOS`, `RESERVA AHORA`) and the footer. Black is the **dominant primary action** outside of forms.
- **Pure white** — card surfaces over imagery and the search widget.
- **Amber `#FBBF24`** (Tailwind `amber-400`) — star ratings only.

Hierarchy rule: blue (`ocean-600`) is reserved for **in-context controls** (search button, active tab, links). Black is for **navigational/marketing CTAs**. Do not swap them.

## Typography

- **Inter** is the only font, used for everything. It is loaded once in [app/[lang]/layout.tsx](../../../app/[lang]/layout.tsx) via `next/font/google` and exposed as `--font-inter`; the `@theme` block in `globals.css` wires it into `--font-sans` so `font-sans` resolves to Inter. Do not introduce a second face.
- Weights in use: `font-normal` (400) body, `font-medium` (500) UI labels, `font-semibold` (600) subheads, `font-bold` (700) section titles, `font-extrabold` (800) the wordmark.
- Headings are tight and confident — `tracking-tight`, `leading-tight`, sizes `text-3xl` to `text-5xl` for section titles.
- Small caps tags ("Restaurante" label overlay): `text-xs uppercase tracking-wider font-medium`.
- The wordmark "ROCKY POINT.NET" is a single inline element — `.NET` rendered in `text-ocean-600`, the rest in `text-emperor-900`, all `font-extrabold tracking-tight`.

## Shape & elevation

- **Cards**: `rounded-2xl` (≈16px) or `rounded-3xl` (≈24px) for hero containers. No sharp corners on content surfaces.
- **Buttons**: pill-shaped — `rounded-full px-6 py-3` for primary, `rounded-full px-4 py-2` for compact.
- **Images inside cards**: `rounded-2xl` to match the card; bottom-anchored labels sit over a gradient overlay (`bg-linear-to-t from-black/70 to-transparent`) so white text stays legible.
- **Shadows**: prefer soft and low — `shadow-sm` on resting cards, `shadow-lg` on the floating search widget. Avoid hard `shadow-2xl` drops.

## Layout

- Page container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section vertical rhythm: `py-16 md:py-24`.
- Page background: `bg-sand-50` (set on `<body>` in the root layout). Prefer adding a new token to `@theme` over inlining custom values.
- The hero is an image-bleed block holding the search widget overlapping its bottom edge by ~50% (negative margin on the search card, not absolute positioning, so it reflows on mobile).

## Component patterns (from the mock)

Implement these as reusable primitives in `src/components/ui/` when shared across features, or `src/components/[feature]/` when feature-scoped.

### Top nav (`src/components/ui/TopNav.tsx`, client)

- Sticky, `bg-sand-50` with `backdrop-blur`, thin shadow on scroll.
- Logo on the left, icon+label links on the right (icons via `@components/ui/Icon`).
- Mobile: hamburger toggles a panel below. State is local (`useState`); no client router state.

### Hero with embedded search

- Full-width image carousel in `Hero` (server component) → `PartnersSlideshow` (client; scroll-snap + autoplay).
- Headline is white, centered, `text-4xl md:text-5xl font-bold`, with a subtle drop shadow.
- The search card is a white `rounded-2xl` panel with `shadow-lg`, overlapping the hero's bottom edge via negative margin so it reflows on mobile.

### Search tabs + form (client component: `src/components/landing/SearchWidget.tsx`)

- Tabs are pill buttons sitting on top of the card; the active tab is `bg-ocean-600 text-white`, others are `text-emperor-600 hover:text-emperor-900`.
- Inputs are bare: label above (`text-xs text-emperor-500 uppercase tracking-wide`), value row with a leading icon (`text-emperor-400`) and a hairline `border-b border-sand-300 focus-within:border-ocean-600`.
- Counter controls use circular outlined `+`/`−` buttons (`size-7 rounded-full border border-sand-300`), disabled-styled at min/max.
- Submit is the only solid blue in the section: `bg-ocean-600 hover:bg-ocean-700 text-white rounded-full px-8 py-3 font-semibold uppercase tracking-wide` with a leading `Search` icon.

### Image bento (Explora los mejores lugares)

- Asymmetric 2-column grid: one tall card on the left spanning two rows, a stack of shorter cards on the right.
- Each card is a `rounded-2xl` `ImageCustom fill` with a gradient overlay and a bottom-left caption block: small uppercase tag (e.g. `Restaurante`) over a larger white name.
- Hover: scale image `1.03` over 500ms ease-out, caption block lifts 4px — gentle, not bouncy.

### Advertiser banner

- Dark image background, full-bleed inside the container, `rounded-2xl` corners.
- Two-column layout: pitch text on the left, ad-slot label on the right. Headline white, supporting copy `text-sand-200`.

### Events strip

- Section heading sits over a wide image with a dark gradient overlay on the left half so the title stays legible.
- Card row is a horizontal scroll on mobile (`overflow-x-auto snap-x snap-mandatory`), grid of 4 on `lg`.
- Event card (`src/components/landing/EventCard.tsx`): white, `rounded-2xl`, image top via `ImageCustom fill` inside an aspect-ratio container, padded content below — title (semibold), then small `emperor-500` metadata lines (date, location, organizer), then star rating (amber filled lucide stars + numeric), and a footer row with `Share` + `Heart` icon buttons (`text-emperor-400 hover:text-emperor-700`).
- "Ver todos los eventos" lives below the row as a centered **black pill** button.

### Final CTA block

- Two-column on desktop: an image collage on the left (two photos overlapping at offset positions, each `rounded-2xl` with white border), and a right-aligned text block with title, supporting copy, and a black pill CTA (`RESERVA AHORA`).

### Footer (`src/components/ui/Footer.tsx`, server)

- `bg-black text-white`, single padded row on desktop, stacked on mobile. Links separated by visual spacing only (no pipes). Copyright line at the far left, rendered via `dict.footer.copyright(year)`.

## Motion

- **Default**: keep it subtle. Cards lift on hover (`transition-transform duration-300 ease-out hover:-translate-y-1`), buttons darken (`transition-colors`).
- For carousel/scroll-driven motion, contain it inside one `"use client"` component (e.g. `PartnersSlideshow`). Do not animate the surrounding server markup.
- Avoid full-page scroll-jacking and parallax — this is a content-discovery site, not a portfolio.

## Iconography

- **Lucide** outline icons via [@components/ui/Icon](../../../src/components/ui/Icon.tsx) — a centralized registry around `lucide-react`. No inline SVG icons in components — add the icon name to `Icon.tsx` instead.
- Single stroke width (`strokeWidth={1.5}`) across the app for resting icons. Use `strokeWidth={2}` only when an icon needs to read at very small sizes.
- "Filled" variants (filled star for a rating, filled heart when saved) use the same `lucide-react` icon with `fill="currentColor"` (or a literal token color) — do not pull from a different icon set.

## Images

- Every image goes through [@components/ui/ImageCustom](../../../src/components/ui/ImageCustom.tsx). It wraps `next/image` and runs `resolveImageSrc` on the path — local paths pass through, remote URLs route through `/api/image-proxy?url=…` (when wired). Do not import `next/image` directly anywhere outside `ImageCustom`.
- Use `width`/`height` for fixed-size images (logo). Use `fill` + a real `sizes` hint for absolute-positioned/full-bleed images. Parent must be `position: relative`.
- `alt=""` for purely decorative images; otherwise describe the content.

## Accessibility

- All images need `alt`. Decorative-only images get `alt=""` plus `aria-hidden="true"` if behind content.
- Form inputs need real `<label>`s. The label-above-input pattern is visual; the markup must still be semantic.
- Color contrast: white text only over the dark half of gradients, never over raw mid-tone imagery. Verify hero headlines hit 4.5:1.
- Interactive cards must be reachable by keyboard — wrap them in `<Link>` or `<button>`, not click handlers on `<div>`.

## When the user gives you a design task

1. **Locate it in the system first.** Identify which existing pattern above (or in `src/components/`) the request maps to. Extend the pattern; do not invent a parallel one.
2. **Pick server vs client component** based on the interactivity rule, not preference. Push state to the smallest possible client subtree; pass `locale` and dictionary slices as plain props.
3. **Use tokens, not literals.** If a color or radius isn't covered, propose adding it to `@theme` in `app/globals.css` rather than inlining a hex.
4. **Write Spanish copy** by default. If you need placeholder copy, write it in `es-MX` voice ("Reserva ahora", "Ver todos los eventos", "¿Listo para vivir Rocky Point?").
5. **Verify**: `bun run lint` and `bun run build` clean before reporting done. For client components, exercise the feature in the browser — type checks don't catch layout, hover, or hydration bugs.

The bar is **production quality within the established system**. Polish lives in spacing, alignment, and typography — not in introducing new aesthetic directions.
