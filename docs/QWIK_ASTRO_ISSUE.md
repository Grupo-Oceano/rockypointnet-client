# Qwik SSR bundle steals Astro's `build.serverEntry` filename, breaking `astro preview` and `@astrojs/node` standalone runtime

## Summary

`@qwik.dev/astro`'s SSR build emits its bundle using whatever filename is configured as Astro's `build.serverEntry`. Astro detects the collision and falls back to `<configured-name-without-ext>2.mjs` for its own handler. Both `astro preview` and `@astrojs/node` (standalone mode) read `build.serverEntry` to locate the handler, so they load the Qwik bundle instead, find no `handler` export, and crash.

There is no pure-config workaround: any value of `build.serverEntry` gets claimed by Qwik.

## Versions

- `@qwik.dev/astro@1.0.2`
- `@qwik.dev/core@2.0.0-beta.34`
- `astro@6.3.1`
- `@astrojs/node@10.1.0`
- Bun 1.3, macOS

## Reproduction

Minimal `astro.config.mjs`:

```js
import node from "@astrojs/node";
import qwik from "@qwik.dev/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [qwik({ clientRouter: true })],
});
```

One Qwik component imported into an `.astro` page is enough.

```
bun run build
bun run preview      # astro preview --port 8080
```

## Actual

```
[AstroUserError] The server entrypoint doesn't have a handler. Are you sure this is the right file?
  at createPreviewServer (node_modules/@astrojs/node/dist/preview.js:13:13)
```

`bun ./dist/server/entry.mjs` (the standalone production CMD) fails the same way — that file is Qwik's bundle, with only `export { root as default }`.

## Diagnosis

After build, `dist/server/`:

- `entry.mjs` — Qwik SSR bundle (`export { root as default }`)
- `index.mjs` — Astro's actual handler (`export { handler, options, startServer }`)

Astro's runtime manifest correctly records the handler location:

```json
"entryModules": {
  "@qwik.dev/astro/root": "entry.mjs",
  "@astrojs/node/server.js": "index.mjs"
}
```

But the consumer paths read `build.serverEntry` directly, not the manifest:

- `astro/dist/core/preview/index.js:64` — `serverEntrypoint: new URL(settings.config.build.serverEntry, settings.config.build.server)`
- `@astrojs/node` standalone docs/CMD examples assume `entry.mjs`.

The conflict moves with whatever the user sets, confirming Qwik claims `build.serverEntry` unconditionally:

| `build.serverEntry`   | Qwik writes to | Astro handler lands at |
| --------------------- | -------------- | ---------------------- |
| `entry.mjs` (default) | `entry.mjs`    | `index.mjs`            |
| `server.mjs`          | `server.mjs`   | `index.mjs`            |
| `index.mjs`           | `index.mjs`    | `index2.mjs`           |

## Workaround

Bypass `astro preview` and run Astro's renamed handler directly. For default config:

```json
"preview": "PORT=8080 bun ./dist/server/index.mjs"
```

Same change needed in production Dockerfile `CMD`. This is brittle — the filename Astro picks depends on its internal collision-fallback rule.

## Suggested fix

Have the Qwik integration's SSR build emit to a filename that doesn't read from `build.serverEntry`, e.g. `qwik-server.mjs` or under a subdirectory like `_qwik/entry.mjs`. The renderer is referenced by virtual module ID (`@qwik.dev/astro/root`), not by output filename, so renaming the on-disk artifact should be transparent to downstream consumers.
