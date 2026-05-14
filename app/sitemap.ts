import type { MetadataRoute } from "next";
import { localeUrl } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/hotels", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/restaurants", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/activities", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/attractions", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.8, changeFrequency: "daily" as const },
  { path: "/auth/sign-in", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/auth/sign-up", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, localeUrl(l, route.path)]),
          ),
          "x-default": localeUrl(routing.defaultLocale, route.path),
        },
      },
    })),
  );
}
