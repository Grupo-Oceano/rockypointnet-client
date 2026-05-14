'use client';

import Icon from '@/src/components/ui/Icon';
import ImageCustom from '@/src/components/ui/ImageCustom';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

const AUTO_ADVANCE_MS = 5000;

export default function PartnersSlideshow() {
  const t = useTranslations('hero');

  const partners = [
    {
      title: t('slides.welcome'),
      src: '/carousel-samples/hero-1.webp',
      color: 'bg-rose-200',
    },
    {
      title: '',
      src: '/carousel-samples/hero-2.webp',
      color: 'bg-emerald-200',
    },
    { title: '', src: '/carousel-samples/hero-3.webp', color: 'bg-sky-200' },
    { title: '', src: '/carousel-samples/hero-4.webp', color: 'bg-yellow-200' },
    { title: '', src: '/carousel-samples/hero-5.webp', color: 'bg-purple-200' },
    { title: '', src: '/carousel-samples/hero-6.webp', color: 'bg-pink-200' },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const hoveredRef = useRef(false);
  const userScrollingRef = useRef(false);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = (i + partners.length) % partners.length;
    const slide = track.children[target] as HTMLElement | undefined;
    if (!slide) return;
    const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    track.scrollTo({ left, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      userScrollingRef.current = true;
      if (idleTimer) clearTimeout(idleTimer);
      const slides = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let minDist = Infinity;
      slides.forEach((slide, idx) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const dist = Math.abs(center - slideCenter);
        if (dist < minDist) {
          minDist = dist;
          nearest = idx;
        }
      });
      setCurrent((prev) => (nearest !== prev ? nearest : prev));
      idleTimer = setTimeout(() => {
        userScrollingRef.current = false;
      }, 180);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (hoveredRef.current || userScrollingRef.current) return;
      const track = trackRef.current;
      if (!track) return;
      const next = (current + 1) % partners.length;
      const slide = track.children[next] as HTMLElement | undefined;
      if (!slide) return;
      const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
      track.scrollTo({ left, behavior: 'smooth' });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [current, partners.length]);

  return (
    <div
      className="group relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen overflow-hidden"
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[7.5vw] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {partners.map((p, i) => (
          <div
            key={i}
            className={`relative h-90 w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl sm:h-105 md:h-120 ${p.color}`}
          >
            <ImageCustom
              src={p.src}
              alt={p.title}
              fill
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="85vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />
            {p.title && (
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <h1 className="max-w-2xl text-center text-3xl leading-tight font-bold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
                  {p.title}
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={t('previousAria')}
        onClick={() => scrollToIndex(current - 1)}
        className="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 opacity-0 shadow transition-opacity ease-in-out group-hover:opacity-100 hover:bg-white sm:left-8"
      >
        <Icon name="ChevronLeft" className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={t('nextAria')}
        onClick={() => scrollToIndex(current + 1)}
        className="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 opacity-0 shadow transition-opacity ease-in-out group-hover:opacity-100 hover:bg-white sm:right-8"
      >
        <Icon name="ChevronRight" className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="absolute right-0 bottom-3 left-0 z-10 flex justify-center gap-2">
        {partners.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={t('goToAria', { number: i + 1 })}
            onClick={() => scrollToIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === current ? 'bg-gray-800' : 'bg-gray-400/60 hover:bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
}
