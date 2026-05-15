import { getTranslations } from 'next-intl/server';

export default async function BusinessPage() {
  const t = await getTranslations('manage.business.page');

  const widgets = [
    {
      title: t('widgets.operations.title'),
      body: t('widgets.operations.body'),
    },
    {
      title: t('widgets.customerFlow.title'),
      body: t('widgets.customerFlow.body'),
    },
    {
      title: t('widgets.staffQueue.title'),
      body: t('widgets.staffQueue.body'),
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-sand-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emperor-500">{t('hero.kicker')}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-emperor-950">{t('hero.title')}</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-emperor-600">{t('hero.body')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {widgets.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-sand-200 bg-[linear-gradient(180deg,_rgba(255,255,255,1),_rgba(252,248,241,1))] p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-emperor-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-emperor-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          [t('cards.reservations.label'), t('cards.reservations.value'), t('cards.reservations.detail')],
          [t('cards.occupancy.label'), t('cards.occupancy.value'), t('cards.occupancy.detail')],
          [t('cards.payouts.label'), t('cards.payouts.value'), t('cards.payouts.detail')],
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-[1.75rem] border border-sand-200 bg-sand-50 px-5 py-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emperor-500">{label}</p>
            <p className="mt-3 text-2xl font-semibold text-emperor-950">{value}</p>
            <p className="mt-2 text-sm leading-6 text-emperor-600">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
