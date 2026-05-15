'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Icon, { type IconName } from './Icon';
import LocaleSwitcher from './LocaleSwitcher';
import Logo from './Logo';

const TopNav: React.FC = () => {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const navItems: { href: string; label: string; icon: IconName }[] = [
    { href: '/hotels', label: t('items.hotels'), icon: 'Bed' },
    { href: '/restaurants', label: t('items.restaurants'), icon: 'Utensils' },
    { href: '/activities', label: t('items.activities'), icon: 'Binoculars' },
    {
      href: '/attractions',
      label: t('items.attractions'),
      icon: 'FerrisWheel',
    },
    { href: '/events', label: t('items.events'), icon: 'Ticket' },
  ];

  return (
    <header
      className={cn(
        'bg-sand-50 supports-backdrop-filter:bg-sand-50/80 sticky top-0 z-40 w-full backdrop-blur transition-shadow',
        scrolled && 'shadow-lg'
      )}
    >
      <nav
        className="mx-auto flex h-12 md:h-16 max-w-6xl items-center justify-between px-4 py-8 md:py-12 sm:px-6 lg:px-8"
        aria-label={t('primaryAria')}
      >
        <Link href="/" aria-label={tCommon('wordmarkAria')}>
          <Logo className="w-24 md:w-32" />
        </Link>

        <ul className="hidden items-center gap-1 sm:flex sm:gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group text-emperor-700 hover:bg-sand-100 hover:text-emperor-900 inline-flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-light transition-colors"
              >
                <Icon name={item.icon} className="h-4 w-4" strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden sm:block">
          <LocaleSwitcher className="w-32" />
        </div>

        <button
          type="button"
          className="text-emperor-700 hover:bg-sand-100 hover:text-emperor-900 inline-flex items-center justify-center rounded-full p-2 transition-colors"
          aria-controls="topnav-mobile-panel"
          aria-expanded={open}
          aria-label={open ? t('closeMenuAria') : t('openMenuAria')}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'X' : 'Menu'} className="block h-5 w-5" strokeWidth={2} />
        </button>
      </nav>

      <div id="topnav-mobile-panel" className={cn('border-sand-200 bg-sand-50 border-t sm:hidden', !open && 'hidden')}>
        <ul className="flex flex-col gap-1 px-4 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="group text-emperor-700 hover:bg-sand-100 hover:text-emperor-900 inline-flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm font-light transition-colors"
              >
                <Icon name={item.icon} className="h-4 w-4" strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default TopNav;
