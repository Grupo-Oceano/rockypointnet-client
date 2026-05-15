import { Link } from '@/i18n/navigation';
import Icon from '@/src/components/ui/Icon';
import ImageCustom from '@/src/components/ui/ImageCustom';
import { useFormatter, useTranslations } from 'next-intl';

interface Props {
  title: string;
  href: string;
  date: string;
  location: string;
  organizer: string;
  rating: number;
  image: string;
  imageAlt: string;
}

const EventCard: React.FC<Props> = ({ title, href, date, location, organizer, rating, image, imageAlt }) => {
  const t = useTranslations('events.card');
  const format = useFormatter();

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const filled = Array.from({ length: fullStars });
  const halves = hasHalf ? [0] : [];
  const empties = Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) });

  const formattedRating = format.number(rating, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
      <Link href={href} className="bg-emperor-200 relative block aspect-4/3 overflow-hidden">
        <ImageCustom
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-emperor-900 text-sm font-semibold">
          <Link href={href} className="hover:text-ocean-600">
            {title}
          </Link>
        </h3>
        <dl className="text-emperor-500 space-y-0.5 text-xs">
          <div>
            <dt className="sr-only">{t('dateLabel')}</dt>
            <dd>{date}</dd>
          </div>
          <div>
            <dt className="sr-only">{t('placeLabel')}</dt>
            <dd>{location}</dd>
          </div>
          <div>
            <dt className="sr-only">{t('organizerLabel')}</dt>
            <dd>{t('byOrganizer', { name: organizer })}</dd>
          </div>
        </dl>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-emperor-700 text-xs font-medium">
            {formattedRating}
            {t('ratingSuffix')}
          </span>
          <div className="flex items-center gap-0.5" aria-label={t('ratingAria', { rating: formattedRating })}>
            {filled.map((_, i) => (
              <Icon
                key={`f-${i}`}
                name="Star"
                className="size-4 text-amber-400"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ))}
            {halves.map((_, i) => (
              <Icon
                key={`h-${i}`}
                name="StarHalf"
                className="size-4 text-amber-400"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ))}
            {empties.map((_, i) => (
              <Icon
                key={`e-${i}`}
                name="Star"
                className="text-emperor-300 size-4"
                fill="none"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="border-sand-200 mt-2 flex items-center gap-2 border-t pt-3">
          <button
            type="button"
            aria-label={t('shareAria', { title })}
            className="text-emperor-400 hover:bg-sand-100 hover:text-emperor-700 rounded-full p-1.5 transition-colors"
          >
            <Icon name="Share" className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t('favoriteAria', { title })}
            className="text-emperor-400 hover:bg-sand-100 hover:text-emperor-700 rounded-full p-1.5 transition-colors"
          >
            <Icon name="Heart" className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
