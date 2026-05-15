import Icon from '@/src/components/ui/Icon';
import ImageCustom from '@/src/components/ui/ImageCustom';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import EventCard from './EventCard';

const EventsSection: React.FC = () => {
  const t = useTranslations('events');
  const locale = useLocale();
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const sharedDate = dateFormatter.format(new Date(2026, 3, 9));

  const events = [
    {
      title: t('list.beachGathering.title'),
      href: '/events/beach-gathering',
      image: '/carousel-samples/hero-3.webp',
      imageAlt: t('list.beachGathering.imageAlt'),
    },
    {
      title: t('list.seafoodFestival.title'),
      href: '/events/festival-mariscos',
      image: '/carousel-samples/hero-2.webp',
      imageAlt: t('list.seafoodFestival.imageAlt'),
    },
    {
      title: t('list.communityEvents.title'),
      href: '/events/community-events',
      image: '/carousel-samples/hero-5.webp',
      imageAlt: t('list.communityEvents.imageAlt'),
    },
    {
      title: t('list.kayakSunset.title'),
      href: '/events/kayak-sunset',
      image: '/carousel-samples/hero-6.webp',
      imageAlt: t('list.kayakSunset.imageAlt'),
    },
  ];

  return (
    <section className="relative w-full overflow-hidden" aria-labelledby="events-heading">
      <div className="relative">
        <ImageCustom
          src="/carousel-samples/hero-1.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/15" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-xl text-white">
            <h2 id="events-heading" className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              {t('headingLine1')}
              <br />
              {t('headingLine2')}
            </h2>
            <p className="text-sand-100 mt-4 text-base sm:text-lg">{t('subheading')}</p>
          </div>
        </div>
      </div>

      <div className="bg-sand-50">
        <div className="mx-auto -mt-14 grid max-w-7xl grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:pb-16">
          {events.map((e) => (
            <EventCard
              key={e.href}
              title={e.title}
              href={e.href}
              date={sharedDate}
              location={t('sharedLocation')}
              organizer={t('sharedOrganizer')}
              rating={4.5}
              image={e.image}
              imageAlt={e.imageAlt}
            />
          ))}
        </div>

        <div className="pb-16 text-center">
          <Link
            href="/events"
            className="hover:bg-emperor-800 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors"
          >
            {t('seeAll')}
            <Icon name="ArrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
