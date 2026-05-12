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
  build: {
    serverEntry: "server.mjs",
    server: './server/index.mjs',
  },
  prefetch: true,
  integrations: [
    // https://astro.qwik.dev/docs
    // Note: If you are using the `@qwik.dev/astro` integration, you must also install `@qwik.dev/core` and add it to your dependencies.
    // See https://astro.qwik.dev/docs/upgrade for more details.
    qwik({ clientRouter: true }),
  ],
  server: {
    allowedHosts: ["localhost", "ngrok-free.app"], // Allow ngrok domains for development
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@qwik.dev/astro"], // Ensure @qwik.dev/astro is bundled for SSR
    },
    server: {
      allowedHosts: ["localhost", "86f9-2806-101e-10-9b70-dd87-a35f-91ca-df02.ngrok-free.app"], // Allow ngrok domains for development
    }
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    fallback: {
      es: "en",
    },
  },
  devToolbar: {
    enabled: true,
  }
});
