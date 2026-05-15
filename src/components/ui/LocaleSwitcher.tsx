'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/src/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  className?: string;
}

const LocaleSwitcher: React.FC<Props> = ({ className }) => {
  const t = useTranslations('common');
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;

  const labels: Record<Locale, { label: string; ariaLabel: string }> = {
    es: {
      label: t('spanishLabel'),
      ariaLabel: t('switchToSpanishAria'),
    },
    en: {
      label: t('englishLabel'),
      ariaLabel: t('switchToEnglishAria'),
    },
  };

  const links: { code: Locale; label: string; ariaLabel: string }[] = [
    { code: 'es', ...labels.es },
    { code: 'en', ...labels.en },
  ];

  return (
    <div className={className}>
      <div
        className="border-sand-200 ml-1 flex w-fit items-center gap-1 rounded-full border bg-white px-1 py-0.5 text-xs font-semibold"
        role="group"
        aria-label={t('languageMenuLabel')}
      >
        {links.map((link) => {
          const isActive = link.code === activeLocale;
          return (
            <Link
              key={link.code}
              href={pathname}
              locale={link.code}
              aria-label={link.ariaLabel}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'rounded-full px-2 py-1 transition-colors',
                isActive ? 'bg-ocean-600 text-white' : 'text-emperor-600 hover:bg-sand-100 hover:text-emperor-900'
              )}
            >
              {link.code.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LocaleSwitcher;

void routing;
