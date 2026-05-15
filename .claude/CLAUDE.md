# Project conventions

## Commands

- Dev: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Test: `bun test` (no suite yet — colocate tests as `foo.ts` → `foo.test.ts`)

## Stack

- TypeScript strict mode
- Next.js 16 (App Router) with React 19, Turbopack
- React Server Components by default; `"use client"` only when the file needs state, effects, or browser APIs
- Tailwind v4 via `@tailwindcss/postcss`. Tokens in [app/globals.css](../app/globals.css) `@theme` block
- **This is NOT the Next.js you know** — Next 16 has breaking changes (notably Middleware → Proxy, async `params`, `app/[lang]/layout.tsx` as the root layout). Read the relevant guide in `node_modules/next/dist/docs/` before writing new file-convention code. See [AGENTS.md](../AGENTS.md).

## File structure

- `app/` — **routes only**. No reusable components live here.
  - `app/[lang]/layout.tsx` is the **root layout** (defines `<html>` and `<body>`); there is no `app/layout.tsx`.
  - `app/[lang]/...` — locale-scoped pages and nested layouts.
  - `app/api/*/route.ts` — route handlers (Web `Request`/`Response`; named HTTP-method exports).
- `src/components/[feature]/` — feature-grouped components (`landing/`, `ui/`). **Default exports.**
- `src/lib/` — shared utilities (`utils.ts` for `cn`, `routes.ts` for `localeUrl`, `images.ts` for `resolveImageSrc`).
- `src/locales/` — typed dictionaries (`en.ts` source of truth, `es.ts` typed against it, `index.ts` for helpers).
- `src/constants/` — typed data registries (modules, search tabs).
- `public/` — static assets served at the root path.
- `proxy.ts` — Next 16 renamed Middleware → Proxy. Locale-redirect logic lives here.

## Path aliases (tsconfig.json)

- `@/*` → repo root (use as `@/src/...` from inside `app/`)
- `@components/*` → `src/components/*`
- `@lib/*` → `src/lib/*`
- `@locales` → `src/locales/index.ts`
- `@locales/*` → `src/locales/*`

## Server vs Client components

Default to **Server Components** (RSC). Mark `"use client"` only when the file needs:

- React state (`useState`, `useReducer`) or refs (`useRef`)
- Effects (`useEffect`, `useLayoutEffect`) or browser APIs (`window`, `document`, `IntersectionObserver`, etc.)
- Event handlers wired directly in JSX (`onClick`, `onSubmit`)

Push `"use client"` to the smallest leaf possible — a single interactive control or section, not a whole page. Server components can render client components freely; the inverse requires `children` prop.

When defining components, our convention is to use a typed props interface and a default export. For example:

```tsx
interface Props {
  exampleProp: string;
}

const ExampleComponent: React.FC<Props> = ({ exampleProp }) => {
  return <div>{exampleProp}</div>;
};

export default ExampleComponent;
```

Notes that **do not** apply here (carryover from the Astro+Qwik version of this app):

- There is no Qwik-style serialization constraint. Dictionary entries can be functions (`(year) => \`© ${year}\``) and used freely in RSC or client components.
- There is no Astro ↔ Qwik boundary. Everything is React.

## Internationalization

### Config

- Locales `en`, `es`. Default `en`.
- Routing: `app/[lang]/...` with `generateStaticParams` returning both locales. Both locales are URL-prefixed (`/en`, `/es`).
- Unprefixed paths (`/`, `/hotels`) are redirected by [proxy.ts](../proxy.ts) using `Accept-Language`, falling back to `en`.
- The `[lang]` root layout sets `<html lang={lang}>` dynamically.

### Dictionaries

- Typed TS dictionaries under [src/locales/](../src/locales/). `en.ts` is the source of truth for keys; `es.ts` is typed as `Dictionary` so TS fails if keys diverge.
- Helpers in `src/locales/index.ts`: `getDictionary(locale)`, `resolveLocale(value)`, `hasLocale(value)`, `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`.
- When a file grows, split per feature: `src/locales/{lang}/{landing,search,...}.ts`, re-exported from `src/locales/{lang}/index.ts`.

### Pages & layouts narrow the locale

`params.lang` is typed as `string`. Every page/layout must:

```ts
const { lang } = await params;
if (!hasLocale(lang)) notFound();
```

before calling `getDictionary(lang)`. This both narrows the type and returns a real 404 for unsupported locales rather than letting an invalid locale silently fall back.

### Locale-aware formatting

- Always format dates, numbers, currency with `Intl.*` using the resolved locale.
- Inside client components, accept `locale` as a prop and derive formatters from it.

### Adding a translatable string

1. Add the key to `en.ts` (source of truth).
2. Add the Spanish value to `es.ts` — TypeScript will fail until the key is present.
3. Read via `getDictionary(locale).<feature>.<key>` in any component.
4. Fill both locales before merging — no `es → en` fallback for shipped pages.

## Routing & links

- Build URLs via `localeUrl(locale, routeKey, ...args)` from [@lib/routes](../src/lib/routes.ts). Never hand-concatenate locale prefixes.
- Use `next/link` `<Link>` for in-app navigation.
- `usePathname` / `useRouter` from `next/navigation` work only in client components.

## Images

- Go through [@components/ui/ImageCustom](../src/components/ui/ImageCustom.tsx) for **every** image. It wraps `next/image` and routes the `src` through `resolveImageSrc`. Do not import `next/image` directly.
- Local paths pass through unchanged. Remote URLs route through `/api/image-proxy?url=…` (when wired). Direct links to external hosts are not allowed.
- Use `width`/`height` for fixed-size images (logo). Use `fill` + a real `sizes` hint for absolute-positioned/full-bleed images. Parent must be `position: relative`.

## Icons

- All icons go through [@components/ui/Icon](../src/components/ui/Icon.tsx) — a centralized registry around `lucide-react`. No inline SVG icons in components.
- To add a new icon: import it in `Icon.tsx`, add it to the `ICONS` map, then use `<Icon name="…" />` at the call site.

## Tests

- Tests sit next to source (`foo.ts` → `foo.test.ts`).
- Lint must pass with `--max-warnings=0`. Run `bun run lint` and `bun run build` before declaring a task done.
