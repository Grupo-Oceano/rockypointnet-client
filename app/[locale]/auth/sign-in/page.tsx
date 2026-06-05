import { buildAlternates } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/auth/sign-in">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "login" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale as Locale, "/auth/sign-in"),
  };
}

export default async function SignInPage({
  params,
}: PageProps<"/[locale]/auth/sign-in">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("login");

  return (
    <section className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-emperor-900 text-2xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="text-emperor-600 mt-2 text-sm">{t("subtitle")}</p>
    </section>
  );
}
