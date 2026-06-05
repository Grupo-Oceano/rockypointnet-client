import ManagementPanelShell from '@/src/components/manage/ManagementPanelShell';
import { BarChart3, Building2, FileText, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations('manage.admin');

  const navigationItems = [
    {
      label: t('navigation.overview.label'),
      description: t('navigation.overview.description'),
      icon: LayoutDashboard,
    },
    {
      label: t('navigation.reports.label'),
      description: t('navigation.reports.description'),
      icon: BarChart3,
    },
    {
      label: t('navigation.properties.label'),
      description: t('navigation.properties.description'),
      icon: Building2,
    },
    {
      label: t('navigation.users.label'),
      description: t('navigation.users.description'),
      icon: Users,
    },
    {
      label: t('navigation.documents.label'),
      description: t('navigation.documents.description'),
      icon: FileText,
    },
  ];

  const stats = [
    {
      label: t('stats.pendingReviews.label'),
      value: t('stats.pendingReviews.value'),
      detail: t('stats.pendingReviews.detail'),
    },
    {
      label: t('stats.openIssues.label'),
      value: t('stats.openIssues.value'),
      detail: t('stats.openIssues.detail'),
    },
    {
      label: t('stats.coverage.label'),
      value: t('stats.coverage.value'),
      detail: t('stats.coverage.detail'),
    },
  ];
  return (
    <ManagementPanelShell
      badge={t('badge')}
      title={t('title')}
      description={t('description')}
      icon={ShieldCheck}
      accentClassName="bg-gradient-to-r from-navy-700 via-ocean-600 to-ocean-500"
      softAccentClassName="bg-ocean-200/70"
      navigationTitle={t('navigationTitle')}
      navigationItems={navigationItems}
      stats={stats}
      footerNote={t('footerNote')}
    >
      {children}
    </ManagementPanelShell>
  );
}
