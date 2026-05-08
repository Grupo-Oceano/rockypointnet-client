# syntax=docker/dockerfile:1.7

ARG BUN_VERSION=1.3-alpine

# ---------------- Base ----------------
FROM oven/bun:${BUN_VERSION} AS base

WORKDIR /app

ENV TZ=America/Hermosillo
RUN apk add --no-cache tzdata curl ca-certificates \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

# ---------------- Dependencies (full, for build & dev) ----------------
FROM base AS deps

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache,sharing=locked \
    bun install --frozen-lockfile

# ---------------- Builder ----------------
FROM deps AS builder

ENV NODE_ENV=production
COPY . .
RUN bun run build

# ---------------- Development ----------------
FROM deps AS development

ENV NODE_ENV=development \
    CI=true \
    HOST=0.0.0.0 \
    PORT=4321

COPY . .

EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS "http://localhost:${PORT}/api/health" || exit 1

CMD ["/bin/sh", "-c", "[ ! -d node_modules ] && bun install; bun run dev -- --host"]

# ---------------- Production dependencies (no dev deps) ----------------
FROM base AS prod-deps

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache,sharing=locked \
    bun install --frozen-lockfile --production

# ---------------- Production ----------------
FROM base AS production

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

USER bun

COPY --from=prod-deps --chown=bun:bun /app/node_modules ./node_modules
COPY --from=builder  --chown=bun:bun /app/dist          ./dist
COPY --from=builder  --chown=bun:bun /app/package.json  ./package.json

EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS "http://localhost:${PORT}/api/health" || exit 1

CMD ["bun", "./dist/server/index.mjs"]
