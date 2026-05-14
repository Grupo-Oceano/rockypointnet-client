import Icon from '@/src/components/ui/Icon';
import ImageCustom from '@/src/components/ui/ImageCustom';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8" aria-labelledby="cta-heading">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative h-90 sm:h-105">
          <div className="bg-emperor-200 absolute top-0 left-0 h-[78%] w-[78%] overflow-hidden rounded-2xl border-4 border-white shadow-md">
            <ImageCustom
              src="/carousel-samples/hero-5.webp"
              alt={t('familyImageAlt')}
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
          <div className="bg-emperor-200 absolute right-0 bottom-0 h-[58%] w-[60%] overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            <ImageCustom
              src="/carousel-samples/hero-2.webp"
              alt={t('friendsImageAlt')}
              fill
              sizes="(min-width: 768px) 30vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:pl-4">
          <h2 id="cta-heading" className="text-emperor-900 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h2>
          <p className="text-emperor-600 mt-4 max-w-md text-base">{t('description')}</p>
          <Link
            href="/reserve"
            className="hover:bg-emperor-800 mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors"
          >
            {t('cta')}
            <Icon name="ArrowRight" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
