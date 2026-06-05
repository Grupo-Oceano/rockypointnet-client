import { Link } from '@/i18n/navigation';
import ImageCustom from '@/src/components/ui/ImageCustom';
import { useTranslations } from 'next-intl';

interface Place {
  tag: string;
  name: string;
  href: string;
  src: string;
  alt: string;
}

const ExploraGrid: React.FC = () => {
  const t = useTranslations('explora');
  const tag = t('restaurantTag');

  const tall: Place = {
    tag,
    name: t('places.elMexicano.name'),
    href: '/restaurants/el-mexicano',
    src: '/carousel-samples/hero-3.webp',
    alt: t('places.elMexicano.alt'),
  };

  const wide: Place = {
    tag,
    name: t('places.theFishMarket.name'),
    href: '/restaurants/the-fish-market',
    src: '/carousel-samples/hero-4.webp',
    alt: t('places.theFishMarket.alt'),
  };

  const small: Place[] = [
    {
      tag,
      name: t('places.palapaAntigua.name'),
      href: '/restaurants/palapa-antigua',
      src: '/carousel-samples/hero-5.webp',
      alt: t('places.palapaAntigua.alt'),
    },
    {
      tag,
      name: t('places.elMiradorDelSur.name'),
      href: '/restaurants/el-mirador-del-sur',
      src: '/carousel-samples/hero-6.webp',
      alt: t('places.elMiradorDelSur.alt'),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <header className="mb-6">
        <h2 className="text-emperor-900 text-2xl font-bold tracking-tight sm:text-3xl">{t('heading')}</h2>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href={tall.href}
          className="group bg-emperor-200 relative block aspect-4/5 overflow-hidden rounded-2xl shadow-sm md:row-span-2 md:aspect-auto"
        >
          <ImageCustom
            src={tall.src}
            alt={tall.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <span className="text-xs font-medium tracking-wider text-white/85 uppercase">{tall.tag}</span>
            <h3 className="mt-1 text-xl font-semibold text-white">{tall.name}</h3>
          </div>
        </Link>

        <Link
          href={wide.href}
          className="group bg-emperor-200 relative block aspect-5/3 overflow-hidden rounded-2xl shadow-sm"
        >
          <ImageCustom
            src={wide.src}
            alt={wide.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <span className="text-xs font-medium tracking-wider text-white/85 uppercase">{wide.tag}</span>
            <h3 className="mt-1 text-xl font-semibold text-white">{wide.name}</h3>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          {small.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group bg-emperor-200 relative block aspect-5/3 overflow-hidden rounded-2xl shadow-sm"
            >
              <ImageCustom
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <span className="text-[10px] font-medium tracking-wider text-white/85 uppercase">{p.tag}</span>
                <h3 className="mt-1 text-base font-semibold text-white">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploraGrid;
