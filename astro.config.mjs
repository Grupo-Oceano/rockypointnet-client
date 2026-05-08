// @ts-check
import node from "@astrojs/node";
import qwik from "@qwik.dev/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  prefetch: true,
  integrations: [
    // https://astro.qwik.dev/docs
    // Note: If you are using the `@qwik.dev/astro` integration, you must also install `@qwik.dev/core` and add it to your dependencies.
    // See https://astro.qwik.dev/docs/upgrade for more details.
    qwik({ clientRouter: true }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@qwik.dev/astro"],
    },
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
    fallback: {
      es: "en",
    },
  },
});
