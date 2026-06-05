import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"] as const,
  defaultLocale: "en",
  // 'as-needed' hides the prefix for the defaultLocale, so `/` serves English.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
