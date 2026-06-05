import { useTranslations } from 'next-intl';
import PartnersSlideshow from './PartnersSlideshow';

const Hero: React.FC = () => {
  const t = useTranslations('hero');
  return (
    <section className="relative z-10 mx-auto w-full" aria-label={t('carouselAria')}>
      <div className="relative overflow-hidden">
        <PartnersSlideshow />
      </div>
    </section>
  );
};

export default Hero;
