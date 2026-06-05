'use client';

import Counter from '@/src/components/ui/forms/Counter';
import Field from '@/src/components/ui/forms/Field';
import Icon from '@/src/components/ui/Icon';
import { cn } from '@/src/lib/utils';
import { useTranslations } from 'next-intl';
import Form from 'next/form';
import { useState } from 'react';

type TabId = 'hotels' | 'restaurants' | 'attractions' | 'events';

const todayIso = () => new Date().toISOString().slice(0, 10);

const SearchWidget: React.FC = () => {
  const t = useTranslations('search');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'hotels', label: t('tabs.hotels') },
    { id: 'restaurants', label: t('tabs.restaurants') },
    { id: 'attractions', label: t('tabs.attractions') },
    { id: 'events', label: t('tabs.events') },
  ];

  const [activeTab, setActiveTab] = useState<TabId>('hotels');
  const [checkIn, setCheckIn] = useState(todayIso());
  const [checkOut, setCheckOut] = useState(todayIso());
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const step = (value: number, delta: number, min: number, max: number) => {
    const next = value + delta;
    return next < min || next > max ? value : next;
  };

  return (
    <section className="relative z-20 mx-auto w-full max-w-5xl px-4 md:px-24 lg:px-18" aria-label={t('sectionAria')}>
      <div className="-mt-8 rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:-mt-12 md:p-8">
        <div role="tablist" aria-label={t('tabsAria')} className="mb-5 flex flex-wrap gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selected
                    ? 'bg-ocean-600 text-white shadow-sm'
                    : 'text-emperor-600 hover:bg-sand-100 hover:text-emperor-900'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <Form
          action={`/search/${activeTab}`}
          className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end"
        >
          <Field label={t('fields.arrival')}>
            <Icon name="Calendar" className="text-emperor-400 size-4" strokeWidth={1.5} aria-hidden="true" />
            <input
              type="date"
              aria-label={t('fields.arrivalAria')}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-emperor-800 w-full bg-transparent text-sm outline-none"
            />
          </Field>

          <Field label={t('fields.departure')}>
            <Icon name="Calendar" className="text-emperor-400 size-4" strokeWidth={1.5} aria-hidden="true" />
            <input
              type="date"
              aria-label={t('fields.departureAria')}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-emperor-800 w-full bg-transparent text-sm outline-none"
            />
          </Field>

          <Counter
            label={t('fields.rooms')}
            value={rooms}
            min={1}
            max={10}
            decrementAria={t('decrementAria', {
              label: t('fields.rooms').toLowerCase(),
            })}
            incrementAria={t('incrementAria', {
              label: t('fields.rooms').toLowerCase(),
            })}
            onDec={() => setRooms((v) => step(v, -1, 1, 10))}
            onInc={() => setRooms((v) => step(v, 1, 1, 10))}
          />

          <Counter
            label={t('fields.adults')}
            value={adults}
            min={1}
            max={16}
            decrementAria={t('decrementAria', {
              label: t('fields.adults').toLowerCase(),
            })}
            incrementAria={t('incrementAria', {
              label: t('fields.adults').toLowerCase(),
            })}
            onDec={() => setAdults((v) => step(v, -1, 1, 16))}
            onInc={() => setAdults((v) => step(v, 1, 1, 16))}
          />

          <Counter
            label={t('fields.children')}
            value={children}
            min={0}
            max={12}
            decrementAria={t('decrementAria', {
              label: t('fields.children').toLowerCase(),
            })}
            incrementAria={t('incrementAria', {
              label: t('fields.children').toLowerCase(),
            })}
            onDec={() => setChildren((v) => step(v, -1, 0, 12))}
            onInc={() => setChildren((v) => step(v, 1, 0, 12))}
          />

          <div className="flex justify-end lg:pb-1">
            <button
              type="submit"
              className="bg-ocean-600 hover:bg-ocean-700 focus-visible:outline-ocean-600 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Icon name="Search" className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {t('submit')}
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default SearchWidget;
