import { en, type Dictionary } from "./en";
import { es } from "./es";

export type Locale = "es" | "en";

export const SUPPORTED_LOCALES = ["es", "en"] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = "en";

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export function resolveLocale(locale: string | undefined): Locale {
	return locale === "en" || locale === "es" ? locale : DEFAULT_LOCALE;
}

export function getDictionary(locale: string | undefined): Dictionary {
	return DICTIONARIES[resolveLocale(locale)];
}

export type { Dictionary };
