import { resolveImageSrc } from '@/src/lib/images';
import Image, { type ImageProps } from 'next/image';
import React from 'react';

/** Centralized image component. Pass `src` as a string; full URLs (with hostname and protocol) are proxied automatically; paths like `/assets/*` are used as-is. */
export type ImageCustomProps = Omit<ImageProps, 'src'> & { src: string };

const ImageCustom: React.FC<ImageCustomProps> = ({ src, alt, ...rest }) => {
  const resolvedSrc = resolveImageSrc(src?.trim() ? src : '/assets/empty.png');
  return <Image src={resolvedSrc} alt={alt} {...rest} />;
};

export default ImageCustom;
