const proxyImage = (url: string) => {
  //return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  return url;
};

/** Returns proxied URL for full URLs (with hostname and protocol), or the path as-is for local paths (e.g. /assets/*). */
export const resolveImageSrc = (src: string): string => {
  if (!src?.trim()) return src;
  try {
    const trimmed = src.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return proxyImage(trimmed);
    }
    return trimmed;
  } catch {
    return src;
  }
};
