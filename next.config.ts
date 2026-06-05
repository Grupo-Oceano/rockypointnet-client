import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 80],
    /** Omit 3840w so full-bleed heroes are not upscaled to ~4K JPEGs on retina; 2560w is enough for typical LCP. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    remotePatterns: [new URL("https://pictures.escapia.com/OCEANO/**")],
  },
  experimental: {
    optimizePackageImports: ["motion", "lucide-react"],
    viewTransition: true,
  },
};

export default withNextIntl(nextConfig);
