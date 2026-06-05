import ManagementPanelShell from '@/src/components/manage/ManagementPanelShell';
import { Building2, CalendarDays, Coins, LayoutDashboard, ReceiptText, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function BusinessLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations('manage.business');

  const navigationItems = [
    {
      label: t('navigation.overview.label'),
      description: t('navigation.overview.description'),
      icon: LayoutDashboard,
    },
    {
      label: t('navigation.reservations.label'),
      description: t('navigation.reservations.description'),
      icon: CalendarDays,
    },
    {
      label: t('navigation.billing.label'),
      description: t('navigation.billing.description'),
      icon: Coins,
    },
    {
      label: t('navigation.team.label'),
      description: t('navigation.team.description'),
      icon: Users,
    },
    {
      label: t('navigation.assets.label'),
      description: t('navigation.assets.description'),
      icon: Building2,
    },
  ];

  const stats = [
    { label: t('stats.today.label'), value: t('stats.today.value'), detail: t('stats.today.detail') },
    { label: t('stats.revenue.label'), value: t('stats.revenue.value'), detail: t('stats.revenue.detail') },
    { label: t('stats.actionItems.label'), value: t('stats.actionItems.value'), detail: t('stats.actionItems.detail') },
  ];
  return (
    <ManagementPanelShell
      badge={t('badge')}
      title={t('title')}
      description={t('description')}
      icon={ReceiptText}
      accentClassName="bg-gradient-to-r from-emperor-900 via-navy-700 to-ocean-600"
      softAccentClassName="bg-sand-300/70"
      navigationTitle={t('navigationTitle')}
      navigationItems={navigationItems}
      stats={stats}
      footerNote={t('footerNote')}
    >
      {children}
    </ManagementPanelShell>
  );
}
