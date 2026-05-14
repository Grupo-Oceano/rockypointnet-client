# -----------------------------------------------------------------------------
# This Dockerfile.bun is specifically configured for projects using Bun
# For npm/pnpm or yarn, refer to the Dockerfile instead
# -----------------------------------------------------------------------------

# Pin to a specific Bun version — never use :latest in production
FROM oven/bun:1.2.8-debian AS base

WORKDIR /app

# Install curl for health checks (Coolify)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies with bun
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --no-save --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time args — Next.js inlines NEXT_PUBLIC_* at build time.
ARG API_URL=http://server:3000
ARG NEXT_PUBLIC_APP_ENV=production
ARG NEXT_PUBLIC_SITE_URL=http://localhost
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
ARG NEXT_PUBLIC_DEFAULT_MAPX=
ARG NEXT_PUBLIC_DEFAULT_MAPY=
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ARG NEXT_PUBLIC_TWAKTO_PROPERTY_ID=
ARG NEXT_PUBLIC_TWAKTO_WIDGET_ID=

ENV API_URL=${API_URL}
ENV NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
ENV NEXT_PUBLIC_DEFAULT_MAPX=${NEXT_PUBLIC_DEFAULT_MAPX}
ENV NEXT_PUBLIC_DEFAULT_MAPY=${NEXT_PUBLIC_DEFAULT_MAPY}
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
ENV NEXT_PUBLIC_TWAKTO_PROPERTY_ID=${NEXT_PUBLIC_TWAKTO_PROPERTY_ID}
ENV NEXT_PUBLIC_TWAKTO_WIDGET_ID=${NEXT_PUBLIC_TWAKTO_WIDGET_ID}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# -----------------------------------------------------------------------------
# Development phase — curl/ping only here, never in production
# -----------------------------------------------------------------------------
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun add -g --no-save --frozen-lockfile next
CMD ["/bin/sh", "-c", "[ ! -f node_modules/next/package.json ] && bun install --frozen-lockfile; bun run dev"]

# -----------------------------------------------------------------------------
# Production phase ---> We put it at the end of the file so its the default phase when the container is run
# -----------------------------------------------------------------------------
FROM base AS production
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Make sure Next.js is installed
RUN if [ ! -f /app/node_modules/.bin/next ]; then \
    bun install next --save-dev; \
    fi

RUN if command -v addgroup >/dev/null 2>&1; then \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs; \
    else \
    groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid 1001 nextjs; \
    fi

COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["bun", "run", "start"]