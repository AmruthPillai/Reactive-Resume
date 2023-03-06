FROM node:lts-alpine AS base

WORKDIR /app

RUN apk add --no-cache g++ git curl make python3 libc6-compat \
  && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

FROM base AS dependencies

COPY package.json pnpm-*.yaml turbo.json ./
COPY ./schema/package.json ./schema/package.json
COPY ./server/package.json ./server/package.json

RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/schema/node_modules ./schema/node_modules
COPY --from=dependencies /app/server/node_modules ./server/node_modules

RUN pnpm run build --filter server

FROM mcr.microsoft.com/playwright:v1.31.2-focal as production

WORKDIR /app

RUN apt-get update \
  && apt-get install -y curl build-essential \
  && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY --from=builder /app/package.json /app/pnpm-*.yaml /app/turbo.json ./
COPY --from=builder /app/server/package.json ./server/package.json

RUN pnpm dlx playwright install --with-deps chromium
RUN pnpm install --filter server --prod --frozen-lockfile --workspace-root

COPY --from=builder /app/server/dist ./server/dist

VOLUME /app/server/dist/assets/exports
VOLUME /app/server/dist/assets/uploads

EXPOSE 3100

ENV PORT 3100

HEALTHCHECK --interval=30s --timeout=20s --retries=3 --start-period=15s \
    CMD curl -fSs localhost:3100/health || exit 1

CMD [ "pnpm", "run", "start", "--filter", "server" ]