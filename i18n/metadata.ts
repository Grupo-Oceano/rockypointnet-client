import type { Metadata } from "next";
import { routing, type Locale } from "./routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rockypoint.net";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_MX",
};

function joinPath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

export function localeUrl(locale: Locale, path = "/") {
  const p = joinPath(locale, path);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
}

export function buildAlternates(
  locale: Locale,
  path = "/",
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const code of routing.locales) {
    languages[code] = localeUrl(code, path);
  }
  languages["x-default"] = localeUrl(routing.defaultLocale, path);

  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}

export function ogLocale(locale: Locale) {
  return OG_LOCALE[locale];
}

export function alternateOgLocales(locale: Locale) {
  return routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l]);
}
