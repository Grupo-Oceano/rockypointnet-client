import AdvertiserBanner from "@/src/components/landing/AdvertiserBanner";
import EventsSection from "@/src/components/landing/EventsSection";
import ExploraGrid from "@/src/components/landing/ExploraGrid";
import FinalCTA from "@/src/components/landing/FinalCTA";
import Hero from "@/src/components/landing/Hero";
import SearchWidget from "@/src/components/landing/SearchWidget";
import Footer from "@/src/components/ui/Footer";
import TopNav from "@/src/components/ui/TopNav";
import {
  alternateOgLocales,
  buildAlternates,
  localeUrl,
  ogLocale,
} from "@/i18n/metadata";
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
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "home" });
  const typedLocale = locale as Locale;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(typedLocale, "/"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: localeUrl(typedLocale, "/"),
      locale: ogLocale(typedLocale),
      alternateLocale: alternateOgLocales(typedLocale),
      type: "website",
    },
  };
}

export default async function LandingPage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <SearchWidget />
        <ExploraGrid />
        <AdvertiserBanner />
        <EventsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
