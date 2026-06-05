import { cn } from '@/src/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface NavigationItem {
  label: string;
  description: string;
  icon: LucideIcon;
}

interface StatItem {
  label: string;
  value: string;
  detail: string;
}

interface Props {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
  softAccentClassName: string;
  navigationTitle: string;
  navigationItems: NavigationItem[];
  stats: StatItem[];
  footerNote: string;
  children: ReactNode;
}

export const ManagementPanelShell = ({
  badge,
  title,
  description,
  icon: Icon,
  accentClassName,
  softAccentClassName,
  navigationTitle,
  navigationItems,
  stats,
  footerNote,
  children,
}: Props) => {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(224,237,255,0.9),transparent_34%),radial-gradient(circle_at_top_right,rgba(244,230,213,0.9),transparent_28%),linear-gradient(180deg,#fdfaf4_0%,#f7f2ea_100%)] text-emperor-900">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className={cn('absolute -top-28 -left-20 h-72 w-72 rounded-full blur-3xl', softAccentClassName)} />
        <div className="absolute top-36 right-0 h-64 w-64 rounded-full bg-white/50 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
        <aside className="overflow-y-auto rounded-4xl border border-white/70 bg-white/75 p-4 shadow-[0_24px_90px_rgba(52,52,52,0.08)] backdrop-blur-xl lg:sticky lg:top-6 lg:self-start lg:h-[calc(100vh-3rem)] lg:p-5">
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-3xl border border-sand-200 bg-sand-50 px-4 py-4 shadow-sm">
              <div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white',
                  accentClassName
                )}
              >
                <Icon className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
                {badge}
              </div>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-emperor-900">{title}</h1>
              <p className="mt-2 text-sm leading-6 text-emperor-600">{description}</p>
            </div>

            <div className="space-y-2">
              <p className="px-1 text-xs font-semibold uppercase tracking-[0.24em] text-emperor-500">
                {navigationTitle}
              </p>
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="group rounded-2xl border border-transparent bg-sand-50/80 px-3 py-3 transition-colors hover:border-sand-200 hover:bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 inline-flex size-9 items-center justify-center rounded-xl text-white shadow-sm',
                            accentClassName
                          )}
                        >
                          <ItemIcon className="size-4" strokeWidth={2.2} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-emperor-900">{item.label}</p>
                          <p className="mt-1 text-xs leading-5 text-emperor-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-sand-200 bg-emperor-950 px-4 py-4 text-sand-50 shadow-lg shadow-emperor-950/10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-300">Layout note</p>
              <p className="mt-2 text-sm leading-6 text-sand-100">{footerNote}</p>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col gap-6">
          <header className="rounded-4xl border border-white/70 bg-white/80 px-5 py-5 shadow-[0_24px_90px_rgba(52,52,52,0.06)] backdrop-blur-xl sm:px-6 lg:px-8 lg:py-6">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white',
                    accentClassName
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={2.25} aria-hidden="true" />
                  {badge}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-emperor-950 sm:text-4xl">{title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-emperor-600 sm:text-base">{description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:w-2xl">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-sand-200 bg-sand-50/80 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emperor-500">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-emperor-950">{stat.value}</p>
                    <p className="mt-1 text-sm leading-6 text-emperor-600">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <section className="min-w-0 rounded-4xl border border-white/70 bg-white/85 p-5 shadow-[0_24px_90px_rgba(52,52,52,0.06)] backdrop-blur-xl sm:p-6 lg:p-8">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ManagementPanelShell;
