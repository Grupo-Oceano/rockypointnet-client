'use client';

import Icon from '@/src/components/ui/Icon';
import { cn } from '@/src/lib/utils';
import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useImperativeHandle, useMemo, useState, type Ref } from 'react';

const ReactCalendar = dynamic(() => import('react-calendar'), { ssr: false });

export type CalendarValue = Date | [Date, Date | null] | null;

export interface CalendarHandle {
  clear: () => void;
  setValue: (next: CalendarValue) => void;
  getValue: () => CalendarValue;
}

interface Props {
  ref?: Ref<CalendarHandle>;
  value?: CalendarValue;
  defaultValue?: CalendarValue;
  onChange?: (value: CalendarValue) => void;
  selectRange?: boolean;
  visibleMonths?: number;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: ReadonlyArray<Date | string>;
  locale?: string;
  name?: string;
  startName?: string;
  endName?: string;
  className?: string;
  inline?: boolean;
}

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

const addMonths = (d: Date, n: number) => {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isBetween = (date: Date, start: Date, end: Date) => {
  const t = startOfDay(date).getTime();
  return t > startOfDay(start).getTime() && t < startOfDay(end).getTime();
};

function normalize(value: CalendarValue | undefined): CalendarValue {
  if (!value) return null;
  if (value instanceof Date) return startOfDay(value);
  return [startOfDay(value[0]), value[1] ? startOfDay(value[1]) : null];
}

const Calendar: React.FC<Props> = ({
  ref,
  value,
  defaultValue,
  onChange,
  selectRange = false,
  visibleMonths = 1,
  minDate,
  maxDate,
  disabledDates,
  locale,
  name,
  startName,
  endName,
  className,
  inline = true,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<CalendarValue>(() => normalize(defaultValue ?? null));
  const effective = isControlled ? normalize(value) : internalValue;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const clampedMonths = isMobile ? 1 : Math.max(1, Math.min(12, visibleMonths));

  const [viewStart, setViewStart] = useState<Date>(() => startOfMonth(new Date()));

  const months = useMemo(
    () => Array.from({ length: clampedMonths }, (_, i) => addMonths(viewStart, i)),
    [viewStart, clampedMonths]
  );

  const disabledSet = useMemo(() => {
    const set = new Set<string>();
    disabledDates?.forEach((d) => set.add(toIso(d instanceof Date ? d : new Date(d))));
    return set;
  }, [disabledDates]);

  const tileDisabled = useCallback(({ date }: { date: Date }) => disabledSet.has(toIso(date)), [disabledSet]);

  const commit = useCallback(
    (next: CalendarValue) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const handleChange = useCallback(
    (next: unknown) => {
      if (!next) {
        commit(null);
        return;
      }
      if (next instanceof Date) {
        commit(startOfDay(next));
        return;
      }
      if (Array.isArray(next)) {
        const [s, e] = next as [Date | null, Date | null];
        if (!s) {
          commit(null);
          return;
        }
        commit([startOfDay(s), e ? startOfDay(e) : null]);
      }
    },
    [commit]
  );

  useImperativeHandle(
    ref,
    () => ({
      clear: () => commit(null),
      setValue: (next) => commit(normalize(next)),
      getValue: () => effective,
    }),
    [commit, effective]
  );

  // Pass a single Date when only start is selected so react-calendar treats the
  // next click as "select end" (mirrors the reference's allowPartialRange flow).
  const calendarValue = useMemo(() => {
    if (!effective) return undefined;
    if (effective instanceof Date) return effective;
    const [s, e] = effective;
    if (!s) return undefined;
    if (!e || isSameDay(s, e)) return s;
    return [s, e] as [Date, Date];
  }, [effective]);

  const tileClassName = useCallback(
    ({ date, view }: { date: Date; view: string }) => {
      if (view !== 'month') return undefined;
      const classes: string[] = ['transition-colors', 'duration-150', 'hover:bg-sand-100'];
      if (effective instanceof Date && isSameDay(date, effective)) {
        classes.push('bg-ocean-600', 'text-white', 'hover:bg-ocean-600', 'rounded-full');
      } else if (Array.isArray(effective) && effective[0]) {
        const [s, e] = effective;
        if (!e || isSameDay(s, e)) {
          if (isSameDay(date, s)) classes.push('bg-ocean-600', 'text-white', 'hover:bg-ocean-600', 'rounded-full');
        } else if (isSameDay(date, s)) {
          classes.push('bg-ocean-600', 'text-white', 'hover:bg-ocean-600', 'rounded-l-full');
        } else if (isSameDay(date, e)) {
          classes.push('bg-ocean-600', 'text-white', 'hover:bg-ocean-600', 'rounded-r-full');
        } else if (isBetween(date, s, e)) {
          classes.push('bg-ocean-600', 'text-white', 'hover:bg-ocean-600');
        }
      }
      return classes.join(' ');
    },
    [effective]
  );

  const startValue =
    effective instanceof Date ? toIso(effective) : Array.isArray(effective) && effective[0] ? toIso(effective[0]) : '';
  const endValue = Array.isArray(effective) && effective[1] ? toIso(effective[1]) : '';

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={cn('w-full border-transparent', className)}>
        <div className="relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 z-10 mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewStart((d) => addMonths(d, -clampedMonths))}
              aria-label="Previous month"
              className="text-emperor-600 hover:text-ocean-600 hover:bg-sand-100 relative z-10 inline-flex cursor-pointer items-center rounded-full px-2 py-1 text-sm transition-colors"
            >
              <Icon name="ChevronLeft" className="text-ocean-600 size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setViewStart((d) => addMonths(d, clampedMonths))}
              aria-label="Next month"
              className="text-emperor-600 hover:text-ocean-600 hover:bg-sand-100 relative z-10 inline-flex cursor-pointer items-center rounded-full px-2 py-1 text-sm transition-colors"
            >
              <Icon name="ChevronRight" className="text-ocean-600 size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${clampedMonths}, minmax(0, 1fr))`,
            }}
          >
            {months.map((monthDate) => (
              <div className={inline ? '' : 'relative'} key={monthDate.toISOString()}>
                <div className="text-ocean-600 mb-1 text-center text-sm font-medium">
                  {monthDate.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                  <ReactCalendar
                    showNavigation={false}
                    selectRange={selectRange}
                    allowPartialRange={selectRange}
                    onChange={handleChange}
                    value={calendarValue}
                    formatShortWeekday={(loc, d) =>
                      d
                        .toLocaleDateString(loc || undefined, {
                          weekday: 'narrow',
                        })
                        .slice(0, 1)
                        .toUpperCase()
                    }
                    minDate={minDate}
                    maxDate={maxDate}
                    tileClassName={tileClassName}
                    tileDisabled={tileDisabled}
                    showNeighboringMonth={false}
                    locale={locale}
                    activeStartDate={startOfMonth(monthDate)}
                  />
                </m.div>
              </div>
            ))}
          </div>
        </div>

        {selectRange ? (
          <>
            {startName ? <input type="hidden" name={startName} value={startValue} /> : null}
            {endName ? <input type="hidden" name={endName} value={endValue} /> : null}
          </>
        ) : name ? (
          <input type="hidden" name={name} value={startValue} />
        ) : null}
      </div>
    </LazyMotion>
  );
};

export default Calendar;
