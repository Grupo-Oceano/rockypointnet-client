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
