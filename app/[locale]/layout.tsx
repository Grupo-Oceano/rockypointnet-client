import {
  alternateOgLocales,
  buildAlternates,
  localeUrl,
  ogLocale,
  SITE_URL,
} from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "meta" });
  const typedLocale = locale as Locale;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteTitle"), template: `%s · ${t("siteName")}` },
    description: t("siteDescription"),
    alternates: buildAlternates(typedLocale, "/"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("siteTitle"),
      description: t("siteDescription"),
      url: localeUrl(typedLocale, "/"),
      locale: ogLocale(typedLocale),
      alternateLocale: alternateOgLocales(typedLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-sand-50 text-emperor-700 font-sans antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
