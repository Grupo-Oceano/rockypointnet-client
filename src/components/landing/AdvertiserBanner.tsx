import Icon from '@/src/components/ui/Icon';
import ImageCustom from '@/src/components/ui/ImageCustom';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AdvertiserBanner() {
  const t = useTranslations('advertiser');

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8" aria-label={t('sectionAria')}>
      <div className="bg-emperor-900 relative overflow-hidden rounded-2xl shadow-sm">
        <ImageCustom
          src="/carousel-samples/hero-4.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/40" />

        <div className="relative grid gap-6 p-8 sm:p-10 md:grid-cols-2 md:p-12">
          <div className="text-white">
            <h2 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">{t('title')}</h2>
            <p className="text-sand-200 mt-2 max-w-md text-base sm:text-lg">{t('subtitle')}</p>
            <Link
              href="/advertise"
              className="text-emperor-900 hover:bg-sand-100 mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold transition-colors"
            >
              {t('cta')}
              <Icon name="ArrowRight" className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          <div
            className="grid place-items-center rounded-xl border border-dashed border-white/30 px-6 py-10 text-sm text-white/70"
            aria-hidden="true"
          >
            {t('placeholder')}
          </div>
        </div>
      </div>
    </section>
  );
}
