import Footer from "@/src/components/ui/Footer";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function AuthLayout({
  children,
  params,
}: LayoutProps<"/[locale]/auth">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
