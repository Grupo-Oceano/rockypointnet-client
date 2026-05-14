import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const primaryLinks = [
    { href: '/privacy', label: t('primary.privacy') },
    { href: '/terms', label: t('primary.terms') },
    { href: '/preferences', label: t('primary.preferences') },
  ];

  const secondaryLinks = [
    { href: '/suggest-restaurant', label: t('secondary.suggestRestaurant') },
    { href: '/advertise', label: t('secondary.advertise') },
    { href: '/about', label: t('secondary.about') },
    { href: '/contact', label: t('secondary.contact') },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <span className="text-white/70">{t('copyright', { year })}</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {primaryLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {secondaryLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
