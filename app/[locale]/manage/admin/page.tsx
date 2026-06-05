import { getTranslations } from 'next-intl/server';

export default async function AdminPage() {
  const t = await getTranslations('manage.admin.page');

  const highlights = [
    {
      title: t('highlights.activity.title'),
      body: t('highlights.activity.body'),
    },
    {
      title: t('highlights.quickChecks.title'),
      body: t('highlights.quickChecks.body'),
    },
    {
      title: t('highlights.summary.title'),
      body: t('highlights.summary.body'),
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-sand-200 bg-[linear-gradient(135deg,_rgba(17,24,39,0.98),_rgba(15,118,110,0.96))] p-6 text-white shadow-lg shadow-navy-950/10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-200">{t('hero.kicker')}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t('hero.title')}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">{t('hero.body')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-sand-200 bg-sand-50 px-5 py-5 shadow-sm">
              <p className="text-sm font-semibold text-emperor-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-emperor-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[
          [t('cards.approvals.label'), t('cards.approvals.value'), t('cards.approvals.detail')],
          [t('cards.sync.label'), t('cards.sync.value'), t('cards.sync.detail')],
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-[1.75rem] border border-sand-200 bg-white px-5 py-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emperor-500">{label}</p>
            <p className="mt-3 text-2xl font-semibold text-emperor-950">{value}</p>
            <p className="mt-2 text-sm leading-6 text-emperor-600">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
